"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchCars } from '@/utils';
import { CarCard, Hero, SearchBar } from '@/components';
import { CarType } from '@/types';



interface HomeProps {
  // Define any props you might receive here
}

export default function Home({ }: HomeProps) {
  const [searchedCar, setSearchedCar] = useState<string>('SUV');
  const [searchedModel, setSearchedModel] = useState<string>('');
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);


  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const allcars = localStorage.getItem('allCars')
        if (!!allcars) {
          return JSON.parse(allcars)
        }
        else {
          const allCars: CarType[] = await fetchCars();
          localStorage.setItem('allCars', JSON.stringify(allCars))
          return allCars;
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        return [];
      }
    };
    fetchAllCars();
  }, [])

  useEffect(() => {
    const updateFilteredCars = () => {
      const allcars = localStorage.getItem('allCars')
      if (allcars) {
        const allCars: CarType[]  = JSON.parse(allcars)
        console.log("All cares ", allCars);
        
        if (allCars.length > 0) {
          const updatedCars = allCars.filter((car) => car.type === searchedCar);
          setFilteredCars(updatedCars);
        }
      }
    };

    updateFilteredCars();
  }, [searchedCar]);

  const isDataEmpty = filteredCars.length === 0;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="mt-10 flex">
          <SearchBar
            searchType={true}
            searchedCar={searchedCar}
            setSearchedCar={setSearchedCar}
            searchedModel={searchedModel}
            setSearchedModel={setSearchedModel}
            filteredCars={filteredCars}
          />
          <SearchBar
            searchType={false}
            searchedModel={searchedModel}
            setSearchedModel={setSearchedModel}
            searchedCar={searchedCar}
            setSearchedCar={setSearchedCar}
            filteredCars={filteredCars}
          />
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, No Results</h2>
            <p>No cars found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
