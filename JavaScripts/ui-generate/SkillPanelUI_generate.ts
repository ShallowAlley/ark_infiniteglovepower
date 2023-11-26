
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 幸好时光与你同在
 * UI: UI/SkillPanelUI.ui
 * TIME: 2022.10.25-13.49.49
 */

 

 @UIBind('UI/SkillPanelUI.ui')
 export default class SkillPanelUI_Generate extends mw.UIScript {
	 @UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_001/txt_skillNum1')
    public txt_skillNum1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_002/txt_skillNum2')
    public txt_skillNum2: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_003/txt_skillNum3')
    public txt_skillNum3: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_004/txt_skillNum4')
    public txt_skillNum4: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_005/txt_skillNum5')
    public txt_skillNum5: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left')
    public canvas_left: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_1/pro_skill1')
    public pro_skill1: mw.ProgressBar=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_1/btn_add1')
    public btn_add1: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_1/txt_skillLv1')
    public txt_skillLv1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_2/pro_skill2')
    public pro_skill2: mw.ProgressBar=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_2/btn_add2')
    public btn_add2: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_2/txt_skillLv2')
    public txt_skillLv2: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_3/pro_skill3')
    public pro_skill3: mw.ProgressBar=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_3/btn_add3')
    public btn_add3: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_3/txt_skillLv3')
    public txt_skillLv3: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_4/pro_skill4')
    public pro_skill4: mw.ProgressBar=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_4/btn_add4')
    public btn_add4: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_4/txt_skillLv4')
    public txt_skillLv4: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_5/pro_skill5')
    public pro_skill5: mw.ProgressBar=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_5/btn_add5')
    public btn_add5: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_5/txt_skillLv5')
    public txt_skillLv5: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_center')
    public canvas_center: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/RightBottom/canvas_BtnContinue/btn_start')
    public btn_start: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/RightBottom/canvas_BtnContinue')
    public canvas_BtnContinue: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_add1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_add1");
		})
		this.initLanguage(this.btn_add1);
		this.btn_add1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_add2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_add2");
		})
		this.initLanguage(this.btn_add2);
		this.btn_add2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_add3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_add3");
		})
		this.initLanguage(this.btn_add3);
		this.btn_add3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_add4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_add4");
		})
		this.initLanguage(this.btn_add4);
		this.btn_add4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_add5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_add5");
		})
		this.initLanguage(this.btn_add5);
		this.btn_add5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_start.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_start");
		})
		this.initLanguage(this.btn_start);
		this.btn_start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWButton_1") as any);
		
	
		//文本多语言
		
		this.initLanguage(this.txt_skillNum1)
		
	
		this.initLanguage(this.txt_skillNum2)
		
	
		this.initLanguage(this.txt_skillNum3)
		
	
		this.initLanguage(this.txt_skillNum4)
		
	
		this.initLanguage(this.txt_skillNum5)
		
	
		this.initLanguage(this.txt_skillLv1)
		
	
		this.initLanguage(this.txt_skillLv2)
		
	
		this.initLanguage(this.txt_skillLv3)
		
	
		this.initLanguage(this.txt_skillLv4)
		
	
		this.initLanguage(this.txt_skillLv5)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_1/Txt_Skill_Name1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_2/Txt_Skill_Name2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_3/Txt_Skill_Name3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_4/Txt_Skill_Name4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_5/Txt_Skill_Name5") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/RightBottom/canvas_BtnContinue/Text_Start") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 