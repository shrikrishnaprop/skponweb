import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function configuredAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function getAdminUser() {
  const user = await currentUser();
  if (!user) return null;

  const allowedEmails = configuredAdminEmails();
  if (allowedEmails.size === 0) return null;

  const isAllowed = user.emailAddresses?.some((address) =>
    address.verification?.status === "verified" &&
    allowedEmails.has(address.emailAddress.toLowerCase())
  );

  return isAllowed ? user : null;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) {
    return {
      userId: null,
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { userId: user.id, error: null };
}
