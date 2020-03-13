import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";

// import MapData from "../components/map/map.component";
import Layers from '../components/layers/layers.component';

class AppLayout extends Component {
    render() {
        const { containerClassnames } = this.props;
        return (
            <div id="app-container" className={containerClassnames}>
                <Layers />
                <TopNav history={this.props.history} />
                <Sidebar />
                {/* <DateSlider /> */}
                {/* <main> */}
                    {/* <div className="container-fluid"> */}
                        {this.props.children}
                    {/* </div> */}
                {/* </main> */}
            </div>
        );
    }
}
const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};
const mapActionToProps = {}

export default withRouter(connect(
    mapStateToProps,
    mapActionToProps
)(AppLayout));
