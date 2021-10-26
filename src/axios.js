import axios from "axios"

const instance = axios.create({
    baseURL: "http://185.208.77.203:8000",
    
})


export default instance