

 @UIBind('UI/gm/GMItem.ui')
 export default class GMItem_Generate extends mw.UIScript {
	 @UIWidgetBind('MWCanvas_2147482460/button')
    public button: mw.StaleButton=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.button.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "button");
		})
		this.initLanguage(this.button);
		this.button.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 