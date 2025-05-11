import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "~/server";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: `${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/trpc`,
        }),
    ],
});
