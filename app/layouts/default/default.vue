<template>
  <header
    class="pt-[14px] pb-[14px] border-b border-neutral-700 flex flex-row bg-neutral-800 text-blue-400"
  >
    <UContainer class="flex flex-row justify-center items-center gap-2">
      <UIcon class="size-[40px]" name="hugeicons:electric-home-02" />
      <span>DomConnect</span>
    </UContainer>
    <UContainer class="flex flex-row justify-center items-center gap-6">
      <ULink
        v-for="(item, number) in links"
        :key="number"
        :to="`/${item.link}`"
        as="button"
        >{{ item.name }}</ULink
      >
    </UContainer>
    <UContainer class="flex flex-row justify-center items-center gap-6">
      <UButton
        class="cursor-pointer"
        icon="hugeicons:moon-02"
        size="md"
        color="primary"
        variant="subtle"
      />
      <UButton
        icon="hugeicons:logout-02"
        class="cursor-pointer"
        size="md"
        color="primary"
        variant="subtle"
        @click="
          () => {
            useCookie('access_token').value = '';
            navigateTo('/auth', { replace: true });
          }
        "
      />
    </UContainer>
  </header>
  <main>
    <slot />
  </main>
  <footer />
</template>

<script lang="ts" setup>
const links = ref<{ name: string; link: string }[]>([
  { name: "Главная", link: "" },
  { name: "Счета", link: "accounts" },
  { name: "Заявки", link: "requests" },
  { name: "Профиль", link: "profile" },
]);
</script>

<style scoped></style>
