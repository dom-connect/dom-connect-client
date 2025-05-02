<template>
  <UContainer class="pt-[32px]">
    <UTabs :items="items" class="w-full">
      <template #active/>
      <template #done/>
      <template #сancelled/>
    </UTabs>
  </UContainer>
</template>

<script lang="ts" setup>
import type { TabsItem } from "#ui/components/Tabs.vue";

const items = ref<TabsItem[]>([
  {
    label: "Активные",
    icon: "",
    slot: "active",
  },
  {
    label: "Выполненные",
    icon: "",
    slot: "done",
  },
  {
    label: "Отмененные",
    icon: "",
    slot: "сancelled",
  },
]);
</script>

<style lang="scss" scoped />
