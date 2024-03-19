const apiUrl1 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
const apiUrl2 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const apiUrl3 = 'https:www.thecocktaildb.com/api/json/v1/1/random.php';
const apiUrl4 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
const randomButton = document.querySelector('#randomBtn');
const loadedInfo = document.querySelector('#loadedInfo');

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
  loadedInfo.innerHTML = ''; 
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

// displays drinks to the page when a drink name or ingredient is searched
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', function() {
    const searchQuery = document.getElementById('searchBar').value;
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const cocktails = data.drinks;
        const loadedInfo = document.getElementById('loadedInfo');
        loadedInfo.innerHTML = ''; 

        if (cocktails && cocktails.length > 0) {
          cocktails.forEach(cocktail => {
            const cocktailName = cocktail.strDrink;
            const cocktailImage = cocktail.strDrinkThumb;

            const cocktailElement = document.createElement('div');
            const cocktailNameElement = document.createElement('p');
            const cocktailImageElement = document.createElement('img');
            const favoriteButton = document.createElement('button');

            cocktailNameElement.textContent = cocktailName;
            cocktailImageElement.src = cocktailImage;
            favoriteButton.textContent = 'Favorite';

            favoriteButton.addEventListener('click', function() {
            
              let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

              const isFavorited = favorites.some(favorite => favorite === cocktailName);
              if (!isFavorited) {
                
                favorites.push(cocktailName);
              
                localStorage.setItem('favorites', JSON.stringify(favorites));
                
                favoriteButton.textContent = 'Favorited';
              } else {
              
                favorites = favorites.filter(favorite => favorite !== cocktailName);
                
                localStorage.setItem('favorites', JSON.stringify(favorites));
                
                favoriteButton.textContent = 'Favorite';
              }
            });

            
            cocktailElement.appendChild(cocktailNameElement);
            cocktailElement.appendChild(cocktailImageElement);
            cocktailElement.appendChild(favoriteButton);
            loadedInfo.appendChild(cocktailElement);
          });
        } else {
          loadedInfo.textContent = 'No cocktails found';
        }
      })
      .catch(error => {
        console.error('Error fetching cocktail data:', error);
      });
  });
});

// displays drinks with vodka to the page when the "vodka" button is clicked
let vodkaButton = document.querySelector('#vodka');
vodkaButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
    .then(response => response.json())
    .then(data => {
      while (loadedInfo.firstChild) {
        loadedInfo.removeChild(loadedInfo.firstChild);
      }

      for (i=0; i < data.drinks.length; i++) {
        let drinkName = document.createElement('h3');
        drinkName.innerHTML = data.drinks[i].strDrink;
        loadedInfo.appendChild(drinkName);

        let drinkImg = document.createElement('img');
        drinkImg.setAttribute('src', data.drinks[i].strDrinkThumb);
        loadedInfo.appendChild(drinkImg);
      }
  })
})

// displays drinks with gin to the page when the "gin" button is clicked
let ginButton = document.querySelector('#gin');
ginButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    .then(response => response.json())
    .then(data => {
      while (loadedInfo.firstChild) {
        loadedInfo.removeChild(loadedInfo.firstChild);
      }

      for (i=0; i < data.drinks.length; i++) {
        let drinkName = document.createElement('h3');
        drinkName.innerHTML = data.drinks[i].strDrink;
        loadedInfo.appendChild(drinkName);

        let drinkImg = document.createElement('img');
        drinkImg.setAttribute('src', data.drinks[i].strDrinkThumb);
        loadedInfo.appendChild(drinkImg);
      }
  })
})

// displays drinks with whiskey to the page when the "whiskey" button is clicked
let whiskeyButton = document.querySelector('#whiskey');
whiskeyButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey')
    .then(response => response.json())
    .then(data => {
      while (loadedInfo.firstChild) {
        loadedInfo.removeChild(loadedInfo.firstChild);
      }

      for (i=0; i < data.drinks.length; i++) {
        let drinkName = document.createElement('h3');
        drinkName.innerHTML = data.drinks[i].strDrink;
        loadedInfo.appendChild(drinkName);

        let drinkImg = document.createElement('img');
        drinkImg.setAttribute('src', data.drinks[i].strDrinkThumb);
        loadedInfo.appendChild(drinkImg);
      }
  })
})
  
// displays drinks with bourbon to the page when the "bourbon" button is clicked
let bourbonButton = document.querySelector('#bourbon');
bourbonButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon')
    .then(response => response.json())
    .then(data => {
      while (loadedInfo.firstChild) {
        loadedInfo.removeChild(loadedInfo.firstChild);
      }

      for (i=0; i < data.drinks.length; i++) {
        let drinkName = document.createElement('h3');
        drinkName.innerHTML = data.drinks[i].strDrink;
        loadedInfo.appendChild(drinkName);

        let drinkImg = document.createElement('img');
        drinkImg.setAttribute('src', data.drinks[i].strDrinkThumb);
        loadedInfo.appendChild(drinkImg);
      }
  })
})

// displays drinks with tequila to the page when the "tequila" button is clicked
let tequilaButton = document.querySelector('#tequila');
tequilaButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila')
    .then(response => response.json())
    .then(data => {
      while (loadedInfo.firstChild) {
        loadedInfo.removeChild(loadedInfo.firstChild);
      }

      for (i=0; i < data.drinks.length; i++) {
        let drinkName = document.createElement('h3');
        drinkName.innerHTML = data.drinks[i].strDrink;
        loadedInfo.appendChild(drinkName);

        let drinkImg = document.createElement('img');
        drinkImg.setAttribute('src', data.drinks[i].strDrinkThumb);
        loadedInfo.appendChild(drinkImg);
      }
  })
})
  