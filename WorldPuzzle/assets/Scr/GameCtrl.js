var MsgCtrl = require('MsgCtrl');
function randomArrangement() {
    let keys = Object.keys(global.puzzle_lib);
    for (let i = 0; i < keys.length - 1; ++i) {
        let tRandomIndex = Math.floor(Math.random() * (keys.length - 1));
        let temp = keys[i];
        keys[i] = keys[tRandomIndex];
        keys[tRandomIndex] = temp;
    }
    return keys;
};

//TODO:
function share() {
    console.log('share with friends');
};

class Timer {
    constructor() {
        this.mTimes = 10;
        this.mInterval = null;
        this.mDelegate = {};
    }

    start() {
        this.mInterval = setInterval(function () {
            --this.mTimes;
            this.mDelegate['onUpdate'] && this.mDelegate['onUpdate'](this.mTImes);
            if (this.mTimes === 0) {
                this.mDelegate['onTimeover'] && this.mDelegate['onTimeover']();
                this.stop();
            }
        }, 1000);
    }

    onTimeOver(func) {
        this.mDelegate['onTimeover'] = func;
    }

    onUpdate(func) {
        this.mDelegate['onUpdate'] = func;
    }

    reset() {
        return this.mTimes = 10;
    }

    stop() {
        if (this.mInterval) {
            clearInterval(this.mInterval);
            this.mInterval = null;
        }
    }
};

var GameCtrl = {

    mQuesQueue: null,

    mTimer: null,

    mCurrQues: null,

    mScores: null,

    init: function () {
        this.mQuesQueue = randomArrangement();
        this.mScores = 0;
        this.mTimer = new Timer();
        this.mTimer.onTimeOver(() => {
            this.mTimer.stop();
            let tAnswerCode = global.puzzle_lib[this.mCurrQues]['answer'];
            MsgCtrl.post(global.Key.kTimeOver, global.puzzle_lib[this.mCurrQues][`option${tAnswerCode}`]);
        });
        this.mTimer.onUpdate((remainSeconds) => {
            MsgCtrl.post(global.Key.kTimeUpdate, remainSeconds);
        });

        let keys = [
            global.Key.kOnSelect,
            global.Key.kGoNextPuzzle
        ];
        MsgCtrl.regObservers('GameCtrl', this._onNotify, keys, this);
        this._goNext();
    },

    uninit: function () {
        MsgCtrl.removeAllObservers('GameCtrl');
        this.mQuesQueue = null;
        this.mScores = null
        this.mTimer = null;
        this.mCurrQues = null;
    },

    _onNotify: function (self, key, param) {
        if (key === global.Key.kOnSelect) {
            self.mTimer.stop();
            let tSelectCode = param + 1;
            let tAnswerCode = global.puzzle_lib[self.mCurrQues]['answer'];
            if (tAnswerCode === tSelectCode) {
                self.mScores += 2;
                MsgCtrl.post(global.Key.kAnswerCorrectly, 2);
            } else {
                MsgCtrl.post(global.Key.kAnswerIncorrectly, global.puzzle_lib[self.mCurrQues][`option${tAnswerCode}`]);
            }
        } else if (key === global.Key.kGoNextPuzzle) {
            self._goNext();
        } else if (key === global.Key.kRestatrGame) {
            self.mQuesQueue = randomArrangement();
            self.mScores = 0;
            self.mCurrQues = null;
            self._goNext();
        } else if (key === global.Key.kShareWithFriends) {
            share();
        }
    },

    _goNext: function () {
        this.mCurrQues = this.mQuesQueue.shift();
        let time = this.mTimer.reset();
        MsgCtrl.post(global.Key.kRefreshPuzzle, {
            puzzle: global.puzzle_lib[this.mCurrQues],
            time: time,
        });
        this.mTimer.start();
    },
};
window.global = window.global || {};
global.GameCtrl = GameCtrl;