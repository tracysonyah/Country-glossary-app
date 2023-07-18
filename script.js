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
        console.log(allCountries)
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
        //for each country, create a card to display the display the flag, name and population
        const countryCard = document.createElement('div');
        countryCard.setAttribute("class", "grid")
        const flagImg = document.createElement('img');
        flagImg.src = country.flags.png;
        countryCard.append(flagImg);

        const nameElement = document.createElement('h2');
        nameElement.textContent = country.name.common;
        countryCard.append(nameElement);

        const populationElement = document.createElement('p');
        populationElement.textContent = `Population: ${country.population}`;
        countryCard.append(populationElement);


        //add an event listener on each country card to display the below details when clicked
        countryCard.addEventListener('click', function() {
            
            const countryPopup = document.querySelector('.country-popup');

            const flagImg = countryPopup.querySelector('.country-flag');
            flagImg.src = country.flags.png;

            const nameElement = countryPopup.querySelector('.country-name');
            nameElement.textContent = country.name.common;

            const capitalElement = countryPopup.querySelector('.country-capital');
            capitalElement.textContent = `Capital: ${country.capital}`;

            const populationElement = countryPopup.querySelector('.country-population');
            populationElement.textContent = `Population: ${country.population}`;

            const regionElement = countryPopup.querySelector('.country-region');
            regionElement.textContent = `Region: ${country.region}`

            const subregionElement = countryPopup.querySelector('.subregion');
            subregionElement.textContent = `Sub-Region: ${country.subregion}`

            const languageElement = countryPopup.querySelector('.country-language');
            languageElement.textContent = `Language: ${country.languages[Object.keys(country.languages)[0]]}`;

            const timezoneElement = countryPopup.querySelector('.country-timezone');
            timezoneElement.textContent = `TimeZone: ${country.timezones}`;

            //display the popup when a country is clicked
            countryPopup.style.display = 'block';

            //add an event lsitener on the document to display none when u click outside the popup
            document.addEventListener('click', function(event) {
                if(event.target === countryPopup) {
                    countryPopup.style.display = 'none';
                }
            }) 
        })

        gridOfCountries.append(countryCard);
    })
}

//activate the search field, enable case sensitivity
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