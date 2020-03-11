// @flow

import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';


// import MarkerClusterGroup from '../marker-cluster/marker-cluster.component';
// import region_41 from '../../assets/region_41';
// import illinois from '../../assets/illinois';
// import states from '../../assets/states';
// import data from '../../assets/data';

// import 'react-leaflet-markercluster/dist/styles.min.css';
import './map.styles.scss';

// const iconEducation = new L.Icon({
//     iconUrl: require('../../assets/marker-education.svg'),
//     iconRetinaUrl: require('../../assets/marker-education.svg'),
//     // popupAnchor: this.renderPopup,
//     iconSize: new L.Point(40, 50),
//     className: 'leaflet-custom-icon'
// });

class MapData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature: null,
            lat: 58.035214,
            lng: 161.5162946,
            zoom: 5,
        };

    }

    // geoJSONStyle = (feature) => {
    //     if (feature.geometry.type === "Point") {
    //         return {
    //             icon: iconEducation
    //         };
    //     }
    //     else {
    //         return {
    //             weight: 3,
    //             fillOpacity: 0,
    //             color: "#63b2df",
    //             stroke: true,
    //         };
    //     }

    // };

    geoJSONStyle = () => {

        return {
            weight: 3,
            fillOpacity: 1,
            color: "#63b2df",
            fillColor: "red",
            stroke: true,
        }

    };

    onEachFeature(feature, layer) {
        // const popupContent = ` <Popup><pre>${feature.properties.name}</pre></Popup>`
        const popupContent = `<Popup><pre>${feature.properties.name}</pre></Popup>`
        layer.bindPopup(popupContent)
    };

    renderPopup = (layer) => (
        // `<div>${layer.properties.name}</div>`
        `<div>Popup!</div>`
    );

    render() {
        const { layers } = this.props;

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
                {
                    layers.length && layers.map((layer, index) => {
                        return (
                            <GeoJSON
                                key={layer.key}
                                data={layer.geojson}
                                style={this.geoJSONStyle}
                                onEachFeature={this.onEachFeature}
                            />
                        )
                    })
                }

            </Map>
        );
    };
};

export default (MapData);