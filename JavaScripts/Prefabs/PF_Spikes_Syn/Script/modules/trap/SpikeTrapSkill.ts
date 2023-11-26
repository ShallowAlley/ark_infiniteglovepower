import TrapBase from "../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../Common/Script/TrapUtil";
import SpikeTrapSynPos from "./spikeTrapSyn/SpikeTrapSynPos";


export default class SpikeTrapSkill extends TrapBase {
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
        return true;
    }
    public isCollisionDead(): boolean {
        return true;
    }
    public getTrapObjName(): string {
        return "Spikes"
    }


    protected onStart(): void {
        super.onStart();
        this.initTrap();
    }
    // 力量球摧毁机关，只摧毁部件
    public destroyTrap(name: string) {
        let destroyObj = this.trapObj.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }

    }

    //  整个机关摧毁
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
        this.trapObj.localTransform.position = (new mw.Vector(0, -240, -50));
        this.initTrap();
    }
    moving(ifMove: boolean, ratio: number) {
        let scriptPos = this.gameObject.getScriptByName("SpikeTrapSynPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as SpikeTrapSynPos;
            scriptTempPos.stayTime = ratio * 1000;
            scriptTempPos.vt = 0.7;
            scriptTempPos.useUpdate = ifMove;
        }

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
        let scriptPos = this.gameObject.getScriptByName("SpikeTrapSynPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as SpikeTrapSynPos;
            // 1 表示原来的速度 (1-ratio)表示增加的停留时间

            scriptTempPos.stayTime = scriptTempPos.stayTime / ratio;
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
        // this.changeObjTag(this.trapObj, "");
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            if (Math.random() > 0.5) {
                let temp = ele as mw.GameObject;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.QueryOnly)
                ele.setMaterial(this.materialChange)
            }
        });
    }

    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();

        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);

        })
        this.isReality = false;
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre)
        });


    }




}
