import { Warning2 } from "iconsax-react";

type ErrorMessageProps = {
  message: string | undefined;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="flex items-center gap-1 font-body text-xs text-error">
      <Warning2 variant="Bold" size={16} />
      <span>{message}</span>
    </p>
  );
};
