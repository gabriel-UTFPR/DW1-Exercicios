function Calcular() {
    let tipo = document.getElementById("inputTipo").checked;
    let frequencia= document.getElementById("inputCliente").checked;
    let tempo= parseInt(document.getElementById("inputTempo").value);
    let valorbase=5;
    let tarifa=0;
    let dias=parseInt(tempo/24);
    
    let aviso= document.getElementById("avisoErro");
    aviso.style.display = "none";
    aviso.innerHTML = "";

    if (tempo <= 0 || isNaN(tempo)) {
        aviso.innerHTML = "Insira um tempo válido maior que zero!";
        aviso.style.display = "block";
        return;
    }

    if(dias<1){
       tarifa= valorbase + (tempo-1)*2.5;
    }else if(dias==1){
        tarifa=60;
    }else{
        tarifa= dias*60+ valorbase+(tempo-(dias*24)-1)*2.5
    }
    
    if (tipo) {
        tarifa= tarifa+tarifa*0.25;
    }
    if (frequencia) {   
        tarifa= tarifa-tarifa*0.05;
    }
    
    document.getElementById("saida").innerHTML="R$"+tarifa.toFixed(2);

}
