import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TickCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import React from "react";
import { z } from "zod";

import { type WaitlistDto, WaitlistMutation } from "@/queries";
import type { HttpError } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../shared";
import { event } from "@/lib";

const roles = ["student", "parent"] as const;
interface Props {
  onClose: () => void;
}
const defaultValues: WaitlistDto = {
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "+2349023969367",
  waitlist_type: "",
};

export const Modal = ({ onClose }: Props) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (payload: WaitlistDto) => WaitlistMutation(payload),
    mutationKey: ["waitlist"],
    onSuccess: (data) => {
      toast.success(data.message);
      event("CompleteRegistration", { content_name: "Joined waitlist" });
      onClose();
    },
    onError: (error: HttpError) => {
      let msg = "";
      const { message } = error.response.data;
      if (Array.isArray(message)) {
        msg = message[0];
      } else {
        msg = message;
      }
      toast.error(msg ?? "Soemthing went wrong!");
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<WaitlistDto>({
    defaultValues,
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(
      z.object({
        email: z.string().email().nonempty("Email is required"),
        first_name: z.string().nonempty("First name is required"),
        last_name: z.string().nonempty("Last name is required"),
        phone_number: z.string().nonempty("Phone number is required"),
        waitlist_type: z.string().nonempty("Role is required!"),
      }),
    ),
  });

  const onSubmit = (values: WaitlistDto) => {
    const payload = {
      ...values,
      waitlist_type: values.waitlist_type.toUpperCase(),
    };
    mutateAsync(payload);
  };

  const selectedRole = watch("waitlist_type");

  return (
    <div className="flex w-full flex-col gap-8 rounded-3xl border bg-gradient-to-b from-[#fef0e8] to-transparent p-3">
      <div className="flex w-full items-center justify-end"></div>
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-2xl font-semibold">Join Waitlist</h3>
        <p className="text-neutral-500">
          Learning made easy and fun - don&apos;t miss early access to a new way
          of learning
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <div className="flex w-full flex-col gap-3">
          <p className="text-neutral-500">I am joing as</p>
          <div className="grid w-full grid-cols-2 gap-2">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setValue("waitlist_type", role)}
                className={`flex w-full items-center justify-between rounded-full border px-4 py-5 capitalize transition-colors ${role === selectedRole.toLowerCase() ? "border-primary-400" : "border-neutral-300"}`}
              >
                {role}
                <TickCircle
                  size={20}
                  variant="Linear"
                  className={`transition-colors ${role === selectedRole.toLowerCase() ? "fill-primary-400 text-white" : "text-neutral-500 opacity-50"}`}
                />
              </button>
            ))}
          </div>
          {errors.waitlist_type && (
            <p className="text-sm text-red-500">
              {errors.waitlist_type.message}
            </p>
          )}
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="First Name"
              type="text"
              name="first_name"
              control={control}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Last Name"
              type="text"
              name="last_name"
              control={control}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Input
            label="Email Address"
            type="email"
            name="email"
            control={control}
          />
        </div>
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? <Spinner /> : "Join waitlist"}
        </Button>
      </form>
    </div>
  );
};
