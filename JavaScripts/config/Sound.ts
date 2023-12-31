import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","SoundGuid","SoundName","LoopPlayBack","SoundSpatialization","SoundRadius","SoundPropportion","PS"],["","","","","","","",""],[100001,61113,"按键声",0,0,0,0.6,"所有按钮的声音"],[100002,13818,"技能获取",0,0,0,0.8,"获取新技能后播放"],[100003,19592,"行走音效",1,0,0,1,"根据角色移动速度，反复播放"],[100004,117498,"BGM",1,0,0,0.2,"BGM"],[100005,75362,"力量球与机关的碰撞 ",0,0,0,0.8,"力量球与机关碰撞后的声音"],[100006,39350,"玩家碰到机关",0,0,0,0.9,"玩家碰到机关后发出的声音"],[100007,117500,"打响指",0,0,0,2,"玩家穿过灵魂门后，开始打响指，这时播放打响指音效"],[100008,116247,"灭霸语录（游戏开始）",0,0,0,2,"游戏开始的时候，灭霸会说一句：I am prepared"],[100009,116255,"灭霸语录（关卡通关）",0,0,0,2,"通过终点后，由于攒了一些宝石，灭霸会说：You are strong"],[100010,116248,"灭霸语录（灵魂门）",0,0,0,2,"穿过灵魂门后，获得打响指的力量，灭霸说：Pretty, isn’t it?"],[100011,27468,"穿过力量宝石门",1,0,0,0.6,"穿过力量宝石门后播放"],[100012,14038,"穿过时间宝石门",0,0,0,1.5,"穿过时间宝石门后播放"],[100013,14065,"穿过空间宝石门",0,0,0,1.5,"穿过空间宝石门后播放"],[100014,39873,"穿过心灵宝石门",0,0,0,1.5,"穿过心灵宝石门后播放"],[100015,21076,"穿过现实宝石门",0,0,0,1.5,"穿过现实宝石门后播放"],[100016,39815,"UI划入与划出音效",0,0,0,0.8,"需要划入划出的UI播放该音效"],[100017,27971,"失败音效",0,0,0,0.5,"失败界面播放"],[100018,29302,"胜利音效",0,0,0,0.5,"胜利界面播放"],[100019,52570,"技能奖励展示音效",0,0,0,0.4,"奖励界面展示获得宝石时播放"],[100020,29189,"宝石镶嵌音效",0,0,0,0.8,"游戏中玩家获得宝石，宝石显示时播放"],[100021,29335,"宝石集齐音效",0,0,0,0.8,"玩家在游戏中集齐所有宝石时播放"],[100022,114002,"死亡音效",0,0,0,1,"玩家死亡时播放"],[100023,27836,"技能升级音效",0,0,0,1,"进度条升高时播放"],[100024,116252,"机关爆炸",0,0,0,1,"打响指后，所有机关爆炸并消失，播放该音效"]];
export interface ISoundElement extends IElementBase{
 	/**ID*/
	id:number
	/**资源ID*/
	SoundGuid:number
	/**音效名称*/
	SoundName:string
	/**循环播放*/
	LoopPlayBack:number
	/**音效空间化*/
	SoundSpatialization:number
	/**音量内部半径*/
	SoundRadius:number
	/**音量比例*/
	SoundPropportion:number
	/**备注*/
	PS:string
 } 
export class SoundConfig extends ConfigBase<ISoundElement>{
	constructor(){
		super(EXCELDATA);
	}

}