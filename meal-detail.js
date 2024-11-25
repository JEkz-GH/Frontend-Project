// Get the selected meal from local storage 
const selectedMeal = JSON.parse(localStorage.getItem('selectedMeal'))

const mealDetailsContainer = document .getElementById('mealDetails')

mealDetailsContainer.innerHTML = `
<img src="${selectedMeal.image}" alt="${selectedMeal.name}" class="meal-image" >
<div class="meal-info">
    <h2>${selectedMeal.name}</h2>
    <h4>${selectedMeal.category}</h4>
    <h5>${selectedMeal.preference}</h5>
    <h3>${selectedMeal.price}</h3>
    <p>Recipe: This meal is carefully prepared by our top chefs and is 
        most healthy for consumption at any desired time. The ingredient is selected from
        best produce and regulated by our quality control unit to ensure the best experience by
        our customers.
        For more about how the meal is made, visit our blog section for the best recipes we have for you.
    </p>
</div>
`

// Go back to the Menu page
function goBack() {
    window.location.href = "index.html#menu";
}