
/**
 * Deep clone
 * 
 * @param {Object} obj
 * @returns {Any} 
 */
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}


function getCache(cacheKey, options) {
    return clone(options);

}

function isOutterLink(url){
    if(!url)
      return false;

    url=url.trim();
    return url.startsWith("http")||url.startsWith("https");
}

function resetQuery(query){
    Object.keys(query).forEach(key=>{
       query[key]=null;
    });
}

/**
 * Convert array to object
 * 
 * @param {[Object]} array 
 * @param {String} key
 * @returns {Object} 
 */
function arraytoObject(array, key) {
    let obj = {};
    array.forEach(item => {
        obj[item[key]] = item;
    });

    return obj;
}

/**
 * Covert object to array
 * 
 * @param {Object} target
 * @returns {[]} 
 */
function objectToArray(target) {
    let array = [];
    Object.keys(target).forEach(key => {
        array.push(target[key]);
    })

    return array;
}

/**
 * Upper first letter of string
 * 
 * @param {String} input 
 * @returns {String}
 */
function upperFirstLetter(input) {
    return `${input.substr(0, 1).toUpperCase()}${input.substr(1, input.length - 1)}`;
}

function handleDelete(ids){

}

function handleUpdate(id,newModel){

}

/**
* Lower fisrt letter of string
* 
* @param {String} input 
* @returns {String}
*/
function lowerFirstLetter(input) {
    return `${input.substr(0, 1).toLowerCase()}${input.substr(1, input.length - 1)}`;
}

/**
 * Reset object fields with a value
 * 
 * @param {Object} target 
 * @param {Any} value 
 * @param  {...any} fields 
 */
function resetFields(target, value, fields) {
    fields.forEach(x => {
        target[lowerFirstLetter(x)] = value
    })
}

function arrayRemoveAt(array, index) {

}

/**
 * Get an array of target field from an array of object
 * 
 * @param {[Object]} array 
 * @param {String} field 
 * @returns {[]}
 */
function pickObjectArrayFileds(array, field) {
    let ret = [];
    array.forEach(x => ret.push(x[field]));
    return ret;

}

/**
 * Handle normal request result
 * 
 * @param {()=>ApiResponse} request 
 * @param {boolean} refresh
 */
async function handleNormalRequest(request, refresh = false) {
    try {
        let resp = await request();
        if (resp.code == 100) {
            this.$Message.success(resp.message);
            if (refresh)
                this.getData(true);
        } else {
            this.$Message.error(resp.message);
        }
    } catch (ex) {
        console.error(ex);
        this.$Message.error("exception hanpend");
    }
}

/**
 * Show comfirm
 * 
 * @param {String} title 
 * @param {String} content 
 * @param {()=>void} success 
 */
function showComfirm(title, content, success) {
    this.$Modal.confirm({
        title: title,
        content: content,
        okText:"Yes",
        cancelText:"No",
        onOk: () => {
            success();
        },
    });
}


/**
 * Check if an array has item of matcher
 *  
 * @param {*} array 
 * @param {*} matcher 
 */
function arrayHas(array, matcher) {
    for (const item of array) {
        if (item == matcher)
            return true;
    }

    return false;
}

/**
 * Copy fields from source object
 * 
 * @param {Object} target 
 * @param {Object} source 
 */
function copyFieldsFrom(target, source) {
    Object.keys(target).forEach(x => {
        if (source[x]!=null)
            target[x] = source[x];
    });
}

/**
 * Call get list data api and reset "data" field of this
 * 
 * @param {()=>ApiResponse} getter 
 */
async function getListData(getter) {
    let res = await getter();
    if (res.code == 100) {
        this.data.list = res.data.list;
        this.data.total = res.data.total;
    } else {
        this.$Message.error(resp.message);
    }
}

function cloneFields(target,fileds,defaultFields=["id"]){
    let set = new Set(fileds.concat(defaultFields));
    let ret ={};
    Object.keys(target).forEach(key=>{
          if(set.has(key))
           ret[key]=target[key];
    })

    return ret;
}

function checkFilterShowing(filterName) {
    return arrayHas(this.pageSetting.filters.enabledFilters, x => x == filterName)
}

export default {
    clone,
    getCache,
    arrayHas,
    checkFilterShowing,
    getListData,
    showComfirm,
    resetFields,
    copyFieldsFrom,
    pickObjectArrayFileds,
    arrayRemoveAt,
    objectToArray,
    arraytoObject,
    handleNormalRequest,
    cloneFields,
    isOutterLink,
    resetQuery
}
