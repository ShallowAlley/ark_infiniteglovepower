import PositionTemp from "../../../../../Common/Script/PositionTemp";

@Component
export default class WolfToothPos extends PositionTemp {
    protected onStart(): void {
        this.ros = "y";
        this.max = 260;
        this.min = -260;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "Cylinder";
        this.stayTime = 0;
        super.onStart();
    }
}