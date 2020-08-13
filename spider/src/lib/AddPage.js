class AddPage {
        constructor () {
                this.optionalFields = "";              
                this.selects = "";              
                this.texts = "";              
                this.textArea = "";              
                this.rules = "";              
 
        }
}

exports.AddPage = AddPage;

/**
 * Builder for AddPage
 */
class AddPageBuilder{
        constructor(){
                this._config =new AddPage();
        }

        /**
         * Set property optionalFields
         * 
         * @param {String} optionalFields
         * @returns {AddPageBuilder}
         */
        optionalFields(optionalFields){
                this._config.optionalFields = optionalFields;
                return this;
        }

        /**
         * Set property selects
         * 
         * @param {String} selects
         * @returns {AddPageBuilder}
         */
        selects(selects){
                this._config.selects = selects;
                return this;
        }

        /**
         * Set property texts
         * 
         * @param {String} texts
         * @returns {AddPageBuilder}
         */
        texts(texts){
                this._config.texts = texts;
                return this;
        }

        /**
         * Set property textArea
         * 
         * @param {String} textArea
         * @returns {AddPageBuilder}
         */
        textArea(textArea){
                this._config.textArea = textArea;
                return this;
        }

        /**
         * Set property rules
         * 
         * @param {String} rules
         * @returns {AddPageBuilder}
         */
        rules(rules){
                this._config.rules = rules;
                return this;
        }

 
        /**
         * Build 
         * 
         * @returns {AddPage}
         */
        build(){
                return this._config;
        }      
}

exports.AddPageBuilder = AddPageBuilder;
