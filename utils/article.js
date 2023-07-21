import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const articleApi = createApi({
    reducerPath:'articleApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders:(headers) => {
            headers.set('X-RapidAPI-Key',process.env.NEXT_PUBLIC_API_KEY)
            headers.set('X-RapidAPI-Host',process.env.NEXT_PUBLIC_API_HOST)
            return headers
        }
    }),
    endpoints:(builder) => ({
        getSummary:builder.query({
            // Encodes text string as a valid URL
            query:(params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        })
    })
})

// Use lazy allows us to fire off the api call on demand
export const {useLazyGetSummaryQuery} = articleApi;
