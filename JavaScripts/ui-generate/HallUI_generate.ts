
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 幸好时光与你同在
 * UI: UI/HallUI.ui
 * TIME: 2022.10.25-13.17.58
 */

 

 @UIBind('UI/HallUI.ui')
 export default class HallUI_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/CenterTop/txt_lv')
    public txt_lv: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill1')
    public img_skill1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill2')
    public img_skill2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill3')
    public img_skill3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill4')
    public img_skill4: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill5')
    public img_skill5: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill6')
    public img_skill6: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/RightTop/canvas_Skill')
    public canvas_Skill: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/Center/img_Move')
    public img_Move: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/LeftBottom/canvas_moveCtrl/moveControl')
    public moveControl: mw.VirtualJoystickPanel=undefined;
    @UIWidgetBind('RootCanvas/LeftBottom/canvas_moveCtrl')
    public canvas_moveCtrl: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/RightBottom/canvas_startBtn/img_Shadow')
    public img_Shadow: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/RightBottom/canvas_startBtn/btn_start')
    public btn_start: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/RightBottom/canvas_startBtn/txt_Start')
    public txt_Start: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/RightBottom/canvas_startBtn')
    public canvas_startBtn: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/LeftTop/btn_Set')
    public btn_Set: mw.StaleButton=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_start.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_start");
		})
		this.initLanguage(this.btn_start);
		this.btn_start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Set.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Set");
		})
		this.initLanguage(this.btn_Set);
		this.btn_Set.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_lv)
		
	
		this.initLanguage(this.txt_Start)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 