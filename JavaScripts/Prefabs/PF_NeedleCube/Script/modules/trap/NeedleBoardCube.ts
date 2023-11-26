import TrapBase from "../../../../Common/Script/TrapBase";

export default class NeedleBoardCube extends TrapBase {
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
        return false
    }
    public isCollisionDead(): boolean {
        return true
    }
    public getTrapObjName(): string {
        return "needCubeObj"
    }


    protected onStart(): void {
        super.onStart();
        this.initTrap();
    }
    public destroyTrap() {
        super.destroyPrefab()
    }

    resetPrefab() {
        this.initTrap();
    }

    /**
     * 不会对玩家造成伤害
     */
    reality() {
        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            let temp = ele as mw.GameObject;
            temp.tag = "";
            temp.setCollision(mw.CollisionStatus.Off)
            ele.setMaterial(this.materialChange)
        });

    }

    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();


        let materialObjs = this.trapObj.getChildren() as mw.Model[];
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
        // 底座需要单独设置材质
        let cube = this.trapObj.getChildren()[0] as mw.Model;
        cube.setMaterial(this.materialCube);
    }


}
