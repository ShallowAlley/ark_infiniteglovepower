
@Component
export class RotationTemp extends mw.Script {


	@mw.Property({ displayName: "旋转轴", tooltip: "陷阱绕那个轴旋转" })
	ros: string = "y";    // 开门时间(毫秒)：从门完全关闭到完全打开需要的时间
	@mw.Property({ displayName: "上限", tooltip: "旋转上限" })
	max: number = 210;
	@mw.Property({ displayName: "下限", tooltip: "旋转下限" })
	min: number = -210;
	@mw.Property({ displayName: "方向", tooltip: "旋转方向" })
	dir: number = 1;
	@mw.Property({ displayName: "速度", tooltip: "旋转速度" })
	vt: number = 1;
	@mw.Property({ displayName: "移动类型", tooltip: "旋转类型" })
	type: number = 2;
	@mw.Property({ displayName: "停留时间", tooltip: "摇摆停留时间" })
	stayTime: number = 1000;
	@mw.Property({ displayName: "下方陷阱名称", tooltip: "移动速度" })
	trapName: string = "CircularSaw";

	// 旋转物体的初始位置
	private trapRos: mw.Rotation;
	// 旋转物体 
	private tempObj: mw.GameObject;
	// 刺板在上面固定停留时间
	private originTime: number = 1000;

	// 用来记录类型1和类型2的两个物体

	// 用于update里面计算停留时间
	private _stayTimeCountdown: number = 0;
	private rosObj: mw.GameObject;
	protected onStart(): void {
		// oTrace("调试看onStart是否正常执行")
		this.tempObj = this.gameObject.getChildByName(this.trapName);
		if (this.tempObj) {
			this.trapRos = this.tempObj.localTransform.rotation;
		}
		this.temp = this.trapRos[this.ros];
		if (this.type == 2) {
			this.rosObj = this.gameObject;
		} else {
			this.rosObj = this.tempObj;
		}
	}
	private temp = 0;
	private addTemp = new mw.Rotation(0, 0, 0);
	rotationChange(type: string, addTemp: mw.Rotation) {
		if (addTemp[type] >= this.max) {
			this.dir = -Math.abs(this.dir);
			// addTemp[type] = this.max
			this._stayTimeCountdown = ((this.trapName == "board" || this.trapName == "boardLeft") ? this.originTime : this.stayTime);
		} else if (addTemp[type] <= this.min) {
			// addTemp[type] = this.min
			this.dir = Math.abs(this.dir);
			this._stayTimeCountdown = this.stayTime;
		}
		this.rosObj.localTransform.rotation = (addTemp);
	}
	protected onUpdate(dt: number): void {
		// let temp = this.gameObject.getChildByName(this.trapName);
		if (!this.tempObj) return;
		// 1为范围旋转，2为自传
		if (this.type == 1) {
			this._stayTimeCountdown = this._stayTimeCountdown - (dt * 1000)

			if (this._stayTimeCountdown > 0) {
				return;
			}

			let v = this.vt * this.dir;
			this.temp += v;
			this.addTemp.x = this.trapRos.x
			this.addTemp.y = this.trapRos.y;
			this.addTemp.z = this.trapRos.z;
			this.addTemp[this.ros] = this.temp;
			this.rotationChange(this.ros, this.addTemp)
		} else {
			let v = this.vt * this.dir;
			this.temp += v;
			this.addTemp.x = this.trapRos.x
			this.addTemp.y = this.trapRos.y;
			this.addTemp.z = this.trapRos.z;
			if (this.ros == "x") {
				this.addTemp.x = this.temp;
				this.tempObj.localTransform.rotation = (this.addTemp);
			} else if (this.ros == "y") {
				this.addTemp.y = this.temp;
				this.tempObj.localTransform.rotation = (this.addTemp);
			} else if (this.ros == "z") {
				this.addTemp.z = this.temp;
				this.tempObj.localTransform.rotation = (this.addTemp);
			}
		}
	}
}
