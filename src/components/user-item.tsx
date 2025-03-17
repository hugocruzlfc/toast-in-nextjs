"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useDeleteUser, useDownvoteUser, useUpvoteUser } from "@/hooks";

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

  const [, upvoteAction, upvotePending] = useUpvoteUser();
  const [, downvoteAction, downvotePending] = useDownvoteUser();
  const [, deleteAction, deletePending] = useDeleteUser();

  return (
    <div className="flex items-center space-x-6 p-6">
      <div>
        <h2>{user.name}</h2>
        <p>Upvotes: {user.upvotes}</p>
      </div>

      <form
        action={upvoteAction}
        className="space-y-6"
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

      <form
        action={downvoteAction}
        className="space-y-6"
      >
        <input
          type="hidden"
          name="userId"
          value={user.id}
        />
        <Button
          type="submit"
          variant="destructive"
        >
          {downvotePending ? (
            <p className="flex items-center space-x-2">
              <LoaderCircle className="animate-spin" />
              <span>Downvoting ...</span>
            </p>
          ) : (
            "Downvote"
          )}
        </Button>
      </form>
      <form
        action={deleteAction}
        className="space-y-6"
      >
        <input
          type="hidden"
          name="userId"
          value={user.id}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={deletePending}
        >
          {deletePending ? (
            <p className="flex items-center space-x-2">
              <LoaderCircle className="animate-spin" />
              <span>Deleting ...</span>
            </p>
          ) : (
            "Delete"
          )}
        </Button>
      </form>
    </div>
  );
};

export { UserItem };
