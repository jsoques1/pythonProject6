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
	console.log('*************************************')

   // methode JSON.stringify() pour mettre a plat le json
   let data = JSON.stringify(value);
   console.log(data);
   console.log('*************************************')
   console.log(value['results']);
   console.log('*************************************')

    let add_element = (id, name) => {
    const template = document.createElement('div');
    template.innerHTML = id + " " + name;
	template.className = name
	template.id = id

    document.body.appendChild(template);
	}

   var objRef = document.body;
   for (let item of value['results']) {
	   // console.log(item['id'] + " " + item['name'])
	   // console.log(item['id'])
	   console.log(item['name'])
	   add_element(item['id'], item['name']);
  }





   //console.log(value['message']['bulldog']);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
}

document
  //.getElementById("ask-hello")
  //.addEventListener("click", askHello);
  askHello();