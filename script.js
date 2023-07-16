const InfoOfCountry = document.querySelector('.info')
const selectArea = document.querySelector('select');
selectArea.value = 'Africa';
const gridOfCountries = document.querySelector('.countries');
const searchField = document.querySelector('.search-field');

selectArea.addEventListener('change', selectContinent)

// searchField.addEventListener('input', function() {
//     searchCountries(searchField.value)
// })


let allCountries = []

selectContinent()


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


function showCountriesContinent(continent) {

    const selectedCountries = allCountries.filter(function(country) {
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
        populationElement.textContent = country.population;
        countryCard.append(populationElement);

        countryCard.addEventListener('click', function() {
            showInfoOfCountries(country)
        })

        gridOfCountries.append(countryCard);
    })
}

function showInfoOfCountries(country) {
    InfoOfCountry.innerHTML = '';

    // country = allCountries.find(function(country) {
    //     return country.name.common === countryName;
    // });
    
    // if (country) {
    // InfoOfCountry.innerHTML = '';
    // }

    // countryCard = document.createElement('div');
    const nameElement = document.createElement('h2');
    nameElement.textContent = country.name.common;
    InfoOfCountry.append(nameElement);

    const populationElement = document.createElement('p');
    populationElement.textContent = country.population;
    InfoOfCountry.append(populationElement);

    const capitalElement = document.createElement('p');
    capitalElement.textContent = country.capital;
    InfoOfCountry.append(capitalElement);

    const languageElement = document.createElement('p');
    languageElement.textContent = country.languages[Object.keys(country.languages)[0]];
    InfoOfCountry.append(languageElement);

    InfoOfCountry.style.display = 'block'
}


// showCountriesContinent()























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