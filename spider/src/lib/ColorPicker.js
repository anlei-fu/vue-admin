class ColorPicker {
        constructor () {
                this._pickers = {};
        }

        pickColor(value, config) {
                if (!this._pickers[config.type])
                        return null;

                try {
                        return this._pickers[config.type](value, config.options);
                } catch (ex) {

                }

                return value;
        }

        usePicker(type, picker) {
                this._pickers[type] = picker;
                return this;
        }
}

exports.ColorPicker = ColorPicker