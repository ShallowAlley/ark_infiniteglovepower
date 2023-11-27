

 

 @UIBind('UI/gm/GMHUD.ui')
 export default class GMHUD_Generate extends mw.UIScript {
	 @UIWidgetBind('MWCanvas_2147482460/oKbutton')
    public oKbutton: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/dropList')
    public dropList: mw.ScrollBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/argText')
    public argText: mw.InputBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/cmdButton')
    public cmdButton: mw.StaleButton=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.oKbutton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "oKbutton");
		})
		this.initLanguage(this.oKbutton);
		this.oKbutton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.cmdButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "cmdButton");
		})
		this.initLanguage(this.cmdButton);
		this.cmdButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 