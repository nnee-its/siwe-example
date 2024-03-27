import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

function handleQueryError(error: unknown) {
  let message = "";

  if (error instanceof AxiosError)
    message = error.response?.data?.errors?.[0]?.message || error.message;
  else if (error instanceof Error) message = `Execution error: ${error.message}`;
  toast.error(message[0].toUpperCase() + message.slice(1));
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      placeholderData: keepPreviousData,
    },
    mutations: {
      onError: handleQueryError,
    },
  },
});
