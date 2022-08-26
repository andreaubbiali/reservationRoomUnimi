

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
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    })

    fetch( apiBaseUrl + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(localBody)
        })
        .then(res => {
            if (res.ok) {
                window.location.href = viewBaseUrl + "rooms.html";
            } else {
                console.log("not ok");
            }
        })
        .catch(error => {
            console.error(error);
        })
}