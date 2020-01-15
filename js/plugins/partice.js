/*:
* @author 日月星辰
* @plugindesc 标题粒子效果
* @help
* 在标题画面中显示粒子
*
* @param file
* @desc 存于img/pictures的粒子图片名，默认particle。请确保图片存在且为.png格式
* @default particle
*
* @param num
* @desc 粒子的数量/密度，默认20
* @default 20
*
* @param xSpeed
* @desc 粒子x轴移动速度，可+可﹣，0为不动。默认1。
* @default 1
*
* @param ySpeed
* @desc 粒子y轴移动速度，可+可﹣，0为不动。默认1。
* @default 1
*
* @param rotation
* @desc 粒子自转的速度。如花瓣绕花心转。推荐范围[0, 0.01]。默认0.01。
* @default 0.01
*/
 
(function() {
    var params = PluginManager.parameters('SnapBlur');
    var file = String(params['file'] || 'particle');
    var num = Number(params['num'] || 20);
    var xS =  Number(params['xSpeed'] || 1);
    var yS =  Number(params['ySpeed'] || 1);
    var rotation = Number(params['rotation'] || 0.01);
 
    function Sprite_Particle() {
        this.initialize.apply(this, arguments);
    }
 
    Sprite_Particle.prototype = Object.create(Sprite_Base.prototype);
    Sprite_Particle.prototype.constructor = Sprite_Particle;
 
    Sprite_Particle.prototype.initialize = function(Particle) {
        Sprite_Base.prototype.initialize.call(this);
        this._phase = false;
        this.updateBitmap();
        this.updatePosition();
    }
 
    Sprite_Particle.prototype.updateBitmap = function() {
        this.bitmap = ImageManager.loadPicture(file);
    }
 
    Sprite_Particle.prototype.updatePosition = function() {
        this.anchor.x = Math.random(360);
        this.anchor.y = Math.random(360);
        this.x = Math.randomInt(Graphics.boxWidth);
        this.y = Math.randomInt(Graphics.boxHeight);
    }
 
    Sprite_Particle.prototype.update = function() {
        this.x += xS;
        this.y += yS;
        this.rotation += rotation;
 
        if (!this._phase) {
            if (this.opacity <= 0) {
                this._phase = true;
                this.updatePosition();
            } else {
                this.opacity -= 1;
            }
        } else {
            this.reverseOpacity();
        }
    }
 
    Sprite_Particle.prototype.reverseOpacity = function() {
        if (this.opacity < 255) this.opacity += 10;
        else this._phase = false;
    }
 
    var sceneTitle_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        sceneTitle_create.call(this);
        this.createParticle();
    }
 
    Scene_Title.prototype.createParticle = function() {
        this._particles = [];
        for (var i = 0; i < num; i++) {
            var Particle = new Sprite_Particle();
            this._particles.push(Particle);
            this.addChild(this._particles[i]);
        }
    }
})();