import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl.origin));
  }
});

// middleware will be get invoked for below paths
export const config = {
  matcher: ["/users/:path*"],
};
