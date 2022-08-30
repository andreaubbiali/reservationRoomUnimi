
window.onload = () => {

    loadRooms();

    // fetch('http://localhost:3000/api/rooms', {
    //     method: "GET",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzA4OTU1ODVlMjY4OTM0NjZlNDM4NzgiLCJ1c2VyRW1haWwiOiJ1YmE5OWFAZ21haWwuY29tIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpYXQiOjE2NjE3ODk5MjEsImV4cCI6MTY2MTc5NzEyMX0.WUxNFn9DCWZOAJ2rhTrJYBuOwpUINFVwtKbqn3t-WxU',
    //     }
    // })
    // .then(res => {
    //     console.log(res.statusText);
    //     return res.json();
    // })
    // .then(data => console.log(data));
}


async function loadRooms() {
    try {
        const token = localStorage.getItem('JwtToken');
        console.log(token);
        // fetch('http://localhost:3000/api/rooms', {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'x-access-token': token,
        //     }
        //     })
        //     .then(res => {
        //         console.log(res.statusText);
        //         return res.json();
        //     })
        //     .then(data => 
        //         fetch('http://localhost:3000/room', {
        //             method: "POST",
        //             body: data
        //         })
        //     );

    } catch (error) {
        console.log(error);
    }
}

