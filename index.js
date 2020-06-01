'use strict'

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const RyM_API_URL = 'https://rickandmortyapi.com/api',
  RyM_CHARACTER_API_URL = '/character/:id'
const HTTP_REQ_DONE = 4,
  HTTP_REQ_STAT_OK = 200

function httpGetAsync(theUrl) {
  const xmlHttp = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xmlHttp.onreadystatechange = () => {
      if ( xmlHttp.readyState === HTTP_REQ_DONE && xmlHttp.status === HTTP_REQ_STAT_OK ) {
        resolve( JSON.parse(xmlHttp.responseText) )
      }
      else if ( xmlHttp.readyState === HTTP_REQ_DONE && xmlHttp.status !== HTTP_REQ_STAT_OK ) {
        const errorTrace = new Error('Ocurrió un error en la consulta: ' + xmlHttp.status)
        reject(errorTrace)
      }
    }
    xmlHttp.open("GET", theUrl, true)
    xmlHttp.send(null)
  })
}

function mostrarDatosPersonaje(data) {
    console.log(data)
}

function buscarPersonaje(id) {
    const personajeUrl = RyM_API_URL + RyM_CHARACTER_API_URL.replace(':id', id)
    let personaje = undefined
    httpGetAsync(personajeUrl)
      .then (character => {
        personaje = character
        return httpGetAsync(personaje.location.url)
      })
      .then (planet => {
        personaje.location = planet
        mostrarDatosPersonaje(personaje)
      })
      .catch (err => {
        console.error(err)
      })
}

buscarPersonaje(4)