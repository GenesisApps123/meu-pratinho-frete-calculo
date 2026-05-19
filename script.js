const enderecoLoja = "Várzea Alegre Ceará";

function calcularFrete(){

const destino = document.getElementById("endereco").value;

const service = new google.maps.DistanceMatrixService();

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

const distanciaTexto =
response.rows[0].elements[0].distance.text;

const distanciaKm =
parseFloat(distanciaTexto.replace(" km","").replace(",","."));

const valorFrete = distanciaKm * 5;

document.getElementById("resultado").innerHTML =
`
Distância: ${distanciaKm.toFixed(1)} KM
<br><br>
Frete: R$ ${valorFrete.toFixed(2)}
`;

}

);

}
