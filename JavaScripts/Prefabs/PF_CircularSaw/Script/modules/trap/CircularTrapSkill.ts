import TrapBase from "../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../Common/Script/TrapUtil";
import CircularSawPos from "./circularSaw/CircularSawPos";
import CircularSawRos from "./circularSaw/CircularSawRos";

export default class CircularTrapSkill extends TrapBase {
    public getTrapObjNameTwo(): string {
        return null;
    }
    public getScaleObjNameDown(): string {
        return null;
    }
    public canDestroy(): boolean {
        return true
    }
    public isCollisionDead(): boolean {
        return true
    }
    public getTrapObjName(): string {
        return "CircularSaw"
    }
    public getScaleObjName(): string {
        return "Track"
    }

    protected onStart(): void {
        super.onStart()
        this.originPos = this.trapObj.localTransform.position;
        this.initTrap();
    }

    public destroyTrap() {
        super.destroyPrefab()
    }

    /**
     * 初始机关
     * @param ifMove s控制机关移动
     * @param ratio  关卡难度系数
     */
    moving(ifMove: boolean, ratio: number) {
        let scriptPos = this.gameObject.getScriptByName("CircularSawPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as CircularSawPos;
            scriptTempPos.vt = ratio * this.posV;
            scriptTempPos.max = 210;
            scriptTempPos.min = -210;
            scriptTempPos.useUpdate = ifMove;
        }
        let scriptRos = this.gameObject.getScriptByName("CircularSawRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as CircularSawRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove
        }
    }

    resetPrefab() {
        let scriptPos = this.gameObject.getScriptByName("CircularSawPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as CircularSawPos;
            scriptTempPos.dir = 1;
        }
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(6, 0.4, 0.1);
        this.initTrap();

    }

    /**
     * 机关拉伸
     */
    space(worldScale: number) {
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, worldScale, this.scaleTime, "x")
        let scriptPos = this.gameObject.getScriptByName("CircularSawPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as CircularSawPos;
            scriptTempPos.max = scriptTempPos.max * worldScale + 86 * (worldScale - 1);
            scriptTempPos.min = scriptTempPos.min * worldScale - 86 * (worldScale - 1);
        }
    }

    /**
     * 机关停止
     */
    time(ratio: number) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("CircularSawPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as CircularSawPos;
            scriptTempPos.vt = this.posV * ratio;
        }
        let scriptRos = this.gameObject.getScriptByName("CircularSawRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as CircularSawRos;
            scriptTempRos.vt = this.rosV * ratio;
        }
    }

    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        this.changeObjTagAndCollision(this.trapObj, "");
        let mesh = this.trapObj as mw.Model;
        mesh.setMaterial(this.materialChange);
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialChange)
        });
    }

    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap()

        this.originPos.y = 0
        this.trapObj.localTransform.position = (this.originPos);

        this.isReality = false;

        let mesh = this.trapObj as mw.Model;
        mesh.setMaterial(this.materialPre);
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre)
        });
    }



}
