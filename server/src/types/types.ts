// server/src/types.ts
import { Request } from "express";

export interface AuthRequest<Body = any, Params = any, Query = any>
  extends Request<Params, any, Body, Query> {
  userId?: any;
  cookies: any;
}
