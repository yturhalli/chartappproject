import axios, { AxiosInstance, AxiosHeaders, RawAxiosRequestHeaders } from 'axios'
import { useUserSession } from '@/stores/userSession'

let apiUser: AxiosInstance

export function createUserApi() {
  try {
    
    apiUser = axios.create({
      baseURL: "https://iapitest.eva.guru/",
    })
  
    apiUser.interceptors.request.use((config) => {
      const userSession = useUserSession();
      
      if (userSession.isLoggedIn) {
        const headers = new AxiosHeaders(config.headers);
        headers.set('Authorization', `Bearer ${userSession.token}`);
        config.headers = headers;
      }

      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  } catch(err) {
    console.log(`Error occured: ${JSON.stringify(err)}`)
  }

  return apiUser
}


export function useUserBaseApi() {
  if (!apiUser) {
    createUserApi()
  }
  return apiUser
}


