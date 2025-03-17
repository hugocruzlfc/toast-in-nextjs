"use client";

import { upvoteUser } from "@/data-layer/users";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { toastCallbacks, withCallbacks } from "@/lib/utils";

type UserItemProps = {
  user: {
    id: string;
    name: string;
    upvotes: number;
  };
};

const UserItem = ({ user }: UserItemProps) => {
  // const [isPending, startTransition] = useTransition();

  // const upvoteAction = async (formData: FormData) => {
  //   startTransition(async () => {
  //     const promise = upvoteUser(formData);

  //     toast.promise(promise, {
  //       loading: "Upvoting ...",
  //       success: (result) => {
  //         if (result.message && result.status === "SUCCESS") {
  //           return result.message;
  //         }
  //       },
  //       error: (result) => {
  //         if (result.message && result.status === "ERROR") {
  //           return result.message;
  //         }
  //       },
  //     });
  //   });
  // };

  const [, upvoteAction, upvotePending] = useActionState(
    withCallbacks(upvoteUser, toastCallbacks),
    null
  );

  return (
    <div className="flex items-center space-x-6 p-6">
      <div>
        <h2>{user.name}</h2>
        <p>Upvotes: {user.upvotes}</p>
      </div>

      <form
        action={upvoteAction}
        className="w-2/3 space-y-6"
      >
        <input
          type="hidden"
          name="userId"
          value={user.id}
        />
        <Button type="submit">
          {/* {isPending ? ( */}
          {upvotePending ? (
            <p className="flex items-center space-x-2">
              <LoaderCircle className="animate-spin" />
              <span>Upvoting ...</span>
            </p>
          ) : (
            "Upvote"
          )}
        </Button>
      </form>
    </div>
  );
};

export { UserItem };
