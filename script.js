imageElement = document.querySelectorAll('.main img');
textElement = document.querySelectorAll('.main h1');
// filterElement = document.querySelector('.filter');
// console.log(textElement)
// console.log(imageElement);

function selectContinent (e) {
    index = 0;

    fetch('https://restcountries.com/v3.1/all')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {

        // for(let i = 0; i < data.length; i++) {
        //     console.log(i)
        //         if(target.value === element.continents[index])
        //         {
        //             textElement.innerText = element.name.common
        //             // console.log(element.name.common);
        //         }
        // }
            data.forEach(element => {
                console.log(element)
                if(e.target.value === element.continents[0])
                {
                    textElement.innerText = element.name.common
                    console.log(element.name.common);
                }
            })
        
    });
}
// selectContinent()

// filterElement.addEventListeners('change',)