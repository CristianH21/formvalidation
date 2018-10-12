//obtienes la referencia de tu formualrio con id=form
let form = document.querySelector('#form');

//le agregar un escuchador a tu formualrio
form.addEventListener("submit", submitForm);

//el metodo que le diste cuando le hagas submit al formualrio
function submitForm(event){
  event.preventDefault();
  //vamos a validar todos los campos que sean requeridos
  // aqui vamos a jugar con nodos (es casi lo mismo que un array)
  // tomamos todos los campos que tengan una clase de 'require'
  let requiredFields = this.querySelectorAll(".require");

  //iremos una por una, validando que no esten vacia
  requiredFields.forEach(function(field){
    //si el campo esta vacio
    if(field.value == ""){
      //el campo esta vacio
      //le vamos a agregar una etiqueta que este campo es requerido
      //para no hacer un chorizo aqui, vamos a crear un metodo afuera.
      errorMessage(field, 'empty');
    }else{
      //si no estan vacios vamos a borrar
      emptyMessage(field);
    }


    let email = this.querySelector("input[name='email']");
    //vamos a checar que el campo de correo este correcto
    if(email){
      errorMessage(field, 'validate');
    }else{
      emptyMessage(field);
    }

  });
}

function errorMessage(field, type){
  //hacemos refrencia al padre del input
  let div = field.parentNode;
  //primero checamos si ya existe un elemnto 'p' que contiene el message de error
  //si no existe se la ponemos
  if(!div.querySelector('p')){
    //como no existe, creamos un nuevo elemento que contenga el error
    let p = document.createElement("p");
    //le agregamos un message especial depende de que tipo de campo es por su atributo 'name'
    p.textContent = setErrorMessage(field.getAttribute('name'), type);
    //para que se vea bonito le vamos a ageagr un estilo
    p.classList.add("error-message");
    //ahora le agregamos 'p' antes del input
    div.insertBefore(p,field);
  }
}

function setErrorMessage(name, type){
  if(type == 'empty'){
    switch(name){
      case 'name': return 'Nombre se requiere.';break;
      case 'email': return 'Correo se requiere';break;
      case 'state': return 'Cuidad se requiere';break;
    }
  }else if(type == 'validate'){
    switch(name){
      case 'email': return 'Correo incorrecto';break;
    }
  }
}

function emptyMessage(field){
  //hacemos refrencia al padre del input
  let div = field.parentNode;
  //primero checamos si ya existe un elemnto 'p' que contiene el message de error
  // si existe, se la quitamos
  if(div.querySelector('p')){
    let p = div.querySelector('p');
    div.removeChild(p);
  }
}
