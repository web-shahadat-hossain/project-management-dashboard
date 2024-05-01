import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "../utils/queryClient";
import { queryClient } from "../utils/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
