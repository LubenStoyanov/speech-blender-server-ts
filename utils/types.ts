import Express from "express";
import { Types } from "mongoose";

export interface Register {
  email: string;
  username: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface JWTPayload {
  id: Types.ObjectId;
  username: string;
  email: string;
}

export interface JWTToken {
  id: Types.ObjectId;
  username: string;
  email: string;
}
