import TrapBase from "../../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../../Common/Script/TrapUtil";
import WolfToothPos from "./WolfToothPos";
import WolfToothRos from "./WolfToothRos";



export default class wolfTrapSkill extends TrapBase {
    public getTrapObjNameTwo(): string {
        return null;
    }
    public getScaleObjNameDown(): string {
        return null;
    }
    public canDestroy(): boolean {
        return true;
    }
    public isCollisionDead(): boolean {
        return true;
    }
    public getTrapObjName(): string {
        return "Cylinder"
    }
    public getScaleObjName(): string {
        return "Track";
    }


    protected onStart(): void {
        super.onStart();
        // 设置死亡标签
        this.originPos = this.trapObj.localTransform.position;
        this.initTrap();

    }
    public destroyTrap() {
        super.destroyPrefab();
    }
    resetPrefab() {
        // will todo
        let scriptPos = this.gameObject.getScriptByName("WolfToothPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as WolfToothPos;
            scriptTempPos.dir = 1;
        }
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(6, 1, 0.1);
        this.initTrap();
    }
    moving(ifMove: boolean, ratio: number) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("WolfToothPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as WolfToothPos;
            scriptTempPos.vt = ratio * this.posV;
            scriptTempPos.max = 260;
            scriptTempPos.min = -260;
            scriptTempPos.useUpdate = ifMove;
        }
        let scriptRos = this.gameObject.getScriptByName("WolfToothRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as WolfToothRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }

    }

    /**
     * 机关拉伸
     */
    space(worldScale: number) {
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, worldScale, this.scaleTime, "x");
        let scriptPos = this.gameObject.getScriptByName("WolfToothPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as WolfToothPos;
            scriptTempPos.max = scriptTempPos.max * worldScale + 60 * (worldScale - 1);
            scriptTempPos.min = scriptTempPos.min * worldScale - 60 * (worldScale - 1);

        }
    }

    /**
     * 机关停止
     */

    time(ratio: number) {

        //变慢
        let scriptPos = this.gameObject.getScriptByName("WolfToothPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as WolfToothPos;
            scriptTempPos.vt = ratio * this.posV;
        }
        let scriptRos = this.gameObject.getScriptByName("WolfToothRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as WolfToothRos;
            scriptTempRos.vt = ratio * this.rosV;
        }

    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality)
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
    }

    /**
     * 不会对玩家造成伤害
     */
    reality() {
        // 修改标签和碰撞
        this.isReality = true;
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off)
            }
        });
        // 修改材质
        (this.trapObj as mw.Model).setMaterial(this.materialChange);
    }

    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.originPos.y = 0
        this.trapObj.localTransform.position = (this.originPos);
        this.isReality = false;
        let ifNewLevel = this["newLevel"]
        if (!this.originPos && ifNewLevel) {
            this.originPos = this.gameObject.worldTransform.position as mw.Vector;
            this["newLevel"] = false;
        }
        (this.trapObj as mw.Model).setMaterial(this.materialPre);
    }




}
