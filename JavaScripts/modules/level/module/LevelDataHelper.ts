/**障碍物信息 */
export class BarrierInfo {
    prefabID = 0;
    prefabLoc: number[] = [];
}

/**游戏系数 */
export class GameCoefficient {
    speedCoefficient = 0;// 速度系数
    constructor(speed: number) {
        this.speedCoefficient = speed;
    }
}


export class LevelDataHelper extends Subdata {

    @Decorator.persistence()
    level = 0;// 正确的关卡lv
    @Decorator.persistence()
    oldLevel = 0;// 机关绑定的关卡lv
    @Decorator.persistence()
    startPos = [];// 出发位置
    @Decorator.persistence()
    gameCoefficient: GameCoefficient = null;// 游戏参数系数
    @Decorator.persistence()
    barrierInfo: BarrierInfo[] = [];

    @Decorator.persistence()
    ifNewPlayer: boolean = true;

    @Decorator.persistence()
    fallTime: number = 0;
    @Decorator.persistence()
    ifNewEnter: boolean = true;

    // 当天累计闯过的关卡
    @Decorator.persistence()
    levelDay: number = 0;

    @Decorator.persistence()
    public sendMSGTime: number = 0;
    // 玩家在整个游戏中消耗的技能点的总和
    @Decorator.persistence()
    public skillSum: number = 0;
    // 核心循环记录全为true的时候发送一次
    @Decorator.persistence()
    public sendMsgStep: boolean[] = [false, false, false, false];
    // 玩家完成核心循环的次数
    @Decorator.persistence()
    public sendStepTimes: number = 0;

    /**
     * 保存关卡障碍物数据
     * @param level 障碍物对应的关卡lv
     * @param barrierInfo 障碍物信息
     * @param pos 出生位置
     * @param gameCoefficient 当前关卡的参数系数 
     */
    saveLevelInfo(level: number, barrierInfo: BarrierInfo[], pos: number[], gameCoefficient: GameCoefficient) {
        this.oldLevel = level;
        this.barrierInfo = barrierInfo;
        this.startPos = pos;
        this.gameCoefficient = gameCoefficient;
    }

    /**
     * 保存关卡等级
     * @param level 
     */
    saveLevel(level: number) {
        this.level = level;
    }

    /**
     * 获得起始位置
     */
    getStartPos() {
        return this.startPos;
    }

    /**
     * 当前关卡
     */
    getLevel() {
        return this.level;
    }

    /**
     * 障碍物关卡
     */
    getBarrierLevel() {
        return this.oldLevel;
    }

    /**
     * 关卡障碍物信息
     */
    getBarrierInfo() {
        return this.barrierInfo;
    }

    /**获取游戏系数 */
    getGameCoefficient() {
        return this.gameCoefficient;
    }

    resetDefaultTime() {
        this.fallTime = 0;
    }
    setDefaultTime() {
        this.fallTime++;
    }
    getDefaultTime() {
        return this.fallTime;
    }

    getIfNewPlayer() {
        return this.ifNewPlayer;
    }

    setNewPlayer() {
        this.ifNewPlayer = false;
    }
    getIfNewEnter() {
        return this.ifNewEnter;
    }

    setIfNewEnter() {
        this.ifNewEnter = false;
    }
    getLevelDay(): number {
        return this.levelDay;
    }

    checkIsSendMsg(player: mw.Player) {
        let starTime = new Date().getTime();
        let curTime = Math.floor(this.sendMSGTime / 86400000);
        let perTime = Math.floor(starTime / 86400000);
        // 第一个条件判断是否同一天
        if (curTime < perTime) {
            // 是同一天再考虑关卡数
            this.levelDay += 1;
            if (this.levelDay < 2) return;
            this.sendMSGTime = starTime;
            this.levelDay = 0;
            this.save(false);


        }
    }
    getDate(): LevelDataHelper {
        return this;
    }
}
