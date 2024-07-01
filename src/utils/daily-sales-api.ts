import type { AxiosInstance } from 'axios'
export type DailySale = {
    date : string
    amount : number
    fbaAmount : number
    fbmAmount : number
    orderCount : number
    fbaOrderCount : number
    fbmOrderCount : number
    unitCount : number
    fbaUnitCount : number
    fbmUnitCount : number
    avgSalesPrev30Days : number
    prevYearDate : number
    prevYearAmount : number
    prevYearFbaAmount : number
    prevYearFbmAmount : number
    prevYearShippingAmount : number
    prevYearFbaShippingAmount : number
    prevYearFbmShippingAmount : number
    prevYearOrderCount : number
    prevYearUnitCount : number
    yoy30DailySalesGrowth : number
    prevYearAvgSalesPrev30Days : number
    profit : number
    cogs : number
    amazonExpense : number
    totalExpense : number
    shippingAmount : number
    fbaShippingAmount : number
    fbmShippingAmount : number
    avgProfitPrev30Days : number
    avgAdvertisingCostPrev30Days : number
    advertisingCost : number
    acos : number
    refundTotalAmount : number
    totalVatAmount : number
    otherFee : number
}

export type DailySalesResultModel  = {
    ApiStatus: boolean
    ApiStatusCode: string
    ApiStatusMessage: string
    Data: {
        Currency: string
        isYoyExist: boolean
        item: DailySale[]
    }
}

export async function FetchDailySales(api: AxiosInstance, marketplace:string, sellerId: string, requestStatus: number, day: number, excludeYoYData: boolean): Promise<{ result: DailySalesResultModel }> {
    const { data: result, headers } = await api.post<DailySalesResultModel>(`/data/daily-sales-overview`,{
        "marketplace": marketplace,
        "sellerId": sellerId,
        "requestStatus": requestStatus,
        "day": day,
        "excludeYoYData": excludeYoYData

      });
    return { result }
  }

  export type SkuListItem = {
    asin: string
    sku: string
    productName: string
    qty: number
    amount: number
    shippingAmount: number
    refundPercantage: number
    qty2: number
    amount2: number
    shippingAmount2: number
    sortingAmount: number
    imageUrl: string
  }

  export type SkuListData = {
    selectedDate: string
    TotalSale: number
    totalShippingAmount: number
    selectedDate2: string
    totalSale2?: number
    totalShippingAmount2?: number
    skuList: SkuListItem[]
  }

  export type DailySalesSkuListResultModel = {
    ApiStatus: boolean
    ApiStatusCode: string
    ApiStatusMessage: string
    Data: {
        Currency: string
        item: SkuListData
    }
  }

export async function FetchDailySalesSkuList(api: AxiosInstance, marketplace:string, sellerId: string, salesDate: string, salesDate2: string, pageSize: number, pageNumber: number, isDaysCompare: number): Promise<{ result: DailySalesSkuListResultModel }> {
    const { data: result, headers } = await api.post<DailySalesSkuListResultModel>(`data/daily-sales-sku-list`,{
        "marketplace": marketplace,
        "sellerId": sellerId,
        "salesDate": salesDate,
        "salesDate2": salesDate2,
        "pageSize": pageSize,
        "pageNumber": pageNumber,
        "isDaysCompare": isDaysCompare

      });
    return { result }
  }
  
  export type SkuRefundRateResultModel = {
    ApiStatus: boolean
    ApiStatusCode: number
    ApiStatusMessage: string
    Data: [
        {
        sku: string
        refundAmount: number
        refundQuantity: number
        refundRate: number
        totalOrderCount: number
        }
    ]
  }
export async function FetchSkuRefundRate(api: AxiosInstance, marketplace:string, sellerId: string, skuList: string[], requestedDay: number): Promise<{ result: SkuRefundRateResultModel }> {
    const { data: result, headers } = await api.post<SkuRefundRateResultModel>(`data/get-sku-refund-rate`,{
        "marketplace": marketplace,
        "sellerId": sellerId,
        "skuList": skuList,
        "requestedDay": requestedDay,
      });
    return { result }
  }
