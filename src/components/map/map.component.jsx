import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplicationMenu from "../common/ApplicationMenu";
import PerfectScrollbar from 'react-perfect-scrollbar';
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

import { Colxx } from "../common/CustomBootstrap";

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
            calendarIsEnabled: false,
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
    };

    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };

    onEachFeature(feature, layer) {
        if (feature.id.includes("functional_zone") && feature.properties.class) {
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
        if (feature.id.includes("ppimt")) {
            layer.on('popupopen', () => {
                this.setState({
                    feature: feature
                });
            });
        }
        if (feature.id.includes("district") || feature.id.includes("municipal_structure")) {
            const districtHover = {
                weight: 5
            }
            const districtOut = {
                weight: 3
            }
            layer.on({
                'mouseover': (e) => {
                    var layer = e.target;
                    layer.setStyle(districtHover);
                },
                'mouseout': (e) => {
                    var layer = e.target;
                    layer.setStyle(districtOut);
                }
            });
        }
        if (feature.geometry.type === "LineString") {
            if (feature.id.includes("national_projects")) {
                if (this.state.calendarIsEnabled) {
                    const curDate = this.state.embeddedDate;
                    const konkursReady = feature.properties.konkurs_ready;
                    const expertReady = feature.properties.expert_ready;
                    const stroyReady = feature.properties.stroy_ready;
                    const eventTimeReady = feature.properties.event_time_ready;
                    const konkursDate = new Date(feature.properties.konkurs_plan.replace('Z', ''));
                    const expertDate = new Date(feature.properties.expert_plan.replace('Z', ''));
                    const stroyDate = new Date(feature.properties.stroy_plan.replace('Z', ''));
                    const evntDate = new Date(feature.properties.event_time.replace('Z', '')); // дата окончания
                    // этап просрочен
                    const konkursDanger = konkursReady === false && curDate > konkursDate;
                    const expertDanger = expertReady === false && curDate > expertDate;
                    const stroyDanger = stroyReady === false && curDate > stroyDate;
                    // Этап в процессе
                    const konkursInProcess = konkursReady === false && curDate <= konkursDate;
                    const expertInProcess = expertReady === false && curDate <= expertDate;
                    const stroyInProcess = stroyReady === false && curDate <= stroyDate;
                    // Сдача просрочена
                    const danger = eventTimeReady === false && curDate > evntDate;
                    // Объект построен
                    const success = eventTimeReady === true;
                    // const inProcess = ( konkursReady || expertReady || stroyReady ) &&
                    //                   ( curDate > konkursDate || );
                    if (danger) {
                        const roadStyle = {
                            weight: 3,
                            fillOpacity: 1,
                            color: "#E3393D",
                            stroke: true,
                        };
                        const roadStyleHover = {
                            weight: 5,
                            fillOpacity: 1,
                            color: "#E3393D",
                            stroke: true,
                        };
                        layer.on({
                            'mouseover': (e) => {
                                var layer = e.target;
                                layer.setStyle(roadStyleHover);
                            },
                            'mouseout': (e) => {
                                var layer = e.target;
                                layer.setStyle(roadStyle);
                            }
                        });
                    }
                    else if (konkursDanger || expertDanger || stroyDanger) {
                        const roadStyle = {
                            weight: 3,
                            fillOpacity: 1,
                            color: "#FB8D2C",
                            stroke: true,
                        };
                        const roadStyleHover = {
                            weight: 5,
                            fillOpacity: 1,
                            color: "#FB8D2C",
                            stroke: true,
                        };
                        layer.on({
                            'mouseover': (e) => {
                                var layer = e.target;
                                layer.setStyle(roadStyleHover);
                            },
                            'mouseout': (e) => {
                                var layer = e.target;
                                layer.setStyle(roadStyle);
                            }
                        });
                    }
                    else if (konkursInProcess || expertInProcess || stroyInProcess) {
                        const roadStyle = {
                            weight: 3,
                            fillOpacity: 1,
                            color: "#B1DE85",
                            stroke: true,
                        }
                        const roadStyleHover = {
                            weight: 5,
                            fillOpacity: 1,
                            color: "#B1DE85",
                            stroke: true,
                        };
                        layer.on({
                            'mouseover': (e) => {
                                var layer = e.target;
                                layer.setStyle(roadStyleHover);
                            },
                            'mouseout': (e) => {
                                var layer = e.target;
                                layer.setStyle(roadStyle);
                            }
                        });
                    }
                    else if (success) {
                        const roadStyle = {
                            weight: 3,
                            fillOpacity: 1,
                            color: "#3AAD35",
                            stroke: true,
                        }
                        const roadStyleHover = {
                            weight: 5,
                            fillOpacity: 1,
                            color: "#3AAD35",
                            stroke: true,
                        };
                        layer.on({
                            'mouseover': (e) => {
                                var layer = e.target;
                                layer.setStyle(roadStyleHover);
                            },
                            'mouseout': (e) => {
                                var layer = e.target;
                                layer.setStyle(roadStyle);
                            }
                        });
                    }
                }
                else {
                    const roadStyle = {
                        weight: 3,
                        fillOpacity: 1,
                        color: "#63b2df",
                        stroke: true,
                    }
                    const roadStyleHover = {
                        weight: 5,
                        fillOpacity: 1,
                        color: "#145388",
                        stroke: true,
                    }
                    layer.on({
                        'mouseover': (e) => {
                            var layer = e.target;
                            layer.setStyle(roadStyleHover);
                        },
                        'mouseout': (e) => {
                            var layer = e.target;
                            layer.setStyle(roadStyle);
                        }
                    });
                }
            }
            else {
                const roadStyle = {
                    weight: 3,
                    fillOpacity: 1,
                    color: "#63b2df",
                    stroke: true,
                }
                const roadStyleHover = {
                    weight: 5,
                    fillOpacity: 1,
                    color: "#145388",
                    stroke: true,
                }
                layer.on({
                    'mouseover': (e) => {
                        var layer = e.target;
                        layer.setStyle(roadStyleHover);
                    },
                    'mouseout': (e) => {
                        var layer = e.target;
                        layer.setStyle(roadStyle);
                    }
                });
            }
        }
        if (feature.id.includes("projects") && !feature.id.includes("national_projects")) {
            const projectHover = {
                weight: 5
            }
            const projectOut = {
                weight: 3
            }
            layer.on({
                'mouseover': (e) => {
                    var layer = e.target;
                    layer.setStyle(projectHover);
                },
                'mouseout': (e) => {
                    var layer = e.target;
                    layer.setStyle(projectOut);
                }
            });
        }
    };

    stage(feature) {
        if (feature.id.includes("national_projects")) {
            const curDate = this.state.embeddedDate;
            const konkursReady = feature.properties.konkurs_ready;
            const expertReady = feature.properties.expert_ready;
            const stroyReady = feature.properties.stroy_ready;
            const eventTimeReady = feature.properties.event_time_ready;
            const konkursDate = new Date(feature.properties.konkurs_plan.replace('Z', ''));
            const expertDate = new Date(feature.properties.expert_plan.replace('Z', ''));
            const stroyDate = new Date(feature.properties.stroy_plan.replace('Z', ''));
            const evntDate = new Date(feature.properties.event_time.replace('Z', '')); // дата окончания
            // этап просрочен
            const konkursDanger = konkursReady === false && curDate > konkursDate;
            const expertDanger = expertReady === false && curDate > expertDate;
            const stroyDanger = stroyReady === false && curDate > stroyDate;
            // Этап в процессе
            const konkursInProcess = konkursReady === false && curDate <= konkursDate;
            const expertInProcess = expertReady === false && curDate <= expertDate;
            const stroyInProcess = stroyReady === false && curDate <= stroyDate;
            // Сдача просрочена
            const danger = eventTimeReady === false && curDate > evntDate;
            // Объект построен
            const success = eventTimeReady === true;
            // const inProcess = ( konkursReady || expertReady || stroyReady ) &&
            //                   ( curDate > konkursDate || );
            if (danger) {
                return (<b class="text-danger">Сдача просрочена</b>);
            }
            else if (konkursDanger || expertDanger || stroyDanger) {
                if (konkursDanger) {
                    return (<b class="text-danger">Конкурс просрочен</b>);
                };
                if (expertDanger) {
                    return (<b class="text-danger">Экспертиза просрочена</b>);
                };
                if (stroyDanger) {
                    return (<b class="text-danger">Строительство просрочено</b>);
                };
            }
            else if (konkursInProcess || expertInProcess || stroyInProcess) {
                if (konkursInProcess) {
                    return "Проходит конкурс";
                };
                if (expertInProcess) {
                    return "Проходит экспертиза";
                };
                if (stroyInProcess) {
                    return "Проходит строительство";
                };
            }
            else if (success) {
                return "Проект сдан";
            }
        }
    };

    render() {
        const { layers, loading, menuData } = this.props;
        const { embeddedDate, calendarIsEnabled, feature } = this.state;
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
                    {loading ? (<div className="loading" />) : null}
                    {
                        layers.length && layers.map((item, index) => {
                            return (
                                <GeoJSON
                                    key={item.key + embeddedDate.toString() + calendarIsEnabled.toString()}
                                    data={item.geojson}
                                    style={(feature) => geoJSONStyle(feature, item.key, embeddedDate, calendarIsEnabled)}
                                    pointToLayer={(feature, latlng) => pointToLayer(feature, latlng, embeddedDate, calendarIsEnabled, item.key)}
                                    onEachFeature={this.onEachFeature}
                                >
                                    <Popup>
                                        {
                                            feature ? feature.id.includes("projects") && feature.properties.name ? (
                                                <div>
                                                    <p>{feature.properties.name}</p>
                                                    <Button
                                                        className="mr-2 mb-2"
                                                        color="primary"
                                                        size="xs"
                                                        outline
                                                        onClick={this.toggleLarge}
                                                    >
                                                        Подробнее
                                                </Button>
                                                </div>
                                            ) : feature.id.includes("district") && item.key.includes("people-dens") ? (
                                                <div>
                                                    <p>{feature.properties.name}</p>
                                                    <p>Плотность населения: {Math.round(1000 * feature.properties.density) / 1000} чел/км²</p>
                                                </div>
                                            ) : feature.id.includes("district") && item.key.includes("people-quan") ? (
                                                <div>
                                                    <p>{feature.properties.name}</p>
                                                    <p>Население: {feature.properties.population} чел</p>
                                                </div>
                                            ) : feature.properties.name ? (
                                                <p>{feature.properties.name}</p>
                                            ) : feature.properties.class ? (
                                                <p>{feature.properties.class}</p>
                                            ) : feature.properties.type ? (
                                                <p>{feature.properties.type}</p>
                                            ) : null : null
                                        }
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
                                                                        {
                                                                            feature ? feature.id.includes("national_projects") ? (
                                                                                <div>
                                                                                    <p className="text-muted no-margin-bottom">Этап</p>
                                                                                    <p>{this.stage(feature)}</p>
                                                                                </div>
                                                                            ) : null : null
                                                                        }
                                                                    </Colxx>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Colxx>
                                                </Row>
                                                {
                                                    feature ? feature.id.includes("national_projects") ? (
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
                                                    ) : null : null
                                                }

                                                <Row>
                                                    <Colxx xxs="12">
                                                        <Card className="mb-4">
                                                            <CardBody>
                                                                <p>По вопросам обратной связи по данному проекту обращайтесь по следующей ссылке</p>
                                                                <Button color="primary" outline href="https://www.kamgov.ru/" target="_blank" rel="noopener noreferrer" size="sm">
                                                                    Правительство Камчатского края
                                                                </Button>{' '}
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
                            <ApplicationMenu>
                                <div className="right-scroll">
                                    <PerfectScrollbar
                                        options={{ suppressScrollX: true, wheelPropagation: false }}
                                    >
                                        {
                                            this.state.calendarIsEnabled ? (
                                                <div className="stages-container">
                                                    <h5>Статус строительства</h5>
                                                    <div className="stage">
                                                        <p><img className="stage-marker" src="/assets/img/marker_complete.svg" alt="Маркер" />Построено</p>
                                                    </div>
                                                    <div className="stage">
                                                        <p><img className="stage-marker" src="/assets/img/marker_inprocess.svg" alt="Маркер" />Этап в процессе</p>
                                                    </div>
                                                    <div className="stage">
                                                        <p><img className="stage-marker" src="/assets/img/marker_stage_danger.svg" alt="Маркер" />Этап просрочен</p>
                                                    </div>
                                                    <div className="stage">
                                                        <p><img className="stage-marker" src="/assets/img/marker_danger.svg" alt="Маркер" />Сдача просрочена</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="stages-container">
                                                        <h5>Национальные проекты</h5>
                                                        <div className="stage">
                                                            <p><img className="stage-marker" src="/assets/img/marker_health.svg" alt="Маркер" />Здравоохранение</p>
                                                        </div>
                                                        <div className="stage">
                                                            <p><img className="stage-marker" src="/assets/img/marker_education.svg" alt="Маркер" />Образование</p>
                                                        </div>
                                                        <div className="stage">
                                                            <p><img className="stage-marker" src="/assets/img/marker_demography.svg" alt="Маркер" />Демография</p>
                                                        </div>
                                                        <div className="stage">
                                                            <p><img className="stage-marker" src="/assets/img/marker_road.svg" alt="Маркер" />Дороги</p>
                                                        </div>
                                                    </div>
                                                )
                                        }

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
                                    </PerfectScrollbar>
                                </div>
                            </ApplicationMenu>

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