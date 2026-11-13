import { AppError } from "./errors/application";
import { openPngFile } from "./services/file";
import { Hello } from "./services/hello";

export default function Server() {
  Bun.serve({
    port: 8080,
    routes: {
      "/hello": new Response("Hello World!!\n", { status: 200 }),
      "/hello/:username": (req) => {
        let message: string | null = null;
        try {
          message = Hello(req.params.username);
        } catch (error) {
          if (error instanceof AppError) {
            return Response.json({ message: error.message }, { status: 400 });
          } else {
            return Response.json({ message: "Invalid Server Error\n" }, { status: 500 });
          }
        }
        return Response.json({ message }, { status: 200 });
      },
      "/photos/:filename": async (req) => {
        try {
          return new Response(await openPngFile(req.params.filename));
        } catch (error) {
          if (error instanceof AppError) {
            return Response.json({ message: error.message }, { status: 404 });
          } else {
            return Response.json({ message: "Invalid Server Error\n" }, { status: 500 });
          }
        }
      },
    },
    fetch(req) {
      return new Response(`Not Found ${req.method}:${req.url}\n`, { status: 404 });
    },
  });
}
