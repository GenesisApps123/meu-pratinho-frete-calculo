const enderecoLoja =
"Meu Pratinho Várzea Alegre Ceará";

function usarLocalizacao(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

function(position){

const latitude =
position.coords.latitude;

const longitude =
position.coords.longitude;

const geocoder =
new google.maps.Geocoder();

const latlng = {
lat: latitude,
lng: longitude
};

geocoder.geocode(
{
location: latlng
},

function(results,status){

if(status === "OK"){

if(results[0]){

const enderecoCliente =
results[0].formatted_address;

calcularFrete(
`${latitude},${longitude}`,
enderecoCliente
);

}

}

}

);

},

function(){

alert("Não foi possível obter sua localização.");

}

);

}else{

alert("Geolocalização não suportada.");

}

}

function calcularFrete(destino,enderecoCliente){

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

alert("Erro ao calcular frete.");
return;

}

const resultado =
response.rows[0].elements[0];

if(resultado.status !== "OK"){

alert("Não foi possível calcular.");
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
📍 <strong>Local:</strong><br>
${enderecoCliente}

<br><br>

🚗 ${distanciaKm.toFixed(1)} KM

<br><br>

💰 Frete: R$ ${valorFrete.toFixed(2)}
`;

const mensagem =
`Olá! Minha localização para entrega é:%0A%0A📍 ${enderecoCliente}%0A%0A🚗 Distância: ${distanciaKm.toFixed(1)} KM%0A💰 Frete: R$ ${valorFrete.toFixed(2)}`;

const linkWhatsapp =
`https://wa.me/5588996444527?text=${mensagem}`;

const botaoWhatsapp =
document.getElementById("botaoWhatsapp");

botaoWhatsapp.href =
linkWhatsapp;

botaoWhatsapp.style.display =
"block";

}

);

}
