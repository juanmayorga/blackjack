let baraja = [];
const tipos = ['C','D','H','S'];
const letras = ['A','J','Q','K'];

const crearbaraja = () => {
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
  //console.log(baraja);
  baraja = _.shuffle(baraja);
  console.log(baraja);
  return baraja;
}

crearbaraja();

const pedirCarta = () => {

  if(baraja.length === 0) {
    throw 'No hay cartas en la baraja'
  }
  const carta = baraja.pop();
 
  //console.log('carta recibida: '+carta)
  console.log(baraja)
  return carta;
}

//pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0,carta.length -1);
  
  return (isNaN(valor)) ?
          (valor === 'A') ? 11 : 10
          : valor * 1;
}

const valor = valorCarta(pedirCarta());
console.log({valor})