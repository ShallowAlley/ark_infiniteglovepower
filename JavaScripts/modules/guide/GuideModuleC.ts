import { GameConfig } from "../../config/GameConfig";
import HallUI from "../../ui/HallUI";
import { SoundPlay } from "../../utils/SoundPlay";
import Tools from "../../utils/Tools";
import { BarrierInfo } from "../level/module/LevelDataHelper";
import LevelModuleC from "../level/module/LevelModuleC";
import { GuideDataHelper } from "./GuideDataHelper";
import GuideModuleS from "./GuideModuleS";

export default class GuideModuleC extends ModuleC<GuideModuleS, GuideDataHelper>{

    readonly prefabs: { [k: number]: readonly BarrierInfo[] } = Object.create(null);// 特殊关卡信息
    levelModule: LevelModuleC = null!;
    onStart(): void {
        const guideCfg = GameConfig.GuidePrefabs.getAllElement();

        for (let i = 0; i < guideCfg.length; i++) {
            const info = [];
            const cfg = guideCfg[i];
            const arr = cfg.prefabID;
            if (arr.length !== cfg.prefabPos.length) {
                // 表格检查
                throw new Error(" config error " + cfg.id);
            }

            for (let i = 0; i < arr.length; i++) {
                const id = arr[i];
                const prefabInfo = this.createPrefabInfo(id, cfg.prefabPos[i]);
                info.push(prefabInfo);
            }

            this.prefabs[cfg.level] = info;
        }

        this.levelModule = ModuleService.getModule(LevelModuleC);
    }

    onEnterScene(sceneType: number): void {
        SoundPlay.ins.onEvent();
        // mw.instance.showPanel(HallUI);
        mw.UIService.show(HallUI);
        // mw.instance.showPanel(GMBasePanel);
        // new GMBasePanelUI().show();
        // new GMBasePanelUI().show();
    }

    /**是否包含引导关卡 */
    isIncludeGuide() {
        const lv = this.levelModule.getCurrentSceneLv();
        return !!this.prefabs[lv];
    }

    /**当前关卡信息 */
    getGuideLevelInfo() {
        const lv = this.levelModule.getCurrentSceneLv();
        const arr = this.prefabs[lv] ?? [];
        return arr.map(v => v);
    }

    /**获得引导当前关卡位置 */
    getGuidePos() {
        const lv = this.levelModule.getCurrentSceneLv();
        const guideCfg = GameConfig.GuidePrefabs.getAllElement();

        for (let i = 0; i < guideCfg.length; i++) {
            const element = guideCfg[i];
            if (element.level === lv) {
                return Tools.convertArrToVec(element.born) as mw.Vector;
            }
        }

        return mw.Vector.zero;
    }

    /**创建预制件的信息 */
    private createPrefabInfo(id: number, pos: number[]) {
        const barrier = new BarrierInfo();
        const v3 = Tools.convertArrToVec(pos) as mw.Vector;
        barrier.prefabID = id;
        barrier.prefabLoc = [v3.x, v3.y, v3.z];
        return barrier;
    }
}