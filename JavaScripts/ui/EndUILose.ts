import LevelModuleC from "../modules/level/module/LevelModuleC";
import { SkillModule_C } from "../modules/skill/SkillModule_C";
import SkillPanelUI from "./SkillPanelUI";
import EndUI_LOSE_Generate from "../ui-generate/EndUI_LOSE_generate";
import { SoundConfigID, SoundPlay } from "../utils/SoundPlay";
import Tools from "../utils/Tools";
export type EndData = {
    rewards: Array<number>,
    success: boolean
}

export class EndUILose extends EndUI_LOSE_Generate {

    protected onStart(): void {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        //this.initButtons();

        this.btn_start.onClicked.add(() => {
            this.btn_start.enable = (false);
            this.playOutAni(false, null, true);
        })
        this.btn_lvup.onClicked.add(() => {
            this.btn_lvup.enable = (false);
            this.playOutAni(false, null, false)
        });
        this.centerBottom_Retry.visibility = (mw.SlateVisibility.Hidden);
    }
    // 	/**
    // 	* 构造UI文件成功后，onStart之后
    // 	* 对于UI的根节点的添加操作，进行调用
    // 	* 注意：该事件可能会多次调用
    // 	*/
    protected onAdded() {
        const size = mw.WindowUtil.getViewportSize();
        let slot = this.canvas_Move;
        slot.position = (new mw.Vector2(-size.x, 0));
    }
    // protected onEnable(): void {
    //     const size = mw.WindowUtil.getViewportSize();
    //     let slot = this.canvas_Move ;
    //     slot.setPosition(new mw.Vector2(-size.x, 0));
    // }

    protected onShow(endData: EndData): void {
        this.btn_start.enable = (true);
        this.btn_lvup.enable = (true);
        this.playOutAni(true, endData, false);
        SoundPlay.ins.stop(SoundConfigID.PASS_POWER);
        SoundPlay.ins.play(SoundConfigID.FAIL);
    }
    playOutAni(isIn: boolean, endData: EndData, reset: boolean) {
        SoundPlay.ins.stop(SoundConfigID.FAIL);
        SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);

        const size = mw.WindowUtil.getViewportSize();
        let slot = this.canvas_Move;
        let start = isIn ? -1 : 0;
        let end = isIn ? 0 : 1;
        let movePos = new mw.Vector2(0, 0);
        movePos.x = size.x * start;
        movePos.y = 0;
        slot.position = (movePos);
        const moveAni = new mw.Tween({ hight: start }).to({ hight: end }, 500).onUpdate((object) => {
            movePos.x = size.x * object.hight;
            movePos.y = 0;
            slot.position = (movePos);
        }).onComplete(() => {
            if (isIn) {
                setTimeout(() => {
                    this.centerBottom_Retry.visibility = (mw.SlateVisibility.Visible);
                    let have = ModuleService.getModule(SkillModule_C).net_GetSkillHavePoints();
                    let haveNotUse = false;
                    for (let i = 0; i < have.length; i++) {
                        if (have[i] != 0) {
                            haveNotUse = true;
                            break;
                        }
                    }
                    Tools.setMWGameUIVisibility(this.centerBottom_SetSkill, haveNotUse);
                }, 250);
            } else {
                this.centerBottom_Retry.visibility = (mw.SlateVisibility.Hidden);
                this.centerBottom_SetSkill.visibility = (mw.SlateVisibility.Hidden);
                this.hide();
                if (reset) {
                    ModuleService.getModule(LevelModuleC).resetGame();
                } else {
                    mw.UIService.show(SkillPanelUI, false);
                    // mw.instance.showPanel(SkillPanelUI, false);
                }
            }
        });
        moveAni.start();
    }
    hide() {
        mw.UIService.hide(EndUILose);
    }
    protected onHide(): void {

    }

}
