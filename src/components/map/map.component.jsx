import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { geoJSONStyle, pointToLayer } from './geojsonstyles';
import Switch from "rc-switch";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';

import "rc-switch/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import './map.styles.scss';

registerLocale('ru', ru)
setDefaultLocale('ru');

class MapData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature: null,
            lat: 58.035214,
            lng: 161.5162946,
            zoom: 5,
            modalLarge: false,
            embeddedDate: new Date(),
            calendarIsEnabled: true
        };

    }

    handleSwitch = (value, event) => {
        this.setState({
            calendarIsEnabled: value
        });
    }

    handleChangeEmbedded = date => {
        this.setState({
            embeddedDate: date
        });
        // this.forceUpdate();
    };

    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };

    onEachFeature(feature, layer) {
        if (feature.properties.class) {
            const popupContent = `
            <div>
                <p>${feature.properties.class}</p>
                <button class="btn btn-outline-primary btn-xs">
                    <a id="modal.launch-modal">Подробнее</a>
                </button>                    
            </div>
            `;
            layer.bindPopup(popupContent).on('popupopen', function (popup) {
                // console.log("popup opened !", popup);
            });
        }

        if (feature.properties.name) {
            const popupContent = `
            <div>
                <p>${feature.properties.name}</p>
                <button  class="btn btn-outline-primary btn-xs">
                    <a id="modal.launch-modal">Подробнее</a>
                </button>                    
            </div>
            `;
            layer.bindPopup(popupContent).on('popupopen', (popup) => {
                // console.log("popup opened !", popup);
            });
        }
    };

    render() {
        const { layers } = this.props;
        const { menuData } = this.props;
        const position = [this.state.lat, this.state.lng];
        return (
            <div>
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
                        layers.length && layers.map((item, index) => {
                            return (
                                <GeoJSON
                                    key={item.key + this.state.embeddedDate.toString() + this.state.calendarIsEnabled.toString()}
                                    data={item.geojson}
                                    style={(feature) => geoJSONStyle(feature, item.key)}
                                    pointToLayer={(feature, latlng) => pointToLayer(feature, latlng, this.state.embeddedDate, this.state.calendarIsEnabled)}
                                    onEachFeature={this.onEachFeature}
                                />
                            )
                        })
                    }
                </Map>
                {
                    menuData[0].subs.find(x => x.isVisible === true) ?
                        (
                            <div className="date-selector">
                                <div className="date-selector__center">
                                    <Switch
                                        className="custom-switch custom-switch-primary-inverse custom-switch-small"
                                        checked={this.state.calendarIsEnabled}
                                        onChange={(value, event) => this.handleSwitch(value, event)}
                                    />
                                    <div className={`${!this.state.calendarIsEnabled ? "date-selector__opacity" : ""}`}>
                                        <DatePicker
                                            key={'datepicker_' + this.state.calendarIsEnabled.toString()}
                                            calendarClassName="embedded"
                                            inline
                                            fixedHeight
                                            selected={this.state.embeddedDate}
                                            onChange={this.handleChangeEmbedded} />
                                    </div>
                                </div>
                            </div>
                        ) : (<div />)
                }
            </div>
        );
    };
};

const mapStateToProps = ({ menu }) => {
    const {
        menuData,
    } = menu;
    return {
        menuData,
    };
};

export default connect(mapStateToProps)(MapData);