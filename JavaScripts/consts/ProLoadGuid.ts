/**一些固定常量定义 */
export namespace consts {
	/**当前语言ID */
	export let curLanguage: number = 0;
	/**技能最高等级 */
	export const skillMaxLv: number = 5;
	/**技能加点最大值 */
	export const skillMaxPoints: number = 5;
	/**主UI图片颜色 */
	export const skillImgColorlist = [
		new mw.LinearColor(0.1, 0.2, 0.3),
		new mw.LinearColor(0.3, 0.3, 0.3),
		new mw.LinearColor(0.4, 0.2, 0.3),
		new mw.LinearColor(0.5, 0.2, 0.3),
		new mw.LinearColor(0.6, 0.5, 0.3),
		new mw.LinearColor(0.8, 0.7, 0.3),
	];
	/**可被力量宝石技能摧毁的物体tag */
	export const officeTag = "office";
	/**致死Tag */
	export const deadTag = "dead";

	export const normalColor = "#FFFFFFFF";
	export const forbiddenColor = "#7F7F7FFF";

	/**力量球移动半径 */
	export const powerBallRadius = 200;
	export const powerBallHight = 0;
	/**球体转动速度 每帧转动角度*/
	export const rotationSpeed = 5;
	/**空间宝石基础扩宽数值(缩放倍数) */
	export const spaceBaseNum = 2;
	/**空间宝石每级增加扩宽数值(缩放倍数) */
	export const spaceLvAddNum = 1;
	/**空间宝石扩宽所需时长 单位ms */
	export const spaceNeedTime = 1000;
	/**现实宝石基础无效化概率 */
	export const baseRealityProbabillity = 0.2;
	/**现实宝石每级增长无效化概率 */
	export const addRealityProbabillity = 0.1;
	/**时间宝石基础减速比例 */
	export const baseTimeProportion = 0.2;
	/**时间宝石每级增长减速比例 */
	export const addTimeProportion = 0.1;
	////////////////////////测试用
	export const testSkillTypeName = ["Power", "Space", "Reality", "Time", "Mind", "Soul"]
	///////////////////////////////////
	export const playWinTime = 8.7;
}
/**存放需预加载的guid */
export class ProLoadGuid {
	// 原始材质
	static readonly materialPre = "94245";
	// 更换材质guid
	static readonly materialChange = "94240";
	// 底座材质
	private materialCube = "100234";
	static readonly worldUI = "UIWidget";
	static readonly Trigger = "Trigger";
	static readonly playerPre = "21581";
	static readonly playerPreV = "31969";
	static readonly anchor = "25782";
	static readonly cube = '7667';
	static readonly effect_power = '57200';
	static readonly effect_soul = '61004';
	static readonly playerDead = '15847';
	static readonly playerStand = '78906';
	static readonly playerSuccess = '88450,52965,84930,29717,88449,52979,46292,88541';
	////角色服装id
	static readonly playerCLothStr = "114591,60746,114593,114595,114597,114596"
}
/**存放被引用和动态生成的的场景guid和预制体guid等 */
export class ProLoadGuid_SceneGuid {
	/**力量宝石技能球体预制体 */
	static readonly powerBallPre = "D9FA342A4548A8C7FE4B908E27E838C0";
}
/**需要被查找的guid  ---供测试功能和道具时使用 */
export namespace FindSceneGuid {
	export const LevelPath = "C24A3645490C464E1F9C5791782821E6";
	export const BigObj = "619CC9BE4A91AA7A115052A526F506E7";
}
/**C端通信 */
export namespace C2CEvent {
	export const GETSKILLGEM = "getSkillGem";
	export const SCENE_FINISH = 'SCENE_FINISH';


	/**触发技能门 */
	export const SKILL_DOORGET = "skill_doorget";
	/**重置主UI */
	export const HALLUI_SKILLRESET = "hallui_skillreset";
	/**摧毁机关 */
	export const DESTORY_OFFICE = "dedstory_office";
	/**主UI移出动画 */
	export const HALLUI_UIOUT = "hallui_uiout";
	/**主UI等级变动 */
	export const HALLUI_LVCHANGE = "hallui_lvchange";
	/**主UI隐藏摇杆 */
	export const HALLUI_HIDECONTROL = "hallui_hidecontrol";
	/**主U玩家停止 */
	export const HALLUI_PLAYERSTOP = "hallui_playerstop";
}

/**S端通信 */
export namespace S2SEvent {
}
/**S端给C端通信 */
export namespace S2CEvent {
}
/**C端给S端通信 */
export namespace C2SEvent {
}