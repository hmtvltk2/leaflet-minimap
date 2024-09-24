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

var layersControl = L.control.layers.minimap(baselayers, {}, {
  collapsed: false,
  position: 'bottomleft'

}).addTo(map);

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


