<template>
  <div class="mt-[13%]">
    <UContainer class="flex flex-col justify-center items-center mb-[40px]">
      <UIcon class="size-[40px]" name="hugeicons:electric-home-02" />
      <span>DomConnect</span>
    </UContainer>
    <TransitionGroup name="slide">
      <UTabs
        v-if="currentProgress === EProgressAuth.initial"
        v-model="currentTab"
        :items="items"
        class="w-[80%] sm:w-1/2 md:w-[40%] lg:w-1/3 xl:w-1/4 2xl:w-1/5 m-auto"
      >
        <template #login>
          <UForm :state="login" class="flex flex-col gap-[16px] mt-[26px]">
            <UFormField label="Электронная почта" name="email" required>
              <UInput
                v-model="login.email"
                class="w-full"
                placeholder="Example@mail.com"
                type="email"
              />
            </UFormField>
            <UFormField label="Пароль" name="password" required>
              <UInput
                v-model="login.password"
                class="w-full"
                placeholder="********"
                type="password"
              />
            </UFormField>
            <ULink class="text-end" to="/">Забыли пароль?</ULink>
            <UCheckbox
              v-model="login.remember"
              label="Запомнить меня"
              name="news"
            />

            <UButton
              class="justify-center cursor-pointer"
              label="Войти"
              type="submit"
              variant="subtle"
              @click="onLogin"
            />
          </UForm>
        </template>
        <template #register>
          <UForm :state="register" class="flex flex-col gap-[16px] mt-[26px]">
            <UFormField label="Номер телефона" name="email" required>
              <UInput
                v-model="register.phone"
                v-mask="'+7 (###) ###-##-##'"
                class="w-full"
                placeholder="+7 (___) ___-__-__"
                type="tel"
              />
            </UFormField>
            <UFormField label="Электронная почта" name="email" required>
              <UInput
                v-model="register.email"
                class="w-full"
                placeholder="Example@mail.com"
                type="email"
              />
            </UFormField>
            <UFormField label="Пароль" name="password" required>
              <UInput
                v-model="register.password"
                class="w-full"
                placeholder="********"
                type="password"
              />
            </UFormField>

            <UCheckbox
              v-model="register.remember"
              label="Запомнить меня"
              name="news"
            />

            <UButton
              class="justify-center cursor-pointer"
              label="Зарегистрироваться"
              type="submit"
              variant="subtle"
              @click="
                async () => {
                  await nextTick();
                  currentProgress = EProgressAuth.registerUserInfo;
                }
              "
            />
          </UForm>
        </template>
      </UTabs>
      <auth-user-info
        v-if="currentProgress === EProgressAuth.registerUserInfo"
        v-model:first-name="register.firstName"
        v-model:last-name="register.lastName"
        v-model:middle-name="register.middleName"
        @on-submit="onSubmitUserInfo"
        @on-back="onBackUserInfo"
      />
      <auth-confirm
        v-if="currentProgress === EProgressAuth.confirmation"
        v-model="code"
        @on-back="onBackConfirm"
      />
      <auth-user-objects
        v-if="currentProgress === EProgressAuth.registerUserObjects"
        v-model:selected-premise="selectedPremise"
        v-model:selected-role="selectedRole"
        @on-submit="onSubmitObjects"
      />
      <auth-expectation v-if="currentProgress === EProgressAuth.expectation" />
    </TransitionGroup>
  </div>
  <div id="recaptcha-container" />
</template>

<script lang="ts" setup>
import { RecaptchaVerifier } from "firebase/auth";
import { EProgressAuth } from "~/pages/auth/types";
import { useAuthStore } from "~/store/auth";
import AuthUserInfo from "~/components/auth/auth-user-info/auth-user-info.vue";
import AuthConfirm from "~/components/auth/auth-confirm/auth-confirm.vue";
import AuthUserObjects from "~/components/auth/auth-user-objects/auth-user-objects.vue";
import AuthExpectation from "~/components/auth/auth-expectation/auth-expectation.vue";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "DomConnect – Авторизация",
});

const { $firebaseAuth } = useNuxtApp();

const authStore = useAuthStore();
const {
  fetchSignIn,
  fetchSignInCode,
  fetchSignUpCode,
  fetchSignUpRegistration,
  fetchSignUpPreRegistration,
  fetchAuthHouses,
} = authStore;

const login = reactive({
  email: "",
  password: "",
  remember: false,
});
const register = reactive({
  email: "",
  phone: "",
  password: "",
  firstName: "",
  lastName: "",
  middleName: "",
  remember: false,
});

const code = ref<string[]>([]);
const currentTab = ref();
const currentProgress = ref<EProgressAuth>(EProgressAuth.initial);
const recaptchaVerifier = ref<RecaptchaVerifier | null>(null);
const recaptchaToken = ref<string>("");
const isTimerActive = ref<boolean>(false);
const isLogin = ref<boolean>(false);
const timeLeft = ref<number>(60);

const selectedPremise = ref();
const selectedRole = ref();

const items = ref([
  {
    label: "Вход",
    content: "login",
    slot: "login",
  },
  {
    label: "Регистрация",
    content: "register",
    slot: "register",
  },
]);

let timer: NodeJS.Timeout;

const onBackUserInfo = async () => {
  await nextTick();
  currentProgress.value = EProgressAuth.initial;
};

const onSubmitUserInfo = async () => {
  if (!recaptchaToken.value) {
    await getRecaptchaToken();
  }

  const phone = register.phone.replace(/[^+\d]/g, "");
  await fetchSignUpCode({
    firstName: register.firstName,
    lastName: register.lastName,
    middleName: register.middleName,
    password: register.password,
    email: register.email,
    phone: phone,
  });

  await nextTick();

  currentProgress.value = EProgressAuth.confirmation;
};

const onBackConfirm = () => {
  if (isLogin.value) {
    currentProgress.value = EProgressAuth.initial;
  } else {
    currentProgress.value = EProgressAuth.registerUserInfo;
  }
};

const onSubmitObjects = async () => {
  const phone = register.phone.replace(/[^+\d]/g, "");

  await fetchSignUpRegistration({
    firstName: register.firstName,
    lastName: register.lastName,
    middleName: register.middleName,
    password: register.password,
    email: register.email,
    phone: phone,
    premise: selectedPremise.value.value,
    role: selectedRole.value.value,
  });

  navigateTo("/", { replace: true });
};

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

const onReRequestCode = () => {
  isTimerActive.value = true;
};

const onBack = async () => {
  await nextTick();

  if (currentTab.value === "1") {
    currentProgress.value = EProgressAuth.objects;
  } else {
    isLogin.value = false;
    currentProgress.value = EProgressAuth.initial;
  }
};

const onCheckStatus = () => {
  useCookie("access_token").value = "token";
  navigateTo("/", { replace: true });
};

const onLogin = async () => {
  if (!recaptchaToken.value) {
    await getRecaptchaToken();
  }

  if (
    login.email.includes("@") &&
    login.password.length > 5 &&
    recaptchaToken.value.length
  ) {
    isLogin.value = true;
    await nextTick();
    await fetchSignInCode(login.email, login.password);
    currentProgress.value = EProgressAuth.confirmation;
  }
};

const setupRecaptcha = async () => {
  if (!$firebaseAuth) return;

  recaptchaVerifier.value = new RecaptchaVerifier(
    $firebaseAuth,
    "recaptcha-container",
    {
      size: "invisible",
    },
  );

  try {
    await recaptchaVerifier.value.render();
  } catch (error) {
    console.error("Ошибка при рендеринге капчи:", error);
  }
};

const getRecaptchaToken = async () => {
  if (!recaptchaVerifier.value) return;

  try {
    recaptchaToken.value = await recaptchaVerifier.value.verify();
  } catch (error) {
    console.error("Ошибка в процессе верификации капчи:", error);
  }
};

watch(isTimerActive, (newValue) => {
  if (newValue) {
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(timer);
        isTimerActive.value = false;
      }
    }, 1000);
  } else {
    clearInterval(timer);
  }
});

watch(code, async (newValue) => {
  if (newValue.length === 6) {
    const code = newValue.reduce((acc, curr) => acc + curr, "");
    if (isLogin.value) {
      await fetchSignIn(login.email, login.password, code);
      await nextTick();
      navigateTo("/", { replace: true });
    } else {
      const phone = register.phone.replace(/[^+\d]/g, "");
      await fetchSignUpPreRegistration({
        firstName: register.firstName,
        lastName: register.lastName,
        middleName: register.middleName,
        password: register.password,
        email: register.email,
        phone: phone,
        code: code,
      });
      await nextTick();
      currentProgress.value = EProgressAuth.registerUserObjects;
    }
  }
});

watch(currentProgress, async (newValue) => {
  if (newValue === EProgressAuth.registerUserObjects) {
  }
});

watch(currentProgress, (newValue) => {
  if (newValue === EProgressAuth.confirmation) {
    isTimerActive.value = true;
  }
});

onMounted(() => {
  setupRecaptcha();
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.slide-enter-from,
.slide-leave-to {
  transform: translateX(25%);
  opacity: 0;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}

.slide-leave-to {
  transform: translateX(-25%);
  opacity: 0;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}

.slide-enter-active {
  transition-delay: 0.5s;
}
</style>
