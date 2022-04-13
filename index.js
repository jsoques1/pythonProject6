function askHello() {
  //fetch("https://dog.ceo/api/breeds/list/all")
  //fetch("http://localhost:8000/api/v1/genres/")
  fetch("http://localhost:8000/api/v1/genres/?page=2")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value)

   // methode JSON.stringify() pour mettre a plat le json
   let data = JSON.stringify(value);
   //console.log(data);
   //console.log(value['message']);
   console.log(value['message']['bulldog']);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
}

document
  .getElementById("ask-hello")
  .addEventListener("click", askHello);