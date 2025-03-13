import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
}

const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  ({ children, onClose, open, ...props }, ref) => {
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }, [open]);

    return (
      <div
        ref={ref}
        hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 left-0 top-0 z-40 bg-black/50 backdrop-blur-sm backdrop-filter transition-opacity duration-300 ${
          open ? "block" : "hidden"
        }`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Backdrop.displayName = "Backdrop";

export { Backdrop };
