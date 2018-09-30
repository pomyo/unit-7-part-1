
const getTimeStamp = function () {
    let date = new Date();
    return `${date.toDateString()} ${date.toTimeString()}`;
}

const timeStampedMsg = function (msg) {
    return `${getTimeStamp()}\t ${msg}`;
}

const util = {
    getTimeStamp: getTimeStamp,
    timeStampedMsg: timeStampedMsg
};

module.exports = util;
