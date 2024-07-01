import type { AxiosInstance } from 'axios'

export type Store = {
    storeName: string
    accountType: number
    storeId: string
    evaStoreId: string
    storeType: number
    region: string
    paidStatus: number
    pricingStatus: number
    linkedDate: string
    paidDate: string
    reimbursementPackageTrialEndDate: string | null
    unlimitedReimbursementStatus: number
    showSellerCentralExternalLink: boolean
    remainingReimbursementCredit: number
    monthlyReimbursementPackageCredit: number
    marketplaceName: string
    marketplaceCode: string
    enableRepricing: boolean
    reimbursementStatus: boolean
    loanOfferAmount: number
    subscriptionCancelationStatus: number
    subscriptionCancelationDate: string
    subscriptionPackageType: number
    subscriptionStatus: number
    subscriptionVersion: number
    hasReimbursementService: boolean
    isSubscriptionAnnual: boolean
    is3plStore: boolean
    isAdvertisingConnected: boolean
    sellerApiTokenStatus: number
    sellerApiAuthCodeCreatedAt: string 
    advertisingAuditState: {
        advertisingAuditDisplayEndDate: string
        advertisingAuditDisplayStartDate: string
        displayAdvertisingAudit: boolean
    }
}

export type TurnoverPackage = {
    pricingStatus: number,
    packageName: string,
    monthlyFee: number,
    lowerLimit: number,
    upperLimit: number,
    reimbursementCredit: number
}

export type SkuPackage = {
    pricingStatus: number
    packageName: string
    packageDefinition: string
    lowerSkuCount: number
    upperSkuCount: number
}

export type Package = {
    subscriptionType : number
    pricingStatus : number
    packageName : string
    packageRank : number
    monthlyFee : number
    annualFee : number
    lowerLimit : number
    upperLimit : number
    lowerSkuLimit : number
    upperSkuLimit : number
}


export type PackageInfo = {
    turnoverPackageInformation: TurnoverPackage[]
    skuPackageInformation: SkuPackage[]
    packageInformation: Package[]

}

export type User = {
    firstName: string
    lastName: string
    email: string
    isAdmin: boolean
    isSuperAdmin: boolean
    isWarehouseAdmin: boolean
    isStoreAdmin: boolean
    countryCode: string | null
    callingCode: string | null
    telephoneNumber: string | null
    accountStatus: number
    accountType: number
    userId: string
    store: Store[]
    packageInformation: PackageInfo
}



export type UserResultModel  = {
    ApiStatus: boolean,
    ApiStatusCode: number,
    ApiStatusMessage: string,
    Data: {
        isLinkAccount: boolean,
        linkAccountParameters: string
        user: User
    }
}

export async function FetchUserInformation(api: AxiosInstance, email:string): Promise<{ result: UserResultModel }> {
    const { data: result, headers } = await api.post<UserResultModel>(`/user/user-information`,{
        'email': email,
      });
    return { result }
  }