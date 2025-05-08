import { useApiClient } from "~/api/apiClient";
import { process } from "std-env";
import { FetchError } from "ofetch";

export const useAuthStore = defineStore("auth", () => {
  const api = useApiClient();
  const loading = ref<boolean>(false);
  const houses = ref<any>([]);
  const premises = ref<any>([]);
  const roles = ref<any>([]);

  const accessToken = useCookie("access_token", {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  const refreshToken = useCookie("refresh_token", {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  const fetchSignIn = async (email: string, password: string, code: string) => {
    try {
      loading.value = true;

      const response = await api.post<any>("/api/auth/login", {
        email: email,
        password: password,
        code: code,
      });

      if (response.accessToken && response.refreshToken) {
        accessToken.value = response.accessToken;
        refreshToken.value = response.refreshToken;
      }

      return 200;
    } catch (e) {
      console.error("Ошибка:", e);

      if (e instanceof FetchError && e.response) {
        return e.response.status;
      }

      return 500;
    } finally {
      loading.value = false;
    }
  };

  const fetchSignInCode = async (
    email: string,
    password: string,
  ): Promise<number> => {
    try {
      loading.value = true;

      await api.post<any>("/api/auth/send-code/login", {
        email,
        password,
      });

      return 200;
    } catch (e: unknown) {
      console.error("Ошибка:", e);

      if (e instanceof FetchError && e.response) {
        return e.response.status;
      }

      return 500;
    } finally {
      loading.value = false;
    }
  };

  const fetchSignUpCode = async (obj: {
    firstName: string;
    lastName: string;
    middleName: string;
    password: string;
    email: string;
    phone: string;
  }) => {
    try {
      loading.value = true;

      await api.post<any>("/api/auth/send-code/registration", {
        ...obj,
      });
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchSignUpPreRegistration = async (obj: {
    firstName: string;
    lastName: string;
    middleName: string;
    password: string;
    email: string;
    phone: string;
    code: string;
  }) => {
    try {
      loading.value = true;

      const response = await api.post<any>("/api/auth/pre-registration", {
        ...obj,
      });

      if (response.preToken) {
        accessToken.value = response.preToken;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchSignUpRegistration = async (obj: {
    firstName: string;
    lastName: string;
    middleName: string;
    password: string;
    email: string;
    phone: string;
    premise: number;
    role: number;
  }) => {
    try {
      loading.value = true;

      const response = await api.post<any>("/api/auth/registration", {
        ...obj,
      });

      if (response.accessToken && response.refreshToken) {
        accessToken.value = response.accessToken;
        refreshToken.value = response.refreshToken;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      loading.value = true;

      await api.post<any>("/api/auth/logout", {});

      navigateTo("/auth", { replace: true });
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchAuthHouses = async () => {
    try {
      loading.value = true;

      const response = await api.get<any>("/api/auth/home");

      if (response.data.length) {
        houses.value = response.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchAuthPremises = async (homeId: number) => {
    try {
      loading.value = true;

      const response = await api.get<any>(`/api/auth/premise?homeId=${homeId}`);

      if (response.data.length) {
        premises.value = response.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchAuthRole = async () => {
    try {
      loading.value = true;

      const response = await api.get<any>("/api/auth/role");

      if (response.data.length) {
        roles.value = response.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    houses,
    premises,
    roles,
    fetchSignInCode,
    fetchSignIn,
    fetchSignUpCode,
    fetchSignUpPreRegistration,
    fetchSignUpRegistration,
    logout,
    fetchAuthHouses,
    fetchAuthPremises,
    fetchAuthRole,
  };
});
