
cc.Class({
    extends: cc.Component,

    properties: {
        nodStart: cc.Node,
        btnStart: cc.Button,
    },

    ctor() {
        this.mInvalidTime = 1.0;
        this.mCanTouched = false;
    },

    onLoad() {
        this.nodStart.opacity = 0;
        this.btnStart.interactable = false;
    },

    start() {
        let tIn = cc.fadeIn(0.3);
        let tDelay = cc.delayTime(0.3);
        let tOut = cc.fadeOut(0.3);
        let tSeq = cc.sequence(tIn, tDelay, tOut, cc.callFunc(() => {
            this.nodStart.runAction(tSeq);
        }));
        this.nodStart.runAction(tSeq);
        this.node.runAction(cc.sequence(cc.delayTime(this.mInvalidTime), cc.callFunc(() => {
            this.btnStart.interactable = true;
        })));
    },

    buttonListener: function (event) {
        if (event.target.name === 'btnStart') {
            if (!this.mCanTouched) {
                return;
            }
            this.mCanTouched = false;
            Utils.openPanel('PanelGame', (result, panel) => {
                this.mCanTouched = true;
                if (result) {
                    this.node.destroy();
                    global.GameCtrl.init();
                    panel.getComponent(panel.name).init();
                }
            });
        }
    },
});
