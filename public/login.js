/* JavaScript code for the client */ 

const baseUrl = "http://localhost:3000"

/* Functions */

// window.onload = () => {
// //   document.getElementById("status").innerHTML = "Fetching data..."
// //   table = document.getElementById("data-table")
// //   loadData()
//     console.log("STARTTTTTTTT")
// }

function provalogin() {

    // salva il token in cookie o local storage

    let localBody = ({
        username: "prova",
        password: "prova"
    })

    fetch(baseUrl+"/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(localBody)
        })
        .then(res => {
            if (res.ok) {
                console.log("ok");
            } else {
                console.log("not ok");
            }
        })
        .catch(error => {
            console.error(error);
        })
}