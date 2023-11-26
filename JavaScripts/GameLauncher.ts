import { GameConfig } from "./config/GameConfig";
import { consts, ProLoadGuid, ProLoadGuid_SceneGuid } from "./consts/ProLoadGuid";
import { GuideDataHelper } from "./modules/guide/GuideDataHelper";
import GuideModuleC from "./modules/guide/GuideModuleC";
import GuideModuleS from "./modules/guide/GuideModuleS";
import { HallDataHelper } from "./modules/hall/HallDataHelper";
import { HallModule_C } from "./modules/hall/HallModule_C";
import { HallModule_S } from "./modules/hall/HallModule_S";
import { LevelDataHelper } from "./modules/level/module/LevelDataHelper";
import LevelModuleC from "./modules/level/module/LevelModuleC";
import LevelModuleS from "./modules/level/module/LevelModuleS";
import { PlayerDataHelper } from "./modules/player/PlayerDataHelper";
import { PlayerModuleS } from "./modules/player/PlayerModudleS";
import { PlayerModuleC } from "./modules/player/PlayerModuleC";
import { SkillDataHelper } from "./modules/skill/SkillDataHelper";
import { SkillModule_C } from "./modules/skill/SkillModule_C";
import { SkillModule_S } from "./modules/skill/SkillModule_S";
import { TimeUtilTool } from "./utils/Tools";

@Component
export default class GameLauncher extends mw.Script {
    @mw.Property()
    isOnline: boolean = false;


    protected onStart(): void {
        mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
            let key: string = ui.text;
            if (key) {
                let lan = GameConfig.LangueConfig.getElement(key);
                if (lan) {
                    if (ui instanceof mw.StaleButton) {
                        ui.text = (lan.Value)
                    }
                    else {
                        ui.text = (lan.Value);
                    }
                }
            }
        })
        if (mw.SystemUtil.isServer()) {
            if (this.isOnline) {
                DataStorage.setTemporaryStorage(false);
            } else {
                DataStorage.setTemporaryStorage(true);
            }
        }
        super.onStart();
        consts.curLanguage = -1;
        TimeUtilTool.startUp();
        GameConfig.initLanguage(consts.curLanguage, (key) => {
            let ele = GameConfig.LangueConfig.getElement(key);
            if (ele == null)
                return "unknow_" + key;
            return ele.Value;
        })
        this.onRegisterModule();
        this.useUpdate = true;

        //初始化表格语言
        // LanUtil.getLan = GameConfig.LangueConfig.getElement.bind(GameConfig.LangueConfig);
    }
    protected onRegisterModule(): void {
        this.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper);
        this.registerModule(LevelModuleS, LevelModuleC, LevelDataHelper);
        this.registerModule(HallModule_S, HallModule_C, HallDataHelper);
        this.registerModule(SkillModule_S, SkillModule_C, SkillDataHelper);
        this.registerModule(PlayerModuleS, PlayerModuleC, PlayerDataHelper);
    }
    private registerModule(ModuleClass_S: any, ModuleClass_C: any, DataEleHelperClass: mw.TypeName<Subdata>) {
        ModuleService.registerModule(ModuleClass_S, ModuleClass_C, DataEleHelperClass);
    }
    //获取系统语言索引
    private getSystemLanguageIndex(): number {
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("zh")) {
            return 0;
        }
        if (!!language.match("en")) {
            return 1;
        }
        return 0;
    }
    
    onUpdate(dt: number): void {
        super.onUpdate(dt);
        // update();
        mw.TweenUtil.TWEEN.update();
    }
}