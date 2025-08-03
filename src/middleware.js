import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "7a0084c8-0bfc-4aae-8bc3-8569357e9061");
  requestHeaders.set("x-createxyz-project-group-id", "8d2838ff-82d5-42d4-abea-4c149f1a78d4");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}