import { CarCard, CustomFilter, Hero, SearchBar } from '@/components'
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useState } from 'react';

export default async function Home({ searchParams }) {
  const allcars = await fetchCars({
    carType: searchParams.carType ||''
  });  
  const isDataEmpty = !Array.isArray(allcars) || allcars.length < 1 || !allcars
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'> Car Catalogue</h1>
          <p>Explore the cars you migh like</p>
        </div>
        <div className='mt-10'>
          <SearchBar searchType ={true}/>
          <SearchBar searchType ={false} />
        </div>
        {
          !isDataEmpty ? (
            <section>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                {allcars?.map((car) => (
                  <CarCard car={car} />
                ))}
              </div>
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className='text-black text-xl font-bold'> Oops, No Results</h2>
              <p >{allcars?.message}</p>
            </div>
          )
        }
      </div>
    </main>
  )
}
