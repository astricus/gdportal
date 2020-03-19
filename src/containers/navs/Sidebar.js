import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from 'react-router-dom';

import IntlMessages from '../../helpers/IntlMessages';

import {
    setContainerClassnames,
    addContainerClassname,
    removeContainerClassname,
    changeDefaultClassnames,
    changeSelectedMenuHasSubItems,
    setLayerIsVisible,
    setLayersIsVisible
} from '../../redux/actions';

// import menuData from '../../constants/menu';
import Switch from "rc-switch";
import "rc-switch/assets/index.css";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedParentMenu: '',
            viewingParentMenu: '',
            collapsedMenus: [],
        };
    }

    handleWindowResize = event => {
        if (event && !event.isTrusted) {
            return;
        }
        const { containerClassnames } = this.props;
        let nextClasses = this.getMenuClassesForResize(containerClassnames);
        this.props.setContainerClassnames(
            0,
            nextClasses.join(' '),
            this.props.selectedMenuHasSubItems
        );
    };

    handleDocumentClick = e => {
        const container = this.getContainer();
        let isMenuClick = false;
        if (
            e.target &&
            e.target.classList &&
            (e.target.classList.contains('menu-button') ||
                e.target.classList.contains('menu-button-mobile'))
        ) {
            isMenuClick = true;
        } else if (
            e.target.parentElement &&
            e.target.parentElement.classList &&
            (e.target.parentElement.classList.contains('menu-button') ||
                e.target.parentElement.classList.contains('menu-button-mobile'))
        ) {
            isMenuClick = true;
        } else if (
            e.target.parentElement &&
            e.target.parentElement.parentElement &&
            e.target.parentElement.parentElement.classList &&
            (e.target.parentElement.parentElement.classList.contains('menu-button') ||
                e.target.parentElement.parentElement.classList.contains(
                    'menu-button-mobile'
                ))
        ) {
            isMenuClick = true;
        }
        if (container.contains(e.target) || container === e.target || isMenuClick) {
            return;
        }
        this.setState({
            viewingParentMenu: ''
        });
        this.toggle();
    };

    getMenuClassesForResize = classes => {
        const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
        let nextClasses = classes.split(' ').filter(x => x !== '');
        const windowWidth = window.innerWidth;
        if (windowWidth < menuHiddenBreakpoint) {
            nextClasses.push('menu-mobile');
        } else if (windowWidth < subHiddenBreakpoint) {
            nextClasses = nextClasses.filter(x => x !== 'menu-mobile');
            if (
                nextClasses.includes('menu-default') &&
                !nextClasses.includes('menu-sub-hidden')
            ) {
                nextClasses.push('menu-sub-hidden');
            }
        } else {
            nextClasses = nextClasses.filter(x => x !== 'menu-mobile');
            if (
                nextClasses.includes('menu-default') &&
                nextClasses.includes('menu-sub-hidden')
            ) {
                nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden');
            }
        }
        return nextClasses;
    };

    getContainer = () => {
        return ReactDOM.findDOMNode(this);
    };

    toggle = () => {
        const hasSubItems = this.getIsHasSubItem();
        this.props.changeSelectedMenuHasSubItems(hasSubItems);
        const { containerClassnames, menuClickCount } = this.props;
        const currentClasses = containerClassnames
            ? containerClassnames.split(' ').filter(x => x !== '')
            : '';
        let clickIndex = -1;

        if (!hasSubItems) {
            if (
                currentClasses.includes('menu-default') &&
                (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
            ) {
                clickIndex = 1;
            } else if (
                currentClasses.includes('menu-sub-hidden') &&
                (menuClickCount === 2 || menuClickCount === 3)
            ) {
                clickIndex = 0;
            } else if (
                currentClasses.includes('menu-hidden') ||
                currentClasses.includes('menu-mobile')
            ) {
                clickIndex = 0;
            }
        } else {
            if (currentClasses.includes('menu-sub-hidden') && menuClickCount === 3) {
                clickIndex = 2;
            } else if (
                currentClasses.includes('menu-hidden') ||
                currentClasses.includes('menu-mobile')
            ) {
                clickIndex = 0;
            }
        }
        if (clickIndex >= 0) {
            this.props.setContainerClassnames(
                clickIndex,
                containerClassnames,
                hasSubItems
            );
        }
    };

    handleProps = () => {
        this.addEvents();
    };

    addEvents = () => {
        ['click', 'touchstart', 'touchend'].forEach(event =>
            document.addEventListener(event, this.handleDocumentClick, true)
        );
    };

    removeEvents = () => {
        ['click', 'touchstart', 'touchend'].forEach(event =>
            document.removeEventListener(event, this.handleDocumentClick, true)
        );
    };

    setSelectedLiActive = callback => {
        const oldli = document.querySelector('.sub-menu  li.active');
        if (oldli != null) {
            oldli.classList.remove('active');
        }

        const oldliSub = document.querySelector('.third-level-menu  li.active');
        if (oldliSub != null) {
            oldliSub.classList.remove('active');
        }

        /* set selected parent menu */
        const selectedSublink = document.querySelector('.third-level-menu  a.active');
        if (selectedSublink != null) {
            selectedSublink.parentElement.classList.add('active');
        }

        const selectedlink = document.querySelector('.sub-menu  a.active');
        if (selectedlink != null) {
            selectedlink.parentElement.classList.add('active');
            this.setState(
                {
                    selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
                        'data-parent'
                    )
                },
                callback
            );
        } else {
            var selectedParentNoSubItem = document.querySelector(
                '.main-menu  li a.active'
            );
            if (selectedParentNoSubItem != null) {
                this.setState(
                    {
                        selectedParentMenu: selectedParentNoSubItem.getAttribute(
                            'data-flag'
                        )
                    },
                    callback
                );
            } else if (this.state.selectedParentMenu === '') {
                this.setState(
                    {
                        selectedParentMenu: this.props.menuData[0].id
                    },
                    callback
                );
            }
        }
    };

    setHasSubItemStatus = () => {
        const hasSubmenu = this.getIsHasSubItem();
        this.props.changeSelectedMenuHasSubItems(hasSubmenu);
        this.toggle();
    };

    getIsHasSubItem = () => {
        const { selectedParentMenu } = this.state;
        const menuItem = this.props.menuData.find(x => x.id === selectedParentMenu);
        if (menuItem)
            return menuItem && menuItem.subs && menuItem.subs.length > 0
                ? true
                : false;
        else return false;
    };

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setSelectedLiActive(this.setHasSubItemStatus);

            window.scrollTo(0, 0);
        }
        this.handleProps();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
        this.handleProps();
        this.setSelectedLiActive(this.setHasSubItemStatus);
    }

    componentWillUnmount() {
        this.removeEvents();
        window.removeEventListener('resize', this.handleWindowResize);
    }

    toggleSubMenu = (e, menuItem) => {
        const selectedParent = menuItem.id;
        const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
        this.props.changeSelectedMenuHasSubItems(hasSubMenu);
        if (!hasSubMenu) {
            this.setState({
                viewingParentMenu: selectedParent,
                selectedParentMenu: selectedParent
            });
            this.toggle();
        } else {
            e.preventDefault();

            const { containerClassnames, menuClickCount } = this.props;
            const currentClasses = containerClassnames
                ? containerClassnames.split(' ').filter(x => x !== '')
                : '';
            if (!currentClasses.includes('menu-mobile')) {
                if (
                    currentClasses.includes('menu-sub-hidden') &&
                    (menuClickCount === 2 || menuClickCount === 0)
                ) {
                    this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
                } else if (
                    currentClasses.includes('menu-hidden') &&
                    (menuClickCount === 1 || menuClickCount === 3)
                ) {
                    this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
                } else if (
                    currentClasses.includes('menu-default') &&
                    !currentClasses.includes('menu-sub-hidden') &&
                    (menuClickCount === 1 || menuClickCount === 3 || menuClickCount === 0)
                ) {
                    this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
                    // this.props.addContainerClassname(
                    //     'menu-sub-hidden',
                    //     containerClassnames
                    // );
                }
                this.setState({
                    selectedParentMenu: selectedParent,
                    viewingParentMenu: selectedParent
                });
            } else {
                this.props.addContainerClassname(
                    'sub-show-temporary',
                    containerClassnames
                );
                this.setState({
                    selectedParentMenu: selectedParent,
                    viewingParentMenu: selectedParent
                });
            }
            if (selectedParent === this.state.selectedParentMenu && this.state.viewingParentMenu && currentClasses.includes('sub-show-temporary')) {
                this.props.removeContainerClassname(
                    'sub-show-temporary',
                    containerClassnames
                );
                this.setState({
                    selectedParentMenu: selectedParent,
                    viewingParentMenu: ''
                });
            }
        }
    };

    toggleMenuCollapse = (e, menuKey) => {
        e.preventDefault();

        let collapsedMenus = this.state.collapsedMenus;
        if (collapsedMenus.indexOf(menuKey) > -1) {
            this.setState({
                collapsedMenus: collapsedMenus.filter(x => x !== menuKey)
            });
        } else {
            collapsedMenus.push(menuKey);
            this.setState({
                collapsedMenus
            });
        }
        return false;
    };

    handleLayersSwitch = (value, event) => {
        const menuItemIdx = this.props.menuData.findIndex(x => x.id === this.state.selectedParentMenu);
        this.props.setLayersIsVisible(value, menuItemIdx);
    };

    handleSwitch = (subIdx, value, event) => {
        const menuItemIdx = this.props.menuData.findIndex(x => x.id === this.state.selectedParentMenu);
        this.props.setLayerIsVisible(value, menuItemIdx, subIdx);
    };

    render() {
        const {
            selectedParentMenu,
            viewingParentMenu,
            collapsedMenus,
        } = this.state;
        const { menuData, allSwitchesDisabled } = this.props;
        console.log(allSwitchesDisabled);
        return (
            <div className="sidebar">
                <div className="main-menu">
                    <div className="scroll">
                        <PerfectScrollbar
                            options={{ suppressScrollX: true, wheelPropagation: false }}
                        >
                            <Nav vertical className="list-unstyled">
                                {menuData &&
                                    menuData.map(item => {
                                        return (
                                            <NavItem
                                                key={item.id}
                                                className={classnames({
                                                    active:
                                                        (selectedParentMenu === item.id &&
                                                            viewingParentMenu === '') ||
                                                        viewingParentMenu === item.id
                                                })}
                                            >
                                                {item.newWindow ? (
                                                    <a
                                                        href={item.to}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                        <i className={item.icon} />{' '}
                                                        <IntlMessages id={item.label} />
                                                    </a>
                                                ) : (
                                                        <NavLink
                                                            to={item.to}
                                                            onClick={e => this.toggleSubMenu(e, item)}
                                                            data-flag={item.id}
                                                        >
                                                            <i className={item.icon} />{' '}
                                                            <IntlMessages id={item.label} />
                                                        </NavLink>
                                                    )}
                                            </NavItem>
                                        );
                                    })}
                            </Nav>
                        </PerfectScrollbar>
                    </div>
                </div>

                <div className="sub-menu">
                    <div className="scroll">
                        <PerfectScrollbar
                            options={{ suppressScrollX: true, wheelPropagation: false }}
                        >
                            {menuData &&
                                menuData.map(item => {
                                    return (
                                        <Nav
                                            key={item.id}
                                            className={classnames({
                                                'd-block':
                                                    (this.state.selectedParentMenu === item.id &&
                                                        this.state.viewingParentMenu === '') ||
                                                    this.state.viewingParentMenu === item.id
                                            })}
                                            data-parent={item.id}
                                        >
                                            {item.item === "layers" ? (
                                                <div className="layers">
                                                    <Switch
                                                        className="custom-switch custom-switch-primary custom-switch-small"
                                                        checked={item.isVisible}
                                                        disabled={allSwitchesDisabled}
                                                        onChange={(value, event) => this.handleLayersSwitch(value, event)}
                                                    />
                                                    <NavLink to={item.to}>
                                                        Показать все
                                                </NavLink>
                                                </div>
                                            ) : ''}
                                            {item.subs &&
                                                item.subs.map((sub, index) => {
                                                    return (
                                                        <NavItem
                                                            key={`${item.id}_${index}`}
                                                            className={`${
                                                                sub.subs && sub.subs.length > 0
                                                                    ? 'has-sub-item'
                                                                    : ''
                                                                }`}
                                                        >
                                                            {sub.newWindow ? (
                                                                <div>
                                                                    <a
                                                                        href={sub.to}
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                    >
                                                                        <i className={sub.icon} />{' '}
                                                                        <IntlMessages id={sub.label} />
                                                                    </a>
                                                                </div>
                                                            ) : sub.subs && sub.subs.length > 0 ? (
                                                                <Fragment>
                                                                    <NavLink
                                                                        className={`rotate-arrow-icon opacity-50 ${
                                                                            collapsedMenus.indexOf(
                                                                                `${item.id}_${index}`
                                                                            ) === -1
                                                                                ? ''
                                                                                : 'collapsed'
                                                                            }`}
                                                                        to={sub.to}
                                                                        id={`${item.id}_${index}`}
                                                                        onClick={e =>
                                                                            this.toggleMenuCollapse(
                                                                                e,
                                                                                `${item.id}_${index}`
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="simple-icon-arrow-down" />{' '}
                                                                        <IntlMessages id={sub.label} />
                                                                    </NavLink>


                                                                    <Collapse
                                                                        isOpen={
                                                                            collapsedMenus.indexOf(
                                                                                `${item.id}_${index}`
                                                                            ) === -1
                                                                        }
                                                                    >
                                                                        <Nav className="third-level-menu">
                                                                            {sub.subs.map((thirdSub, thirdIndex) => {
                                                                                return (
                                                                                    <NavItem
                                                                                        key={`${
                                                                                            item.id
                                                                                            }_${index}_${thirdIndex}`}
                                                                                    >
                                                                                        {thirdSub.newWindow ? (
                                                                                            <a
                                                                                                href={thirdSub.to}
                                                                                                rel="noopener noreferrer"
                                                                                                target="_blank"
                                                                                            >
                                                                                                <i className={thirdSub.icon} />{' '}
                                                                                                <IntlMessages
                                                                                                    id={thirdSub.label}
                                                                                                />
                                                                                            </a>
                                                                                        ) : (
                                                                                                <NavLink to={thirdSub.to}>
                                                                                                    <i className={thirdSub.icon} />{' '}
                                                                                                    <IntlMessages
                                                                                                        id={thirdSub.label}
                                                                                                    />
                                                                                                </NavLink>
                                                                                            )}
                                                                                    </NavItem>
                                                                                );
                                                                            })}
                                                                        </Nav>
                                                                    </Collapse>
                                                                </Fragment>
                                                            ) : sub.item === "layer" ? (
                                                                <div className="item-layer">
                                                                    <Switch
                                                                        className="custom-switch custom-switch-primary-inverse custom-switch-small"
                                                                        checked={sub.isVisible}
                                                                        disabled={allSwitchesDisabled}
                                                                        onChange={(value, event) => this.handleSwitch(index, value, event)}
                                                                    />
                                                                    <NavLink to={sub.to} onClick={(value, event) => this.handleSwitch(index, value, event)}>
                                                                        <IntlMessages id={sub.label} />
                                                                    </NavLink>
                                                                </div>
                                                            ) : (
                                                                            <NavLink to={sub.to}>
                                                                                <i className={sub.icon} />{' '}
                                                                                <IntlMessages id={sub.label} />
                                                                            </NavLink>
                                                                        )}
                                                        </NavItem>
                                                    );
                                                })}
                                        </Nav>
                                    );
                                })}
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ menu }) => {
    const {
        containerClassnames,
        subHiddenBreakpoint,
        menuHiddenBreakpoint,
        menuClickCount,
        menuData,
        allSwitchesDisabled,
        selectedMenuHasSubItems
    } = menu;
    return {
        containerClassnames,
        subHiddenBreakpoint,
        menuHiddenBreakpoint,
        menuClickCount,
        menuData,
        allSwitchesDisabled,
        selectedMenuHasSubItems
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        {
            setContainerClassnames,
            addContainerClassname,
            removeContainerClassname,
            changeDefaultClassnames,
            changeSelectedMenuHasSubItems,
            setLayerIsVisible,
            setLayersIsVisible
        }
    )(Sidebar)
);
