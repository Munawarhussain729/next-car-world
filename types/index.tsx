import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}


export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    car: CarProps;
    imageUrls: {
        raw: string,
        full: string,
        regular: string,
        small: string,
        small_s3: string,
        thumb: string
    }
}

// export interface FilterProps {
//     manufacturer: string;
//     model: string;
//     limit: number;

// }
export interface FilterProps {
    carType: string;
    
}


// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_RAPID_CAR_DATA_API_KEY: string;
        NEXT_PUBLIC_RAPID_CAR_DATA_HOST_KEY: string;
    }
}
