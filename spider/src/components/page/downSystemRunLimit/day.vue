<template>
    <div><span></span> <MyCheckBoxGroup/></div>
</template>
<script>
export default {
    model:{
        event:"change",
        prop:"value"
    },
    props:{
        options:{
            type:Array,
            default:()=>[]
        },
        title:String
    },
    data(){
        return {
            selected_:[],
            value_:{
                enbabels:[],
                disables:[]
            }
        }
    }
}
</script>