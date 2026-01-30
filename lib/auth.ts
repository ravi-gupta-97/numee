import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "default-secret-key";

export async function signSession(payload: any) {
    return jwt.sign(payload, secretKey, {
        expiresIn: "24h",
    });
}

export async function verifySession(token: string) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}
