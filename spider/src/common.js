/**
 * Upper first letter
 * 
 * @param {String} input 
 * @returns {String}
 */
function upperFirstLetter(input) {
        return `${input.substr(0, 1).toUpperCase()}${input.substr(1, input.length - 1)}`;
}

/**
 * Extends sourece object with option object
 * 
 * @param {Object} source 
 * @param {Object} option 
 * @returns {Object}
 */
function extend(source, option) {
        Object.keys(option).forEach(key => {
                source[key] = option[key];
        });
        return source;
}

/**
 * CheckboxColumn config
 */
const CHECKBOX_COLUMN = {
        title: "Ckbox",
        slot: "Checkbox",
        type: "selection",
        width: 60,
        align: "center",
};

/**
 * Build normal column
 * 
 * @param {String} slot 
 * @param {String} label 
 * @param {Object} option
 * @returns {Column} 
 */
const column = (slot, label, option = {}) => {
        let column = {
                title: label || upperFirstLetter(slot),
                slot: slot,
        };
        return extend(column, option);
}

/**
 * Build date column
 * 
 * @param {String} slot 
 * @param {string} label 
 * @param {String} pattern
 * @param {Object} option 
 * @returns {Column} 
 */
const dateColumn = (slot, label, pattern, option = {}) => {
        let column = {
                slot: slot,
                title: label || upperFirstLetter(slot),
                format: {
                        type: "date",
                        pattern
                }

        };
        return extend(column, option);
};

/**
 * Build operate column
 * 
 * @param {[Opertation]} operations 
 * @param {Object} option 
 * @returns {Column} 
 */
const operateColumn = (operations, option = {}) => {
        let column = {
                title: "Op",
                slot: "test",
                isOperation: true,
                operations: operations || []
        };
        return extend(column, option);
}

/**
 * Build enum column
 * 
 * @param {String} slot 
 * @param {String} pattern 
 * @param {String} label 
 * @param {Object} option 
 * @returns {Column} 
 */
const enumColumn = (slot, pattern, label, option = {}) => {
        let column = {
                slot: slot,
                title: label || upperFirstLetter(slot),
                format: {
                        type: "enum",
                        pattern: pattern || upperFirstLetter(slot),
                }
        };
        return extend(column, option);
}

/**
 * Build operation
 * 
 * @param {String} name 
 * @param {(row)=>Boolean} matcher 
 * @returns {Operation}
 */
const operation = (name, matcher) => {
        return {
                name: name,
                label: upperFirstLetter(name),
                match: matcher || function (row) { return true }
        }
}

/**
 * Build positive progress column
 * 
 * @param {String} name 
 * @param {String} max 
 * @param {String} cur 
 * @param {Object} option 
 * @returns {Column} 
 */
const positiveProgress = (name, max, cur, option = {}) => {
        let column = {
                title: upperFirstLetter(name),
                slot: name,
                isPositiveProgress: true,
                maxField: max,
                currentField: cur
        }
        return extend(column, option);
}

/**
 * Build negative progress column
 * 
 * @param {String} name 
 * @param {String} max 
 * @param {String} cur 
 * @param {Object} option 
 * @returns {Column} 
 */
const negativeProgress = (name, max, cur, option = {}) => {
        let column = {
                title: upperFirstLetter(name),
                slot: name,
                isNegativeProgress: true,
                maxField: max,
                currentField: cur
        }
        return extend(column, option);
}

/**
 * Build batch edit setting
 * 
 * @param {String} title 
 * @returns {BatchEditSetting}
 */
const batchEditSetting = (title) => {
        return {
                model: {},
                title: title || "Batch Edit",
                ids: [],
        };
}

/**
 * Build edit setting
 * 
 * @param {String} title 
 * @returns {EditSetting}
 */
const editSetting = (title) => {
        return {
                model: {},
                title: title || "Edit",
        };
}

/**
 * Build add setting
 * 
 * @param {String} title 
 * @returns {AddSetting}
 */
const addSetting = (title) => {
        return {
                model: {},
                title: title || "Add",
        };
};

/***
 * Edit props model
 * 
 * @param {String} title
 * @returns {EditProps}
 */
const editProps = (title) => {
        return {
                model: {
                        type: Object,
                        default: () => { },
                },
                title: {
                        type: String,
                        default: title || "",
                },
        };
}


/**
 * Batch edit props
 * 
 * @param {String} title 
 * @returns {BatchEditProps}
 */
const batchEditProps = (title = "") => {
        return {
                ids: {
                        type: Array,
                        default: () => [],
                },
                title: {
                        type: String,
                        default: title,
                },
        }
}

/**
 * Add props
 * 
 * @param {String} title 
 * @returns {AddProps}
 */
const addProps = (title = "") => {
        return {
                model: {
                        type: Object,
                        default: () => { },
                },
                title: {
                        type: String,
                        default: title,
                },
        }
}

/**
 * Show add modal
 * require ：
 *  @type {AddProps} 'addSetting'
 *  modal 'modal'
 * 
 * @param {Object} model
 * @param {String} title
 */
function showAdd(model = {}, title = "add") {
        this.addSetting.title = title;
        this.addSetting.model = model;
        this.$refs.add.show();
};

/**
 * Call add api
 * 
 */
function add() {
        this.$refs.form.validate((valid) => {
                if (valid) {
                        this.$utils.handleNormalRequest.call(this, () =>
                                this.$api[this.api].add(this.query))
                }
        });
}

/**
 * Show edit modal
 * 
 * @param {Object} row 
 * @param {String} title 
 */
function showEdit(row, title = "edit") {
        this.editSetting.title = title;
        this.editSetting.model = row;
        this.$refs.edit.show();
};

/**
 * Call edit api and update table if success
 */
function edit() {
        this.$refs.form.validate((valid) => {
                if (valid) {
                        this.$utils.handleNormalRequest.call(this, async () => {
                                let resp = await this.$api[this.api].updateById(this.query);
                                if (resp.code == 100) {
                                        this.$emit("success", this.query);
                                        this.close();
                                }
                                return resp;
                        });
                }
        });
}

/**
 * Update table when edit succeed
 * 
 * @param {Objec} row 
 * @param {String} idFiled 
 */
function onEditSuccess(row, idFiled = "id") {
        let data = this.data.list.filter((x) => x[idFiled] == row[idFiled]);
        if (data.length > 0) copyFieldsFrom(data[0], row);
}

/**
 * Show batch edit modal
 */
function batchEdit(title = "Batch Edit") {
        if (checkCount.call(this)) {
                this.batchEditSetting.title = title;
                this.batchEditSetting.ids = getIds.call(this);
                this.$refs.batchEdit.show();
        }
}

/**
 * Call batch edit api and update table if success
 */
function batchEdit() {
        this.query.ids = this.ids;
        this.$refs.form.validate((valid) => {
                if (valid) {
                        this.$utils.handleNormalRequest.call(this, async () => {
                                let resp = await this.$api[this.api].updateBatch(this.query);
                                if (resp.code == 100) {
                                        this.$emit("success", this.query);
                                        this.close();
                                }
                                return resp;
                        });
                }
        });
}

/**
 * Update table when batch edit succeed
 * 
 * @param {Object} data 
 * @param {String} idField 
 */
function onBatchEditSuccess(data, idField = "id") {
        let set = new Set(data.ids);
        this.data.list.forEach((x) => {
                if (set.has(x[idField])) copyFieldsFrom(x, data);
        });
};

/**
 * Show batch delete if success update table
 * 
 * @param {String} idField 
 * @param {String} msg 
 */
function batchDelete(idField = "id", msg = "are you sure to delete these data?") {
        if (checkCount.call(this)) {
                this.$utils.showComfirm.call(
                        this,
                        "Delete comfirm",
                        msg,
                        () => {
                                this.$utils.handleNormalRequest.call(
                                        this,
                                        async () => this.$api[this.api].deleteBatch(getIds.call(this, idField)),
                                        true
                                );
                        }
                );
        }
}

/**
 * Show delete confirm if success update table
 * 
 * @param {Object} row 
 * @param {String} idField 
 * @param {String} msg 
 */
function showDelete(row, idField = "id", msg = "are you sure to delete this data?") {
        this.$utils.showComfirm.call(
                this,
                "Delete comfirm",
                msg,
                () => {
                        this.$utils.handleNormalRequest.call(this, async () => {
                                let resp = await this.$api[this.api].deleteById({ id: row[idField] });
                                if (resp.code == 100)
                                        this.data.list = this.data.list.filter((x) => x[idField] != row[idField]);
                                this.data.total -= 1;

                                return resp;
                        });
                }
        );
};

/**
 * Check batch is there any row selected for batch operation
 */
function checkCount() {
        let items = this.$refs.table.getSelection();
        if (items.length == 0) {
                this.$Message.info("no data selected");
                return false;
        }
        return true;
};

/**
 * Get id array from selected rows
 * 
 * @param {String} idField 
 */
function getIds(idField = "id") {
        return this.$utils.pickObjectArrayFileds(
                this.$refs.table.getSelection(),
                idField
        );
};

/**
 * Build filter options
 * 
 * @param {[String]} items 
 * @returns {[Option]}
 */
const options = (items) => {
        let ops = [];
        items.forEach(x => {
                ops.push({
                        label: upperFirstLetter(x),
                        value: upperFirstLetter(x)
                });
        });
        return ops;
}

/**
 * Build radio group options
 * 
 * @param {String} items 
 * @returns {[RadioGroupOption]}
 */
const radioOptions = (items) => {
        let ops = [];
        items.forEach(x => {
                ops.push({
                        label: upperFirstLetter(x),
                        value: x
                });
        });
        return ops;
};

/**
 * Build data props
 * 
 * @returns {DataProps}
 */
const data = () => {
        return {
                total: 0,
                list: []
        };
}

/**
 * Init filter showing control fields
 */
function initFilterOptionShows() {
        this.pageSetting.filters.options.forEach(item => {
                this["show" + item.value] = true;
        });
}

/**
 * Change showing filters
 * 
 * @param {[String]} showings 
 */
function changeShowingFilters(showings) {
        let set = new Set(showings);
        this.pageSetting.filters.options.forEach((op) => {
                this["show" + op.value] = set.has(op.value);
        });
}

/**
 * Init optional fields showing control fields
 */
function initOptionsFieldsShows() {
        let set = new Set(this.showingOptionalFields);
        this.optionalFields.forEach(item => {
                        this["show" + item.value] = set.has(item.value);
        });
}

/**
 * Change showing optional fields
 * 
 * @param {[String]} showings 
 */
function changeShowingOptionalFields(showings) {
        let set = new Set(showings);
        this.optionalFields.forEach((op) => {
                if (set.has(op.value)) {
                        this["show" + op.value] = true;
                } else {
                        this["show" + op.value] = false;
                }
        });
}

/**
 * Copy fields from source object
 * 
 * @param {Object} target 
 * @param {Object} source 
 */
function copyFieldsFrom(target, source) {
        Object.keys(target).forEach(x => {
                if (source[x] != null)
                        target[x] = source[x];
        });
}

/**
 * Call get list data api and re-render table
 * 
 * @param {Boolean} reset 
 * @param {Boolean} radio 
 * @param {Boolean} timeRange 
 */
function getData(reset, radio = false, timeRange = false) {
        if (reset) {
                this.query.pageIndex = 1;
        }

        if (radio) {
                this.$utils.resetFields(
                        this.query,
                        null,
                        this.$utils.pickObjectArrayFileds(this.radioOptions, "value")
                );

                this.query[this.radioKey] = this.keyword;
        }

        if (timeRange) {
                this.query.createTimeStart = this.timeRange[0];
                this.query.createTimeEnd = this.timeRange[1];

                this.$utils.getListData.call(this, () =>
                        this.$api[this.api].getList(this.query)
                );
        }
}

/**
 * Require rule validator
 * 
 * @param {Any} _ 
 * @param {Any} value 
 * @param {(Error?)=>void} cb 
 */
const requireValidator = (_, value, cb) => {
        if (value == undefined) {
                cb(new Error("empty"));
        }

        cb();
};

/**
 * Require rule builder
 * 
 * @param {String} msg 
 * @param {String} trigger 
 */
const require = (msg, trigger) => {
        return {
                required: true,
                validator: requireValidator,
                message: msg || "field can not be empty",
                trigger: trigger || "blur",
        }
}

/**
 * Range validator
 * 
 * @param {Any} rule 
 * @param {Number} value 
 * @param {(Error?)=>Void} cb 
 */
const rangeValidator = (rule, value, cb) => {
        if (isNaN(value) || value < rule.min)
                cb(Error("out of range"));

        if (value > rule.max)
                cb(Error("out of range"));

        cb();
};

/**
 * Build range rule
 * 
 * @param {Number} min 
 * @param {Number} max 
 * @param {String} msg 
 * @param {String} trigger 
 */
const range = (min, max, msg, trigger) => {
        return {
                validator: rangeValidator,
                min: min,
                max: max,
                message: msg || `out of range ${min}-${max} `,
                trigger: trigger || "blur",
        }
}

/**
 * Build email rule
 */
const email = () => {
        return {
                type: "email",
                message: "email incorrect ",
                trigger: "blur",
        }
}

/**
 * Build ip rule
 * 
 * @param {String} msg 
 * @param {String} trigger 
 */
const ip = (msg, trigger) => {
        return {
                pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
                message: msg || "ip incorrect",
                trigger: trigger || "blur"
        }
};

/**
 * 
 * @param {String} msg 
 * @param {String} trigger 
 */
const port = (msg, trigger) => {
        return {
                validator: rangeValidator,
                min: 1,
                max: 63000,
                message: msg || `out of port number range `,
                trigger: trigger || "blur",
        }
};

/**
 * Builde mobile rule
 * 
 * @param {String} msg 
 * @param {String} trigger 
 */
const phone = (msg, trigger) => {
        return {
                pattern: /^1[3456789]\d{9}$/,
                message: msg || "phone incorrect",
                trigger: trigger || "blur"
        }
}

/**
 * Builde url rule
 * 
 * @param {String} msg 
 * @param {String} trigger 
 */
const url = (msg, trigger) => {
        return {
                type: "url",
                message: msg || "url incorrect",
                trigger: trigger || "blur",
        }
}

/**
 * Json array rule validator
 * 
 * @param {Null} _ 
 * @param {String} value 
 * @param {(Error?)=>Void} cb 
 */
const jsonArrayValidator = (_, value, cb) => {
        try {
                let array = JSON.parse(value);
                if (typeof array == "array")
                        cb();

                cb(new Error("incorrect json!"))
        } catch (ex) {
                cb(ex)
        }
}

/**
 * Builde json array rule
 * 
 * @param {String} msg 
 * @param {String} trigger 
 */
const jsonArray = (msg, trigger) => {
        return {
                message: msg || "Incorrect json array",
                trigger: trigger || "blur",
                validator: jsonArrayValidator
        }
};

/**
 * Json object rule validator
 * 
 * @param {Null} _ 
 * @param {String} value 
 * @param {(Error?)=>Void} cb 
 */
const jsonObjectValidator = (_, value, cb) => {
        try {
                let array = JSON.parse(value);
                if (typeof array == "object")
                        cb();

                cb(new Error("incorrect json!"))
        } catch (ex) {
                cb(ex)
        }
}

/**
 * Builde json object rule
 * 
 * @param {String} msg 
 * @param {String} trigger 
 */
const jsonObject = (msg, trigger) => {
        return {
                message: msg || "Incorrect json object",
                trigger: trigger || "blur",
                validator: jsonObjectValidator
        }
};

export default {
        CHECKBOX_COLUMN,
        batchEditSetting,
        editSetting,
        addSetting,
        enumColumn,
        dateColumn,
        column,
        operateColumn,
        operation,
        options,
        positiveProgress,
        negativeProgress,
        showAdd,
        showEdit,
        showDelete,
        batchDelete,
        onBatchEditSuccess,
        onEditSuccess,
        batchEdit,
        radioOptions,
        initFilterOptionShows,
        getData,
        data,
        require,
        range,
        email,
        phone,
        ip,
        port,
        url,
        jsonArray,
        jsonObject,
        initOptionsFieldsShows,
        copyFieldsFrom,
        add,
        edit,
        batchEdit,
        editProps,
        batchEditProps,
        addProps,
        changeShowingOptionalFields,
        changeShowingFilters
}