
// const baseUrl = "http://localhost:3000"

// function register() {

//     let user = {
//         firstName: document.getElementById("firstName").value,
//         lastName: document.getElementById("lastName").value,
//         email: document.getElementById("email").value,
//         password: document.getElementById("password").value
//     }

//     let repPassword = document.getElementById("repeatPassword").value;

//     if (!user.firstName || !user.lastName || !user.lastName || !user.password || !repPassword){
//         return document.getElementById("errorMessage").innerHTML = "All datas are required";
//     }

//     if (user.password !== repPassword){
//         return document.getElementById("errorMessage").innerHTML = "Password doesn't match";
//     }

//     fetch(apiBaseUrl + "user/register", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     })
//     .then(res => {
//         if (res.ok) {
//             window.location.href = viewBaseUrl + "rooms.html";
//         } else {
//             console.log("not ok");
//         }
//     })
//     .catch(error => {
//         console.error(error);
//     })
    

// }