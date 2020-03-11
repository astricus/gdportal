// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, GeoJSON, LayersControl, Marker } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// import MarkerClusterGroup from '../marker-cluster/marker-cluster.component';
// import region_41 from '../../assets/region_41';
// import illinois from '../../assets/illinois';
// import states from '../../assets/states';
// import data from '../../assets/data';

// import 'react-leaflet-markercluster/dist/styles.min.css';
import './map.styles.scss';

const iconEducation = new L.Icon({
    iconUrl: require('../../assets/marker-education.svg'),
    iconRetinaUrl: require('../../assets/marker-education.svg'),
    // popupAnchor: this.renderPopup,
    iconSize: new L.Point(40, 50),
    className: 'leaflet-custom-icon'
});

// const geoData = () => {
//     let data = null;
//     axios.get('http://188.225.36.82:8080/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=topp:states&outputFormat=application/json')
//         .then((response) => {
//             data = {...response.data};
//             console.log(data);
//         });
//     ;
//     return data;
// }

class MapData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature: null,
            lat: 58.035214,
            lng: 161.5162946,
            zoom: 3,
            healthData: null,
            cultureData: null,
            fzoneData: null,
            sportData: null,
            eduData: null,
            roadData: null
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
        const popupContent = ` <Popup><pre>Popup!</pre></Popup>`
        layer.bindPopup(popupContent)
    };

    componentDidMount() {
        const layer = 'kamchatka:culture_projects';
        axios.get('http://188.225.36.82:8080/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames='
         + layer + '&srsName=EPSG:4326&outputFormat=application/json')
        .then((response) => {
            this.setState({
                healthData: response.data
            })
            // console.log(response);
        });
        
    };

    renderPopup = (layer) => (
        // `<div>${layer.properties.name}</div>`
        `<div>Popup!</div>`
    );

    render() {
        if (!this.state.healthData) {
            return null;
        }

        const { menuData } = this.props;
        console.log("Health Data = ");
        console.log(this.state.healthData);
        // console.log(region_41);
        // console.log(illinois);

        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom}
                minZoom={0}
                maxZoom={19} zoomControl={false}>
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked={false} name="Open Street Map">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked={true} name="Sputnik">
                        <TileLayer
                            attribution='<a href="http://maps.sputnik.ru/">Спутник</a> | &copy; Ростелеком | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="//tilessputnik.ru/{z}/{x}/{y}.png?tag=retina&amp;from_api=v0.3"
                            // url="//tilessputnik.ru/{z}/{x}/{y}.png?from_api=v0.3"
                            key='main_tile_layer'
                        />
                        
                        <GeoJSON
                    data={region_41}
                    style={this.geoJSONStyle}
                    onEachFeature={this.onEachFeature}
                />
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay checked={menuData[0].subs[0].isVisible} name="Marker with popup">
                        <GeoJSON data={this.state.healthData}  />
                        <GeoJSON data={region_41}  />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked={menuData[0].subs[1].isVisible} name="Marker with popup 2">
                        {this.state.healthData ? 
                        (<Marker position={this.state.healthData.features[0].geometry.coordinates} />) :  null}
                            <GeoJSON data={this.state.healthData.features[0]} style={this.geoJSONStyle}
                                onEachFeature={this.onEachFeature} />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked={menuData[0].subs[2].isVisible} name="Marker with popup 2">
                        {this.state.healthData ? 
                        (<Marker position={this.state.healthData.features[0].geometry.coordinates} />) :  null}
                            <GeoJSON data={states} style={this.geoJSONStyle}
                                onEachFeature={this.onEachFeature} />
                    </LayersControl.Overlay> 
                </LayersControl>

            </Map>
        );
    };
};

const mapStateToProps = ({ menu }) => {
    const {
        menuData
    } = menu;
    return {
        menuData,
    };
};


export default connect(mapStateToProps)(MapData);