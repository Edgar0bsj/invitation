import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Protegedo só a home :D
  if (url.pathname === "/") {
    const authHeader = req.headers.get("authorization");

    const user = process.env.BASIC_USER || "admin";
    const pass = process.env.BASIC_PASS || "12345";

    const expectedAuth =
      "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");

    if (authHeader !== expectedAuth) {
      return new NextResponse("Acesso restrito", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Área restrita"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Aplica somente na rota "/"
};
