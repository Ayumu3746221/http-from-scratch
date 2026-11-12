export default function Server() {
  Bun.serve({
    port: 8080,
    routes: {},
    fetch(req) {
      return new Response(`Not Found ${req.method}:${req.url}\n`, { status: 404 });
    },
  });
}
