import { searchBarVue } from './searchBar.es6';
import loadGoogleMapsAPI from 'load-google-maps-api';
import { config } from './config/google_map_config.es6';
loadGoogleMapsAPI(config).then(googleMaps => {
  // return a googleMaps class here
  let mapProp = {
    center: new googleMaps.LatLng(37.773972,-122.431297),
    zoom: 12,
  };
  let map = new googleMaps.Map(document.getElementById("googleMap"),mapProp);
  let bounds = new googleMaps.LatLngBounds();
  let infowindow = new googleMaps.InfoWindow;

  let autocomplete = new googleMaps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('location')), {
      types: ['geocode']
  });
}).catch((err) => {
  console.error("google maps error>>>>", err);
});
