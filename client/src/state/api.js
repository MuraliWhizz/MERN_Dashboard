import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL }/api`}),
  reducerPath: "adminApi",
  tagTypes: [
    "EnergyInsights",
    "Sectors",
    "Regions",
    "Topics",
    "Countries",
    "Sources",
    "PestleFactors",
  ],
  endpoints: (builder) => ({
    getEnergyInsights: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "search",
        method: "GET",
        params: { page, pageSize, sort, search, sector: "Energy" },
      }),
      providesTags: ["EnergyInsights"],
    }),
    getSectors: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
        params: { field: "sector" },
      }),
      transformResponse: (response) => [...new Set(response.map(item => item.sector))],
      providesTags: ["Sectors"],
    }),
    getRegions: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
        params: { field: "region" },
      }),
      transformResponse: (response) => [...new Set(response.map(item => item.region))],
      providesTags: ["Regions"],
    }),
    getTopics: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
        params: { field: "topic" },
      }),
      transformResponse: (response) => [...new Set(response.map(item => item.topic))],
      providesTags: ["Topics"],
    }),
    getCountries: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
        params: { field: "country" },
      }),
      transformResponse: (response) => [...new Set(response.map(item => item.country))],
      providesTags: ["Countries"],
    }),
    getSources: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
        params: { field: "source" },
      }),
      transformResponse: (response) => [...new Set(response.map(item => item.source))],
      providesTags: ["Sources"],
    }),
    getPestleFactors: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
        params: { field: "pestle" },
      }),
      transformResponse: (response) => [...new Set(response.map(item => item.pestle))],
      providesTags: ["PestleFactors"],
    }),
    getInsightsByFilter: builder.query({
      query: ({ filter, value, page, pageSize, sort, search }) => ({
        url: "search",
        method: "GET",
        params: { page, pageSize, sort, search, [filter]: value },
      }),
      providesTags: (result, error, arg) => [{ type: "EnergyInsights", id: arg.filter }],
    }),
    getPestleDistribution: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
        params: { field: "pestle" },
      }),
      transformResponse: (response) => {
        const distribution = response.reduce((acc, item) => {
          acc[item.pestle] = (acc[item.pestle] || 0) + 1;
          return acc;
        }, {});
        return Object.entries(distribution).map(([pestle, count]) => ({
          id: pestle,
          label: pestle,
          value: count,
        }));
      },
      providesTags: ["PestleFactors"],
    }),
  }),
});

export const {
  useGetEnergyInsightsQuery,
  useGetSectorsQuery,
  useGetRegionsQuery,
  useGetTopicsQuery,
  useGetCountriesQuery,
  useGetSourcesQuery,
  useGetPestleFactorsQuery,
  useGetInsightsByFilterQuery,
  useGetPestleDistributionQuery,
} = api;
