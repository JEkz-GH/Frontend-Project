// JavaScript for toggling the hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active'); // Toggle active class on hamburger
  navLinks.classList.toggle('active'); // Toggle active class on nav-links
});


// Store all meals globally for filtering
let allMeals = [];
let currentPage = 1;
let perPage = 6; // Default items per page

// Define an asynchronous function to fetch meal data from a JSON file
const fetchMealData = async () => {
    try {
        // Fetch the JSON file containing meal data
        const response = await fetch('meals.json');

        // Parse the JSON response into a JavaScript object
        const data = await response.json();

        // Store the array of meals in the global variable for future filtering
        allMeals = data.meals;

        // Set perPage based on the pagination data from JSON
        perPage = data.pagination.per_page;

        // Initially display meals for the first page and generate pagination controls
        displayMeals(getMealsForPage(currentPage));
        generatePaginationControls(data.pagination.total_pages);
        generateFilterButtons(allMeals);
    } catch (error) {
        // Log the error message to the console
        console.error('Error fetching meal data:', error);
    }
};

// Get meals for the current page
const getMealsForPage = (page) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return allMeals.slice(startIndex, endIndex);
};

// Define a function to display the meal cards on the webpage
const displayMeals = (meals) => {
    const menuList = document.getElementById('menuList');

    // Clear any existing content inside the meal container
    menuList.innerHTML = '';

    if (meals.length === 0) {
        menuList.innerHTML = '<p>No data found</p>';
        return;
    }

    // Loop through each meal object in the `meals` array
    meals.forEach((meal) => {
        // Create a new <div> element for each meal card
        const mealCard = document.createElement('div');

        // Add a CSS class 'card' to the `<div>` for styling purposes
        mealCard.classList.add('card');

        // Add HTML content to the meal card
        mealCard.innerHTML = `
            <img src="${meal.image}" alt="${meal.name} ${meal.category}" width="300">
            <h3>${meal.name}</h3>
            <p>Price: ${meal.price}</p>
            <button>Add to cart</button>
        `;

        // Add click event to store meal data in localStorage and navigate to details page
        mealCard.addEventListener('click', () => {
            localStorage.setItem('selectedMeal', JSON.stringify(meal));
            window.location.href = 'meal-detail.html';
        });

        // Append the meal card to the meal container on the webpage
        menuList.appendChild(mealCard);
    });
};

// Generate pagination controls
const generatePaginationControls = (totalPages) => {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    // Create Previous button
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.disabled = currentPage === 1; // Disable if on the first page
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateMealsAndPagination();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Create page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('page-btn');
        if (i === currentPage) pageButton.classList.add('active');
        pageButton.addEventListener('click', () => {
            currentPage = i;
            updateMealsAndPagination();
        });
        paginationContainer.appendChild(pageButton);
    }

    // Create Next button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.disabled = currentPage === totalPages; // Disable if on the last page
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateMealsAndPagination();
        }
    });
    paginationContainer.appendChild(nextButton);
};

// Update displayed meals and pagination controls
const updateMealsAndPagination = () => {
    displayMeals(getMealsForPage(currentPage));
    generatePaginationControls(Math.ceil(allMeals.length / perPage));
};

// Fetch meal data when the page loads
fetchMealData();





// // store all meals globally for filtering
// let allMeals = []

// // define an asynchronous function to fetch meal data from a json file 
// const fetchMealData = async () => {
//     try{
//         // fetch the json file containing meal data 
//     const response = await fetch('meals.json')

//     // Parse the JSON response into a JavaScript object.
//     const data = await response.json()

//     // store the array of meals in the global variable 
//     // 'allMeals' for future filtering
//     allMeals = data.meals

//     // initially display all meals when the page load 
//     displayMeals(allMeals)

//     generateFilterButtons(allMeals)

//     // handle any errors that occur during the fetch process 
//     }catch(error){
//         // log the error message to the console 
//         console.error('Error fetch meal data:', error)
//     }
    
// }


// // Define a function to display the meal cards on the webpage.
// const displayMeals = (meals) => {
//     const menuList = document.getElementById('menuList')

//     // Clear any existing content inside the meal container.
//     menuList.innerHTML = '';

//     if(meals.length === 0){
//         menuList.innerHTML = "<p>No data found</p>"
//         return;
//     }

//     // Loop through each meal object in the `meals` array.
//     meals.forEach((meal) => {

//         // create a new <div> element for each meal card 
//         const mealCard = document.createElement('div')

//         // Add a CSS class 'card' to the `<div>` for styling purposes.
//         mealCard.classList.add('card')

//         // Add HTML content to the meal card, including 
//         // an image, name, and price of the meal.

//         mealCard.innerHTML = `
//         <img src="${meal.image}" alt="${meal.name} ${meal.category}" width="300" >
//         <h3>${meal.name}</h3>
//         <p>Price: ${meal.price}</p>
//         <button>Add to cart</button>
//         `

//         // add click event to store meal data in localStorage and navigate to details page
//         mealCard.addEventListener('click', () => {
//             localStorage.setItem('selectedMeal', JSON.stringify(meal));
//             window.location.href = 'meal-detail.html'
//         })

//         // Append the meal card to the meal container on the webpage.
//         menuList.appendChild(mealCard)
//     })
// }


// Define a function to dynamically create filter buttons
const generateFilterButtons = (meals) => {
    // Get the HTML element where the filter buttons will be placed
    const filterButtonsContainer = document.getElementById('filterButtons');
    filterButtonsContainer.innerHTML = ''; // Clear any existing buttons

    // Use Set to find unique categories and preferences separately
    const uniqueCategories = [...new Set(meals.map((meal) => meal.category))];
    const uniquePreferences = [...new Set(meals.map((meal) => meal.preference))];

    // Function to create a button
    const createButton = (label, filterFunction) => {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', filterFunction);
        filterButtonsContainer.appendChild(button);
    };

    // Create category filter buttons
    uniqueCategories.forEach((category) => {
        createButton(category, () => filterMealsByCategory(category));
    });

    // Create preference filter buttons
    uniquePreferences.forEach((preference) => {
        createButton(preference, () => filterMealsByPreference(preference));
    });
};

// Function to filter meals by category
const filterMealsByCategory = (category) => {
    const filteredMeals = allMeals.filter((meal) => meal.category === category);
    displayMeals(filteredMeals);
};

// Function to filter meals by preference
const filterMealsByPreference = (preference) => {
    const filteredMeals = allMeals.filter((meal) => meal.preference === preference);
    displayMeals(filteredMeals);
};

// Function to search meals by query
const searchMeals = (query) => {
    const searchedMeals = allMeals.filter(
        (meal) =>
            meal.category.toLowerCase().includes(query.toLowerCase()) ||
            meal.preference.toLowerCase().includes(query.toLowerCase()) ||
            meal.price.toString().toLowerCase().includes(query.toLowerCase())
    );

    displayMeals(searchedMeals);
};

// Add event listener for the search input
document.getElementById('searchInput').addEventListener('input', (event) => {
    searchMeals(event.target.value); // Filter meals on input change
});


// Fetch and display meal data when the page loads
window.onload = fetchMealData


// PEGINATION

