export const changeLayerIsVisible = (menuData, payload) => {
    const { isVisible, parentId, subId } = payload;
    const newMenuData = [...menuData];
    let isAllVisible = true;
    if (parentId > -1 && subId > -1) {
        newMenuData[parentId].subs[subId].isVisible = isVisible;
        newMenuData[parentId].subs.forEach(sub => {
            isAllVisible = sub.isVisible && isAllVisible;
        });
        newMenuData[parentId].isVisible = isAllVisible;
        return newMenuData;
    }
    else return menuData;
};

export const changeLayersIsVisible = (menuData, payload) => {
    const { isVisible, parentId } = payload;
    const newMenuData = [...menuData];
    if (parentId > -1) {
        newMenuData[parentId].isVisible = isVisible;
        newMenuData[parentId].subs && newMenuData[parentId].subs.forEach(sub => {
                sub.isVisible = isVisible;
            });
        return newMenuData;
    }
    else return menuData;
};