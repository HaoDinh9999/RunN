import { api } from '../../api';

import fetchOne from './fetchOne';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchOne: fetchOne(builder),
    login: builder.mutation({
      query: (credentials) => ({
        url:'/users/login',
        method:'POST',
        body: credentials
      })
    }),
    
  }),
  overrideExisting: false,
});
// Export ra ngoài thành các hooks để sử dụng theo cú pháp use + endpoints (login) + endpoints type (mutation)

export const { useLazyFetchOneQuery, useLoginMutation } = userApi;
