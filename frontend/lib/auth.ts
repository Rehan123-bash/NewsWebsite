export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "journalist";
  profile_picture?: string;
  bio?: string;
};

export function setAuthTokens(access: string, refresh: string) {
  window.localStorage.setItem("access_token", access);
  window.localStorage.setItem("refresh_token", refresh);
}

export function clearAuthTokens() {
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");
}
