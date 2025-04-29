const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContain = document.querySelector('.recipe-details-contain'); // Corrected class name
const closeBtn = document.querySelector('.recipe-close-btn');
const recipeDetails = document.querySelector('.recipe-details');

const fetchRecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        console.log("Fetching recipes...");
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        console.log("Response received:", response);

        if (!response.meals) {
            recipecontainer.innerHTML = "<h2>No recipes found. Please try another search.</h2>";
            return;
        }

        recipecontainer.innerHTML = ""; // Clear previous results
        response.meals.forEach((meal) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `;
            const button = document.createElement('button');
            button.innerText = "View Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });
            recipecontainer.appendChild(recipeDiv);
        });
    } catch (error) {
        console.error("Error occurred:", error);
        recipecontainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
    }
};

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 28; i++) {
        const Ingredients = meal[`strIngredient${i}`];
        if (Ingredients) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${Ingredients}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};

const openRecipePopup = (meal) => {
    recipeDetailsContain.innerHTML = `
        <h2 class='recipeName'>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeinstruction">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
    recipeDetailsContain.parentElement.style.display = "block";
};

closeBtn.addEventListener('click', () => {
    recipeDetailsContain.parentElement.style.display = "none";
});

searchBtn.addEventListener('click',(e)=>{
    //e.preventDefault(); is for preventing the auto submit of the form
    const searchinput = searchBox.value.trim();
    e.preventDefault();
    if(!searchinput){
        recipecontainer.innerHTML = "<h2>Please Enter a Valid Input</h2>";
        return;
    }
    fetchRecipes(searchinput);
})
