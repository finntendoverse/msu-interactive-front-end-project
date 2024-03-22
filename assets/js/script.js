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
function renderDrinks(data) {
  const loadedInfo = document.getElementById('loadedInfo');
  while (loadedInfo.firstChild) {
    loadedInfo.removeChild(loadedInfo.firstChild);
  }

  if (data && data.drinks && data.drinks.length > 0) {
    data.drinks.forEach(cocktail => {
      const cocktailElement = document.createElement('div');
      const cocktailName = cocktail.strDrink;

      const cocktailNameHeading = document.createElement('h3');
      cocktailNameHeading.textContent = cocktailName;

      const drinkImg = document.createElement('img');
      drinkImg.src = cocktail.strDrinkThumb;

      const favoriteButton = document.createElement('button');
      favoriteButton.textContent = 'Favorite';

      let isFavorited = favorites.some(favorite => favorite.name === cocktailName);
      if (isFavorited) {
        favoriteButton.textContent = 'Favorited';
      }

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
        displayFavorites(); // Render the favorites section after a change in favorites
    });

      cocktailElement.appendChild(cocktailNameHeading);
      cocktailElement.appendChild(drinkImg);
      cocktailElement.appendChild(favoriteButton);

      loadedInfo.appendChild(cocktailElement);
    });
  } else {
    loadedInfo.textContent = 'No cocktails found';
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
  displayFavorites();                                          // THEN the favorites are rendered onto the page
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
        if (key.startsWith('strIngredient') && value) {
          const ingredientNumber = key.slice('strIngredient'.length);
          const measurement = randomCocktail[`strMeasure${ingredientNumber}`];
          cocktailDetailsElement.innerHTML += `<li>${value} - ${measurement}</li>`;
        }}
       
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
  console.log(favorites)
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