<template>
        <a class="link" type="text" :title="title" @click="onClick">
           <PlainText :value="label" :color="color"/>
        </a>
</template>
<script>
export default {
        props:{
                title:{
                        type:String
                },
                path:String,
                label:String,
                color:String
        },
        methods:{
                onClick(){
                        if(path){

                        }

                        this.$emit("click");
                }
        }
}
</script>