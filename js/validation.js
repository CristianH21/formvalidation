//obtienes la referencia de tu formualrio con id=form
let form = document.querySelector("#form");
let inputs = form.elements;
let errors=[];
//le agregar un escuchador a tu formualrio
form.addEventListener("submit", submitForm);

//el metodo que le diste cuando le hagas submit al formualrio
function submitForm(event){
  event.preventDefault();
  if(validate()){
    sendData();
  }
}

function validate(){
  //limpamos el arreglo cada vez que se de clic el formulario
  errors=[];

  Array.from(inputs).forEach(function(input){
    //vamos a checar si pasa las validationes
    checkInput(input);
  });

  //checamos si el arreglo de errores es igual a cero, no hay errores y pasa
  if(errors.length == 0){
    return true;
  }
}

function checkInput(field){
  //todas las validations para Nombre
  if(field.getAttribute("name") == "name"){
    if(field.value == ""){
      errorMessage(field, 'empty');
      field.focus();
      errors.push("error");
    }else {
      emptyMessage(field);
    }
  }
  //todas las validations para email
  if(field.getAttribute("name") == "email"){
    if(field.value == ""){
      errorMessage(field, 'empty');
      field.focus();
      errors.push("error");
    }else {
      emptyMessage(field);
    }

    let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if(!re.test(field.value)){
      //si no hace match le ponemos el error
      errorMessage(field, 'validate');
      field.focus();
      errors.push("error");
    }else{
      //si hace match el quetamos el error
      emptyMessage(field);
    }
  }

  //todos los validations para state
  if(field.getAttribute("name") == "state"){
    if(field.value == ""){
      errorMessage(field, 'empty');
      field.focus();
      errors.push("error");
    }else {
      emptyMessage(field);
    }
  }

  ////////////////////////////////////////////////////
  //  AQUI LE PUEDES AGREGAR MAS VALIDATIONS
  ////////////////////////////////////////////////////

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

//Aqui podrias usar un script AJAX para mandar los datos a back-end
function sendData(){
  alert("Data sending...");
}
