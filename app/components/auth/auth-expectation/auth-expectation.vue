<template>
  <div
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
      @click="onCheck"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IEmits } from "./types";

const emit = defineEmits<IEmits>();

const onCheck = () => {
  emit("onCheck");
};
</script>

<style lang="scss" scoped />
