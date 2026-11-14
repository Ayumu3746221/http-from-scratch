import { toHttpError } from "./errors/http";
import { openPngFile } from "./services/file";
import { Hello } from "./services/hello";

export default function Server() {
  Bun.serve({
    port: 8080,
    routes: {
      "/hello": new Response("Hello World!!\n", { status: 200 }),
      "/hello/:username": (req) => {
        try {
          return Response.json({ message: Hello(req.params.username) }, { status: 200 });
        } catch (error) {
          return toHttpError(error);
        }
      },
      "/photos/:filename": async (req) => {
        try {
          return new Response(await openPngFile(req.params.filename));
        } catch (error) {
          return toHttpError(error);
        }
      },
    },
    fetch(req) {
      return new Response(`Not Found ${req.method}:${req.url}\n`, { status: 404 });
    },
  });
}
