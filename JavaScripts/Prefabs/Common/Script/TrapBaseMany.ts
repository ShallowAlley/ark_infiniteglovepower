import { IBarrier } from "./IBarrier";

export default abstract class TrapBaseMany extends mw.Script implements IBarrier {
    @mw.Property({ displayName: "旋转初始速度" })
    rosV: number = 1;
    @mw.Property({ displayName: "位移初始速度" })
    posV: number = 0.1;

    // 可被力量宝石技能摧毁的物体tag
    public officeTag = "office";
    // 死亡Tag，有该tag的物体，角色碰到会死亡
    public deadTag = "dead";
    // 原始材质
    public materialPre = "94245";
    // 更换材质guid
    public materialChange = "94240";
    // 底座材质
    public materialCube = "100234";
    // 缩放时间（受空间宝石影响）
    public scaleTime = 1000;
    // 最初始的位置
    public originPos: mw.Vector;
    // 机关对象
    public trapObj: mw.GameObject[] = [];

    // 要缩放的对象
    public scaleObj: mw.GameObject[] = [];
    // 是否敌对状态（默认是敌对false）
    public isReality: boolean;
    // 缩放的定时器（子类自己赋值）
    public clock: number;
    // 缩放的第二个定时器（子类自己赋值）
    public clockUp: number;


    public abstract resetPrefab()
    public space?(worldScale: number)
    public time?(ratio: number)
    public power?()
    public reality?()
    public mind?()
    public moving?(...param: any[])
    public abstract destroyTrap(name?: string)

    /**
     * 是否能备摧毁
     * 如果返回TRUE，需要复写destroyTrap函数自定义摧毁后表现
     */
    public abstract canDestroy(): boolean
    /**
     * 是否角色碰到就会死亡
     */
    public abstract isCollisionDead(): boolean
    /**
     * 机关对象的name
     */
    public abstract getTrapObjName(): string
    /**
     * 缩放对象的name
     */
    public abstract getScaleObjName(): string


    protected onStart(): void {
        let trapName = this.getTrapObjName()
        let list = trapName.split("|");
        for (let i = 0; i < list.length; i++) {
            let obj = this.gameObject.getChildByName(list[i]);
            if (!obj) continue;
            this.trapObj.push(obj);
        }
        // this.trapObj = this.gameObject.getChildByName();
        // let trapObjTwoName = this.getTrapObjNameTwo();
        // if (trapObjTwoName) {
        //     this.trapObjtwo = this.gameObject.getChildByName(this.getTrapObjNameTwo());
        // }

        // let scaleObjName = this.getScaleObjName()
        // if (scaleObjName) {
        //     this.scaleObj = this.gameObject.getChildByName(scaleObjName);
        // }
        // let scaleObjNameDown = this.getScaleObjNameDown()
        // if (scaleObjNameDown) {
        //     this.scaleObjTwo = this.gameObject.getChildByName(scaleObjNameDown);
        // }

        let canDestory = this.canDestroy()
        if (canDestory) {
            Event.addLocalListener("dedstory_office", (tag: string, name: string) => {
                if (tag.includes(this.gameObject.gameObjectId)) {
                    this.destroyTrap(name);
                }
            });
        }


    }

    initTrap() {
        // 初始化该Prefab时，展示机关（因为回收时会隐藏）
        this.gameObject.setVisibility(mw.PropertyStatus.On);
        //碰撞和标签
        let canDestory = this.canDestroy();
        let isCollisionDead = this.isCollisionDead();

        this.trapObj.forEach(obj => {
            // 给父类也设置一下碰撞
            if (isCollisionDead || canDestory) obj.setCollision(mw.CollisionStatus.QueryOnly);
            obj.tag = (isCollisionDead ? this.deadTag : "")
                + (canDestory ? this.officeTag + this.gameObject.gameObjectId : "");
            obj.setVisibility(mw.PropertyStatus.On);
            // this.changeObjTagAndCollision(obj, (isCollisionDead ? this.deadTag : "")
            //     + (canDestory ? this.officeTag + this.gameObject.gameObjectId : ""));
        });
    }

    destroyPrefab() {
        // 回收机关，隐藏机关，改变Tag为不可碰撞
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.trapObj.forEach(obj => {
            obj.setCollision(mw.PropertyStatus.Off);
            obj.tag = ""
            obj.setVisibility(mw.PropertyStatus.Off);
        });
        // this.changeObjTagAndCollision(this.trapObj, "");

        // 把所有子节点关闭碰撞
        // let allChild = TrapUtil.getAllChild(this.gameObject);
        // allChild.forEach((obj) => {
        //     if (obj instanceof mw.GameObject) {
        //         obj.setCollision(mw.CollisionStatus.Off)
        //     }
        // })
    };



}
