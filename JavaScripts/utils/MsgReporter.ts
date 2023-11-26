import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";

export namespace MsgReport {

    export class ts_coreGameplay_start extends AnalyticsUtil {
        desc: string = "核心循环开始";
        data: { gameid: string };
    }
    export class ts_coreGameplay_end extends AnalyticsUtil {
        desc: string = "核心循环结束";
        data: { gameid: string };
    }
    export class ts_coreGameplay_step extends AnalyticsUtil {
        desc: string = "核心循环步骤";
        data: { coreGameplay_step: number };
    }

    export class ts_tutorial_start extends AnalyticsUtil {
        desc: string = "新手引导开始";
        data: {};
    }
    export class ts_tutorial_step extends AnalyticsUtil {
        desc: string = "新手引导步骤";
        data: { tutorial_step: string };
    }
    export class ts_tutorial_end extends AnalyticsUtil {
        desc: string = "新手引导结束";
        data: {};
    }


    export class ts_action_dead extends AnalyticsUtil {
        desc: string = "结算时失败";
        data: { death_type: number, stage_level: number };
    }
    export class ts_game_over extends AnalyticsUtil {
        desc: string = "结算时胜利";
        data: { round_id: number, fail_num: number };
    }



    export class ts_action_click extends AnalyticsUtil {
        desc: string = "玩家选择想要的技能点";
        data: { button: string };
    }
    export class ts_action_levelup extends AnalyticsUtil {
        desc: string = "玩家消耗技能点进行技能升级";
        data: { player_level: number };
    }
    export class ts_interaction extends AnalyticsUtil {
        desc: string = "玩家选择的技能";
        data: { interaction_id: number };
    }



}