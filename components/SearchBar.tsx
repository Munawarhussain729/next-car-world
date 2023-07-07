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
            <div className="searchbar__item">
                <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
            </div>

            <div className="searchbar__item">
                <Image
                    src="/model-icon.png"
                    alt="Model Icon"
                    width={25}
                    height={25}
                    className="absolute w-[20px] h-[20px] ml-4" />
                <input type="text"
                    name="model"
                    value={model}
                    placeholder="Tiguan"
                    className="searchbar__input"
                    onChange={(e) => setmodel(e.target.value)}
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    )
}

export default SearchBar