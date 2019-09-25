const apiKey = '39f67f61e0914d4282aa1b3f01123002';
const searchUrl = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${apiKey}`

function getData() {
    $('.back').hide();
    const minCals = $('#js-min-cals').val();
    const maxCals = $('#js-max-cals').val();
    const minProt = $('#js-min-prot').val();
    const maxProt = $('#js-max-prot').val();
    const minCarbz = $('#js-min-carbs').val();
    const maxCarbz = $('#js-max-carbs').val();
    const minFats = $('#js-min-fat').val();
    const maxFats = $('#js-max-fat').val();
    const maxResults = $('#js-max-results').val();
    let urlString = `&minCalories=${minCals}&maxCalories=${maxCals}&minProtein=${minProt}&maxProtein=${maxProt}
    &minCarbs=${minCarbz}&maxCarbs=${maxCarbz}&minFat=${minFats}&maxFat=${maxFats}&number=${maxResults}`;
    const url = searchUrl + urlString;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then((responseJson) => {
            console.log(responseJson[1])
            $('#results').html(`<h1>Holy Macro!</h1><ul class="macroNutrients"></ul>`);
            for (let i = 0; i < responseJson.length; i++) {
                console.log(responseJson[i].image)
                $('.macroNutrients').append(`<li data-recipe-id="${responseJson[i].id}" class="items">
                <h3>${responseJson[i].title}</h3>
                <img src="${responseJson[i].image}" class="recipe-pic" alt="picture of recipe">
                <span>Calories:${responseJson[i].calories}</span>
                <span>Protein:${responseJson[i].protein}</span>
                <span>Carbs:${responseJson[i].carbs}</span>
                <span>Fat:${responseJson[i].fat}</span>
                <button target="blank" class="more">See More Info</button>
                </li>`);
                
            }
        })
        .catch(err => {
            $('#js-error-message').text(`Something went wrong`);
        });
        goBack();
}


function watchMore() {
    $('#results').on('click', '.more', event => {
        let $button = $(event.currentTarget)
        $button.hide();
        let $li = $button.closest('li');
        let recipeIde = $li.data('recipe-id');
        console.log(recipeIde)
        fetch(`https://api.spoonacular.com/recipes/${recipeIde}/information?apiKey=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then((responseJson) => {
            console.log(responseJson);
            console.log(responseJson.vegetarian)
            if(responseJson.vegetarian === true) {
                $li.append(`<div class><i class="fas fa-check"></i>Vegetarian</div>`)
            } else {
                $li.append(`<div><i class="fas fa-times"></i>Vegetarian</div>`)
            };
            if(responseJson.vegan === true) {
                $li.append(`<div><i class="fas fa-check"></i>Vegan</div>`)
            } else {
                $li.append(`<div><i class="fas fa-times"></i>Vegan</div>`)
            };
            if(responseJson.dairyFree === true) {
                $li.append(`<div><i class="fas fa-check"></i>Dairy Free</div>`)
            } else {
                $li.append(`<div><i class="fas fa-times"></i>Dairy Free</div>`)
            };
            if(responseJson.glutenFree === true) {
                $li.append(`<div><i class="fas fa-check"></i>Gluten Free</div>`)
            } else {
                $li.append(`<div><i class="fas fa-times"></i>Gluten Free</div>`)
            };
            
            
            let targetUrl = responseJson.sourceUrl
            $li.append(`<div class='sourcelink'><a href="${responseJson.sourceUrl}" target="_blank" >Go to URL</a></div>`)
            console.log(responseJson.sourceUrl);
            
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
        event.stopPropagation();
        $('#results').empty();
        $('#results').show()
        $('.container').hide();
        getData();
        $('#bottom').html(`<button class="back">Go Back</button>`)
    }) 
}
function goBack() {
    $('#bottom').on ('click', '.back', event => {
        $('.container').show();
        $('#results').hide();
        getData();
        watchForm();
    })
}

$(onPageReady);
