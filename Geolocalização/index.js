let coordenadas = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    coordenadas.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  coordenadas.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  const KEY = "AIzaSyCHRsle-yRLf-vqg1WlDPRqHhDed2H7BNU";
      let LAT = position.coords.latitude;
      let LNG = position.coords.longitude;
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let parts = data.results[0].address_components;
          document.body.insertAdjacentHTML(
            "beforeend",
            `<p>Endereço: ${data.results[0].formatted_address}</p>`
          );
          parts.forEach(part => {
            if (part.types.includes("country")) {
              //we found "country" inside the data.results[0].address_components[x].types array
              document.body.insertAdjacentHTML(
                "beforeend",
                `<p>País: ${part.long_name}</p>`
              );
            }
            if (part.types.includes("administrative_area_level_1")) {
              document.body.insertAdjacentHTML(
                "beforeend",
                `<p>Estado: ${part.long_name}</p>`
              );
            }
            if (part.types.includes("administrative_area_level_3")) {
              document.body.insertAdjacentHTML(
                "beforeend",
                `<p>LEVEL 3: ${part.long_name}</p>`
              );
            }
          });
        })
        .catch(err => console.warn(err.message));
}
