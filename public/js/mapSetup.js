export function initMap(latitude, longitude) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: latitude, lng: longitude },
    zoom: 18,
  });

  return map;
}
