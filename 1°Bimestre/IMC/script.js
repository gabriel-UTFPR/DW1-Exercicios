function funcaoCalcular() {
    debugger
    let Peso = parseFloat(document.getElementById("inputPeso").value);
    let Altura = parseFloat(document.getElementById("inputAltura").value);
    
 if (Peso>0 &&Altura>0) {
        
    let IMC =Peso/ (Altura * Altura);
    let Classificação ="";

    let footer = document.getElementById("footer");
    let mensagem = document.getElementById("mensagem");

    if (IMC < 18.5) {
        Classificação="Abaixo do peso";
        footer.classList.remove("erro");
        mensagem.innerHTML = "Cálculo realizado com sucesso";
       
    } else if(IMC<24.9) {
        Classificação="Peso normal";
        footer.classList.remove("erro");
        mensagem.innerHTML = "Cálculo realizado com sucesso";

    }else if(IMC<34.9){
        Classificação="Obesidade grau I";
        footer.classList.remove("erro");
        mensagem.innerHTML = "Cálculo realizado com sucesso";
    }else if(IMC<39.9){
        Classificação="Obesidade grau II";
        footer.classList.remove("erro");
        mensagem.innerHTML = "Cálculo realizado com sucesso";
    }else{
        Classificação="Planeta Anão";
        footer.classList.remove("erro");
        mensagem.innerHTML = "Cálculo realizado com sucesso";
    }

    document.getElementById("respIMC").innerHTML = IMC.toFixed(2);
    document.getElementById("respClass").innerHTML = Classificação;
  }else{
        footer.classList.add("erro");
        mensagem.innerHTML = "Erro nos dados";
    }
}