class Formatter {

        constructor () {
                this._formatters = {};
        }

        format(value, config) {
                if (!this._formatters[config.type])
                        return value;

                try {
                        return this._formatters[config.type](value, config.options);
                } catch (ex) {

                }

                return value;
        }

        useFormatter(type, format) {
                this._formatters[type] = format;
        }

}

exports.Formatter = Formatter;