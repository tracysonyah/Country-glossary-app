const InfoOfCountry = document.querySelector('.info')
const selectArea = document.querySelector('select');
selectArea.value = 'Africa';
const gridOfCountries = document.querySelector('.countries');
const searchField = document.querySelector('.search-field');
let allCountries = [];

selectArea.addEventListener('change', selectContinent);
searchField.addEventListener('input', function() {
    searchCountries(searchField.value);
});

selectContinent();

function selectContinent() {
    fetch('https://restcountries.com/v3.1/all')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        allCountries = data;
        showCountriesContinent(selectArea.value)
    });
}

function showCountriesContinent(continent, countries = allCountries) {

    const selectedCountries = countries.filter(function(country) {
        if(country.continents.includes(continent)){
            return country
        }
    })
        
    gridOfCountries.innerHTML = '';

    selectedCountries.forEach(function(country) {
        const countryCard = document.createElement('div');
        const flagImg = document.createElement('img');
        flagImg.src = country.flags.png;
        countryCard.append(flagImg);

        const nameElement = document.createElement('h2');
        nameElement.textContent = country.name.common;
        countryCard.append(nameElement);

        const populationElement = document.createElement('p');
        populationElement.textContent = `Population: ${country.population}`;
        countryCard.append(populationElement);

        countryCard.addEventListener('click', function() {
            showInfoOfCountries(country)
        })

        gridOfCountries.append(countryCard);
    })
}

function showInfoOfCountries(country) {
    InfoOfCountry.innerHTML = '';

    const nameElement = document.createElement('h2');
    nameElement.textContent = country.name.common;
    InfoOfCountry.append(nameElement);

    const populationElement = document.createElement('p');
    populationElement.textContent = `Population: ${country.population}`;
    InfoOfCountry.append(populationElement);

    const capitalElement = document.createElement('p');
    capitalElement.textContent = `Capital: ${country.capital}`;
    InfoOfCountry.append(capitalElement);

    const languageElement = document.createElement('p');
    languageElement.textContent = `Language: ${country.languages[Object.keys(country.languages)[0]]}`;
    InfoOfCountry.append(languageElement);

    InfoOfCountry.style.display = 'block'
}


function searchCountries(searchTerm) {
    const filteredCountries = allCountries.filter(function(country) {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(searchTerm.toLowerCase());
    })
    showCountriesContinent(selectArea.value, filteredCountries);
}























// data.forEach(element => {
        //     console.log(element)
        //     if(element.continents.includes(e.target.value)) {
        //         textElement.innerText = element.name.common
        //         console.log(element.name.common);
        //     }
        //         // if(e.target.value === element.continents[0]){
        //         //     textElement.innerText = element.name.common
        //         //     console.log(element.name.common);
        //         // }
        //     })