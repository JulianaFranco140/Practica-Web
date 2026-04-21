(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStoredSessionToken",
    ()=>getStoredSessionToken,
    "getStoredUserId",
    ()=>getStoredUserId,
    "getStoredUsername",
    ()=>getStoredUsername,
    "loginWithUsername",
    ()=>loginWithUsername,
    "logoutCustomSession",
    ()=>logoutCustomSession,
    "registerWithUsername",
    ()=>registerWithUsername
]);
const SESSION_KEY = "blog_session_token";
const USER_ID_KEY = "blog_user_id";
const USERNAME_KEY = "blog_username";
async function registerWithUsername(username, password) {
    const trimmed = username.trim();
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: trimmed,
            password
        })
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
        return {
            ok: false,
            message: data.message ?? "No se pudo registrar"
        };
    }
    return {
        ok: true,
        userId: data.userId
    };
}
async function loginWithUsername(username, password) {
    const trimmed = username.trim();
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: trimmed,
            password
        })
    });
    const data = await response.json();
    if (!response.ok || !data.ok || !data.token) {
        return {
            ok: false,
            message: data.message ?? "Credenciales invalidas"
        };
    }
    localStorage.setItem(SESSION_KEY, data.token);
    if (data.userId) {
        localStorage.setItem(USER_ID_KEY, data.userId);
    }
    localStorage.setItem(USERNAME_KEY, trimmed);
    return {
        ok: true,
        userId: data.userId
    };
}
async function logoutCustomSession() {
    const token = localStorage.getItem(SESSION_KEY);
    if (token) {
        await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token
            })
        });
    }
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USERNAME_KEY);
}
function getStoredSessionToken() {
    return localStorage.getItem(SESSION_KEY);
}
function getStoredUserId() {
    return localStorage.getItem(USER_ID_KEY);
}
function getStoredUsername() {
    return localStorage.getItem(USERNAME_KEY);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/posts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPost",
    ()=>createPost,
    "listPosts",
    ()=>listPosts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
;
async function createPost({ title, category, content, imageFile }) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredSessionToken"])();
    const userId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredUserId"])();
    if (!token || !userId) {
        return {
            ok: false,
            message: "Sesion invalida. Inicia sesion de nuevo."
        };
    }
    const formData = new FormData();
    formData.append("sessionToken", token);
    formData.append("userId", userId);
    formData.append("title", title.trim());
    formData.append("category", category.trim());
    formData.append("content", content.trim());
    if (imageFile) {
        formData.append("imageFile", imageFile);
    }
    const response = await fetch("/api/posts", {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
        return {
            ok: false,
            message: data.message ?? "No se pudo crear la publicacion"
        };
    }
    return {
        ok: true,
        postId: data.postId
    };
}
async function listPosts() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredSessionToken"])();
    if (!token) {
        return {
            ok: false,
            message: "Sesion invalida",
            posts: []
        };
    }
    const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
            "x-session-token": token
        }
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
        return {
            ok: false,
            message: data.message ?? "Error listando publicaciones",
            posts: []
        };
    }
    return {
        ok: true,
        posts: data.posts ?? []
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/posts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function DashboardPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(85);
    if ($[0] !== "8b637599d87c10f5d15462ef9289b0b0c1ceee8b461825f712afe08a6f70145c") {
        for(let $i = 0; $i < 85; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8b637599d87c10f5d15462ef9289b0b0c1ceee8b461825f712afe08a6f70145c";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Productividad");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingPosts, setLoadingPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [username] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(_DashboardPageUseState);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedPost, setSelectedPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = async function loadPosts() {
            setLoadingPosts(true);
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listPosts"])();
            if (!result.ok) {
                setError(result.message ?? "No se pudieron cargar las publicaciones");
                setLoadingPosts(false);
                return;
            }
            setPosts(result.posts);
            setLoadingPosts(false);
        };
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const loadPosts = t1;
    let t2;
    let t3;
    if ($[3] !== router) {
        t2 = ({
            "DashboardPage[useEffect()]": ()=>{
                const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredSessionToken"])();
                if (!token) {
                    router.replace("/login");
                    return;
                }
                loadPosts();
            }
        })["DashboardPage[useEffect()]"];
        t3 = [
            router
        ];
        $[3] = router;
        $[4] = t2;
        $[5] = t3;
    } else {
        t2 = $[4];
        t3 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[6] !== category || $[7] !== content || $[8] !== imageFile || $[9] !== title) {
        t4 = ({
            "DashboardPage[handleCreatePost]": async (event)=>{
                event.preventDefault();
                setError(null);
                if (title.trim().length < 3) {
                    setError("El titulo debe tener al menos 3 caracteres.");
                    return;
                }
                if (content.trim().length < 10) {
                    setError("El contenido debe tener al menos 10 caracteres.");
                    return;
                }
                setSaving(true);
                const result_0 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPost"])({
                    title,
                    category,
                    content,
                    imageFile
                });
                if (!result_0.ok) {
                    setError(result_0.message ?? "No se pudo crear la publicacion");
                    setSaving(false);
                    return;
                }
                setTitle("");
                setCategory("Productividad");
                setContent("");
                setImageFile(null);
                await loadPosts();
                setSaving(false);
            }
        })["DashboardPage[handleCreatePost]"];
        $[6] = category;
        $[7] = content;
        $[8] = imageFile;
        $[9] = title;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    const handleCreatePost = t4;
    let t5;
    if ($[11] !== router) {
        t5 = ({
            "DashboardPage[handleLogout]": async ()=>{
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutCustomSession"])();
                router.replace("/login");
            }
        })["DashboardPage[handleLogout]"];
        $[11] = router;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    const handleLogout = t5;
    let t6;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-medium uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400",
            children: "Dashboard"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 134,
            columnNumber: 10
        }, this);
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    const t7 = username ? `Bienvenido(a), ${username}` : "Bienvenida a tu espacio de publicaciones";
    let t8;
    if ($[14] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "mt-2 text-3xl font-semibold tracking-tight sm:text-4xl",
            children: t7
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 142,
            columnNumber: 10
        }, this);
        $[14] = t7;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base",
            children: "Aqui puedes crear nuevas publicaciones y revisar las ideas que ya compartiste en tu blog interactivo."
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 150,
            columnNumber: 10
        }, this);
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== t8) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t6,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[17] = t8;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: {
                    "DashboardPage[<button>.onClick]": ()=>setIsLogoutModalOpen(true)
                }["DashboardPage[<button>.onClick]"],
                className: "inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85",
                children: "Cerrar sesion"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 165,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 165,
            columnNumber: 11
        }, this);
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== t10) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "flex flex-col gap-4 rounded-3xl border border-black/[.08] bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/[.145] dark:bg-black/50 sm:flex-row sm:items-center sm:justify-between sm:p-8",
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 174,
            columnNumber: 11
        }, this);
        $[20] = t10;
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    let t14;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-semibold",
            children: "Crear publicacion"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 183,
            columnNumber: 11
        }, this);
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 text-sm text-zinc-600 dark:text-zinc-400",
            children: "Crea una publicacion y opcionalmente sube una imagen."
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 184,
            columnNumber: 11
        }, this);
        $[22] = t13;
        $[23] = t14;
    } else {
        t13 = $[22];
        t14 = $[23];
    }
    let t15;
    if ($[24] !== error) {
        t15 = error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/25 dark:text-red-300",
            children: error
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 193,
            columnNumber: 19
        }, this) : null;
        $[24] = error;
        $[25] = t15;
    } else {
        t15 = $[25];
    }
    let t16;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = ({
            "DashboardPage[<input>.onChange]": (event_0)=>setTitle(event_0.target.value)
        })["DashboardPage[<input>.onChange]"];
        $[26] = t16;
    } else {
        t16 = $[26];
    }
    let t17;
    if ($[27] !== title) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-2 text-sm font-medium",
            children: [
                "Titulo",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Ej: 5 ideas para aprender mejor",
                    value: title,
                    onChange: t16,
                    className: "h-11 rounded-xl border border-black/[.08] bg-white px-3 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 210,
                    columnNumber: 76
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 210,
            columnNumber: 11
        }, this);
        $[27] = title;
        $[28] = t17;
    } else {
        t17 = $[28];
    }
    let t18;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = ({
            "DashboardPage[<select>.onChange]": (event_1)=>setCategory(event_1.target.value)
        })["DashboardPage[<select>.onChange]"];
        $[29] = t18;
    } else {
        t18 = $[29];
    }
    let t19;
    let t20;
    let t21;
    let t22;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            children: "Productividad"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 230,
            columnNumber: 11
        }, this);
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            children: "Estudio"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            children: "Tecnologia"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 232,
            columnNumber: 11
        }, this);
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            children: "Reflexiones"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        $[30] = t19;
        $[31] = t20;
        $[32] = t21;
        $[33] = t22;
    } else {
        t19 = $[30];
        t20 = $[31];
        t21 = $[32];
        t22 = $[33];
    }
    let t23;
    if ($[34] !== category) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-2 text-sm font-medium",
            children: [
                "Categoria",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: category,
                    onChange: t18,
                    className: "h-11 rounded-xl border border-black/[.08] bg-white px-3 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950",
                    children: [
                        t19,
                        t20,
                        t21,
                        t22
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 246,
                    columnNumber: 79
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 246,
            columnNumber: 11
        }, this);
        $[34] = category;
        $[35] = t23;
    } else {
        t23 = $[35];
    }
    let t24;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = ({
            "DashboardPage[<textarea>.onChange]": (event_2)=>setContent(event_2.target.value)
        })["DashboardPage[<textarea>.onChange]"];
        $[36] = t24;
    } else {
        t24 = $[36];
    }
    let t25;
    if ($[37] !== content) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-2 text-sm font-medium",
            children: [
                "Contenido",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    rows: 6,
                    placeholder: "Escribe aqui tu idea...",
                    value: content,
                    onChange: t24,
                    className: "resize-none rounded-xl border border-black/[.08] bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground dark:border-white/[.145] dark:bg-zinc-950"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 263,
                    columnNumber: 79
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 263,
            columnNumber: 11
        }, this);
        $[37] = content;
        $[38] = t25;
    } else {
        t25 = $[38];
    }
    let t26;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-2 text-sm font-medium",
            children: [
                "Imagen (opcional)",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "file",
                    accept: "image/png,image/jpeg,image/webp",
                    onChange: {
                        "DashboardPage[<input>.onChange]": (event_3)=>{
                            const nextFile = event_3.target.files?.[0] ?? null;
                            setImageFile(nextFile);
                        }
                    }["DashboardPage[<input>.onChange]"],
                    className: "h-11 rounded-xl border border-black/[.08] bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-foreground file:mr-3 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1 file:text-xs file:font-medium dark:border-white/[.145] dark:bg-zinc-950 dark:file:bg-zinc-800"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 271,
                    columnNumber: 87
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 271,
            columnNumber: 11
        }, this);
        $[39] = t26;
    } else {
        t26 = $[39];
    }
    const t27 = saving ? "Publicando..." : "Publicar";
    let t28;
    if ($[40] !== saving || $[41] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            disabled: saving,
            className: "mt-2 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85",
            children: t27
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 284,
            columnNumber: 11
        }, this);
        $[40] = saving;
        $[41] = t27;
        $[42] = t28;
    } else {
        t28 = $[42];
    }
    let t29;
    if ($[43] !== handleCreatePost || $[44] !== t17 || $[45] !== t23 || $[46] !== t25 || $[47] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            className: "mt-6 flex flex-col gap-4",
            onSubmit: handleCreatePost,
            children: [
                t17,
                t23,
                t25,
                t26,
                t28
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 293,
            columnNumber: 11
        }, this);
        $[43] = handleCreatePost;
        $[44] = t17;
        $[45] = t23;
        $[46] = t25;
        $[47] = t28;
        $[48] = t29;
    } else {
        t29 = $[48];
    }
    let t30;
    if ($[49] !== t15 || $[50] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "rounded-3xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-black/50 sm:p-8",
            children: [
                t13,
                t14,
                t15,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 305,
            columnNumber: 11
        }, this);
        $[49] = t15;
        $[50] = t29;
        $[51] = t30;
    } else {
        t30 = $[51];
    }
    let t31;
    if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-semibold",
            children: "Publicaciones recientes"
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 314,
            columnNumber: 11
        }, this);
        $[52] = t31;
    } else {
        t31 = $[52];
    }
    let t32;
    if ($[53] !== posts.length) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3",
            children: [
                t31,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
                    children: [
                        posts.length,
                        " resultados"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 321,
                    columnNumber: 73
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 321,
            columnNumber: 11
        }, this);
        $[53] = posts.length;
        $[54] = t32;
    } else {
        t32 = $[54];
    }
    let t33;
    if ($[55] !== loadingPosts) {
        t33 = loadingPosts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-zinc-600 dark:text-zinc-400",
            children: "Cargando publicaciones..."
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 329,
            columnNumber: 26
        }, this) : null;
        $[55] = loadingPosts;
        $[56] = t33;
    } else {
        t33 = $[56];
    }
    let t34;
    if ($[57] !== loadingPosts || $[58] !== posts.length) {
        t34 = !loadingPosts && posts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-zinc-600 dark:text-zinc-400",
            children: "Aun no hay publicaciones. Crea la primera desde el formulario."
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 337,
            columnNumber: 49
        }, this) : null;
        $[57] = loadingPosts;
        $[58] = posts.length;
        $[59] = t34;
    } else {
        t34 = $[59];
    }
    let t35;
    if ($[60] !== loadingPosts || $[61] !== posts) {
        t35 = !loadingPosts ? posts.map({
            "DashboardPage[posts.map()]": (post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    onClick: {
                        "DashboardPage[posts.map() > <article>.onClick]": ()=>setSelectedPost(post)
                    }["DashboardPage[posts.map() > <article>.onClick]"],
                    className: "cursor-pointer rounded-2xl border border-black/[.06] bg-zinc-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/[.12] dark:bg-zinc-900",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold sm:text-lg",
                            children: post.title
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 349,
                            columnNumber: 231
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500",
                            children: post.category
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 349,
                            columnNumber: 299
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-zinc-600 dark:text-zinc-400",
                            children: post.content
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 349,
                            columnNumber: 403
                        }, this),
                        post.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: post.image_url,
                            alt: post.title,
                            className: "mt-3 h-48 w-full rounded-xl object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 349,
                            columnNumber: 500
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-xs text-zinc-500 dark:text-zinc-500",
                            children: [
                                "@",
                                post.username,
                                " · ",
                                new Date(post.created_at).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 349,
                            columnNumber: 606
                        }, this)
                    ]
                }, post.id, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 347,
                    columnNumber: 45
                }, this)
        }["DashboardPage[posts.map()]"]) : null;
        $[60] = loadingPosts;
        $[61] = posts;
        $[62] = t35;
    } else {
        t35 = $[62];
    }
    let t36;
    if ($[63] !== t33 || $[64] !== t34 || $[65] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 flex flex-col gap-4",
            children: [
                t33,
                t34,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 359,
            columnNumber: 11
        }, this);
        $[63] = t33;
        $[64] = t34;
        $[65] = t35;
        $[66] = t36;
    } else {
        t36 = $[66];
    }
    let t37;
    if ($[67] !== t32 || $[68] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "rounded-3xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-black/50 sm:p-8",
            children: [
                t32,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 369,
            columnNumber: 11
        }, this);
        $[67] = t32;
        $[68] = t36;
        $[69] = t37;
    } else {
        t37 = $[69];
    }
    let t38;
    if ($[70] !== t30 || $[71] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "grid gap-6 lg:grid-cols-[1.1fr_1.4fr]",
            children: [
                t30,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 378,
            columnNumber: 11
        }, this);
        $[70] = t30;
        $[71] = t37;
        $[72] = t38;
    } else {
        t38 = $[72];
    }
    let t39;
    if ($[73] !== t12 || $[74] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto flex w-full max-w-6xl flex-col gap-8",
            children: [
                t12,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 387,
            columnNumber: 11
        }, this);
        $[73] = t12;
        $[74] = t38;
        $[75] = t39;
    } else {
        t39 = $[75];
    }
    let t40;
    if ($[76] !== selectedPost) {
        t40 = selectedPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity xl:p-8",
            onClick: {
                "DashboardPage[<div>.onClick]": ()=>setSelectedPost(null)
            }["DashboardPage[<div>.onClick]"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex w-full overflow-hidden rounded-3xl border border-black/[.08] bg-white p-6 sm:p-8 shadow-xl dark:border-white/[.145] dark:bg-zinc-950 max-h-[90vh] gap-6 md:gap-8 ${selectedPost.image_url ? "max-w-5xl flex-col md:flex-row" : "max-w-2xl flex-col"}`,
                onClick: _DashboardPageDivOnClick,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex flex-col pr-2 overflow-y-auto ${selectedPost.image_url ? "md:w-1/2" : "w-full"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400",
                                        children: selectedPost.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 504
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: {
                                            "DashboardPage[<button>.onClick]": ()=>setSelectedPost(null)
                                        }["DashboardPage[<button>.onClick]"],
                                        className: "rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-5 w-5",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 400,
                                                columnNumber: 251
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 400,
                                            columnNumber: 172
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 631
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 398,
                                columnNumber: 448
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-foreground sm:text-3xl",
                                children: selectedPost.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 400,
                                columnNumber: 366
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "whitespace-pre-wrap text-base leading-relaxed text-zinc-600 dark:text-zinc-300",
                                    children: selectedPost.content
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 483
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 400,
                                columnNumber: 454
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 border-t border-black/[.08] pt-6 text-sm text-zinc-500 dark:border-white/[.145] dark:text-zinc-500",
                                children: [
                                    "@",
                                    selectedPost.username,
                                    " · ",
                                    new Date(selectedPost.created_at).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 400,
                                columnNumber: 609
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 398,
                        columnNumber: 344
                    }, this),
                    selectedPost.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative min-h-[300px] flex items-center justify-center overflow-hidden rounded-2xl border border-black/[.04] bg-zinc-50 dark:border-white/[.08] dark:bg-zinc-900/50 p-4 md:w-1/2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selectedPost.image_url,
                            alt: selectedPost.title,
                            className: "max-h-full max-w-full object-contain rounded-xl"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 400,
                            columnNumber: 1043
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 400,
                        columnNumber: 848
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 398,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 396,
            columnNumber: 27
        }, this);
        $[76] = selectedPost;
        $[77] = t40;
    } else {
        t40 = $[77];
    }
    let t41;
    if ($[78] !== handleLogout || $[79] !== isLogoutModalOpen) {
        t41 = isLogoutModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-sm rounded-3xl border border-black/[.08] bg-white p-6 shadow-xl dark:border-white/[.145] dark:bg-black",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-foreground",
                        children: "¿Cerrar sesión?"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 408,
                        columnNumber: 286
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-zinc-600 dark:text-zinc-400",
                        children: "¿Estás seguro de que deseas salir de la aplicación?"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 408,
                        columnNumber: 360
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "DashboardPage[<button>.onClick]": ()=>setIsLogoutModalOpen(false)
                                }["DashboardPage[<button>.onClick]"],
                                className: "inline-flex h-10 w-full items-center justify-center rounded-full border border-black/[.08] bg-transparent px-4 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-white/[.145] dark:hover:bg-white/5 sm:w-auto",
                                children: "Cancelar"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 408,
                                columnNumber: 552
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleLogout,
                                className: "inline-flex h-10 w-full items-center justify-center rounded-full bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 sm:w-auto",
                                children: "Cerrar sesión"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 410,
                                columnNumber: 302
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 408,
                        columnNumber: 476
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 408,
                columnNumber: 153
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 408,
            columnNumber: 32
        }, this);
        $[78] = handleLogout;
        $[79] = isLogoutModalOpen;
        $[80] = t41;
    } else {
        t41 = $[80];
    }
    let t42;
    if ($[81] !== t39 || $[82] !== t40 || $[83] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-200 px-4 py-10 text-foreground dark:from-zinc-950 dark:via-zinc-900 dark:to-black sm:px-6 lg:px-8",
            children: [
                t39,
                t40,
                t41
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 419,
            columnNumber: 11
        }, this);
        $[81] = t39;
        $[82] = t40;
        $[83] = t41;
        $[84] = t42;
    } else {
        t42 = $[84];
    }
    return t42;
}
_s(DashboardPage, "OI77XIcgzlC0cr63EI07yZrY0VE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
function _DashboardPageDivOnClick(e) {
    return e.stopPropagation();
}
function _DashboardPageUseState() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredUsername"])();
}
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-compiler-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    var ReactSharedInternals = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    exports.c = function(size) {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher.useMemoCache(size);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_0yn64oj._.js.map