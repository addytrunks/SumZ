'use client'

import { tick } from "@/public/assets"
import { useLazyGetSummaryQuery } from "@/utils/article"
import Image from "next/image"
import { useEffect, useState } from "react"

const Demo = () => {

  useEffect(() => {
    const articleUrlsLocal = JSON.parse(localStorage.getItem('articleUrls'))

    if(articleUrlsLocal){
      setAllArticles(articleUrlsLocal)
    }
  },[])

  const [article,setArticle] = useState({
    url:'',
    summary:''
  })

  const [allArticles, setAllArticles] = useState([])
  const [copied,setCopied] = useState(false)

  const [getSummary,{error,isFetching}] = useLazyGetSummaryQuery()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {data} = await getSummary({articleUrl:article.url});

    if(data?.summary){
      const newArticle = {...article,summary:data.summary}
      const updatedAllArticles = [newArticle,...allArticles]

      setArticle(newArticle)
      setAllArticles(updatedAllArticles)

      localStorage.setItem('articleUrls',JSON.stringify(updatedAllArticles))
    }
  }

  const handleChange = (e) => {
    setArticle({...article,url:e.target.value})
  }

  const handleCopy = (copyUrl) => {
    setCopied(true)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => {},3000)
    setCopied(false)
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">

        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <Image src='assets/link.svg' width={50} height={50}  alt='link_icon' className="absolute left-0 my-2 ml-3 w-5"/>
          <input type="url" placeholder="Enter articel URL" value={article.url} onChange={handleChange} required className="url_input peer"/>
          
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            <Image src='assets/enter.svg' width={20} height={20} />
          </button>
        </form>

        {/* Browsed URLs */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles?.map((item,index) => (
            <div key={`link/${index}`}  className="link_card">
              <div className="copy_btn" onClick={() =>handleCopy(item.url)} >
                <Image src={copied ? 'assets/tick.svg' :'assets/copy.svg'} alt="Copy" className="w-[40%] h-[40%] object-contain" width={20} height={20}/>
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate" onClick={() =>setArticle(item)}>{item.url}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Display results */}
      <div className="my-10 max-w-full flex justify-center items-center">
            {isFetching 
            ? (<Image src="assets/loader.svg" alt="loader" width={20} height={20} className="w-20 h-20 object-contain"/>)
            : error ? (
              <p className="font-inter text-center text-black font-bold">Well,that wasn't supposed to happen<br/><span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span></p>
            ) :(
              article?.summary && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-satoshi font-bold text-gray-600">Article <span className="blue_gradient">Summary</span></h2>
                  <div className="summary_box">
                    <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                  </div>
                </div>
              )
            )
          }
      </div>
    </section>
  )
}

export default Demo