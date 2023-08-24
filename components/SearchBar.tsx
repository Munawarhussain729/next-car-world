"use client"

import { useState } from "react"
import SearchManufacturer from "./SearchManufacturer"
import Image from "next/image"
import { useRouter } from "next/navigation"

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
        <Image
            src="/magnifying-glass.svg"
            alt="magnifying glass"
            width={40}
            height={40}
            className="object-contain"
        />
    </button>
)
const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState('')
    const [model, setmodel] = useState('')
    const router = useRouter()
   
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Manufacturere is ", manufacturer);

        if (manufacturer === '' && model === '') {
            return alert("Please Fill in the Search bar")
        }
        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    }
   
    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParsms = new URLSearchParams(window.location.search);
        if (model) {
            searchParsms.set('model', model)
        } else {
            searchParsms.delete('model')
        }

        if (manufacturer) {
            searchParsms.set('manufacturer', manufacturer)
        } else {
            searchParsms.delete('manufacturer')
        }

        const newPathname = `${window.location.pathname}?${searchParsms.toString()}`
        router.push(newPathname)
    }


    return (
        <form className="searchbar" onSubmit={handleSearch}>

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
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        <option selected>Choose car type </option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                </div>
            </div>

        </form>
    )
}

export default SearchBar