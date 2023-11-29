import { BarrierInfo, GameCoefficient, LevelDataHelper } from "./LevelDataHelper";
import LevelModuleC from "./LevelModuleC";

const ROAD_GUID = 'B0FF298DFCBAC149';// 跑道guid
export default class LevelModuleS extends ModuleS<LevelModuleC, LevelDataHelper>{
    /**
     * 保存关卡障碍物数据
     * @param level 关卡等级
     * @param barrierInfo 关卡障碍物信息 
     * @param pos 出生的位置
     * @param gameCoefficient 游戏系数
     */
    net_saveLevelData(level: number, barrierInfo: BarrierInfo[], pos: number[], gameCoefficient: GameCoefficient, player: mw.Player) {
        const p = player!;
        const pData = this.getPlayerData(p);
        pData.saveLevelInfo(level, barrierInfo, pos, gameCoefficient);
        // 因为是所有障碍物都会改变，所以直接双端修改
        pData.save(true);
    }

    /**
     * 保存关卡lv
     * @param level 当前关卡
     * @param player 
     */
    net_saveLevel(level: number, player: mw.Player) {
        const p = player!;
        const pData = this.getPlayerData(p);

        if (pData.getLevel() < level) {
            pData.saveLevel(level);
            pData.save(false);
            return true;
        }

        return false;
    }

    /**
     * 拉伸地面
     * @param scaleX x的缩放 
     * @param isTween 是否有动画
     * @param player 
     */
    net_scaleRoad(scaleX: number, isTween: boolean) {
        const obj = GameObject.findGameObjectById(ROAD_GUID);
        const toVec = new mw.Vector(scaleX, 1, 1);
        if (isTween) {
            new mw.Tween({ worldScale: obj.worldTransform.scale })
                .to({ worldScale: toVec }, 1000)
                .onUpdate((o) => {
                    obj.worldTransform.scale = (o.worldScale);
                })
                .start();
        } else {
            obj.worldTransform.scale = (toVec);// = toVec;
        }
    }

    net_resetDefaultTime( player: mw.Player) {
         
        let data = this.getPlayerData(player);
        data.resetDefaultTime();
    }
    net_setDefaultTime( player: mw.Player) {
         
        let data = this.getPlayerData(player);
        data.setDefaultTime();
    }

    net_setNewPlayer( player: mw.Player) {
         
        let data = this.getPlayerData(player);
        data.setNewPlayer();
    }
    net_setIfNewEnter( player: mw.Player) {
         
        let data = this.getPlayerData(player);
        data.setIfNewEnter();
    }
    net_setLevelDay( player: mw.Player) {
         
        let data = this.getPlayerData(player);
        data.getDate().levelDay++;
    }

    net_addSkilNum( player: mw.Player) {
         
        let data = this.getPlayerData(player);
        data.getDate().skillSum++;
    }
    net_addLevelNum( player: mw.Player) {
         
        let data = this.getPlayerData(player);
        data.checkIsSendMsg(player);
    }
    /**
     * 修改完成的相应埋点步骤
     * @param num 完成的第几个
     * @param player 玩家
     */
    net_setMsgStep(num: number,  player: mw.Player) {
         
        let data = this.getPlayerData(player);
        data.getDate().sendMsgStep[num - 1] = true;
    }
    /**
     * 还原核心循环埋点的数据
     * @param player 玩家
     */
    net_resetMsgStep( player: mw.Player) {
         
        let data = this.getPlayerData(player);
        let sendMsgStep = data.getDate().sendMsgStep;
        for (let i = 0; i < sendMsgStep.length; i++) {
            sendMsgStep[i] = false;
        }
    }
    /**
     * 玩家完成核心循环步骤加1
     * @param player 玩家
     */
    net_setColNum( player: mw.Player) {
         
        let data = this.getPlayerData(player)
        data.getDate().sendStepTimes++;
    }
}