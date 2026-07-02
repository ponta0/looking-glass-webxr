(function(w,D){typeof exports=="object"&&typeof module<"u"?D(exports,require("@lookingglass/webxr-polyfill/src/api/index"),require("@lookingglass/webxr-polyfill/src/api/XRSystem"),require("@lookingglass/webxr-polyfill/src/WebXRPolyfill"),require("holoplay-core"),require("@lookingglass/webxr-polyfill/src/devices/XRDevice"),require("@lookingglass/webxr-polyfill/src/api/XRSpace"),require("gl-matrix"),require("@lookingglass/webxr-polyfill/src/api/XRWebGLLayer")):typeof define=="function"&&define.amd?define(["exports","@lookingglass/webxr-polyfill/src/api/index","@lookingglass/webxr-polyfill/src/api/XRSystem","@lookingglass/webxr-polyfill/src/WebXRPolyfill","holoplay-core","@lookingglass/webxr-polyfill/src/devices/XRDevice","@lookingglass/webxr-polyfill/src/api/XRSpace","gl-matrix","@lookingglass/webxr-polyfill/src/api/XRWebGLLayer"],D):(w=typeof globalThis<"u"?globalThis:w||self,D(w["Looking Glass WebXR"]={},w["@lookingglass/webxr-polyfill/src/api/index"],w["@lookingglass/webxr-polyfill/src/api/XRSystem"],w["@lookingglass/webxr-polyfill/src/WebXRPolyfill"],w.holoPlayCore,w["@lookingglass/webxr-polyfill/src/devices/XRDevice"],w["@lookingglass/webxr-polyfill/src/api/XRSpace"],w.glMatrix,w["@lookingglass/webxr-polyfill/src/api/XRWebGLLayer"]))})(this,function(w,D,F,ce,ue,he,de,g,ne){"use strict";var Ne=Object.defineProperty;var Ue=(w,D,F)=>D in w?Ne(w,D,{enumerable:!0,configurable:!0,writable:!0,value:F}):w[D]=F;var S=(w,D,F)=>(Ue(w,typeof D!="symbol"?D+"":D,F),F);const X=t=>t&&typeof t=="object"&&"default"in t?t:{default:t};function fe(t){if(t&&t.__esModule)return t;const i=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const e in t)if(e!=="default"){const r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(i,e,r.get?r:{enumerable:!0,get:()=>t[e]})}}return i.default=t,Object.freeze(i)}const re=X(D),pe=X(F),ve=X(ce),me=fe(ue),we=X(he),be=X(de),ge=X(ne),Q=1.6;var J;(function(t){t[t.Swizzled=0]="Swizzled",t[t.Center=1]="Center",t[t.Quilt=2]="Quilt"})(J||(J={}));class Ce extends EventTarget{constructor(e){super();S(this,"_calibration",{configVersion:"1.0",pitch:{value:45},slope:{value:-5},center:{value:-.5},viewCone:{value:40},invView:{value:1},verticalAngle:{value:0},DPI:{value:338},screenW:{value:3840},screenH:{value:2160},flipImageX:{value:0},flipImageY:{value:0},flipSubp:{value:0},serial:"",subpixelCells:[],CellPatternMode:{value:0}});S(this,"_viewControls",{tileHeight:512,numViews:48,trackballX:0,trackballY:0,targetX:0,targetY:Q,targetZ:-.5,targetDiam:2,fovy:14/180*Math.PI,depthiness:1.25,inlineView:J.Center,capturing:!1,quiltResolution:null,columns:null,rows:null,popup:null,XRSession:null,lkgCanvas:null,appCanvas:null,subpixelMode:0,filterMode:2,gaussianSigma:.01,focus:0,viewDimming:!1,filterEnd:.05,filterSize:.15,edgeThreshold:.01});S(this,"LookingGlassDetected");this._viewControls={...this._viewControls,...e},this.syncCalibration()}syncCalibration(){new me.Client(e=>{if(e.devices.length<1){console.log("No Looking Glass devices found");return}e.devices.length>1&&console.log("More than one Looking Glass device found... using the first one"),this.calibration=e.devices[0].calibration})}addEventListener(e,r,s){super.addEventListener(e,r,s)}onConfigChange(){this.dispatchEvent(new Event("on-config-changed"))}get calibration(){return this._calibration}set calibration(e){var s;this._calibration={...this._calibration,...e};const r=(s=this._calibration.CellPatternMode)==null?void 0:s.value;typeof r=="number"&&Number.isFinite(r)&&(this._viewControls.subpixelMode=Math.round(r)),this.onConfigChange()}updateViewControls(e){e!=null&&(this._viewControls={...this._viewControls,...e},this.onConfigChange())}get tileHeight(){return Math.round(this.framebufferHeight/this.quiltHeight)}get quiltResolution(){if(this._viewControls.quiltResolution!=null)return{width:this._viewControls.quiltResolution.width,height:this._viewControls.quiltResolution.height};{const e=this._calibration.serial;switch(!0){case e.startsWith("LKG-2K"):return{width:4096,height:4096};case e.startsWith("LKG-4K"):return{width:4096,height:4096};case e.startsWith("LKG-8K"):return{width:8192,height:8192};case e.startsWith("LKG-P"):return{width:3360,height:3360};case e.startsWith("LKG-A"):return{width:4096,height:4096};case e.startsWith("LKG-B"):return{width:8192,height:8192};case e.startsWith("LKG-D"):return{width:8192,height:8192};case e.startsWith("LKG-F"):return{width:3360,height:3360};case e.startsWith("LKG-E"):return{width:4092,height:4092};case e.startsWith("LKG-H"):return{width:5995,height:6e3};case e.startsWith("LKG-J"):return{width:5999,height:5999};case e.startsWith("LKG-K"):return{width:8184,height:8184};case e.startsWith("LKG-L"):return{width:8190,height:8190};default:return{width:4096,height:4096}}}}set quiltResolution(e){this.updateViewControls({quiltResolution:e})}get numViews(){return this.quiltWidth*this.quiltHeight}get targetX(){return this._viewControls.targetX}set targetX(e){this.updateViewControls({targetX:e})}get targetY(){return this._viewControls.targetY}set targetY(e){this.updateViewControls({targetY:e})}get targetZ(){return this._viewControls.targetZ}set targetZ(e){this.updateViewControls({targetZ:e})}get trackballX(){return this._viewControls.trackballX}set trackballX(e){this.updateViewControls({trackballX:e})}get trackballY(){return this._viewControls.trackballY}set trackballY(e){this.updateViewControls({trackballY:e})}get targetDiam(){return this._viewControls.targetDiam}set targetDiam(e){this.updateViewControls({targetDiam:e})}get fovy(){return this._viewControls.fovy}set fovy(e){this.updateViewControls({fovy:e})}get depthiness(){return this._viewControls.depthiness}set depthiness(e){this.updateViewControls({depthiness:e})}get inlineView(){return this._viewControls.inlineView}set inlineView(e){this.updateViewControls({inlineView:e})}get capturing(){return this._viewControls.capturing}set capturing(e){this.updateViewControls({capturing:e})}get subpixelMode(){return this._viewControls.subpixelMode}set subpixelMode(e){this.updateViewControls({subpixelMode:e})}get filterMode(){return this._viewControls.filterMode}set filterMode(e){this.updateViewControls({filterMode:e})}get gaussianSigma(){return this._viewControls.gaussianSigma}set gaussianSigma(e){this.updateViewControls({gaussianSigma:e})}get focus(){return this._viewControls.focus}set focus(e){this.updateViewControls({focus:e})}get viewDimming(){return this._viewControls.viewDimming}set viewDimming(e){this.updateViewControls({viewDimming:e})}get filterEnd(){return this._viewControls.filterEnd}set filterEnd(e){this.updateViewControls({filterEnd:e})}get filterSize(){return this._viewControls.filterSize}set filterSize(e){this.updateViewControls({filterSize:e})}get edgeThreshold(){return this._viewControls.edgeThreshold}set edgeThreshold(e){this.updateViewControls({edgeThreshold:e})}get popup(){return this._viewControls.popup}set popup(e){this.updateViewControls({popup:e})}get XRSession(){return this._viewControls.XRSession}set XRSession(e){this.updateViewControls({XRSession:e})}get lkgCanvas(){return this._viewControls.lkgCanvas}set lkgCanvas(e){this.updateViewControls({lkgCanvas:e})}get appCanvas(){return this._viewControls.appCanvas}set appCanvas(e){this.updateViewControls({appCanvas:e})}get columns(){return this._viewControls.columns}set columns(e){this.updateViewControls({columns:e})}get rows(){return this._viewControls.rows}set rows(e){this.updateViewControls({rows:e})}get aspect(){return this._calibration.screenW.value/this._calibration.screenH.value}get tileWidth(){return Math.round(this.framebufferWidth/this.quiltWidth)}get framebufferWidth(){return this.quiltResolution.width}get quiltWidth(){if(this._viewControls.columns!=null)return this._viewControls.columns;const e=this._calibration.serial;switch(!0){case e.startsWith("LKG-2K"):return 5;case e.startsWith("LKG-4K"):return 5;case e.startsWith("LKG-8K"):return 5;case e.startsWith("LKG-P"):return 8;case e.startsWith("LKG-A"):return 5;case e.startsWith("LKG-B"):return 5;case e.startsWith("LKG-D"):return 8;case e.startsWith("LKG-F"):return 8;case e.startsWith("LKG-E"):return 11;case e.startsWith("LKG-H"):return 11;case e.startsWith("LKG-J"):return 7;case e.startsWith("LKG-K"):return 11;case e.startsWith("LKG-L"):return 7;default:return 1}}get quiltHeight(){if(this._viewControls.rows!=null)return this._viewControls.rows;const e=this._calibration.serial;switch(!0){case e.startsWith("LKG-2K"):return 9;case e.startsWith("LKG-4K"):return 9;case e.startsWith("LKG-8K"):return 9;case e.startsWith("LKG-P"):return 6;case e.startsWith("LKG-A"):return 9;case e.startsWith("LKG-B"):return 9;case e.startsWith("LKG-D"):return 9;case e.startsWith("LKG-F"):return 6;case e.startsWith("LKG-E"):return 6;case e.startsWith("LKG-H"):return 6;case e.startsWith("LKG-J"):return 7;case e.startsWith("LKG-K"):return 6;case e.startsWith("LKG-L"):return 7;default:return 1}}get framebufferHeight(){return this.quiltResolution.height}get viewCone(){return this._calibration.viewCone.value*this.depthiness/180*Math.PI}get tilt(){return this._calibration.screenH.value/(this._calibration.screenW.value*this._calibration.slope.value)*(this._calibration.flipImageX.value?-1:1)}get subp(){return 1/(this._calibration.screenW.value*3)*(this._calibration.flipImageX.value?-1:1)}get pitch(){return this._calibration.pitch.value*this._calibration.screenW.value/this._calibration.DPI.value*Math.cos(Math.atan(1/this._calibration.slope.value))}get center(){const e=this._calibration.screenW.value<this._calibration.screenH.value?.5:0,r=this._calibration.flipImageX.value?.5:0;return this._calibration.center.value+e+r}get subpixelCells(){const e=new Float32Array(6*this._calibration.subpixelCells.length);return this._calibration.subpixelCells.forEach((r,s)=>{e[s*6+0]=r.ROffsetX/this.calibration.screenW.value,e[s*6+1]=r.ROffsetY/this.calibration.screenH.value,e[s*6+2]=r.GOffsetX/this.calibration.screenW.value,e[s*6+3]=r.GOffsetY/this.calibration.screenH.value,e[s*6+4]=r.BOffsetX/this.calibration.screenW.value,e[s*6+5]=r.BOffsetY/this.calibration.screenH.value}),e}}let ee=null;function M(){return ee==null&&(ee=new Ce),ee}function ae(t){const i=M();t!=null&&i.updateViewControls(t)}const te=16;function _(t){if(!Number.isFinite(t))return"0.0";const i=t.toPrecision(10);return i.includes(".")||i.includes("e")?i:`${i}.0`}function Y(t){return Number.isFinite(t)?Math.round(t).toString():"0"}function ye(t,i,e){return Math.min(Math.max(t,i),e)}function _e(t){const i=t.numViews,e=Math.floor(t.framebufferWidth/t.quiltWidth),r=Math.floor(t.framebufferHeight/t.quiltHeight),s=t.quiltWidth*e/t.framebufferWidth,o=t.quiltHeight*r/t.framebufferHeight,u=Math.min(t.calibration.subpixelCells.length,te),x=Math.max(u,1),c=ye(Math.round(t.filterMode),0,3),v=Math.floor(i/2);return`#version 300 es
precision highp float;

uniform int u_viewType;
uniform sampler2D u_texture;
in vec2 v_texcoord;
out vec4 color;

const int MAX_SUBPIXEL_CELLS = ${te};
uniform float subpixelData[6 * MAX_SUBPIXEL_CELLS];

const float pitch = ${_(t.pitch)};
const float slope = ${_(t.tilt)};
const float center = ${_(t.center)};
const float subpixelSize = ${_(t.subp)};
const float screenW = ${_(t.calibration.screenW.value)};
const float screenH = ${_(t.calibration.screenH.value)};
const float tileCount = ${_(i)};
const vec2 viewPortion = vec2(${_(s)}, ${_(o)});
const vec4 tile = vec4(${_(t.quiltWidth)}, ${_(t.quiltHeight)}, ${_(i)}, 0.0);
const float focus = ${_(t.focus*t.quiltWidth)};
const int subpixelCellCount = ${Y(u)};
const int safeSubpixelCellCount = ${Y(x)};
const int filter_mode = ${Y(c)};
const int cellPatternType = ${Y(t.subpixelMode)};
const int filter_edge = ${t.viewDimming?1:0};
const float filter_end = ${_(t.filterEnd)};
const float filter_size = ${_(t.filterSize)};
const float gaussian_sigma = ${_(Math.max(t.gaussianSigma,1e-6))};
const float edgeThreshold = ${_(Math.max(t.edgeThreshold,1e-6))};

int GetCellForPixel(vec2 screen_uv)
{
	int xPos = int(screen_uv.x * screenW);
	int yPos = int(screen_uv.y * screenH);
	int cell = 0;

	if(cellPatternType == 1)
	{
		if ((yPos % 2 == 0 && xPos % 2 == 0) || (yPos % 2 != 0 && xPos % 2 != 0)) {
			cell = 0;
		} else {
			cell = 1;
		}
	}
	else if(cellPatternType == 2)
	{
		cell = yPos % 4;
	}
	else if(cellPatternType == 3)
	{
		int offset = (xPos % 2) * 2;
		cell = (yPos + offset) % 4;
	}
	else if(cellPatternType == 4)
	{
		cell = xPos % 2;
	}

	return cell % safeSubpixelCellCount;
}

float GetPixelShift(float val, int subp, int axis, int cell)
{
	int index = cell * 6 + subp * 2 + axis;
	float offset = subpixelData[index];
	return val + offset;
}

vec3 GetSubpixelViews(vec2 screen_uv)
{
	vec3 views = vec3(0.0);

	if(subpixelCellCount <= 0)
	{
		views[0] = screen_uv.x + subpixelSize * 0.0;
		views[1] = screen_uv.x + subpixelSize * 1.0;
		views[2] = screen_uv.x + subpixelSize * 2.0;

		views[0] += screen_uv.y * slope;
		views[1] += screen_uv.y * slope;
		views[2] += screen_uv.y * slope;
	}
	else
	{
		int cell = GetCellForPixel(screen_uv);

		views[0] = GetPixelShift(screen_uv.x, 0, 0, cell);
		views[1] = GetPixelShift(screen_uv.x, 1, 0, cell);
		views[2] = GetPixelShift(screen_uv.x, 2, 0, cell);

		views[0] += GetPixelShift(screen_uv.y, 0, 1, cell) * slope;
		views[1] += GetPixelShift(screen_uv.y, 1, 1, cell) * slope;
		views[2] += GetPixelShift(screen_uv.y, 2, 1, cell) * slope;
	}

	views *= vec3(pitch);
	views -= vec3(center);
	views = vec3(1.0) - fract(views);
	views = clamp(views, vec3(0.00001), vec3(0.999999));

	return views;
}

vec2 GetQuiltCoordinates(vec2 tile_uv, int viewIndex)
{
	float view = clamp(float(viewIndex), 0.0, max(tileCount - 1.0, 0.0));
	float tx = tile.x - 0.00001;
	float tileXIndex = mod(view, tx);
	float tileYIndex = floor(view / tx);

	float quiltCoordU = ((tileXIndex + tile_uv.x) / tx) * viewPortion.x;
	float quiltCoordV = ((tileYIndex + tile_uv.y) / tile.y) * viewPortion.y;
	vec2 quilt_uv = vec2(quiltCoordU, quiltCoordV);

	quilt_uv.y = 1.0 - quilt_uv.y;

	return quilt_uv;
}

vec4 GetViewsColors(vec2 tile_uv, vec3 views)
{
	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

	for(int channel = 0; channel < 3; channel++)
	{
		int viewIndex = int(clamp(views[channel] * tileCount, 0.0, max(tileCount - 1.0, 0.0)));
		float viewDir = views[channel] * 2.0 - 1.0;
		vec2 focused_uv = tile_uv;
		focused_uv.x += viewDir * focus;

		vec2 quilt_uv = GetQuiltCoordinates(focused_uv, viewIndex);
		color[channel] = texture(u_texture, quilt_uv)[channel];
	}

	return color;
}

vec4 OldViewFiltering(vec2 tile_uv, vec3 views)
{
	vec3 viewIndicies = views * tileCount;
	float viewSpaceTileSize = 1.0 / tileCount;
	vec3 leftViews = views;
	vec3 rightViews = leftViews + viewSpaceTileSize;

	vec4 leftColor = GetViewsColors(tile_uv, leftViews);
	vec4 rightColor = GetViewsColors(tile_uv, rightViews);
	vec3 leftRightLerp = viewIndicies - floor(viewIndicies);

	return vec4(
		mix(leftColor.x, rightColor.x, leftRightLerp.x),
		mix(leftColor.y, rightColor.y, leftRightLerp.y),
		mix(leftColor.z, rightColor.z, leftRightLerp.z),
		1.0
	);
}

vec4 GaussianViewFiltering(vec2 tile_uv, vec3 views)
{
	float viewSpaceTileSize = 1.0 / tileCount;
	vec3 centerViews = views;
	vec3 leftViews = centerViews - viewSpaceTileSize;
	vec3 rightViews = centerViews + viewSpaceTileSize;

	vec4 centerColor = GetViewsColors(tile_uv, centerViews);
	vec4 leftColor = GetViewsColors(tile_uv, leftViews);
	vec4 rightColor = GetViewsColors(tile_uv, rightViews);

	vec3 centerSnappedViews = floor(centerViews * tileCount) / tileCount;
	vec3 leftSnappedViews = floor(leftViews * tileCount) / tileCount;
	vec3 rightSnappedViews = floor(rightViews * tileCount) / tileCount;

	float multiplier = 2.0 * gaussian_sigma * gaussian_sigma;
	vec3 centerDiff = views - centerSnappedViews;
	vec3 leftDiff = views - leftSnappedViews;
	vec3 rightDiff = views - rightSnappedViews;

	vec3 centerWeight = exp(-centerDiff * centerDiff / multiplier);
	vec3 leftWeight = exp(-leftDiff * leftDiff / multiplier);
	vec3 rightWeight = exp(-rightDiff * rightDiff / multiplier);
	vec3 totalWeight = centerWeight + leftWeight + rightWeight;

	centerWeight /= totalWeight;
	leftWeight /= totalWeight;
	rightWeight /= totalWeight;

	return vec4(
		centerColor.r * centerWeight.x + leftColor.r * leftWeight.x + rightColor.r * rightWeight.x,
		centerColor.g * centerWeight.y + leftColor.g * leftWeight.y + rightColor.g * rightWeight.y,
		centerColor.b * centerWeight.z + leftColor.b * leftWeight.z + rightColor.b * rightWeight.z,
		1.0
	);
}

vec3 ComputeGaussianWeight(vec3 targetViews, vec3 sampledViews)
{
	float multiplier = 2.0 * gaussian_sigma * gaussian_sigma;
	vec3 diff = targetViews - sampledViews;
	return exp(-diff * diff / multiplier);
}

vec4 NRISViewFiltering(vec2 tile_uv, vec3 views, int n)
{
	float viewSpaceTileSize = 1.0 / tileCount;
	vec4 outputColor = vec4(0.0);
	vec3 totalWeight = vec3(0.0);

	for(int i = -n; i <= n; i++)
	{
		float offset = float(i) * viewSpaceTileSize;
		vec3 offsetViews = views + offset;
		vec4 sampleColor = GetViewsColors(tile_uv, offsetViews);
		vec3 snappedViews = floor(offsetViews * tileCount) / tileCount;
		vec3 weight = ComputeGaussianWeight(views, snappedViews);

		outputColor.rgb += sampleColor.rgb * weight;
		totalWeight += weight;
	}

	outputColor.rgb /= totalWeight;
	outputColor.a = 1.0;

	return outputColor;
}

vec3 ViewDimming(vec3 views)
{
	float fadeStart1 = filter_end;
	float fadeEnd1 = filter_end + filter_size;
	float fullColorEnd = 1.0 - (filter_end + filter_size);
	float fadeEnd2 = 1.0 - filter_end;

	vec3 lowerDim = smoothstep(0.0, fadeStart1, views);
	vec3 fadeDim1 = smoothstep(fadeStart1, fadeEnd1, views);
	vec3 dimValues = mix(vec3(0.0), lowerDim, fadeDim1);

	vec3 upperDim = smoothstep(1.0, fadeEnd2, views);
	vec3 fadeDim2 = smoothstep(fullColorEnd, fadeEnd2, views);
	dimValues = mix(dimValues, upperDim, fadeDim2);

	vec3 fullColorDim = smoothstep(fadeEnd1, fullColorEnd, views);
	dimValues = mix(dimValues, vec3(1.0), fullColorDim);

	return dimValues;
}

float CalculateEdgeFade(vec2 tile_uv)
{
	float fade = min(smoothstep(0.0, edgeThreshold, tile_uv.x),
		smoothstep(0.0, edgeThreshold, 1.0 - tile_uv.x));
	fade *= min(smoothstep(0.0, edgeThreshold, tile_uv.y),
		smoothstep(0.0, edgeThreshold, 1.0 - tile_uv.y));
	return fade;
}

void main()
{
	if (u_viewType == 2) {
		color = texture(u_texture, v_texcoord);
		return;
	}

	if (u_viewType == 1) {
		color = texture(u_texture, GetQuiltCoordinates(v_texcoord, ${v}));
		return;
	}

	vec2 screen_uv = v_texcoord;
	vec2 tile_uv = v_texcoord;
	vec3 views = GetSubpixelViews(screen_uv);
	vec4 outputColor = vec4(0.0, 0.0, 0.0, 1.0);

	if(filter_mode == 0 || tileCount == 1.0)
	{
		outputColor = GetViewsColors(tile_uv, views);
	}
	else if(filter_mode == 1)
	{
		outputColor = OldViewFiltering(tile_uv, views);
	}
	else if(filter_mode == 2)
	{
		outputColor = GaussianViewFiltering(tile_uv, views);
	}
	else if(filter_mode == 3)
	{
		outputColor = NRISViewFiltering(tile_uv, views, 10);
	}

	if (filter_edge == 1)
	{
		outputColor.rgb *= ViewDimming(views);
	}

	float fade = CalculateEdgeFade(tile_uv);
	color = mix(vec4(0.0, 0.0, 0.0, 1.0), outputColor, fade);
}
`}async function xe(){const t=M();let i=2;async function e(){if(t.appCanvas!=null)try{t.capturing=!0,await new Promise(u=>{requestAnimationFrame(u)}),t.appCanvas.width=t.quiltResolution.width,t.appCanvas.height=t.quiltResolution.height;let s=t.appCanvas.toDataURL();const o=document.createElement("a");o.style.display="none",o.href=s,o.download=`hologram_qs${t.quiltWidth}x${t.quiltHeight}a${t.aspect}.png`,document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(s)}catch(s){console.error("Error while capturing canvas data:",s),t.capturing=!1}finally{t.inlineView=i,t.capturing=!1,t.appCanvas.width=t.calibration.screenW.value,t.appCanvas.height=t.calibration.screenH.value}}const r=document.getElementById("screenshotbutton");r&&r.addEventListener("click",()=>{i=t.inlineView;const s=A.getInstance();if(!s){console.warn("LookingGlassXRDevice not initialized");return}t.inlineView=2,s.captureScreenshot=!0,setTimeout(()=>{s.screenshotCallback=e},100)})}function Ee(){var i,e,r,s,o;const t=M();if(t.lkgCanvas==null)console.warn("window placement called without a valid XR Session!");else{let u=function(){let n=d.d-d.a,a=d.w-d.s;n&&a&&(n*=Math.sqrt(.5),a*=Math.sqrt(.5));const l=t.trackballX,h=t.trackballY,m=Math.cos(l)*n-Math.sin(l)*Math.cos(h)*a,R=-Math.sin(h)*a,k=-Math.sin(l)*n-Math.cos(l)*Math.cos(h)*a;t.targetX=t.targetX+m*t.targetDiam*.03,t.targetY=t.targetY+R*t.targetDiam*.03,t.targetZ=t.targetZ+k*t.targetDiam*.03,requestAnimationFrame(u)};const x=document.createElement("style");document.head.appendChild(x),(i=x.sheet)==null||i.insertRule("#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }");const c=document.createElement("div");c.id="LookingGlassWebXRControls",c.style.position="fixed",c.style.zIndex="1000",c.style.padding="15px",c.style.width="320px",c.style.maxWidth="calc(100vw - 18px)",c.style.maxHeight="calc(100vh - 18px)",c.style.whiteSpace="nowrap",c.style.background="rgba(0, 0, 0, 0.6)",c.style.color="white",c.style.borderRadius="10px",c.style.right="15px",c.style.bottom="15px",c.style.flex="row";const v=document.createElement("div");c.appendChild(v),v.style.width="100%",v.style.textAlign="center",v.style.fontWeight="bold",v.style.marginBottom="8px",v.innerText="Looking Glass Controls";const f=document.createElement("button");f.style.display="block",f.style.margin="auto",f.style.width="100%",f.style.height="35px",f.style.padding="4px",f.style.marginBottom="8px",f.style.borderRadius="8px",f.id="screenshotbutton",c.appendChild(f),f.innerText="Save Hologram",t.quiltResolution.height*t.quiltResolution.width>33177600?(f.style.backgroundColor="#ccc",f.style.color="#999",f.style.cursor="not-allowed",f.title="Button is disabled because the quilt resolution is too large."):(f.style.backgroundColor="",f.style.color="",f.style.cursor="",f.title="");const C=document.createElement("button");C.style.display="block",C.style.margin="auto",C.style.width="100%",C.style.height="35px",C.style.padding="4px",C.style.marginBottom="8px",C.style.borderRadius="8px",C.id="copybutton",c.appendChild(C),C.innerText="Copy Config",C.addEventListener("click",()=>{Le(t)});const E=document.createElement("div");c.appendChild(E),E.style.width="290px",E.style.whiteSpace="normal",E.style.color="rgba(255,255,255,0.7)",E.style.fontSize="14px",E.style.margin="5px 0",E.innerHTML="Click the popup and use WASD, mouse left/right drag, and scroll.";const P=document.createElement("div");c.appendChild(P);const T=(n,a,l)=>{const h=l.stringify,m=document.createElement("div");m.style.marginBottom="8px",P.appendChild(m);const R=n,k=t[n],L=document.createElement("label");m.appendChild(L),L.innerText=l.label,L.setAttribute("for",R),L.style.width="100px",L.style.display="inline-block",L.style.textDecoration="dotted underline 1px",L.style.fontFamily='"Courier New"',L.style.fontSize="13px",L.style.fontWeight="bold",L.title=l.title;const b=document.createElement("input");m.appendChild(b),Object.assign(b,a),b.id=R,b.title=l.title,b.value=a.value!==void 0?a.value:k;const $=y=>{t[n]=y,K(y)};b.oninput=()=>{const y=a.type==="range"?parseFloat(b.value):a.type==="checkbox"?b.checked:b.value;$(y)};const j=y=>{let p=y(t[n]);l.fixRange&&(p=l.fixRange(p),b.max=Math.max(parseFloat(b.max),p).toString(),b.min=Math.min(parseFloat(b.min),p).toString()),b.value=p,$(p)};a.type==="range"&&(b.style.width="110px",b.style.height="8px",b.onwheel=y=>{j(p=>p+Math.sign(y.deltaX-y.deltaY)*a.step)});let K=y=>{};if(h){const y=document.createElement("span");y.style.fontFamily='"Courier New"',y.style.fontSize="13px",y.style.marginLeft="3px",m.appendChild(y),K=p=>{y.innerHTML=h(p)},K(k)}return j};T("fovy",{type:"range",min:1/180*Math.PI,max:120.1/180*Math.PI,step:1/180*Math.PI},{label:"fov",title:"perspective fov (degrades stereo effect)",fixRange:n=>Math.max(1/180*Math.PI,Math.min(n,120.1/180*Math.PI)),stringify:n=>{const a=n/Math.PI*180,l=Math.atan(Math.tan(n/2)*t.aspect)*2/Math.PI*180;return`${a.toFixed()}&deg;&times;${l.toFixed()}&deg;`}}),T("depthiness",{type:"range",min:0,max:2,step:.01},{label:"depthiness",title:"exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov.",fixRange:n=>Math.max(0,n),stringify:n=>`${n.toFixed(2)}x`}),T("inlineView",{type:"range",min:0,max:2,step:1},{label:"inline view",title:"what to show inline on the original canvas (swizzled = no overwrite)",fixRange:n=>Math.max(0,Math.min(n,2)),stringify:n=>n===0?"swizzled":n===1?"center":n===2?"quilt":"?"}),T("filterMode",{type:"range",min:0,max:3,step:1},{label:"view filtering mode",title:"controls the method used for view blending",fixRange:n=>Math.max(0,Math.min(n,3)),stringify:n=>n===0?"old, studio style":n===1?"2 view":n===2?"gaussian":n===3?"10 view gaussian":"?"}),T("gaussianSigma",{type:"range",min:-1,max:1,step:.01},{label:"gaussian sigma",title:"control view blending",fixRange:n=>Math.max(-1,Math.min(n,1)),stringify:n=>n}),t.lkgCanvas.oncontextmenu=n=>{n.preventDefault()},t.lkgCanvas.addEventListener("wheel",n=>{const a=t.targetDiam,l=1.1,h=Math.log(a)/Math.log(l);return t.targetDiam=Math.pow(l,h+n.deltaY*.01)},{passive:!1}),t.lkgCanvas.addEventListener("mousemove",n=>{const a=n.movementX,l=-n.movementY;if(n.buttons&2||n.buttons&1&&(n.shiftKey||n.ctrlKey)){const h=t.trackballX,m=t.trackballY,R=-Math.cos(h)*a+Math.sin(h)*Math.sin(m)*l,k=-Math.cos(m)*l,L=Math.sin(h)*a+Math.cos(h)*Math.sin(m)*l;t.targetX=t.targetX+R*t.targetDiam*.001,t.targetY=t.targetY+k*t.targetDiam*.001,t.targetZ=t.targetZ+L*t.targetDiam*.001}else n.buttons&1&&(t.trackballX=t.trackballX-a*.01,t.trackballY=t.trackballY-l*.01)});const d={w:0,a:0,s:0,d:0};return t.lkgCanvas.addEventListener("keydown",n=>{switch(n.code){case"KeyW":d.w=1;break;case"KeyA":d.a=1;break;case"KeyS":d.s=1;break;case"KeyD":d.d=1;break}}),t.lkgCanvas.addEventListener("keyup",n=>{switch(n.code){case"KeyW":d.w=0;break;case"KeyA":d.a=0;break;case"KeyS":d.s=0;break;case"KeyD":d.d=0;break}}),(e=t.appCanvas)==null||e.addEventListener("wheel",n=>{const a=t.targetDiam,l=1.1,h=Math.log(a)/Math.log(l);return t.targetDiam=Math.pow(l,h+n.deltaY*.01)},{passive:!1}),(r=t.appCanvas)==null||r.addEventListener("mousemove",n=>{const a=n.movementX,l=-n.movementY;if(n.buttons&2||n.buttons&1&&(n.shiftKey||n.ctrlKey)){const h=t.trackballX,m=t.trackballY,R=-Math.cos(h)*a+Math.sin(h)*Math.sin(m)*l,k=-Math.cos(m)*l,L=Math.sin(h)*a+Math.cos(h)*Math.sin(m)*l;t.targetX=t.targetX+R*t.targetDiam*.001,t.targetY=t.targetY+k*t.targetDiam*.001,t.targetZ=t.targetZ+L*t.targetDiam*.001}else n.buttons&1&&(t.trackballX=t.trackballX-a*.01,t.trackballY=t.trackballY-l*.01)}),(s=t.appCanvas)==null||s.addEventListener("keydown",n=>{switch(n.code){case"KeyW":d.w=1;break;case"KeyA":d.a=1;break;case"KeyS":d.s=1;break;case"KeyD":d.d=1;break}}),(o=t.appCanvas)==null||o.addEventListener("keyup",n=>{switch(n.code){case"KeyW":d.w=0;break;case"KeyA":d.a=0;break;case"KeyS":d.s=0;break;case"KeyD":d.d=0;break}}),requestAnimationFrame(u),setTimeout(()=>{xe()},1e3),c}}function Le(t){const i={targetX:t.targetX,targetY:t.targetY,targetZ:t.targetZ,fovy:`${Math.round(t.fovy/Math.PI*180)} * Math.PI / 180`,targetDiam:t.targetDiam,trackballX:t.trackballX,trackballY:t.trackballY,depthiness:t.depthiness};let e=JSON.stringify(i,null,4).replace(/"/g,"").replace(/{/g,"").replace(/}/g,"");navigator.clipboard.writeText(e)}let z;const Re=(t,i)=>{const e=M();if(e.lkgCanvas==null){console.warn("window placement called without a valid XR Session!");return}else t==!1?Te(e,z):(z==null&&(z=Ee()),e.lkgCanvas.style.position="fixed",e.lkgCanvas.style.bottom="0",e.lkgCanvas.style.left="0",e.lkgCanvas.width=e.calibration.screenW.value,e.lkgCanvas.height=e.calibration.screenH.value,document.body.appendChild(z),"getScreenDetails"in window?Se(e.lkgCanvas,e,i):oe(e,e.lkgCanvas,i))};async function Se(t,i,e){const s=(await window.getScreenDetails()).screens.filter(o=>o.label.includes("LKG"))[0];if(s===void 0){console.log("no Looking Glass monitor detected - manually opening popup window"),oe(i,t,e);return}else{const o=[`left=${s.left}`,`top=${s.top}`,`width=${s.width}`,`height=${s.height}`,"menubar=no","toolbar=no","location=no","status=no","resizable=yes","scrollbars=no","fullscreenEnabled=true"].join(",");i.popup=window.open("","new",o),i.popup&&(i.popup.document.body.style.background="black",i.popup.document.body.style.transform="1.0",le(i),i.popup.document.body.appendChild(t),console.assert(e),i.popup.onbeforeunload=e)}}function oe(t,i,e){t.popup=window.open("",void 0,"width=640,height=360"),t.popup&&(t.popup.document.title="Looking Glass Window (fullscreen me on Looking Glass!)",t.popup.document.body.style.background="black",t.popup.document.body.style.transform="1.0",le(t),t.popup.document.body.appendChild(i),console.assert(e),t.popup.onbeforeunload=e)}function Te(t,i){var e;(e=i.parentElement)==null||e.removeChild(i),t.popup&&(t.popup.onbeforeunload=null,t.popup.close(),t.popup=null)}function le(t){t.popup&&t.popup.document.addEventListener("keydown",i=>{i.ctrlKey&&(i.key==="="||i.key==="-"||i.key==="+")&&i.preventDefault()})}const W=Symbol("LookingGlassXRWebGLLayer");class Pe extends ge.default{constructor(i,e,r){super(i,e,r);const s=M();s.appCanvas=e.canvas,s.lkgCanvas=document.createElement("canvas"),s.lkgCanvas.tabIndex=0;const o=s.lkgCanvas.getContext("2d",{alpha:!1});s.lkgCanvas.addEventListener("dblclick",function(){this.requestFullscreen()});const u=this[ne.PRIVATE].config,x=e.createTexture();let c,v;const f=e.createFramebuffer(),G=e.enable.bind(e),C=e.disable.bind(e),E=e.getExtension("OES_vertex_array_object"),P=34229,T=E?E.bindVertexArrayOES.bind(E):e.bindVertexArray.bind(e),d=()=>{const V=e.getParameter(e.TEXTURE_BINDING_2D);if(e.bindTexture(e.TEXTURE_2D,x),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,s.framebufferWidth,s.framebufferHeight,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_BASE_LEVEL,0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAX_LEVEL,0),e.bindTexture(e.TEXTURE_2D,V),c){const I=e.getParameter(e.RENDERBUFFER_BINDING);e.bindRenderbuffer(e.RENDERBUFFER,c),e.renderbufferStorage(e.RENDERBUFFER,v.format,s.framebufferWidth,s.framebufferHeight),e.bindRenderbuffer(e.RENDERBUFFER,I)}};(u.depth||u.stencil)&&(u.depth&&u.stencil?v={format:e.DEPTH_STENCIL,attachment:e.DEPTH_STENCIL_ATTACHMENT}:u.depth?v={format:e.DEPTH_COMPONENT16,attachment:e.DEPTH_ATTACHMENT}:u.stencil&&(v={format:e.STENCIL_INDEX8,attachment:e.STENCIL_ATTACHMENT}),c=e.createRenderbuffer()),d(),s.addEventListener("on-config-changed",d);const n=e.getParameter(e.FRAMEBUFFER_BINDING);e.bindFramebuffer(e.FRAMEBUFFER,f),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,x,0),(u.depth||u.stencil)&&e.framebufferRenderbuffer(e.FRAMEBUFFER,v.attachment,e.RENDERBUFFER,c),e.bindFramebuffer(e.FRAMEBUFFER,n);const a=e.createProgram();if(!a)return;const l=e.createShader(e.VERTEX_SHADER);if(!l)return;e.attachShader(a,l);const h=e.createShader(e.FRAGMENT_SHADER);if(!h)return;e.attachShader(a,h);{const V=`#version 300 es
			layout(location = 0) in vec2 a_position;
			out vec2 v_texcoord;
			void main() {
			  gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
			  v_texcoord = a_position;
			}
		  `;e.shaderSource(l,V),e.compileShader(l),e.getShaderParameter(l,e.COMPILE_STATUS)||console.warn(e.getShaderInfoLog(l))}let m,R=0,k;const L=()=>{const V=_e(s);if(V===m||(m=V,!h))return;if(e.shaderSource(h,V),e.compileShader(h),!e.getShaderParameter(h,e.COMPILE_STATUS)){console.warn(e.getShaderInfoLog(h));return}if(!a)return;if(e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){console.warn(e.getProgramInfoLog(a));return}R=e.getAttribLocation(a,"a_position"),k=e.getUniformLocation(a,"u_viewType");const I=e.getUniformLocation(a,"u_texture"),H=e.getUniformLocation(a,"subpixelData"),q=s.subpixelCells,O=te*6,Z=new Float32Array(O);Z.set(q.length>O?q.slice(0,O):q);const se=e.getParameter(e.CURRENT_PROGRAM);e.useProgram(a),e.uniform1i(I,0),e.uniform1fv(H,Z),e.useProgram(se)};s.addEventListener("on-config-changed",L),L();const b=E?E.createVertexArrayOES():e.createVertexArray(),$=e.createBuffer(),j=e.getParameter(e.ARRAY_BUFFER_BINDING),K=e.getParameter(P);T(b),e.bindBuffer(e.ARRAY_BUFFER,$),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(R),e.vertexAttribPointer(R,2,e.FLOAT,!1,0,0),T(K),e.bindBuffer(e.ARRAY_BUFFER,j);const y=()=>{console.assert(this[W].LookingGlassEnabled),e.bindFramebuffer(e.FRAMEBUFFER,f);const V=e.getParameter(e.COLOR_CLEAR_VALUE),I=e.getParameter(e.DEPTH_CLEAR_VALUE),H=e.getParameter(e.STENCIL_CLEAR_VALUE);e.clearColor(0,0,0,0),e.clearDepth(1),e.clearStencil(0),e.clear(e.DEPTH_BUFFER_BIT|e.COLOR_BUFFER_BIT|e.STENCIL_BUFFER_BIT),e.clearColor(V[0],V[1],V[2],V[3]),e.clearDepth(I),e.clearStencil(H)},p=e.canvas;let N,U;const Fe=()=>{if(!this[W].LookingGlassEnabled)return;(p.width!==s.calibration.screenW.value||p.height!==s.calibration.screenH.value)&&s.capturing===!1?(N=p.width,U=p.height,p.width=s.calibration.screenW.value,p.height=s.calibration.screenH.value):s.capturing===!0&&(N=p.width,U=p.height,p.width=s.framebufferWidth,p.height=s.framebufferHeight);const V=e.getParameter(P),I=e.getParameter(e.CULL_FACE),H=e.getParameter(e.BLEND),q=e.getParameter(e.DEPTH_TEST),O=e.getParameter(e.STENCIL_TEST),Z=e.getParameter(e.SCISSOR_TEST),se=e.getParameter(e.VIEWPORT),Ie=e.getParameter(e.FRAMEBUFFER_BINDING),Xe=e.getParameter(e.RENDERBUFFER_BINDING),Ae=e.getParameter(e.CURRENT_PROGRAM),Be=e.getParameter(e.ACTIVE_TEXTURE);{const Ke=e.getParameter(e.TEXTURE_BINDING_2D);e.bindFramebuffer(e.FRAMEBUFFER,null),e.useProgram(a),T(b),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,x),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.uniform1i(k,0),e.drawArrays(e.TRIANGLES,0,6),o==null||o.clearRect(0,0,s.calibration.screenW.value,s.calibration.screenH.value),o==null||o.drawImage(p,0,0),s.inlineView!==0&&(e.uniform1i(k,s.inlineView),e.drawArrays(e.TRIANGLES,0,6)),e.bindTexture(e.TEXTURE_2D,Ke)}e.activeTexture(Be),e.useProgram(Ae),e.bindRenderbuffer(e.RENDERBUFFER,Xe),e.bindFramebuffer(e.FRAMEBUFFER,Ie),e.viewport(...se),(Z?G:C)(e.SCISSOR_TEST),(O?G:C)(e.STENCIL_TEST),(q?G:C)(e.DEPTH_TEST),(H?G:C)(e.BLEND),(I?G:C)(e.CULL_FACE),T(V)};this[W]={LookingGlassEnabled:!1,framebuffer:f,clearFramebuffer:y,blitTextureToDefaultFramebufferIfNeeded:Fe,moveCanvasToWindow:Re,restoreOriginalCanvasDimensions:()=>{N&&U&&(p.width=N,p.height=U,N=U=void 0)}}}get framebuffer(){return this[W].LookingGlassEnabled?this[W].framebuffer:null}get framebufferWidth(){return M().framebufferWidth}get framebufferHeight(){return M().framebufferHeight}}const B=class extends we.default{constructor(i){super(i),this.sessions=new Map,this.viewSpaces=[],this.basePoseMatrix=g.mat4.create(),this.inlineProjectionMatrix=g.mat4.create(),this.inlineInverseViewMatrix=g.mat4.create(),this.LookingGlassProjectionMatrices=[],this.LookingGlassInverseViewMatrices=[],this.captureScreenshot=!1,this.screenshotCallback=null,B.instance||(B.instance=this)}static getInstance(){return B.instance}onBaseLayerSet(i,e){const r=this.sessions.get(i);r.baseLayer=e;const s=M(),o=e[W];o.LookingGlassEnabled=r.immersive,r.immersive&&(s.XRSession=this.sessions.get(i),s.popup==null?o.moveCanvasToWindow(!0,()=>{this.endSession(i)}):console.warn("attempted to assign baselayer twice?"))}isSessionSupported(i){return i==="inline"||i==="immersive-vr"}isFeatureSupported(i){switch(i){case"viewer":return!0;case"local":return!0;case"local-floor":return!0;case"bounded-floor":return!1;case"unbounded":return!1;default:return console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:",i),!1}}async requestSession(i,e){if(!this.isSessionSupported(i))return Promise.reject();const r=i!=="inline",s=new Ve(i,e),o=M();return this.sessions.set(s.id,s),r&&(this.dispatchEvent("@@webxr-polyfill/vr-present-start",s.id),window.addEventListener("unload",()=>{o.popup&&o.popup.close(),o.popup=null})),Promise.resolve(s.id)}requestAnimationFrame(i){return this.global.requestAnimationFrame(i)}cancelAnimationFrame(i){this.global.cancelAnimationFrame(i)}onFrameStart(i,e){const r=this.sessions.get(i),s=M();if(r.immersive){const o=Math.tan(.5*s.fovy),u=.5*s.targetDiam/o,x=u-s.targetDiam,c=this.basePoseMatrix;g.mat4.fromTranslation(c,[s.targetX,s.targetY,s.targetZ]),g.mat4.rotate(c,c,s.trackballX,[0,1,0]),g.mat4.rotate(c,c,-s.trackballY,[1,0,0]),g.mat4.translate(c,c,[0,0,u]);for(let v=0;v<s.numViews;++v){const f=(v+.5)/s.numViews-.5,G=Math.tan(s.viewCone*f),C=u*G,E=this.LookingGlassInverseViewMatrices[v]=this.LookingGlassInverseViewMatrices[v]||g.mat4.create();g.mat4.translate(E,c,[C,0,0]),g.mat4.invert(E,E);const P=Math.max(x+e.depthNear,.01),T=x+e.depthFar,d=P*o,n=d,a=-d,l=P*-G,h=s.aspect*d,m=l+h,R=l-h,k=this.LookingGlassProjectionMatrices[v]=this.LookingGlassProjectionMatrices[v]||g.mat4.create();g.mat4.set(k,2*P/(m-R),0,0,0,0,2*P/(n-a),0,0,(m+R)/(m-R),(n+a)/(n-a),-(T+P)/(T-P),-1,0,0,-2*T*P/(T-P),0)}}else{const o=r.baseLayer.context,u=o.drawingBufferWidth/o.drawingBufferHeight;g.mat4.perspective(this.inlineProjectionMatrix,e.inlineVerticalFieldOfView,u,e.depthNear,e.depthFar),g.mat4.fromTranslation(this.basePoseMatrix,[0,Q,0]),g.mat4.invert(this.inlineInverseViewMatrix,this.basePoseMatrix),r.baseLayer[W].clearFramebuffer()}}onFrameEnd(i){this.sessions.get(i).baseLayer[W].blitTextureToDefaultFramebufferIfNeeded(),this.captureScreenshot&&this.screenshotCallback&&(this.screenshotCallback(),this.captureScreenshot=!1)}async requestFrameOfReferenceTransform(i,e){const r=g.mat4.create();switch(i){case"viewer":case"local":return g.mat4.fromTranslation(r,[0,-Q,0]),r;case"local-floor":return r;default:throw new Error("XRReferenceSpaceType not understood")}}endSession(i){const e=this.sessions.get(i);e.immersive&&e.baseLayer&&(e.baseLayer[W].moveCanvasToWindow(!1),e.baseLayer[W].LookingGlassEnabled=!1,e.baseLayer[W].restoreOriginalCanvasDimensions(),this.dispatchEvent("@@webxr-polyfill/vr-present-end",i)),e.ended=!0}doesSessionSupportReferenceSpace(i,e){const r=this.sessions.get(i);return r.ended?!1:r.enabledFeatures.has(e)}getViewSpaces(i){if(i==="immersive-vr"){const e=M();for(let r=this.viewSpaces.length;r<e.numViews;++r)this.viewSpaces[r]=new De(r);return this.viewSpaces.length=e.numViews,this.viewSpaces}}getViewport(i,e,r,s,o){if(o===void 0){const x=this.sessions.get(i).baseLayer.context;s.x=0,s.y=0,s.width=x.drawingBufferWidth,s.height=x.drawingBufferHeight}else{const u=M(),x=o%u.quiltWidth,c=Math.floor(o/u.quiltWidth);s.x=u.framebufferWidth/u.quiltWidth*x,s.y=u.framebufferHeight/u.quiltHeight*c,s.width=u.framebufferWidth/u.quiltWidth,s.height=u.framebufferHeight/u.quiltHeight}return!0}getProjectionMatrix(i,e){return e===void 0?this.inlineProjectionMatrix:this.LookingGlassProjectionMatrices[e]||g.mat4.create()}getBasePoseMatrix(){return this.basePoseMatrix}getBaseViewMatrix(){return this.inlineInverseViewMatrix}_getViewMatrixByIndex(i){return this.LookingGlassInverseViewMatrices[i]=this.LookingGlassInverseViewMatrices[i]||g.mat4.create()}getInputSources(){return[]}getInputPose(i,e,r){return null}onWindowResize(){}};let A=B;S(A,"instance",null);let ke=0;class Ve{constructor(i,e){S(this,"mode");S(this,"immersive");S(this,"id");S(this,"baseLayer");S(this,"inlineVerticalFieldOfView");S(this,"ended");S(this,"enabledFeatures");this.mode=i,this.immersive=i==="immersive-vr"||i==="immersive-ar",this.id=++ke,this.baseLayer=null,this.inlineVerticalFieldOfView=Math.PI*.5,this.ended=!1,this.enabledFeatures=e}}class De extends be.default{constructor(e){super();S(this,"viewIndex");this.viewIndex=e}get eye(){return"none"}_onPoseUpdate(e){this._inverseBaseMatrix=e._getViewMatrixByIndex(this.viewIndex)}}class ie extends ve.default{constructor(e){super();S(this,"vrButton");S(this,"device");S(this,"isPresenting",!1);ae(e),this.loadPolyfill()}static async init(e){new ie(e)}async loadPolyfill(){this.overrideDefaultVRButton(),console.warn('Looking Glass WebXR "polyfill" overriding native WebXR API.');for(const e in re.default)this.global[e]=re.default[e];this.global.XRWebGLLayer=Pe,this.injected=!0,this.device=new A(this.global),this.xr=new pe.default(Promise.resolve(this.device)),Object.defineProperty(this.global.navigator,"xr",{value:this.xr,configurable:!0})}async overrideDefaultVRButton(){this.vrButton=await Me("VRButton"),this.vrButton&&this.device?(this.device.addEventListener("@@webxr-polyfill/vr-present-start",()=>{this.isPresenting=!0,this.updateVRButtonUI()}),this.device.addEventListener("@@webxr-polyfill/vr-present-end",()=>{this.isPresenting=!1,this.updateVRButtonUI()}),this.vrButton.addEventListener("click",e=>{this.updateVRButtonUI()}),this.updateVRButtonUI()):console.warn("Unable to find VRButton")}async updateVRButtonUI(){if(this.vrButton){await We(100),this.isPresenting?this.vrButton.innerHTML="EXIT LOOKING GLASS":this.vrButton.innerHTML="ENTER LOOKING GLASS";const e=220;this.vrButton.style.width=`${e}px`,this.vrButton.style.left=`calc(50% - ${e/2}px)`}}update(e){ae(e)}}async function Me(t){return new Promise(i=>{const e=new MutationObserver(function(r){r.forEach(function(s){s.addedNodes.forEach(function(o){const u=o;u.id===t&&(i(u),e.disconnect())})})});e.observe(document.body,{subtree:!1,childList:!0}),setTimeout(()=>{e.disconnect(),i(null)},5e3)})}function We(t){return new Promise(i=>setTimeout(i,t))}const Ge=M();w.LookingGlassConfig=Ge,w.LookingGlassWebXRPolyfill=ie,Object.defineProperties(w,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
