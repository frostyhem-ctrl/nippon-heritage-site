import { createClient } from "@supabase/supabase-js";
import { getRequiredEnv } from "./env";

const baseOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

export function createAnonClient() {
  return createClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    baseOptions
  );
}

export function createServiceClient() {
  return createClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    baseOptions
  );
}
