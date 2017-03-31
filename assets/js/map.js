function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  let autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('location')), {
      types: ['geocode']
    });
}

function initMap() {

	let mapProp= {
	    center: new google.maps.LatLng(37.773972,-122.431297),
	    zoom: 12,
	};

	let map =new google.maps.Map(document.getElementById("googleMap"),mapProp);
	let bounds = new google.maps.LatLngBounds();

  let infowindow = new google.maps.InfoWindow;

	let marker;

  // Loop through our array of markers & place each one on the map  
  for( var i = 0; i < markers.length; i++ ) {
    let position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
    });

 	// Allow each marker to have an info window    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infoWindow.setContent("<h6>" + markers[i][0] + "</h6>");
            infoWindow.open(map, marker);
        }
    })(marker, i));

    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }

  jobsAppliedDB.on("value", function(snapshot){
    let appliedJobs = snapshot.val() || {};
    _.forEach(appliedJobs, function(job, key){
      if (job && job.latitude && job.longitude) {
        let newmarker = new google.maps.Marker({
          position: new google.maps.LatLng(job.latitude,job.longitude),
          map: map,
          title: job.company
        });
        newmarker.addListener('click', function() {
          infowindow.setContent("<h6>" + newmarker.title + "</h6>");
          infowindow.open(map, newmarker);
        });
      }
    })
  });
}
