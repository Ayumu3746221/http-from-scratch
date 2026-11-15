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
      "/photos/:filename": {
        GET: async (req) => {
          try {
            return new Response(await openPngFile(req.params.filename));
          } catch (error) {
            return toHttpError(error);
          }
        },
        POST: async (req) => {
          console.log("===== console.log(req) =====\n");
          console.log(req);

          console.log("===== console.log(req.header) ====\n");
          console.log(req.headers);

          console.log("===== console.log(req.bytes()) =====\n");
          const bytes = await req.bytes();
          console.log(bytes);

          console.log("===== console.log, metadata =====\n");
          const { format } = await new Bun.Image(bytes).metadata();
          console.log(`this file MIME type is ${format}`);
          const filePath = new URL(`./photos/${req.params.filename}.png`, import.meta.url);
          await Bun.write(filePath, bytes);

          return new Response(`Sorry not impl`, { status: 500 });
        },
      },
    },
    fetch(req) {
      return new Response(`Not Found ${req.method}:${req.url}\n`, { status: 404 });
    },
  });
}
