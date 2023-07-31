import { Hono } from "hono";
import redirect from "./v1/auth/google/redirect";
import callback from "./v1/auth/google/callback";
import authenticate from "./v1/auth/google/authenticate";

const app = new Hono<{ Bindings: Env }>();
// app.get("v1/auth/google", redirect("pass-through value"));
// app.get("v1/auth/google/", (c) => c.text("Hello Cloudflare Workers!"));
app.get("/v1/auth/google", redirect("pass-through value"));
app.all("/v1/auth/google/return", callback("/me"));

app.get("/me", authenticate(), (c) => {
	const user = c.get("userid");
	return c.text(`hello ${user}`);
});
// app.get("v1/auth/google/return", callback());

export default app;
