var osm_reg_ids = {"22": -144764, "28": -147166, "29": -140337, "30": -112819, "31": -83184, "32": -81997, "33": -72197, "34": -77665, "35": -115106, "36": -72181, "79": -147167, "75": -145730, "37": -85617, "38": -145454, "7": -109879, "39": -103906, "40": -81995, "41": -151233, "9": -109878, "42": -144763, "43": -115100, "44": -85963, "23": -108082, "24": -190090, "45": -140290, "46": -72223, "47": -176095, "48": -72169, "49": -151228, "50": -51490, "51": -2099216, "83": -274048, "52": -72195, "53": -89331, "54": -140294, "55": -140292, "56": -77669, "57": -72224, "58": -72182, "59": -115135, "25": -151225, "60": -155262, "1": -253256, "4": -145194, "2": -77677, "3": -145729, "5": -109876, "6": -253252, "8": -108083, "10": -393980, "11": -115136, "91": -3568873, "12": -115114, "13": -72196, "14": -151234, "15": -110032, "16": -79374, "17": -145195, "19": -190911, "61": -85606, "62": -71950, "63": -72194, "64": -72193, "65": -394235, "66": -79379, "67": -81996, "26": -108081, "68": -72180, "69": -2095259, "70": -140295, "71": -81993, "72": -140291, "18": -115134, "73": -72192, "27": -151223, "86": -140296, "74": -77687, "20": -109877, "21": -80513, "87": -151231, "89": -191706, "76": -81994, "77": -102269, "78": -337422, "92": -1574364};

var mq = {
  mobile: (window.matchMedia && window.matchMedia('screen and (max-width: 959px)')) || { matches: false },
  norm: (window.matchMedia && window.matchMedia('screen and (min-width: 960px)')) || { matches: true },
  wide: (window.matchMedia && window.matchMedia('screen and (min-width: 1920px)')) || { matches: false },
};

function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}


// Extend current map implementation
if (typeof(jvm) !== 'undefined') jvm.Map.prototype.getRegionCentroid = function(region){
  if(typeof region == "string")
      region = this.regions[region.toUpperCase()];

  var bbox = region.element.shape.getBBox(),
		xcoord = (((bbox.x + bbox.width/2)+this.transX)*this.scale),
		ycoord = (((bbox.y + bbox.height/2)+this.transY)*this.scale);
  return this.pointToLatLng(xcoord, ycoord);    
}

function objects_near_button_hanlder(){
	var button = $(this);
	if (button.hasClass('searching')) return false;
	button.toggleClass('searching');
	navigator.geolocation.getCurrentPosition(function(position){
		$.ajax({
			url: 'https://open.mapquestapi.com/geocoding/v1/reverse',
			data: {
				key: 'a7sJtJoUuhMvWUuAXY60lSgcE9G9e4iA',
				location: position.coords.latitude+','+position.coords.longitude,
				thumbMaps: false,
			},
			type: 'GET',
			dataType: 'jsonp',
		})
			.then(function(response) {
				var addr_parts = [];
				if (response && response.results && response.results && response.results[0] && response.results[0].locations && response.results[0].locations[0]) {
					var loc = response.results[0].locations[0];
					if (loc.adminArea2) addr_parts.push(loc.adminArea2);
					if (loc.adminArea3) addr_parts.push(loc.adminArea3);
					if (loc.adminArea4) addr_parts.push(loc.adminArea4);
					if (loc.adminArea5) addr_parts.push(loc.adminArea5);
					if (loc.adminArea6) addr_parts.push(loc.adminArea6);
					if (loc.street) addr_parts.push(loc.street);
				}
				return addr_parts.length ? addr_parts.join(', ') : (position.coords.latitude+', '+position.coords.longitude);
			})
			.catch(function(jqXHR, status, error){
				return position.coords.latitude+', '+position.coords.longitude;
			})
			.always(function(address){
				//window.location = '/search?region='+SAILS_LOCALS.region.id+'&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&address='+address;
				window.location = '/search?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&address='+address;
			});			
		
	});
	return false;
}

$(function(){

  var orig_width = $(window).width();
  var orig_height = $(window).height();

  $(window).resize(function () {
    // Check if resize event is real - see https://stackoverflow.com/questions/17328742/mobile-chrome-fires-resize-event-on-scroll i.e.
    if ($(window).width() != orig_width && $(window).height() != orig_height) {
      orig_width = $(window).width();
      orig_height = $(window).height();
      //header_offset = header.offset().top;
      mq = {
        mobile: (window.matchMedia && window.matchMedia('screen and (max-width: 959px)')) || { matches: false },
        norm: (window.matchMedia && window.matchMedia('screen and (min-width: 960px)')) || { matches: true },
        wide: (window.matchMedia && window.matchMedia('screen and (min-width: 1920px)')) || { matches: false },
      };
    }
  });

	// Fix Mozilla bug
	$.extend($.fn.disableTextSelect = function() {
		return this.each(function(){ if($.browser.mozilla){ $(this).css('MozUserSelect','none'); } else if($.browser.msie){ $(this).bind('selectstart',function(){return false;}); } else { $(this).mousedown(function(){return false;}); }  });
	});

	$('.facility-search-region').select2({
		sorter: function(data) {
      return data.sort(function (a, b) {
				if (a.text == 'Все регионы') return -1;
				if (b.text == 'Все регионы') return 1;
        if (a.text > b.text) {
          return 1;
        }
        if (a.text < b.text) {
          return -1;
        }
        return 0;
      });
		}		
	});
	$('#facility-search-category0').select2().on('change', function(e) {
		var value = $(this).val();
    if (!value.length) return;
		var select_category1 = $('#facility-search-category1');
    select_category1.empty().val(null);
		if (value > 0) {
			var options = _.filter(SAILS_LOCALS.facility_categories, function(c){ return c.level == 1 && c.parent == value; });
			if (options.length > 1) {
				select_category1.append(new Option('Все типы', 0, false, true));
				_.forEach(options, function(o) {
					select_category1.append(new Option(o.name, o.id));
				});
				select_category1.attr("disabled", false);
			} else {
				select_category1.attr("disabled", true);
			}
		} else {
			select_category1.attr("disabled", true);
		}
		
	});
	$('.facility-search-np').select2();
	$('#facility-search-category1').select2();



	$('#facility-search-text').typeahead({
		debug: true,
		maxItem: 0,
		minLength: 3,
		dynamic: true,
		delay: 250,
		filter: false,
		highlight: 'any',
		group: {
			key: 'type',
			template: function(item){
				var headers = {
					facility: 'Объекты',
					np: 'Нацпроекты',
					region: 'Регионы',
					category: 'Направления',
					type: 'Типы',
				};
				
				return headers[item.type];
			}
		},
		href: '{{href}}',
		template: function (query, item) {
			var template = '';
			
			if (item.image) template += '<span class="image"><img src="'+item.image+'"></span>';
			template += '<span class="title">'+item.title+'</span>';
			if (item.desc) template += '<span class="desc">'+item.desc+'</span>';
			
			return template;
		},
		source: { search: {
			ajax: {
				url: '/search',
				data: { text: '{{query}}' },
				callback: {
          done: function (data, textStatus, jqXHR) {
						var output = [];

						// Prepare NPs
						_.forEach(data.result_nps, function (f) {
							output.push({
								type: 'np',
								title: f.name,
								image: '/images/np_logo/'+f.id+'.png',
								href: '/search?np='+f.id
							});
						});

						// Prepare regions
						_.forEach(data.result_regions, function (f) {
							output.push({
								type: 'region',
								title: f.name,
								image: '/images/regions_signs_small/'+f.id+'.png',
								href: '/search?region='+f.id
							});
						});

						// Prepare categories0
						_.forEach(data.result_facility_categories0, function (f) {
							output.push({
								type: 'category',
								title: f.name,
								image: null,
								href: '/search?category0='+f.id
							});
						});

						// Prepare categories1
						_.forEach(data.result_facility_categories1, function (f) {
							output.push({
								type: 'type',
								title: f.name,
								image: null,
								href: '/search?category0='+f.parent+'&category1='+f.id
							});
						});
						
						// Prepare facilities
						_.forEach(data.facilities.rows || [], function (f) {
							output.push({
								type: 'facility',
								title: f.name,
								desc: f.address,
								image: f.photos.length ? ('/facility_file/'+f.photos[0].id) : null,
								href: '/facility/'+f.id
							});
						});
						
            return output;
          },
				}
			}
		}},
		
	});

	// Common tabs
	$('.tabs > h3, .tabs-carousel > h3').click(function(){
		$(this).siblings('h3').removeClass('active').each(function(){ $($(this).data('target')).trigger('hide-tab'); });
		$($(this).addClass('active').data('target')).trigger('show-tab');
	}).each(function(){
		$($(this).data('target')).on('show-tab', function(){ $(this).addClass('active'); }).on('hide-tab', function(){ $(this).removeClass('active'); });
	});
	
	// Help overlay
	$('#how-find').click(function(){
		$('html').scrollTop(0);
		$('body').addClass('no-scroll');
		$('.help-overlay').fadeIn();
		return false;
	});
	$('.help-overlay a.close').click(function(){
		$('.help-overlay').fadeOut();
		$('body').removeClass('no-scroll');
		return false;
	});
	
	// Appeal page
	$('#vote-important a').hover(function(){ $('#vote-important .info').fadeIn(); }, function(){ $('#vote-important .info').fadeOut(); });
	$('#vote-important a').click(function(){
		var self = this;
		
		swal.fire({
			title: 'Уверены, что это действительно важный вопрос?',
			text: "Голосование за обращение.",
			type: 'question',
			showCancelButton: true,
			confirmButtonText: 'Да, вопрос очень важен',
			cancelButtonText: 'Нет, вопрос не так уж и важен'
		}).then(function(result) {
      if (result.value) {
				return axios.post('/appeal/mark', { appeal: SAILS_LOCALS.appeal.id, _csrf: SAILS_LOCALS._csrf })
					.then(function (response) {
						if (response.data.appeal_marks_count) {
							$(self).find('.value').text(response.data.appeal_marks_count);
						}

						if (!_.isEmpty(response.data.messages)) {
              return swal.fire({
                type: 'error',
                title: 'Ошибка!',
                text: _.map(response.data.messages, 'text').join('\n\n')
              });
						}
						
						
					});
      }
		})						
		
		return false;
	});
	
	$('#user-block a.login').click(function(){
		var pos = $(this).position();
		var left = pos.left - (500 - $(this).width())/2;
		var top = pos.top + $(this).height() + 80;
		window.open(this.href,'','menubar=no,toolbar=no,location=no,personalbar=no,dependent=yes,minimizable=no,dialog=yes,resizable=no,scrollbars=yes,height=745,width=500,left='+left+',top='+top);
		return false;
	});
	
});

