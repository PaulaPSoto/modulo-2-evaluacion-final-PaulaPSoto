/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable indent */
'use strict';

//console.log('antes de const');

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
      htmlShowList += "<li class = item>";
      if (allShow[index].show.image !== null) {
      console.log ("Soy indefinida");
        myimage = `src="./assets/images/photodefault.png"`;
        } else{
        console.log ("Soy definida");
        //myimage = allShow[index].show.image.medium;
        }
        htmlShowList += `<img class="js-imghtml" src=`+ myimage +  ` alt=""></img>`;
        htmlShowList += allShow[index].show.name;
        htmlShowList+= "</li>";
   }
    showList.innerHTML = htmlShowList;
   //fav
   //recoger todos li - item
   const getLis = document.querySelectorAll(".item");

   //a cada li le añadimos un evento
   for (const getli of getLis) {
    getli.addEventListener('click', handleFav);
    console.log(getLis.length);
  }
}
//local Storage coger lo guardado y pasarlo a JSON
function getLocalStorage(){
   const favLocal = JSON.parse(localStorage.getItem("favorite"));
   return favLocal;
}
//local Storage guardarlo y convertirlo en cadena
function setLocalStorarage(){
   localStorage.setItem ("favorite",JSON.stringify(favoriteShow));
}


function handleFav(ev) {
     const livalue = ev.target.innerHTML;
     //ev.target.classList.add('favorite');
     favoriteShow.push(livalue);
     renderFav();
     setLocalStorarage();
}


function renderFav() {
   let favoriteLocal = getLocalStorage();
    let html ="";
    for (let index = 0; index < favoriteLocal.length; index++) {
       html += "<li class = lifav>";
       html += favoriteLocal[index];
       html += "</li>";
    }
    showfav.innerHTML = html;
}



searchButton.addEventListener("click",getDataApi);
renderFav();
getLocalStorage();