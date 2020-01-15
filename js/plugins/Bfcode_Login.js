

//var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
var test =require("./js/apis/test.js");

test.getAnswer().then(res=>{alert(res)}).catch(err=>{
    alert(err.message)
})
Game_Interpreter.prototype.pluginCommand = function(command, args){
    
    switch(command){
        case "start":
        alert("冒险开始了")
        break;
        default:
        break;
    }
}