import { RotationTemp } from "../../../../../Common/Script/RotationTemp";

@Component
export default class WolfToothRos extends RotationTemp {
    protected onStart(): void {
        this.ros = "z";
        this.max = 210;
        this.min = -260;

        this.dir = 1;
        this.type = 2;
        this.trapName = "Cylinder";
        this.stayTime = 1000;
        if (!this.useUpdate) {
            this.vt = 1;
        }
        super.onStart();
    }
}