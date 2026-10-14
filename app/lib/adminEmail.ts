// The only account allowed to hold Role.ADMIN. Enforced in the auth jwt callback,
// so a stray ADMIN role on any other user in the database is ignored.
export const ADMIN_EMAIL = 'post@nazs.net'

export const isAdminEmail = (email?: string | null) =>
  email?.trim().toLowerCase() === ADMIN_EMAIL
