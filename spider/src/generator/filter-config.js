class FilterConfig{

        constructor(){
                this.placeHolder="";
                this.clearable=true;
                this.lable="";
                this.model="";
        }

}

class SelectConfig extends FilterConfig{
        constructor(){
                this.mutiple=false;
                this.remoteMethod="";
                this.textField="";
                this.valueField="";
                
        }
}

class TextConfig extends FilterConfig{
        
}

class CheckBoxConfig extends FilterConfig{

}