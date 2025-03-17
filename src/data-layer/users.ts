"use server";
import { ActionState } from "@/types";
import { revalidatePath } from "next/cache";

const users = [
  {
    id: "1",
    name: "Alice",
    upvotes: 0,
  },
  {
    id: "2",
    name: "Bob",
    upvotes: 0,
  },
];

export const getUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return users;
};

// for useTransition 👇🏻

// export const upvoteUser = async (formData: FormData) => {
//   await new Promise((resolve) => setTimeout(resolve, 250));

//   const userId = formData.get("userId");

//   const user = users.find((user) => user.id === userId);

//   if (!user) {
//     return { message: "User not found", status: "ERROR" };
//   }

//   user.upvotes += 1;

//   revalidatePath("/");

//   return { message: "User upvoted", status: "SUCCESS" };
// };

const toActionState = (
  message: string,
  status: "SUCCESS" | "ERROR"
): ActionState => {
  return { message, status };
};

export const upvoteUser = async (
  actionState: ActionState,
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const userId = formData.get("userId");

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return toActionState("User not found", "ERROR");
  }

  user.upvotes += 1;

  revalidatePath("/");

  return toActionState("User upvoted", "SUCCESS");
};
