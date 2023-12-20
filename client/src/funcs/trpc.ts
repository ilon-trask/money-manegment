import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../server";
const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "https://money-manegment-production.up.railway.app/",
    }),
  ],
});

export default client;
