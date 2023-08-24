"use client"

import { useEffect, useState } from "react"
import SearchManufacturer from "./SearchManufacturer"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { fetchCarType, fetchCars } from "@/utils"

const SearchBar = ({ searchType }) => {
    const [manufacturer, setManufacturer] = useState('')
    const [model, setmodel] = useState('')
    const [carTypes, setCarTypes] = useState<String[]>([]);
    const [searchedCar, setSearchedCar] = useState('');

    const router = useRouter()

    // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log("Manufacturere is ", manufacturer);

    //     if (manufacturer === '' && model === '') {
    //         return alert("Please Fill in the Search bar")
    //     }
    //     updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    // }

    const updateSearchParams = (carType: string) => {
        const searchParsms = new URLSearchParams(window.location.search);
        if (carType) {
            searchParsms.set('carType', carType)
        } else {
            searchParsms.delete('carType')
        }
        const newPathname = `${window.location.pathname}?${searchParsms.toString()}`
        router.push(newPathname)
    }

    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setSearchedCar(newValue);
        updateSearchParams(newValue)
    };


    useEffect(() => {
        const storedData = localStorage.getItem('carTypes');
    
        if (storedData === undefined) {
            const parsedData = JSON.parse(storedData);
            setCarTypes(parsedData);
        } else {
            const getAllTypes = async () => {
                const response: String[] = await fetchCarType();
                setCarTypes(response);
                localStorage.setItem('carTypes', JSON.stringify(response));
            };
    
            getAllTypes();
        }
    }, []);
    


    return (
        <div >
            {searchType ? (<div className="flex items-center">
                <Image
                    src="/model-icon.png"
                    alt="Model Icon"
                    width={25}
                    height={25}
                    className="w-5 h-5 ml-4"
                />
                <div className="ml-4 w-[20rem]">
                    <label htmlFor="underline_select" className="sr-only">
                        Underline select
                    </label>
                    <select
                        id="underline_select"
                        className="block py-2.5 px-3  w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        value={searchedCar}
                        onChange={handleSelectChange}
                    >
                        {
                            Array.isArray(carTypes) && carTypes.length > 0 ? (
                                carTypes?.map((item) => (
                                    <option value={item} className="my-2">{item}</option>

                                ))) : (
                                <option value="">No car types available</option>
                            )
                        }
                    </select>
                </div>
            </div>)
                : (
                    <div className="flex items-center">
                        <Image
                            src="/model-icon.png"
                            alt="Model Icon"
                            width={25}
                            height={25}
                            className="w-5 h-5 ml-4"
                        />
                        <div className="ml-4 w-[20rem]">
                            <label htmlFor="underline_select" className="sr-only">
                                Underline select
                            </label>
                            <select
                                id="underline_select"
                                className="block py-2.5 px-3  w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                value={searchedCar}
                                onChange={handleSelectChange}
                            >
                                {
                                    Array.isArray(carTypes) && carTypes.length > 0 ? (
                                        carTypes?.map((item) => (
                                            <option value={item} className="my-2">{item}</option>

                                        ))) : (
                                        <option value="">No car types available</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default SearchBar