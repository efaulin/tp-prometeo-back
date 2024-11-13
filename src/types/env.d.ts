import { Payload } from "../tokenMiddleware";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI : string;
      TOKEN_SECRET : string;
      TOKEN_TIMER : string;
      ENV: "test" | "dev" | "prod";
    }
  }

  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}