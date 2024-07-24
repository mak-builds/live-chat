"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function emailLogin(formData: any) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/auth/signin");
}
