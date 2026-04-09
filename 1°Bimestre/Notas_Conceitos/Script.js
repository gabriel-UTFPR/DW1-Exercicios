function funcaoMA() {
    debugger
    let conceito="";
    let aprovado= true;
    let Aprovamens="";
    let footermens="";
    let tfoot="";
    let footer = document.getElementById("footer");

    footer.classList.remove("erro");
    document.getElementById("mensagem").innerHTML = "Preencha os valores e calcule!";

    let ra = document.getElementById("inputRA").value;
    if (ra.length<8) {
        footer.classList.add("erro");
        document.getElementById("mensagem").innerHTML= "!!Erro no RA!!";
        document.getElementById("inputRA").focus();
        return;
    }  

    let nome = document.getElementById("inputNome").value;
    if (nome=="") {
        footer.classList.add("erro");
        document.getElementById("mensagem").innerHTML= "!!Erro no nome!!";
        document.getElementById("inputNome").focus();
        return;
    }  

    let n1= parseFloat(document.getElementById("inputN1").value);
    if (isNaN(n1) || n1 < 0 || n1 > 10) {
        footer.classList.add("erro");
        document.getElementById("mensagem").innerHTML= "!!Erro na nota 1!!";
        document.getElementById("inputN1").focus();
        return;
    }
    
    let n2= parseFloat(document.getElementById("inputN2").value);
    if (isNaN(n2) || n2 < 0 || n2 > 10) {
        footer.classList.add("erro");
        document.getElementById("mensagem").innerHTML= "!!Erro na nota 2!!";
        document.getElementById("inputN2").focus();
        return;
    }
    
    let n3= parseFloat(document.getElementById("inputN3").value);
    if (isNaN(n3) || n3 < 0 || n3 > 10) {
        footer.classList.add("erro");
        document.getElementById("mensagem").innerHTML= "!!Erro na nota 3!!";
        document.getElementById("inputN3").focus();
        return;
    }
    
    let n4= parseFloat(document.getElementById("inputN4").value);
    if (isNaN(n4) || n4 < 0 || n4 > 10) {
        footer.classList.add("erro");
        document.getElementById("mensagem").innerHTML= "!!Erro na nota 4!!";
        document.getElementById("inputN4").focus();
        return;
    }
    
    let Me= parseFloat(document.getElementById("inputME").value);
    if (isNaN(Me) || Me < 0 || Me > 10) {
        footer.classList.add("erro");
        document.getElementById("mensagem").innerHTML= "!!Erro na Média dos exercícios!!";
        document.getElementById("inputME").focus();
        return;
    }
    
    let MA = ((n1+n2*2+n3*3+n4*4+Me)/11).toFixed(2);
    
    if(MA>=9) {
        conceito='A';
        footermens="Excelente";
    } else if(MA>=7.5) {
        conceito='B';
        footermens="Boa";
    }else if(MA>=6) {
        conceito='C';
        footermens="Ok";
    }else if(MA>=4) {
        conceito='D';
        footermens="Vai estudar!!!";
        aprovado= false;
    }else{
        conceito='E';
        footermens="Você vai apanhar em casa ";
        aprovado= false;
    }

    Aprovamens = aprovado ? "Aprovado" : "Reprovado";


    document.getElementById("respAluno").innerHTML= nome;
    document.getElementById("respRA").innerHTML= ra;
    document.getElementById("respMA").innerHTML= MA;
    document.getElementById("respConceito").innerHTML= conceito;
    document.getElementById("respEstado").innerHTML= Aprovamens;
    document.getElementById("tfoot").innerHTML= footermens;

}