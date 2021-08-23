//variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []

//event listeners
eventListeners()
function eventListeners() {
    //cuando el usuario agrega un nuevo tweet

    formulario.addEventListener('submit', agregarTweet)
    //cunado el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []
        console.log(tweets);
        crearHTML()
    })
}

//functions
function agregarTweet(e) {
    e.preventDefault()
    // textarea donde escribe
    const tweet = document.querySelector('#tweet').value
    //validacion
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio')
        return
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //añadir al array de tweets
    tweets = [...tweets, tweetObj]
    //crear el HTML
    crearHTML()
    //reset formulario
    formulario.reset()
}

function mostrarError(error) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }, 1000)
}

// muestra listado de los tweets
function crearHTML() {
    limpiarHTML()
    if (tweets.length > 0) {
        tweets.map(tweet => {
            //agregar un boton eliminar
            const btnDelete = document.createElement('a')
            btnDelete.classList.add('borrar-tweet')
            btnDelete.textContent = 'x'
            //add function delete
            btnDelete.onclick = () => {
                borrarTweet(tweet.id)
            }
            //crear HTML
            const li = document.createElement('li')
            //añadir texto
            li.textContent = tweet.tweet
            //poner un boton al li
            li.appendChild(btnDelete)
            //poner un li a la lista de tweets
            listaTweets.appendChild(li)
        })
    }
    sincronizarStorage()
}

//borrar tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id != id)
    crearHTML()
}

//limpiar html
function limpiarHTML() {

    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}