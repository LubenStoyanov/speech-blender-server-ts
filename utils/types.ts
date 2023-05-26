import Express from "express";
import type { Types } from "mongoose";

export interface RegisterI {
  email: string;
  username: string;
  password: string;
}

export interface LoginI {
  email: string;
  password: string;
}
export interface PodcastI {
  title: string;
  userId: string;
}
export interface TypedRequestBody<T> extends Express.Request {
  user: JWTPayloadI;
  body: T;
}

export interface JWTPayloadI {
  userId: number;
  username: string;
  email: string;
}

export interface JWTTokenI {
  id: Types.ObjectId;
  username: string;
  email: string;
}
