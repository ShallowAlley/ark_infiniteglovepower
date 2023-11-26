import TrapBase from "../../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../../Common/Script/TrapUtil";
import StickDoubleTwoRos from "./StickDoubleTwoRos";
import StickDoubleTwoRosDown from "./StickDoubleTwoRosDown";



export default class stickDouble2 extends TrapBase {

    public canDestroy(): boolean {
        return true
    }
    public isCollisionDead(): boolean {
        return true
    }
    public getTrapObjName(): string {
        return "StickUp";
    }
    public getTrapObjNameTwo(): string {
        return "StickDown";
    }
    public getScaleObjName(): string {
        return "StickUp"
    }
    public getScaleObjNameDown(): string {
        return "StickDown"
    }

    private realityItems: mw.Model[] = [];

    @mw.Property({ displayName: "上方旋转初始速度" })
    rosUpV: number = 1;
    @mw.Property({ displayName: "下方旋转初始速度" })
    rosDownV: number = 1;

    protected onStart(): void {

        super.onStart();
        this.initTrap();


    }
    public destroyTrap(name: string) {
        let destroyObj = this.trapObj.getChildByName(name);
        let destroyObjTemp = this.trapObjtwo.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
        else if (destroyObjTemp) {
            destroyObjTemp.setVisibility(mw.PropertyStatus.Off);
            destroyObjTemp.tag = "";
            destroyObjTemp.setCollision(mw.PropertyStatus.Off);
        }
    }
    destroyPrefab() {

        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        this.changeObjTagAndCollision(this.trapObjtwo, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off)
                obj.setVisibility(mw.PropertyStatus.FromParent);

            }
        })
        let allChildTwo = TrapUtil.getAllChild(this.trapObjtwo);
        allChildTwo.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off)
                obj.setVisibility(mw.PropertyStatus.FromParent);

            }
        })

    }
    resetPrefab() {
        // will todo
        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        clearInterval(this.clock);
        clearInterval(this.clockUp);
        this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.scaleObjTwo.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    moving(ifMove: boolean, ratio: number) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickDoubleTwoRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as StickDoubleTwoRos;
            scriptTempRos.vt = ratio * this.rosUpV;
            scriptTempRos.useUpdate = ifMove;

        }
        let scriptRosDown = this.gameObject.getScriptByName("StickDoubleTwoRosDown");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown as StickDoubleTwoRosDown;
            scriptTempRosDown.vt = ratio * this.rosDownV;
            scriptTempRosDown.useUpdate = ifMove;

        }
    }


    space(worldScale: number) {
        let tempScale = (worldScale - 1) / 2;
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, tempScale, this.scaleTime, "y");
        this.clockUp = TrapUtil.scaleGameObject(this.scaleObjTwo, tempScale, this.scaleTime, "y");

    }

    /**
     * 机关停止
     */

    time(ratio: number) {


        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickDoubleTwoRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as StickDoubleTwoRos;
            scriptTempRos.vt = ratio * scriptTempRos.vt;
        }

        let scriptRosDown = this.gameObject.getScriptByName("StickDoubleTwoRosDown");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown as StickDoubleTwoRosDown;
            scriptTempRosDown.vt = ratio * scriptTempRosDown.vt;
        }

    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
            this.changeObjTagAndCollision(this.trapObjtwo, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);

        }
    }

    /**
     * 不会对玩家造成伤害
     */
    reality() {
        // this.changeObjTagAndCollision(this.trapObj, "");
        // this.changeObjTagAndCollision(this.trapObjtwo, "");
        this.isReality = true;

        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off)
            }
        })
        let allChildTwo = TrapUtil.getAllChild(this.trapObjtwo);
        allChildTwo.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off)
            }
        })

        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        let materialObjsDown = this.trapObjtwo.getChildren() as mw.Model[];
        this.realityItems = materialObjs.concat(materialObjsDown);
        this.realityItems.forEach((ele) => {
            if (Math.random() > 0.5) {
                let temp = ele as mw.GameObject;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.Off)
                ele.setMaterial(this.materialChange)
            }
        })
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

        let resetVisibeTrapTemp = TrapUtil.getAllChild(this.trapObjtwo);
        resetVisibeTrapTemp.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);

        })
        if (this.realityItems.length > 0) {
            this.realityItems.forEach((ele) => {
                ele.setMaterial(this.materialPre)
            });
            this.realityItems = [];
        }



        //

    }




}
