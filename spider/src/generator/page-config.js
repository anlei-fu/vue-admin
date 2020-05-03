class PageConfig{
        constructor(){
                this.filters=[];
                this.edit=true;
                this.add=true;
                this.delete=true;
                this.exportsExcel=true;
                this.importExcel=true;
                this.columnConfig=true;
                this.batchUpdate=true;
                this.batchDelete=true;
                this.batchAdd=true;
                this.queryMethod="";
                this.deleteMethod="";
                this.updateMethod="";
                this.addMethod="";
                this.exportsExcelMethod="";
                this.importsExcelMethod="";
                this.batchAddMethod="";
                this.batchUpdateMethod="";
                this.batchDeleteMethod="";
                this.pageSizes=[];

        }
}

class RemoteConfig{
        constructor(){
                this.fields=[];
                this.method="";
        }
}



class AddConfig{
        constructor(){
                this.fields=[];
                this.updateMethod="";
        }
}

class FiledConfig{
        constructor(){
                this.name="";
                this.lable="";
                this.require="";
                this.validateMethod="";
                this.defaultValueExpression="";
        }
}