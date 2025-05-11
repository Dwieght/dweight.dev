import prisma from "~/config/Prisma";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
export const notepadRouter = router({
    getAllNotePad: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(async ({ input }) => {
            const notepad = await prisma.notepad.findMany({
                where: {
                    userId: input.userId,
                },
            });
            return notepad;
        }),
});
