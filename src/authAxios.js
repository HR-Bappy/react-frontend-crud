// authAxios.js
import axios from 'axios'
import { getCookies } from './apps/helpers/Cookies/AdminCookies';
const token = getCookies('data') || ''

let baseURL = process.env.REACT_APP_API_URL

const customInstance = axios.create({
  baseURL: baseURL,
  headers: { 'Authorization': 'Bearer '+token }
})

export default customInstance
