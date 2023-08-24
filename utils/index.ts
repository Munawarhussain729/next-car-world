import { CarProps, FilterProps } from "@/types";
import dotenv from 'dotenv';
dotenv.config();

export async function fetchCars(filters: FilterProps): Promise<any[]> {
    const { carType } = filters;
    const url: string = 'https://car-data.p.rapidapi.com/cars?limit=10&page=0';

    const options: RequestInit = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_CAR_DATA_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_CAR_DATA_HOST_KEY
        }
    };

    try {
        const response: Response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const result: any[] = await response.json(); // Parse the JSON response
        return result;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}


export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export async function getCarImage(car: CarProps) {
    const apiKey = process.env.NEXT_PUBLIC_SPLASH_API_KEY;
    const searchQuery = car.make + " " + car.model;

    const url: string = 'https://car-data.p.rapidapi.com/cars/types';
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_CAR_DATA_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_CAR_DATA_HOST_KEY
        }
    };

    try {
        const response: Response = await fetch(url, options);
        const result: string = await response.text();
    } catch (error) {
        console.error(error);
    }


    // try {
    //     const response = await fetch(
    //         `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${apiKey}`
    //     );

    //     if (!response.ok) {
    //         throw new Error('Error fetching images from Unsplash API');
    //     }

    //     const data = await response.json();
    //     return data.results[0]?.urls || "https://images.unsplash.com/1/type-away.jpg"
    // } catch (error) {
    //     console.error(error);
    //     return [];
    // }
}


export async function fetchCarType(): Promise<string[]> {
    const url: string = 'https://car-data.p.rapidapi.com/cars/types';
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_CAR_DATA_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_CAR_DATA_HOST_KEY
        }
    };

    try {
        const response: Response = await fetch(url, options);
        if (response.ok) {
            const data: string[] = await response.json(); // Assuming the API returns a JSON array of strings
            return data;
        } else {
            throw new Error('Failed to fetch data');
        }

    } catch (error) {
        console.error(error);
    }
}
