import { useGetProfile } from "@/queries/student";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";

type QuizAlertProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenTakeQuiz: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuizAlertModal = ({
  open,
  setOpen,
  setOpenTakeQuiz,
}: QuizAlertProps) => {
  const { data: profile } = useGetProfile();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
				<Button className="w-48 text-sm">
					<span>Go to Next Chapter</span>
					<RiArrowRightSLine className="size-4" />
				</Button>
			</DialogTrigger> */}

      <DialogContent className="flex flex-col gap-4">
        <DialogTitle className="text-2xl font-bold">Quiz Alert</DialogTitle>

        <div className="flex flex-col gap-2 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-400">
          <p>
            Hey <span className="capitalize">{profile?.first_name}</span>, you
            have to take a quiz after every lesson.
          </p>
          <p>Score 70% and above to qualify for the next lesson</p>
        </div>

        <div className="flex w-full items-center justify-end gap-4 border-t border-t-neutral-200 pt-4">
          <DialogClose asChild>
            <Button
              className="w-32 text-sm font-medium text-neutral-400"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-32 text-sm"
            onClick={() => {
              setOpen(false);
              setOpenTakeQuiz(true);
            }}
          >
            Take Quiz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
