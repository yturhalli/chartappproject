import { useUserBaseApi } from "@/composable/useApi";
import { AuthSignin, AuthSigninResultModel } from "@/utils/auth-api";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useAuthSignin = defineStore('AuthSignin', () => {
    const api = useUserBaseApi()
    const res = ref<AuthSigninResultModel>()
  
    async function apiAuthSignin(email:string, password:string) {
      try {
          const response = await AuthSignin(api, email, password);
          res.value = response.result;
        
      } catch(err) {
        console.log(err)
      }
    }
  
    return {
      res,
      apiAuthSignin,
    } as const
  });

  if (module.hot) {
    module.hot.accept(acceptHMRUpdate(useAuthSignin, module.hot))
  }