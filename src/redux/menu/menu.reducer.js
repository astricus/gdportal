import {

    MENU_SET_CLASSNAMES,
    MENU_CONTAINER_ADD_CLASSNAME,
    MENU_CONTAINER_REMOVE_CLASSNAME,
    MENU_CLICK_MOBILE_MENU,
    MENU_CHANGE_DEFAULT_CLASSES,
    MENU_CHANGE_HAS_SUB_ITEM_STATUS,
    MENU_CHANGE_LAYER_IS_VISIBLE,
    MENU_CHANGE_LAYERS_IS_VISIBLE,
    MENU_TOGGLE_SWITCHES_DISABLE
} from '../actions';

import { defaultMenuType, subHiddenBreakpoint, menuHiddenBreakpoint } from '../../constants/defaultValues';
import menuData from '../../constants/menu';

import { changeLayerIsVisible, changeLayersIsVisible } from './menu.utils';


const INIT_STATE = {
    containerClassnames: defaultMenuType,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount: 0,
    menuData: menuData,
    allSwitchesDisabled: true,
    selectedMenuHasSubItems: defaultMenuType === "menu-default" //if you use menu-sub-hidden as default menu type, set value of this variable to false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case MENU_CHANGE_HAS_SUB_ITEM_STATUS:
            return Object.assign({}, state, {
                selectedMenuHasSubItems: action.payload
            })

        case MENU_SET_CLASSNAMES:
            return Object.assign({}, state, {
                containerClassnames: action.payload.containerClassnames,
                menuClickCount: action.payload.menuClickCount
            })

        case MENU_CLICK_MOBILE_MENU:
            return Object.assign({}, state, {
                containerClassnames: action.payload.containerClassnames,
                menuClickCount: action.payload.menuClickCount
            })

        case MENU_CONTAINER_ADD_CLASSNAME:
            return Object.assign({}, state, {
                containerClassnames: action.payload
            })

        case MENU_CONTAINER_REMOVE_CLASSNAME:
            return Object.assign({}, state, {
                containerClassnames: action.payload.containerClassnames,
                menuClickCount: action.payload.menuClickCount
            })

        case MENU_CHANGE_DEFAULT_CLASSES:
            return Object.assign({}, state, {
                containerClassnames: action.payload
            })

        case MENU_CHANGE_LAYER_IS_VISIBLE:
            return Object.assign({}, state, {
                menuData: changeLayerIsVisible(state.menuData, action.payload)
            })

        case MENU_CHANGE_LAYERS_IS_VISIBLE:
            return Object.assign({}, state, {
                menuData: changeLayersIsVisible(state.menuData, action.payload)
            })

        case MENU_TOGGLE_SWITCHES_DISABLE:
            return Object.assign({}, state, {
                allSwitchesDisabled: action.payload
            })

        default: return { ...state };
    }
}
