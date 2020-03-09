import React from 'react';
import {  SliderTooltip } from "../common/SliderTooltips";

import './date-slider.styles.scss';

class DateSlider extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="date-slider-container">
                <SliderTooltip
                    min={500}
                    max={1500}
                    defaultValue={1000}
                    className="mb-5"
                />
            </div>
        )
    }
}

export default DateSlider;