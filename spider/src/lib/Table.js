const { expectation } = require("sinon");

class Table {
        constructor () {
                this.columns = [];              
                this.columns =[];              
                this.showingColumns = [];              
 
        }
}

exports.Table = Table;

/**
 * Builder for Table
 */
class TableBuilder{
        constructor(){
                this._config =new Table();
        }

        /**
         * Set property columns
         * 
         * @param {[String]} columns
         * @returns {TableBuilder}
         */
        columns(...columns){
                columns.forEach(c=>{
                      this._config.columns.push({
                             title:c,
                             slot:c,
                             value:c
                      });
                });
                return this;
        }

        attr(name,value,...columns){
                columns.forEach(c=>{
                        let column =this._findColumn(c);
                        if(!column){
                                throw new Error(`${c} is not exists`);
                        }
                        column[name]=value;
                    });
       
                    return this;
        }

        _findColumn(columnName){
             let columns =this._config.columns.filter(x=>x.slot==columnName);
             return columns.length==0?null:columns[0];
        }

        /**
         * Set property columns
         * 
         * @param {[String]} columns
         * @returns {TableBuilder}
         */
        columns(columns){
                this._config.columns = columns;
                return this;
        }

        /**
         * Set property showingColumns
         * 
         * @param {[String]} showingColumns
         * @returns {TableBuilder}
         */
        showingColumns(showingColumns){
                this._config.showingColumns = showingColumns;
                return this;
        }

 
        /**
         * Build 
         * 
         * @returns {Table}
         */
        build(){
                return this._config;
        }      
}

exports.TableBuilder = TableBuilder;
