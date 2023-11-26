
@Component
export default class PositionTemp extends mw.Script {

	@mw.Property({ displayName: "移动轴", tooltip: "陷阱绕那个轴移动" })
	ros: string = "y";    // 开门时间(毫秒)：从门完全关闭到完全打开需要的时间
	@mw.Property({ displayName: "上限", tooltip: "旋转上限" })
	max: number = 210;
	@mw.Property({ displayName: "下限", tooltip: "旋转下限" })
	min: number = -210;
	@mw.Property({ displayName: "方向", tooltip: "旋转方向" })
	dir: number = 1;
	@mw.Property({ displayName: "速度", tooltip: "移动速度" })
	vt: number = 0.1;
	@mw.Property({ displayName: "下方陷阱名称", tooltip: "移动速度" })
	trapName: string = "CircularSaw";
	@mw.Property({ displayName: "停留时间" })
	stayTime: number = 0;

	private _moveObj: mw.GameObject;
	private _location: mw.Vector;
	// 用于计算位置相加
	private _addLocation: mw.Vector = new mw.Vector(0, 0, 0);
	// 用于update里面计算停留时间
	private _stayTimeCountdown: number = 0;
	// 尖刺固定停留时间
	private originTime: number = 1000;

	protected onStart(): void {
		// 这里控制为false，会在对应Prefab内的moving方法里面控制为TRUE
		// 获取到要控制的物体对象
		this._moveObj = this.gameObject.getChildByName(this.trapName);
		// 获取该物体的位置缓存起来，后续更新时就不需要每帧获取了
		// this._location = this._moveObj.localTransform.position
	}

	/**
	 * 更改物体位置
	 * @param type 更改物体的哪个轴
	 * @param num 更改偏移量
	 */
	moveLocation(type: string, num: number) {

		// 根据属性和偏移量更改物体位置
		this._addLocation[type] = num;
		this._location = this._moveObj.localTransform.position.add(this._addLocation);

		// 判断边界情况，更改运动方向
		if (this._location[type] >= this.max) {
			this._location[type] = this.max;
			this.dir = -Math.abs(this.dir);
			// 如果移动的是z轴，只有地刺类型，让他再上面停留时的时间不受影响
			this._stayTimeCountdown = (type == "z" ? this.originTime : this.stayTime);
		} else if (this._location[type] <= this.min) {
			this._location[type] = this.min
			this.dir = Math.abs(this.dir);
			this._stayTimeCountdown = this.stayTime
		}
		this._moveObj.localTransform.position = (this._location);
	}

	protected onUpdate(dt: number): void {
		if (!this._moveObj) return;
		if (dt > 1) return;
		// 计算停留时间，如果还在冷却，那就先不动
		this._stayTimeCountdown = this._stayTimeCountdown - (dt * 1000)
		if (this._stayTimeCountdown > 0) {
			return
		}
		// 计算偏移量，根据速度、方向和dt计算
		let v = (dt * 1000) * this.vt * this.dir;
		this.moveLocation(this.ros, v);
	}


	protected onDestroy(): void {
	}
}