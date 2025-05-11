import { youtubeLink } from "./routers/youtubeLinkRouter";
import { notepadRouter } from "./routers/notepadRouter";
import { mergeRouters } from "./trpc";

export const appRouter = mergeRouters(youtubeLink, notepadRouter);

export type AppRouter = typeof appRouter;
