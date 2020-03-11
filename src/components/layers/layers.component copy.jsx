import React from 'react';
import { connect } from 'react-redux';
import { LayersControl, withLeaflet } from 'react-leaflet';

import L from 'leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';

// const { BaseLayer, Overlay } = LayersControl
const VectorGrid = withLeaflet(VectorGridDefault);

const VectorLayers = ({ menuData }) => {
    console.log(menuData);
    // const { menuData } = this.props;

    const onClick = (e) => {
        const state = e.layer;
        console.log('clicked = ', state.properties);
        console.log('coords = ', e.latlng);
    }

    const renderPopup = (layer) => (
        `<div>${layer.properties.name}</div>`
    );

    const iconEducation = new L.Icon({
        iconUrl: require('../../assets/marker-education.svg'),
        iconRetinaUrl: require('../../assets/marker-education.svg'),
        popupAnchor: renderPopup,
        iconSize: new L.Point(40, 50),
        className: 'leaflet-custom-icon'
    });

    const iconCulture = new L.Icon({
        iconUrl: require('../../assets/marker-culture.svg'),
        iconRetinaUrl: require('../../assets/marker-culture.svg'),
        popupAnchor: renderPopup,
        iconSize: new L.Point(40, 50),
        className: 'leaflet-custom-icon'
    });

    const iconHealth = new L.Icon({
        iconUrl: require('../../assets/marker-health.svg'),
        iconRetinaUrl: require('../../assets/marker-health.svg'),
        popupAnchor: renderPopup,
        iconSize: new L.Point(40, 50),
        className: 'leaflet-custom-icon'
    });

    const iconSport = new L.Icon({
        iconUrl: require('../../assets/marker-sport.svg'),
        iconRetinaUrl: require('../../assets/marker-sport.svg'),
        popupAnchor: renderPopup,
        iconSize: new L.Point(40, 50),
        className: 'leaflet-custom-icon'
    });

    const vectorTileLayerStyles = {
        'education': {
            icon: iconEducation
        },
        'culture': {
            icon: iconCulture
        },
        'health': {
            icon: iconHealth
        },
        'sport': {
            icon: iconSport
        },
        'functional_zone': {
            weight: 2,
            color: '#917519',
        },
        'road': {
            weight: 2,
            color: '#3D3A32',
        }

    };

    const layer = menuData[0].subs[0].layer;
    const projection_epsg_no = '900913';
    const url = 'http://188.225.36.82:8080/geoserver/gwc/service/tms/1.0.0/';
    const options = {
        type: 'protobuf',
        popup: renderPopup,
        url: url + layer + '@EPSG%3A' + projection_epsg_no + '@pbf/{z}/{x}/{-y}.pbf',
        vectorTileLayerStyles: vectorTileLayerStyles,
        subdomains: 'abcd'
    };

    return (
        <VectorGrid {...options} onClick={onClick} key={`${menuData[0].subs[0].layer}_0`} />
        // <LayersControl position="topright">
        //     <LayersControl.Overlay name={menuData[0].subs[0].layer} checked={menuData[0].subs[0].isVisible}>
        //         <VectorGrid {...options} onClick={onClick} key={`${menuData[0].subs[0].layer}_0`} />
        //     </LayersControl.Overlay>
        // </LayersControl>
        //     {/* {console.log("I am updated!")}
        // {menuData[0].subs &&
        //     menuData[0].subs.map((sub, index) => {
        //         const layer = sub.layer;
        //         const options = {
        //             type: 'protobuf',
        //             popup: renderPopup,
        //             url: url + layer + '@EPSG%3A' + projection_epsg_no + '@pbf/{z}/{x}/{-y}.pbf',
        //             vectorTileLayerStyles: vectorTileLayerStyles,
        //             subdomains: 'abcd'
        //         }; */}

        //         {/* return ( */}

            

        //         {/* ) */}
        //     {/* // }) */}
        // {/* } */}
    )
}

const mapStateToProps = ({ menu }) => {
    const {
        menuData
    } = menu;
    return {
        menuData,
    };
};


export default connect(mapStateToProps)(VectorLayers);