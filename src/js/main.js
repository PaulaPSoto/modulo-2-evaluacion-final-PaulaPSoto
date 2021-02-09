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

function renderShow(){
   let htmlShowList = "";
   let myimage = "";
   for (let index = 0; index < allShow.length-7; index++) {
      htmlShowList += "<li class = item>";
      if (typeof allShow[index].show.image === null ) {
      console.log ("Soy indefinida");
      //  myimage = "src="./assets/images/photodefault.png";
        } else{
         console.log ("Soy definida");
         myimage = allShow[index].show.image.medium;
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

function setLocalStorarage(){
   localStorage.setItem ("favorite",JSON.stringify(favoriteShow));
  }


function handleFav(ev) {
    console.log('marcado favorito');
     const livalue = ev.target.innerHTML;
     console.log(ev.target);
     ev.target.classList.add('favorite');
     favoriteShow.push(livalue);
       // console.log('hola?');
        console.log('gg'+favoriteShow);
      //  console.log(getLis.length);
      renderFav();
      setLocalStorarage();
}


function renderFav() {
    let html ="";
    for (let index = 0; index < favoriteShow.length; index++) {
       html += "<li class = lifav>";
       html += favoriteShow[index];
       html += "</li>";
    }
    showfav.innerHTML = html;

 //const getLis = document.querySelectorAll(".item");
}


searchButton.addEventListener("click",getDataApi);