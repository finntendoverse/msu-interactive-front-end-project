const apiUrl1 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
const apiUrl2 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const apiUrl3 = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
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

fetchCocktails();

function getRandonCocktail() {
  fetch(Random_API_URL)
    .then(response => response.json)

}

function fetchCocktails(apiUrl) {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.drinks)
    .catch(error => {
      console.error('Error fetching cocktail data:', error);
      return [];
    });
}

Promise.all([fetchCocktails(apiUrl1), fetchCocktails(apiUrl2), fetchCocktails(apiUrl3)])
  .then(([ordinaryDrinks, cocktails, randomDrink]) => {
    console.log('Ordinary Drinks:', ordinaryDrinks);
    console.log('Cocktails:', cocktails);
    console.log('Random', randomDrink)
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