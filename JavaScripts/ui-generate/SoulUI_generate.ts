 

 @UIBind('UI/SoulUI.ui')
 export default class SoulUI_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/canvas_Ani/img_thanos')
    public img_thanos: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/canvas_Ani')
    public canvas_Ani: mw.Canvas=undefined;
    

 
	protected onAwake() {
		
	}
	 
 }
 