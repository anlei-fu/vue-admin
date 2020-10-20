<template>
     <div>
    <day v-for="item in days" :key="item.title" :v-model="item"/>
     </div>
</template>
<script>
import day from "./day"
export default {
    data(){
        return {
            days:[]
        }
    },
    methods:{
        queryData(){

        }
    }
}
</script>