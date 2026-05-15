import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://gigqlfvewvdcdrzfghdq.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZ3FsZnZld3ZkY2RyemZnaGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MDU3MDYsImV4cCI6MjA5NDE4MTcwNn0.KztXGbpQX0J9PoEq51d9zWQhxbrSpDEKl17zreZ45Wc";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);