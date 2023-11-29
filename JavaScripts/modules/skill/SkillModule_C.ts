import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { GameConfig } from "../../config/GameConfig";
import { C2CEvent, consts, ProLoadGuid, ProLoadGuid_SceneGuid } from "../../consts/ProLoadGuid";
import SkillPanelUI from "../../ui/SkillPanelUI";
import SoulUI from "../../ui/SoulUI";
import { SoundConfigID, SoundPlay } from "../../utils/SoundPlay";
import Tools from "../../utils/Tools";
import LevelModuleC from "../level/module/LevelModuleC";
import { PlayerModuleC } from "../player/PlayerModuleC";
import { SkillDataHelper, SkillType } from "./SkillDataHelper";
import { SkillModule_S } from "./SkillModule_S";

export class SkillModule_C extends ModuleC<SkillModule_S, SkillDataHelper>{
    private skillPanel: SkillPanelUI;
    onStart(): void {
        this.skillPanel = mw.UIService.getUI(SkillPanelUI);// mw.instance.getPanel(SkillPanelUI);
    }
    /**
     * 技能宝石设置，用来确认玩家时候领取过某宝石
     * @param type 
     */
    net_SetGatherSkills(type: SkillType) {
        let list = this.data.getSkillGem();
        if (list[type] == false) {
            this.data.setSkillGem(type);
            this.server.net_SetGatherSkills(type);
        }
        this.net_GetSkill(type);
    }
    /**获取技能宝石 */
    net_GetGatherSkills() {
        return this.data.getSkillGem();
    }
    ///////////////技能点-技能加点面板逻辑相关
    /**
     *技能点数量增长
     * @param type 技能类型
     * @param num 获得的技能点数量
     */
    net_SkillPointGet(type: SkillType, num: number) {
        this.data.skillHavePointGet(type, num);
        this.server.net_SkillPointGet(type, num);
    }
    /**
     * 技能升级技能点添加
     * @param type 
     */
    net_SkillLvUpPoint(type: SkillType) {
        let lv = this.data.getSkillLvByType(type);
        if (lv >= consts.skillMaxLv) return;
        SoundPlay.ins.play(SoundConfigID.SKILL_UP);

        let havePoints = this.data.getSkillHaveByType(type);
        if (havePoints <= 0) return;
        this.data.skillUsePoint(type);
        this.server.net_SkillLvUpPoint(type);
        let point = this.data.getSkillUsePointByType(type);
        this.skillPanel.skillAddPoint(type, this.data.getSkillHaveByType(type), point,
            lv);
        if (this.juageSkillLvPoints(lv, point)) {
            this.skillLvUp(type);
        }
    }
    /**
     * 玩家技能等级提升
     * @param type 
     */
    skillLvUp(type: SkillType) {
        this.data.skillLvUp(type);
        this.skillPanel.skillLvUp(type, this.data.getSkillLvByType(type));
        this.server.net_SkillLvUp(type);
        Tools.playDynamic(30);
    }
    /**
     * 判断技能是否升级
     * @param lv 
     * @param point 
     */
    juageSkillLvPoints(lv: number, point: number) {
        if (lv >= consts.skillMaxLv) return;

        if (point >= lv + 1) {
            return true;
        }
        return false;
    }

    /**
     *获取当前等级距离最高等级所需技能点数量 
     * @param lv 
     * @param usePoints 
     */
    getMaxNeedPoint(lv: number, usePoints: number) {
        if (lv >= consts.skillMaxLv) return 0;
        let needPoints = 0;
        for (let i = lv; i < consts.skillMaxLv; i++) {
            needPoints += (i + 1);
        }
        return needPoints - usePoints;
    }

    /**获取技能等级列表 */
    net_GetSKillLvList() {
        return this.data.getSkillLvList();
    }
    /**获取加点数据 */
    net_GetSkillUsePoints() {
        return this.data.getSkillUsePoint()
    }
    /**获取拥有的技能点列表 */
    net_GetSkillHavePoints() {
        return this.data.getSkillHavePoint();
    }
    /////////////////技能获取-释放-主ui变动等逻辑
    /**重置/通关 重置技能获取 */
    net_SkillReset() {
        this.useMind = false;
        this.useReality = false;
        this.useSpace = false;
        this.useTime = false;

        if (this.powerBallAncher) {

            for (let i = 0; i < this.powerBallList.length; i++) {
                if (this.powerBallList[i]) {
                    this.powerBallList[i].parent = null;
                    // let trigger = this.powerBallList[i].getChildByName("Ball").getChildByName("BallTrigger") as mw.Trigger;
                    // if (trigger) {
                    //     trigger.enabled = (false);
                    // }
                    // mwext.GameObjPool.despawn(this.powerBallList[i]);
                    this.powerBallList[i].destroy();
                }
            }
            this.powerBallList = [];
            this.powerBallAncher.destroy();
            this.powerBallAncher = null;
            // mwext.GameObjPool.despawn(this.powerBallAncher);
        }
        this.powerBallAncher = null;
        Event.dispatchToLocal(C2CEvent.HALLUI_SKILLRESET);
        ModuleService.getModule(PlayerModuleC).mindSkillReset();
    }

    private nowHaveSkill = [0, 0, 0, 0, 0, 0];
    private powerBallList: Array<mw.GameObject> = [];
    private powerBallRotaionList = [];
    private powerBallAncher: any;
    private addRotaionSpeed: mw.Rotation = new mw.Rotation(0, 0, consts.rotationSpeed);
    /**播放技能 */
    net_GetSkill(type: SkillType) {
        let lv = this.data.getSkillLvByType(type);
        switch (type) {
            case SkillType.Power: {
                this.playSkillPower(lv);
            } break;
            case SkillType.Space: {
                this.playSkillSpace(lv);
            } break;
            case SkillType.Reality: {
                this.playSkillReality(lv);
            } break;
            case SkillType.Time: {
                this.playSkillTime(lv);
            } break;
            case SkillType.Heart: {
                this.playSkillHeart(lv);
            } break;
            case SkillType.Soul: {
                this.playSoul();
            } break;
        }
    }
    /**释放力量宝石能力
     *  @param lv 技能等级
     */
    playSkillPower(lv: number) {
        if (this.powerBallAncher) return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);

        const func = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_POWER);
            this.playEffectAtPlayer(SkillType.Power);
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Power, lv);
            this.setPowerBall(lv)
        }

        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Power, func);

    }
    setPowerBall(lv) {
        let player = Player.localPlayer;

        let ancher = SpawnManager.wornSpawn(ProLoadGuid.anchor) as mw.GameObject;//SpawnManager.modifyPoolSpawn(ProLoadGuid.anchor) as mw.Anchor;
        ancher.worldTransform.position = (player.character.worldTransform.position);// = player.character.worldTransform.position;
        this.powerBallAncher = ancher;
        let num = GameConfig.GemSkill.getElement(1).skillValue[lv - 1];
        if (!num) num = lv + 1;
        let singleR = 360 / (num);
        let cirPosList = Tools.getCirclePoints(ancher.worldTransform.position, consts.powerBallRadius, singleR);
        for (let i = 0; i < num; i++) {
            let ball = SpawnManager.wornSpawn(ProLoadGuid_SceneGuid.powerBallPre);// SpawnManager.modifyPoolSpawn(ProLoadGuid_SceneGuid.powerBallPre);
            let trigger = ball.getChildByName("Ball").getChildByName("BallTrigger") as mw.Trigger;
            if (trigger) {
                trigger.enabled = (true);
                trigger.onEnter.remove(this.powerTrigger);
                trigger.onEnter.add(this.powerTrigger);
            }
            this.powerBallList.push(ball);
            ball.parent = (ancher);
            let pos = cirPosList[i];
            ball.localTransform.position = (pos);
        }
    }
    private useSpace = false;
    /**释放空间宝石 */
    playSkillSpace(lv: number) {
        if (this.useSpace) return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_SPACE);
            this.playEffectAtPlayer(SkillType.Space);
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Space, lv);
        }

        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        this.useSpace = true;
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Space, func);
        // let widthNum = consts.spaceBaseNum + consts.spaceLvAddNum * (lv - 1);
    }
    useReality = false;
    /**释放现实宝石 */
    playSkillReality(lv: number) {

        if (this.useReality) return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_SPACE);
            this.playEffectAtPlayer(SkillType.Space);
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Reality, lv);
        }

        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        this.useReality = true;
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Reality, func);
        let realityPro = consts.baseRealityProbabillity + consts.addRealityProbabillity * (lv - 1);
    }
    useTime = false;
    /**释放时间宝石 */
    playSkillTime(lv: number) {
        if (this.useTime) return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_TIME);
            this.playEffectAtPlayer(SkillType.Time);
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Time, lv);
        }

        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        this.useTime = true;
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Time, func);
        let timePro = consts.baseTimeProportion + consts.addTimeProportion * (lv - 1);
        //todo：通知机关延时:减速比例为timepro
    }
    useMind = false;
    /**释放心灵宝石 */
    playSkillHeart(lv: number) {
        SoundPlay.ins.play(SoundConfigID.PASS_MIND);
        if (this.useMind) return
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            this.playEffectAtPlayer(SkillType.Heart);
            SoundPlay.ins.stop(SoundConfigID.WALK);
            ModuleService.getModule(PlayerModuleC).heartSetPlayerFly();
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Heart, lv);
        }

        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        this.useMind = true;
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Heart, func);
    }
    /**释放灵魂宝石 */
    playSoul() {
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            mw.UIService.show(SoulUI, () => {
                this.playEffectAtPlayer(SkillType.Soul);
                ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Soul, 1);
            })
            // mw.instance.showPanel(SoulSkill, () => {
            //     this.playEffectAtPlayer(SkillType.Soul);
            //     ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Soul, 1);
            // });
        }
        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Soul, func);
    }
    powerTrigger = (obj: mw.GameObject) => {
        if (obj.tag && obj.tag.includes(consts.officeTag)) {
            // obj.visibility=(mw.PropertyStatus.Off);
            let objName = (obj as mw.GameObject).name;
            GeneralManager.rpcPlayEffectAtLocation(
                ProLoadGuid.effect_power,
                obj.worldTransform.position,
                1,
                undefined,
                new mw.Vector(0.3)
            );
            Event.dispatchToLocal(C2CEvent.DESTORY_OFFICE, obj.tag, objName);
            SoundPlay.ins.play(SoundConfigID.BALL_AND_BARRIER);
        }
    }

    onUpdate(dt: number): void {
        if (this.powerBallAncher) {
            this.powerBallAncher.worldTransform.position = (Player.localPlayer.character.worldTransform.position);
            this.powerBallAncher.worldTransform.rotation = (this.powerBallAncher.worldTransform.rotation.add(this.addRotaionSpeed));
        }
    }

    /**
     * 播放技能特效
     * @param type 
     */
    private async playEffectAtPlayer(type: number) {
        const cfg = GameConfig.GemSkill.getElement(type + 1);
        if (cfg) {
            const playId = EffectService.playAtPosition(cfg.effect, Player.localPlayer.character.worldTransform.position, { loopCount: 0});
            //const effect = SpawnManager.modifyPoolAsyncSpawn(cfg.effect) as Effect;
            EffectService.getEffectById(playId).then((effect) => {
            setTimeout(async () => {
                effect.play();
                // char.detac (effect);
                let worldScale = 1;
                const inter = setInterval(async () => {
                    worldScale += 0.2;
                    if (worldScale >= 5) {// 扩大10倍
                        clearInterval(inter);
                        effect.worldTransform.scale = (mw.Vector.one);// = new mw.Vector(1);
                        effect.stop();
                        mwext.GameObjPool.despawn(effect);
                        return;
                    }
                    effect.worldTransform.scale = (new mw.Vector(worldScale));// = ;
                }, 50);
            }, 100);
        });
        } else {
            throw new Error("skill type error,not find cfg");
        }

    }


}
