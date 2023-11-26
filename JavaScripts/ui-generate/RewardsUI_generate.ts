
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 幸好时光与你同在
 * UI: UI/RewardsUI.ui
 * TIME: 2022.10.25-13.17.58
 */

 

 @UIBind('UI/RewardsUI.ui')
 export default class RewardsUI_Generate extends mw.UIScript {
	 @UIWidgetBind('MWCanvas_2147482460/Canvas_BtnContinue/canvas_btnPanel/btn_start')
    public btn_start: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Canvas_BtnContinue/canvas_btnPanel')
    public canvas_btnPanel: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill1/img_check1')
    public img_check1: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill1/mbtn_skill1')
    public mbtn_skill1: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill1/mTxt_Skill1')
    public mTxt_Skill1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill1')
    public canvas_skill1: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill2/img_check2')
    public img_check2: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill2/mbtn_skill2')
    public mbtn_skill2: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill2/mTxt_Skill2')
    public mTxt_Skill2: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill2')
    public canvas_skill2: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill3/img_check3')
    public img_check3: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill3/mbtn_skill3')
    public mbtn_skill3: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill3/mTxt_Skill3')
    public mTxt_Skill3: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill3')
    public canvas_skill3: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward')
    public canvas_allReward: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_001/txt_skillNum1')
    public txt_skillNum1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_002/txt_skillNum2')
    public txt_skillNum2: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_003/txt_skillNum3')
    public txt_skillNum3: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_004/txt_skillNum4')
    public txt_skillNum4: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_005/txt_skillNum5')
    public txt_skillNum5: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove')
    public canvas_CenterMove: mw.Canvas=undefined;
    

 
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
		
	
		this.mbtn_skill1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mbtn_skill1");
		})
		this.initLanguage(this.mbtn_skill1);
		this.mbtn_skill1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mbtn_skill2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mbtn_skill2");
		})
		this.initLanguage(this.mbtn_skill2);
		this.mbtn_skill2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mbtn_skill3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mbtn_skill3");
		})
		this.initLanguage(this.mbtn_skill3);
		this.mbtn_skill3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWButton_1") as any);
		
	
		//文本多语言
		
		this.initLanguage(this.mTxt_Skill1)
		
	
		this.initLanguage(this.mTxt_Skill2)
		
	
		this.initLanguage(this.mTxt_Skill3)
		
	
		this.initLanguage(this.txt_skillNum1)
		
	
		this.initLanguage(this.txt_skillNum2)
		
	
		this.initLanguage(this.txt_skillNum3)
		
	
		this.initLanguage(this.txt_skillNum4)
		
	
		this.initLanguage(this.txt_skillNum5)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_BtnContinue/canvas_btnPanel/Text_Start") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/Txt_Tip_Reward") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 