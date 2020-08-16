function upperFirstLetter(input) {
        return `${input.substr(0, 1).toUpperCase()}${input.substr(1, input.length - 1)}`;
}

function extend(source, option) {
        Object.keys(option).forEach(key => {
                source[key] = option[key];
        });
        return source;
}

/**
 * CheckboxColumn
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

const editProps = () => {
        return {
                model: {
                        type: Object,
                        default: () => { },
                },
                title: {
                        type: String,
                        default: "",
                },
        };
}

const batchEditProps = () => {
        return {
                ids: {
                        type: Array,
                        default: () => [],
                },
                title: {
                        type: String,
                        default: "title",
                },
        }
}

const addProps = () => {
        return {
                model: {
                        type: Object,
                        default: () => { },
                },
                title: {
                        type: String,
                        default: "",
                },
        }
}

function showAdd() {
        this.addSetting.title = "add";
        this.addSetting.model = {};
        this.$refs.add.show();
};

function add() {
        this.$refs.form.validate((valid) => {
                if (valid) {
                        this.$utils.handleNormalRequest.call(this, () =>
                                this.$api[this.api].add(this.query))
                }
        });
}

function showEdit(row) {
        this.editSetting.title = "edit";
        this.editSetting.model = row;
        this.$refs.edit.show();
};

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

function batchEdit() {
        if (checkCount.call(this)) {
                this.batchEditSetting.ids = getIds.call(this);
                this.$refs.batchEdit.show();
        }
};

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

function checkCount() {
        let items = this.$refs.table.getSelection();
        if (items.length == 0) {
                this.$Message.info("no data selected");
                return false;
        }
        return true;
};

function getIds(idField) {
        return this.$utils.pickObjectArrayFileds(
                this.$refs.table.getSelection(),
                idField
        );
};

function onEditSuccess(row, idFiled = "id") {
        let data = this.data.list.filter((x) => x[idFiled] == row[idFiled]);
        if (data.length > 0) copyFieldsFrom(data[0], row);
}

function onBatchEditSuccess(data, idField = "id") {
        let set = new Set(data.ids);
        this.data.list.forEach((x) => {
                if (set.has(x[idField])) copyFieldsFrom(x, data);
        });
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

const data = () => {
        return {
                total: 0,
                list: []
        };
}

function initFilterOptionShow() {
        this.pageSetting.filters.options.forEach(item => {
                this["show" + item.value] = true;
        });
}

function changeShowingFilters(showings) {
        let set = new Set(showings);
        this.pageSetting.filters.options.forEach((op) => {
                if (set.has(op.value)) {
                        this["show" + op.value] = true;
                } else {
                        this["show" + op.value] = false;
                }
        });
}

function initOptionsShow() {
        let set = new Set(this.showingOptionalFields);
        this.optionalFields.forEach(item => {
                if (set.has(item.value)) {
                        this["show" + item.value] = true;
                } else {
                        this["show" + item.value] = false;
                }
        });
}

function changeShowOptionalFields(showings) {
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

const validator = (rule, value, cb) => {
        if (!value) {
                cb(new Error("empty"));
        }

        cb();
};

const require = (msg, trigger) => {
        return {
                required: true,
                validator,
                message: msg || "field can not be empty",
                trigger: trigger || "blur",
        }
}

const rangeValidator = (rule, value, cb) => {
        if (isNaN(value) || value < rule.min)
                cb(Error("out of range"));

        if (value > rule.max)
                cb(Error("out of range"));

        cb();
};

const range = (min, max, msg, trigger) => {
        return {
                validator: rangeValidator,
                min: min,
                max: max,
                message: msg || `out of range ${min}-${max} `,
                trigger: trigger || "blur",
        }
}

const email = () => {
        return {
                type: "email",
                message: "email incorrect ",
                trigger: "blur",
        }
}

const ip = () => {
        return {
                pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/, 
                message: "ip incorrect", 
                trigger: "blur"
        }
};

const port = (msg,trigger) => {
        return {
                validator: rangeValidator,
                min: 1,
                max: 63000,
                message:msg||`out of port number range `,
                trigger: trigger||"blur",
        }
};

const phone = () => {
        return {
                pattern: /^1[3456789]\d{9}$/, 
                message: "phone incorrect", 
                trigger: "blur"
        }
}

const url = () => {
        return {
                type: "url",
                message: "url incorrect",
                trigger: "blur",
        }
}

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
        initFilterOptionShow,
        getData,
        data,
        require,
        range,
        email,
        phone,
        ip,
        port,
        url,
        initOptionsShow,
        copyFieldsFrom,
        add,
        edit,
        batchEdit,
        editProps,
        batchEditProps,
        addProps,
        changeShowOptionalFields,
        changeShowingFilters
}