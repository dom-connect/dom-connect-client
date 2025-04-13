<template>
  <UContainer
    :class="viewport.isLessThan('desktop') ? 'pt-[16px]' : 'pt-[32px]'"
    class="flex flex-row h-full justify-between gap-[32px]"
  >
    <div
      :class="
        viewport.isLessThan('desktop')
          ? 'flex-col w-full gap-[16px] pb-[16px]'
          : 'flex-row gap-[32px] w-[70%]'
      "
      class="flex"
    >
      <div
        class="flex flex-col h-fit m-0 border border-gray-200 p-[20px] w-full rounded-[12px] border-neutral-700 bg-neutral-800"
      >
        <div class="flex flex-row justify-between pb-[24px]">
          <span class="font-bold">ЕПД</span>
          <UBadge class="text-white" color="error">Задолженность</UBadge>
        </div>
        <span class="pb-[20px] text-2xl">-1337.228 ₽</span>
        <span class="pb-[30px] text-sm text-neutral-400"
          >Обновлено 07.04.2025</span
        >
        <UButton class="mb-[20px] justify-center" variant="subtle"
          >Оплатить</UButton
        >
        <UCollapsible class="flex flex-col gap-2">
          <UButton
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            class="justify-center"
          />

          <template #content>
            <div
              class="flex flex-row justify-between pt-[20px] pb-[20px] items-center border-b border-neutral-700"
            >
              <div class="flex flex-col">
                <span class="font-bold">ГВС</span>
                <div class="flex flex-row items-center justify-between">
                  <span>145 м2</span>
                </div>
              </div>
              <UButton variant="subtle">Оплатить 610.34 ₽</UButton>
            </div>
            <div
              class="flex flex-row justify-between pt-[20px] pb-[20px] items-center border-b border-neutral-700"
            >
              <div class="flex flex-col">
                <span class="font-bold">ГВС</span>
                <div class="flex flex-row items-center justify-between">
                  <span>145 м2</span>
                </div>
              </div>
              <UButton variant="subtle">Оплатить 610.34 ₽</UButton>
            </div>
            <div
              class="flex flex-row justify-between pt-[20px] pb-[20px] items-center border-b border-neutral-700"
            >
              <div class="flex flex-col">
                <span class="font-bold">ГВС</span>
                <div class="flex flex-row items-center justify-between">
                  <span>145 м2</span>
                </div>
              </div>
              <UButton variant="subtle">Оплатить 610.34 ₽</UButton>
            </div>
            <div class="flex flex-row justify-between pt-[20px] items-center">
              <div class="flex flex-col">
                <span class="font-bold">ГВС</span>
                <div class="flex flex-row items-center justify-between">
                  <span>145 м2</span>
                </div>
              </div>
              <UButton variant="subtle">Оплатить 610.34 ₽</UButton>
            </div>
          </template>
        </UCollapsible>
      </div>
      <div
        class="flex flex-col h-fit m-0 border border-gray-200 p-[20px] w-full rounded-[12px] border-neutral-700 bg-neutral-800"
      >
        <div class="flex flex-row justify-between pb-[24px]">
          <span class="font-bold">Капитальный ремонт</span>
          <UBadge v-if="false" class="text-white" color="error"
            >Задолженность</UBadge
          >
        </div>
        <span class="pb-[20px] text-2xl">-1337.228 ₽</span>
        <span class="pb-[30px] text-sm text-neutral-400"
          >Обновлено 07.04.2025</span
        >
        <UButton class="mb-[20px] justify-center" variant="subtle"
          >Оплатить</UButton
        >
        <UCollapsible class="flex flex-col gap-2">
          <UButton
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            class="justify-center"
          />

          <template #content>
            <div
              class="flex flex-row justify-between pt-[20px] pb-[20px] items-center border-b border-neutral-700"
            >
              <div class="flex flex-col">
                <span class="font-bold">ГВС</span>
                <div class="flex flex-row items-center justify-between">
                  <span>145 м2</span>
                </div>
              </div>
              <UButton variant="subtle">Оплатить 610.34 ₽</UButton>
            </div>
            <div
              class="flex flex-row justify-between pt-[20px] pb-[20px] items-center border-b border-neutral-700"
            >
              <div class="flex flex-col">
                <span class="font-bold">ГВС</span>
                <div class="flex flex-row items-center justify-between">
                  <span>145 м2</span>
                </div>
              </div>
              <UButton variant="subtle">Оплатить 610.34 ₽</UButton>
            </div>
            <div
              class="flex flex-row justify-between pt-[20px] pb-[20px] items-center border-b border-neutral-700"
            >
              <div class="flex flex-col">
                <span class="font-bold">ГВС</span>
                <div class="flex flex-row items-center justify-between">
                  <span>145 м2</span>
                </div>
              </div>
              <UButton variant="subtle">Оплатить 610.34 ₽</UButton>
            </div>
            <div class="flex flex-row justify-between pt-[20px] items-center">
              <div class="flex flex-col">
                <span class="font-bold">ГВС</span>
                <div class="flex flex-row items-center justify-between">
                  <span>145 м2</span>
                </div>
              </div>
              <UButton variant="subtle">Оплатить 610.34 ₽</UButton>
            </div>
          </template>
        </UCollapsible>
      </div>
      <div class="min-h-[16px] mt-[-16px]" />
    </div>
    <div
      v-if="!viewport.isLessThan('desktop')"
      class="flex flex-col h-full m-0 border border-gray-200 p-[20px] w-[30%] rounded-[12px] border-neutral-700 bg-neutral-800"
    >
      <span class="font-bold">Новости</span>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
useHead({
  title: "DomConnect – Главная",
});

const viewport = useViewport();
</script>
