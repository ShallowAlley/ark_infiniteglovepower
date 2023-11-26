
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 幸好时光与你同在
 * UI: UI/EnterLoading.ui
 * TIME: 2022.10.25-13.17.58
 */

 

 @UIBind('UI/EnterLoading.ui')
 export default class EnterLoading_Generate extends mw.UIScript {
	 @UIWidgetBind('MWCanvas_2147482460/mImgRing')
    public mImgRing: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mTxtTips')
    public mTxtTips: mw.TextBlock=undefined;
    

 
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
		
		this.initLanguage(this.mTxtTips)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 