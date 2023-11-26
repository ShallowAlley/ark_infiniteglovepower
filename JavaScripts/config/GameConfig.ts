import {ConfigBase, IElementBase} from "./ConfigBase";
import {DoorColorConfig} from "./DoorColor";
import {GemSkillConfig} from "./GemSkill";
import {GlobalConfig} from "./Global";
import {GuidePrefabsConfig} from "./GuidePrefabs";
import {LangueConfigConfig} from "./LangueConfig";
import {LevelSettingsConfig} from "./LevelSettings";
import {ObstacleConfig} from "./Obstacle";
import {SkinConfig} from "./Skin";
import {SoundConfig} from "./Sound";
import {TipsConfig} from "./Tips";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get DoorColor():DoorColorConfig{ return this.getConfig(DoorColorConfig) };
	public static get GemSkill():GemSkillConfig{ return this.getConfig(GemSkillConfig) };
	public static get Global():GlobalConfig{ return this.getConfig(GlobalConfig) };
	public static get GuidePrefabs():GuidePrefabsConfig{ return this.getConfig(GuidePrefabsConfig) };
	public static get LangueConfig():LangueConfigConfig{ return this.getConfig(LangueConfigConfig) };
	public static get LevelSettings():LevelSettingsConfig{ return this.getConfig(LevelSettingsConfig) };
	public static get Obstacle():ObstacleConfig{ return this.getConfig(ObstacleConfig) };
	public static get Skin():SkinConfig{ return this.getConfig(SkinConfig) };
	public static get Sound():SoundConfig{ return this.getConfig(SoundConfig) };
	public static get Tips():TipsConfig{ return this.getConfig(TipsConfig) };
}