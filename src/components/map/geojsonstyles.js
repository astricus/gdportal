import L from 'leaflet';

export const geoJSONStyle = (feature, label, curDate, calendarIsEnabled) => {

    if (feature.id.includes("national_projects")) {
        if (calendarIsEnabled) {
            const konkursReady = feature.properties.konkurs_ready;
            const expertReady = feature.properties.expert_ready;
            const stroyReady = feature.properties.stroy_ready;
            const eventTimeReady = feature.properties.event_time_ready;
            const konkursDate = new Date(feature.properties.konkurs_plan.replace('Z', ''));
            const expertDate = new Date(feature.properties.expert_plan.replace('Z', ''));
            const stroyDate = new Date(feature.properties.stroy_plan.replace('Z', ''));
            const evntDate = new Date(feature.properties.event_time.replace('Z', '')); // дата окончания
            // этап просрочен
            const konkursDanger = konkursReady === false && curDate > konkursDate;
            const expertDanger = expertReady === false && curDate > expertDate;
            const stroyDanger = stroyReady === false && curDate > stroyDate;
            // Этап в процессе
            const konkursInProcess = konkursReady === false && curDate <= konkursDate;
            const expertInProcess = expertReady === false && curDate <= expertDate;
            const stroyInProcess = stroyReady === false && curDate <= stroyDate;
            // Сдача просрочена
            const danger = eventTimeReady === false && curDate > evntDate;
            // Объект построен
            const success = eventTimeReady === true;
            // const inProcess = ( konkursReady || expertReady || stroyReady ) &&
            //                   ( curDate > konkursDate || );
            if (danger) {
                return {
                    weight: 3,
                    fillOpacity: 1,
                    color: "#E3393D",
                    stroke: true,
                }
            }
            else if (konkursDanger || expertDanger || stroyDanger) {
                return {
                    weight: 3,
                    fillOpacity: 1,
                    color: "#FB8D2C",
                    stroke: true,
                }
            }
            else if (konkursInProcess || expertInProcess || stroyInProcess) {
                return {
                    weight: 3,
                    fillOpacity: 1,
                    color: "#B1DE85",
                    stroke: true,
                }
            }
            else if (success) {
                return {
                    weight: 3,
                    fillOpacity: 1,
                    color: "#3AAD35",
                    stroke: true,
                }
            }
        }
    }
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

    if (label === "menu.nat_proj.roads" || "menu.transport_map.uds") {

    }

    if (feature.id.includes("ppimt")) {
        if (feature.properties.type === "граница ППТ") {
            return {
                weight: 1,
                fillOpacity: 0,
                color: "#fb3b3b",
                stroke: true,
            }
        }
        if (feature.properties.type === "участок") {
            return {
                weight: 0.5,
                fillOpacity: 0.7,
                fillColor: "#81bcf3",
                color: "#0000cd",
                stroke: true,
            }
        }
        if (feature.properties.type === "застройка") {
            return {
                weight: 1,
                fillOpacity: 0,
                color: "#6e514e",
                stroke: true,
            }
        }
        if (feature.properties.type === "ЛРЗ") {
            return {
                weight: 1,
                fillOpacity: 0,
                color: "#207720",
                stroke: true,
            }
        }
    }


    // return {
    //     weight: 3,
    //     fillOpacity: 1,
    //     color: "#63b2df",
    //     stroke: true,
    // }
};

export const pointToLayer = (feature, latlng, curDate, calendarIsEnabled, label) => {

    //только для нац.проектов
    if (feature.id.includes("national_projects")) {
        // маркер в зависимости от даты и готовности проекта/этапа
        if (calendarIsEnabled) {
            const konkursReady = feature.properties.konkurs_ready;
            const expertReady = feature.properties.expert_ready;
            const stroyReady = feature.properties.stroy_ready;
            const eventTimeReady = feature.properties.event_time_ready;
            const konkursDate = new Date(feature.properties.konkurs_plan.replace('Z', ''));
            const expertDate = new Date(feature.properties.expert_plan.replace('Z', ''));
            const stroyDate = new Date(feature.properties.stroy_plan.replace('Z', ''));
            const evntDate = new Date(feature.properties.event_time.replace('Z', '')); // дата окончания
            // этап просрочен
            const konkursDanger = konkursReady === false && curDate > konkursDate;
            const expertDanger = expertReady === false && curDate > expertDate;
            const stroyDanger = stroyReady === false && curDate > stroyDate;
            // Этап в процессе
            const konkursInProcess = konkursReady === false && curDate <= konkursDate;
            const expertInProcess = expertReady === false && curDate <= expertDate;
            const stroyInProcess = stroyReady === false && curDate <= stroyDate;
            // Сдача просрочена
            const danger = eventTimeReady === false && curDate > evntDate;
            // Объект построен
            const success = eventTimeReady === true;
            // const inProcess = ( konkursReady || expertReady || stroyReady ) &&
            //                   ( curDate > konkursDate || );
            if (danger) {
                var iconDanger = new L.Icon({
                    iconUrl: require('../../assets/marker_danger.svg'),
                    iconRetinaUrl: require('../../assets/marker_danger.svg'),
                    shadowUrl: require('../../assets/marker_shadow.png'),
                    iconSize: new L.Point(25, 41),
                    popupAnchor: [1, -26],
                    className: 'leaflet-custom-icon'
                });
                return L.marker(latlng, { icon: iconDanger });
            }
            else if (konkursDanger || expertDanger || stroyDanger) {
                var iconStageDanger = new L.Icon({
                    iconUrl: require('../../assets/marker_stage_danger.svg'),
                    iconRetinaUrl: require('../../assets/marker_stage_danger.svg'),
                    shadowUrl: require('../../assets/marker_shadow.png'),
                    iconSize: new L.Point(25, 41),
                    popupAnchor: [1, -26],
                    className: 'leaflet-custom-icon'
                });
                return L.marker(latlng, { icon: iconStageDanger });
            }
            else if (konkursInProcess || expertInProcess || stroyInProcess) {
                var iconInProcess = new L.Icon({
                    iconUrl: require('../../assets/marker_inprocess.svg'),
                    iconRetinaUrl: require('../../assets/marker_inprocess.svg'),
                    shadowUrl: require('../../assets/marker_shadow.png'),
                    iconSize: new L.Point(25, 41),
                    popupAnchor: [1, -26],
                    className: 'leaflet-custom-icon'
                });
                return L.marker(latlng, { icon: iconInProcess });
            }
            else if (success) {
                var iconComplete = new L.Icon({
                    iconUrl: require('../../assets/marker_complete.svg'),
                    iconRetinaUrl: require('../../assets/marker_complete.svg'),
                    shadowUrl: require('../../assets/marker_shadow.png'),
                    iconSize: new L.Point(25, 41),
                    popupAnchor: [1, -26],
                    className: 'leaflet-custom-icon'
                });
                return L.marker(latlng, { icon: iconComplete });
            }
        }
        else {
            // return L.marker(latlng, { icon: new L.Icon.Default() });
            switch (label) {
                // Сталь маркеров для нац. проекта здравоохранение
                case 'menu.nat_proj.health':
                    var iconHealth = new L.Icon({
                        iconUrl: require('../../assets/marker_health.svg'),
                        iconRetinaUrl: require('../../assets/marker_health.svg'),
                        shadowUrl: require('../../assets/marker_shadow.png'),
                        iconSize: new L.Point(25, 41),
                        popupAnchor: [1, -26],
                        className: 'leaflet-custom-icon'
                    });
                    return L.marker(latlng, { icon: iconHealth });
                case 'menu.nat_proj.culture':
                    var iconCulture = new L.Icon({
                        iconUrl: require('../../assets/marker_culture.svg'),
                        iconRetinaUrl: require('../../assets/marker_culture.svg'),
                        shadowUrl: require('../../assets/marker_shadow.png'),
                        iconSize: new L.Point(25, 41),
                        popupAnchor: [1, -26],
                        className: 'leaflet-custom-icon'
                    });
                    return L.marker(latlng, { icon: iconCulture });
                case 'menu.nat_proj.education':
                    var iconEducation = new L.Icon({
                        iconUrl: require('../../assets/marker_education.svg'),
                        iconRetinaUrl: require('../../assets/marker_education.svg'),
                        shadowUrl: require('../../assets/marker_shadow.png'),
                        iconSize: new L.Point(25, 41),
                        popupAnchor: [1, -26],
                        className: 'leaflet-custom-icon'
                    });
                    return L.marker(latlng, { icon: iconEducation });
                case 'menu.nat_proj.demography':
                    var iconDemography = new L.Icon({
                        iconUrl: require('../../assets/marker_demography.svg'),
                        iconRetinaUrl: require('../../assets/marker_demography.svg'),
                        shadowUrl: require('../../assets/marker_shadow.png'),
                        iconSize: new L.Point(25, 41),
                        popupAnchor: [1, -26],
                        className: 'leaflet-custom-icon'
                    });
                    return L.marker(latlng, { icon: iconDemography });
                case 'menu.nat_proj.city-objects':
                    var iconPublic = new L.Icon({
                        iconUrl: require('../../assets/marker_public.svg'),
                        iconRetinaUrl: require('../../assets/marker_public.svg'),
                        shadowUrl: require('../../assets/marker_shadow.png'),
                        iconSize: new L.Point(25, 41),
                        popupAnchor: [1, -26],
                        className: 'leaflet-custom-icon'
                    });
                    return L.marker(latlng, { icon: iconPublic });
                case 'menu.nat_proj.ecology':
                    var iconEcology = new L.Icon({
                        iconUrl: require('../../assets/marker_ecology.svg'),
                        iconRetinaUrl: require('../../assets/marker_ecology.svg'),
                        shadowUrl: require('../../assets/marker_shadow.png'),
                        iconSize: new L.Point(25, 41),
                        popupAnchor: [1, -26],
                        className: 'leaflet-custom-icon'
                    });
                    return L.marker(latlng, { icon: iconEcology });
                default:
                    return L.marker(latlng, { icon: new L.Icon.Default() });
            }
        }
    }
    if (label === "menu.social_map.edu") {
        var circleEdu = {
            radius: 10,
            fillColor: "#a6cee3",
            color: "#325780",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        };
        return L.circleMarker(latlng, circleEdu);
    }
    if (label === "menu.social_map.culture") {
        var circleCult = {
            radius: 10,
            fillColor: "#1f78b4",
            color: "#325780",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        };
        return L.circleMarker(latlng, circleCult);
    }
    if (label === "menu.social_map.medicine") {
        var circleMed = {
            radius: 10,
            fillColor: "#b2df8a",
            color: "#325780",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        };
        return L.circleMarker(latlng, circleMed);
    }
    if (label === "menu.social_map.social-sec") {
        var circleSoc = {
            radius: 10,
            fillColor: "#33a02c",
            color: "#325780",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        };
        return L.circleMarker(latlng, circleSoc);
    }
    if (label === "menu.social_map.sport") {
        var circleSpt = {
            radius: 10,
            fillColor: "#fb9a99",
            color: "#325780",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        };
        return L.circleMarker(latlng, circleSpt);
    }
    if (label === "menu.social_map.garbage") {
        var circleGbe = {
            radius: 10,
            fillColor: "#e31a1c",
            color: "#325780",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        };
        return L.circleMarker(latlng, circleGbe);
    }
    if (label === "menu.social_map.common") {
        var circleCmn = {
            radius: 10,
            fillColor: "#fdbf6f",
            color: "#325780",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        };
        return L.circleMarker(latlng, circleCmn);
    }
    if (label === "menu.social_map.tourism") {
        var circleTrm = {
            radius: 10,
            fillColor: "#ff7f00",
            color: "#325780",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        };
        return L.circleMarker(latlng, circleTrm);
    }
    else {
        return L.marker(latlng, { icon: new L.Icon.Default() });
    }

}