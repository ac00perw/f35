import API from './API'

export default {
    getData(url) {
        return API().get(url)
    },
    data(url){
        return API().get(url)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error));
    },
    getStatus(url){
        return API().get(url)
        .then(response => Promise.resolve(response.status))
        .catch(error => Promise.reject(error.response.status));
    }
}