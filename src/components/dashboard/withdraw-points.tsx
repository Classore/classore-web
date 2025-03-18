import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export const WithdrawPoints = ({ onOpenChange, open }: Props) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-[400px] p-1">
        <div className="w-full px-4 pt-14 pb-4">
          <div>
            <DialogTitle>Withdraw Points</DialogTitle>
            <DialogDescription hidden>Withdraw Points</DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
