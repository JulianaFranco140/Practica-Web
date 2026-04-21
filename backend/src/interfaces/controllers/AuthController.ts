import { Request, Response } from "express";
import { supabaseServer } from "../../infrastructure/supabase";

export class AuthController {
  
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const username = req.body.username?.trim() ?? "";
      const password = req.body.password ?? "";

      if (!username || !password) {
        res.status(400).json({ ok: false, message: "Username and password are required" });
        return;
      }

      const { data, error } = await supabaseServer.rpc("app_login", {
        p_username: username,
        p_password: password,
      });

      if (error) {
        res.status(401).json({ ok: false, message: error.message });
        return;
      }

      const result = data as any;
      if (!result?.ok || !result?.token) {
        res.status(401).json({ ok: false, message: result?.message ?? "Invalid credentials" });
        return;
      }

      res.status(200).json({ ok: true, userId: result.user_id, token: result.token });
    } catch (err: any) {
      res.status(400).json({ ok: false, message: "Invalid request" });
    }
  };

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const username = req.body.username?.trim() ?? "";
      const password = req.body.password ?? "";

      if (!username || !password) {
        res.status(400).json({ ok: false, message: "Username and password are required" });
        return;
      }

      const { data, error } = await supabaseServer.rpc("app_register", {
        p_username: username,
        p_password: password,
      });

      if (error) {
        res.status(400).json({ ok: false, message: error.message });
        return;
      }

      const result = data as any;
      if (!result?.ok) {
        res.status(400).json({ ok: false, message: result?.message ?? "Could not register" });
        return;
      }

      res.status(201).json({ ok: true, userId: result.user_id });
    } catch {
      res.status(400).json({ ok: false, message: "Invalid request" });
    }
  };

  public logout = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ ok: true });
  };
}
