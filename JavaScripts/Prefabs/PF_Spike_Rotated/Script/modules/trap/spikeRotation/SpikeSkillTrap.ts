import TrapBase from "../../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../../Common/Script/TrapUtil";
import SpikeRotation from "./SpikeRotation";
import SpikeRotationLeft from "./SpikeRotationLeft";


export default class SpikeSkillTrap extends TrapBase {

    public canDestroy(): boolean {
        return false
    }
    public isCollisionDead(): boolean {
        return true
    }
    public getTrapObjName(): string {
        return "board";
    }
    public getTrapObjNameTwo(): string {
        return "boardLeft";
    }
    public getScaleObjName(): string {
        return ""
    }
    public getScaleObjNameDown(): string {
        return ""
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

    /**
     * 不被了力量宝石摧毁，不需要写内容
     * @param name 
     */
    public destroyTrap(name: string) {

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
        clearInterval(this.clock);
        this.gameObject.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    moving(ifMove: boolean, ratio: number) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("SpikeRotation");
        if (scriptRos) {
            let scriptTempRos = scriptRos as SpikeRotation;
            scriptTempRos.vt = ratio * this.rosUpV;
            scriptTempRos.useUpdate = ifMove;

        }
        let scriptRosDown = this.gameObject.getScriptByName("SpikeRotationLeft");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown as SpikeRotationLeft;
            scriptTempRosDown.vt = ratio * this.rosDownV;
            scriptTempRosDown.useUpdate = ifMove;

        }
    }


    space(worldScale: number) {
        // // let tempScale = (worldScale - 1) / 2;
        // this.clock = TrapUtil.scaleGameObject(this.gameObject, worldScale, this.scaleTime);

    }

    /**
     * 机关停止
     */

    time(ratio: number) {


        //变慢
        let scriptRos = this.gameObject.getScriptByName("SpikeRotation");
        if (scriptRos) {
            let scriptTempRos = scriptRos as SpikeRotation;
            scriptTempRos.stayTime = scriptTempRos.stayTime / ratio;
        }

        let scriptRosDown = this.gameObject.getScriptByName("SpikeRotationLeft");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown as SpikeRotationLeft;
            scriptTempRosDown.stayTime = scriptTempRosDown.stayTime / ratio;
        }

    }


    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;

        // 初始化位置
        this.trapObj.localTransform.rotation = (new mw.Rotation(110, 0, -180));
        this.trapObjtwo.localTransform.rotation = (new mw.Rotation(110, 0, -180));



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

    }




}
