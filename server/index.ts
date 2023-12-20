import z from "zod";
import { publicProcedure, router } from "./trpc";
import express from "express";
import cors from "cors";

import * as trpcExpress from "@trpc/server/adapters/express";

export type AppRouter = typeof appRouter;

import { generalDataRoute } from "./generalDataRouter";
import { recordRouter } from "./recordRouter";

const appRouter = router({
  generalDataRoute: generalDataRoute,
  recordRouter: recordRouter,
  "": publicProcedure.query(() => "some text"),
});

const app = express();
// if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
export type Principal = {
  sub: string;
  role: string;
  email: string;
};

app.use(cors());
app.use(
  "",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  //   await sequelize.sync();
  console.log(`🚀 Server listening on port ${port}`);
});
