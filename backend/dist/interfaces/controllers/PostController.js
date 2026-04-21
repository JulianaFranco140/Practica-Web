"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const supabase_1 = require("../../infrastructure/supabase");
const crypto_1 = __importDefault(require("crypto"));
class PostController {
    constructor() {
        this.getPosts = async (req, res) => {
            const token = req.headers["x-session-token"];
            if (!token) {
                res.status(401).json({ ok: false, message: "Invalid session" });
                return;
            }
            const { data, error } = await supabase_1.supabaseServer.rpc("app_list_posts", {
                p_token: token,
            });
            if (error) {
                res.status(400).json({ ok: false, message: error.message, posts: [] });
                return;
            }
            res.status(200).json({ ok: true, posts: data ?? [] });
        };
        this.createPost = async (req, res) => {
            try {
                const token = (req.body.sessionToken || "").trim();
                const userId = (req.body.userId || "").trim();
                const title = (req.body.title || "").trim();
                const category = (req.body.category || "").trim();
                const content = (req.body.content || "").trim();
                const imageFile = req.file;
                if (!token || !userId) {
                    res.status(401).json({ ok: false, message: "Invalid session" });
                    return;
                }
                if (title.length < 3 || content.length < 10 || !category) {
                    res.status(400).json({ ok: false, message: "Invalid post data" });
                    return;
                }
                let imageUrl = null;
                const BUCKET_NAME = "post-images";
                if (imageFile && imageFile.size > 0) {
                    const sanitizedName = imageFile.originalname.replace(/\s+/g, "-").toLowerCase();
                    const path = `${userId}/${Date.now()}-${crypto_1.default.randomUUID()}-${sanitizedName}`;
                    const uploadResult = await supabase_1.supabaseServer.storage.from(BUCKET_NAME).upload(path, imageFile.buffer, {
                        contentType: imageFile.mimetype,
                        upsert: false,
                    });
                    if (uploadResult.error) {
                        res.status(400).json({ ok: false, message: uploadResult.error.message });
                        return;
                    }
                    const publicResult = supabase_1.supabaseServer.storage.from(BUCKET_NAME).getPublicUrl(path);
                    imageUrl = publicResult.data.publicUrl;
                }
                const { data, error } = await supabase_1.supabaseServer.rpc("app_create_post", {
                    p_token: token,
                    p_title: title,
                    p_category: category,
                    p_content: content,
                    p_image_url: imageUrl,
                });
                if (error) {
                    res.status(400).json({ ok: false, message: error.message });
                    return;
                }
                const result = data;
                if (!result?.ok) {
                    res.status(400).json({ ok: false, message: result?.message ?? "Could not create post" });
                    return;
                }
                res.status(201).json({ ok: true, postId: result?.post_id });
            }
            catch {
                res.status(400).json({ ok: false, message: "Invalid body" });
            }
        };
    }
}
exports.PostController = PostController;
