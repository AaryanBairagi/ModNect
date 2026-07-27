import { NextResponse } from "next/server";
import { z } from "zod";

export function validate<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
):
  | {
      success: true;
      data: z.infer<T>;
    }
  | {
      success: false;
      response: NextResponse;
    } {

  const result = schema.safeParse(data);

  if (!result.success) {

    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          message: formattedErrors[0].message, // First error
          errors: formattedErrors,             // All errors
        },
        {
          status: 400,
        }
      ),
    };
  }

  return {
    success: true,
    data: result.data,
  };
}