import Image from "next/image"

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <Image src="/assets/logo.svg" alt="Logo" width={100} height={100} className="w-28 object-contain"/>

        {/* Use form so that the component can maintain its server side capabilites */}
        <form action="https://github.com">
          <button type="submit" className="black_btn">
          Github
          </button>
        </form>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden"/>
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1> 

      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero