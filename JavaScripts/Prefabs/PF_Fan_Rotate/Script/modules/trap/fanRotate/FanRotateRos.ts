import { RotationTemp } from "../../../../../Common/Script/RotationTemp";

@Component
export default class FanRotateRos extends RotationTemp {
    protected onStart(): void {
        this.ros = "x";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "fanObj";
        this.stayTime = 1000;
        super.onStart();
    }
}