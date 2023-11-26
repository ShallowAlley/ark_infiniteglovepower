import PositionTemp from "../../../../../Common/Script/PositionTemp";

@Component
export default class CircularSawPos extends PositionTemp {
    protected onStart(): void {
        this.ros = "y";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "CircularSaw";
        this.stayTime = 0;
        super.onStart();
    }
}