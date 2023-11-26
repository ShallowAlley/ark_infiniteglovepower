import PositionTemp from "../../../../../Common/Script/PositionTemp";

@Component
export default class SpikeTrapSynPos extends PositionTemp {
    protected onStart(): void {
        this.ros = "z";
        this.max = -20;
        this.min = -170;
        this.dir = -1;
        this.vt = 0.1;
        this.trapName = "Spikes";
        this.stayTime = 2000;
        super.onStart();
    }
}