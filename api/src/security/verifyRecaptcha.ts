import fetch from "node-fetch";

export async function verifyRecaptcha(token: string, secret: string) {
  if (process.env.DISABLE_RECAPTCHA) return;

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    }
  );
  const json = (await response.json()) as { success: boolean };
  if (!json.success) {
    throw new Error("invalid recaptcha token");
  }
}
