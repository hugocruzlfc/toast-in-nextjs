export type ActionState =
  | {
      message: string;
      status: "SUCCESS" | "ERROR";
    }
  | null // initial state
  | undefined; // if server action does not return anything

export type Callbacks<T> = {
  onSuccess?: (result: T) => void;
  onError?: (result: T) => void;
};
