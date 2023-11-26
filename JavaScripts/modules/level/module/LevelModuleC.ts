
import { GameConfig } from "../../../config/GameConfig";
import { C2CEvent, consts } from "../../../consts/ProLoadGuid";
import { EndData, EndUILose } from "../../../ui/EndUILose";
import EndUI_WIN from "../../../ui/EndUI_WIN";
import Tools from "../../../utils/Tools";
import { SkillType } from "../../skill/SkillDataHelper";
import { SkillModule_C } from "../../skill/SkillModule_C";
import SceneCreator from "../SceneCreator";
import { BarrierInfo, GameCoefficient, LevelDataHelper } from "./LevelDataHelper";
import LevelModuleS from "./LevelModuleS";

export default class LevelModuleC extends ModuleC<LevelModuleS, LevelDataHelper>{
    private sceneCreator: SceneCreator = null!;
    onStart(): void {
        this.sceneCreator = new SceneCreator(this);
    }

    onEnterScene(sceneType: number): void {
        // 等待加载场景
        this.sceneCreator.restoreScene();
        Player.localPlayer.character.name = "";
    }
    /**显示结算 */
    showEndUI(isSuccess: boolean) {
        let endData: EndData = {
            rewards: [],
            success: isSuccess
        }
        ///计算随机奖励
        if (isSuccess) {
            let rewards = this.getEndRewards();
            endData.rewards = rewards;
        }
        if (isSuccess) {
            mw.UIService.show(EndUI_WIN, endData);
            // mw.instance.showPanel(EndUIWin, endData);
            // mw.UIService.show();
        } else {
            mw.UIService.show(EndUILose, endData);
            // mw.instance.showPanel(EndUILose, endData);
        }
    }

    /**计算获取结算奖励 */
    getEndRewards() {
        let skillModule = ModuleService.getModule(SkillModule_C);
        let getSkills = skillModule.net_GetGatherSkills();
        let lvList = skillModule.net_GetSKillLvList();
        let allRewards = [];
        //已有数量
        let havePoints = skillModule.net_GetSkillHavePoints();
        //已使用数量
        let usePoint = skillModule.net_GetSkillUsePoints();
        for (let i = 0; i < getSkills.length; i++) {
            if (getSkills[i] && lvList[i] < consts.skillMaxLv) {//已获取过该宝石，并且未满级
                //计算当前等级距离满级所需数量
                let needPoints = skillModule.getMaxNeedPoint(lvList[i], usePoint[i]);
                if (needPoints != 0 && needPoints > havePoints[i]) {
                    allRewards.push(i);
                }
            }
        }

        ///如果奖励超过3个，则随机抽取3个
        if (allRewards.length > 3) {
            while (allRewards.length > 3) {
                let index = Math.round(Math.random() * (allRewards.length - 1));
                allRewards.splice(index, 1);
            }
        }

        return allRewards;
    }
    /**重来（失败） */
    resetGame() {
        let player = Player.localPlayer;
        // player.character.ragdoll(false);
        ModuleService.getModule(SkillModule_C).net_SkillReset();
        this.sceneCreator.resetScene();
    }

    /**通关游戏（成功） */
    passGame() {
        let player = Player.localPlayer;
        // player.character.ragdoll(false);
        ModuleService.getModule(SkillModule_C).net_SkillReset();
        this.sendLevel();
    }

    /**
     * 全局使用技能
     * @param type 
     */
    useSkillByType(type: SkillType, lv: number) {
        this.sceneCreator.useSkill(type, lv);
    }

    /**查找当前关卡对应配置 */
    findParamConfig(lv: number) {
        let cfgID = 1;
        const allCfg = GameConfig.LevelSettings.getAllElement();

        for (let i = 0; i < allCfg.length; i++) {
            const cfg = allCfg[i];
            if (lv >= cfg.rangeID[0] && lv <= cfg.rangeID[1]) {
                cfgID = cfg.ID;
                break;
            }
        }
        return cfgID;
    }

    /**获取当前场景对应参数配置 */
    getSceneCfg() {
        const sceneLv = this.getCurrentSceneLv();
        const cfgID = this.findParamConfig(sceneLv);
        const cfg = GameConfig.LevelSettings.getElement(cfgID);

        return cfg;
    }


    // Data==============================================================================================
    getCurrentSceneLv() {
        return this.data.getLevel();
    }

    getCurrentSceneBarrierInfo() {
        return this.data.getBarrierInfo();
    }

    getStartPos() {
        return Tools.convertArrToVec(this.data.getStartPos());
    }

    getGameCoefficient() {
        return this.data.getGameCoefficient();
    }

    isUpdateLv() {
        return this.data.getLevel() === this.data.getBarrierLevel();
    }

    addSkilNum() {
        this.data.getDate().skillSum++;
        this.server.net_addSkilNum(Player.localPlayer);
    }
    getData(): LevelDataHelper {
        return this.data;
    }
    setLevelNum() {
        this.server.net_addLevelNum(Player.localPlayer);
    }
    /**
     * 核心循环步骤
     */
    setMsgStep(num: number) {
        let dataHelp = this.data.getDate();
        // 如果已经改了，就不需要改了;
        if (dataHelp.sendMsgStep[num - 1] == true) {
            return;
        }
        dataHelp.sendMsgStep[num - 1] = true;
        this.server.net_setMsgStep(num,Player.localPlayer);

        let sendMsgStep = dataHelp.sendMsgStep;
        for (let i = 0; i < sendMsgStep.length; i++) {
            if (!sendMsgStep[i]) {
                return;
            }
        }
        // 还原
        for (let i = 0; i < sendMsgStep.length; i++) {
            sendMsgStep[i] = false;
        }
        this.server.net_resetMsgStep(Player.localPlayer);
        // 计数
        dataHelp.sendStepTimes++;
        this.server.net_setColNum(Player.localPlayer);

    }
    // C2S==============================================================================================
    /**
     * 发送关卡信息，服务器保存
     * @param barriers 障碍物
     * @param pos 出生位置
     * @param gameCoefficient 游戏系数
     */
    sendLevelData(barriers: BarrierInfo[], pos: number[], gameCoefficient: GameCoefficient) {
        const lv = this.data.getLevel();
        this.server.net_saveLevelData(lv, barriers, pos, gameCoefficient, Player.localPlayer);
    }

    /**
     * 缩放地面
     * @param scaleX 缩放倍数
     * @param isTween 是否有动画
     */
    sendScaleRoad(scaleX: number, isTween: boolean) {
        this.server.net_scaleRoad(scaleX, isTween);
    }

    /**
     * 发送关卡等级
     */
    sendLevel() {
        const lv = this.data.getLevel() + 1;
        const result = this.server.net_saveLevel(lv, Player.localPlayer);
        if (result) {
            this.data.saveLevel(lv);
            this.sceneCreator.resetScript();
            this.sceneCreator.createScene();
            Event.dispatchToLocal(C2CEvent.HALLUI_LVCHANGE, lv);
        }
    }

    resetDefaultTime() {
        this.data.resetDefaultTime();
        this.server.net_resetDefaultTime(Player.localPlayer);
    }
    setDefaultTime() {
        this.data.setDefaultTime();
        this.server.net_setDefaultTime(Player.localPlayer);
    }
    getDefaultTime() {
        return this.data.getDefaultTime();
    }

    getIfNewPlayer() {
        return this.data.getIfNewPlayer();
    }

    setNewPlayer() {
        this.data.setNewPlayer();
        this.server.net_setNewPlayer(Player.localPlayer);
    }

    getIfNewEnter() {
        return this.data.getIfNewEnter();
    }

    setIfNewEnter() {
        this.data.setIfNewEnter();
        this.server.net_setIfNewEnter(Player.localPlayer);
    }
    getLevelDay() {
        return this.data.getLevelDay();
    }
    setLevelDay() {
        this.data.getDate().levelDay++;

        this.server.net_setLevelDay(Player.localPlayer);
    }

}