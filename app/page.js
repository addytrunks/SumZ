import Demo from '@/components/Demo'
import Hero from '@/components/Hero'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='app'>
      <Hero/>
      <Demo/>
    </div>
  )
}
