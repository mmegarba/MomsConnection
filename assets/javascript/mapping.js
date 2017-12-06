function getGeoCoords(address){

geo.geocode({ 'address': myaddress }, function(data, status) {
    if (status == google.maps.GeocoderStatus.OK) { 
        var myylocation = data[0].geometry.location;
        lat = myylocation.lat();
        lng = myylocation.lng();
    }
});
}
