import { auth } from "../auth";
import { apiAuthPrefix, authRoutes, Routes } from "../routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuth = !!req.auth;
  const isApiAuthURL = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname as Routes);

  if (isApiAuthURL) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isAuth) {
      return Response.redirect(new URL(Routes.MAIN, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isAuth) {
    let callbackURL = nextUrl.pathname;
    if (nextUrl.search) {
      callbackURL += nextUrl.search;
    }

    const encodedCallbackURL = encodeURIComponent(callbackURL);

    return Response.redirect(
      new URL(`${Routes.SIGN_IN}?callbackUrl=${encodedCallbackURL}`, nextUrl),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
