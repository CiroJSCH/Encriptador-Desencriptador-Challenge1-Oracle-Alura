var botonEncriptar = document.querySelector (".boton-encriptar");
var botonDesencriptar = document.querySelector (".boton-desencriptar");
var textoIngresado = document.querySelector ("#ingresar-texto");
var mensajesIniciales = document.querySelector ("#mensajes-iniciales");
var mensajeResultado = document.querySelector ("#mensaje-resultado");
var botonCopiar = document.querySelector (".boton-copiar");
var advertencia = document.querySelector (".advertencia");

mensajeResultado.classList.add("invisible");
botonCopiar.classList.add("invisible");


botonEncriptar.addEventListener ("click", function() {

    mensajeResultado.textContent = "";

    let texto = textoIngresado.value;
    var letras = texto.split ("");

    mensajesIniciales.remove();

    mensajeResultado.classList.remove("invisible");
    mensajeResultado.classList.add("visible");

    botonCopiar.classList.remove("invisible");
    botonCopiar.classList.add("botonCopiarVisible");

    mensajeResultado.textContent = encriptarTexto (letras);

});

botonDesencriptar.addEventListener ("click", function(){

    mensajeResultado.textContent = "";
    let mensajeEncriptado = textoIngresado.value;
    mensajesIniciales.remove();

    mensajeResultado.classList.remove("invisible");
    mensajeResultado.classList.add("visible");

    botonCopiar.classList.remove("invisible");
    botonCopiar.classList.add("botonCopiarVisible");


    if (decodificar(mensajeEncriptado) === false) {

        mensajeResultado.textContent = textoIngresado.value;

    }

    else {

        mensajeResultado.textContent = decodificar (mensajeEncriptado);

    }

});

function copiarTexto(){

    var contenido= document.getElementById('mensaje-resultado').innerHTML;

    navigator.clipboard.writeText(contenido)
    .then(() => {
    console.log("Copiado")
})
    .catch(err => {
    console.log('Algo salió mal', err);
})
 
}

textoIngresado.addEventListener ("input", function(){

    var cadena2 = "";
    var cadena1 = textoIngresado.value;

    if (!validarEntrada (cadena1)) {

        cadena2 = cadena1.slice(0, -1);
        textoIngresado.value = cadena2;
        //console.log ("Mal")
        advertencia.classList.add ("invalido");
        
    }

    else {

        cadena2 = cadena1;
        advertencia.classList.remove ("invalido");
        //console.log ("Bien")

    }


});

function codigo (letras) {

    switch (letras) {

        case 'a': return 'ai';
        case 'e': return 'enter';
        case 'i': return 'imes';
        case 'o': return 'ober';
        case 'u': return 'ufat';

        default: return letras;

    }

}

function encriptarTexto (letras) {

    var resultado = "";

    for (const c of letras) {

        resultado += codigo (c);

    }

    return resultado;

}

function decodificar (mensajeEncriptado) {

    var textoDesencriptado = "";

    for (var i = 0; i < mensajeEncriptado.length; i++) {

        switch (mensajeEncriptado [i]) {

            case 'a':  //ai

                if (mensajeEncriptado [i+1] === 'i') {

                    textoDesencriptado += 'a';
                    i+=1; //Avanzo hasta el fin del 'ai'

                }

                else {return false;}

                break;

            case 'e':  //enter

                if (mensajeEncriptado [i+1] === 'n' &&
                    mensajeEncriptado [i+2] === 't' &&
                    mensajeEncriptado [i+3] === 'e' &&
                    mensajeEncriptado [i+4] === 'r') {

                    textoDesencriptado += 'e';
                    i+=4; //Avanzo hasta el fin del 'enter'

                }

                else {return false;}

                break;

            case 'i':

                if (mensajeEncriptado [i+1] === 'm' &&
                    mensajeEncriptado [i+2] === 'e' &&
                    mensajeEncriptado [i+3] === 's') {

                    textoDesencriptado += 'i'; //Avanzo hasta el fin del 'imes'
                    i+=3;

                }

                else {return false;}

                break;

            case 'o':

                if (mensajeEncriptado [i+1] === 'b' &&
                    mensajeEncriptado [i+2] === 'e' &&
                    mensajeEncriptado [i+3] === 'r') {

                    textoDesencriptado += 'o'; //Avanzo hasta el fin del 'ober'
                    i+=3;

                }

                else {return false;}

                break;

            case 'u':

                if (mensajeEncriptado [i+1] === 'f' &&
                    mensajeEncriptado [i+2] === 'a' &&
                    mensajeEncriptado [i+3] === 't') {

                    textoDesencriptado += 'u';
                    i+=3; //Avanzo hasta el fin del 'ufat'

                }

                else {return false;}

                break;
            
            default:

                textoDesencriptado += mensajeEncriptado [i];

        } //switch

    } //for

    return textoDesencriptado;

}

function validarEntrada(cadena) {
    const noPermitido = /[^a-z ]/;
    return !noPermitido.test(cadena);
  }
