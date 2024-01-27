export const config = {
  runtime: "edge",
  regions: ["cle1"]
};

export default function handler() {
  const createCookie = (name: string, value: string) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    const cookie = `${name}=${value}; expires=${expires.toUTCString()}; HttpOnly; Secure; SameSite=Lax; Path=/; `;
    return cookie;
  };

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      "Set-Cookie": createCookie("test", "123")
    }
  });
}
