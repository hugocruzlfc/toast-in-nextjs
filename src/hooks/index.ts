import { downvoteUser, upvoteUser } from "@/data-layer/users";
import { withCallbacks, createToastCallbacks } from "@/lib/utils";
import { useActionState } from "react";

export const useDownvoteUser = () => {
  return useActionState(
    withCallbacks(
      downvoteUser,
      createToastCallbacks({
        loadingMessage: "Downvoting ...",
      })
    ),
    null
  );
};

export const useUpvoteUser = () => {
  return useActionState(
    withCallbacks(
      upvoteUser,
      createToastCallbacks({
        loadingMessage: "Upvoting ...",
      })
    ),
    null
  );
};
