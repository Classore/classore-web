import { RiDeleteBin6Line, RiImageLine } from "@remixicon/react";

import { useFileHandler } from "@/hooks";
import { UpdateProfileMutation } from "@/queries";
import { useGetProfile } from "@/queries/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Spinner } from "../shared";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";


const Profile = () => {
  const schema = z.object({
    first_name: z.string().min(1, { message: "Please enter your first name" }),
    last_name: z.string().min(1, { message: "Please enter your last name" }),
    email: z
      .string()
      .min(1, { message: "Please enter your email address" })
      .email("Please enter a valid email"),
    phone_number: z
      .string()
      .min(1, { message: "Please enter your phone number" })
      .min(11, { message: "Phone number must be at least 11 characters" })
      .max(11, { message: "Phone number must be at most 11 characters" }),
    description: z
      .string()
      .min(1, { message: "Please enter your description" })
      .or(z.literal("")),
    birthday: z
      .string({ required_error: "Please enter your date of birth" })
      .min(1, { message: "Please enter your date of birth" })
      .transform((d) => format(d, "MM/dd/yyyy")),
    profile_image: z.instanceof(File).or(z.string()),
  });
  
  type FormValues = z.infer<typeof schema>;
  
  const queryClient = useQueryClient();
  const { data: user, isPending } = useGetProfile();

  const { control, handleSubmit, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      phone_number: user?.phone_number ?? "",
      description: user?.description ?? "",
      birthday: user?.birthday ?? "",
      profile_image: user?.profile_image ?? "",
    },
  });
  const avatar = useWatch({
    control,
    name: "profile_image",
  });

  const src = typeof avatar === "string" ? avatar : URL.createObjectURL(avatar);

  const { handleClick, handleFileChange, inputRef } = useFileHandler({
    onFilesChange: (files) => {
      const file = files[0];
      // URL.createObjectURL(file);
      setValue("profile_image", file);
    },
  });

  const { mutate, isPending: updatePending } = useMutation({
    mutationFn: UpdateProfileMutation,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <>
      {isPending ? (
        <div className="flex w-full flex-col items-center justify-center gap-1 py-4">
          <Spinner variant="primary" />
          <p className="text-xs text-primary-300">Getting profile details...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-3 border-t"
        >
          <div className="flex w-full items-center justify-between border-b border-b-neutral-200 py-5">
            <Avatar className="size-16 border">
              <AvatarImage src={src} className="bg-neutral-100 object-cover" />
            </Avatar>
            <div className="flex items-center gap-2">
              <label htmlFor="image">
                <input
                  type="file"
                  name="image"
                  ref={inputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(src);
                    handleClick();
                  }}
                  variant="outline"
                  className="w-fit px-4 py-1.5 !text-sm font-normal text-neutral-400"
                >
                  <RiImageLine size={20} />
                  Change Image
                </Button>
              </label>
              <Button
                type="button"
                onClick={() =>
                  setValue("profile_image", user?.profile_image ?? "")
                }
                variant="outline"
                className="size-9 text-red-600"
              >
                <RiDeleteBin6Line size={20} />
              </Button>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2">
            <Input
              type="text"
              name="first_name"
              label="First Name"
              className="capitalize"
              control={control}
            />
            <Input
              type="text"
              name="last_name"
              label="Last Name"
              className="capitalize"
              control={control}
            />
          </div>
          <Input
            type="email"
            name="email"
            label="Email address"
            control={control}
          />
          <Input
            type="date"
            name="birthday"
            label="Date of Birth"
            control={control}
          />
          <Input
            type="tel"
            name="phone_number"
            label="Phone Number"
            pattern="[0-9]*"
            maxLength={11}
            minLength={11}
            control={control}
          />
          <Textarea
            control={control}
            name="description"
            label="Describe Yourself"
          />

          <div className="flex w-full items-center justify-between pt-10">
            <Button
              type="button"
              variant="text"
              disabled={updatePending}
              className="w-fit !text-sm text-red-500 hover:bg-red-50 hover:text-red-700"
            >
              Delete Account
            </Button>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => reset()}
                disabled={updatePending}
                type="button"
                variant="outline"
                className="w-fit !text-sm text-neutral-400"
              >
                Reset Changes
              </Button>
              <Button
                disabled={updatePending}
                type="submit"
                className="w-fit !text-sm font-bold"
              >
                {updatePending ? <Spinner /> : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Profile;
