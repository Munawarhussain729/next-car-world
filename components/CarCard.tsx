"use client"

import { CarProps } from "@/types"
import { calculateCarRent, fetchCarDetails, getCarImage } from "@/utils"
import Image from "next/image"
import CustomButton from "./CustomButton"
import { useEffect, useState } from "react"
import CarDetails from "./CarDetails"
interface CarCardProps {
    car: CarProps
}

interface CarImagesUrl {
    raw: string,
    full: string,
    regular: string,
    small: string,
    small_s3: string,
    thumb: string
}


const CarCard = ({ car }: CarCardProps) => {
    const { year, make, model, type } = car
    const [cartDetails, setCarDetail] = useState<CarProps|null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [carRent , setCarRent ] = useState<string>('')
    const handleViewMore = async () => {
        try {
            const data: any = await fetchCarDetails(model, make, year);
            if (data) {
               if(data.length > 0){
                setCarRent(calculateCarRent(data[0]?.city_mpg, data[0]?.year))
                setCarDetail(data[0])
               }else{
                setCarDetail(null)
               }
            }
        } catch (error) {
            console.error("Error fetching car details:", error);
        }

        setIsOpen(true);
    };

    return (
        <>
            {
                <div className="car-card w-full group m-5">
                    <div className="car-card__content">
                        <h2 className="car-card__content-title">{make} {model}</h2>
                    </div>
                    <div className="relative flex w-full mt-10">
                        <div className="flex group-hover:invisible w-full  flex-wrap justify-between text-gray ">
                            <div className="flex justify-center items-center  gap-2">
                                <h1 className="font-bold text-[17px]">Year:</h1>
                                <p className="text-[14px]">{year}</p>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <h1 className="font-bold text-[17px]">Model:</h1>
                                <p className="text-[14px]">{model} </p>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <h1 className="font-bold text-[17px]">Vehicle Type:</h1>
                                <p className="text-[14px]"> {type}</p>
                            </div>
                        </div>
                        <div className="car-card__btn-container">
                            <CustomButton title="View More"
                                containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                                textStyles="text-white text-[14px] leading-[17px] font-bold "
                                rightIcon="/right-arrow.svg"
                                handleClick={handleViewMore} />
                        </div>
                    </div>
                    <CarDetails isOpen={isOpen} closeModal={()=>setIsOpen(false)} car={cartDetails} carRent = {carRent} />
                </div>
            }
        </>
    )
}

export default CarCard