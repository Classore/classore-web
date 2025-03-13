import React from "react";

import { DialogDescription, DialogTitle } from "../ui/dialog";
import { useUserStore } from "@/store/z-store";
import { Button } from "../ui/button";
import { steps } from "./data";

interface Props {
  exam?: string;
}

type Screen = "information" | "select" | "config";

export const Information = ({ exam }: Props) => {
  const [screen, setScreen] = React.useState<Screen>("information");
  const [current, setCurrent] = React.useState(0);
  const { user } = useUserStore();

  const handleNext = () => {
    if (current === steps.length - 1) {
      if (screen === "information") {
        setScreen("select");
      } else if (screen === "select") {
        setScreen("config");
      } else {
        // TODO: redirect to exam
        console.log("redirect to exam");
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (screen === "config") {
      setScreen("select");
    } else if (screen === "select") {
      setScreen("information");
    } else {
      if (current > 0) {
        setCurrent(current - 1);
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <DialogTitle className="text-xl capitalize">
          Hi {user?.first_name} 👋
        </DialogTitle>
        <DialogDescription className="text-sm">
          Get ready to take your {exam} exam with confidence
        </DialogDescription>
      </div>
      {screen === "information" && (
        <>
          <div className="w-full space-y-2 px-4 py-3.5">
            <p className="text-xs text-neutral-400">STEP {current + 1} of 3</p>
            <p className="text-sm font-medium text-neutral-500">
              {steps[current].label}
            </p>
            <ul className="list-disc">
              <li className="list-item text-xs text-neutral-400">
                {steps[current].description}
              </li>
            </ul>
          </div>
        </>
      )}
      {screen === "select" && <div className="h-20">Select</div>}
      {screen === "config" && <div className="h-20">Config</div>}
      <hr className="w-full bg-neutral-300"></hr>
      <div className="flex w-full items-center justify-end gap-x-4">
        <Button
          onClick={handlePrev}
          className="w-fit"
          size="sm"
          variant="outline"
        >
          {screen === "information" && current === 0 ? "Cancel" : "Prev"}
        </Button>
        <Button onClick={handleNext} className="w-fit" size="sm">
          {screen === "information" ? "Next" : "Start Test"}
        </Button>
      </div>
    </div>
  );
};
