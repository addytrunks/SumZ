import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {
      url: 'https://time.com/6266679/musk-ai-open-letter/',
      length: '3'
    },
    headers: {
      'X-RapidAPI-Key': '48db5b6739mshf1e2f96645b0ca3p1f06aajsn25b807e63361',
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };

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