import type { MiddlewareHandler } from "hono";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { google } from "worker-auth-providers";
import { setCookie } from "hono/cookie";

function generateJWT(user: { id?: string }, secret: string) {
	const claims = {
		user_id: user?.id,
	};
	console.log("[claims, scret]", claims, secret);
	return jwt.sign(
		{ ...claims, exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60) },
		secret,
		{
			algorithm: "HS256",
		},
	);
}

export default (
	final_redirect: string,
): MiddlewareHandler<{ Bindings: Env }> => {
	return async (c, next) => {
		try {
			const { user: providerUser } = await google.users({
				options: {
					clientId: c.env.GOOGLE_CLIENT_ID,
					clientSecret: c.env.GOOGLE_CLIENT_SECRET,
					redirectUrl: c.env.GOOGLE_REDIRECT_URL,
				},
				request: c.req.raw,
			});

			console.log("[providerUser]", providerUser);
			const token = await generateJWT(providerUser, c.env.JWT_SECRET);
			console.log("[jwt]", token);
			const expiry = new Date();
			expiry.setTime(expiry.getTime() + 24 * 3600 * 1000);

			setCookie(c, "session", token, {
				expires: expiry,
				httpOnly: true,
				path: "/",
				secure: !c.env.DEBUG, // for local development we do not need the `secure` attr
			});

			return c.redirect(final_redirect);
		} catch (e: unknown) {
			if (e instanceof Error) console.log("[error]", e.stack);
			return c.status(400);
		}
	};
};