
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 幸好时光与你同在
 * UI: UI/SkillDoorUI.ui
 * TIME: 2022.10.25-13.17.58
 */

 

 @UIBind('UI/SkillDoorUI.ui')
 export default class SkillDoorUI_Generate extends mw.UIScript {
	 @UIWidgetBind('MWCanvas_2147482460/txt_SkillDoor')
    public txt_SkillDoor: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_SkillDoor)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 