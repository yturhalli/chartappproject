import type { AxiosInstance } from 'axios'

export type AuthSigninResultModel  = {
    ApiStatus: boolean,
    ApiStatusCode: string,
    ApiStatusMessage: string,
    Data: {
        "AccessToken": string,
        "RefreshToken": string,
        "TokenType": string,
        "ExpiresAt": string
    }
}

export async function AuthSignin(api: AxiosInstance, email:string, password: string): Promise<{ result: AuthSigninResultModel }> {
    const { data: result, headers } = await api.post<AuthSigninResultModel>(`/oauth/token`,{
        'Email': email,
        'Password': password,
        "GrantType": "password",
        "Scope": "amazon_data",
        "ClientId": "C0001", 
        "ClientSecret": "SECRET0001",
        "RedirectUri": "https://api.eva.guru"

      });
    return { result }
  }
