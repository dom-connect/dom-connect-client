<template>
  <div
    class="flex flex-col w-[80%] sm:w-1/2 md:w-[40%] lg:w-1/3 xl:w-1/4 2xl:w-1/5 m-auto"
  >
    <span class="text-base font-bold">Выберете дом и помещение</span>
    <USelectMenu
      v-model="selectedHouse"
      :items="housesList"
      class="mt-[16px]"
      label="Дом"
      name="house"
      placeholder="Выберите дом"
      required
    >
      <template #empty>
        <div class="px-4 py-2 text-sm text-gray-500">Нет доступных домов</div>
      </template>
    </USelectMenu>

    <USelectMenu
      v-model="selectedPremise"
      :items="premiseList"
      class="mt-[16px]"
      label="Помещение"
      name="premise"
      placeholder="Выберите квартиру"
      required
    >
      <template #empty>
        <div class="px-4 py-2 text-sm text-gray-500">
          Нет доступных помещений
        </div>
      </template>
    </USelectMenu>

    <USelectMenu
      v-model="selectedRole"
      :items="roleList"
      class="mt-[16px]"
      label="Роль"
      name="role"
      placeholder="Выберите роль"
      required
    >
      <template #empty>
        <div class="px-4 py-2 text-sm text-gray-500">Нет доступных ролей</div>
      </template>
    </USelectMenu>

    <!--    <UFormField class="mt-[16px]" label="Помещение" name="premise" required>-->

    <!--    </UFormField>-->
    <span
      v-if="errorObjectsMessage"
      class="text-error-400 text-sm font-semibold mt-4"
      >{{ errorObjectsMessage }}</span
    >
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
import type { IEmits, IProps } from "./types";
import { useAuthStore } from "~/store/auth";

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const authStore = useAuthStore();
const { houses, premises, roles } = storeToRefs(authStore);
const { fetchAuthHouses, fetchAuthPremises, fetchAuthRole } = authStore;

const accessToken = useCookie("access_token");

const selectedPremise = defineModel<number>("selectedPremise");
const selectedRole = defineModel<number>("selectedRole");

const selectedHouse = ref();
const housesList = ref();
const premiseList = ref();
const roleList = ref();

const onSubmit = () => {
  emit("onSubmit");
};

onMounted(() => {
  setTimeout(async () => {
    await fetchAuthHouses();
    await fetchAuthRole();

    if (roles.value.length) {
      roleList.value = roles.value.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
    }

    if (houses.value.length) {
      housesList.value = houses.value.map((item: any) => ({
        label: item.name,
        value: item.number,
      }));
    }
  }, 1000);
});

watch(selectedHouse, async (newValue) => {
  await fetchAuthPremises(newValue.value);

  if (premises.value.length) {
    premiseList.value = premises.value.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }
});
</script>

<style lang="scss" scoped />
