import TrapBase from "../../../../Common/Script/TrapBase";
import CircularSawStillRos from "./circularSawStill.ts/CircularSawStillRos";



export default class CircularSingle extends TrapBase {
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
        return true
    }
    public getTrapObjName(): string {
        return "CircularSaw"
    }


    private orginPos;
    protected onStart(): void {
        super.onStart();
        this.initTrap();


    }
    public destroyTrap() {
        super.destroyPrefab();
    }
    moving(ifMove: boolean, ratio: number) {

        let scriptRos = this.gameObject.getScriptByName("CircularSawStillRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as CircularSawStillRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove
        }
    }
    resetPrefab() {
        // will todo
        if (this["newLevel"]) {
            this.orginPos = null;
        }

        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }

    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space() {

        this.trapMove();

    }

    /**
     * 机关停止
     */

    time(ratio: number) {

        //变慢
        let scriptRos = this.gameObject.getScriptByName("CircularSawStillRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as CircularSawStillRos;
            scriptTempRos.vt = this.rosV * ratio;
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
        let gameTemp = this.trapObj as mw.Model;
        gameTemp.setMaterial(this.materialChange);
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
        let ifNewLevel = this["newLevel"]
        if (!this.orginPos && ifNewLevel) {
            this.orginPos = this.gameObject.worldTransform.position as mw.Vector;
            this["newLevel"] = false;
        }
        this.gameObject.worldTransform.position = this.orginPos;

        // 初始化材质
        let gameTemp = this.trapObj as mw.Model;
        gameTemp.setMaterial(this.materialPre);
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre)
        });

    }

    trapMove() {
        let curTrap = this.gameObject.localTransform.position
        let curTrapY = curTrap.y;
        let targetPos = curTrapY * 1.25;
        let tempAdd = new mw.Vector(0, 0, 0);
        tempAdd.x = curTrap.x;
        tempAdd.y = curTrap.y;
        tempAdd.z = curTrap.z;
        if (curTrapY > 0) {
            let clock = setInterval(() => {
                curTrapY++;
                tempAdd.y = curTrapY;
                this.gameObject.localTransform.position = (tempAdd);
                if (curTrapY > targetPos) {
                    clearInterval(clock);
                }
            }, 30)
        } else if (curTrapY < 0) {
            let clock = setInterval(() => {
                curTrapY--;
                tempAdd.y = curTrapY;
                this.gameObject.localTransform.position = (tempAdd);
                if (curTrapY < targetPos) {
                    clearInterval(clock);
                }
            }, 30)
        }
    }





}
