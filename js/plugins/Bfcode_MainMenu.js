/*:
 * @plugindesc 随时随地更改游戏屏幕尺寸
 * @author: Mandarava（鳗驼螺）
 *
 * @param Screen width
 * @desc 游戏启动时游戏屏幕的宽度
 * 默认值：816
 * @default 816
 * 
 * @param Screen height
 * @desc 游戏启动时游戏屏幕的高度
 * 默认值：624
 * @default 624
 * 
 * @help
 * 插件命令:
 *  ChangeScreenSize 1024 768   #修改分辨率为1024x768
 *  RestoreScreenSize   #恢复为默认分辨率
 */

var params = PluginManager.parameters("Bfcode_MainMenu");
var screenWidth = Number(params["Screen width"]) || 816;
var screenHeight = Number(params["Screen height"]) || 624;

setScreenSize(screenWidth, screenHeight);

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    _Game_Interpreter_pluginCommand.call(this, command, args);

    switch(command){
        case "ChangeScreenSize":
            var _screenWidth = Number(args[0]) || 816;
            var _screenHeight = Number(args[1]) || 624;
            setScreenSize(_screenWidth, _screenHeight);
            break;
        case "RestoreScreenSize":
            setScreenSize(816, 624);
            break;
        default: break;
    }
}

function setScreenSize(screenWidth, screenHeight){
    var deltaWidth = screenWidth - window.innerWidth;
    var deltaHeight = screenHeight - window.innerHeight;  
    window.moveBy(- deltaWidth / 2, - deltaHeight / 2);
    window.resizeBy(deltaWidth, deltaHeight);
}
