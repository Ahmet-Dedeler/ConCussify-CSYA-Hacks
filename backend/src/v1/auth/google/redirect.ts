import type { MiddlewareHandler } from "hono";
import { google } from "worker-auth-providers";

export default (
	state: string,
	scope: string = "openid",
): MiddlewareHandler<{ Bindings: Env }> => {
	return async (c, next) => {
		console.log(c);
		return c.redirect(
			await google.redirect({
				options: {
					clientId: c.env.GOOGLE_CLIENT_ID,
					redirectUrl: c.env.GOOGLE_REDIRECT_URL,
					scope,
					state,
				},
			}),
		);
	};
};
