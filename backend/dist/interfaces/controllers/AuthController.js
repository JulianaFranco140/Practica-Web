"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const supabase_1 = require("../../infrastructure/supabase");
class AuthController {
    constructor() {
        this.login = async (req, res) => {
            try {
                const username = req.body.username?.trim() ?? "";
                const password = req.body.password ?? "";
                if (!username || !password) {
                    res.status(400).json({ ok: false, message: "Username and password are required" });
                    return;
                }
                const { data, error } = await supabase_1.supabaseServer.rpc("app_login", {
                    p_username: username,
                    p_password: password,
                });
                if (error) {
                    res.status(401).json({ ok: false, message: error.message });
                    return;
                }
                const result = data;
                if (!result?.ok || !result?.token) {
                    res.status(401).json({ ok: false, message: result?.message ?? "Invalid credentials" });
                    return;
                }
                res.status(200).json({ ok: true, userId: result.user_id, token: result.token });
            }
            catch (err) {
                res.status(400).json({ ok: false, message: "Invalid request" });
            }
        };
        this.register = async (req, res) => {
            try {
                const username = req.body.username?.trim() ?? "";
                const password = req.body.password ?? "";
                if (!username || !password) {
                    res.status(400).json({ ok: false, message: "Username and password are required" });
                    return;
                }
                const { data, error } = await supabase_1.supabaseServer.rpc("app_register", {
                    p_username: username,
                    p_password: password,
                });
                if (error) {
                    res.status(400).json({ ok: false, message: error.message });
                    return;
                }
                const result = data;
                if (!result?.ok) {
                    res.status(400).json({ ok: false, message: result?.message ?? "Could not register" });
                    return;
                }
                res.status(201).json({ ok: true, userId: result.user_id });
            }
            catch {
                res.status(400).json({ ok: false, message: "Invalid request" });
            }
        };
        this.logout = async (_req, res) => {
            res.status(200).json({ ok: true });
        };
    }
}
exports.AuthController = AuthController;
