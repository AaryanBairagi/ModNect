import { z } from "zod";

export const ObjectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId");

export const UsernameSchema = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters.")
  .max(30, "Username cannot exceed 30 characters.")
  .regex(
    /^[a-zA-Z0-9_.]+$/,
    "Username can only contain letters, numbers, underscores, and periods."
  );

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(100, "Password cannot exceed 100 characters.")
  .regex(
    /[A-Z]/,
    "Password must contain at least one uppercase letter."
  )
  .regex(
    /[a-z]/,
    "Password must contain at least one lowercase letter."
  )
  .regex(
    /\d/,
    "Password must contain at least one number."
  )
  .regex(
    /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/,
    "Password must contain at least one special character."
  );

export const EmailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address.");

export const NameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(50, "Name cannot exceed 50 characters.");

export const BioSchema = z
  .string()
  .trim()
  .max(300, "Bio cannot exceed 300 characters.")
  .optional();

export const ImageSchema = z
  .string()
  .url("Please provide a valid image URL.")
  .optional();