import './style.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet.layerscontrol-minimap/control.layers.minimap.css'
import 'leaflet'
import 'leaflet.layerscontrol-minimap'

var map = L.map('map', {
  zoomControl: false,
  center: [10.82369, 106.79603],
  zoom: 11
});


var baselayers = {
  'OpenStreetMap': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
  }),
  "Bản đồ nền TPHCM": L.tileLayer("https://gis-tpthuduc.tphcm.gov.vn/map/proxy?image=https://bando.tphcm.gov.vn/service/gisp/tile/raster/{z}/{x}/{y}")

};



var filter = function () {
  var hash = window.location.hash;
  var filterIndex = hash.indexOf('filter=');
  if (filterIndex !== -1) {
    var filterString = hash.substr(filterIndex + 7).trim();
    layersControl.filter(filterString);
  }
};

baselayers.OpenStreetMap.addTo(map);

L.DomEvent.on(window, 'hashchange', filter);
filter();

var mapControl = L.control({
  collapsed: false,
  position: 'bottomleft' });

mapControl.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'map-control');
    div.innerHTML = '<button id="toggleMap" class= "SelectOption">Lớp bản đồ</button>';
    return div;
};

mapControl.addTo(map);

var mapOptionsVisible = false;

document.getElementById('toggleMap').addEventListener('mouseover', function() {
    
    if (!mapOptionsVisible) {
        var optionsDiv = L.DomUtil.create('div', 'map-options');
        optionsDiv.innerHTML = `
            <div class = "option" >
            <button id="openStreetMap"></button>
            <label for="openStreetMap" class= "nameMap">Open Street Map</label>
            </div>
             <div class = "option">
            <button id="tphcmMap"></button>
            <label for="tphcmMap" class= "nameMap">Bản đồ nền TPHCM</label>
            </div>
            
        `;
        map.getContainer().appendChild(optionsDiv);
        mapOptionsVisible = true;

        document.getElementById('openStreetMap').addEventListener('click', function() {
            baselayers.OpenStreetMap.addTo(map);
            map.removeLayer(baselayers["Bản đồ nền TPHCM"]);
            optionsDiv.remove();
            mapOptionsVisible = false;
        });

        document.getElementById('tphcmMap').addEventListener('click', function() {
            baselayers["Bản đồ nền TPHCM"].addTo(map);
            map.removeLayer(baselayers.OpenStreetMap);
            optionsDiv.remove();
            mapOptionsVisible = false;
        });
    }
});

document.getElementById('toggleMap').addEventListener('mouseout', function() {
  if (mapOptionsVisible) {
      mouseOutTimeout = setTimeout(function() {
          var optionsDiv = document.querySelector('.map-options');
          if (optionsDiv) {
              optionsDiv.remove();
              mapOptionsVisible = false;
          }
      }, 5000);
  }
})

