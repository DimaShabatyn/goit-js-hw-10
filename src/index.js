import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// console.log(countryList, countryInfo);
// console.log(searchBox);
searchBox.addEventListener('input', debounce(onInputSearchCountry, DEBOUNCE_DELAY));	

function onInputSearchCountry(e) {
    const value = searchBox.value.trim();
    // console.log(value);
    if (!value) { 
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }
    fetchCountries(value).then(data => {
        if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        }
        renderCountries(data)}
    ).catch(error => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
    });
};

function generateMarkupCountryInfo(data) {
    const markupCountryInfo = data.reduce((acc, {name, capital, population, flags:{svg}, languages}) => {
            // console.log(languages);
            const lang = languages.map(language => language.name).join(', ');
            // console.log(name);
            return acc + `<div class="card">
            <img src="${svg}" alt="${name}" width="40">
            <span>${name}</span>
            <p><span>Capital: </span> ${capital}</p>
            <p><span>Population: </span> ${population}</p>
            <p><span>Languages: </span> ${lang}</p>
          </div>`
        }, '');
    return markupCountryInfo;
};

const generateMarkupCountryList = (data) => data.reduce((acc, {name, flags:{svg}}) => {
        return acc + `<li>
        <img src="${svg}" alt="${name}" width="70">
        <span>${name}</span>
      </li>`
    }, 
'');

function renderCountries(result) {
    if (result.length === 1) { 
        countryList.innerHTML = '';
        generateMarkupCountryInfo(result);
        countryInfo.innerHTML = generateMarkupCountryInfo(result);
    }
    if (result.length >= 2 && result.length <= 10) {
        countryInfo.innerHTML = '';
        generateMarkupCountryList(result);
        countryList.innerHTML = generateMarkupCountryList(result);
    } 
    
}