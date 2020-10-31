import axios from 'axios'

const api = axios.create({
  baseURL: 'https://happy-peedrosh.herokuapp.com'
})

export default api
