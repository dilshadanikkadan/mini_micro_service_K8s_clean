import { Response } from "express";
import { CustomSucces } from "./custumeSuccess";

export const successMessage = (
  res: Response,
  statusCode: number,
  message: any
) => {
  return res.status(statusCode).json(message);
};

