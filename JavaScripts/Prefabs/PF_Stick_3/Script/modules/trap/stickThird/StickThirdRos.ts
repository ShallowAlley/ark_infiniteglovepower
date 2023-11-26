import { RotationTemp } from "../../../../../Common/Script/RotationTemp";

export default class StickThirdRos extends RotationTemp {
    protected onStart(): void {
        this.type = 1;
        this.max = 180;
        this.min = 0;
        this.ros = "x";
        this.vt = 1;
        this.stayTime = 1000;
        super.onStart();
        this.useUpdate = true;
    }

}