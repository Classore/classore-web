import { ModalArt } from "@/assets/illustrations";
import { cn } from "@/lib";

type EmptyScreenProps = {
  title?: string;
  subtitle: string;
  illustration?: React.ReactNode;
  className?: string;
};

export const EmptyState = ({
  subtitle,
  illustration,
  title,
  className,
}: EmptyScreenProps) => {
  return (
    <div
      className={cn(
        "flex min-h-44 w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-white p-10",
        className,
      )}
    >
      <div className="absolute -top-96 left-0">
        <ModalArt />
      </div>

      {illustration}

      <div className="flex flex-col gap-1">
        {title ? (
          <p className="text-center text-sm font-medium capitalize">{title}</p>
        ) : null}
        <p className="text-center text-sm text-neutral-400">{subtitle}</p>
      </div>
    </div>
  );
};
