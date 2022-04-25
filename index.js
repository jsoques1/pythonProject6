const mainUrl = "http://localhost:8000/api/v1/titles/"

main();
display_slider('')


function main() {
    //fetch("https://dog.ceo/api/breeds/list/all")
    //fetch("http://localhost:8000/api/v1/genres/")
    fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log(value)
    console.log('*************************************')
    
     // methode JSON.stringify() pour mettre a plat le json
     let data = JSON.stringify(value);
     //console.log(data);
     console.log('*************************************')
     console.log(value['results'][0]);
     console.log('image_url = ' + value['results'][0]['image_url']);
     console.log('*************************************')
  
    var best_movie_title = document.getElementsByClassName('section_best_movie_title_h1')[0];
    best_movie_title.innerHTML = value["results"][0]["title"];

    var best_movie_img = document.getElementsByClassName('section_best_img')[0].getElementsByTagName("img")[0];
    console.log('document.getElementsByClassName("section_best_img")[0] =')
    console.log(document.getElementsByClassName('section_best_img')[0])
    console.log('best_movie_img = ')
    console.log(best_movie_img)
    best_movie_img.src = value['results'][0]['image_url']
    best_movie_img.alt = 'Check it'

    var best_movie_description = document.getElementsByClassName('section_best_movie_title_h2')[0]
    best_movie_description.innerHTML = 'IMDB score: ' + value["results"][0]["imdb_score"];

    let add_element = (id, name) => {
      const template = document.createElement('div');
      template.innerHTML = id + " " + name;
      template.className = name
      template.id = id
      
      document.body.appendChild(template);
  
    }
    let add_img = (url) => {
    const template = document.createElement('img');
    template.className = 'best-movie'
    template.src = url
    template.alt = 'check it'
    
    document.body.appendChild(template);
    }
    /*  
    add_img(value['results'][0]['image_url'])

     var objRef = document.body;
     for (let item of value['results']) {
       // console.log(item['id'] + " " + item['name'])
       // console.log(item['id'])
       console.log(item['name'])
       add_element(item['id'], item['name']);
    }
    */
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
}


function display_slider(category) {

  var urlPage1 = mainUrl + "?sort_by=-imdb_score&genre=" + category;
  var urlPage2 = mainUrl + "?sort_by=-imdb_score&genre=" + category + "&page=2";

  fetch(urlPage1)
  .then(response => response.json())
  .then(data => {
    var dataPage1 = data["results"];

    fetch(urlPage2)
    .then(response => response.json())
    .then(data => {
      var dataPage2 = data["results"];
      var dataAll = dataPage1.concat(dataPage2);

      if (category == '')
        dataAll.shift();   // for best-rated category, skip first movie

      for (i=0; i<7; i++) {
        var movieCover = dataAll[i]["image_url"];
        var movieTitle = dataAll[i]["title"];
        var movieId = dataAll[i]["id"];
        var currentMovieTitle = document.getElementById(category + (i+1).toString()).getElementsByTagName("p")[0];
        var currentMovieCover = document.getElementById(category + (i+1).toString()).getElementsByTagName("img")[0];
            
        currentMovieCover.src = movieCover;
        currentMovieCover.id = movieId;
        currentMovieTitle.innerHTML = movieTitle;
      }
    })
  })

  const gap = 10;
const carousel = document.getElementById("carrousel"),
content = document.getElementById("content"),
next = document.getElementById("next"),
prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
    /*
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }

  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
  */
}); 
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
/*
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }


  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
      
  }
  */
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

}


function openModal(category, num) {
  var modal = document.getElementById("modal");
  var span = document.getElementsByClassName("close")[0];

  var modalId = document.getElementById(category + num.toString()).getElementsByTagName("img")[0].id;

  fetchModalData(modalId)

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal)
      modal.style.display = "none";
  }
}

function fetchModalData(id) {

	fetch(mainUrl + id)
	.then(response => response.json())
	.then(data => {

    document.getElementById('modal-cover').src = data["image_url"];
		document.getElementById('modal-title').innerHTML = data["title"];

    document.getElementById('modal-year').innerHTML = data["year"];
    document.getElementById('modal-duration').innerHTML = data["duration"] + " min";
    document.getElementById('modal-genres').innerHTML = data["genres"];
    document.getElementById('modal-imdb').innerHTML = data["imdb_score"] + " / 10";

    document.getElementById('modal-directors').innerHTML = data["directors"];
    document.getElementById('modal-cast').innerHTML = data["actors"] + "...";
    document.getElementById('modal-country').innerHTML = data["countries"];


    if (typeof data["rated"] === 'string' || data["rated"] instanceof String)
      document.getElementById('modal-rating').innerHTML = data["rated"];
    else
      document.getElementById('modal-rating').innerHTML = data["rated"] + "+";  // add "+" if age rating is a number

    var modalBoxOffice = document.getElementById('modal-box-office');
    if (data["worldwide_gross_income"] == null)
      modalBoxOffice.innerHTML = "N/A";  // placeholder for unspecified box-office   
    else 
      modalBoxOffice.innerHTML = data["worldwide_gross_income"] + " " + data["budget_currency"];

    var regExp = /[a-zA-Z]/g;
    if (regExp.test(data["long_description"]))
      document.getElementById('modal-desc').innerHTML = data["long_description"]; 
    else
      document.getElementById('modal-desc').innerHTML = "N/A";  // placeholder for missing description
    
	})
}

function noOP() {
}








