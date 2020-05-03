<template>
                <FormItem v-if="config.type=='input'" :label="config.lable" :prop="config.name">
            <Input v-model="value" :placeholder="config.placeHolder"/>
        </FormItem>
               <FormItem v-else-if="config.type=='select'" :label="config.lable" :prop="config.name">
            <Input v-model="value" :placeholder="config.placeHolder"/>
        </FormItem>
          <FormItem v-else-if="config.type=='checkBox'" :label="config.lable" :prop="config.name">
            <Input v-model="value" :placeholder="config.placeHolder"/>
        </FormItem>
           <FormItem v-else-if="config.type=='textarea'" :label="config.lable" :prop="config.name">
            <Input v-model="value" :placeholder="config.placeHolder"/>
        </FormItem>
</template>
<script>
export default {
        props:{
           config:Object
        },
        data(){
              return{
                        value:null,
              }
        }
}
</script>