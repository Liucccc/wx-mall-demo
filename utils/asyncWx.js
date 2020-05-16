/**
 * promise 形式 getSetting
 */
export const getSetting = () => {
    return new Promise((reslove, reject) => {
        wx.getSetting({
            success: (result) => {
                reslove(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => { }
        });
    })
}

/**
 * promise 形式 chooseAddress
 */
export const chooseAddress = () => {
    return new Promise((reslove, reject) => {
        wx.chooseAddress({
            success: (result) => {
                reslove(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => { }
        });
    })
}

/**
 * promise 形式 openSetting
 */
export const openSetting = () => {
    return new Promise((reslove, reject) => {
        wx.openSetting({
            success: (result) => {
                reslove(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => { }
        });
    })
}