export const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "";

export function getAdminSecret(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).has("admin")
    ? ADMIN_SECRET
    : undefined;
}
