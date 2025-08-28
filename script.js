// Inicializar mapa
function initMap(lat, lon) {
  let mapDiv = document.getElementById("map");
  mapDiv.innerHTML = `<iframe 
    width="100%" height="250" style="border:0" loading="lazy"
    src="https://www.google.com/maps?q=${lat},${lon}&hl=pt&z=16&output=embed">
  </iframe>`;
}

// Pegar localização do usuário
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => initMap(pos.coords.latitude, pos.coords.longitude),
    () => alert("Não foi possível acessar sua localização.")
  );
} else {
  alert("Seu navegador não suporta geolocalização.");
}

// Função para registrar denúncia
function registrarDenuncia() {
  let foto = document.getElementById("foto").files[0];
  let descricao = document.getElementById("descricao").value;

  if (!foto) {
    alert("Por favor, tire uma foto do problema.");
    return;
  }

  let reader = new FileReader();
  reader.onload = function(e) {
    let lista = document.getElementById("listaDenuncias");
    let item = document.createElement("li");
    item.innerHTML = `
      <img src="${e.target.result}" width="100"><br>
      <strong>Descrição:</strong> ${descricao || "Não informada"}
    `;
    lista.appendChild(item);

    // Limpar formulário
    document.getElementById("denunciaForm").reset();
  };
  reader.readAsDataURL(foto);
}
