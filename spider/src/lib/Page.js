const {SelectBuilder} =require("./Select");
const {PageSettingBuilder} =require("./PageSetting");
const {RadioGroupBuilder} =require("./RadioGroup");
class Page {
        constructor () {
                this.pageSitting = {};              
                this.selects = [];              
                this.radioGroup = {};              
                this.add = false;              
                this.edit = false;              
                this.editBatch = "";              
                this._delete = false;              
                this.deleteBatch = false;    
                this.timeRange=false;          
        }
}

exports.Page = Page;

/**
 * Builder for Page
 */
class PageBuilder{
        constructor(){
                this._config =new Page();
        }

        /**
         * Set property pageSitting
         * 
         * @param {String} pageSitting
         * @returns {PageBuilder}
         */
        pageSitting(pageSitting){
                let builder =new PageSettingBuilder();
                pageSitting(builder);
                this._config.pageSitting = builder.build();
                return this;
        }

        /**
         * Set property select
         * 
         * @param {String} select
         * @returns {PageBuilder}
         */
        select(select){
                let builder = new SelectBuilder();
                select(builder);
                this._config.selects.push(builder.build());
                return this;
        }

        /**
         * Set property radioGroup
         * 
         * @param {String} radioGroup
         * @returns {PageBuilder}
         */
        radioGroup(radioGroup){
                let builder =new RadioGroupBuilder();
                builder(radioGroup);
                this._config.radioGroup = builder.build();
                return this;
        }

        /**
         * Set property add
         * 
         * @returns {PageBuilder}
         */
        add(){
                this._config.add = true;
                return this;
        }

        /**
         * Set property edit
         * 
         * @returns {PageBuilder}
         */
        edit(){
                this._config.edit = true;
                return this;
        }

        /**
         * Set property delete
         * 
         * @returns {PageBuilder}
         */
        _delete(){
                this._config._delete = true;
                return this;
        }

        /**
         * Set property editBatch
         * 
         * @returns {PageBuilder}
         */
        editBatch(){
                this._config.editBatch = true;
                return this;
        }

        /**
         * Set property deleteBatch
         * 
         * @returns {PageBuilder}
         */
        deleteBatch(deleteBatch){
                this._config.deleteBatch = true;
                return this;
        }

        timeRange(){
                this._config.timeRange = true;
                return this;
        }

 
        /**
         * Build 
         * 
         * @returns {Page}
         */
        build(){
                return this._config;
        }      
}

exports.PageBuilder = PageBuilder;
