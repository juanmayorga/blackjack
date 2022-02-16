(() => {
  'use strict'

  let baraja = [];
  const tipos  = ['C','D','H','S'],
        letras = ['A','J','Q','K'];

  let puntosJugador    = 0,
      puntosComputador = 0;

  const btnPedirCarta = document.querySelector('#btnPedirCarta'),
        btnDetener    = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevoJuego');

  const divCartaJugador = document.querySelector('#carta-jugador'),
        divCartaComputadora = document.querySelector('#carta-computador'),
        puntosHTML = document.querySelectorAll('small');

  const crearbaraja = () => {
    baraja = [];
    for (let i=2; i<=10; i++){
      for (let tipo of tipos){
        baraja.push(i + tipo)
      }
    }

    for (let tipo of tipos){
      for(let a of letras){
        baraja.push(a + tipo);
      }
    }  
        
    return _.shuffle(baraja);
  }

  const pedirCarta = () => {

    if(baraja.length === 0) {
      throw 'No hay cartas en la baraja'
    }
    
    return baraja.pop(); 
  }

  const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length -1);
    
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
  }

  const acumularPuntaje = () => {
    
  }

  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();
      puntosComputador = puntosComputador + valorCarta(carta);
      puntosHTML[1].innerText = puntosComputador;

      const img = document.createElement('img');
      img.src = `assets/cartas/${carta}.png`;
      img.classList.add('carta');
      divCartaComputadora.append(img)

      if(puntosMinimos > 21){
        break;
      }
    }while((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout( () => {
      if(puntosComputador === puntosMinimos){
        alert('Nadie ganó!');
      }else if(puntosMinimos > 21){
        alert('Ganó la computadora!');
      } else if(puntosComputador > 21) {
        alert('Ganaste!!!!');
      } else {
        alert('Ganó la computadora!')
      }
    }, 20);

    
  }

  //Eventos 
  btnPedirCarta.addEventListener('click', () => {

    if(baraja.length === 0){
      crearbaraja();
    }

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const img = document.createElement('img');
    img.src = `assets/cartas/${carta}.png`;
    img.classList.add('carta');
    divCartaJugador.append(img)

    if (puntosJugador > 21){
      btnPedirCarta.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21){
      btnPedirCarta.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
      
    }
    
  });

  btnDetener.addEventListener('click', () => {
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

    if(puntosComputador > puntosJugador){
      btnDetener.disabled = true;
    }
  });

  btnNuevoJuego.addEventListener('click', () => {
    console.clear();
    
    baraja = [];
    puntosJugador    = 0;
    puntosComputador = 0;
    puntosHTML[0]    = 0;
    puntosHTML[1]    = 0;

    puntosHTML[0].innerText = puntosJugador;
    puntosHTML[1].innerText = puntosComputador;

    divCartaJugador.innerHTML = '';
    divCartaComputadora.innerHTML = '';

    btnDetener.disabled = false;
    btnPedirCarta.disabled = false;

  });
})();



