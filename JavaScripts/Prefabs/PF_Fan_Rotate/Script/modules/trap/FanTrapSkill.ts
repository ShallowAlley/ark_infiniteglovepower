import TrapBase from "../../../../Common/Script/TrapBase";
import FanRotateRos from "./fanRotate/FanRotateRos";



export default class FanTrapSkill extends TrapBase {
    public getTrapObjNameTwo(): string {
        return null;
    }
    public getScaleObjName(): string {
        return null;
    }
    public getScaleObjNameDown(): string {
        return null;
    }
    public canDestroy(): boolean {
        return true
    }
    public isCollisionDead(): boolean {
        return true;
    }
    public getTrapObjName(): string {
        return "fanObj"
    }


    protected onStart(): void {
        super.onStart();
        this.initTrap();

    }
    moving(ifMove: boolean, ratio: number) {
        let scriptRos = this.gameObject.getScriptByName("FanRotateRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as FanRotateRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove
        }
    }
    public destroyTrap() {
        super.destroyPrefab()
    }
    resetPrefab() {

        this.initTrap();
    }

    /**
     * 机关拉伸  该类型不受影响
     */
    space() {
        // Tools.timeBroadenObj(this.scaleObj, this.worldTransform.scale);


    }

    /**
     * 机关慢速移动
     */

    time(ratio: number) {

        let scriptPos = this.gameObject.getScriptByName("FanRotateRos");
        if (scriptPos) {
            let script = scriptPos as FanRotateRos;
            script.vt = this.rosV * ratio;
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
        this.isReality = true;

        this.changeObjTagAndCollision(this.trapObj, "");
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialChange)
        });

    }

    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();

        this.isReality = false;

        // 设置虚拟材质
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre)
        });
    }


}
