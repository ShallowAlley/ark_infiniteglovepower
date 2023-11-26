import { IBarrier } from "./IBarrier";
import { TrapUtil } from "./TrapUtil";

export default abstract class TrapBase extends mw.Script implements IBarrier {
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
    public trapObj: mw.GameObject;
    // 第二个机关对象
    public trapObjtwo: mw.GameObject;

    // 要缩放的对象
    public scaleObj: mw.GameObject;
    // 要缩放的第二个对象
    public scaleObjTwo: mw.GameObject;
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
     * 第二个机关的name
     */
    public abstract getTrapObjNameTwo(): string
    /**
     * 缩放对象的name
     */
    public abstract getScaleObjName(): string
    /**
    * 第二个缩放对象的name
    */
    public abstract getScaleObjNameDown(): string


    protected onStart(): void {
        this.trapObj = this.gameObject.getChildByName(this.getTrapObjName());
        let trapObjTwoName = this.getTrapObjNameTwo();
        if (trapObjTwoName) {
            this.trapObjtwo = this.gameObject.getChildByName(this.getTrapObjNameTwo());
        }

        let scaleObjName = this.getScaleObjName()
        if (scaleObjName) {
            this.scaleObj = this.gameObject.getChildByName(scaleObjName);
        }
        let scaleObjNameDown = this.getScaleObjNameDown()
        if (scaleObjNameDown) {
            this.scaleObjTwo = this.gameObject.getChildByName(scaleObjNameDown);
        }

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
        let canDestory = this.canDestroy()
        let isCollisionDead = this.isCollisionDead()
        this.changeObjTagAndCollision(this.trapObj, (isCollisionDead ? this.deadTag : "")
            + (canDestory ? this.officeTag + this.gameObject.gameObjectId : ""))

        if (this.trapObjtwo) {
            this.changeObjTagAndCollision(this.trapObjtwo, (isCollisionDead ? this.deadTag : "")
                + (canDestory ? this.officeTag + this.gameObject.gameObjectId : ""))
        }
    }

    destroyPrefab() {
        // 回收机关，隐藏机关，改变Tag为不可碰撞
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");

        // 把所有子节点关闭碰撞
        // let allChild = TrapUtil.getAllChild(this.gameObject);
        // allChild.forEach((obj) => {
        //     if (obj instanceof mw.GameObject) {
        //         obj.setCollision(mw.CollisionStatus.Off)
        //     }
        // })
    };

    /**
     * 根据根节点，改变所有子物体的Tag和碰撞状态
     * 如果Tag为空，会把所有子物体的tag改为空，且将物体的碰撞关系改为关闭
     * 一般是死亡tag和可摧毁tag，设置该tag时，代表该物体可被碰撞
     * 如果Tag不为空，讲碰撞关系改为 mw.CollisionStatus.QueryOnly
     * @param parent 根节点
     * @param tag 要改变为什么tag
     */
    public changeObjTagAndCollision(parent: mw.GameObject, tag: string) {
        let allChild = TrapUtil.getAllChild(parent);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                // 需要判断一些是GameObject，避免改到脚本
                obj.setCollision(tag ? mw.CollisionStatus.QueryOnly : mw.CollisionStatus.Off)
                obj.tag = tag;
            }
        })
    }

}
