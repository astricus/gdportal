import L from 'leaflet';

export const geoJSONStyle = (feature, label) => {
    // console.log("label = ", label);

    // численность населения (district) обводка 0.2 #599ce3 по значениям population
    if (label === "menu.admin_map.people-quan") {
        const { population } = feature.properties;
        if (population > 0 && population <= 2500) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#edf8fb",
                stroke: true,
            }
        }
        if (population > 2500 && population <= 5000) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#b2e2e2",
                stroke: true,
            }
        }
        if (population > 500 && population <= 10000) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#66c2a4",
                stroke: true,
            }
        }
        if (population > 10000 && population <= 15000) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#2ca25f",
                stroke: true,
            }
        }
        if (population > 15000 && population <= 65000) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#006d2c",
                stroke: true,
            }
        }
    }

    // плотность (district) обводка 0.2 #599ce3  по значениям density:
    if (label === "menu.admin_map.people-dens") {
        const { density } = feature.properties;
        if (density > 0 && density <= 0.05) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#eff3ff",
                stroke: true,
            }
        }
        if (density > 0.05 && density <= 0.1) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#bae0f5",
                stroke: true,
            }
        }
        if (density > 0.1 && density <= 0.15) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#6baed6",
                stroke: true,
            }
        }
        if (density > 0.15 && density <= 0.5) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#3182bd",
                stroke: true,
            }
        }
        if (density > 0.5 && density <= 1.6) {
            return {
                weight: 2,
                fillOpacity: 0.7,
                color: "#599ce3",
                fillColor: "#08519c",
                stroke: true,
            }
        }
    }

    // просто district обводка обводка 0.2 #599ce3  заливка #27a5e3 прозрачность 0.3:
    if (label === "menu.admin_map.regions") {
        return {
            weight: 2,
            fillOpacity: 0.3,
            color: "#599ce3",
            fillColor: "#27a5e3",
            stroke: true,
        }
    }

    // municipal_structure обводка 0.2 #1f78b4 заливка #4980bb прозрачность 0.6:
    if (label === "menu.admin_map.munic") {
        return {
            weight: 2,
            fillOpacity: 0.3,
            color: "#1f78b4",
            fillColor: "#4980bb",
            stroke: true,
        }
    }

    // для functional_zone и territorial_zone одинаково обводка 0.1 #2e3e3e
    if (label === "menu.city_docs.gp" || label === "menu.city_docs.pzz") {
        const { info_obj } = feature.properties;
        switch (info_obj) {
            case 'Ж1':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#ffe4af",
                    stroke: true,
                }
            case 'Ж2':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#fdbfa8",
                    stroke: true,
                }
            case 'Ж3':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#ff9e98",
                    stroke: true,
                }
            case 'И1':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#c5a9a5",
                    stroke: true,
                }
            case 'О1':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#bebada",
                    stroke: true,
                }
            case 'О2':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#bebada",
                    stroke: true,
                }
            case 'О3':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#bebada",
                    stroke: true,
                }
            case 'О4':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#bebada",
                    stroke: true,
                }
            case 'П1':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#d3b3b8",
                    stroke: true,
                }
            case 'П2':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#d3b3b8",
                    stroke: true,
                }
            case 'Р1':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#d1ddd1",
                    stroke: true,
                }
            case 'Р2':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#8aaa9f",
                    stroke: true,
                }
            case 'Р3':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#b3de69",
                    stroke: true,
                }
            case 'Р4':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#6bb077",
                    stroke: true,
                }
            case 'Р5':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#75a327",
                    stroke: true,
                }
            case 'Р6':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#75a327",
                    stroke: true,
                }
            case 'Р7':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#75a327",
                    stroke: true,
                }
            case 'СпЗ':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#feffed",
                    stroke: true,
                }
            case 'Сх1':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#feffed",
                    stroke: true,
                }
            case 'Сх2':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#feffed",
                    stroke: true,
                }
            case 'Сх3':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#feffed",
                    stroke: true,
                }
            case 'Т1':
                return {
                    weight: 1,
                    fillOpacity: 0.7,
                    color: "#2e3e3e",
                    fillColor: "#feffed",
                    stroke: true,
                }
            default:
                return {
                    weight: 1,
                    fillOpacity: 0,
                    color: "#2e3e3e",
                    stroke: true,
                }
        }
        // return {
        //     weight: 1,
        //     fillOpacity: 0,
        //     color: "#2e3e3e",
        //     stroke: true,
        // }
    }


    return {
        weight: 3,
        fillOpacity: 1,
        color: "#63b2df",
        stroke: true,
    }
};

export const pointToLayer = (feature, latlng, curDate, calendarIsEnabled) => {


    // цвет в зависимости от даты
    if (feature.properties.event_time && calendarIsEnabled) {
        const expDate = new Date(feature.properties.event_time.replace('Z', ''));
        if (expDate < curDate) {
            var iconDanger = new L.Icon({
                iconUrl: require('../../assets/marker-health.svg'),
                iconRetinaUrl: require('../../assets/marker-health.svg'),
                iconSize: new L.Point(34, 41),
                popupAnchor:  [1, -23],
                className: 'leaflet-custom-icon'
            });
            return L.marker(latlng, { icon: iconDanger });
        }
        else {
            var iconPrimary = new L.Icon({
                iconUrl: require('../../assets/marker-education.svg'),
                iconRetinaUrl: require('../../assets/marker-education.svg'),
                iconSize: new L.Point(34, 41),
                popupAnchor:  [1, -23],
                className: 'leaflet-custom-icon'
            });
            return L.marker(latlng, { icon: iconPrimary });
        }
    }
    else {
        return L.marker(latlng, { icon: new L.Icon.Default() });
    }
}