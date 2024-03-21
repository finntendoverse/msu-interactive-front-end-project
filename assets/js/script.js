const apiUrl1 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
const apiUrl2 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const apiUrl3 = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const apiUrl4 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
const loadedInfo = document.querySelector('#loadedInfo');
const favoriteModalButton = document.querySelector('#favoriteBtn');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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



Promise.all([fetchCocktails(apiUrl1), fetchCocktails(apiUrl2), fetchCocktails(apiUrl3)])
  .then(([ordinaryDrinks, cocktails, randomDrink]) => {
    console.log('Ordinary Drinks:', ordinaryDrinks);
    console.log('Cocktails:', cocktails);
    console.log('Random', randomDrink)
  });
  
// function to render the drinks on the page and handle their favorite button functionality
function renderDrinks(data) {                                                                 // WHEN the renderDrinks function is called
  while (loadedInfo.firstChild) {                                                             // WHILE the loaded info section contains children
    loadedInfo.removeChild(loadedInfo.firstChild);                                            // THEN each child will be removed
  }

  for (i=0; i < data.drinks.length; i++) {                                                    // FOR each item in the drinks array
    const cocktailElement = document.createElement('div');                                    // THEN a cocktailElement div will be created
    const currentDrink = data.drinks[i];
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
      const isFavorited = favorites.some(favorite => favorite.name === cocktailName.innerHTML);    // THEN all the favorited drinks are checked
      if (!isFavorited) {                                                                     // IF the drink is not favorited
          favorites.push({
            name: currentDrink.strDrink ,
            imageSrc: currentDrink.strDrinkThumb

          });                                             // THEN the drink name is added to the favorites array
          localStorage.setItem('favorites', JSON.stringify(favorites));                       // THEN the favorites array is saved to local storage
          favoriteButton.textContent = 'Favorited';                                           // THEN the text of the favorites button is changed to say "favorited" instead of "favorite"
          displayFavorites()
        } else {                                                                              // IF the drink is favorited
          favorites = favorites.filter(favorite => favorite !== cocktailName.innerHTML);      // THEN the drink name is removed from the favorites array
          localStorage.setItem('favorites', JSON.stringify(favorites));                       // THEN the favorites array is saved to local storage
          favoriteButton.textContent = 'Favorite'; 
          displayFavorites()                                           // THEN the text of the favorites button is changed to say "favorite" instead of "favorited"
      }
      
      renderDrinks();
                                                                           // THEN the favorited drinks are rendered onto the page
    });
    
     
    loadedInfo.appendChild(cocktailElement);                                                  // THEN the cocktailElement div is appended to theloadedInfo section
  }
}


// function to render the favorites section onto the page
function renderFavorites() {
  
  let favoriteDrinksSection = document.querySelector("#favoriteDrinks");
  while (favoriteDrinksSection.firstChild) {
    favoriteDrinksSection.removeChild(favoriteDrinksSection.firstChild);
  }
  if (favorites) {
    for (let i = 0; i < favorites.length; i++) {
      let favoriteDrink = document.createElement('p');
      favoriteDrink.innerHTML = favorites[i];
      favoriteDrink.addEventListener('click', function() {
        // Call a function to display details of the clicked favorite drink
        displayDrinkDetails(favorites[i]);
      });
      favoriteDrinksSection.appendChild(favoriteDrink);
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
              const loadedInfo = document.getElementById('loadedInfo');
              loadedInfo.innerHTML = ''; // Clear previous content

              // Create elements to display drink details
              const cocktailNameElement = document.createElement('h3');
              cocktailNameElement.textContent = drink.strDrink;

              const cocktailImageElement = document.createElement('img');
              cocktailImageElement.src = drink.strDrinkThumb;
              cocktailImageElement.alt = drink.strDrink;

              const ingredientsList = document.createElement('ul');
              // Loop through the ingredients and add them to the list
              for (let i = 1; i <= 15; i++) { // Assuming there are maximum 15 ingredients
                  const ingredient = drink[`strIngredient${i}`];
                  const measure = drink[`strMeasure${i}`];
                  if (ingredient) {
                      const listItem = document.createElement('li');
                      listItem.textContent = `${ingredient} - ${measure}`;
                      ingredientsList.appendChild(listItem);
                  } else {
                      break; // No more ingredients
                  }
              }

              // Append elements to loaded-info section
              loadedInfo.appendChild(cocktailNameElement);
              loadedInfo.appendChild(cocktailImageElement);
              loadedInfo.appendChild(ingredientsList);
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
            cocktailDetailsElement.innerHTML += `<p>${value}</p>`;
          }
        }

       
        
        modal.style.display = "block";
       
        favoriteButton.onclick = function() {
          toggleFavorite(randomCocktail);
      };
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

document.getElementById('favoriteBtn').addEventListener('click', function() {
  const cocktailName = document.getElementById('cocktail-name').innerText;
  const cocktailImageSrc = document.getElementById('cocktail-image').src;
  
  const favoriteCocktail = {
    name: cocktailName,
    imageSrc: cocktailImageSrc
  };

  saveFavoriteCocktail(favoriteCocktail);
  displayFavorites();
});

function saveFavoriteCocktail(cocktail) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.some(fav => fav.name === cocktail.name)) {
    favorites.push(cocktail);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesContainer = document.getElementById('favoriteDrinks'); 
  
  favoritesContainer.innerHTML = ''; 

  favorites.forEach(cocktail => {
    const div = document.createElement('div');
    div.classList.add('favorite-drink');
    div.innerHTML = `<h3>${cocktail.name}</h3><img src="${cocktail.imageSrc}" alt="${cocktail.name}" style="width: 100px; height: 100px;">`;
    favoritesContainer.appendChild(div);

    
   
  });
  
 
}

document.addEventListener('DOMContentLoaded', function() {
  const favoriteDrinksSection = document.getElementById('favoriteDrinks');

  // Add event listener to each favorite drink element
  favoriteDrinksSection.addEventListener('click', function(event) {
      const clickedDrink = event.target.textContent;
      displayDrinkDetails(clickedDrink);
  });
});
 
document.addEventListener('DOMContentLoaded', displayFavorites);