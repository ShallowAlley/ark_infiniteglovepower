import TrapBase from "../../../../Common/Script/TrapBase";
import SpikesSideMoveComp from "./SpikesSideMoveComp";

export default class SpikesSideTrap extends TrapBase {

    readonly pos = new mw.Vector(-0.62, 5, 50);// 尖刺原始位置
    originPos: mw.Vector = null;// 原始位置
    tween: mw.Tween<any> = null!;// 动画


    protected onStart(): void {
        super.onStart();
        this.initTrap()
    }

    /**移动控制 */
    public moving(isMoving: boolean, ratio: number) {
        const moveComp = this.gameObject.getScriptByName('SpikesSideMoveComp') as SpikesSideMoveComp;
        moveComp.vt = ratio * this.posV;
        moveComp.useUpdate = isMoving;
    }

    /**力量 */
    public power() {
        if (this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }

    /**空间 */
    public space(worldScale: number) {
        const y = this.gameObject.worldTransform.position.y * worldScale;
        // 不能包含0 因为0位置不移动
        if (y) {
            this.spacing(y);
        }
    }

    /**现实 */
    public reality() {
        this.isReality = true;
        // this.changeObjTagAndCollision(this.trapObj, "");
        this.setMaterial(false);
    }

    /**时间 */
    public time(ratio: number) {
        let script = this.gameObject.getScriptByName("SpikesSideMoveComp");
        if (script) {
            let s = script as SpikesSideMoveComp;
            s.vt = this.posV * ratio;
        }
    }

    public resetPrefab() {
        if (this["newLevel"]) {
            this.originPos = null;
        }

        this.initTrap();
    }

    initTrap(): void {
        super.initTrap();
        this.stopSpacing();

        // 预制件位置
        if (!this.originPos && this['newLevel']) {
            this.originPos = this.gameObject.worldTransform.position;
            this['newLevel'] = false;
        }

        if (this.originPos) {
            this.gameObject.worldTransform.position = this.originPos;
        }

        // 恢复尖刺位置
        this.gameObject.getChildByName('spikes').localTransform.position = (this.pos);

        // 恢复材质
        this.setMaterial(true);
        this.isReality = false;

        const objs = this.gameObject.getChildByName(this.getTrapObjName()).getChildren();

        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i];
            obj.setVisibility(mw.PropertyStatus.FromParent);
            obj.setCollision(mw.PropertyStatus.FromParent);
        }
    }

    public destroyTrap(name?: string) {
        const objs = this.gameObject.getChildByName(this.getTrapObjName()).getChildren();

        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i];
            if (obj.name === name) {
                obj.setVisibility(mw.PropertyStatus.Off);
                obj.setCollision(mw.PropertyStatus.Off);
                obj.tag = "";

                this.changeObjTagAndCollision(obj, '');
                break;
            }
        }
    }

    public canDestroy(): boolean {
        return true;
    }

    public isCollisionDead(): boolean {
        return true;
    }

    public getTrapObjName(): string {
        return 'spikes';
    }

    public getTrapObjNameTwo(): string {
        return '';
    }

    public getScaleObjName(): string {
        return '';
    }

    public getScaleObjNameDown(): string {
        return '';
    }

    // =====================================================================
    // 位置移动
    private spacing(moveDis: number) {
        const start = this.gameObject.worldTransform.position;
        this.tween = new mw.Tween({ y: start.y })
            .to({ y: moveDis }, 1000)
            .onUpdate(o => {
                this.gameObject.worldTransform.position = new mw.Vector(start.x, o.y, start.z);
            })
            .onComplete(() => {
                this.tween = null!;
            })
            .start();
    }

    // 停止移动
    private stopSpacing() {
        if (this.tween) {
            this.tween.stop();
            this.tween = null!;
        }
    }

    private setMaterial(isDead: boolean) {
        const spikes = this.gameObject.getChildByName('spikes');
        // spikes三根刺
        const spikesUnder = spikes.getChildren();
        // spikesUnder其中一根刺spike_1;
        // 虚拟
        spikesUnder.forEach((temp) => {
            if (!isDead && Math.random() > 0.5) {

                this.changeObjTagAndCollision(temp, "");

                // 改整条的材质
                let items = temp.getChildren();
                items.forEach((item) => {
                    (item as mw.Model).setMaterial(this.materialChange);
                })
            }
        })

        // 初始化        
        if (isDead) {
            spikesUnder.forEach((temp) => {
                temp.tag = "";
                let items = temp.getChildren();
                items.forEach((item) => {
                    (item as mw.Model).setMaterial(this.materialPre);
                })
            })
        }

    }

}