const apiUrl1 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
const apiUrl2 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';

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

  const originalApiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
  fetch(originalApiUrl)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.drinks;

      console.log('Cocktails from originalApiUrl:', cocktails);
    })
    .catch(error => {
      console.error('Error fetching cocktail data from originalApiUrl:', error);
    });
}

fetchCocktails();