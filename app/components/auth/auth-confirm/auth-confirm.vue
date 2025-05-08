<template>
  <div
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
        v-model="inputCode"
        class="w-full justify-between"
        length="6"
        otp
        placeholder="◯"
        type="number"
      />
    </UFormField>
    <span
      v-if="errorMessage"
      class="text-error-400 text-sm font-semibold mt-4"
      >{{ errorMessage }}</span
    >
    <span class="text-sm text-neutral-400 font-medium mt-4 mb-8"
      >Не получили код? Запросите повторную отправку через 60 секунд</span
    >
    <UButton
      :disabled="isTimerActive"
      :label="isTimerActive ? formattedTime : 'Запросить повторно'"
      :variant="isTimerActive ? 'outline' : 'subtle'"
      class="justify-center cursor-pointer"
      type="submit"
      @click="onResend"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IEmits, IProps } from "./types";

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const inputCode = defineModel<string[]>();

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

const isTimerActive = ref<boolean>(false);
const timeLeft = ref<number>(60);
let timer: NodeJS.Timeout;

const onResend = () => {
  emit("onResend");
  isTimerActive.value = true;
  timeLeft.value = 60;
};

const onBack = () => {
  emit("onBack");
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

onMounted(() => {
  isTimerActive.value = true;
});
</script>

<style lang="scss" scoped />
