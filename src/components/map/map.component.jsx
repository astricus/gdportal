// @flow

import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import MarkerClusterGroup from '../marker-cluster/marker-cluster.component';
import region_41 from '../../assets/region_41';

// import 'react-leaflet-markercluster/dist/styles.min.css';
import './map.styles.scss';

class MapData extends Component {
    state = {
        lat: 58.035214,
        lng: 161.5162946,
        zoom: 5,
    };

    geoJSONStyle() {
        return {
            weight: 3,
            fillOpacity: 0,
            color: "#63b2df",
            stroke: true,
        };
    };

    onEachFeature(feature, layer) {
        const popupContent = ` <Popup><pre>${feature.properties.name}</pre></Popup>`
        layer.bindPopup(popupContent)
    };

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map className="markercluster-map" center={position} zoom={this.state.zoom} 
            minZoom={0}
            maxZoom={19} zoomControl={false}>
                <TileLayer
                    attribution='<a href="http://maps.sputnik.ru/">Спутник</a> | &copy; Ростелеком | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="//tilessputnik.ru/{z}/{x}/{y}.png?tag=retina&amp;from_api=v0.3"
                    zoom={13}
                />
                {/* <MarkerClusterGroup>
                    <Marker position={position} />
                    <Marker position={[58.035214,161.5262946]} />
                    <Marker position={[58.1035214,161.5362946]} />
                    <Marker position={[58.235214,161.5562946]} />
                </MarkerClusterGroup> */}
                <GeoJSON
                    data={region_41}
                    style={this.geoJSONStyle}
                    onEachFeature={this.onEachFeature}
                />
            </Map>
        );
    };
};

export default MapData;