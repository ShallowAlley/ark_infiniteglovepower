import TrapBase from "../../../../../Common/Script/TrapBase";
import NeedleBoardPos from "./NeedleBoardPos";



export default class NeedleBoard extends TrapBase {
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
        return false;
    }
    public isCollisionDead(): boolean {
        return true;
    }
    public getTrapObjName(): string {
        return "board"
    }

    protected onStart(): void {
        super.onStart();
        this.initTrap();

    }
    public destroyTrap() {
        super.destroyPrefab()
    }

    moving(ifMove: boolean, ratio: number) {
        let scriptPos = this.gameObject.getScriptByName("NeedleBoardPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as NeedleBoardPos;
            scriptTempPos.vt = ratio * this.posV;
            scriptTempPos.useUpdate = ifMove;
        }
    }
    resetPrefab() {
        // will todo
        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
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

    time(ratio) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("NeedleBoardPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos as NeedleBoardPos;
            scriptTempPos.vt = this.posV * ratio;
        }

    }

    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
    }



}
