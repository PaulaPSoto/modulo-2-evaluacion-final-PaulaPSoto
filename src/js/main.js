/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable indent */
'use strict';

const showList = document.querySelector(".showlist");
const searchButton = document.querySelector(".js-button");
const showfav = document.querySelector(".showfav");


let allShow = [];
let favoriteShow = [];

//Función para coger del Api
function getDataApi() {
   const nameShowInput = document.querySelector(".js-input");
   const inputWord = nameShowInput.value;
   fetch("http://api.tvmaze.com/search/shows?q="+inputWord)
   .then( response => response.json())
   .then(data =>{
      allShow = data;
      renderShow();
   });
}
//Para recorrer el array de allShow y añadirle el html
function renderShow(){
   let htmlShowList = "";
   let myimage = "";
   for (let index = 0; index < allShow.length; index++) {
      if (isFav(allShow[index])) {
      htmlShowList += "<li class = 'item lifav'>";
      }   else { 
           htmlShowList += "<li class = 'item'>";}
      if (allShow[index].show.image !== null) {
      myimage = allShow[index].show.image.medium;
        } else{
        myimage = "./assets/images/photodefault.png";
        }
        htmlShowList += `<img class="js-imghtml" src=`+ myimage + ` alt="Imagen Serie">`;
        htmlShowList += allShow[index].show.name;
        htmlShowList+= "</li>";
   }
    showList.innerHTML = htmlShowList;


   //fav
   const getLis = document.querySelectorAll(".item");
   //a cada li le añadimos un evento
   for (const getli of getLis) {
    getli.addEventListener('click', handleFav);
    console.log(getLis.length);
  }
}

function isFav(show) {
   const favoriteFound = favoriteShow.find(favorite => {
      // la dificultad de esta función interna del find es saber que tengo que comparar
      // yo consolearía console.log(favorite, palette) para ver los datos que debo comparar
      return favorite.show.id === show.show.id;
    });
    // find devuelve undefined si no lo encuentra
    // retorno si está o no está en favoritos
    if (favoriteFound === undefined) {
      return false;
    } else {
      return true;
    }
}

//el evento debe ir completando mi array de favoritos
function handleFav(ev) {
     favoriteShow.push(allShow[0]);
     renderFav();
     renderShow();
}

function renderFav() {
   let htmlShowList = "";
   let myimage = "";
   for (let index = 0; index < favoriteShow.length; index++) {
      htmlShowList += "<li class = 'item'>";
      if (favoriteShow[index].show.image !== null) {
      myimage = favoriteShow[index].show.image.medium;
        } else{
        myimage = "./assets/images/photodefault.png";
        }
        htmlShowList += `<img class="js-imghtml" src=`+ myimage + ` alt="Imagen Serie">`;
        htmlShowList += favoriteShow[index].show.name;
        htmlShowList+= "</li>";
   }
   showfav.innerHTML = htmlShowList;
   setLocalStorarage();
}

//me traigo lo que me guarda y se lo añado a la ul
function renderFavlocal() {
   let favoriteLocal = getLocalStorage();
   if (favoriteLocal) {

      favoriteShow = favoriteLocal;
      renderFav();
   }
}

//local Storage coger lo guardado y pasarlo a JSON//
function getLocalStorage(){
   const favLocal = JSON.parse(localStorage.getItem("favorite"));
   return favLocal;
}
//local Storage guardarlo y convertirlo en cadena
function setLocalStorarage(){
   localStorage.setItem ("favorite",JSON.stringify(favoriteShow));
}

searchButton.addEventListener("click",getDataApi);
renderFavlocal();

