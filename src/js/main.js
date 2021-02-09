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
   let htmlShowList = "";
   for (let index = 0; index < allShow.length; index++) {
        htmlShowList += "<li class = item>";
        htmlShowList += allShow[index].show.name;
        htmlShowList+= "</li>";
   }
   showList.innerHTML = htmlShowList;
}

searchButton.addEventListener("click",getDataApi);





  // html += "<li class = item>";
      // html+= allShow[index].show.name;
      // html+= allShow[index].show.image.medium;
      // html+= "</li>";
      //  console.log(allShow[index].show.image.medium);
