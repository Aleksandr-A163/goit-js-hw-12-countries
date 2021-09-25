import './sass/main.scss';
import fetchCountries from "./js/fetchCountries";
import countryInfo from './templates/countryInfo.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import { alert } from '@pnotify/core/dist/PNotify.js';

const textManyCountries = 'Too many matches found. Please enter a more specific query!';
const textNoFound = 'Сheck the correctness of entered query';
const refsMarkUP={
    input: document.querySelector('.country-input'),
    countriesMarkUp: document.querySelector('.countries-list'),
    clearButton: document.querySelector('.country-clear-button'),
    countryContainer: document.querySelector('.country-container'),  
};


refsMarkUP.input.addEventListener('input', debounce(onInput, 600))

function onInput(e) {
    const searchQuery= e.target.value;
    refsMarkUP.countryContainer.innerHTML = '';
    refsMarkUP.countriesMarkUp.innerHTML = '';
    fetchCountries(searchQuery)
    .then((countries)=> {
        console.log(countries);
        if (countries.status === 404){
          alertCountry(textNoFound, 'error');
            return;
        }
        if(countries.length >= 2 && countries.length < 10){
          renderCountries(countries);
        }  else  {
          alertCountry(textManyCountries,'notice'); 
        }  
    })
    .catch((error)=> console.log("Описание ошибки", error));     
};

function renderCountries(countries){
    if(countries.length ===1){
 const list= countryInfo(...countries);
 refsMarkUP.countriesMarkUp.innerHTML =list;
    } else {
      const list= countryInfo(countries);
      refsMarkUP.countriesMarkUp.innerHTML =list;
  };
};

function alertCountry(text, type) {
  refsMarkUP.countriesMarkUp.innerHTML='';
alert({
  text,
  type,
});
};

refsMarkUP.clearButton.addEventListener('click', () => {
  refsMarkUP.countryContainer.innerHTML = '';
  refsMarkUP.countriesMarkUp.innerHTML = '';
  refsMarkUP.input.value = '';
});