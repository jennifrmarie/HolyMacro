const apiKey = '39f67f61e0914d4282aa1b3f01123002';
const searchUrl = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${apiKey}`

function getData() {
    console.log('a')
    const minCals = $('#js-min-cals').val();
    const maxCals = $('#js-max-cals').val();
    const minProt = $('#js-min-prot').val();
    const maxProt = $('#js-max-prot').val();
    const minCarbz = $('#js-min-carbs').val();
    const maxCarbz = $('#js-max-carbs').val();
    const minFats = $('#js-min-fat').val();
    const maxFats = $('#js-max-fat').val();
    const maxResults = $('#js-max-results').val();
    let urlString = `&minCalories=${minCals}&maxCalories=${maxCals}&minProtein=${minProt}&maxProtein=${maxProt}&minCarbs=${minCarbz}&maxCarbs=${maxCarbz}&minFat=${minFats}&maxFat=${maxFats}&number=${maxResults}`
    //   const urlJoin = urlString.join('&')
    const url = searchUrl + urlString;
    console.log(minCals)
    console.log(url)
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then((responseJson) => {
            console.log(responseJson[1])
            for (let i = 0; i < responseJson.length; i++) {
                console.log(responseJson[i].image)
                $('#results').append(`<ul class="macroNutrients">
                <li class="items">
                <h3>${responseJson[i].title}</h3>
                <img src="${responseJson[i].image}">
                <span>Calories:${responseJson[i].calories}</span>
                <span>Protein:${responseJson[i].protein}</span>
                <span>Carbs:${responseJson[i].carbs}</span>
                <span>Fat:${responseJson[i].fat}</span>
                <button data-recipe-id="${responseJson[i].id}"class="more">Get URL</button>
                </li>
                </ul>`);
                // console.log(responseJson[i].id)
            }
        })
        .catch(err => {
            $('#js-error-message').text(`Something went wrong`);
        });
}

function watchMore() {
    $('#results').on('click', '.more', event => {
        // $(event.currentTarget);
        let $button = (event.currentTarget)
        // let recipeIde = $('button').data("recipe-id")
        let recipeIde = $($button).data('recipe-id');
        console.log(recipeIde)
        fetch(`https://api.spoonacular.com/recipes/${recipeIde}/information?apiKey=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then((responseJson) => {
            console.log(responseJson)
            let url = `${responseJson.sourceUrl}`
            console.log("url")
            window.location = url;
            
        })
    
    })
}   

        
function onPageReady() {
    watchMore();
    watchForm();
}
function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        $('#results').empty();
        $('#js-form').hide();
        getData();
    })
}
$(onPageReady);
