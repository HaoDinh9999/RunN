import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { config } from '../constant';

const baseQuery = fetchBaseQuery({ 
  baseUrl: config.API_URL ,
});

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
