"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchUsers() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    return { error, data: [] };
  }
}

export async function fetchCurrentUser() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    return { error, data: [] };
  }
}

export async function fetchChats() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("chat-messages").select("*");

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    return { error, data: [] };
  }
}
