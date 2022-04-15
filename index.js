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
    console.log(document.getElementsByClassName('section_best_img')[0])
    debugger
    console.log(best_movie_img)
    /*
    best_movie_img.src = value['results'][0]['image_url']
    best_movie_img.alt = 'Check it'
    */

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
    
    add_img(value['results'][0]['image_url'])
  /*
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

function noOP() {
}

document
  main();