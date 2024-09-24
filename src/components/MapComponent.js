import React, { useEffect, useRef, useState } from 'react';

const MapComponent = ({ onLocationSelect, pinCode }) => {
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      // Load Google Maps script dynamically
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = () => {
        const newMap = new window.google.maps.Map(mapRef.current, {
          center: markerPosition,
          zoom: 15,
        });
        setMap(newMap);

        const newMarker = new window.google.maps.Marker({
          position: markerPosition,
          map: newMap,
          draggable: true, // Make marker draggable
        });
        setMarker(newMarker);

        // Add click listener to the map
        newMap.addListener('click', (event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setMarkerPosition({ lat, lng });
          newMarker.setPosition({ lat, lng });
          onLocationSelect({ lat, lng });
        });

        // Add dragend listener to the marker
        newMarker.addListener('dragend', (event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setMarkerPosition({ lat, lng });
          onLocationSelect({ lat, lng });
        });
      };
      document.body.appendChild(script);
    };

    loadMap();
  }, []);

  useEffect(() => {
    // Geocode pin code to latitude and longitude
    if (pinCode) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pinCode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const location = data.results[0].geometry.location;
            console.log("Location is", data.results[0]);
            const newPosition = { lat: location.lat, lng: location.lng };
            setMarkerPosition(newPosition);
            if (map) {
              map.setCenter(newPosition); // Center the map to the new position
              marker.setPosition(newPosition); // Move the marker to the new position
            }
          } else {
            alert('Location not found for the given pin code.');
          }
        })
        .catch((error) => console.error('Error fetching location:', error));
    }
  }, [pinCode, map, marker]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default MapComponent;
