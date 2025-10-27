import { useCallback } from "react";
import type { ApiResponse } from "../types/auth.types";
import type { FieldValues, UseFormSetError, Path } from "react-hook-form";

export function useApiFormError<T extends FieldValues>(
  setError: UseFormSetError<T>
) {
  return useCallback(
    (error: any) => {
      const apiError: ApiResponse | undefined = error?.response?.data;
      if (!apiError) {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred. Please try again.",
        });
        return;
      }

      if (apiError.Message) {
        setError("root", { type: "manual", message: apiError.Message });
      }

      if (Array.isArray(apiError.Errors) && apiError.Errors.length > 0) {
        setError("root", {
          type: "manual",
          message: apiError.Errors.join("\n"),
        });
      }

      if (
        apiError.Errors &&
        typeof apiError.Errors === "object" &&
        !Array.isArray(apiError.Errors)
      ) {
        Object.entries(apiError.Errors).forEach(([field, messages]) => {
          return setError(field as Path<T>, {
            type: "manual",
            message: (messages as string[]).join(", "),
          });
        });
      }
    },
    [setError]
  );
}
