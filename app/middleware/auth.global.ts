export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("access_token").value;
  const isAuthenticated = !!token;

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
