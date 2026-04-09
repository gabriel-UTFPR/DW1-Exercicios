
let golsA = 0;
let golsB = 0;

function alterarGols(time, valor) {
  if (time === 'A') {
    golsA = Math.max(0, golsA + valor);
    document.getElementById('golsA').innerText = golsA;
  } else {
    golsB = Math.max(0, golsB + valor);
    document.getElementById('golsB').innerText = golsB;
  }
}

function resetar() {
  golsA = 0;
  golsB = 0;
  document.getElementById('golsA').innerText = 0;
  document.getElementById('golsB').innerText = 0;
}
let segundos = 0;
let minutos = 0;
let horas = 0;

let intervalo = null;

function atualizarTempo() {
  segundos++;

  if (segundos == 60) {
    segundos = 0;
    minutos++;
  }

  if (minutos == 60) {
    minutos = 0;
    horas++;
  }

  let formatado =
    (horas < 10 ? "0" + horas : horas) + ":" +
    (minutos < 10 ? "0" + minutos : minutos) + ":" +
    (segundos < 10 ? "0" + segundos : segundos);

  document.getElementById("tempo").innerText = formatado;
}

function iniciarTempo() {
  if (intervalo) return; // evita duplicar intervalos
  intervalo = setInterval(atualizarTempo, 1000);
}

function pausarTempo() {
  clearInterval(intervalo);
  intervalo = null;
}

function resetarTempo() {
  pausarTempo();
  segundos = 0;
  minutos = 0;
  horas = 0;
  document.getElementById("tempo").innerText = "00:00:00";
}