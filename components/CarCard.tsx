"use client"

import { CarProps } from "@/types"
import { calculateCarRent, getCarImage } from "@/utils"
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
    const { city_mpg, year, make, model, transmission, drive } = car;
    const CarRent = calculateCarRent(city_mpg, year)
    const [isOpen, setIsOpen] = useState(false)
    const [FullImage, setFullImage] = useState(false);
    const [imageUrls, setImageUrls] = useState<CarImagesUrl>({
        raw: '',
        full: '',
        regular: '',
        small: '',
        small_s3: '',
        thumb: ''
    });
    // const [imageUrls, setImageUrls] = useState<string[]>([]);

    return (
        <>
            {!FullImage && (
                <div className="car-card group m-3">
                    <div className="car-card__content">
                        <h2 className="car-card__content-title">{make} {model}</h2>
                    </div>
                    <p className="flex mt-6 text-[32px] font-extrabold">
                        <span className="self-start text-[14px] font-semibold">$ </span>
                        {CarRent}
                        <span className="self-start text-[14px] font-semibold">/day </span>
                    </p>

                    {imageUrls ? (
                        <div className="relative w-full h-40 my-3 object-cover">
                            <Image
                                src={imageUrls.full}
                                alt="car model"
                                layout="fill"
                                objectFit="contain"
                                priority
                                onError={() => setFullImage(true)}
                            />
                        </div>
                    ) : (
                        <div className="relative w-full h-40 my-3 object-contain">
                            <Image
                                src="/hero.png" // Provide a fallback image source
                                alt="car model"
                                layout="fill"
                                objectFit="contain"
                                priority
                                onError={() => setFullImage(true)}
                            />
                        </div>
                    )}
                    <div className="relative flex w-full mt-2">
                        <div className="flex group-hover:invisible w-full justify-between text-gray ">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <Image src="/steering-wheel.svg" width={20} height={20} alt="steering wheel" />
                                <p className="text-[14px]">{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <Image src="/tire.svg" width={20} height={20} alt="Tire" />
                                <p className="text-[14px]">{drive.toUpperCase()}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <Image src="/gas.svg" width={20} height={20} alt="Gas" />
                                <p className="text-[14px]">{city_mpg} MPG</p>
                            </div>
                        </div>
                        <div className="car-card__btn-container">
                            <CustomButton title="View More"
                                containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                                textStyles="text-white text-[14px] leading-[17px] font-bold "
                                rightIcon="/right-arrow.svg"
                                handleClick={() => setIsOpen(true)} />
                        </div>
                    </div>
                    <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} imageUrls={imageUrls} />
                </div>
            )}
        </>
    )
}

export default CarCard