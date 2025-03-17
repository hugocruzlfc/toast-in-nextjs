import { ActionState, Callbacks } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastCallbacks = {
  onSuccess: (result: ActionState) => {
    if (result?.message) {
      toast.success(result.message);
    }
  },
  onError: (result: ActionState) => {
    if (result?.message) {
      toast.error(result.message);
    }
  },
};

export const withCallbacks = <Args extends unknown[], T extends ActionState>(
  fn: (...args: Args) => Promise<T>,
  callbacks?: Callbacks<T>
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    const result = await promise;

    if (result?.status === "SUCCESS") {
      callbacks?.onSuccess?.(result);
    }

    if (result?.status === "ERROR") {
      callbacks?.onError?.(result);
    }

    return promise;
  };
};
