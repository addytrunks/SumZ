'use client'

import Image from "next/image"
import { useState } from "react"

const Demo = () => {

  const [article,setArticle] = useState({
    url:'',
    summary:''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    alert('submitting')
  }

  const handleChange = (e) => {
    setArticle({...article,url:e.target.value})
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
      </div>

      {/* Display results */}
    </section>
  )
}

export default Demo