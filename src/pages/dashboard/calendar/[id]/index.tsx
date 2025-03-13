import { format, addHours, isSameDay } from "date-fns";
import { RiArrowLeftSLine } from "@remixicon/react";
import { useRouter } from "next/router";
import React from "react";

import { DashboardLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/shared";
import type { EventProps } from "@/types";

const events: EventProps[] = [];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const TIME_HEIGHT = 48;

type EventStatus = "past" | "upcoming" | "current";

type DayEventProps = EventProps & {
  status: EventStatus;
};

type DayProps = {
  day: number | null;
  events: DayEventProps[];
};

const CalendarPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Date calculations
  const current = React.useMemo(() => {
    if (!id || typeof id !== "string") return new Date();
    const date = new Date();
    const dayNum = parseInt(id);
    if (isNaN(dayNum)) return new Date();
    date.setDate(dayNum);
    return date;
  }, [id]);

  // Scroll to current time on mount
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const currentHour = new Date().getHours();
      scrollContainerRef.current.scrollTop = currentHour * TIME_HEIGHT - 200;
    }
  }, []);

  // Event status helper
  const getEventStatus = React.useCallback((event: EventProps): EventStatus => {
    const today = new Date();
    const firstDate = new Date(event.date[0]);
    const lastDate = new Date(event.date[event.date.length - 1]);

    if (lastDate < today) return "past";
    if (firstDate > today) return "upcoming";
    return "current";
  }, []);

  // Calendar helper functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Process events for the current month
  const processedEvents = React.useMemo(() => {
    const monthEvents: Record<string, EventProps[]> = {};
    events.forEach((event) => {
      event.date.forEach((dateItem) => {
        const eventDate = new Date(dateItem);
        if (
          eventDate.getFullYear() === current.getFullYear() &&
          eventDate.getMonth() === current.getMonth()
        ) {
          const dateKey = eventDate.getDate().toString();
          if (!monthEvents[dateKey]) {
            monthEvents[dateKey] = [];
          }
          monthEvents[dateKey].push(event);
        }
      });
    });
    return monthEvents;
  }, [current]);

  // Calculate calendar days
  const calendarDays = React.useMemo(() => {
    const year = current.getFullYear();
    const month = current.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: DayProps[] = [];

    // Add empty days for the start of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, events: [] });
    }

    // Add days with events
    for (let day = 1; day <= daysInMonth; day++) {
      const eventForDay = processedEvents[day] || [];
      days.push({
        day,
        events: eventForDay.map((event) => ({
          ...event,
          status: getEventStatus(event),
        })),
      });
    }

    return days;
  }, [current, getEventStatus, processedEvents]);

  const dayItems = calendarDays.find((dayItem) => dayItem.day === Number(id));

  // Calculate event position
  const getEventPosition = (event: DayEventProps) => {
    const startDate = new Date(event.date[0]);
    if (!isSameDay(startDate, current)) return null;

    const startHour = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endDate = addHours(startDate, 1);
    const endHour = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    const top = startHour * TIME_HEIGHT + (startMinutes / 60) * TIME_HEIGHT;
    const height =
      (endHour - startHour) * TIME_HEIGHT +
      ((endMinutes - startMinutes) / 60) * TIME_HEIGHT;

    return { top, height };
  };

  // Render time column
  const renderTimeColumn = () => (
    <div className="sticky left-0 w-16 bg-white pr-2">
      {HOURS.map((hour) => (
        <div
          key={hour}
          className="relative h-12 border-r text-xs text-gray-500"
        >
          {hour !== 0 && (
            <span className="absolute -top-2 right-2">
              {format(new Date().setHours(hour, 0), "ha")}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  // Render events
  const renderEvents = () => (
    dayItems?.events.map((event) => {
      const position = getEventPosition(event);
      if (!position) return null;
      return (
        <div
          key={event.id}
          className="absolute left-1 right-1 rounded bg-blue-100 p-2 text-sm"
          style={{
            top: `${position.top}px`,
            height: `${position.height}px`,
          }}
        >
          <div className="font-medium">{event.title}</div>
          <div className="text-xs text-gray-600">
            {format(new Date(event.date[0]), "h:mm a")} -
            {format(addHours(new Date(event.date[0]), 1), "h:mm a")}
          </div>
        </div>
      );
    })
  );

  return (
    <>
      <Seo />
      <DashboardLayout>
        <div className="flex h-full w-full flex-col gap-2 px-8 py-4">
          <Button onClick={() => router.back()} size="cmd" variant="cmd">
            <RiArrowLeftSLine />
            Back
          </Button>
          <div className="flex h-full flex-col gap-6">
            <h3 className="text-xl font-medium">{format(current, "PPP")}</h3>
            <div
              ref={scrollContainerRef}
              className="relative flex flex-1 overflow-y-auto"
            >
              {renderTimeColumn()}
              <div className="relative flex-1">
                {HOURS.map((hour) => (
                  <div key={hour} className="h-12 border-b border-gray-100" />
                ))}
                {isSameDay(current, new Date()) && (
                  <div
                    className="absolute left-0 right-0 border-t-2 border-red-500"
                    style={{
                      top: `${
                        new Date().getHours() * TIME_HEIGHT +
                        (new Date().getMinutes() / 60) * TIME_HEIGHT
                      }px`,
                    }}
                  >
                    <div className="absolute -left-2 -top-[7px] h-3 w-3 rounded-full bg-red-500" />
                  </div>
                )}
                {renderEvents()}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CalendarPage;
