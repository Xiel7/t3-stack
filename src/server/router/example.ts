import { createRouter } from "./context";
import { z } from "zod";
import { resolve } from 'path';

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("addSomething", {
    async resolve({ ctx }) {
      const exampleName = await ctx.prisma.example.findFirst({
        where: {
          name: 'name',
          exampleName: 'exampleName',
        }
      })

      if(exampleName?.name != 'name' && exampleName?.exampleName != 'exampleName') {
        await ctx.prisma.example.create({
          data: {
            name: 'name',
            exampleName: 'exampleName',
          }
        })
      }
      return await ctx.prisma.example.findMany();
    }
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
