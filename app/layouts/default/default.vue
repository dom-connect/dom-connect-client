<template>
  <header :class="['pt-[14px] pb-[14px] border-b', headerClass, borderClass]">
    <UContainer class="flex flex-row justify-center items-center gap-1">
      <UIcon class="size-[40px]" name="hugeicons:electric-home-02" />
      <span>DomConnect</span>
    </UContainer>
  </header>
  <main>
    <slot />
  </main>
  <footer />
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const headerClass = computed(() => {
  return colorMode.value === "dark"
    ? "bg-slate-700 text-white"
    : "bg-indigo-600 text-white";
});

const borderClass = computed(() => {
  return colorMode.value === "dark" ? "border-slate-600" : "border-indigo-700";
});
</script>

<style scoped></style>
