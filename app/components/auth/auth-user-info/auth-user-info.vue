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
    <span class="text-base font-bold mb-8">Введите ФИО</span>
    <UFormField label="Фамилия" name="lastName" required>
      <UInput
        v-model="lastName"
        class="w-full mb-[16px]"
        placeholder="Иванов"
        type="text"
      />
    </UFormField>
    <UFormField label="Имя" name="firstName" required>
      <UInput
        v-model="firstName"
        class="w-full mb-[16px]"
        placeholder="Иван"
        type="text"
      />
    </UFormField>
    <UFormField label="Отчество" name="middleName" required>
      <UInput
        v-model="middleName"
        class="w-full"
        placeholder="Иванович"
        type="text"
      />
    </UFormField>
    <UButton
      class="justify-center cursor-pointer mt-8"
      label="Продолжить"
      type="submit"
      variant="subtle"
      @click="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IEmits } from "./types";

const emit = defineEmits<IEmits>();

const lastName = defineModel<string>("lastName", { default: "" });
const firstName = defineModel<string>("firstName", { default: "" });
const middleName = defineModel<string>("middleName", { default: "" });

const onSubmit = () => {
  emit("onSubmit");
};

const onBack = () => {
  emit("onBack");
};

// @click="async () => {
// if (!recaptchaToken) {
//   await getRecaptchaToken();
// }
//
// const phone = register.phone.replace(/[^+\d]/g, '');
// await fetchSignUpCode({
//   firstName: register.firstName,
//   lastName: register.lastName,
//   middleName: register.middleName,
//   password: register.password,
//   email: register.email,
//   phone: phone
// });
// await nextTick();
// currentProgress = EProgressAuth.confirmation;
// }"
</script>

<style lang="scss" scoped />
