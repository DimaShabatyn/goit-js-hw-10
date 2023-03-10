import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const fetchCountries = (name) => {
    const URL = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(URL).then(response => {
        // console.log(response);
        if (response.status === 404) {
            throw new Error(response.status);
        }
        // console.log(response.json());
        return response.json();
    })  
};
