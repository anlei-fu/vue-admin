class Filters {
        constructor () {
                this.options = "";              
                this.enabledFilters = "";              
 
        }
}

exports.Filters = Filters;

/**
 * Builder for Filters
 */
class FiltersBuilder{
        constructor(){
                this._config =new Filters();
        }

        /**
         * Set property options
         * 
         * @param {[String]} options
         * @returns {FiltersBuilder}
         */
        options(options){
                options.forEach(o=>{
                    this._config.options.push({
                          label:o,
                          value:o,
                    });
                });
                this._config.options = options;
                return this;
        }

        /**
         * Set property enabledFilters
         * 
         * @param {[String]} enabledFilters
         * @returns {FiltersBuilder}
         */
        enabledFilters(enabledFilters){
                this._config.enabledFilters = enabledFilters;
                return this;
        }

 
        /**
         * Build 
         * 
         * @returns {Filters}
         */
        build(){
                return this._config;
        }      
}

exports.FiltersBuilder = FiltersBuilder;
