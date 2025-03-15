import { getInitials } from "@/lib";
import { useUserStore } from "@/store/z-store";
import { RiCloseLine, RiLock2Line, RiUser3Line } from "@remixicon/react";
import { User03 } from "@untitled-ui/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Profile from "./profile";
import Security from "./security";

const tabs = [
  {
    label: "My Profile",
    name: "profile",
    icon: RiUser3Line,
  },
  // {
  //   label: "Notifications",
  //   name: "notification",
  //   icon: RiNotification4Line,
  // },
  {
    label: "Security",
    name: "security",
    icon: RiLock2Line,
  },
  // {
  //   label: "Points and Referral",
  //   name: "points",
  //   icon: RiUserAddLine,
  // },
];

export const AccountSettingsDrawer = () => {
  const { user } = useUserStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-2 border-b border-b-neutral-200 px-2 py-3 text-sm text-neutral-400"
        >
          <User03 height={19} width={19} />
          <span>Edit profile</span>
        </button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-4 rounded-2xl sm:max-w-xl md:w-3/5">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold">Account Setting</SheetTitle>

          <SheetClose className="rounded-full bg-neutral-100 p-1.5 transition-colors hover:bg-neutral-200">
            <RiCloseLine size={18} />
          </SheetClose>
        </SheetHeader>

        {/* <div className="flex "> */}
        <div>
          <div className="h-40 w-full rounded-lg bg-gradient-to-r from-secondary-100 from-10% to-primary-200 to-100%" />

          <div className="flex gap-4 px-4">
            <Avatar className="-mt-12 size-28 bg-primary-500">
              <AvatarImage src="" />
              <AvatarFallback className="text-5xl font-semibold text-white">
                {getInitials(`${user?.first_name} ${user?.last_name}`)}
              </AvatarFallback>
            </Avatar>
            <div className="pt-1">
              <p className="font-bold capitalize">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm text-neutral-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue={tabs[0].name} className="pt-4">
          <TabsList className="overflow-x-auto overflow-y-hidden">
            {tabs.map(({ label, name, icon: Icon }) => (
              <TabsTrigger
                key={name}
                value={name}
                className="flex items-center gap-2"
              >
                <Icon size={18} />
                <span>{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          {/* <TabsContent value="notification">
            <Notification />
          </TabsContent> */}
          <TabsContent value="security">
            <Security />
          </TabsContent>
          {/* <TabsContent value="points">
            <Points />
          </TabsContent> */}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
