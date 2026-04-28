const { createClient } = require("@supabase/supabase-js");
const { getRequiredEnv } = require("./env");

const baseOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

const getSupabaseUrl = () => getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
const getAnonKey = () => getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const getServiceRoleKey = () => getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

const createAnonClient = () =>
  createClient(getSupabaseUrl(), getAnonKey(), {
    ...baseOptions,
  });

const createServiceClient = () =>
  createClient(getSupabaseUrl(), getServiceRoleKey(), {
    ...baseOptions,
  });

module.exports = {
  createAnonClient,
  createServiceClient,
};
