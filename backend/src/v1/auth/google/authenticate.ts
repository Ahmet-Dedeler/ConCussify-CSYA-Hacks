import type { MiddlewareHandler } from "hono";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

declare module "hono" {
	interface ContextVariableMap {
		userid: string;
	}
}

export default (): MiddlewareHandler<{ Bindings: Env }> => {
	return async (c, next) => {
		const token = getCookie(c, "session");
		if (!token) {
			throw new HTTPException(401, { message: "Unauthorized" });
		}
		console.log("[encodedToken]", token);
		const isValidToken = await jwt.verify(token, c.env.JWT_SECRET, {
			throwError: false,
			algorithm: "HS256",
		});

		if (!isValidToken) {
			throw new HTTPException(401, { message: "Unauthorized" });
		}

		const decodedToken = jwt.decode(token);

		const userId: string | undefined = decodedToken.payload?.user_id;
		if (!userId) {
			throw new HTTPException(500, { message: "userId was not found" });
		}
		c.set("userid", userId);
		await next();
	};
};
