import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "DownloadStats",
    "DownloadCSV",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "/client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "/client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "/client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "/client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "/sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "/management/admin",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `/management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "/general/dashboard",
      providesTags: ["Dashboard"],
    }),

    /*You should use rtk-query to download file, since using RTK Query would place that file in the cache - 
      which means in the user's memory. Which, depending on the file size could even crash the user's browser. 
      https://github.com/reduxjs/redux-toolkit/issues/1522 */

    /*React Query might be trying to parse the response as JSON by default, which would fail for CSV content.
    the responseHandler is directly handling the CSV download by creating a blob URL and redirecting the browser to it. 
    This avoids parsing or managing the response as JSON, */

    // downloadCsv: build.query({   // Not Working
    //   query: () => "/general/users/stats",
    //   responseType :'blob',
    //   providesTags: ["DownloadCSV"],
    // })
    downloadCsv: build.mutation({
      query: () => {
        return {
          url: `/general/users/stats`,
          method: "GET",
          responseHandler: async (response) =>
            window.location.assign(
              window.URL.createObjectURL(await response.blob())
            ),
          cache: "no-cache",
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useDownloadCsvMutation,
} = api;
