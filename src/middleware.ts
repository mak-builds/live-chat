import { NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";
export async function middleware(req: any) {
  const res = NextResponse.next();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/home/:path*"],
};
