import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","isSkillDoor","skillType","isRow","count","distance","guid","doorColorID","des","offset","locationX"],["","","","","","","","","","",""],[1001,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,5],[250,250],"7B5B87A24E098ECEA3B0068CD2CAE80E",null,"PF_CircularSaw",[0],0],[1002,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],false,[1,2],[1000,1000],"C523D0B64492E0A7FB531D995F963BE7",null,"PF_Spike_Rotated",[0],300],[1004,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,4],[250,250],"C26B20F3488465CC4C9FE5A2D9AB2646",null,"PF_Spikes_Syn",[0],0],[1008,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],false,[3,4],[650,650],"6F2F4F52409D5AA6674133B8DE03F28F",null,"PF_Stick_SingleTwo",[-200,0,200],300],[1009,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,3],[300,300],"1215DA2644FE256A24829485A7345CA4",null,"PF_Spikes_Side",[-225,0,225],0],[1010,false,[112,113,114,115,116,121,122,123,124,125,131,132],true,[1,1],[700,700],"DA0F3AF1421227FB80F08E98597C1010",null,"PF_NeedleBoard",[0],100],[1011,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,5],[150,150],"2C875B474C2BFE93EB54BEAFABFA02CD",null,"PF_Fan_Rotate",[0],0],[1013,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,5],[250,250],"ED68D14B49446B2417E3CD88D6C0F94C",null,"PF_WolfTooth_L2R",[0],0],[1014,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],false,[3,4],[300,300],"8373B03A45911FCCD65365B62C6986AF",null,"PF_CircularSawStand",[-200,0,200],0],[1015,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,5],[250,250],"760C4F3F40898C3F6909CC91064A8E8A",null,"PF_CircularSaw_Still",[-185,0,185],0],[1016,false,[112,131,116],false,[1,2],[1000,1000],"35E7B3394B9C7C3AF4B5FA868E850E66",null,"PF_Arched",[0],200],[1017,false,[115,132,116],false,[1,2],[500,500],"0D66F0964C4676A949542B8EFCC7919D",null,"PF_CircularHole",[0],200],[1018,false,[112,113,114,115,116,121,122,123,124,125,131,132],true,[3,5],[350,350],"18D03C844C0CE268C79FF98426807115",null,"PF_NeedleCube",[-195,0,195],0],[1019,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,5],[200,200],"E77B92024535CFB74CA8A3AAA6F9DB9A",null,"PF_Spikes_Triple",[-155,0,155],0],[1020,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,5],[200,200],"43B94A6E431DA3B19A4817BDC4AB22AB",null,"PF_Spikes_Asyn",[0],0],[1021,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],false,[3,4],[500,500],"8A186731472920AF7AEE798AC8E5B332",null,"PF_Stick_Single",[-200,0,200],250],[1022,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],false,[3,4],[650,650],"C26E26974568C728B447ABAEF8F4FACD",null,"PF_Stick_Double",[-200,0,200],300],[1023,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],false,[3,4],[650,650],"30F3468A4EAAA897A643B8939700E876",null,"PF_Stick_Double2",[-200,0,200],300],[1024,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],false,[3,5],[300,300],"172E8EBD47800419998C8D9EBB426BC2",null,"PF_Stick_3",[-250,0,250],0],[1025,false,[111,112,113,114,115,116,121,122,123,124,125,131,132],true,[3,3],[300,300],"89F3B086402AAD1ED1517E92E9F9519D",null,"PF_Capsule",[-175,0,175],0],[111,true,null,null,null,null,"E40FA73044FE4EAEBDF9CCAB5610EF0E",[101],null,[-120,0,120],0],[112,true,null,null,null,null,"E40FA73044FE4EAEBDF9CCAB5610EF0E",[102],null,[-120,0,120],0],[113,true,null,null,null,null,"E40FA73044FE4EAEBDF9CCAB5610EF0E",[103],null,[-120,0,120],0],[114,true,null,null,null,null,"E40FA73044FE4EAEBDF9CCAB5610EF0E",[104],null,[-120,0,120],0],[115,true,null,null,null,null,"E40FA73044FE4EAEBDF9CCAB5610EF0E",[105],null,[-120,0,120],0],[116,true,null,null,null,null,"E40FA73044FE4EAEBDF9CCAB5610EF0E",[106],null,[-120,0,120],0],[121,true,null,null,null,null,"793226CB4FEE5EB01C01BFA916FD0B52",[102,104],null,[0],0],[122,true,null,null,null,null,"793226CB4FEE5EB01C01BFA916FD0B52",[101,103],null,[0],0],[123,true,null,null,null,null,"793226CB4FEE5EB01C01BFA916FD0B52",[103,102],null,[0],0],[124,true,null,null,null,null,"793226CB4FEE5EB01C01BFA916FD0B52",[105,101],null,[0],0],[125,true,null,null,null,null,"793226CB4FEE5EB01C01BFA916FD0B52",[104,105],null,[0],0],[131,true,null,null,null,null,"6A9F635A4E96BF358BC497B23E3C0444",[102],null,[0],0],[132,true,null,null,null,null,"6A9F635A4E96BF358BC497B23E3C0444",[105],null,[0],0]];
export interface IObstacleElement extends IElementBase{
 	/**ID*/
	ID:number
	/**是否是技能门*/
	isSkillDoor:boolean
	/**技能门类型*/
	skillType:Array<number>
	/**是否乘以列数难度系数*/
	isRow:boolean
	/**机关基数（最低随机数目|最高随机数目）*/
	count:Array<number>
	/**机关间距（最小值|最大值）*/
	distance:Array<number>
	/**机关资源ID*/
	guid:string
	/**技能门颜色ID*/
	doorColorID:Array<number>
	/**技能门描述*/
	des:string
	/**机关水平偏移坐标（y坐标随机取一个值）*/
	offset:Array<number>
	/**不同机关与机关之间的x间距*/
	locationX:number
 } 
export class ObstacleConfig extends ConfigBase<IObstacleElement>{
	constructor(){
		super(EXCELDATA);
	}

}