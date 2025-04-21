export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  console.log("📬 New email signup:", email);

  // Here you could save to a database or forward to your email service provider.
  // For now, we’ll just return success.
  return res.status(200).json({ message: "Email received successfully" });
}
