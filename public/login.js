// // import {setTokenHeader} from "./axiosInstance.js";

// // window.onload = () => {
// //     document.querySelector('#login').addEventListener('click', provalogin);
// // }


// function provalogin() {

//     // salva il token in cookie o local storage

//     let localBody = ({
//         email: document.getElementById('email').value,
//         password: document.getElementById('password').value
//     })

//     fetch( 'http://localhost:9090/api/user/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(localBody)
//         })
//         .then(
//             (response) => response.json()
//         )
//         .then(
//             (data) => {

//                 localStorage.setItem('JwtToken', data.token);

//             }
//         )
//         // .then(
//         //     (res) => {
//         //         if (res.ok) {
//         //             res.json();
//         //             // window.location.href = viewBaseUrl + "room";
//         //         } else {
//         //             console.log('not ok');
//         //         }
//         //     }
//         // )
//         // .then(
//         //     (data) => console.log(data)
//         // )
//         .catch(error => {
//             console.error(error);
//         })
// }

// function register() {
//     window.location.href = viewBaseUrl + 'register';
// }
