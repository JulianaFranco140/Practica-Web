"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseServer = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.warn("Warning: Missing SUPABASE environment variables in Backend");
}
exports.supabaseServer = (0, supabase_js_1.createClient)(supabaseUrl || "", supabaseServiceRoleKey || "", {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
