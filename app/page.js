'use client'

import Demo from '@/components/Demo'
import Hero from '@/components/Hero'
import { store } from '@/utils/store'
import Image from 'next/image'
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <div className='app'>
      <Provider store={store}>
        <Hero/>
        <Demo/>
      </Provider>
    </div>
  )
}
