'use strict'

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const RyM_URL = 'https://rickandmortyapi.com/api',
  RyM_CHARACTER_URL = '/character/:id'
const HTTP_REQ_DONE = 4,
  HTTP_REQ_STAT_OK = 200

function httpGetAsync(theUrl, callback) {
  let xmlHttp = new XMLHttpRequest()
  let promesa = new Promise((resolve, reject) => {
    xmlHttp.onreadystatechange = () => {
      if ( xmlHttp.readyState === HTTP_REQ_DONE && xmlHttp.status === HTTP_REQ_STAT_OK ) {
        resolve( callback(xmlHttp.responseText) )
      }
      else if ( xmlHttp.readyState === HTTP_REQ_DONE && xmlHttp.status !== HTTP_REQ_STAT_OK ) {
        reject(xmlHttp.status)
      }
    }
    xmlHttp.open("GET", theUrl, true)
    xmlHttp.send(null)
  }).catch (err => {
    console.error('Ocurrió un error en la consulta: ' + err)
  })
}

function mostrarDatosPersonaje(data) {
    console.log( JSON.parse(data) )
}

function buscarPersonaje(id) {
    const personajeUrl = RyM_URL + RyM_CHARACTER_URL.replace(':id', id)
    httpGetAsync(personajeUrl, mostrarDatosPersonaje)
}

buscarPersonaje(2)