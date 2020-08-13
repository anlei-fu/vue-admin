const colors = {
        // green
        success: "#19BE6B",

        // red
        failed: "#ED4014",

        // purple
        wait: "#9269FF",

        // gold
        money: "#FF9900",
        disable: "#9EA1A6",
        enable: "",
        noNeed:"",
        timeout:""
}

const ENUME_COLOR={
        EnableStatus:{
                "1":colors.success,
                "0":colors.disable
        }
}

function colorPicker(value, format) {

        if (!value || !format) {
                return null;
        }

        // enum
        if (format.type=="enum") {
                if(ENUME_COLOR[format.Pattern]){
                        
                }
        }

        // money
        if (column.format.type == "money") {
                return colors.money;
        }

        return null;
}

export { colors, colorPicker }