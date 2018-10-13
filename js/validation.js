//obtienes la referencia de tu formualrio con id=form
let form = document.querySelector("#form");
let name = document.querySelector("input[name='name']");
let email = document.querySelector("input[name='email']");
let state = document.querySelector("select[name='state']");
//le agregar un escuchador a tu formualrio
form.addEventListener("submit", submitForm);

//el metodo que le diste cuando le hagas submit al formualrio
function submitForm(event){
  event.preventDefault();
  console.log(validate());
  if(validate()){
    sendData();
  }else{
    console.log("error");
  }
}

function validate(){

  if(name.value == ""){
    errorMessage(name, 'empty');
    name.focus();
    return false;
  }else{
    emptyMessage(name);
  }

  if(email.value == ""){
    errorMessage(email, 'empty');
    email.focus();
    return false;
  }else{
    emptyMessage(email);
  }

  let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  if(!re.test(email.value)){
    //si no hace match le ponemos el error
    errorMessage(email, 'validate');
    email.focus();
    return false;
  }else{
    //si hace match el quetamos el error
    emptyMessage(email);
  }

  if(state.value == ""){
    errorMessage(state, 'empty');
    state.focus();
    return false;
  }else{
    emptyMessage(state);
  }

  ////////////////////////////////////////////////////
  //  AQUI LE PUEDES AGREGAR MAS VALIDATIONS
  ////////////////////////////////////////////////////
  return true;
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

//el damos los mensajes de error depende que que atributo tenga y que tipo de validación else {
// aqui solo existen 2(vacio, validatar), puedes agregar mas
function setErrorMessage(name, type){
  if(type == 'empty'){
    switch(name){
      case 'name': return 'Nombre se requiere.';break;
      case 'email': return 'Correo se requiere';break;
      case 'state': return 'Cuidad se requiere';break;
    }
  }else if(type == 'validate'){
    switch(name){
      case 'email': return 'Correo invalido';break;
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

function sendData(){
  alert("Data sending...");
}
