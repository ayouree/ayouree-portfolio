import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import data from "./data.json";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const route = data.routes.find((r) => r.path === pathname);

  if (route) {
    return NextResponse.redirect(route.redirect);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    ...data.routes.map((route) => route.path),
  ],
};
