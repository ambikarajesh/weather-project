import axios from 'axios';


const instance = axios.create({
    baseURL:'https://weather-project-224801.firebaseio.com/'
})

export default instance;