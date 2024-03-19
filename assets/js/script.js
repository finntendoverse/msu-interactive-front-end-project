const apiUrl1 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
const apiUrl2 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const apiUrl3 = 'https:www.thecocktaildb.com/api/json/v1/1/random.php';
const apiUrl4 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
const randomButton = document.querySelector('#randomBtn');

function fetchCocktails() {
 
  fetch(apiUrl1)
    .then(response => response.json())
    .then(data => {
      const cocktails1 = data.drinks;
    
      console.log('Cocktails from apiUrl1:', cocktails1);
    })
    .catch(error => {
      console.error('Error fetching cocktail data from apiUrl1:', error);
    });

  fetch(apiUrl2)
    .then(response => response.json())
    .then(data => {
      const cocktails2 = data.drinks;
     
      console.log('Cocktails from apiUrl2:', cocktails2);
    })
    .catch(error => {
      console.error('Error fetching cocktail data from apiUrl2:', error);
    });

    const apiUrl4 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
  fetch(apiUrl4)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.drinks;

      console.log('Cocktails from originalApiUrl:', cocktails);
    })
    .catch(error => {
      console.error('Error fetching cocktail data from originalApiUrl:', error);
    });
}
function displayCocktails(cocktails) {
  const loadedInfo = document.getElementById('loadedInfo');
  loadedInfo.innerHTML = ''; // Clear previous content
  if (cocktails && cocktails.length > 0) {
    cocktails.forEach(cocktail => {
      const cocktailName = cocktail.strDrink;
      const cocktailElement = document.createElement('p');
      cocktailElement.textContent = cocktailName;
      loadedInfo.appendChild(cocktailElement);
    });
  } else {
    loadedInfo.textContent = 'No cocktails found';
  }
}

document.addEventListener('DOMContentLoaded', function() {

  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', function() {
   
    const searchQuery = document.getElementById('searchBar').value;
   
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    
    fetchCocktails(apiUrl);
  });

  
  function fetchCocktails(apiUrl) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const cocktails = data.drinks;
        console.log('Cocktails:', cocktails);
        
      })
      .catch(error => {
        console.error('Error fetching cocktail data:', error);
      });
  }
});

fetchCocktails();

function getRandonCocktail() {
  fetch(Random_API_URL)
    .then(response => response.json)

}

Promise.all([fetchCocktails(apiUrl1), fetchCocktails(apiUrl2), fetchCocktails(apiUrl3)])
  .then(([ordinaryDrinks, cocktails, randomDrink]) => {
    console.log('Ordinary Drinks:', ordinaryDrinks);
    console.log('Cocktails:', cocktails);
    console.log('Random', randomDrink)
  });

  