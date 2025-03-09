<template>
      <UContainer class="flex flex-col justify-center items-center mt-[186px] mb-[40px]">
        <UIcon name="hugeicons:electric-home-02" class="size-[40px]" />
        <span>DomConnect</span>
      </UContainer>
      <UTabs :items="items" class="w-[80%] sm:w-1/2 md:w-[40%] lg:w-1/3 xl:w-1/4 2xl:w-1/5 h-[100%] m-auto">
        <template #login>
          <UForm class="flex flex-col gap-[16px] mt-[26px]" :state="login">
            <UFormField label="Электронная почта" name="email" required>
              <UInput placeholder="john@lennon.com" v-model="login.email" class="w-full" />
            </UFormField>
            <UFormField label="Пароль" name="password" required>
              <UInput placeholder="********" v-model="login.password" class="w-full" />
            </UFormField>
            <ULink class="text-end" to="/">Забыли пароль?</ULink>
            <UCheckbox v-model="login.remember" name="news" label="Запомнить меня" />

            <UButton class="justify-center" label="Войти" type="submit" variant="soft" />
          </UForm>
        </template>
        <template #register>
          <UForm class="flex flex-col gap-[16px] mt-[26px]" :state="register">
            <UFormField label="Электронная почта" name="email" required>
              <UInput placeholder="john@lennon.com" v-model="register.email" class="w-full" />
            </UFormField>
            <UFormField label="Номер телефона" name="email" required>
              <UInput placeholder="+7 (900) 123-45-67" v-model="register.phone" class="w-full" />
            </UFormField>
            <UFormField label="Пароль" name="password" required>
              <UInput placeholder="********" v-model="register.password" class="w-full" />
            </UFormField>
            <UFormField label="Помещение" name="house" required>
              <UInputMenu class="w-full" icon="i-lucide-search" placeholder="Квартира №1" />
            </UFormField>

            <UCheckbox v-model="register.remember" name="news" label="Запомнить меня" />

            <UButton class="justify-center" label="Зарегестрироваться" type="submit" variant="soft" />
          </UForm>
        </template>
      </UTabs>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const login = reactive({
  email: '',
  password: '',
  remember: false
});

const register = reactive({
  email: '',
  phone: '',
  password: '',
  remember: false
});

const items = ref([
  {
    label: 'Вход',
    content: 'login',
    slot: 'login'
  },
  {
    label: 'Регистрация',
    content: 'register',
    slot: 'register'
  }
])
</script>

<style scoped />