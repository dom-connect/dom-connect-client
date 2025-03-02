<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <h1 class="font-bold text-2xl text-(--ui-primary)">Nuxt UI v3</h1>
    <UTabs :items="items" class="w-full" />
    <div class="flex items-center gap-2">
      <UButton
        label="Documentation"
        icon="i-lucide-square-play"
        to="https://ui3.nuxt.dev/getting-started/installation/nuxt"
        target="_blank"
      />

      <UButton
        label="GitHub"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-github"
        to="https://github.com/nuxt/ui"
        target="_blank"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = ref([
  {
    label: "Account",
    icon: "i-lucide-user",
    content: "This is the account content.",
  },
  {
    label: "Password",
    icon: "i-lucide-lock",
    content: "This is the password content.",
  },
]);
</script>
