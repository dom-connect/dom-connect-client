<template>
  <div class="w-full flex flex-row p-10">
    <p>Главная</p>
    <UButton
      class="justify-center cursor-pointer ml-auto"
      label="Выйти"
      type="submit"
      variant="subtle"
      @click="
        () => {
          useCookie('access_token').value = '';
          navigateTo('/auth', { replace: true });
        }
      "
    />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "DomConnect – Главная",
});
</script>
