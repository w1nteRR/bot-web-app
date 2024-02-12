import axios from 'axios'

// const baseURL = 'https://instagram-scraper-2022.p.rapidapi.com/ig'
const cloudFunctionsUrl = 'https://europe-west1-ia-bot-api.cloudfunctions.net'

export const mainInstance = axios.create({
  baseURL: cloudFunctionsUrl,

  // headers: {
  //   'X-RapidAPI-Key': 'f689f9184fmsh2232e36e8aefa9ap1ab01cjsne9c595cce392',
  //   'X-RapidAPI-Host': 'instagram-scraper-2022.p.rapidapi.com',
  // },
})

export const telegramInstance = axios.create({
  baseURL: 'http://localhost:8080',
})
