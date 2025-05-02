export default defineNuxtRouteMiddleware(async (to) => {
  const accessToken = useCookie("access_token").value;
  const refreshToken = useCookie("refresh_token").value;
  const isAuthenticated = !!accessToken && !!refreshToken;

  if (isAuthenticated) {
    if (to.path == "/auth") {
      return navigateTo("/", { replace: true });
    }
  } else {
    if (to.path !== "/auth") {
      return navigateTo("/auth", { replace: true });
    }
  }
});
