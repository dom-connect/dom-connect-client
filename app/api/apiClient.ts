export const useApiClient = () => {
  const accessToken = useCookie("access_token");
  const refreshToken = useCookie("refresh_token");

  const refreshTokens = async () => {
    try {
      const response = await $fetch<{
        accessToken: string;
        refreshToken: string;
      }>("/endpoint/auth/refresh-token", {
        method: "POST",
        headers: accessToken.value
          ? { Authorization: `Bearer ${refreshToken.value}` }
          : {},
      });
      if (response.accessToken && response.refreshToken) {
        accessToken.value = response.accessToken;
        refreshToken.value = response.refreshToken;
      }
    } catch (error) {
      console.error("Ошибка обновления токена", error);
      accessToken.value = "";
      refreshToken.value = "";
      return navigateTo("/auth");
    }
  };

  const get = async <T>(
    endpoint: string,
    params: Record<string, any> = {},
    retry = false,
  ): Promise<T> => {
    try {
      return await $fetch<T>(endpoint, {
        params,
        headers: accessToken.value
          ? { Authorization: `Bearer ${accessToken.value}` }
          : {},
      });
    } catch (error: any) {
      if (!retry && error?.statusCode === 401) {
        await refreshTokens();
        return get<T>(endpoint, params, true);
      }
      throw error;
    }
  };

  const post = async <T>(
    endpoint: string,
    body: any,
    useRefresh: boolean = false,
    retry = false,
  ): Promise<T> => {
    try {
      const token = useRefresh ? refreshToken.value : accessToken.value;
      return await $fetch<T>(endpoint, {
        method: "POST",
        body,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (error: any) {
      if (
        !retry &&
        error?.statusCode === 401 &&
        !useRefresh &&
        endpoint !== "/endpoint/auth/login" &&
        endpoint !== "/endpoint/auth/refresh-token"
      ) {
        await refreshTokens();
        return post<T>(endpoint, body, useRefresh, true);
      }
      throw error;
    }
  };

  const put = async <T>(
    endpoint: string,
    body: any,
    useRefresh: boolean = false,
    retry = false,
  ): Promise<T> => {
    try {
      const token = useRefresh ? refreshToken.value : accessToken.value;
      return await $fetch<T>(endpoint, {
        method: "PUT",
        body,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (error: any) {
      if (
        !retry &&
        error?.statusCode === 401 &&
        !useRefresh &&
        endpoint !== "/endpoint/auth/login" &&
        endpoint !== "/endpoint/auth/refresh-token"
      ) {
        await refreshTokens();
        return put<T>(endpoint, body, useRefresh, true);
      }
      throw error;
    }
  };

  const del = async <T>(
    endpoint: string,
    body: any,
    retry = false,
  ): Promise<T> => {
    try {
      return await $fetch<T>(endpoint, {
        method: "DELETE",
        body,
        headers: accessToken.value
          ? { Authorization: `Bearer ${accessToken.value}` }
          : {},
      });
    } catch (error: any) {
      if (!retry && error?.statusCode === 401) {
        await refreshTokens();
        return del<T>(endpoint, body, true);
      }
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    del,
  };
};
