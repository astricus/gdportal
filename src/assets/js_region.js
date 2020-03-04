$(function(){
	var tiles_url = L.Browser.retina ? '//tilessputnik.ru/{z}/{x}/{y}.png?tag=retina&from_api=v{apiVersion}{urlParams}' : '//tilessputnik.ru/{z}/{x}/{y}.png?from_api=v{apiVersion}{urlParams}';

	var map = L.map('region-map', { center: [55.754253, 37.620117], zoom: 10, attributionControl: false });
	
  L.tileLayer(tiles_url, {
		center: [55.75, 37.6167],
		zoom: 13,
		minZoom: 0,
		maxZoom: 19,
		urlParams: '', //  "&apikey="
		apiVersion: '0.3',
		attribution: '<a href="http://maps.sputnik.ru/">Спутник</a> | &copy; Ростелеком | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
	
	L.control.locate().addTo(map);
	
	var reg_layer = L.geoJson(region_json[SAILS_LOCALS.region.id], {
    style: function (feature) {
      return { stroke: true, fill: false, };
    }
	});
	var reg_layer_coordinates = [];
	reg_layer.eachLayer(function(layer){
		if (layer instanceof L.Polygon) {
			reg_layer_coordinates = reg_layer_coordinates.concat([layer.getLatLngs()]);			
		}
	});
	
	L.mask(reg_layer_coordinates, { stroke: true, color: '#00529C' }).addTo(map);
	
	var build_facilities_popup = function(facilities) {
		var output = '<div class="container">';
		_.forEach(facilities, function(f) {
			output += '<div class="item">'+(f.photos.length ? ('<span class="img" style="background-image: url(\'/facility_file/'+f.photos[0].id+'\')"></span>') : '')+'<span class="title"><a href="/facility/'+f.id+'">'+f.name+'</a></span><span class="address">'+f.address+'</span></div>';
		});
		output += '</div>';
		return output;
	}
	
	var facilities_markers = _(SAILS_LOCALS.facilities.rows).filter(function(f){ return f.lat && f.lon; }).map(function(f) {
		var category0 = SAILS_LOCALS.facility_categories[f.category].parent;
		
		var m = L.marker([f.lat, f.lon], { title: f.name, 
			icon: L.icon({
				iconUrl: '/images/direction_logo_small/'+category0+'.png',
				iconSize: [22, 22],
				iconAnchor: [11, 11],
				className: 'facility-marker category0-'+category0
			})
		});
		m.category0 = category0;
		m.facility = f.id;
		m.bindPopup(function (layer) {
			var facility = _.find(SAILS_LOCALS.facilities.rows, { id: layer.facility });
			return facility ? build_facilities_popup([facility]) : 'Не найдена информация об объекте. Это очень странно - свяжитесь с администратором.';
		}, { closeButton: false, minWidth: 300, maxWidth: 350, maxHeight: 300, className: 'facility-popup' });
		
		return m;
	}).value();
	
	var markers = L.markerClusterGroup({
		zoomToBoundsOnClick: false,
		spiderfyOnMaxZoom: false,
		showCoverageOnHover: false,
		maxClusterRadius: 60
	});
	markers.on('clusterclick', function (e) {
		// Mainly copy-paste from _zoomOrSpiderfy function but instead of spiderfy we show popup with list
		var cluster = e.layer,
		  bottomCluster = cluster;

		while (bottomCluster._childClusters.length === 1) {
			bottomCluster = bottomCluster._childClusters[0];
		}

		if (bottomCluster._zoom === this._maxZoom &&
			bottomCluster._childCount === cluster._childCount) {

			// All child markers are contained in a single cluster from this._maxZoom to this cluster.
			//cluster.spiderfy();
			var facilities = _(cluster.getAllChildMarkers()).map(function(m){ return _.find(SAILS_LOCALS.facilities.rows, { id: m.facility }); }).compact().value();
			if (facilities.length) {
				map.openPopup(build_facilities_popup(facilities), cluster.getLatLng(), { closeButton: false, minWidth: 300, maxWidth: 350, maxHeight: 300, className: 'facility-popup' });
			}			
		} else {
			cluster.zoomToBounds();
		}

		// Focus the map again for keyboard users.
		if (e.originalEvent && e.originalEvent.keyCode === 13) {
			this._map._container.focus();
		}		
	});	
	
  markers.addLayers(facilities_markers).addTo(map);
	
	map.fitBounds(reg_layer.getBounds());
	
	
	$('#reg-news').on('show-tab', function(){ news.reg_news_page = 1; })
	
	$('#region-map-nps h2').click(function(){
		$(this).toggleClass('active');
		
		markers.clearLayers();
		
		if (!$('#region-map-nps h2.active').length || $('#region-map-nps h2.active').length == $('#region-map-nps h2').length) {
			markers.addLayers(facilities_markers);
		} else {
			var enabled_categories = [];
			$('#region-map-nps h2.active').each(function(){ enabled_categories.push($(this).data('category0'));  });
			markers.addLayers( _.filter(facilities_markers, function(f){ return _.indexOf(enabled_categories, f.category0) != -1 ; }) );
		}
		
	});	

	// Search for objects near
	$('.objects-near').click(objects_near_button_hanlder);

	if (navigator.geolocation) {
		$('.objects-near').show();
	}	
	
});



news.regions = [SAILS_LOCALS.region.id_erru];
news.fed_news_page = 1;
