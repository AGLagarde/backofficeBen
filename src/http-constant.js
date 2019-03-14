import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'https://jsonplaceholder.typicode.com/'
}

export const HTTP = axios.create({
    baseURL: baseURL
})