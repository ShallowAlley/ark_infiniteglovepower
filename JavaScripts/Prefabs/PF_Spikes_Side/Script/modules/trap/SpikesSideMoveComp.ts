import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import PositionTemp from "../../../../Common/Script/PositionTemp";

export default class SpikesSideMoveComp extends PositionTemp {
    protected onStart(): void {
        oTrace('----------->', this.trapName);
        super.onStart();
    }
}