const axios = require('axios');

let axiosRequest;

async function setTokenHeader ( token ) {
    console.log('INIZIO TOKEN');
    const environment = (await axios.get('http://localhost:3000/environmentVar.json')).data

    console.log(environment.apiBaseUrl);

    const headers = {
        'x-access-token': token,
    };

    axiosRequest = axios.create({
        baseURL: environment.apiBaseUrl,
        headers: headers,
    })

    console.log('FINE TOKEN');


    // headers['x-access-token'] = token;
    // headers = {
    //     'x-access-token': token
    // };
}

// function prova() {
//     headers = {
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzA4OTU1ODVlMjY4OTM0NjZlNDM4NzgiLCJ1c2VyRW1haWwiOiJ1YmE5OWFAZ21haWwuY29tIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpYXQiOjE2NjE4NDQzODksImV4cCI6MTY2MTg1MTU4OX0.552wuhHr41uS7lWdGse_VXBHYbbM2kQ-BLoZ_xqLS60',
//         }
//     }
// }

module.exports = {
    setTokenHeader,
    axiosRequest
}