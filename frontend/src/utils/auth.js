const USER_KEY = "patiBulUser";

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function isAdmin(user = getUser()) {
  return Boolean(user?.isAdmin);
}
