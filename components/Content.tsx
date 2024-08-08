import React from 'react'
import Image from 'next/image'

const Content = () => {
  return (
    <div className='pt-10'>
      <div className='relative h-[30%] w-full'>
        <Image
          src='/images/pattern-bg-mobile.png'
          alt='Background'
          layout='fill'
          objectFit='cover'
          quality={100} 
        />
        <div className='relative z-10'>
          <h2 className='text-3xl font-bold text-center'>
            IP Address Tracker
          </h2>
          <div className='flex w-[80%] justify-center items-center mx-auto my-6'>
            <input type="text" className='w-full h-12 rounded-tl-lg rounded-bl-lg p-4'/>
            <button className='bg-slate-400 h-12 p-1 rounded-tr-lg rounded-br-lg'>submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content