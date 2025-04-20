import apisauce, { ApiResponse, ApisauceConfig } from 'apisauce';
import { ApiConstant, AppConstant } from '@/const';
import Cookie from 'js-cookie';

const DEFAULT_CONFIG: ApisauceConfig = {
  baseURL: process.env.DAPP_SERVICE_URL || '',
  headers: { ...ApiConstant.HEADER_DEFAULT },
  timeout: ApiConstant.TIMEOUT,
};

const handleErrorRequest = (response: ApiResponse<ApiResponseInterface>) => {
  if (
    response.status &&
    ![ApiConstant.STT_OK, ApiConstant.STT_CREATED].includes(response.status)
  ) {
    console.log(response);
  }
};

const Api = apisauce.create(DEFAULT_CONFIG);
export default Api;
Api.addResponseTransform(handleErrorRequest);

const createInstance = (token?: string) => {
  const newToken = token || Cookie.get(AppConstant.KEY_TOKEN);
  newToken && Api.setHeader('Authorization', `Bearer ${newToken}`);

  return Api;
};

export const createDappServices = (token?: string) => createInstance(token);

export interface ApiResponseInterface {
  status: number;
  data: object;
}
