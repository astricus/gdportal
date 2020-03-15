import { GeoJSON as LeafletGeoJSON } from 'leaflet';


import { GeoJSON, withLeaflet } from 'react-leaflet'

class GeoJSONWithPopup extends GeoJSON {
    constructor(props) {
        super(props);
    }
    createLeafletElement(props) {
        const el = new LeafletGeoJSON(props.data, this.getOptions(props))
        this.contextValue = {
            ...props.leaflet,
            layerContainer: el,
            popupContainer: el,
        }
        return el;
    }

    updateLeafletElement(fromProps, toProps) {
        if (typeof toProps.style === 'function') {
            this.leafletElement.setStyle(toProps.style)
        } else {
            this.setStyleIfChanged(fromProps, toProps)
        }
    }
}

export default withLeaflet(GeoJSONWithPopup);