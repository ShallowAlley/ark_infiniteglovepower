import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { C2CEvent, ProLoadGuid } from "../../consts/ProLoadGuid";
import EnterLoading from "../../ui/EnterLoading";
import { MsgReport } from "../../utils/MsgReporter";
import Tools from "../../utils/Tools";
import GuideModuleC from "../guide/GuideModuleC";
import { PlayerModuleC } from "../player/PlayerModuleC";
import { SkillType } from "../skill/SkillDataHelper";
import { IBarrier } from "./BarrierConfig";
import { BarrierInfo, GameCoefficient } from "./module/LevelDataHelper";
import LevelModuleC from "./module/LevelModuleC";
const SOUL_SKILL_DOOR = 116;// 特殊门编号
const MAX_DOOR = 6;// 技能门最大数量
const SKILL_MAP = {// 技能对应关系
    'Power': SkillType.Power,
    'Space': SkillType.Space,
    'Reality': SkillType.Reality,
    'Time': SkillType.Time,
    'Mind': SkillType.Heart,
    'Soul': SkillType.Soul
}
/**
 * 场景障碍物生成器
 */
export default class SceneCreator {
    module: LevelModuleC = null!;// 关卡module
    allPrefabScripts: IBarrier[] = [];// 当前场景的所有脚本
    pos = mw.Vector.zero;// 起始位置
    startPos = mw.Vector.zero;// 玩家出发位置
    soulDoor: mw.GameObject = null!;// 灵魂门
    useSKillID = new Set<number>();// 当前关卡使用的技能门id 
    allBarriers: BarrierInfo[] = [];// 障碍物信息
    offsetDis1 = 0;// 出生点到第一个机关距离
    offsetDis2 = 0;// 不同机关类型之间的距离
    offsetDis3 = 0;// 技能门之前的距离
    offsetDis4 = 0;// 技能门之后的距离
    gameCoefficient: GameCoefficient = null!;// 当前游戏关卡相关系数
    useSkillDoorType = new Set<number>();// 当前已经存在的技能类型（筛选技能门时候使用）

    constructor(module: LevelModuleC) {
        this.module = module;

        const globalCfg = GameConfig.Global;// 全局表配置
        this.pos = <mw.Vector>Tools.convertArrToVec(globalCfg.getElement(101).parameter2)
            .subtract(new mw.Vector(globalCfg.getElement(102).parameter1, 0, 0));
        this.offsetDis1 = globalCfg.getElement(103).parameter1;
        this.offsetDis2 = globalCfg.getElement(105).parameter1;
        this.offsetDis3 = globalCfg.getElement(106).parameter1;
        this.offsetDis4 = globalCfg.getElement(107).parameter1;
    }

    /**重置脚本属性(通关的时候调用) */
    resetScript() {
        this.soulDoor = null!;
        this.useSKillID.clear();
        this.useSkillDoorType.clear();
        this.expandRoad(1, false);
        this.despawnGo();
    }

    /**
     * 创建场景
     */
    createScene() {
        const guideModule = ModuleService.getModule(GuideModuleC);
        if (guideModule.isIncludeGuide()) {
            this.createGuideScene();
        } else {
            this.createNormalScene();
        }

        this.createBarrier();
    }

    // 还原场景
    restoreScene() {
        if (!this.module.getCurrentSceneLv()) {// 第一次进入
            this.module.sendLevel();
            return;
        }

        if (this.module.isUpdateLv()) { // 是更新后的就用保存的信息生成
            const info = this.module.getCurrentSceneBarrierInfo();
            this.allBarriers = info;
            this.startPos = this.module.getStartPos() as mw.Vector;
            this.gameCoefficient = this.module.getGameCoefficient();
            this.createBarrier();
        } else {
            // 不是就从新创建
            this.createScene();
        }
    }

    // 重置场景
    resetScene() {
        ModuleService.getModule(PlayerModuleC).net_PlayerMovePosition(this.startPos);
        this.allPrefabScripts.forEach(s => {
            s.resetPrefab();
            s.moving && s.moving(true, this.gameCoefficient.speedCoefficient);
        });
        this.expandRoad(1, false);
        this.useSKillID.clear();

        if (this.soulDoor) {
            this.soulDoor.setVisibility(mw.PropertyStatus.Off, true);
            Event.dispatchToLocal('SoulMgs', false);// 给技能门预制件发送的消息
        }
    }

    /**
     * 技能使用
     * @param type 技能类型 
     */
    useSkill(type: SkillType, lv: number) {
        const types = this.createTypes(lv);
        if (typeof types[type] !== 'function') {
            throw new Error("Invalid type");
        }

        types[type]();
        this.useSKillID.add(type);
        this.checkShowSoulDoor();
    }

    // ===============================================================================================================
    /**保存障碍物信息 */
    private saveBarrierInfo(cfgID: number, pos: mw.Vector) {
        const barrier = new BarrierInfo();
        barrier.prefabID = cfgID;
        barrier.prefabLoc = [pos.x, pos.y, pos.z];
        this.allBarriers.push(barrier);
    }

    /**分帧加载预制件 */
    private createBarrier() {
        mw.UIService.show(EnterLoading);
        // mw.instance.showPanel(EnterLoading);
        // 埋点
        let moduleC = ModuleService.getModule(LevelModuleC);

        if (moduleC.getCurrentSceneLv() == 1 && moduleC.getIfNewEnter()) {
            moduleC.setIfNewEnter();
        }
        // 先保存数据
        ModuleService.getModule(PlayerModuleC).net_PlayerMovePosition(this.startPos);
        this.module.sendLevelData(this.allBarriers, [this.startPos.x, this.startPos.y, this.startPos.z], this.gameCoefficient);
        const inter = setInterval(() => {
            const info = this.allBarriers.pop();
            if (!info) {// 加载完了
                Event.dispatchToLocal(C2CEvent.SCENE_FINISH);
                Event.dispatchToLocal('SoulMgs', false);// 给技能门预制件发送的消息

                this.moveBarrier(true);
                clearInterval(inter);
                return;
            }

            const cfg = GameConfig.Obstacle.getElement(info.prefabID);
            const guid = cfg.guid;
            const mwGO = SpawnManager.modifyPoolSpawn(guid);
            mwGO.worldTransform.position = (Tools.convertArrToVec(info.prefabLoc) as mw.Vector);
            mwGO.asyncReady().then(go => {
                const scripts = go.getScripts();
                if (!scripts || scripts.length <= 0) return;

                const script = scripts[0]
                script["type"] = info.prefabID;
                script["newLevel"] = true;
                this.allPrefabScripts.push(scripts[0] as any);// 预制件脚本添加
                if (cfg.isSkillDoor) {// 预制件特殊tag添加
                    const strArr: string[] = [];
                    cfg.doorColorID.forEach(id => {
                        const doorCfg = GameConfig.DoorColor.getElement(id);
                        strArr.push(doorCfg.textColor + '_'
                            + doorCfg.skillName + '_'
                            + doorCfg.skillTexture + '_'
                            + doorCfg.name);
                    });
                    const a = <IBarrier>(script as object);
                    a.setSkillType && a.setSkillType(strArr);
                }
            });

            if (info.prefabID === SOUL_SKILL_DOOR) {// 隐藏特殊的灵魂门
                this.soulDoor = mwGO;
                this.soulDoor.setVisibility(mw.PropertyStatus.Off, true);
            }
        }, 100);
    }

    /**查找技能门 */
    private findAllSkillDoor() {
        const arr: number[] = [];
        const allCfg = GameConfig.Obstacle.getAllElement();
        for (let i = 0; i < allCfg.length; i++) {
            const cfg = allCfg[i];
            if (cfg.isSkillDoor && cfg.ID !== SOUL_SKILL_DOOR) {
                arr.push(cfg.ID);
            }
        }

        return arr;
    }

    /**查找特殊的技能门 */
    private findSpecialDoor() {
        const arr: number[] = [];
        const allCfg = GameConfig.Obstacle.getAllElement();
        for (let i = 0; i < allCfg.length; i++) {
            const cfg = allCfg[i];
            if (cfg.isSkillDoor && cfg.doorColorID.length > 1) {// 双门
                arr.push(cfg.ID);
            }
        }

        return arr;
    }

    /**查看机关交集 */
    private intersectionSet(set1: Set<number>, set2: Set<number>) {
        const intersect = [...set1].filter(x => set2.has(x));
        return intersect;
    }

    /**根据技能门查找机关集合 */
    private findBarrierSetBySkillDoor(skillDoorID: number) {
        const arr = new Set<number>();
        const allCfg = GameConfig.Obstacle.getAllElement();
        for (let i = 0; i < allCfg.length; i++) {
            const cfg = allCfg[i];
            if (!cfg.isSkillDoor && cfg.skillType.includes(skillDoorID)) {
                arr.add(cfg.ID);
            }
        }

        return arr;
    }

    /**类switch的方法 */
    private createTypes(lv: number) {
        const types = Object.create(null);
        const cfg = GameConfig.GemSkill;
        const skillLV = lv;
        types[SkillType.Heart] = () => { }

        types[SkillType.Power] = () => {
            this.allPrefabScripts.forEach(s => {
                s.power && s.power();
            });
        }

        types[SkillType.Reality] = () => {
            const ratio = cfg.getElement(3).skillValue[skillLV - 1];// 现实数值配置
            this.allPrefabScripts.forEach(s => {
                if (ratio > Math.random()) {
                    s.reality && s.reality();
                }
            });
        }

        types[SkillType.Space] = () => {
            const ratio = cfg.getElement(2).skillValue[skillLV - 1];// 空间数值配置
            this.expandRoad(ratio);
            this.allPrefabScripts.forEach(s => {
                s.space && s.space(ratio);
            });
        }

        types[SkillType.Time] = () => {
            const ratio = this.gameCoefficient.speedCoefficient
                * cfg.getElement(4).skillValue[skillLV - 1];// 时间数值配置
            this.allPrefabScripts.forEach(s => {
                s.time && s.time(ratio);
            });
        }

        types[SkillType.Soul] = () => {
            this.allPrefabScripts.forEach(s => {
                s.destroyPrefab();
                GeneralManager.rpcPlayEffectAtLocation(
                    ProLoadGuid.effect_soul,
                    (<any>s as mw.Script).gameObject.worldTransform.position,
                    1,
                    undefined,
                    new mw.Vector(2.5)
                );
            });
        }

        return types;
    }

    /**回收所有预制件 */
    private despawnGo() {
        this.allPrefabScripts.forEach(s => {
            s.moving && s.moving(false, 1);
            (<IBarrier>s).resetPrefab();
            mwext.GameObjPool.despawn((s as any).gameObject);
        });

        this.allPrefabScripts.length = 0;
    }

    /**检查是否需要显示灵魂门 */
    private checkShowSoulDoor() {
        if (this.useSKillID.has(SkillType.Soul)) {// 有灵魂不需要在检测
            return;
        }

        if (this.useSKillID.size >= 5 && this.soulDoor) {// 满足5种宝石可以解锁灵魂门
            this.soulDoor.setVisibility(mw.PropertyStatus.On, true);
            // this.soulDoor.getChildByName("boxTrigger").setVisibility(mw.PropertyStatus.Off);
            Event.dispatchToLocal('SoulMgs', true);// 给技能门预制件发送的消息
        }
    }

    /**获取特殊技能门 */
    private getDoorID(allDoor: number[]) {
        let doorID = 0;
        let cnt = allDoor.length;
        // 获取随机技能门，并且移除
        while (cnt--) {
            doorID = allDoor[Tools.randomBetweenMinAndMax(0, allDoor.length - 1)];
            const index = allDoor.indexOf(doorID);
            if (index !== -1) {
                allDoor.splice(index, 1);
            }

            const barrierCfg = GameConfig.Obstacle.getElement(doorID);
            const doors = barrierCfg.doorColorID;
            if (doors.length === 2) {// 双选门
                let isCoincide = false;
                for (let i = 0; i < doors.length; i++) {
                    const door = doors[i];
                    const colorCfg = GameConfig.DoorColor.getElement(door);
                    if (this.useSkillDoorType.has(SKILL_MAP[colorCfg.skillName])) {// 不能与单选重合
                        isCoincide = true;
                        break;
                    }
                }

                if (!isCoincide) {// 找到了
                    break;
                }
            } else {
                const colorCfg = GameConfig.DoorColor.getElement(doors[0]);
                const type = SKILL_MAP[colorCfg.skillName];
                if (!this.useSkillDoorType.has(type)) {// 找到了
                    this.useSkillDoorType.add(type);
                    break;
                }
            }
        }

        return doorID;
    }

    /**移动机关 */
    private moveBarrier(isMove: boolean) {
        const ratio = this.gameCoefficient.speedCoefficient;
        this.allPrefabScripts.forEach(s => {
            s.moving && s.moving(isMove, ratio);
        });
    }

    /**
     * 拉伸地面
     * @param scaleX x的缩放 
     * @param isTween 是否有动画
     */
    private expandRoad(scaleX: number, isTween: boolean = true) {
        this.module.sendScaleRoad(scaleX, isTween);
    }

    /**
     * 随机获取指定数量的门
     * @param cnt 数量
     * @param doors 随机的门池子
     * @returns 
     */
    private getRandomDoor(cnt: number, doors: number[]) {
        const res: number[] = [];
        for (let i = 0; i < cnt; i++) {
            let id = this.getDoorID(doors);
            if (id !== 0) {// 没找到就不放入
                res.push(id);
            }
        }

        if (cnt >= MAX_DOOR) {// 特殊的灵魂门
            res.push(SOUL_SKILL_DOOR);
        }

        return res;
    }

    /**获取障碍物 */
    private getObstacles(doors: number[]) {
        const cfg = this.module.getSceneCfg();
        const obstacleIDs = new Set(cfg.obstacleID);

        const obstacles: number[][] = [];
        for (let i = 0; i < doors.length; i++) {
            const arr = [];
            const door = doors[Tools.randomBetweenMinAndMax(0, i)];
            const cnt = Tools.randomBetweenMinAndMax(cfg.count[0], cfg.count[1]);
            for (let j = 0; j < cnt; j++) {// 生成障碍物信息
                // 当前关卡的障碍物和技能门对应障碍物的交集
                const intersect = this.intersectionSet(this.findBarrierSetBySkillDoor(door), obstacleIDs);
                if (intersect.length === 0) continue;
                // 从交集随机一个机关放入
                const barrierID = intersect[Tools.randomBetweenMinAndMax(0, intersect.length - 1)];
                arr.push(barrierID);
                // 删除已经使用过的
                obstacleIDs.delete(barrierID);
            }

            // 保存数据
            obstacles.push(arr);
        }

        return obstacles;
    }

    //  正常随机生成的场景
    private createNormalScene() {
        let len = this.pos.x;// 整体长度控制参数
        const cfg = this.module.getSceneCfg();
        const skillDoorCnt = Tools.randomBetweenMinAndMax(cfg.segment[0], cfg.segment[1]);
        // 6扇技能门，就是有灵魂关卡
        const allDoor = skillDoorCnt >= MAX_DOOR ? this.findSpecialDoor() : this.findAllSkillDoor();
        // 确定生成的技能数据
        const sureDoors = this.getRandomDoor(skillDoorCnt, allDoor);
        // 确定生成的障碍物数据
        const sureObstacles = this.getObstacles(sureDoors);

        for (let i = sureDoors.length - 1; i >= 0; i--) {// 从最后面的门开始生成（因为终点坐标不会改变）
            const doorID = sureDoors[i];// 技能门ID
            const obstacles = sureObstacles[i];// 技能门对应的障碍物
            for (let j = 0; j < obstacles.length; j++) {
                const obstacleID = obstacles[j];// 障碍物ID
                const barrierCfg = GameConfig.Obstacle.getElement(obstacleID);

                // 机关间隔距离
                const intervalDis = Tools.randomBetweenMinAndMax(barrierCfg.distance[0], barrierCfg.distance[1]);
                // 基础数量
                let createCnt = Tools.RangeFloat(barrierCfg.count[0], barrierCfg.count[1]);
                let isFirst = true;
                if (barrierCfg.isRow) {// 列数系数判断
                    createCnt = Math.floor(createCnt * Tools.randomBetweenMinAndMax(cfg.row[0], cfg.row[1]));
                }

                const offsetArr = barrierCfg.offset;
                const index = offsetArr.length - 1;
                let value = barrierCfg.offset[Tools.randomBetweenMinAndMax(0, index < 0 ? 0 : index)];
                for (let idx = 0; idx < createCnt; idx++) {// 生成机关
                    if (isFirst) {
                        len -= barrierCfg.locationX;
                        isFirst = false;
                    } else {// 不是第一个生成，改变机关的间距
                        len -= intervalDis;
                    }

                    if (barrierCfg.offset.length > 1) {// 至少要2个数才能走随机位置
                        const arr: number[] = [];
                        offsetArr.forEach(offset => {
                            if (offset !== value) {
                                arr.push(offset);
                            }
                        });

                        value = arr[Tools.randomBetweenMinAndMax(0, arr.length - 1)];// 相同机关的横向偏移
                    }

                    this.saveBarrierInfo(obstacleID, new mw.Vector(len, this.pos.y + value, this.pos.z));
                }

                if (j !== (obstacles.length - 1)) {
                    len -= this.offsetDis2 + barrierCfg.locationX;// 不同机关之间的偏移
                } else {
                    len -= barrierCfg.locationX;// 最后一个防止与后面的门碰撞，需要偏移
                }
            }

            len -= this.offsetDis3;// 机关与门位置偏移
            const offsetArr = GameConfig.Obstacle.getElement(doorID).offset;
            const index = offsetArr.length - 1;
            // 左右偏移
            const offsetY = offsetArr[Tools.randomBetweenMinAndMax(0, index < 0 ? 0 : index)];
            this.saveBarrierInfo(doorID, new mw.Vector(len, this.pos.y + offsetY, this.pos.z));
            len -= this.offsetDis4;
        }

        len -= this.offsetDis1;  // 出生点位置偏移
        this.startPos = new mw.Vector(len, this.pos.y, this.pos.z + 160);
        let speedCoefficient = Math.random() < 0.5 ? cfg.speed[0] : cfg.speed[1];
        this.gameCoefficient = new GameCoefficient(speedCoefficient);
    }
    // 特殊关卡（之前是新手引导关卡）
    private createGuideScene() {
        const guideModule = ModuleService.getModule(GuideModuleC);
        const barrierInfo = guideModule.getGuideLevelInfo();
        this.allBarriers = barrierInfo;
        const cfg = this.module.getSceneCfg();
        this.gameCoefficient = new GameCoefficient(Math.random() < 0.5 ? cfg.speed[0] : cfg.speed[1]);
        this.startPos = guideModule.getGuidePos();
    }
}