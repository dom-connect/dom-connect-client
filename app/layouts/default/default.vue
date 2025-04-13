<template>
  <header
    class="pt-[14px] pb-[14px] border-b border-neutral-700 flex flex-row bg-neutral-800 text-blue-400"
  >
    <UContainer
      :class="
        !viewport.isLessThan('desktop') ? 'justify-center' : 'justify-start'
      "
      class="flex flex-row items-center gap-2"
    >
      <UIcon class="size-[40px]" name="hugeicons:electric-home-02" />
      <span>DomConnect</span>
    </UContainer>
    <UContainer
      v-if="!viewport.isLessThan('desktop')"
      class="flex flex-row justify-center items-center gap-6"
    >
      <ULink
        v-for="(item, number) in links"
        :key="number"
        :to="`/${item.link}`"
        as="button"
        >{{ item.name }}
      </ULink>
    </UContainer>
    <UContainer
      v-if="!viewport.isLessThan('desktop')"
      class="flex flex-row justify-center items-center gap-6"
    >
      <UButton
        class="cursor-pointer"
        color="primary"
        icon="hugeicons:moon-02"
        size="md"
        variant="subtle"
        @click="toggleTheme"
      />
      <UButton
        class="cursor-pointer"
        color="primary"
        icon="hugeicons:logout-02"
        size="md"
        variant="subtle"
        @click="
          () => {
            useCookie('access_token').value = '';
            navigateTo('/auth', { replace: true });
          }
        "
      />
    </UContainer>
    <UContainer
      v-if="viewport.isLessThan('desktop')"
      class="flex flex-row justify-end items-center gap-6"
    >
      <USlideover v-model:open="open">
        <UButton
          class="cursor-pointer"
          color="primary"
          icon="hugeicons:menu-01"
          size="md"
          variant="subtle"
        />
        <template #content>
          <UContainer
            class="flex flex-row h-[72px] justify-between items-center pt-[16px] pb-[16px] border-b border-neutral-700"
          >
            <span>Меню</span>
            <UButton
              class="cursor-pointer"
              color="primary"
              icon="hugeicons:cancel-01"
              size="md"
              variant="subtle"
              @click="open = false"
            />
          </UContainer>
          <UContainer class="flex flex-col h-[100%] gap-2 pt-[16px] pb-[16px]">
            <ULink
              v-for="(item, number) in links"
              :key="number"
              :to="`/${item.link}`"
              as="button"
              >{{ item.name }}
            </ULink>
            <UButton
              class="cursor-pointer mt-auto"
              color="primary"
              icon="hugeicons:moon-02"
              size="md"
              variant="subtle"
              @click="toggleTheme"
              >Сменить тему
            </UButton>
            <UButton
              class="cursor-pointer"
              color="primary"
              icon="hugeicons:logout-02"
              size="md"
              variant="subtle"
              @click="
                () => {
                  useCookie('access_token').value = '';
                  navigateTo('/auth', { replace: true });
                }
              "
              >Выйти
            </UButton>
          </UContainer>
        </template>
      </USlideover>
    </UContainer>
  </header>
  <main>
    <slot />
  </main>
  <footer />
</template>

<script lang="ts" setup>
const viewport = useViewport();

const open = ref<boolean>(false);

const links = ref<{ name: string; link: string }[]>([
  { name: "Главная", link: "" },
  { name: "Счета", link: "accounts" },
  { name: "Заявки", link: "requests" },
  { name: "Профиль", link: "profile" },
]);

const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
</script>

<style scoped></style>
