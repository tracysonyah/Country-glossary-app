const selectArea = document.querySelector('select');
selectArea.value = 'Africa';
const gridOfCountries = document.querySelector('.countries')
const searchField = document.querySelector('.search-field')

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
        // flagImg.alt = `${country.name.common} flag`;
        countryCard.append(flagImg);

        const nameElement = document.createElement('h2');
        nameElement.textContent = country.name.common;
        countryCard.append(nameElement);

        const populationElement = document.createElement('p');
        populationElement.textContent = country.population;
        //`population: ${country.population}`;
        countryCard.append(populationElement);

        gridOfCountries.append(countryCard);
    })

    searchField.addEventListener('keyup', function() {
        selectedCountries.forEach((country => {
            if(country.name.common.toLowerCase().includes(searchField.value.toLowerCase())) {
                console.log(country.name.common)
            }
        }))
    })
}



// function searchInputField() {
//     if(gridOfCountries.innerText.toLowerCase().includes(searchField.value.toLowerCase())) {
//         gridOfCountries.style.display = 'grid';
//     }
//     else {
//         gridOfCountries.style.display = 'none'
//     }
// }
// searchInputField();

// searchField.addEventListener('keyup', searchInputField)





showCountriesContinent()























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