import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../../entities/user";

interface PayloadData extends User {
  id: mongoose.Types.ObjectId;
}

export const accessToken = (payload: PayloadData) => {
  const { id, email, isAdmin } = payload;
  const token = jwt.sign({ id, email, isAdmin }, "secret-token");
  return token;
};
