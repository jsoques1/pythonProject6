
const movies_categories = [
  {
      id: "", 
      fullName: "Best Movies"
  },
  
  {
    id: "Action",
    fullName: "Action Movies"
  },
  
{
  id: "Animation",
  fullName: "Animation Movies"
},
  
{
  id: "Adventure",
  fullName: "Adventure Movies"
}]

main(); 
body();

function body() {

var movie_id=0;

  for (let movies_category of movies_categories) {
     movie_id += 1;
    i=`movie_id=${movie_id}`

    get_category_section(movies_category.id, movies_category.fullName);
    get_data(movies_category.id);
  }
}



function get_category_section(category, category_name='') {

let section=`
<section class="categories" id="${category}">
<div class="container">
  <h2>${category_name}</h2>

  <div class="controls" id="controls${category}">
    <div class="button 1">
      <button class="prev" id="prev${category}">❰</button>
    </div> 
    <div class="button 2">
      <button class="next" id="next${category}">❱</button>
    </div>

  </div> <!-- controls -->

  <div class="carrousel--container" id="carrousel${category}">
    <div class="carrousel--content" id="content${category}">
        <div class="box" id="${category}1">
            <img src="" alt="movie cover" onclick="details(this)">
        </div>
        <div class="box" id="${category}2">
            <img src="" alt="movie cover"  onclick="details(this)">
        </div>
        <div class="box" id="${category}3">
            <img src="" alt="movie cover"  onclick="details(this)">
        </div>
        <div class="box" id="${category}4">
            <img src="" alt="movie cover" onclick="details(this)">  
        </div>
        <div class="box" id="${category}5">
            <img src="" alt="movie cover"  onclick="details(this)">
        </div>
        <div class="box" id="${category}6">
            <img src="" alt="movie cover" onclick="details(this)">
        </div>
        <div class="box" id="${category}7">
            <img src="" alt="movie cover" onclick="details(this)">
        </div> 
    </div> <!-- content${category} -->
  </div> <!-- carousel${category} -->
</div>
</div> <!-- container${category} -->
</section>`

document.write(section)
console.log(document)
}



function main() {
    fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
    .then(response => response.json())
    .then(function(data) {
  
    var best_movie_title = document.getElementsByClassName('best_movie_title')[0];
    best_movie_title.innerHTML = data["results"][0]["title"];

    var best_movie_img = document.getElementsByClassName('best_img')[0].getElementsByTagName("img")[0];
    best_movie_img.src = data['results'][0]['image_url']
    best_movie_img.id = data['results'][0]['id']

    var best_movie_score = document.getElementsByClassName('best_movie_score')[0]
    best_movie_score.innerHTML = 'IMDB score: ' + data["results"][0]["imdb_score"];

    var url = data["results"][0]["url"];
    get_best_description(url)

  })
  .catch(function(err) {
    // Une erreur est survenue
    alert("error")
  });
}

function get_best_description(url) {

  var best_desc = document.getElementsByClassName('best_desc')[0];

  fetch(url)
	.then(response => response.json())
	.then(data => {
    best_desc.innerHTML = data["description"];
	})
  .catch(function(err) {
    // Une erreur est survenue
    alert("error")
  });
}

function get_data(category) {

  var main_page = `http://localhost:8000/api/v1/titles?sort_by=-imdb_score&genre=${category}`;
  var second_page = `${main_page}&page=2`;

  fetch(main_page)
  .then(response => response.json())
  .then(data => {
    var main_page_data = data["results"];

    fetch(second_page)
    .then(response => response.json())
    .then(data => {
      var second_page_data = data["results"];
      var dataAll = main_page_data.concat(second_page_data);

      if (category == '')
        dataAll.shift();  

      for (i=0; i<7; i++) {
        var movieCover = dataAll[i]["image_url"];
        var movieTitle = dataAll[i]["title"];
        var movieId = dataAll[i]["id"];
        var index = i + 1;
        var currentMovieTitle = document.getElementById(`${category}${index}`).getElementsByTagName("p")[0];
        var currentMovieCover = document.getElementById(`${category}${index}`).getElementsByTagName("img")[0];
            

        currentMovieCover.src = movieCover;
        currentMovieCover.id = movieId;
        currentMovieCover.alt = "";
      }   
    })
    .catch(function(err) {
      // Une erreur est survenue
      alert("error")
    });
  })

const gap = 10;
const carousel = document.getElementById(`carrousel${category}`),
content = document.getElementById(`content${category}`),
next = document.getElementById(`next${category}`),
prev = document.getElementById(`prev${category}`);

next.addEventListener("click", e => {
  carousel.scrollBy(carousel.offsetWidth + gap, 0);
}); 
prev.addEventListener("click", e => {
  carousel.scrollBy(-(carousel.offsetWidth + gap), 0);
});

/*
let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));
*/
}


function details(object) 
{
  var modal = document.getElementById("modal");
  var span = document.getElementsByClassName("close")[0];

  get_modal_data(object.id)

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal)
      modal.style.display = "none";
  }
}


function get_modal_data(id) {
	fetch("http://localhost:8000/api/v1/titles/" + id)
	.then(response => response.json())
	.then(data => {

    document.getElementById('modal-cover').src = data["image_url"];
		document.getElementById('modal-title').innerHTML = data["title"];
    document.getElementById('modal-year').innerHTML = data["year"];
    document.getElementById('modal-duration').innerHTML = data["duration"] + " min";
    document.getElementById('modal-genres').innerHTML = data["genres"];
    document.getElementById('modal-imdb').innerHTML = data["imdb_score"];
    document.getElementById('modal-directors').innerHTML = data["directors"];
    document.getElementById('modal-cast').innerHTML = data["actors"];
    document.getElementById('modal-country').innerHTML = data["countries"];
    document.getElementById('modal-rating').innerHTML = data["rated"];

    var modalBoxOffice = document.getElementById('modal-box-office');
    if (data["worldwide_gross_income"] == null)
      modalBoxOffice.innerHTML = "Unknown";   
    else 
      modalBoxOffice.innerHTML = data["worldwide_gross_income"] + " " + data["budget_currency"];
    document.getElementById('modal-desc').innerHTML = data["long_description"];    
	})
}
