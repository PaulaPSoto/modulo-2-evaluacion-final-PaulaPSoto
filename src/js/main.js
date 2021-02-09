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
   // document.body.innerHTML=data[0].score);
   .then(data =>{
      allShow = data;
      renderShow();
   });
}
   //Mostrar títulos e imágenes
   function handleFav (ev) {
      console.log('marcado favorito');
       const livalue = ev.target.innerHTML;
       favoriteShow.push(livalue);
      // console.log('hola?');
       console.log('gg'+favoriteShow);
      // renderFav();
   }
function renderShow(){
   let htmlShowList = "";
   for (let index = 0; index < allShow.length; index++) {
        htmlShowList += "<li class = item>";
        htmlShowList += allShow[index].show.name;
        htmlShowList+= "</li>";
   }
   showList.innerHTML = htmlShowList;
   //favoritos
   const getLis = document.querySelectorAll(".item");
   console.log(getLis.length);
   for (const getli of getLis) {
   getli.addEventListener('click', handleFav);
   let html =""
}
}

searchButton.addEventListener("click",getDataApi);