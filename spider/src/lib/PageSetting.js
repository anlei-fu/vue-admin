const {TableBuilder} =require("./Table");
const {FiltersBuilder} =require("./Filters");
class PageSetting {
        constructor () {
                this.filters ={};              
                this.table ={};              
 
        }
}

exports.PageSetting = PageSetting;

/**
 * Builder for PageSetting
 */
class PageSettingBuilder{
        constructor(){
                this._config =new PageSetting();
        }

        /**
         * Set property filters
         * 
         * @param {String} filters
         * @returns {PageSettingBuilder}
         */
        filters(filters){
                let builder =new FiltersBuilder();
                filters(builder);
                this._config.filters = builder.build();
                return this;
        }

        /**
         * Set property table
         * 
         * @param {String} table
         * @returns {PageSettingBuilder}
         */
        table(table){
                let builder =new TableBuilder();
                table(builder);
                this._config.table = builder.build();
                return this;
        }

 
        /**
         * Build 
         * 
         * @returns {PageSetting}
         */
        build(){
                return this._config;
        }      
}

exports.PageSettingBuilder = PageSettingBuilder;
