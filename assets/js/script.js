// favorites variable
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// displays the saved favorites when the page is loaded
document.addEventListener('DOMContentLoaded', function() {    // WHEN the page is loaded
  renderFavorites();                                          // THEN the favorites are rendered onto the page
});
  
// function to render the drinks on the page and handle their favorite button functionality
function renderDrinks(data) {                                                                 // WHEN the renderDrinks function is called
  const loadedInfo = document.querySelector('#loadedInfo');                                   // THEN the loadedInfo section is referenced
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
function makeModal(data) {
    const modal = document.getElementById("myModal");
    const closeModal = document.getElementsByClassName("close")[0];
    const randomCocktail = data.drinks[0];
    const cocktailNameElement = document.querySelector('#cocktail-name');
    const cocktailDetailsElement = document.querySelector('#cocktail-details');
    const cocktailImageElement = document.querySelector('#cocktail-image');
    let cocktailFavoriteButton = document.querySelector('#favorite-button');
    
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

    // let isFavorited = favorites.some(favorite => favorite.name === cocktailNameElement);
    // if (isFavorited) {
    //   cocktailFavoriteButton.textContent = 'Favorited';
    // }

    // cocktailFavoriteButton.addEventListener('click', () => {
    //   debugger;
    //   if (!isFavorited) {
    //       favorites.push(cocktailNameElement);
    //       localStorage.setItem('favorites', JSON.stringify(favorites));
    //       cocktailFavoriteButton.textContent = 'Favorited';
    //       isFavorited = true;  // Update the status to favorited
          
    //   } else {
    //       favorites = favorites.filter(favorite => favorite.name !== cocktailNameElement);
    //       localStorage.setItem('favorites', JSON.stringify(favorites));
    //       favoriteButton.textContent = 'Favorite';
    //       isFavorited = false; // Update the status to not favorited
          
    //   }
    // })

    // let isFavorited = favorites.some(favorite => favorite === cocktailNameElement.textContent);
    // if (!isFavorited) { 
    //   cocktailFavoriteButton.innerHTML = "favorite";
    // } else {
    //   cocktailFavoriteButton.innerHTML = "unfavorite";
    // }
    
    cocktailFavoriteButton.addEventListener('click', function() {
      event.preventDefault();
      let isFavorited = favorites.some(favorite => favorite === cocktailNameElement.textContent);
      if (!isFavorited) {                                                                     // IF the drink is not favorited
          favorites.push(cocktailNameElement.textContent);                                             // THEN the drink name is added to the favorites array
          localStorage.setItem('favorites', JSON.stringify(favorites));                       // THEN the favorites array is saved to local storage
          cocktailFavoriteButton.textContent = 'Unfavorite'; 
          isFavorited = true;  // Update the status to favorited
        } else {                                                                              // IF the drink is favorited
          favorites = favorites.filter(favorite => favorite !== cocktailNameElement.textContent);      // THEN the drink name is removed from the favorites array
          localStorage.setItem('favorites', JSON.stringify(favorites));                       // THEN the favorites array is saved to local storage
          cocktailFavoriteButton.textContent = 'Favorite';                                            // THEN the text of the favorites button is changed to say "favorite" instead of "favorited"
          isFavorited = false; // Update the status to not favorited
        }
        renderFavorites();
    })

    closeModal.onclick = function() {
      modal.style.display = "none";
    }
}


// function displayFavorites() {
//   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//   const favoritesContainer = document.getElementById('favoriteDrinks'); 
//   favoritesContainer.innerHTML = ''; 

//   favorites.forEach(cocktail => {
//     const div = document.createElement('div');
//     div.classList.add('favorite-drink');
//     div.innerHTML = `<h3>${cocktail.name}</h3><img src="${cocktail.imageSrc}" alt="${cocktail.name}" style="width: 100px; height: 100px;">`;
    
//     const unfavoriteButton = document.createElement('button');
//     unfavoriteButton.textContent = 'Unfavorite';
//     unfavoriteButton.addEventListener('click', () => {
//       removeFavorite(cocktail.name);
//     });
    
//     div.appendChild(unfavoriteButton);
//     favoritesContainer.appendChild(div);
//   });
// }

// displays drinks to the page when a drink name is searched
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function() {                                   // WHEN the search button is clicked
  const searchQuery = document.getElementById('searchBar').value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`)    // THEN the search is fetched in the drink name API
    .then(response => response.json())
    .then(data => {                                                                   // IF the fetch is successful
      renderDrinks(data);                                                             // THEN the drinks are rendered onto the page
    })
    .catch(error => {                                                                 // IF the fetch is unsuccessful
      console.error('Error fetching cocktail data:', error);                          // THEN an error is displayed in the console
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

