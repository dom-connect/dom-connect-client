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
            <UFormField label="Номер телефона" name="email" required>
              <UInput
                v-model="login.phone"
                class="w-full"
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </UFormField>
            <UFormField label="Пароль" name="password" required>
              <UInput
                v-model="login.password"
                class="w-full"
                placeholder="********"
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
              @click="
                async () => {
                  await nextTick();

                  currentProgress = EProgressAuth.confirmation;
                }
              "
            />
          </UForm>
        </template>
        <template #register>
          <UForm :state="register" class="flex flex-col gap-[16px] mt-[26px]">
            <UFormField label="Номер телефона" name="email" required>
              <UInput
                v-model="register.phone"
                class="w-full"
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </UFormField>
            <UFormField label="Электронная почта" name="email" required>
              <UInput
                v-model="register.email"
                class="w-full"
                placeholder="Example@mail.com"
              />
            </UFormField>
            <UFormField label="Пароль" name="password" required>
              <UInput
                v-model="register.password"
                class="w-full"
                placeholder="********"
              />
            </UFormField>

            <UCheckbox
              v-model="register.remember"
              label="Запомнить меня"
              name="news"
            />

            <UButton
              class="justify-center cursor-pointer"
              label="Зарегестрироваться"
              type="submit"
              variant="subtle"
              @click="
                async () => {
                  await nextTick();

                  currentProgress = EProgressAuth.objects;
                }
              "
            />
          </UForm>
        </template>
      </UTabs>
      <div
        v-if="currentProgress === EProgressAuth.objects"
        class="flex flex-col w-[80%] sm:w-1/2 md:w-[40%] lg:w-1/3 xl:w-1/4 2xl:w-1/5 m-auto"
      >
        <UButton
          class="w-fit mb-8 cursor-pointer"
          icon="material-symbols:arrow-back"
          variant="subtle"
          @click="
            async () => {
              await nextTick();

              currentProgress = EProgressAuth.initial;
            }
          "
        />

        <span class="text-base font-bold">Выберете дом и помещение</span>

        <UFormField class="mt-[16px]" label="Дом" name="house" required>
          <UInputMenu
            :options="[]"
            class="w-full"
            icon="i-lucide-search"
            placeholder="Дом №1"
          >
            <template #empty>
              <div class="px-4 py-2 text-sm text-gray-500">
                Нет доступных домов
              </div>
            </template>
          </UInputMenu>
        </UFormField>

        <UFormField class="mt-[16px]" label="Помещение" name="premise" required>
          <UInputMenu
            :options="[]"
            class="w-full"
            icon="i-lucide-search"
            placeholder="Квартира №1"
          >
            <template #empty>
              <div class="px-4 py-2 text-sm text-gray-500">
                Нет доступных помещений
              </div>
            </template>
          </UInputMenu>
        </UFormField>

        <UButton
          class="justify-center cursor-pointer mt-8"
          label="Продолжить"
          type="submit"
          variant="subtle"
          @click="
            async () => {
              await nextTick();

              currentProgress = EProgressAuth.confirmation;
            }
          "
        />
      </div>
      <div
        v-if="currentProgress === EProgressAuth.confirmation"
        class="flex flex-col w-[80%] sm:w-1/2 md:w-[40%] lg:w-1/3 xl:w-1/4 2xl:w-1/5 m-auto"
      >
        <UButton
          class="w-fit mb-8 cursor-pointer"
          icon="material-symbols:arrow-back"
          variant="subtle"
          @click="onBack"
        />
        <span class="text-base font-bold">Код подтверждения</span>
        <span class="text-sm font-medium mb-8"
          >Введите 6-значный код, отправленный на ваш номер</span
        >
        <UFormField name="code" required>
          <UPinInput
            v-model="code"
            class="w-full justify-between"
            length="6"
            otp
            placeholder="◯"
            type="number"
          />
        </UFormField>
        <span class="text-sm text-neutral-400 font-medium mt-4 mb-8"
          >Не получили код? Запросите повторную отправку через 60 секунд</span
        >
        <UButton
          :disabled="isTimerActive"
          :label="isTimerActive ? formattedTime : 'Запросить повторно'"
          :variant="isTimerActive ? 'outline' : 'subtle'"
          class="justify-center cursor-pointer"
          type="submit"
          @click="onReRequestCode"
        />
      </div>
      <div
        v-if="currentProgress === EProgressAuth.expectation"
        class="flex flex-col w-[80%] sm:w-1/2 md:w-[40%] lg:w-1/3 xl:w-1/4 2xl:w-1/5 m-auto"
      >
        <span class="text-base font-bold mb-4"
          >Ваш аккаунт ожидает подтверждения</span
        >
        <span class="text-sm font-medium mb-4"
          >Ваши данные успешно отправлены в управляющую компанию. После проверки
          вашего запроса вам будет предоставлен доступ к системе.</span
        >
        <span class="text-sm font-medium mb-4"
          >Ожидаемое время подтверждения: до 24 часов (может варьироваться в
          зависимости от УК).</span
        >
        <span class="text-sm font-medium mb-4"
          >Мы уведомим вас по SMS или электронной почте, как только ваш аккаунт
          будет активирован.</span
        >
        <span class="text-sm font-medium mb-8"
          >Если у вас возникли вопросы, свяжитесь с управляющей компанией.</span
        >
        <UButton
          class="justify-center cursor-pointer"
          label="Проверить статус"
          type="submit"
          variant="subtle"
          @click="onCheckStatus"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { EProgressAuth } from "~/pages/auth/types";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "DomConnect – Авторизация",
});

const login = reactive({
  phone: "",
  password: "",
  remember: false,
});

const register = reactive({
  email: "",
  phone: "",
  password: "",
  remember: false,
});

const code = ref<string[]>([]);

const currentTab = ref();
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

const currentProgress = ref<EProgressAuth>(EProgressAuth.initial);
const isTimerActive = ref<boolean>(false);
const timeLeft = ref<number>(60);
let timer: NodeJS.Timeout;

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
    currentProgress.value = EProgressAuth.initial;
  }
};

const onCheckStatus = () => {
  useCookie("access_token").value = "token";
  navigateTo("/", { replace: true });
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

watch(code, (newValue) => {
  if (newValue.length === 6) {
    currentProgress.value = EProgressAuth.expectation;
  }
});

watch(currentProgress, (newValue) => {
  if (newValue === EProgressAuth.confirmation) {
    isTimerActive.value = true;
  }
});

onMounted(() => {
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
