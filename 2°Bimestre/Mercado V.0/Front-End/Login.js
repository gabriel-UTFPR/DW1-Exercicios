function Login() {
    
    let inputUsuario=document.getElementById("usuario");
    let inputSenha= document.getElementById("senha");

    let usuario=inputUsuario.value;
    let senha=inputSenha.value;

    if (usuario=="gabriel" && senha=="1234" ) {
        window.location.href="Inicio.html"
    } else if(usuario=="rjhalmeman" && senha=="professor"){
        window.location.href="Inicio.html"
    }else{

        alert("Usuário ou senha inválido, tente novamente")
        inputUsuario.value="";
        inputSenha.value="";
        inputUsuario.focus();
        return;
    }
}