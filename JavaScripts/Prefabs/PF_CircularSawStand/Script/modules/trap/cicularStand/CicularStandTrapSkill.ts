import TrapBaseMany from "../../../../../Common/Script/TrapBaseMany";
import CicularStandRos from "./CicularStandRos";


export default class CircularSingle extends TrapBaseMany {

    public getScaleObjName(): string {
        return null;
    }
    public canDestroy(): boolean {
        return true
    }
    public isCollisionDead(): boolean {
        return true
    }
    public getTrapObjName(): string {
        return "CircularSaw|CircularSaw-1|CircularSaw-2|CircularSaw-3"
    }


    private orginPos;
    protected onStart(): void {
        super.onStart();
        this.initTrap();
    }
    public destroyTrap(name: string) {
        let destroyObj = this.gameObject.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    destroyPrefab(): void {
        super.destroyPrefab();
    }

    moving(ifMove: boolean, ratio: number) {

        let scriptRos = this.gameObject.getScriptByName("CicularStandRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as CicularStandRos;
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
        let scriptRos = this.gameObject.getScriptByName("CicularStandRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos as CicularStandRos;
            scriptTempRos.vt = this.rosV * ratio;
        }

    }


    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        this.trapObj.forEach(obj => {
            // 给父类也设置一下碰撞
            obj.setCollision(mw.CollisionStatus.Off);
            obj.tag = "";
        });
        this.changeMaterial(false)
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
        this.changeMaterial(true)
    }
    /**
     * 改变材质，只做改变材质的事
     * @param isPre 材质类型，是否初始化
     * @returns 
     */
    changeMaterial(isPre: boolean) {
        if (!this.trapObj || this.trapObj.length <= 0) return;
        let matral = isPre ? this.materialPre : this.materialChange;
        this.trapObj.forEach(obj => {
            let gameTemp = obj as mw.Model;
            gameTemp.setMaterial(matral);
            let materialObjs = obj.getChildren() as mw.Model[];
            materialObjs.forEach((ele) => {
                ele.setMaterial(matral)
            });
        })
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
