import TrapBase from "../../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../../Common/Script/TrapUtil";
import StickThirdRos from "./StickThirdRos";



export default class StickSingle extends TrapBase {
    public getTrapObjNameTwo(): string {
        return null;
    }
    public getScaleObjNameDown(): string {
        return "rosObj";
    }
    public canDestroy(): boolean {
        return true
    }
    public isCollisionDead(): boolean {
        return true
    }
    public getTrapObjName(): string {
        return "rosObj"
    }
    public getScaleObjName(): string {
        return "rosObj"
    }

    protected onStart(): void {
        super.onStart();
        this.initTrap();
    }
    /**
     * 被力量宝石摧毁
     * @param name 被摧毁机关单个的name
     */
    public destroyTrap(name: string) {
        let destroyObj = this.trapObj.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    /**
     * 被响指摧毁
     */
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
    resetPrefab() {
        // will todo
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    moving(ifMove: boolean, ratio: number) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickThirdRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as StickThirdRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
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
        let scriptRos = this.gameObject.getScriptByName("StickThirdRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as StickThirdRos;
            scriptTempRos.vt = scriptTempRos.vt * ratio;
        }

    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);

        }
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
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialChange)
        });
    }

    /**
     * 初始化机关
     */
    initTrap() {
        this.isReality = false;
        super.initTrap();
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility (mw.PropertyStatus.On);
            ele.setVisibility (mw.PropertyStatus.FromParent);

        })

        // 还原材质
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre)
        });

    }





}
