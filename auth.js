// JavaScript for toggling the hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active'); // Toggle active class on hamburger
  navLinks.classList.toggle('active'); // Toggle active class on nav-links
});



const loginLink = document.getElementById('loginLink');
// const registerLink = document.getElementById('registerLink');
const logoutBtn = document.getElementById('logoutBtn');

// Dynamically check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('authenticatedUser') === 'true';
}

// Run on page load to update the navbar
document.addEventListener('DOMContentLoaded', () => {
    updateAuthLinks();
});

// Update the visibility of login, register, and logout links
function updateAuthLinks() {
    if (isLoggedIn()) {
        loginLink.style.display = 'none';
        // registerLink.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        loginLink.style.display = 'inline';
        // registerLink.style.display = 'inline';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// Handle Logout Button Click
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authenticatedUser'); // Clear login state
        alert('Logged out successfully!');
        updateAuthLinks(); // Update navbar links
        window.location.href = 'index.html'; // Redirect to homepage
    });
}



// const loginLink = document.getElementById('loginLink')
// // const registerLink = document.getElementById('registerLink')
// const logoutBtn = document.getElementById('logoutBtn')

// let isLoggedIn = localStorage.getItem('authenticatedUser') === 'true'

// // run on page load to update the navbar
// document.addEventListener('DOMContentLoaded', () =>{
//     updateAuthLinks()
// });



// // update the visibility of loginError, register and logout link 
// function updateAuthLinks(){
//     if(isLoggedIn){
//         loginLink.style.display = 'none'
//         // registerLink.style.display ='none'
//         logoutBtn.style.display = 'block'
//     }else{
//         loginLink.style.display = 'inline'
//         // registerLink.style.display ='inline'
//         logoutBtn.style.display = 'none'
//     }
// }


function isValidEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
}

function isValidPassword(password){
    return password.length >= 8
}

// Login
const loginForm = document.getElementById('loginForm')
const loginError = document.getElementById('loginError')

if(loginForm){
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        
        const email = document.getElementById('loginEmail').value.trim()
        const password = document.getElementById('loginPassword').value 

        // Basic validation

        if(!email || !password){
            loginError.textContent = 'All fields are required'
            return
        }
        if(!isValidEmail){
            loginError.textContent = 'Please enter a valid email address'
            return
        }
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'))
        if(!registeredUser || registeredUser.email !== email || registeredUser.password !== password){
            loginError.textContent = 'Invalid email or password'
            return
        }

        localStorage.setItem('authenticatedUser', 'true')
        window.location.href = 'index.html'
    })
}

// Register 
const registerForm = document.getElementById('registerForm')
const registerError = document.getElementById('registerError')

if(registerForm){
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const name = document.getElementById('name').value.trim()
        const email = document.getElementById('email').value.trim()
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value

        // Basic validation
        if(!name || !email || !password || !confirmPassword){
            registerError.textContent = 'All fields are required'
            return
        }
        if(!isValidEmail){
            registerError.textContent = 'Please enter a valid email address'
            return
        }
        if(!isValidPassword){
            registerError.textContent = 'password must be at least 6 characters long'
            return
        }
        if(password !== confirmPassword){
            registerError.textContent = 'Passwords do not match'
            return
        }

        const user = {name, email, password}
        localStorage.setItem('registeredUser',JSON.stringify(user))

        alert('Registration successful! please log in')
        window.location.href = 'login.html'
    })
}

// // Handle Logout Button Click
// logoutBtn.addEventListener('click', () => {
//     localStorage.removeItem('authenticatedUser'); // Clear login state
//     alert('Logged out successfully!');
//     isLoggedIn = false;
//     updateAuthLinks(); // Update navbar links
//     window.location.href = 'index.html'; // Redirect to homepage
//   });