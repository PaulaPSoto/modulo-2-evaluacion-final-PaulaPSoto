/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable indent */
'use strict';

//console.log('antes de const');

const showList = document.querySelector(".showlist");
const searchButton = document.querySelector(".js-button");
let allShow = [];


//Función para coger del Api
function getDataApi() {
   const nameShowInput = document.querySelector(".js-input");
   const inputWord = nameShowInput.value;
   fetch("http://api.tvmaze.com/search/shows?q="+inputWord)
   .then( response => response.json())
   // document.body.innerHTML=data[0].score);
   .then(data =>{
      allShow = data;
      renderShow();
   });
}
//Mostrar títulos e imágenes
function renderShow(){
   let html = "";
   for (let index = 0; index < allShow.length; index++) {
      html += "<li class = item>";
      html+= allShow[index].show.name;
      //html+= data[index].show.image[0];
      html+= "</li>";
      // console.log(allShow[index].show.image.medium);
   }
   showList.innerHTML = html;
}

searchButton.addEventListener("click",getDataApi);
