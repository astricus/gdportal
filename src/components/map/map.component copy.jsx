// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';

import VectorLayers from '../layers/layers.component';

// import MarkerClusterGroup from '../marker-cluster/marker-cluster.component';
// import region_41 from '../../assets/region_41';
// import data from '../../assets/data';

// import 'react-leaflet-markercluster/dist/styles.min.css';
import './map.styles.scss';

const VectorGrid = withLeaflet(VectorGridDefault);

class MapData extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            feature: null,
            lat: 58.035214,
            lng: 161.5162946,
            zoom: 5
        };
    }

    onClick(e) {
        const state = e.layer;
        console.log('clicked = ', state.properties);
        console.log('coords = ', e.latlng);
    }

    // geoJSONStyle() {
    //     return {
    //         weight: 3,
    //         fillOpacity: 0,
    //         color: "#63b2df",
    //         stroke: true,
    //     };
    // };

    // onEachFeature(feature, layer) {
    //     const popupContent = ` <Popup><pre>${feature.properties.name}</pre></Popup>`
    //     layer.bindPopup(popupContent)
    // };

    renderPopup = (layer) => (
        `<div>${layer.properties.name}</div>`
    );

    render() {
        // const { menuData } = this.props;
        
        console.log("Map. I am rerendered");
        // const iconEducation = new L.Icon({
        //     iconUrl: require('../../assets/marker-education.svg'),
        //     iconRetinaUrl: require('../../assets/marker-education.svg'),
        //     popupAnchor: this.renderPopup,
        //     iconSize: new L.Point(40, 50),
        //     className: 'leaflet-custom-icon'
        // });

        // const iconCulture = new L.Icon({
        //     iconUrl: require('../../assets/marker-culture.svg'),
        //     iconRetinaUrl: require('../../assets/marker-culture.svg'),
        //     popupAnchor: this.renderPopup,
        //     iconSize: new L.Point(40, 50),
        //     className: 'leaflet-custom-icon'
        // });

        // const iconHealth = new L.Icon({
        //     iconUrl: require('../../assets/marker-health.svg'),
        //     iconRetinaUrl: require('../../assets/marker-health.svg'),
        //     popupAnchor: this.renderPopup,
        //     iconSize: new L.Point(40, 50),
        //     className: 'leaflet-custom-icon'
        // });

        // const iconSport = new L.Icon({
        //     iconUrl: require('../../assets/marker-sport.svg'),
        //     iconRetinaUrl: require('../../assets/marker-sport.svg'),
        //     popupAnchor: this.renderPopup,
        //     iconSize: new L.Point(40, 50),
        //     className: 'leaflet-custom-icon'
        // });

        // const vectorTileLayerStyles = {
        //     'education': {
        //         icon: iconEducation
        //     },
        //     'culture': {
        //         icon: iconCulture
        //     },
        //     'health': {
        //         icon: iconHealth
        //     },
        //     'sport': {
        //         icon: iconSport
        //     },
        //     'functional_zone': {
        //         weight: 2,
        //         color: '#917519',
        //     },
        //     'road': {
        //         weight: 2,
        //         color: '#3D3A32',
        //     }

        // };

        const projection_epsg_no = '900913';
        const url = 'http://188.225.36.82:8080/geoserver/gwc/service/tms/1.0.0/';

        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom}
                minZoom={0}
                maxZoom={19} zoomControl={false}>
                {/* <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                /> */}
                <TileLayer
                    attribution='<a href="http://maps.sputnik.ru/">Спутник</a> | &copy; Ростелеком | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="//tilessputnik.ru/{z}/{x}/{y}.png?tag=retina&amp;from_api=v0.3"
                    // url="//tilessputnik.ru/{z}/{x}/{y}.png?from_api=v0.3"
                    key='main_tile_layer'
                />
                {/* <MarkerClusterGroup>
                    <Marker position={position} />
                    <Marker position={[58.035214,161.5262946]} />
                    <Marker position={[58.1035214,161.5362946]} />
                    <Marker position={[58.235214,161.5562946]} />
                </MarkerClusterGroup> */}
                {/* <GeoJSON
                    data={region_41}
                    style={this.geoJSONStyle}
                    onEachFeature={this.onEachFeature}
                /> */}
                {/* {menuData[0].subs &&
                    menuData[0].subs.map((sub, index) => {
                        const layer = sub.layer;
                        const options = {
                            type: 'protobuf',
                            popup: this.renderPopup,
                            url: url + layer + '@EPSG%3A' + projection_epsg_no + '@pbf/{z}/{x}/{-y}.pbf',
                            vectorTileLayerStyles: vectorTileLayerStyles,
                            subdomains: 'abcd'
                        };

                        return (
                            <VectorGrid {...options} onClick={this.onClick} key={`${sub.layer}_${index}`} />
                        )
                    })
                } */}
                <VectorLayers />
            </Map>
        );
    };
};

// const mapStateToProps = ({ menu }) => {
//     const {
//         menuData
//     } = menu;
//     return {
//         menuData,
//     };
// };


// export default connect(mapStateToProps)(MapData);
export default MapData;