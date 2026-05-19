const enderecoLoja =
"Meu Pratinho Várzea Alegre Ceará";

function calcularFrete(destinoManual = null){

let destino;

if(destinoManual){

destino = destinoManual;

}else{

const endereco =
document.getElementById("endereco").value;

const tipo =
document.getElementById("tipoLocal").value;

if(tipo === ""){

alert("Escolha BAIRRO ou SÍTIO");
return;

}

if(endereco === ""){

alert("Digite o endereço.");
return;

}

destino =
`${endereco}, Várzea Alegre Ceará`;

}

const service =
new google.maps.DistanceMatrixService();

service.getDistanceMatrix(
{
origins:[enderecoLoja],
destinations:[destino],
travelMode:'DRIVING',
unitSystem: google.maps.UnitSystem.METRIC
},

function(response,status){

if(status !== "OK"){

alert("Erro ao calcular.");
return;

}

const resultado =
response.rows[0].elements[0];

if(resultado.status !== "OK"){

alert("Local não encontrado.");
return;

}

const distanciaTexto =
resultado.distance.text;

const distanciaKm =
parseFloat(
distanciaTexto
.replace(" km","")
.replace(",",".")
);

const valorFrete =
distanciaKm * 5;

document.getElementById("resultado").innerHTML =
`
🚗 ${distanciaKm.toFixed(1)} KM

<br>

💰 Frete: R$ ${valorFrete.toFixed(2)}
`;

}

);

}

function usarLocalizacao(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

function(position){

const latitude =
position.coords.latitude;

const longitude =
position.coords.longitude;

const destino =
`${latitude},${longitude}`;

calcularFrete(destino);

},

function(){

alert("Não foi possível obter localização.");

}

);

}else{

alert("Geolocalização não suportada.");

}

}
