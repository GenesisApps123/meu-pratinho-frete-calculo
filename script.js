const enderecoLoja =
"Meu Pratinho Várzea Alegre Ceará";

function usarLocalizacao(){

const resultado =
document.getElementById("resultado");

resultado.innerHTML =
"📍 Obtendo sua localização...";

if(!navigator.geolocation){

resultado.innerHTML =
"Seu navegador não suporta localização.";

return;

}

navigator.geolocation.getCurrentPosition(

async function(position){

const latitude =
position.coords.latitude;

const longitude =
position.coords.longitude;

const destino =
`${latitude},${longitude}`;

const geocoder =
new google.maps.Geocoder();

geocoder.geocode(
{
location:{
lat: latitude,
lng: longitude
}
},

function(results,status){

let enderecoCliente =
"Localização atual";

if(
status === "OK" &&
results &&
results.length > 0
){

enderecoCliente =
results[0].formatted_address;

}

calcularFrete(
destino,
enderecoCliente
);

}

);

},

function(error){

resultado.innerHTML =
"❌ Permita o acesso à localização.";

console.log(error);

},

{
enableHighAccuracy:true,
timeout:15000,
maximumAge:0
}

);

}

function calcularFrete(
destino,
enderecoCliente
){

const service =
new google.maps.DistanceMatrixService();

service.getDistanceMatrix(
{
origins:[enderecoLoja],
destinations:[destino],
travelMode:"DRIVING",
unitSystem:
google.maps.UnitSystem.METRIC
},

function(response,status){

if(status !== "OK"){

document.getElementById("resultado")
.innerHTML =
"Erro ao calcular frete.";

return;

}

const element =
response.rows[0].elements[0];

if(element.status !== "OK"){

document.getElementById("resultado")
.innerHTML =
"Não foi possível calcular.";

return;

}

const distanciaTexto =
element.distance.text;

const distanciaKm =
parseFloat(
distanciaTexto
.replace(" km","")
.replace(",",".")
);

const valorFrete =
distanciaKm * 5;

document.getElementById("resultado")
.innerHTML =
`
📍 <strong>Seu Local:</strong>

<br><br>

${enderecoCliente}

<br><br>

🚗 Distância:
${distanciaKm.toFixed(1)} KM

<br><br>

💰 Frete:
R$ ${valorFrete.toFixed(2)}
`;

const mensagem =
`Olá! Quero pedir no Meu Pratinho.%0A%0A📍 Local:%0A${enderecoCliente}%0A%0A🚗 Distância: ${distanciaKm.toFixed(1)} KM%0A💰 Frete: R$ ${valorFrete.toFixed(2)}`;

const linkWhatsapp =
`https://wa.me/5588996444527?text=${mensagem}`;

const botaoWhatsapp =
document.getElementById(
"botaoWhatsapp"
);

botaoWhatsapp.href =
linkWhatsapp;

botaoWhatsapp.style.display =
"block";

}

);

}
