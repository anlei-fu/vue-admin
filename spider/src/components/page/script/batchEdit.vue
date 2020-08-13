<template>
        <MyModal :title="title" ref="modal" @ok="ok">
           
             <Form ref="form" :model="query" :rules="rules" :label-width="120">
              <FormItem label="Fields">
                <MyCheckBoxGroup v-model="showingOptionalFields" :options="optionalFields"/>
               </FormItem>
              <MyScroll>
              
                 
                        <FormItem v-if="showScriptType"   label="scriptType" prop="scriptType">
                                <MySelect   v-model="query.scriptType" enum="scriptType" width="100%" />
                        </FormItem>
                 

                

                  
                
              
                 
                        <FormItem v-if="showEnableStatus"   label="enableStatus" prop="enableStatus">
                                <MySelect   v-model="query.enableStatus" enum="enableStatus" width="100%" />
                        </FormItem>
                 

                

                  
                
              
                 

                 
                        <FormItem v-if="showDescription"  label="description" prop="description">
                                <Input v-model="query.description" placeholder="Input value"/>
                        </FormItem>
                

                  
                
               
        </MyScroll>
             
         
          </Form>
        </MyModal>
        
      </template>
      <script>
      export default {
         props:{
                ids:{
                        type:Array,
                        default:()=>[]
                },
                title:{
                    type:String,
                    default:"title"
                }
         },
      
      
      
        data() {
            return {
                optionalFields:[
	{
		label: "scriptType",
		value: "ScriptType"
	},
	{
		label: "enableStatus",
		value: "EnableStatus"
	},
	{
		label: "description",
		value: "Description"
	}
],
                showingOptionalFields:[],
                rules:{
	path: [
		{
			required: true,
			message: "field can not be empty",
			trigger: "blur"
		},
		{
			min: 0,
			max: 10,
			message: "out of range 0-10 ",
			trigger: "blur"
		}
	],
	downSiteId: [
		{
			required: true,
			message: "field can not be empty",
			trigger: "blur"
		},
		{
			min: 0,
			max: 10,
			message: "out of range 0-10 ",
			trigger: "blur"
		}
	],
	id: [
		{
			min: 0,
			max: 10,
			message: "out of range 0-10 ",
			trigger: "blur"
		}
	],
	description: [
		{
			min: 0,
			max: 10,
			message: "out of range 0-10 ",
			trigger: "blur"
		}
	],
	scriptType: [
		{
			min: 0,
			max: 10,
			message: "out of range 0-10 ",
			trigger: "blur"
		}
	],
	enableStatus: [
		{
			min: 0,
			max: 10,
			message: "out of range 0-10 ",
			trigger: "blur"
		}
	],
	createTime: [
		{
			min: 0,
			max: 10,
			message: "out of range 0-10 ",
			trigger: "blur"
		}
	]
},
                query:{
	scriptType: null,
	downSiteId: null,
	enableStatus: null,
	path: null,
	description: null,
	id: null
},
            }
        },
        computed:{
                showScroll(){
      return this.showingOptionalFields.length>0;
    },
            
                showScriptType(){
                return this.$utils.arrayHas(this.showingOptionalFields,"ScriptType");
            },
           
                showEnableStatus(){
                return this.$utils.arrayHas(this.showingOptionalFields,"EnableStatus");
            },
           
                showDescription(){
                return this.$utils.arrayHas(this.showingOptionalFields,"Description");
            },
           
           
        },
  
        methods: {
          show(){
            this.$refs.modal.show()
          },
          close(){
              this.$refs.modal.close();
          },
          ok(){
            this.$refs.form.validate(valid=>{
                    if(valid){
                      
this.$utils.handleNormalRequest.call(this,async ()=>{
                           this.query.ids=this.ids;
                         let resp = await this.$api.script.updateBatch(this.query);
                         if(resp.code==100)
                            this.$emit("success",this.query)
                          
                          return resp;
                      });
                     
                    }
            });
          }
      
        },
      };
      </script>
      <style scoped>
      .footer{
        text-align: right;
      }
      </style>