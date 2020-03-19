import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import MapData from '../map/map.component';

import './layers.styles.scss';

class Layers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            layers: []
        }
        this.updateLayers = this.updateLayers.bind(this);
    }

    updateLayers = async () => {
        this.setState({
            loading: true
        });
        const layers = [];
        // const url = 'http://188.225.36.82:8080/geoserver/wfs?service=wfs&version=2.0.0';
        const url = 'https://gdportal.ru/geoserver/wfs?service=wfs&version=2.0.0';
        const request = '&request=GetFeature';
        const tnames = '&typeNames=';
        const projection = '&srsName=EPSG:4326';
        const format = '&outputFormat=application/json';
        const { menuData } = this.props;
        for (const item of menuData) {
            if (item.item === "layers" && item.subs.length) {
                for (const sub of item.subs) {
                    if (sub.layer && sub.isVisible) {
                        const getRequest = url + request + tnames + sub.layer + projection + format;
                        const response = await axios.get(getRequest);
                        layers.push({
                            geojson: response.data,
                            key: sub.label
                        });
                    }
                }
            }
        }
        this.setState({
            layers: layers,
            loading: false
        });
    }

    componentDidMount() {
        this.updateLayers();
    };

    componentDidUpdate(prevProps) {
        if (this.props.menuData !== prevProps.menuData) {
            this.updateLayers();
        }
    };

    render() {
        return <MapData loading={this.state.loading} layers={this.state.layers} />
    }
};

const mapStateToProps = ({ menu}) => {
    const {
                    menuData
                } = menu;
    return {
                    menuData,
    };
};


export default connect(mapStateToProps)(Layers);