import TrapBase from "../../../../Common/Script/TrapBase";

export default class CapsuleTrap extends TrapBase {
    originPos: mw.Vector = null;// 原始位置
    tween: mw.Tween<any> = null!;// 动画

    protected onStart(): void {
        super.onStart();
        this.initTrap();
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    /**空间宝石 */
    public space(worldScale: number) {
        const y = this.gameObject.worldTransform.position.y * worldScale;
        // 不能包含0 因为0位置不移动
        if (y) {
            this.spacing(y);
        }
    }

    /**限时宝石 */
    public reality() {
        this.isReality = true;
        this.setMaterial(this.materialChange);
        this.changeObjTagAndCollision(this.trapObj, "");
    }

    /**移动控制 */
    public moving(isMoving: boolean, ratio: number) {
        // const rotateComp = this.gameObject.getScriptByName('CapsuleRotateComp') as CapsuleRotateComp;
        // rotateComp.vt = ratio * this.rosV;
        // rotateComp.useUpdate = isMoving;
    }

    /**重置机关 */
    public resetPrefab() {
        if (this["newLevel"]) {
            this.originPos = null;
        }

        this.initTrap();
    }

    /**毁灭机关 */
    public destroyTrap(name?: string) {

    }

    initTrap(): void {
        super.initTrap();
        this.stopSpacing();

        if (!this.originPos && this['newLevel']) {
            this.originPos = this.gameObject.worldTransform.position;
            this['newLevel'] = false;
        }

        if (this.originPos) {
            this.gameObject.worldTransform.position = this.originPos;
        }

        // 获取所有需要改变的机关部件
        this.setMaterial(this.materialPre);
        this.isReality = false;
    }

    public canDestroy(): boolean {
        return false;
    }

    public isCollisionDead(): boolean {
        return true;
    }

    public getTrapObjName(): string {
        return 'mergeGear';
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

    private setMaterial(guid: string) {
        // 获取所有需要改变的机关部件
        const traps = this.gameObject.getChildByName('mergeGear').getChildren();
        traps.forEach(trap => {
            (trap as mw.Model).setMaterial(guid);
        });
    }
}