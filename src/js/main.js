/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable indent */
'use strict';

//console.log('antes de const');

const showList = document.querySelector(".showlist");
const searchButton = document.querySelector(".js-button");
//console.log(`después de const`);
let allShow = [];

function getDataApi(ev) {
    ev.preventDefault();
   const nameShowInput = document.querySelector(".js-input");
   const inputWord = nameShowInput.value;
   fetch("http://api.tvmaze.com/search/shows?q="+inputWord)
   .then( response => response.json())
   // document.body.innerHTML=data[0].score);
   .then(data =>{
      let html = "";
      for (let index = 0; index < data.length; index++) {
         const element = data[index];
         html += "<li class = item>"
         html+= data[index].show.name;
         html+= "</li>"
      }
      showList.innerHTML = html;
   })

       
   
}
searchButton.addEventListener("click",getDataApi);
