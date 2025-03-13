import * as React from "react";

import { cn } from "@/lib/utils";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { ErrorMessage } from "../shared";

interface TextareaProps<T extends FieldValues>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  labelClassName?: string;
  control: Control<T>;
  name: Path<T>;
}

const Textarea = <T extends FieldValues>({
  className,
  label,
  labelClassName,
  control,
  name,
  ...props
}: TextareaProps<T>) => {
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
  });
  return (
    <div className={cn("flex flex-col gap-1.5 font-body", className)}>
      <label
        id={name}
        className={cn("text-sm text-neutral-400", labelClassName)}
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          aria-invalid={error ? "true" : "false"}
          data-invalid={error ? "true" : "false"}
          className={cn(
            "text flex min-h-[150px] w-full resize-none rounded-md border border-neutral-200 bg-transparent px-4 py-3 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-300 focus:border-primary-300 focus:shadow-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-red-600 data-[invalid=true]:bg-error/5",
            className,
          )}
          {...field}
          {...props}
        ></textarea>
      </div>

      {error ? <ErrorMessage message={error.message} /> : null}
    </div>
  );
};

export { Textarea };
