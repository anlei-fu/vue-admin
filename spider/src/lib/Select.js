class Select {
        constructor () {
                this.model = "";              
                this.enum = "";              
 
        }
}

exports.Select = Select;

/**
 * Builder for Select
 */
class SelectBuilder{
        constructor(){
                this._config =new Select();
        }

        /**
         * Set property model
         * 
         * @param {String} model
         * @returns {SelectBuilder}
         */
        model(model){
                this._config.model = model;
                return this;
        }

        /**
         * Set property _enum
         * 
         * @param {String} _enum
         * @returns {SelectBuilder}
         */
        __enum(_enum){
                this._config._enum = _enum;
                return this;
        }

 
        /**
         * Build 
         * 
         * @returns {Select}
         */
        build(){
                return this._config;
        }      
}

exports.SelectBuilder = SelectBuilder;
