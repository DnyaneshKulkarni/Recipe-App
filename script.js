const searchbox=document.querySelector('.searchbox');
const search_button=document.querySelector('.search_button');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');

//Function to get recipes
const fetchRecipes =async (query) =>{
    recipeContainer.innerHTML='<h2>Fetching Recipe...</h2>'
    try {
     const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
     const response = await data.json();

     
recipeContainer.innerHTML='';  //empty the recipe container before adding the image means that "search your favourite recipe will be removed"

     response.meals.forEach(meal => {   //we can use for loop also but foreach is easy here to use
        const recipeDiv = document.createElement('div');  //creating a div
        recipeDiv.classList.add('recipe');   //giving a class name "recipe" to the div 
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}  </h3>
        <p><span> ${meal.strArea} Dish </span></p>
        <p><span> ${meal.strCategory} </span></p>
        `
        const button=document.createElement('button');
        button.textContent="View Recipe" ;
        recipeDiv.appendChild(button);

        //Adding Event listener  to the recipe button 
        button.addEventListener('click',() =>{
         openRecipePopup(meal);
        });
        
        
            recipeContainer.appendChild(recipeDiv);
        
        // console.log(meal);
     });
    } catch (error) {
        recipeContainer.innerHTML='<h2>Error in Fetching Recipes...</h2>'
    }
    //  console.log(responce.meals[0])
}

//function to fetch ingredient and measurement
const fetchIngredients=(meal) =>{
   let ingredientsList="";
   for (let i = 1; i<=20; i++) {
    const ingredient= meal[`strIngredient${i}`];
    if (ingredient) {
        const measure =meal[`strMeasure${i}`];
        ingredientsList+= `<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}
   return ingredientsList;
}


const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML=`
     <h2 class="recipename">${meal.strMeal}</h2>
     <h3>Ingredients:</h3>
     <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
     <div  class="recipeInstruction">
        <h3>Instructions:</h3>
         <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

search_button.addEventListener("click",(e) =>{
    e.preventDefault();    //to prevent refreshing the page 
    const searchInput= searchbox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML= `
        <h2>Type the Meal in the Search Box.</h2>
        `
        return;
    }
     //trim the extra space in the searching
    fetchRecipes(searchInput);
    // console.log("Button Clicked");

});



