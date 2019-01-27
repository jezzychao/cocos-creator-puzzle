
var Utils = {
    switchPanel: function (showPanel, hidePanel) {

    },

    openPanel: function (name, cb) {
        cc.loader.loadRes(`Prefabs/${name}`, (err, res) => {
            if (err) {
                cb && cb(false);
                return;
            }
            let tPanel = cc.instantiate(res);
            tPanel.parent = global.uiRoot;
            tPanel.position = cc.v2(0, 0);
            cb && cb(true, tPanel);
        });
    },

    readProfile: function (name, cb) {
        cc.loader.loadRes(`Profiles/${name}`, (err, res) => {
            if (err) {
                throw new Error(`Profiles/${name} do not exist!!!`);
            }
            cb && cb(res.json);
        });
    },

    countProperty: function (obj) {
        if (!obj) {
            return 0;
        }

        return Object.getOwnPropertyNames(obj).length;
    },
};

window.global = window.global || {};
global.Utils = Utils;