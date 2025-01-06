const defaultUserName = {
    username: "user",  
    password: "user123"
};

// Simulate login validation with a Promise
function login(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === defaultUserName.username && password === defaultUserName.password) {
                resolve("Logged in successfully");
            } else {
                reject("Login Failed");
            }
        }, 1000);
    });
}

// Handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username').value; 
    const password = document.querySelector('#password').value;

    login(username, password)
        .then(message => {
            alert(message);
            console.log("Logged in successfully");
            // Redirect after successful login
            window.location.href = "index.html";
        })
        .catch(error => {
            alert(error);
            console.error("Username or password is incorrect");
        });
});
