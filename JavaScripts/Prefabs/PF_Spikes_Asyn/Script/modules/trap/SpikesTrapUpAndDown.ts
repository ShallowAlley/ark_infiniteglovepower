import TrapBase from "../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../Common/Script/TrapUtil";
import SpikesAsynPos from "./spikesAsyn/SpikesAsynPos";
import SpikesAsynPosLeft from "./spikesAsyn/SpikesAsynPosLeft";

export default class SpikesTrapUpAndDown extends TrapBase {
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
        return "SpikesLeft";
    }
    public getTrapObjNameTwo(): string {
        return "SpikesRight";
    }
    private realityItems: mw.Model[] = [];
    protected onStart(): void {
        super.onStart();
        this.initTrap();
    }
    // 力量球摧毁机关，只摧毁部件
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
    //  整个机关摧毁
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
    moving(ifMove: boolean, ratio: number) {
        let scriptPos = this.gameObject.getScriptByName("SpikesAsynPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as SpikesAsynPos;
            scriptTempPos.stayTime = ratio * 1000;
            scriptTempPos.vt = 0.7;
            scriptTempPos.useUpdate = ifMove;
        }
        let scriptPosTemp = this.gameObject.getScriptByName("SpikesAsynPosLeft");
        if (scriptPosTemp) {
            let scriptTemp2Pos = scriptPosTemp as SpikesAsynPosLeft;
            scriptTemp2Pos.stayTime = ratio * 1000;
            scriptTemp2Pos.vt = 0.7;
            scriptTemp2Pos.useUpdate = ifMove;
        }

    }
    resetPrefab() {
        // will todo
        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.trapObjtwo.localTransform.position = (new mw.Vector(0, 48, -50));

        this.initTrap();
    }

    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space() {
        // this.timeBroadenObj(this.scaleObj, this.worldTransform.scale);
    }

    /**
     * 机关停止
     */

    time(ratio: number) {

        //变慢
        let scriptPos = this.gameObject.getScriptByName("SpikesAsynPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as SpikesAsynPos;
            scriptTempPos.stayTime = scriptTempPos.stayTime / ratio;
        }
        let scriptPosTemp = this.gameObject.getScriptByName("SpikesAsynPosLeft");
        if (scriptPosTemp) {
            let scriptTemp2Pos = scriptPosTemp as SpikesAsynPosLeft;
            scriptTemp2Pos.stayTime = scriptTemp2Pos.stayTime / ratio;
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
        // this.changeObjTag(this.trapObj, "");
        // this.changeObjTag(this.trapObjtwo, "");
        this.isReality = true;

        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        let materialObjsDown = this.trapObjtwo.getChildren() as mw.Model[];
        this.realityItems = materialObjs.concat(materialObjsDown);
        this.realityItems.forEach((ele) => {
            if (Math.random() > 0.5) {
                let temp = ele as mw.GameObject;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.QueryOnly)
                ele.setMaterial(this.materialChange);
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
            ele.setVisibility (mw.PropertyStatus.On);
            ele.setVisibility (mw.PropertyStatus.FromParent);

        })

        let resetVisibeTrapTemp = TrapUtil.getAllChild(this.trapObjtwo);
        resetVisibeTrapTemp.forEach((ele) => {
            ele.setVisibility (mw.PropertyStatus.On);
            ele.setVisibility (mw.PropertyStatus.FromParent);

        })
        if (this.realityItems.length > 0) {
            this.realityItems.forEach((ele) => {
                ele.setMaterial(this.materialPre)
            });
            this.realityItems = [];
        }

    }



}
