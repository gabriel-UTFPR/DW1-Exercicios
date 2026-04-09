let pontosA = 0;
let pontosB = 0;
let setsA = 0;
let setsB = 0;

function alterarPontos(time, valor) {
  if (time === 'A') {
    pontosA += valor;
    document.getElementById('pontosA').innerText = pontosA;
  } else {
    pontosB += valor;
    document.getElementById('pontosB').innerText = pontosB;
  }

  verificarSet();
}

function verificarSet() {
  if (pontosA >= 25 && pontosA - pontosB >= 2) {
    setsA++;
    resetPontos();
  }
  if (pontosB >= 25 && pontosB - pontosA >= 2) {
    setsB++;
    resetPontos();
  }

  document.getElementById('setsA').innerText = setsA;
  document.getElementById('setsB').innerText = setsB;
}

function resetPontos() {
  pontosA = 0;
  pontosB = 0;
  document.getElementById('pontosA').innerText = 0;
  document.getElementById('pontosB').innerText = 0;
}

function resetar() {
  pontosA = 0;
  pontosB = 0;
  setsA = 0;
  setsB = 0;

  document.getElementById('pontosA').innerText = 0;
  document.getElementById('pontosB').innerText = 0;
  document.getElementById('setsA').innerText = 0;
  document.getElementById('setsB').innerText = 0;
}