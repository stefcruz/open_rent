function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 53.350631935496004,
            lng: -6.2599891096804585 },
        zoom: 12,
    });

    // Set bounds within Dublin, source https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object
    let defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(53.350631935496004, -6.2599891096804585),
        new google.maps.LatLng(53.350631935496004, -6.2599891096804585));
    let options = {
        bounds: defaultBounds,
        strictBounds: false,
        types: ['address']
    };

    //Adding markers
    let latLong = document.querySelectorAll(".js-lat-long")
    let latValue = document.getElementsByClassName("js-lat")
    let longValue = document.getElementsByClassName("js-long")
    let price = document.getElementsByClassName("js-price")
    let addressOne = document.getElementsByClassName("js-address-1")
    let addressTwo = document.getElementsByClassName("js-address-2")
    let type = document.getElementsByClassName("js-type")
    // let content =
    //     '<div class="infowindow">' +
    //         '<p class="infowindow__price">' + document.getElementsByClassName("js-price") + '</p>' +
    //         '<p class="infowindow__address">' + document.getElementsByClassName("js-address-1") + '</p>' +
    //         '<p class="infowindow__address">' + document.getElementsByClassName("js-address-2") + '</p>' +
    //         '<p class="infowindow__type">' + document.getElementsByClassName("js-type") + '</p>' +
    //     '</div>';

    //Convert lat and long to float, source https://stackoverflow.com/questions/20585055/how-to-fix-uncaught-invalidvalueerror-setposition-not-a-latlng-or-latlnglitera/20585117
    for (let i = 0; i < latLong.length; i++) {
        const marker = new google.maps.Marker({
            position: {
                lat: parseFloat(latValue[i].innerHTML),
                lng: parseFloat(longValue[i].innerHTML) },
            map: map,
            });

        let content =
            '<div class="infowindow">' +
            '<p class="infowindow__price">' + price[i].innerHTML + '</p>' +
            '<p class="infowindow__address">' + addressOne[i].innerHTML + '</p>' +
            '<p class="infowindow__address">' + addressTwo[i].innerHTML + '</p>' +
            '<p class="infowindow__type">' + type[i].innerHTML + '</p>' +
            '</div>';

        addInfoWindow(marker, content)
    }


    //Add Info Window, source https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
    function addInfoWindow(marker, content) {
        const infowindow = new google.maps.InfoWindow({
            content: content,
        });
        marker.addListener("click", () => {
            infowindow.open(marker.get("map"), marker);
        });
    }

    // Auto complete address
    const input = document.getElementById("address_1");
    const autocomplete = new google.maps.places.Autocomplete(input, options);
}

