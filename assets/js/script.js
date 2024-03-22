const loadedInfo = document.querySelector('#loadedInfo');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
// function to render the drinks on the page and handle their favorite button functionality
function renderDrinks(data) {                                                                 // WHEN the renderDrinks function is called
  while (loadedInfo.firstChild) {                                                             // WHILE the loaded info section contains children
    loadedInfo.removeChild(loadedInfo.firstChild);                                            // THEN each child will be removed
  }

  for (i=0; i < data.drinks.length; i++) {                                                    // FOR each item in the drinks array
    const cocktailElement = document.createElement('div');                                    // THEN a cocktailElement div will be created
    
    const cocktailName = document.createElement('h3');                                        // THEN a h3 tag will be created
    cocktailName.innerHTML = data.drinks[i].strDrink;                                         // THEN the text within the h3 element will become the name of the drink
    cocktailElement.appendChild(cocktailName);                                                // THEN the h3 tag will be appended to the cocktailElement div

    let drinkImg = document.createElement('img');                                             // THEN an img tag will be created
    drinkImg.setAttribute('src', data.drinks[i].strDrinkThumb);                               // THEN the image will become an image of the drink
    cocktailElement.appendChild(drinkImg);                                                    // THEN the img tag will be appended to the cocktailElement div

    const favoriteButton = document.createElement('button');                                  // THEN a button element is created
    favoriteButton.textContent = 'Favorite';                                                  // THEN the text content of the button becomes "favorite"
    const isFavorited = favorites.some(favorite => favorite === cocktailName.innerHTML);      // THEN all the favorited drinks are checked
    if (isFavorited) {                                                                        // IF the drink is already favorited
      favoriteButton.textContent = 'Favorited';                                               // THEN the text reads "favorited" instead of "favorite"
    }
    cocktailElement.appendChild(favoriteButton);                                              // THEN the button is appended to the cocktailElement div

    favoriteButton.addEventListener('click', function() {                                     // WHEN the favorite button is clicked
      const isFavorited = favorites.some(favorite => favorite === cocktailName.innerHTML);    // THEN all the favorited drinks are checked
      if (!isFavorited) {                                                                     // IF the drink is not favorited
          favorites.push(cocktailName.innerHTML);                                             // THEN the drink name is added to the favorites array
          localStorage.setItem('favorites', JSON.stringify(favorites));                       // THEN the favorites array is saved to local storage
          favoriteButton.textContent = 'Favorited';                                           // THEN the text of the favorites button is changed to say "favorited" instead of "favorite"
          
        } else {                                                                              // IF the drink is favorited
          favorites = favorites.filter(favorite => favorite !== cocktailName.innerHTML);      // THEN the drink name is removed from the favorites array
          localStorage.setItem('favorites', JSON.stringify(favorites));                       // THEN the favorites array is saved to local storage
          favoriteButton.textContent = 'Favorite';                                            // THEN the text of the favorites button is changed to say "favorite" instead of "favorited"
      }
      renderFavorites();                                                                      // THEN the favorited drinks are rendered onto the page
    });
    loadedInfo.appendChild(cocktailElement);                                                  // THEN the cocktailElement div is appended to theloadedInfo section
  }
}

// function to render the favorites section onto the page
function renderFavorites() {                                                          // WHEN the renderFavorites function is called
  let favoriteDrinksSection = document.querySelector("#favoriteDrinks");              // THEN the favorite drinks section is referenced
  while (favoriteDrinksSection.firstChild) {                                          // WHILE the favorites section has children
    favoriteDrinksSection.removeChild(favoriteDrinksSection.firstChild);              // THEN each child will be removed
  }
  if (favorites) {                                                                    // IF there are favorites saved in the local storage
    for (let i = 0; i < favorites.length; i++) {                                      // FOR each element in the favorites array
      let favoriteDrink = document.createElement('p');                                // THEN a p element will be created
      favoriteDrink.innerHTML = favorites[i];                                         // THEN the text of the p tag will become the drink name
      favoriteDrinksSection.appendChild(favoriteDrink);                               // THEN the p tag is appended to the favoriteDrinks section
    
      favoriteDrink.addEventListener('click', function() {                            // WHEN any p tag is clicked
        displayDrinkDetails(favorites[i]);                                            // THEN the details of the clicked favorite drink are displayed
      });
    }
  }
}

function displayDrinkDetails(drinkName) {
  // Fetch details of the clicked drink by its name
  let apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const drink = data.drinks[0];
      if (drink) {
    
        const modal = document.getElementById("myModal");
        const cocktailNameElement = document.querySelector('#cocktail-name');
        const cocktailImageElement = document.querySelector('#cocktail-image');
        if (cocktailNameElement && cocktailImageElement) {
          cocktailNameElement.textContent = drink.strDrink;
          cocktailImageElement.src = drink.strDrinkThumb;
          modal.style.display = "block"; // Show the modal
        }
      } else {
        console.error('Drink details not found.');
      }
    })
    .catch(error => {
      console.error('Error fetching drink details:', error);
    });
}

// displays drinks to the page when a drink name or ingredient is searched
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', function() {
    const searchQuery = document.getElementById('searchBar').value;
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
       renderDrinks(data);
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
      renderDrinks(data);
    })
    .catch(error => {
      console.error('Error fetching cocktail data:', error);
    });
})

// displays drinks with gin to the page when the "gin" button is clicked
let ginButton = document.querySelector('#gin');
ginButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    .then(response => response.json())
    .then(data => {
      renderDrinks(data);
    })
    .catch(error => {
      console.error('Error fetching cocktail data:', error);
    });
})

// displays drinks with whiskey to the page when the "whiskey" button is clicked
let whiskeyButton = document.querySelector('#whiskey');
whiskeyButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey')
    .then(response => response.json())
    .then(data => {
      renderDrinks(data);
    })
    .catch(error => {
      console.error('Error fetching cocktail data:', error);
    });
})
  
// displays drinks with bourbon to the page when the "bourbon" button is clicked
let bourbonButton = document.querySelector('#bourbon');
bourbonButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon')
    .then(response => response.json())
    .then(data => {
      renderDrinks(data);
    })
    .catch(error => {
      console.error('Error fetching cocktail data:', error);
    });
})

// displays drinks with tequila to the page when the "tequila" button is clicked
let tequilaButton = document.querySelector('#tequila');
tequilaButton.addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila')
    .then(response => response.json())
    .then(data => {
      renderDrinks(data);
    })
    .catch(error => {
      console.error('Error fetching cocktail data:', error);
    });
})

// displays the saved favorites when the page is loaded
document.addEventListener('DOMContentLoaded', function() {    // WHEN the page is loaded
  renderFavorites();                                          // THEN the favorites are rendered onto the page
});


const randomButton = document.querySelector('#randomBtn');

function getRandomCocktail(){
  
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      const randomCocktail = data.drinks[0];
      console.log(randomCocktail);
      const cocktailNameElement = document.querySelector('#cocktail-name');
      if (cocktailNameElement) {
        cocktailNameElement.textContent = randomCocktail.strDrink; 
      }
      
    })
    .catch(error => {
      console.error('Error fetching cocktail data:', error);
    });

}


const modal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close")[0];

function getRandomCocktail() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      const randomCocktail = data.drinks[0];
      const cocktailNameElement = document.querySelector('#cocktail-name');
      const cocktailDetailsElement = document.querySelector('#cocktail-details');
      const cocktailImageElement = document.querySelector('#cocktail-image');
      
      if (randomCocktail && cocktailNameElement && cocktailImageElement && cocktailDetailsElement) {
        cocktailNameElement.textContent = randomCocktail.strDrink;
        cocktailImageElement.src = randomCocktail.strDrinkThumb;
        cocktailImageElement.innerHTML = '';
        cocktailDetailsElement.innerHTML = '';
        
        for (const [key, value] of Object.entries(randomCocktail)) {
          if (key.includes('strIngredient') && value) {
            cocktailDetailsElement.innerHTML += `<li>${value}</li>`;
          }
        }
        
        modal.style.display = "block";
      }
    })
    .catch(error => {
      console.error('Error fetching cocktail data:', error);
    });
}


closeModal.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

randomButton.addEventListener('click', getRandomCocktail);