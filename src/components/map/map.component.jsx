import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import { geoJSONStyle, pointToLayer } from './geojsonstyles';
import Switch from "rc-switch";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';

import GlideComponentThumbs from "../carousel/GlideComponentThumbs";
import { detailImages, detailThumbs } from '../../assets/images';

import {
    Row,
    Card,
    CardBody,
    CardTitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

import { Colxx, Separator } from "../common/CustomBootstrap";

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
            calendarIsEnabled: true,
        };
        this.onEachFeature = this.onEachFeature.bind(this);
    }

    convertDate = (date) => {
        const expDate = new Date(date.replace('Z', ''));
        const localDate = expDate.toLocaleDateString('ru-RU');
        return localDate;
    };

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
            layer.on('popupopen', () => {
                this.setState({
                    feature: feature
                });
            });
        }
        if (feature.properties.name) {
            layer.on('popupopen', () => {
                this.setState({
                    feature: feature
                });
            });
        }
        // console.log(layer);
        // return (
        //     <Popup position={[layer._latlng.lat, layer._latlng.lng]}>
        //         Here I am!
        //     </Popup>
        // );
        // if (feature.properties.class) {
        //     const popupContent = `
        //     <div>
        //         <p>${feature.properties.class}</p>
        //         <button id="modal-btn-class" class="btn btn-outline-primary btn-xs">
        //             <a id="modal.launch-modal">Подробнее</a>
        //         </button>                    
        //     </div>
        //     `;
        //     layer.bindPopup(popupContent).on('popupopen', (popup) => {
        //         $("#modal-btn-class").click(function (event) {

        //         })
        //     });
        // }

        // if (feature.properties.name) {
        //     const popupContent = `
        //     <div>
        //         <p>${feature.properties.name}</p>
        //         <button id="modal-btn-name" class="btn btn-outline-primary btn-xs">
        //             <a id="modal.launch-modal">Подробнее</a>
        //         </button>
        //     </div>
        //     `;
        //     layer.bindPopup(popupContent).on('popupopen', (popup, feature) => {
        //         $("#modal-btn-name").click(function (event) {
        //             $("#modal-title-id").text(feature.properties.name);
        //             $("#exampleModal").modal('toggle');
        //         })
        //     });
        // }
    };

    render() {
        const { layers, menuData } = this.props;
        const { embeddedDate, calendarIsEnabled, feature } = this.state;
        console.log(feature);
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
                                    key={item.key + embeddedDate.toString() + calendarIsEnabled.toString()}
                                    data={item.geojson}
                                    style={(feature) => geoJSONStyle(feature, item.key)}
                                    pointToLayer={(feature, latlng) => pointToLayer(feature, latlng, embeddedDate, calendarIsEnabled)}
                                    onEachFeature={this.onEachFeature}
                                >
                                    <Popup>
                                        <p>{feature ? feature.properties.name : ''}</p>
                                        <Button
                                            className="mr-2 mb-2"
                                            color="primary"
                                            size="xs"
                                            outline
                                            onClick={this.toggleLarge}
                                        >
                                            Подробнее
                                        </Button>
                                        <Modal
                                            isOpen={this.state.modalLarge}
                                            size="lg"
                                            toggle={this.toggleLarge}
                                        >
                                            <ModalHeader toggle={this.toggleLarge}>
                                                {feature ? feature.properties.name : ''}
                                            </ModalHeader>
                                            <ModalBody>
                                                <Row className="justify-content-center">
                                                    <Colxx md="12" lg="8">
                                                        <Card className="mb-4">
                                                            <CardBody>
                                                                <GlideComponentThumbs settingsImages={
                                                                    {
                                                                        bound: true,
                                                                        rewind: false,
                                                                        focusAt: 0,
                                                                        startAt: 0,
                                                                        gap: 5,
                                                                        perView: 1,
                                                                        data: detailImages,
                                                                    }
                                                                } settingsThumbs={
                                                                    {
                                                                        bound: true,
                                                                        rewind: false,
                                                                        focusAt: 0,
                                                                        startAt: 0,
                                                                        gap: 10,
                                                                        perView: 5,
                                                                        data: detailThumbs,
                                                                        breakpoints: {
                                                                            576: {
                                                                                perView: 4
                                                                            },
                                                                            420: {
                                                                                perView: 3
                                                                            }
                                                                        }
                                                                    }
                                                                } />
                                                            </CardBody>
                                                        </Card>
                                                    </Colxx>
                                                </Row>
                                                <Row>
                                                    <Colxx xxs="12">
                                                        <Card className="mb-4">
                                                            <CardBody>
                                                                <CardTitle>
                                                                <h2>Характеристики объекта</h2>
                                                                </CardTitle>
                                                                <Row>
                                                                    <Colxx xxs="12" lg="6">
                                                                        {
                                                                            feature ? feature.properties.project_type ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Национальный проект</p>
                                                                                    <h6>{feature.properties.project_type}</h6>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                        {
                                                                            feature ? feature.properties.class ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Тип объекта</p>
                                                                                    <p>{feature.properties.class}</p>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                        {
                                                                            feature ? feature.properties.first_responsible ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Ответственные лица</p>
                                                                                    <div className="d-flex flex-row mb-3">
                                                                                        <img src="/assets/img/admin.svg" alt="thumbnail" className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
                                                                                        <div className="pl-3">
                                                                                            <p className="font-weight-medium mb-0 ">{feature.properties.first_responsible}</p>
                                                                                            <p className="text-muted mb-0 text-small">-</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                        {
                                                                            feature ? feature.properties.second_responsible ? (
                                                                                <div>
                                                                                    <div className="d-flex flex-row mb-3">
                                                                                        <img src="/assets/img/admin.svg" alt="thumbnail" className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
                                                                                        <div className="pl-3">
                                                                                            <p className="font-weight-medium mb-0 ">{feature.properties.second_responsible}</p>
                                                                                            <p className="text-muted mb-0 text-small">-</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                        {
                                                                            feature ? feature.properties.third_responsible ? (
                                                                                <div>
                                                                                    <div className="d-flex flex-row mb-3">
                                                                                        <img src="/assets/img/admin.svg" alt="thumbnail" className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
                                                                                        <div className="pl-3">
                                                                                            <p className="font-weight-medium mb-0 ">{feature.properties.third_responsible}</p>
                                                                                            <p className="text-muted mb-0 text-small">-</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                    </Colxx>
                                                                    <Colxx xxs="12" lg="6">
                                                                        <p className="text-muted no-margin-bottom">Субъект РФ</p>
                                                                        <p>Камчатский край</p>
                                                                        {
                                                                            feature ? feature.properties.address ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Адрес</p>
                                                                                    <p>{feature.properties.address}</p>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                        {
                                                                            feature ? feature.properties.reg_status ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Региональный статус</p>
                                                                                    <p>{feature.properties.reg_status}</p>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                        {
                                                                            feature ? feature.properties.status ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Статус</p>
                                                                                    <p>{feature.properties.status}</p>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                    </Colxx>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Colxx>
                                                </Row>
                                                <Row>
                                                    {
                                                        feature ? feature.properties.funding_amount || feature.properties.source ? (
                                                            <Colxx md="12" lg="6">
                                                                <Card className="mb-4">
                                                                    <CardBody>
                                                                        {
                                                                            feature ? feature.properties.funding_amount ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Финансирование</p>
                                                                                    <p>Объем - {feature.properties.funding_amount} т.р.</p>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                        {
                                                                            feature ? feature.properties.source ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Источник</p>
                                                                                    <p>{feature.properties.source}</p>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                    </CardBody>
                                                                </Card>
                                                            </Colxx>
                                                        ) : null : null
                                                    }
                                                    <Colxx md="12" lg="6">
                                                        <Card className="mb-4">
                                                            <CardBody>
                                                                {
                                                                    feature ? feature.properties.event_time ? (
                                                                        <div>
                                                                            <p className="text-muted no-margin-bottom">Срок сдачи объекта</p>
                                                                            <p>{this.convertDate(feature.properties.event_time)}</p>
                                                                        </div>
                                                                    ) : null : null
                                                                }
                                                            </CardBody>
                                                        </Card>
                                                    </Colxx>
                                                </Row>
                                                <Row>
                                                    <Colxx xxs="12">
                                                        <Card className="mb-4">
                                                            <CardBody>
                                                                <p>По вопросам обратной связи по данному проекту обращайтесь по следующей ссылке</p>
                                                                <Button color="primary" outline size="sm">
                                                                    <a href="https://www.kamgov.ru/" target="_blank
">Правительство Камчатского края</a>
                                                                </Button>
                                                            </CardBody>
                                                        </Card>
                                                    </Colxx>
                                                </Row>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggleLarge}>
                                                    Закрыть окно
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </Popup>
                                </GeoJSON>
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