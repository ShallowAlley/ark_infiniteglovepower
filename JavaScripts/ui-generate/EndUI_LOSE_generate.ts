

 

 @UIBind('UI/EndUI_LOSE.ui')
 export default class EndUI_LOSE_Generate extends mw.UIScript {
	 @UIWidgetBind('MWCanvas_2147482460/CenterTop/canvas_Move')
    public canvas_Move: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/RightBottom/centerBottom_Retry/btn_start')
    public btn_start: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/RightBottom/centerBottom_Retry')
    public centerBottom_Retry: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/RightBottom/centerBottom_SetSkill/btn_lvup')
    public btn_lvup: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/RightBottom/centerBottom_SetSkill')
    public centerBottom_SetSkill: mw.Canvas=undefined;
    

 
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
		
	
		this.btn_lvup.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_lvup");
		})
		this.initLanguage(this.btn_lvup);
		this.btn_lvup.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWButton_1") as any);
		
	
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/CenterTop/canvas_Move/Txt_Lose") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/RightBottom/centerBottom_Retry/Text_Start") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/RightBottom/centerBottom_SetSkill/Text_lvup") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 