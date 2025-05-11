// import prisma from "~/config/Prisma";
import z from "zod";
import prisma from "~/config/Prisma";
import { router, publicProcedure } from "../trpc";

export const youtubeLink = router({
    getAllLinks: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(async ({ input }) => {
            const links = await prisma.youtubeLink.findMany({
                where: {
                    userId: input.userId,
                },
            });
            return links;
        }),
});
