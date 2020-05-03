
class Menu{
        constructor(){
                this.lable="";
                this.path="";
                this.icon="";
                this.name="";
                this.moduleName="";
                this.menus=[new Menu];
        }
}

class Module{
   constructor(){
           this.menus=[new Menu()];
           this.lable="";
           this.defaultMenuName="";
           this.icon="";
   }
}