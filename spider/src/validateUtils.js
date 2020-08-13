function require(message = "field can not be empty", trigger = "blur") {
        return { required: true, message, trigger }
}

function range(min, max, message = "field out of range", trigger = "blur") {

}

function positiveNumber(message = "must be a positive number", trigger = "blur") {

}

function email(message = "email incorrect", trigger = "blur") {

}

function phoneNo(message = "phone incorrect", trigger = "blur") {

}

function telNo(message) {

}

function postCode(message) {

}

function ip(message) {

}

function port(message) {

}

function idCardNo(message) {

}

function maxLen() {

}

function minLen() {

}

const ruleFactory = {
        require,
        range,
        positiveNumber,
        email,
        phoneNo,
        telNo,
        postCode,
        ip,
        port,
        idCardNo,
        maxLen,
        minLen
};

ruleFactory.insall = (vue) => {
        console.log("installed");
        vue.$ruleFactory = vue.prototype.$ruleFactory = ruleFactory;
};

export default ruleFactory;