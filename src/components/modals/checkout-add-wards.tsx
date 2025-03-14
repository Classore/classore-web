import { formatCurrency } from "@/lib";
import { AddWardsMutation, type AddWardsDto } from "@/queries";
import { useMiscStore } from "@/store/z-store/misc";
import { useMutation } from "@tanstack/react-query";
import { Lock02 } from "@untitled-ui/icons-react";
import * as React from "react";
import { toast } from "sonner";
import { Spinner } from "../shared";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

type CheckoutModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CheckoutAddWardsModal = ({
  open,
  setOpen,
}: CheckoutModalProps) => {
  const [visible, setVisible] = React.useState(false);
  const values = useMiscStore((state) => state.payload);
  
  const chosen_subjects = values.vettings.reduce(
    (acc, item) => acc + item.allowed_subjects,
    0,
  );

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-ward"],
    // @ts-expect-error err
    mutationFn: (values: AddWardsDto) => AddWardsMutation(values.wards),
    onSuccess: (data) => {
      setVisible(true);
      window.open(data.data.payment_link_data.authorization_url, "_self");
    },
  });
  const continueToPayment = () => {
    if (!values) {
      toast.error("Something went wrong, please try again");
      return;
    }

    // @ts-expect-error err
    mutate(values.wards);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
				<button
					type="button"
					className="flex w-full items-center gap-2 px-2 py-3 text-sm font-medium text-red-600">
					<span>Log out</span>
				</button>
			</DialogTrigger> */}

      <DialogContent className="flex w-96 flex-col gap-6">
        <h3 className="text-2xl font-bold">Checkout</h3>

        <ul className="flex flex-col gap-4">
          <li>
            <p className="text-sm text-neutral-400">Total number of wards:</p>
            <p className="font-medium capitalize">{values.vettings.length}</p>
          </li>

          <li>
            <p className="text-sm text-neutral-400">
              Total number of chosen subjects:
            </p>
            <p className="font-medium capitalize">{chosen_subjects}</p>
          </li>

          <li>
            <p className="text-sm text-neutral-400">Subtotal:</p>
            <p className="font-medium">
              {formatCurrency(Number(values.summary.base_amount ?? 0))}
            </p>
          </li>

          <li>
            <p className="text-sm text-neutral-400">
              Total number of extra subjects chosen:
            </p>
            <p className="font-medium">
              {values.summary.number_of_extra_subjects_added}
            </p>
          </li>

          <li>
            <p className="text-sm text-neutral-400">Grand total:</p>
            <p className="font-medium">
              {formatCurrency(Number(values.summary.grand_total ?? 0))}
            </p>
          </li>
        </ul>

        <div className="flex flex-col gap-1">
          <Button
            onClick={continueToPayment}
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Spinner />
            ) : (
              `Pay ${formatCurrency(Number(values.summary.grand_total ?? 0))}`
            )}
          </Button>
          <div className="flex items-center gap-1.5 self-center text-neutral-500">
            <Lock02 width={18} />
            <p className="text-center text-sm">Payment secured by Paystack</p>
          </div>
        </div>

        {visible ? (
          <div className="absolute inset-0 z-50 mx-auto grid place-items-center gap-4 rounded-md bg-white/50 p-10 text-center text-sm text-neutral-600 backdrop-blur-sm backdrop-filter">
            <div className="grid place-items-center gap-4 rounded-lg p-10">
              <Spinner variant="primary" size="md" />
              <p className="leading-tight">
                Please wait while we redirect you to the payment page...
              </p>
              <p className="text-xs font-bold">
                NB: <br />
                DO NOT CLOSE THIS WINDOW OR REFRESH THE PAGE
              </p>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
