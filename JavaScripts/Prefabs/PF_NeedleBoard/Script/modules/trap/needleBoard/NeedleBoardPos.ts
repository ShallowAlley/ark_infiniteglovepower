import PositionTemp from "../../../../../Common/Script/PositionTemp";

@Component
export default class NeedleBoardPos extends PositionTemp {
    protected onStart(): void {
        this.ros = "z";
        this.max = 300;
        this.min = 10;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "board";
        this.stayTime = 0;
        super.onStart();
    }
}