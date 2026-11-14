import { InvalidRequestError, NotFoundError } from "./application";

export const toHttpError = (error: any): Response => {
  if (error instanceof InvalidRequestError) {
    return Response.json({ message: error.message }, { status: 400 });
  } else if (error instanceof NotFoundError) {
    return Response.json({ message: error.message }, { status: 404 });
  }

  return Response.json({ message: "Invalid Server Error\n" }, { status: 500 });
};
