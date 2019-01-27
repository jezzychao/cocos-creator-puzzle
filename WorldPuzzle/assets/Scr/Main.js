
window.global = window.global || {};

cc.Class({
    extends: cc.Component,

    properties: {
        pfbStart: cc.Prefab,
    },

    onLoad() {
        let tPanel = cc.instantiate(this.pfbStart);
        tPanel.parent = this.onDestroy;
        tPanel.position = cc.v2(0, 0);
        global.uiRoot = this.onDestroy;
        Utils.readProfile('puzzle_lib', (json) => {
            global.puzzle_lib = json;
        });
    },
});
