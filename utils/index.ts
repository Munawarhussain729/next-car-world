import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const headers = {
        'X-RapidAPI-Key': '706c180b6dmsh2e2bd50881882d3p18dab8jsncee714dc1521',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const { manufacturer, limit, model } = filters;
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make${manufacturer}&model=${model}&limit=${limit}`, {
        headers: headers,
    });

    const result = await response.json()
    return result
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

// export const generateCarImageUrl = (car: CarProps, angle?: string) => {
//     const url = new URL('https://cdn.imagin.studio/getimage');
//     const { make, year, model } = car;
//     url.searchParams.append('customer', 'hrjavascript-mastery');
//     url.searchParams.append('modelFamily', model.split(' ')[0]);
//     url.searchParams.append('zoomType', 'fullscreen')
//     url.searchParams.append('modelYear', `${year}`);
//     url.searchParams.append('angle', `${angle}`)
// }

export async function getCarImage(car: CarProps) {
    const apiKey = process.env.NEXT_PUBLIC_SPLASH_API_KEY;
    const searchQuery = car.make + " " + car.model;
    console.log("Search for Image is ", searchQuery);


    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${apiKey}`
        );

        if (!response.ok) {
            throw new Error('Error fetching images from Unsplash API');
        }

        const data = await response.json();
        return data.results[0]?.urls || "https://images.unsplash.com/1/type-away.jpg"
    } catch (error) {
        console.error(error);
        return [];
    }
}