var MsgCtrl = require('MsgCtrl');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        let keys = [
            global.Key.kRefreshPuzzle,
            global.Key.kTimeOver,
            global.Key.kTimeUpdate,
            global.Key.kAnswerIncorrectly,
            global.Key.kAnswerCorrectly
        ];
        MsgCtrl.regObservers(this, this._onNotify, keys, this);
    },

    onDestroy() {
        MsgCtrl.removeAllObservers(this);
    },

    buttonListener: function (event) {

    },

    _onNotify: function (self, key, param) {
        if (key === global.Key.kRefreshPuzzle) {
            self._refresh(param.puzzle, param.time);
        } else if (key === global.Key.kTimeOver) {
            self._openFail(param);
        } else if (key === global.Key.kTimeUpdate) {
            self._updateTime(param);
        } else if (key === global.Key.kAnswerIncorrectly) {
            self._openFail(param);
        } else if (key === global.Key.kAnswerCorrectly) {
            self._openSucc(param);
        }
    },

    _refresh: function (puzzle, time) {

    },

    _openFail: function () {

    },

    _openSucc: function () {

    },

    _updateTime: function (remainSeconds) {

    },

});
