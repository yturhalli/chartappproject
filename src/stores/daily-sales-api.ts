import { useUserBaseApi } from "@/composable/useApi";
import { DailySalesResultModel, DailySalesSkuListResultModel, FetchDailySales, FetchDailySalesSkuList, FetchSkuRefundRate, SkuRefundRateResultModel } from "@/utils/daily-sales-api";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useFetchDailySales = defineStore('FetchDailySales', () => {
    const api = useUserBaseApi()
    const res = ref<DailySalesResultModel>()
  
    async function apiFetchDailySales(marketplace: string, sellerId: string, requestStatus: number, day: number, excludeYoYData: boolean) {
      try {
          const response = await FetchDailySales(api, marketplace, sellerId, requestStatus, day, excludeYoYData);
          res.value = response.result;
        
      } catch(err) {
        console.log(err)
      }
    }
  
    return {
      res,
      apiFetchDailySales,
    } as const
  });

export const useFetchDailySalesSkuList = defineStore('FetchDailySalesSkuList', () => {
    const api = useUserBaseApi()
    const res = ref<DailySalesSkuListResultModel>()
  
    async function apiFetchDailySalesSkuList(marketplace:string, sellerId: string, salesDate: string, salesDate2: string, pageSize: number, pageNumber: number, isDaysCompare: number) {
      try {
          const response = await FetchDailySalesSkuList(api, marketplace, sellerId, salesDate, salesDate2, pageSize, pageNumber, isDaysCompare);
          res.value = response.result;
        
      } catch(err) {
        console.log(err)
      }
    }
  
    return {
      res,
      apiFetchDailySalesSkuList,
    } as const
  });

export const useFetchSkuRefundRate = defineStore('FetchSkuRefundRate', () => {
    const api = useUserBaseApi()
    const res = ref<SkuRefundRateResultModel>()
  
    async function apiFetchSkuRefundRate(marketplace:string, sellerId: string, skuList: string[], requestedDay: number) {
      try {
          const response = await FetchSkuRefundRate(api, marketplace, sellerId, skuList, requestedDay);
          res.value = response.result;
        
      } catch(err) {
        console.log(err)
      }
    }
  
    return {
      res,
      apiFetchSkuRefundRate,
    } as const
  });

  if (module.hot) {
    module.hot.accept(acceptHMRUpdate(useFetchDailySales, module.hot))
    module.hot.accept(acceptHMRUpdate(useFetchDailySalesSkuList, module.hot))
    module.hot.accept(acceptHMRUpdate(useFetchSkuRefundRate, module.hot))
  }