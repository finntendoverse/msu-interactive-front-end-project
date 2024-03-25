// favorites variable
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// displays the saved favorites when the page is loaded
document.addEventListener('DOMContentLoaded', function() {    // WHEN the page is loaded
  renderFavorites();                                          // THEN the favorites are rendered onto the page
});
  
// function to render the drinks on the page and handle their favorite button functionality
function renderDrinks(data) {  
                                                                                              // WHEN the renderDrinks function is called
  let loadedInfo = document.querySelector('#loadedInfo');                                     // THEN the loadedInfo section is referenced
  while (loadedInfo.firstChild) {                                                             // WHILE the loaded info section contains children
    loadedInfo.removeChild(loadedInfo.firstChild);                                            // THEN each child will be removed
  }

  for (i=0; i < data.drinks.length; i++) {                                                    // FOR each item in the drinks array
    let cocktailElement = document.createElement('div');                                      // THEN a cocktailElement div will be created
    
    let cocktailName = document.createElement('h3');                                          // THEN a h3 tag will be created
    cocktailName.innerHTML = data.drinks[i].strDrink;                                         // THEN the text within the h3 element will become the name of the drink
    cocktailElement.appendChild(cocktailName);                                                // THEN the h3 tag will be appended to the cocktailElement div

    let drinkImg = document.createElement('img');                                             // THEN an img tag will be created
    drinkImg.setAttribute('src', data.drinks[i].strDrinkThumb);                               // THEN the image will become an image of the drink
    cocktailElement.appendChild(drinkImg);                                                    // THEN the img tag will be appended to the cocktailElement div

    let favoriteButton = document.createElement('button');                                    // THEN a button element is created
    favoriteButton.textContent = 'Favorite';                                                  // THEN the text content of the button becomes "favorite"
    let isFavorited = favorites.some(favorite => favorite === cocktailName.innerHTML);        // THEN all the favorited drinks are checked
    if (isFavorited) {                                                                        // IF the drink is already favorited
      favoriteButton.textContent = 'Favorited';                                               // THEN the text reads "favorited" instead of "favorite"
    }}
    cocktailElement.appendChild(favoriteButton);                                              // THEN the button is appended to the cocktailElement div

    favoriteButton.addEventListener('click', function(button) {                               // WHEN the favorite button is clicked
      let isFavorited = favorites.some(favorite => favorite === cocktailName.innerHTML);      // THEN all the favorited drinks are checked
      if (!isFavorited || button.innerHTML === 'favorite') {                                  // IF the drink is not favorited
          favorites.push(cocktailName.innerHTML);                                             // THEN the drink name is added to the favorites array
          localStorage.setItem('favorites', JSON.stringify(favorites));                       // THEN the favorites array is saved to local storage
          favoriteButton.textContent = 'Favorited';                                           // THEN the text of the favorites button is changed to say "favorited" instead of "favorite"
          
        } else {                                                                              // IF the drink is favorited
          favorites = favorites.filter(favorite => favorite !== cocktailName.innerHTML);      // THEN the drink name is removed from the favorites array
          localStorage.setItem('favorites', JSON.stringify(favorites));                       // THEN the favorites array is saved to local storage
          favoriteButton.textContent = 'Favorite';                                            // THEN the text of the favorites button is changed to say "favorite" instead of "favorited"
        }});

      favoriteButton.addEventListener('click', () => {
        if (!isFavorited) {
            favorites.push({
                name: cocktailName,
                imageSrc: cocktail.strDrinkThumb
            });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            favoriteButton.textContent = 'Favorited';
            isFavorited = true;  // Update the status to favorited
            
        } else {
            favorites = favorites.filter(favorite => favorite.name !== cocktailName);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            favoriteButton.textContent = 'Favorite';
            isFavorited = false; // Update the status to not favorited
            
        }
        renderFavorites(); // Render the favorites section after a change in favorites
    });
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

// function to display the drink details for the favorite drinks
function displayDrinkDetails(drinkName) {                                                   // WHEN the displayDrinkDetails function is called
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)            // THEN the drink name is searched in the API
    .then(response => response.json())
    .then(data => {                                                                         // IF the fetch is successful
       makeModal(data);                                                                     // THEN a modal is displayed 
    })
    .catch(error => {                                                                       // IF the fetch is unsuccessful
      console.error('Error fetching drink details:', error);                                // THEN an error is displayed in the console
    });
}

// function to handle modal functionality
function makeModal(data) {                                                                  // WHEN the makeModal function is called
  let modal = document.getElementById("myModal");                                           // THEN the modal element is referenced
  let closeModal = document.getElementsByClassName("close")[0];                             // THEN the closeModal button is referenced
  let drink = data.drinks[0];                                                               // THEN the drink is stored in a variable
  let cocktailName = document.querySelector('#cocktail-name');                              // THEN the cocktailName element is stored in a variable
  let cocktailDetails = document.querySelector('#cocktail-details');                        // THEN the cocktailDetails element is stored in a variable
  let cocktailImg = document.querySelector('#cocktail-image');                              // THEN the cocktailImg element is stored in a variable
  let favoriteButton = document.querySelector('#favoriteBtn');                              // THEN the favorite button is referenced

  cocktailName.textContent = drink.strDrink;                                                // THEN the name becomes the drink's name
  cocktailImg.src = drink.strDrinkThumb;                                                    // THEN the image becomes the drink's image
  cocktailDetails.innerHTML = '';                                                           // THEN the former ingredients are removed

  for (let [key, value] of Object.entries(drink)) {                                         // FOR the drink object array of its key-value pairs
    if (key.includes('strIngredient') && value) {                                           // IF the key includes the strIngredient
      cocktailDetails.innerHTML += `<li>${value}</li>`;                                     // THEN the ingredients are added as a list
    }
  }

  modal.style.display = "block";                                                            // THEN the modal is displayed on the page

  favoriteButton.textContent = 'favorite'
  
  let isFavorited = favorites.some(favorite => favorite === cocktailName.innerHTML);        // THEN the favorites are checked
  if (isFavorited) {                                                                        // IF the drink is already favorited
    favoriteButton.textContent = 'Favorited';                                               // THEN the button text will be changed to "favorited"
  }

  function handleFavoritesEvent(event) {                                                    // THEN the handleFavoritesEvent function is stored in a variable                                          
    handleFavorites(event, cocktailName, favoriteButton);                                   // THEN the handleFunctionsEvent runs the handleFavorites function
  }

  favoriteButton.addEventListener('click', handleFavoritesEvent);                           // THEN the event listener for the favorite button will be added to the modal

  closeModal.onclick = function() {                                                         // WHEN the modal is closed
    favoriteButton.removeEventListener('click', handleFavoritesEvent);                      // THEN the event listener for the favorite button will be removed from the modal
    modal.style.display = "none";                                                           // THEN the modal is removed from the page
    let loadedDrinkButtons = document.querySelectorAll('#loadedInfo button');               // THEN the drink buttons loaded on the page are selected
    loadedDrinkButtons.forEach(function(button) {                                           // FOR EACH of the loaded buttons on the page
      let h3Element = button.closest('div').querySelector('h3');                            // THEN the nearest h3 element (the drink's name) is referenced
      if (h3Element.textContent === cocktailName.textContent) {                             //IF the nearest h3 element text matches the modal's cocktail name
        let isFavorited = favorites.some(favorite => favorite === cocktailName.textContent);// THEN the favorites are referenced
        if (isFavorited) {                                                                  // IF the drink is favorited
          button.textContent = 'Favorited';                                                 // THEN the drink's button will say "unfavorite"
        } else {                                                                            // IF the drink is not favorited
          button.textContent = 'Favorite';                                                  // THEN the drink's button will say "favorite"
        }
      }
    });
  }
}

// function to handle the button functionality within the modals
function handleFavorites(event, cocktailName, favoriteButton) {                             // WHEN the handleFavorites function is called
  event.preventDefault();                                                                   // THEN the page does not refresh
  
  let isFavorited = favorites.some(favorite => favorite === cocktailName.innerHTML);        // THEN the favorites are referenced
  if (!isFavorited) {                                                                       // IF the drink is not favorited
    favorites.push(cocktailName.innerHTML);                                                 // THEN it is added to the favorites array
    localStorage.setItem('favorites', JSON.stringify(favorites));                           // THEN the favorites are updated in local storage
    favoriteButton.textContent = 'Favorited';                                               // THEN the button text is changed to "favorited"
    isFavorited = true;                                                                     // THEN the status is set to favorited
  } else {                                                                                  // IF the drink is favorited
    favorites = favorites.filter(favorite => favorite !== cocktailName.innerHTML);          // THEN it is removed from the favorites array
    localStorage.setItem('favorites', JSON.stringify(favorites));                           // THEN the favorites are updated in local storage
    favoriteButton.textContent = 'Favorite';                                                // THEN the button text is changed to "favorite"
    isFavorited = false;                                                                    // THEN the status is set to not favorited
  }
  
  renderFavorites();                                                                        // THEN the favorites are rendered to the page
}

// displays drinks to the page when a drink name is searched
let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function() {                                   // WHEN the search button is clicked
  let searchQuery = document.getElementById('searchBar').value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`)    // THEN the search is fetched in the drink name API
    .then(response => response.json())
    .then(data => {                                                                   // IF the fetch is successful
      renderDrinks(data);                                                             // THEN the drinks are rendered onto the page
    })
    .catch(error => {                                                                 // IF the fetch is unsuccessful
      console.error('Error fetching cocktail data:', error);                          // THEN an error is displayed in the console
    });
});

// displays random drink in a modal when the "I'm feeling adventurous button is clicked
const randomButton = document.querySelector('#randomBtn');
randomButton.addEventListener('click', function() {                       // WHEN the "I'm feeling adventurous" button is clicked
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')         // The random API is fetched
  .then(res => res.json())
  .then(data => {                                                         // IF the fetch is successful
    makeModal(data)                                                       // THEN a modal with the drink details is shown
  })
  .catch(error => {                                                       // IF the fetch is unsuccessful
    console.error('Error fetching cocktail data:', error);                // THEN an error is displayed in the console
  });
});

// displays drinks with vodka to the page when the "vodka" button is clicked
const vodkaButton = document.querySelector('#vodka');
vodkaButton.addEventListener('click', function() {                            // WHEN the "vodka" text is clicked
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')     // THEN the ingredient is searched in the API
    .then(response => response.json())
    .then(data => {                                                           // IF the fetch is successful
      renderDrinks(data);                                                     // THEN the drinks are rendered onto the page
    })
    .catch(error => {                                                         // IF the fetch is unsuccessful
      console.error('Error fetching cocktail data:', error);                  // THEN an error is displayed in the console
    });
})

// displays drinks with gin to the page when the "gin" button is clicked
const ginButton = document.querySelector('#gin');
ginButton.addEventListener('click', function() {                              // WHEN the "gin" text is clicked
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')       // THEN the ingredient is searched in the API
    .then(response => response.json())
    .then(data => {
      renderDrinks(data);                                                     // THEN the drinks are rendered onto the page
    })
    .catch(error => {                                                         // IF the fetch is unsuccessful
      console.error('Error fetching cocktail data:', error);                  // THEN an error is displayed in the console
    });
})

// displays drinks with whiskey to the page when the "whiskey" button is clicked
const whiskeyButton = document.querySelector('#whiskey');
whiskeyButton.addEventListener('click', function() {                          // WHEN the "gin" text is clicked
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey')   // THEN the ingredient is searched in the API
    .then(response => response.json())
    .then(data => {
      renderDrinks(data);                                                     // THEN the drinks are rendered onto the page
    })
    .catch(error => {                                                         // IF the fetch is unsuccessful
      console.error('Error fetching cocktail data:', error);                  // THEN an error is displayed in the console
    });
})
  
// displays drinks with bourbon to the page when the "bourbon" button is clicked
const bourbonButton = document.querySelector('#bourbon');
bourbonButton.addEventListener('click', function() {                          // WHEN the "bourbon" text is clicked
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon')   // THEN the ingredient is searched in the API
    .then(response => response.json())
    .then(data => {
      renderDrinks(data);                                                     // THEN the drinks are rendered onto the page
    })
    .catch(error => {                                                         // IF the fetch is unsuccessful
      console.error('Error fetching cocktail data:', error);                  // THEN an error is displayed in the console
    });
})

// displays drinks with tequila to the page when the "tequila" button is clicked
const tequilaButton = document.querySelector('#tequila');
tequilaButton.addEventListener('click', function() {                          // WHEN the "bourbon" text is clicked
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila')   // THEN the ingredient is searched in the API
    .then(response => response.json())
    .then(data => {                                                           // IF the fetch is successful
      renderDrinks(data);                                                     // THEN the drinks are rendered onto the page
    })
    .catch(error => {                                                         // IF the fetch is unsuccessful
      console.error('Error fetching cocktail data:', error);                  // THEN an error is displayed in the console
    });
})