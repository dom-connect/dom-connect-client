<template>
  <UContainer class="pt-[32px] flex flex-col items-start">
    <UTabs :items="items" class="w-full" />
    <USelect v-model="value" :items="selectItems" class="mt-[16px]" />
    <div class="pt-[32px] w-full">
      <span class="text-base font-bold">Октябрь 2025</span>
      <div
        v-for="n in 20"
        :key="n"
        class="flex flex-row items-center justify-between border-neutral-700 mt-[16px] border p-[20px] w-full rounded-[12px] bg-neutral-800 border-gray-200"
      >
        <div class="flex flex-col">
          <span>Пополнение баланса</span>
          <span class="text-sm text-neutral-400">В обработке</span>
        </div>
        <span>+18.000 ₽</span>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import type { TabsItem } from "#ui/components/Tabs.vue";

const items = ref<TabsItem[]>([
  {
    label: "История операций",
    icon: "",
  },
  {
    label: "Квитанции",
    icon: "",
  },
  {
    label: "Потребление ресурсов",
    icon: "",
  },
]);

const selectItems = ref([
  "За текущий год",
  "За текущий месяц",
  "За текущую неделю",
]);
const value = ref("За текущий год");
</script>

<style lang="scss" scoped />
