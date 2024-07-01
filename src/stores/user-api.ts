import { useUserBaseApi } from "@/composable/useApi";
import { FetchUserInformation, UserResultModel } from "@/utils/user-api";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useFetchUserInformation = defineStore('FetchUserInformation', () => {
    const api = useUserBaseApi()
    const res = ref<UserResultModel>()
  
    async function apiFetchUserInformation(email:string) {
      try {
          const response = await FetchUserInformation(api, email);
          res.value = response.result;
        
      } catch(err) {
        console.log(err)
      }
    }
  
    return {
      res,
      apiFetchUserInformation,
    } as const
  });

  if (module.hot) {
    module.hot.accept(acceptHMRUpdate(useFetchUserInformation, module.hot))
  }