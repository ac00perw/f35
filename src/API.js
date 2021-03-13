window.axios = require('axios');
export default() => {
    return axios.create({
        baseURL: `http://woodreck.noisebelt.com/api/`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}