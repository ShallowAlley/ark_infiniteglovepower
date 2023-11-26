import PositionTemp from "../../../../../Common/Script/PositionTemp";

@Component
export default class SpikesAsynPosLeft extends PositionTemp {

    protected onStart(): void {
        this.ros = "z";
        this.max = -20;
        this.min = -180;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "SpikesLeft";
        this.stayTime = 1000;
        super.onStart();
    }
}