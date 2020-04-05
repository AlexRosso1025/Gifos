var apikey ="MauztjyEya1cEVnkls2yK2zgWLN2dmJq";
window.onload = getTrendingResults();
var gifosSuggest = [];
window.onload = function(){
    for(var i=0;i<4;i++){
        getSuggestResults(gifosSuggest);
    }
}

function menu(){
    document.getElementById("menu-list").classList.toggle('show');
}

function cambiarTema(tema){
    console.log(tema);
    var logo = document.getElementById("logo");
    var theme = document.getElementById("theme");
    var sailorDay = document.getElementById("sailor-day");
    var sailorNight = document.getElementById("sailor-night");
    if(tema == 'day'){
        sailorDay.disabled=true;
        sailorNight.disabled=false;
        sailorDay.classList.toggle("first-letter");
        sailorNight.classList.remove("first-letter");
        theme.setAttribute('href','css/saylor-day.css');
        logo.setAttribute('src','assets/gifOF_logo.png');
    }else{
        sailorDay.disabled=false;
        sailorNight.disabled=true;
        sailorDay.classList.remove("first-letter");
        sailorNight.classList.toggle("first-letter");
        theme.setAttribute('href','css/saylor-night.css');
        logo.setAttribute('src','assets/gifOF_logo_dark.png');
    }
}

window.onclick = function(e){
    var menuList = document.getElementById("menu-list");
    var tema = document.getElementById("tema");
    if(!e.target.matches('#tema')){
        if(menuList.classList.contains('show')){
            menuList.classList.remove('show');
        }
    }
}

function validarInput(){
    var inputSearch = document.getElementById("searchGif");
    var buttonSearch = document.getElementById("buttonSearch");
    var imageSearch = document.getElementById("imageSearch");
    var buttonSearchSuggest = document.getElementById("sugerenciaBusqueda");
    if(inputSearch.value.length ==0){
        buttonSearch.disabled=true;
        buttonSearch.style.color = "rgba(180,180,180,1)";
        buttonSearch.style.background ="#E6E6E6";
        buttonSearchSuggest.style.display ="none";
        imageSearch.style.background = "url('assets/lupa_inactive.svg')";
    }else{
        buttonSearch.disabled=false;
        buttonSearch.style.color = "black";
        buttonSearch.style.background ="#F7C9F3";
        buttonSearchSuggest.style.display ="grid";
        imageSearch.style.background = "url('assets/lupa.svg')";
    }
}

function getValue(){
    var search = document.getElementById("searchGif").value;
    getSearchResults(search);
}

function getTrendingResults(){
    const found = fetch('https://api.giphy.com/v1/gifs/trending?api_key='+apikey+'&limit=8')
    .then((response) => {
        return response.json()
    })
    .then(resp => {
        var dataArray= resp.data;
        var image = document.getElementById("trending-gifs");
        for (i in dataArray){
            var src=dataArray[i].images.original.url;
            var title= dataArray[i].title.replace(/GIF/g,"");
            var contenido = "<div class=gifItem>"
                            +"<img src='"+src+"' class=gifImage alt= '"+title+"'>"
                            +"<p id=parrafo"+i+">#"
                            +title.replace(/ /g, "")+"</p>"
                            +"</div>"
            image.innerHTML += contenido;
    }
    })
    .catch((error) =>{
        console.log(error);
        return error})
    return found;
};

function getSuggestResults(gifosSuggest){
    const found = fetch('https://api.giphy.com/v1/gifs/random?api_key='+apikey)
    .then((response) => {
        return response.json()
    })
    .then(resp => {
        var gifSuggest = resp.data;
        gifosSuggest.push(gifSuggest);
        if(gifosSuggest.length==4){
            mostrarGifsSuggest(gifosSuggest);
        }
    })
    .catch((error) =>{
        return error
    })
    return found;
};

function mostrarGifsSuggest(gifosSuggest){
    var image = document.getElementById("suggest-gifs");
    for (i in gifosSuggest){
        var src=gifosSuggest[i].images.original.url;
        var title= gifosSuggest[i].title;
        var contendio = "<div class=gifItem>" 
                        +"<div class=imageTitle><p>#"
                        +title+"</p>"
                        +"<img class=eliminarGif onclick=borrarGif(); src=assets/buttonclose.svg alt=boton"+"></div>"+"<img src='"+src+"' class=gifImage alt= '"+title+"'>"
                        +"<button class=more onclick=getSearchResults('"+title.split(" ")+"');>Ver más...</button>"
                        +"</div>"
        image.innerHTML += contendio;
    }
}

function getSearchResults(search) {
    var aviso = document.getElementById("aviso");
    if(search.trim() ===""){
        aviso.innerHTML = "<p>Este campo no puede estar vacío</p>";
    }else{
        const found = fetch('https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apikey+"&limit=4")
        .then((response) => {
            return response.json()
        }).then((resp) =>{
            if (resp.data.length == 0){
                aviso.innerHTML = '<p>No hay resultados para tu búsqueda</p>';
            }else{
                aviso.innerHTML = '';
                var dataArray= resp.data;
                var image = document.getElementById("gifResult");
                console.log(dataArray)
                //imagen.innerHTML += "<p>"+search+"</p>";
                //image.innerHTML = "<p>"+search+"</p>";
                image.innerHTML="<div class=titleFixed><p>"+search.replace(/,/g, " ")+" (resultados)</p></div>";
                image.innerHTML+="<div id=finder-gifs class=gifos></div>";
                var finding = document.getElementById("finder-gifs");
                for (i in dataArray){
                    var src=dataArray[i].images.original.url;
                    var title= dataArray[i].title;
                    var contenido = "<div class=gifItem>" 
                                    +"<img src='"+src+"' class=gifImage alt= '"+title+"'>"+"</div>";
                    finding.innerHTML += contenido;
                }
            }
        }).catch((error) =>{
            return error})
        return found
    }
};

function borrarGif(){
    console.log("Borrado")
}