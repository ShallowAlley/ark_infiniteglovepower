import TrapBase from "../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../Common/Script/TrapUtil";
import StickSingleRos from "./stickSingle/StickSingleRos";



export default class StickTrapSkill extends TrapBase {
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
        return "stickObj"
    }
    public getScaleObjName(): string {
        return "stickObj";
    }


    protected onStart(): void {
        super.onStart();
        this.initTrap();
    }

    public destroyTrap(name: string) {
        let destroyObj = this.trapObj.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off)
                obj.setVisibility(mw.PropertyStatus.FromParent);

            }
        })
    }
    moving(ifMove: boolean, ratio: number) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickSingleRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as StickSingleRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;

        }
    }
    resetPrefab() {
        // will todo\
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }

    /**
     * 机关拉伸
     */
    space(worldScale: number) {
        let tempScale = (worldScale - 1) / 2;
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, tempScale, this.scaleTime, "y");
    }

    /**
     * 机关停止
     */
    time(ratio: number) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickSingleRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as StickSingleRos;
            scriptTempRos.vt = scriptTempRos.vt * ratio;
        }
    }

    /**
     * 可以被摧毁
     */
    power() {
        // 不是虚拟状态
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }

    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            if (Math.random() > 0.2) {
                let temp = ele as mw.GameObject;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.Off)
                ele.setMaterial(this.materialChange)
            }
        });
    }

    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        })

        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre)
        });
    }

}
