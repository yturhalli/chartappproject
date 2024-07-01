import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export type UserData = Record<string, any> | null

export const useUserSession = defineStore('userSession', () => {
  const token = useStorage('token', '')
  const user = useStorage('user', '')
  const userprofiledetails = useStorage('userprofiledetails', '')

 

  const loading = ref(true)

  const isLoggedIn = computed(() => token.value !== undefined && token.value !== '')

 

 

  function setToken(newToken: string) {
    token.value = newToken
  }

  function setUser (newUser: string) {
    user.value = newUser
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading
  }

  async function logoutUser() {
    token.value = undefined
    user.value = undefined
  }

  return {
    user,
    userprofiledetails,
    token,
    isLoggedIn,
    loading,
    logoutUser,
    setToken,
    setUser,
    setLoading,
  } as const
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */

if (module.hot) {
    module.hot.accept(acceptHMRUpdate(useUserSession, module.hot))
  }