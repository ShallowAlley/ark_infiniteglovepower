import { RotationTemp } from "../../../../../Common/Script/RotationTemp";

@Component
export default class StickDoubleRos extends RotationTemp {
    protected onStart(): void {
        this.ros = "z";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "StickUp";
        this.stayTime = 1000;
        super.onStart();
    }
}