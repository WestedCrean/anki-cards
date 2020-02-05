import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://localhost:8080/v1/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})


export default Api