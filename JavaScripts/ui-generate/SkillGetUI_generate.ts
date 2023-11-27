
 

 @UIBind('UI/SkillGetUI.ui')
 export default class SkillGetUI_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/CenterTop/powerCanvas/mImg_Skill_Power1')
    public mImg_Skill_Power1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/powerCanvas/mImg_Skill_Power2')
    public mImg_Skill_Power2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/powerCanvas')
    public powerCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/spaceCanvas/mImg_Skill_Space1')
    public mImg_Skill_Space1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/spaceCanvas/mImg_Skill_Space2')
    public mImg_Skill_Space2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/spaceCanvas')
    public spaceCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/realityCanvas/mImg_Skill_Reality1')
    public mImg_Skill_Reality1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/realityCanvas/mImg_Skill_Reality2')
    public mImg_Skill_Reality2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/realityCanvas')
    public realityCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/timeCanvas/mImg_Skill_Time')
    public mImg_Skill_Time: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/timeCanvas')
    public timeCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/mindCanvas/mImg_Skill_Mind')
    public mImg_Skill_Mind: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/CenterTop/mindCanvas')
    public mindCanvas: mw.Canvas=undefined;
    

 
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
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 