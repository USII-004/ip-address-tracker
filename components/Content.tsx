"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

//Dynamically import the map to prevent SSR issues
const MapComponent = dynamic(() => import('../components/Map'), {
  ssr: false, //disable ssr for the component
})

interface IpData {
  ip: string;
  isp: string;
  location: {
    city: string;
    country: string;
    geonameId: number;
    lat: number;
    lng: number;
    postalCode: string;
    region: string;
    timezone: string;
  };
  // Add other properties that the API response might contain
}

const Content = () => {
  
  const [ip, setIp] = useState<string | null>(null);
  const [data, setData] = useState<IpData | null>(null); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIp(event.target.value);
  };

  const fetchIpData = async (userIp: string | null) => {
    try {
      const response = await axios.get('https://geo.ipify.org/api/v1', {
        params: {
          apiKey: 'at_7vCFFETbC8lqpcEFux6L4zO6AHipr',
          ipAddress: userIp,
        },
      });
      
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching IP data", error);
    }
  };
  

  const handleSubmit = async() => {
    await fetchIpData(ip);
  }
  
  useEffect(() => {
    fetchIpData(null);
  }, []);

  return (
    <div className='h-screen'>
      <div className='pt-6 h-[25%] md:h-[30%] bg-mobile-hero md:bg-desktop-hero bg-cover bg-center'>
        <div className='relative z-10'>
          <h2 className='text-2xl md:text-xl font-bold text-center'>
            IP Address Tracker
          </h2>
          <div className='flex w-[80%] md:w-[35%] justify-center items-center mx-auto my-6'>
            <input 
            type="text" 
            value={ip || ''}
            placeholder='Enter IP address'
            className='w-full h-12 rounded-tl-lg rounded-bl-lg p-4 text-black font-bold text-sm focus:outline-none'
            onChange={handleInputChange}
            />
            <button 
            type='submit'
            className='bg-black hover:bg-gray-800 h-12 px-5 rounded-tr-lg rounded-br-lg'
            onClick={handleSubmit}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      </div>
      {/* leaflet map */}
      <div className='h-[75%] md:h-[70%] w-full relative z-0'>
        <MapComponent
          lat={data?.location.lat}
          lng={data?.location.lng}
        />
      </div>

      {/* display output */}
      <div className='py-4 px-4 md:px-2 w-[80%] md:w-[70%] md:flex justify-center items-center bg-white text-black rounded absolute top-[19%] md:top-[25%] left-[15%] z-10 font-bold'>
        <div className='py-2 md:px-8 text-center md:border-r-2 border-gray-300'>
          <p className='text-xs text-gray-700 uppercase'>IP Address</p>
          <h2 className='text-xl'>{data?.ip || 'N/A'}</h2>
        </div>

        <div className='py-2 md:px-8 text-center md:border-r-2 border-gray-300'>
          <p className='text-xs text-gray-700 uppercase'>Location</p>
          <h2 className='text-xl'>{!data ? 'N/A' : `${data.location.city}, ${data.location.country} ${data.location.postalCode}`}</h2>
        </div>

        <div className='py-2 md:px-8 text-center md:border-r-2 border-gray-300'>
          <p className='text-xs text-gray-700 uppercase'>timezone</p>
          <h2 className='text-xl'>{!data ? 'N/A' : `UTC ${data.location.timezone}`}</h2>
        </div>

        <div className='py-2 md:px-8 text-center'>
          <p className='text-xs text-gray-700 uppercase'>isp</p>
          <h2 className='text-xl'>{data?.isp || 'N/A'}</h2>
        </div>
      </div>
    </div>
  )
}

export default Content