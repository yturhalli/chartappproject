
<script lang="ts" setup>
import { ref } from "vue"
import { useAuthSignin } from '@/stores/auth-api'
import { useFetchUserInformation } from '@/stores/user-api'
import { isNullBlank } from "@/composable/useCommonFunctions"
import {  useRouter } from "vue-router"
import { useUserSession } from '@/stores/userSession'
import { User } from "@/utils/user-api"
import { Store, storeToRefs } from "pinia"

const router = useRouter()
const userCredentials = ref({
  email: "",
  password: ""
})
const isLoading = ref(false)
const userSession = useUserSession()

interface StoreUser  {
  firstName: string
  lastName: string
  email: string
  userId: string
  marketPlace: string
  sellerId: string
}

const handleUserCreate = (userData?: User) => {
if(!userData) return undefined
let user : StoreUser | undefined = undefined
user = {
  firstName: userData.firstName,
  lastName: userData.lastName,
  email: userData.email,
  userId: userData.userId,
  marketPlace: userData.store[0].marketplaceName,
  sellerId: userData.store[0].storeId
}

return user
}

const handleUserSignIn = async () => {
  if(isLoading.value) return
  isLoading.value = true
  const service = useAuthSignin()
  try {
    await service.apiAuthSignin(userCredentials.value.email, userCredentials.value.password)
    if(!isNullBlank(service.res?.Data.AccessToken)) {
      userSession.setToken(service.res?.Data.AccessToken as string)
      const userService = useFetchUserInformation() 
      await userService.apiFetchUserInformation(userCredentials.value.email)
      let userInfo: StoreUser | undefined = undefined 
      userInfo = handleUserCreate(userService.res?.Data.user) 
      if(userInfo) userSession.setUser(JSON.stringify(userInfo))
      router.push('/dashboard')
      }
  } catch(err) {
    console.log('Catch')
    console.log(err)
  }
}
</script>


<template>
    
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- {{userCredentials}} -->
      <form class="space-y-6" action="#" method="POST" @submit.prevent="handleUserSignIn">
        <div>
          
          <div class="flex items-center justify-between">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          </div>
          <div class="mt-2">
            <input v-model="userCredentials.email" id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="userCredentials.password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click="handleUserSignIn" type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>