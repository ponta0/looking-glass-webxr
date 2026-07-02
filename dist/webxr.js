var ue = Object.defineProperty;
var he = (t, i, e) => i in t ? ue(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var S = (t, i, e) => (he(t, typeof i != "symbol" ? i + "" : i, e), e);
import J from "@lookingglass/webxr-polyfill/src/api/index";
import de from "@lookingglass/webxr-polyfill/src/api/XRSystem";
import fe from "@lookingglass/webxr-polyfill/src/WebXRPolyfill";
import * as pe from "holoplay-core";
import ve from "@lookingglass/webxr-polyfill/src/devices/XRDevice";
import me from "@lookingglass/webxr-polyfill/src/api/XRSpace";
import { mat4 as g } from "gl-matrix";
import we, { PRIVATE as be } from "@lookingglass/webxr-polyfill/src/api/XRWebGLLayer";
const j = 1.6;
var Z;
(function(t) {
  t[t.Swizzled = 0] = "Swizzled", t[t.Center = 1] = "Center", t[t.Quilt = 2] = "Quilt";
})(Z || (Z = {}));
class ge extends EventTarget {
  constructor(e) {
    super();
    S(this, "_calibration", {
      configVersion: "1.0",
      pitch: { value: 45 },
      slope: { value: -5 },
      center: { value: -0.5 },
      viewCone: { value: 40 },
      invView: { value: 1 },
      verticalAngle: { value: 0 },
      DPI: { value: 338 },
      screenW: { value: 3840 },
      screenH: { value: 2160 },
      flipImageX: { value: 0 },
      flipImageY: { value: 0 },
      flipSubp: { value: 0 },
      serial: "",
      subpixelCells: [],
      CellPatternMode: { value: 0 }
    });
    S(this, "_viewControls", {
      tileHeight: 512,
      numViews: 48,
      trackballX: 0,
      trackballY: 0,
      targetX: 0,
      targetY: j,
      targetZ: -0.5,
      targetDiam: 2,
      fovy: 14 / 180 * Math.PI,
      depthiness: 1.25,
      inlineView: Z.Center,
      capturing: !1,
      quiltResolution: null,
      columns: null,
      rows: null,
      popup: null,
      XRSession: null,
      lkgCanvas: null,
      appCanvas: null,
      subpixelMode: 0,
      filterMode: 2,
      gaussianSigma: 0.01,
      focus: 0,
      viewDimming: !1,
      filterEnd: 0.05,
      filterSize: 0.15,
      edgeThreshold: 0.01
    });
    S(this, "LookingGlassDetected");
    this._viewControls = { ...this._viewControls, ...e }, this.syncCalibration();
  }
  syncCalibration() {
    new pe.Client((e) => {
      if (e.devices.length < 1) {
        console.log("No Looking Glass devices found");
        return;
      }
      e.devices.length > 1 && console.log("More than one Looking Glass device found... using the first one"), this.calibration = e.devices[0].calibration;
    });
  }
  addEventListener(e, n, s) {
    super.addEventListener(e, n, s);
  }
  onConfigChange() {
    this.dispatchEvent(new Event("on-config-changed"));
  }
  get calibration() {
    return this._calibration;
  }
  set calibration(e) {
    var s;
    this._calibration = {
      ...this._calibration,
      ...e
    };
    const n = (s = this._calibration.CellPatternMode) == null ? void 0 : s.value;
    typeof n == "number" && Number.isFinite(n) && (this._viewControls.subpixelMode = Math.round(n)), this.onConfigChange();
  }
  updateViewControls(e) {
    e != null && (this._viewControls = {
      ...this._viewControls,
      ...e
    }, this.onConfigChange());
  }
  get tileHeight() {
    return Math.round(this.framebufferHeight / this.quiltHeight);
  }
  get quiltResolution() {
    if (this._viewControls.quiltResolution != null)
      return { width: this._viewControls.quiltResolution.width, height: this._viewControls.quiltResolution.height };
    {
      const e = this._calibration.serial;
      switch (!0) {
        case e.startsWith("LKG-2K"):
          return { width: 4096, height: 4096 };
        case e.startsWith("LKG-4K"):
          return { width: 4096, height: 4096 };
        case e.startsWith("LKG-8K"):
          return { width: 8192, height: 8192 };
        case e.startsWith("LKG-P"):
          return { width: 3360, height: 3360 };
        case e.startsWith("LKG-A"):
          return { width: 4096, height: 4096 };
        case e.startsWith("LKG-B"):
          return { width: 8192, height: 8192 };
        case e.startsWith("LKG-D"):
          return { width: 8192, height: 8192 };
        case e.startsWith("LKG-F"):
          return { width: 3360, height: 3360 };
        case e.startsWith("LKG-E"):
          return { width: 4092, height: 4092 };
        case e.startsWith("LKG-H"):
          return { width: 5995, height: 6e3 };
        case e.startsWith("LKG-J"):
          return { width: 5999, height: 5999 };
        case e.startsWith("LKG-K"):
          return { width: 8184, height: 8184 };
        case e.startsWith("LKG-L"):
          return { width: 8190, height: 8190 };
        default:
          return { width: 4096, height: 4096 };
      }
    }
  }
  set quiltResolution(e) {
    this.updateViewControls({ quiltResolution: e });
  }
  get numViews() {
    return this.quiltWidth * this.quiltHeight;
  }
  get targetX() {
    return this._viewControls.targetX;
  }
  set targetX(e) {
    this.updateViewControls({ targetX: e });
  }
  get targetY() {
    return this._viewControls.targetY;
  }
  set targetY(e) {
    this.updateViewControls({ targetY: e });
  }
  get targetZ() {
    return this._viewControls.targetZ;
  }
  set targetZ(e) {
    this.updateViewControls({ targetZ: e });
  }
  get trackballX() {
    return this._viewControls.trackballX;
  }
  set trackballX(e) {
    this.updateViewControls({ trackballX: e });
  }
  get trackballY() {
    return this._viewControls.trackballY;
  }
  set trackballY(e) {
    this.updateViewControls({ trackballY: e });
  }
  get targetDiam() {
    return this._viewControls.targetDiam;
  }
  set targetDiam(e) {
    this.updateViewControls({ targetDiam: e });
  }
  get fovy() {
    return this._viewControls.fovy;
  }
  set fovy(e) {
    this.updateViewControls({ fovy: e });
  }
  get depthiness() {
    return this._viewControls.depthiness;
  }
  set depthiness(e) {
    this.updateViewControls({ depthiness: e });
  }
  get inlineView() {
    return this._viewControls.inlineView;
  }
  set inlineView(e) {
    this.updateViewControls({ inlineView: e });
  }
  get capturing() {
    return this._viewControls.capturing;
  }
  set capturing(e) {
    this.updateViewControls({ capturing: e });
  }
  get subpixelMode() {
    return this._viewControls.subpixelMode;
  }
  set subpixelMode(e) {
    this.updateViewControls({ subpixelMode: e });
  }
  get filterMode() {
    return this._viewControls.filterMode;
  }
  set filterMode(e) {
    this.updateViewControls({ filterMode: e });
  }
  get gaussianSigma() {
    return this._viewControls.gaussianSigma;
  }
  set gaussianSigma(e) {
    this.updateViewControls({ gaussianSigma: e });
  }
  get focus() {
    return this._viewControls.focus;
  }
  set focus(e) {
    this.updateViewControls({ focus: e });
  }
  get viewDimming() {
    return this._viewControls.viewDimming;
  }
  set viewDimming(e) {
    this.updateViewControls({ viewDimming: e });
  }
  get filterEnd() {
    return this._viewControls.filterEnd;
  }
  set filterEnd(e) {
    this.updateViewControls({ filterEnd: e });
  }
  get filterSize() {
    return this._viewControls.filterSize;
  }
  set filterSize(e) {
    this.updateViewControls({ filterSize: e });
  }
  get edgeThreshold() {
    return this._viewControls.edgeThreshold;
  }
  set edgeThreshold(e) {
    this.updateViewControls({ edgeThreshold: e });
  }
  get popup() {
    return this._viewControls.popup;
  }
  set popup(e) {
    this.updateViewControls({ popup: e });
  }
  get XRSession() {
    return this._viewControls.XRSession;
  }
  set XRSession(e) {
    this.updateViewControls({ XRSession: e });
  }
  get lkgCanvas() {
    return this._viewControls.lkgCanvas;
  }
  set lkgCanvas(e) {
    this.updateViewControls({ lkgCanvas: e });
  }
  get appCanvas() {
    return this._viewControls.appCanvas;
  }
  set appCanvas(e) {
    this.updateViewControls({ appCanvas: e });
  }
  get columns() {
    return this._viewControls.columns;
  }
  set columns(e) {
    this.updateViewControls({ columns: e });
  }
  get rows() {
    return this._viewControls.rows;
  }
  set rows(e) {
    this.updateViewControls({ rows: e });
  }
  get aspect() {
    return this._calibration.screenW.value / this._calibration.screenH.value;
  }
  get tileWidth() {
    return Math.round(this.framebufferWidth / this.quiltWidth);
  }
  get framebufferWidth() {
    return this.quiltResolution.width;
  }
  get quiltWidth() {
    if (this._viewControls.columns != null)
      return this._viewControls.columns;
    const e = this._calibration.serial;
    switch (!0) {
      case e.startsWith("LKG-2K"):
        return 5;
      case e.startsWith("LKG-4K"):
        return 5;
      case e.startsWith("LKG-8K"):
        return 5;
      case e.startsWith("LKG-P"):
        return 8;
      case e.startsWith("LKG-A"):
        return 5;
      case e.startsWith("LKG-B"):
        return 5;
      case e.startsWith("LKG-D"):
        return 8;
      case e.startsWith("LKG-F"):
        return 8;
      case e.startsWith("LKG-E"):
        return 11;
      case e.startsWith("LKG-H"):
        return 11;
      case e.startsWith("LKG-J"):
        return 7;
      case e.startsWith("LKG-K"):
        return 11;
      case e.startsWith("LKG-L"):
        return 7;
      default:
        return 1;
    }
  }
  get quiltHeight() {
    if (this._viewControls.rows != null)
      return this._viewControls.rows;
    const e = this._calibration.serial;
    switch (!0) {
      case e.startsWith("LKG-2K"):
        return 9;
      case e.startsWith("LKG-4K"):
        return 9;
      case e.startsWith("LKG-8K"):
        return 9;
      case e.startsWith("LKG-P"):
        return 6;
      case e.startsWith("LKG-A"):
        return 9;
      case e.startsWith("LKG-B"):
        return 9;
      case e.startsWith("LKG-D"):
        return 9;
      case e.startsWith("LKG-F"):
        return 6;
      case e.startsWith("LKG-E"):
        return 6;
      case e.startsWith("LKG-H"):
        return 6;
      case e.startsWith("LKG-J"):
        return 7;
      case e.startsWith("LKG-K"):
        return 6;
      case e.startsWith("LKG-L"):
        return 7;
      default:
        return 1;
    }
  }
  get framebufferHeight() {
    return this.quiltResolution.height;
  }
  get viewCone() {
    return this._calibration.viewCone.value * this.depthiness / 180 * Math.PI;
  }
  get tilt() {
    return this._calibration.screenH.value / (this._calibration.screenW.value * this._calibration.slope.value) * (this._calibration.flipImageX.value ? -1 : 1);
  }
  get subp() {
    return 1 / (this._calibration.screenW.value * 3) * (this._calibration.flipImageX.value ? -1 : 1);
  }
  get pitch() {
    return this._calibration.pitch.value * this._calibration.screenW.value / this._calibration.DPI.value * Math.cos(Math.atan(1 / this._calibration.slope.value));
  }
  get center() {
    const e = this._calibration.screenW.value < this._calibration.screenH.value ? 0.5 : 0, n = this._calibration.flipImageX.value ? 0.5 : 0;
    return this._calibration.center.value + e + n;
  }
  get subpixelCells() {
    const e = new Float32Array(6 * this._calibration.subpixelCells.length);
    return this._calibration.subpixelCells.forEach((n, s) => {
      e[s * 6 + 0] = n.ROffsetX / this.calibration.screenW.value, e[s * 6 + 1] = n.ROffsetY / this.calibration.screenH.value, e[s * 6 + 2] = n.GOffsetX / this.calibration.screenW.value, e[s * 6 + 3] = n.GOffsetY / this.calibration.screenH.value, e[s * 6 + 4] = n.BOffsetX / this.calibration.screenW.value, e[s * 6 + 5] = n.BOffsetY / this.calibration.screenH.value;
    }), e;
  }
}
let $ = null;
function P() {
  return $ == null && ($ = new ge()), $;
}
function ee(t) {
  const i = P();
  t != null && i.updateViewControls(t);
}
const Q = 16;
function E(t) {
  if (!Number.isFinite(t))
    return "0.0";
  const i = t.toPrecision(10);
  return i.includes(".") || i.includes("e") ? i : `${i}.0`;
}
function O(t) {
  return Number.isFinite(t) ? Math.round(t).toString() : "0";
}
function Ce(t, i, e) {
  return Math.min(Math.max(t, i), e);
}
function ye(t) {
  const i = t.numViews, e = Math.floor(t.framebufferWidth / t.quiltWidth), n = Math.floor(t.framebufferHeight / t.quiltHeight), s = t.quiltWidth * e / t.framebufferWidth, o = t.quiltHeight * n / t.framebufferHeight, u = Math.min(t.calibration.subpixelCells.length, Q), y = Math.max(u, 1), c = Ce(Math.round(t.filterMode), 0, 3), v = Math.floor(i / 2);
  return `#version 300 es
precision highp float;

uniform int u_viewType;
uniform sampler2D u_texture;
in vec2 v_texcoord;
out vec4 color;

const int MAX_SUBPIXEL_CELLS = ${Q};
uniform float subpixelData[6 * MAX_SUBPIXEL_CELLS];

const float pitch = ${E(t.pitch)};
const float slope = ${E(t.tilt)};
const float center = ${E(t.center)};
const float subpixelSize = ${E(t.subp)};
const float screenW = ${E(t.calibration.screenW.value)};
const float screenH = ${E(t.calibration.screenH.value)};
const float tileCount = ${E(i)};
const vec2 viewPortion = vec2(${E(s)}, ${E(o)});
const vec4 tile = vec4(${E(t.quiltWidth)}, ${E(t.quiltHeight)}, ${E(i)}, 0.0);
const float focus = ${E(t.focus * t.quiltWidth)};
const int subpixelCellCount = ${O(u)};
const int safeSubpixelCellCount = ${O(y)};
const int filter_mode = ${O(c)};
const int cellPatternType = ${O(t.subpixelMode)};
const int filter_edge = ${t.viewDimming ? 1 : 0};
const float filter_end = ${E(t.filterEnd)};
const float filter_size = ${E(t.filterSize)};
const float gaussian_sigma = ${E(Math.max(t.gaussianSigma, 1e-6))};
const float edgeThreshold = ${E(Math.max(t.edgeThreshold, 1e-6))};

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
`;
}
async function xe() {
  const t = P();
  let i = 2;
  async function e() {
    if (t.appCanvas != null)
      try {
        t.capturing = !0, await new Promise((u) => {
          requestAnimationFrame(u);
        }), t.appCanvas.width = t.quiltResolution.width, t.appCanvas.height = t.quiltResolution.height;
        let s = t.appCanvas.toDataURL();
        const o = document.createElement("a");
        o.style.display = "none", o.href = s, o.download = `hologram_qs${t.quiltWidth}x${t.quiltHeight}a${t.aspect}.png`, document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(s);
      } catch (s) {
        console.error("Error while capturing canvas data:", s), t.capturing = !1;
      } finally {
        t.inlineView = i, t.capturing = !1, t.appCanvas.width = t.calibration.screenW.value, t.appCanvas.height = t.calibration.screenH.value;
      }
  }
  const n = document.getElementById("screenshotbutton");
  n && n.addEventListener("click", () => {
    i = t.inlineView;
    const s = K.getInstance();
    if (!s) {
      console.warn("LookingGlassXRDevice not initialized");
      return;
    }
    t.inlineView = 2, s.captureScreenshot = !0, setTimeout(() => {
      s.screenshotCallback = e;
    }, 100);
  });
}
function _e() {
  var i, e, n, s, o;
  const t = P();
  if (t.lkgCanvas == null)
    console.warn("window placement called without a valid XR Session!");
  else {
    let u = function() {
      let r = d.d - d.a, a = d.w - d.s;
      r && a && (r *= Math.sqrt(0.5), a *= Math.sqrt(0.5));
      const l = t.trackballX, h = t.trackballY, m = Math.cos(l) * r - Math.sin(l) * Math.cos(h) * a, L = -Math.sin(h) * a, M = -Math.sin(l) * r - Math.cos(l) * Math.cos(h) * a;
      t.targetX = t.targetX + m * t.targetDiam * 0.03, t.targetY = t.targetY + L * t.targetDiam * 0.03, t.targetZ = t.targetZ + M * t.targetDiam * 0.03, requestAnimationFrame(u);
    };
    const y = document.createElement("style");
    document.head.appendChild(y), (i = y.sheet) == null || i.insertRule("#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }");
    const c = document.createElement("div");
    c.id = "LookingGlassWebXRControls", c.style.position = "fixed", c.style.zIndex = "1000", c.style.padding = "15px", c.style.width = "320px", c.style.maxWidth = "calc(100vw - 18px)", c.style.maxHeight = "calc(100vh - 18px)", c.style.whiteSpace = "nowrap", c.style.background = "rgba(0, 0, 0, 0.6)", c.style.color = "white", c.style.borderRadius = "10px", c.style.right = "15px", c.style.bottom = "15px", c.style.flex = "row";
    const v = document.createElement("div");
    c.appendChild(v), v.style.width = "100%", v.style.textAlign = "center", v.style.fontWeight = "bold", v.style.marginBottom = "8px", v.innerText = "Looking Glass Controls";
    const f = document.createElement("button");
    f.style.display = "block", f.style.margin = "auto", f.style.width = "100%", f.style.height = "35px", f.style.padding = "4px", f.style.marginBottom = "8px", f.style.borderRadius = "8px", f.id = "screenshotbutton", c.appendChild(f), f.innerText = "Save Hologram", t.quiltResolution.height * t.quiltResolution.width > 33177600 ? (f.style.backgroundColor = "#ccc", f.style.color = "#999", f.style.cursor = "not-allowed", f.title = "Button is disabled because the quilt resolution is too large.") : (f.style.backgroundColor = "", f.style.color = "", f.style.cursor = "", f.title = "");
    const b = document.createElement("button");
    b.style.display = "block", b.style.margin = "auto", b.style.width = "100%", b.style.height = "35px", b.style.padding = "4px", b.style.marginBottom = "8px", b.style.borderRadius = "8px", b.id = "copybutton", c.appendChild(b), b.innerText = "Copy Config", b.addEventListener("click", () => {
      Ee(t);
    });
    const x = document.createElement("div");
    c.appendChild(x), x.style.width = "290px", x.style.whiteSpace = "normal", x.style.color = "rgba(255,255,255,0.7)", x.style.fontSize = "14px", x.style.margin = "5px 0", x.innerHTML = "Click the popup and use WASD, mouse left/right drag, and scroll.";
    const T = document.createElement("div");
    c.appendChild(T);
    const R = (r, a, l) => {
      const h = l.stringify, m = document.createElement("div");
      m.style.marginBottom = "8px", T.appendChild(m);
      const L = r, M = t[r], _ = document.createElement("label");
      m.appendChild(_), _.innerText = l.label, _.setAttribute("for", L), _.style.width = "100px", _.style.display = "inline-block", _.style.textDecoration = "dotted underline 1px", _.style.fontFamily = '"Courier New"', _.style.fontSize = "13px", _.style.fontWeight = "bold", _.title = l.title;
      const w = document.createElement("input");
      m.appendChild(w), Object.assign(w, a), w.id = L, w.title = l.title, w.value = a.value !== void 0 ? a.value : M;
      const U = (C) => {
        t[r] = C, G(C);
      };
      w.oninput = () => {
        const C = a.type === "range" ? parseFloat(w.value) : a.type === "checkbox" ? w.checked : w.value;
        U(C);
      };
      const H = (C) => {
        let p = C(t[r]);
        l.fixRange && (p = l.fixRange(p), w.max = Math.max(parseFloat(w.max), p).toString(), w.min = Math.min(parseFloat(w.min), p).toString()), w.value = p, U(p);
      };
      a.type === "range" && (w.style.width = "110px", w.style.height = "8px", w.onwheel = (C) => {
        H((p) => p + Math.sign(C.deltaX - C.deltaY) * a.step);
      });
      let G = (C) => {
      };
      if (h) {
        const C = document.createElement("span");
        C.style.fontFamily = '"Courier New"', C.style.fontSize = "13px", C.style.marginLeft = "3px", m.appendChild(C), G = (p) => {
          C.innerHTML = h(p);
        }, G(M);
      }
      return H;
    };
    R("fovy", {
      type: "range",
      min: 1 / 180 * Math.PI,
      max: 120.1 / 180 * Math.PI,
      step: 1 / 180 * Math.PI
    }, {
      label: "fov",
      title: "perspective fov (degrades stereo effect)",
      fixRange: (r) => Math.max(1 / 180 * Math.PI, Math.min(r, 120.1 / 180 * Math.PI)),
      stringify: (r) => {
        const a = r / Math.PI * 180, l = Math.atan(Math.tan(r / 2) * t.aspect) * 2 / Math.PI * 180;
        return `${a.toFixed()}&deg;&times;${l.toFixed()}&deg;`;
      }
    }), R("depthiness", { type: "range", min: 0, max: 2, step: 0.01 }, {
      label: "depthiness",
      title: "exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov.",
      fixRange: (r) => Math.max(0, r),
      stringify: (r) => `${r.toFixed(2)}x`
    }), R("inlineView", { type: "range", min: 0, max: 2, step: 1 }, {
      label: "inline view",
      title: "what to show inline on the original canvas (swizzled = no overwrite)",
      fixRange: (r) => Math.max(0, Math.min(r, 2)),
      stringify: (r) => r === 0 ? "swizzled" : r === 1 ? "center" : r === 2 ? "quilt" : "?"
    }), R("filterMode", { type: "range", min: 0, max: 3, step: 1 }, {
      label: "view filtering mode",
      title: "controls the method used for view blending",
      fixRange: (r) => Math.max(0, Math.min(r, 3)),
      stringify: (r) => r === 0 ? "old, studio style" : r === 1 ? "2 view" : r === 2 ? "gaussian" : r === 3 ? "10 view gaussian" : "?"
    }), R("gaussianSigma", { type: "range", min: -1, max: 1, step: 0.01 }, {
      label: "gaussian sigma",
      title: "control view blending",
      fixRange: (r) => Math.max(-1, Math.min(r, 1)),
      stringify: (r) => r
    }), t.lkgCanvas.oncontextmenu = (r) => {
      r.preventDefault();
    }, t.lkgCanvas.addEventListener("wheel", (r) => {
      const a = t.targetDiam, l = 1.1, h = Math.log(a) / Math.log(l);
      return t.targetDiam = Math.pow(l, h + r.deltaY * 0.01);
    }, { passive: !1 }), t.lkgCanvas.addEventListener("mousemove", (r) => {
      const a = r.movementX, l = -r.movementY;
      if (r.buttons & 2 || r.buttons & 1 && (r.shiftKey || r.ctrlKey)) {
        const h = t.trackballX, m = t.trackballY, L = -Math.cos(h) * a + Math.sin(h) * Math.sin(m) * l, M = -Math.cos(m) * l, _ = Math.sin(h) * a + Math.cos(h) * Math.sin(m) * l;
        t.targetX = t.targetX + L * t.targetDiam * 1e-3, t.targetY = t.targetY + M * t.targetDiam * 1e-3, t.targetZ = t.targetZ + _ * t.targetDiam * 1e-3;
      } else
        r.buttons & 1 && (t.trackballX = t.trackballX - a * 0.01, t.trackballY = t.trackballY - l * 0.01);
    });
    const d = { w: 0, a: 0, s: 0, d: 0 };
    return t.lkgCanvas.addEventListener("keydown", (r) => {
      switch (r.code) {
        case "KeyW":
          d.w = 1;
          break;
        case "KeyA":
          d.a = 1;
          break;
        case "KeyS":
          d.s = 1;
          break;
        case "KeyD":
          d.d = 1;
          break;
      }
    }), t.lkgCanvas.addEventListener("keyup", (r) => {
      switch (r.code) {
        case "KeyW":
          d.w = 0;
          break;
        case "KeyA":
          d.a = 0;
          break;
        case "KeyS":
          d.s = 0;
          break;
        case "KeyD":
          d.d = 0;
          break;
      }
    }), (e = t.appCanvas) == null || e.addEventListener("wheel", (r) => {
      const a = t.targetDiam, l = 1.1, h = Math.log(a) / Math.log(l);
      return t.targetDiam = Math.pow(l, h + r.deltaY * 0.01);
    }, { passive: !1 }), (n = t.appCanvas) == null || n.addEventListener("mousemove", (r) => {
      const a = r.movementX, l = -r.movementY;
      if (r.buttons & 2 || r.buttons & 1 && (r.shiftKey || r.ctrlKey)) {
        const h = t.trackballX, m = t.trackballY, L = -Math.cos(h) * a + Math.sin(h) * Math.sin(m) * l, M = -Math.cos(m) * l, _ = Math.sin(h) * a + Math.cos(h) * Math.sin(m) * l;
        t.targetX = t.targetX + L * t.targetDiam * 1e-3, t.targetY = t.targetY + M * t.targetDiam * 1e-3, t.targetZ = t.targetZ + _ * t.targetDiam * 1e-3;
      } else
        r.buttons & 1 && (t.trackballX = t.trackballX - a * 0.01, t.trackballY = t.trackballY - l * 0.01);
    }), (s = t.appCanvas) == null || s.addEventListener("keydown", (r) => {
      switch (r.code) {
        case "KeyW":
          d.w = 1;
          break;
        case "KeyA":
          d.a = 1;
          break;
        case "KeyS":
          d.s = 1;
          break;
        case "KeyD":
          d.d = 1;
          break;
      }
    }), (o = t.appCanvas) == null || o.addEventListener("keyup", (r) => {
      switch (r.code) {
        case "KeyW":
          d.w = 0;
          break;
        case "KeyA":
          d.a = 0;
          break;
        case "KeyS":
          d.s = 0;
          break;
        case "KeyD":
          d.d = 0;
          break;
      }
    }), requestAnimationFrame(u), setTimeout(() => {
      xe();
    }, 1e3), c;
  }
}
function Ee(t) {
  const i = {
    targetX: t.targetX,
    targetY: t.targetY,
    targetZ: t.targetZ,
    fovy: `${Math.round(t.fovy / Math.PI * 180)} * Math.PI / 180`,
    targetDiam: t.targetDiam,
    trackballX: t.trackballX,
    trackballY: t.trackballY,
    depthiness: t.depthiness
  };
  let e = JSON.stringify(i, null, 4).replace(/"/g, "").replace(/{/g, "").replace(/}/g, "");
  navigator.clipboard.writeText(e);
}
let Y;
const Le = (t, i) => {
  const e = P();
  if (e.lkgCanvas == null) {
    console.warn("window placement called without a valid XR Session!");
    return;
  } else
    t == !1 ? Re(e, Y) : (Y == null && (Y = _e()), e.lkgCanvas.style.position = "fixed", e.lkgCanvas.style.bottom = "0", e.lkgCanvas.style.left = "0", e.lkgCanvas.width = e.calibration.screenW.value, e.lkgCanvas.height = e.calibration.screenH.value, document.body.appendChild(Y), "getScreenDetails" in window ? Se(e.lkgCanvas, e, i) : te(e, e.lkgCanvas, i));
};
async function Se(t, i, e) {
  const s = (await window.getScreenDetails()).screens.filter((o) => o.label.includes("LKG"))[0];
  if (s === void 0) {
    console.log("no Looking Glass monitor detected - manually opening popup window"), te(i, t, e);
    return;
  } else {
    const o = [
      `left=${s.left}`,
      `top=${s.top}`,
      `width=${s.width}`,
      `height=${s.height}`,
      "menubar=no",
      "toolbar=no",
      "location=no",
      "status=no",
      "resizable=yes",
      "scrollbars=no",
      "fullscreenEnabled=true"
    ].join(",");
    i.popup = window.open("", "new", o), i.popup && (i.popup.document.body.style.background = "black", i.popup.document.body.style.transform = "1.0", ie(i), i.popup.document.body.appendChild(t), console.assert(e), i.popup.onbeforeunload = e);
  }
}
function te(t, i, e) {
  t.popup = window.open("", void 0, "width=640,height=360"), t.popup && (t.popup.document.title = "Looking Glass Window (fullscreen me on Looking Glass!)", t.popup.document.body.style.background = "black", t.popup.document.body.style.transform = "1.0", ie(t), t.popup.document.body.appendChild(i), console.assert(e), t.popup.onbeforeunload = e);
}
function Re(t, i) {
  var e;
  (e = i.parentElement) == null || e.removeChild(i), t.popup && (t.popup.onbeforeunload = null, t.popup.close(), t.popup = null);
}
function ie(t) {
  t.popup && t.popup.document.addEventListener("keydown", (i) => {
    i.ctrlKey && (i.key === "=" || i.key === "-" || i.key === "+") && i.preventDefault();
  });
}
const D = Symbol("LookingGlassXRWebGLLayer");
class Te extends we {
  constructor(i, e, n) {
    super(i, e, n);
    const s = P();
    s.appCanvas = e.canvas, s.lkgCanvas = document.createElement("canvas"), s.lkgCanvas.tabIndex = 0;
    const o = s.lkgCanvas.getContext("2d", { alpha: !1 });
    s.lkgCanvas.addEventListener("dblclick", function() {
      this.requestFullscreen();
    });
    const u = this[be].config, y = e.createTexture();
    let c, v;
    const f = e.createFramebuffer(), W = e.enable.bind(e), b = e.disable.bind(e), x = e.getExtension("OES_vertex_array_object"), T = 34229, R = x ? x.bindVertexArrayOES.bind(x) : e.bindVertexArray.bind(e), d = () => {
      const V = e.getParameter(e.TEXTURE_BINDING_2D);
      if (e.bindTexture(e.TEXTURE_2D, y), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, s.framebufferWidth, s.framebufferHeight, 0, e.RGBA, e.UNSIGNED_BYTE, null), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_BASE_LEVEL, 0), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAX_LEVEL, 0), e.bindTexture(e.TEXTURE_2D, V), c) {
        const k = e.getParameter(e.RENDERBUFFER_BINDING);
        e.bindRenderbuffer(e.RENDERBUFFER, c), e.renderbufferStorage(e.RENDERBUFFER, v.format, s.framebufferWidth, s.framebufferHeight), e.bindRenderbuffer(e.RENDERBUFFER, k);
      }
    };
    (u.depth || u.stencil) && (u.depth && u.stencil ? v = { format: e.DEPTH_STENCIL, attachment: e.DEPTH_STENCIL_ATTACHMENT } : u.depth ? v = { format: e.DEPTH_COMPONENT16, attachment: e.DEPTH_ATTACHMENT } : u.stencil && (v = { format: e.STENCIL_INDEX8, attachment: e.STENCIL_ATTACHMENT }), c = e.createRenderbuffer()), d(), s.addEventListener("on-config-changed", d);
    const r = e.getParameter(e.FRAMEBUFFER_BINDING);
    e.bindFramebuffer(e.FRAMEBUFFER, f), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, y, 0), (u.depth || u.stencil) && e.framebufferRenderbuffer(e.FRAMEBUFFER, v.attachment, e.RENDERBUFFER, c), e.bindFramebuffer(e.FRAMEBUFFER, r);
    const a = e.createProgram();
    if (!a)
      return;
    const l = e.createShader(e.VERTEX_SHADER);
    if (!l)
      return;
    e.attachShader(a, l);
    const h = e.createShader(e.FRAGMENT_SHADER);
    if (!h)
      return;
    e.attachShader(a, h);
    {
      const V = `#version 300 es
			layout(location = 0) in vec2 a_position;
			out vec2 v_texcoord;
			void main() {
			  gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
			  v_texcoord = a_position;
			}
		  `;
      e.shaderSource(l, V), e.compileShader(l), e.getShaderParameter(l, e.COMPILE_STATUS) || console.warn(e.getShaderInfoLog(l));
    }
    let m, L = 0, M;
    const _ = () => {
      const V = ye(s);
      if (V === m || (m = V, !h))
        return;
      if (e.shaderSource(h, V), e.compileShader(h), !e.getShaderParameter(h, e.COMPILE_STATUS)) {
        console.warn(e.getShaderInfoLog(h));
        return;
      }
      if (!a)
        return;
      if (e.linkProgram(a), !e.getProgramParameter(a, e.LINK_STATUS)) {
        console.warn(e.getProgramInfoLog(a));
        return;
      }
      L = e.getAttribLocation(a, "a_position"), M = e.getUniformLocation(a, "u_viewType");
      const k = e.getUniformLocation(a, "u_texture"), A = e.getUniformLocation(a, "subpixelData"), B = s.subpixelCells, X = Q * 6, q = new Float32Array(X);
      q.set(B.length > X ? B.slice(0, X) : B);
      const z = e.getParameter(e.CURRENT_PROGRAM);
      e.useProgram(a), e.uniform1i(k, 0), e.uniform1fv(A, q), e.useProgram(z);
    };
    s.addEventListener("on-config-changed", _), _();
    const w = x ? x.createVertexArrayOES() : e.createVertexArray(), U = e.createBuffer(), H = e.getParameter(e.ARRAY_BUFFER_BINDING), G = e.getParameter(T);
    R(w), e.bindBuffer(e.ARRAY_BUFFER, U), e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), e.STATIC_DRAW), e.enableVertexAttribArray(L), e.vertexAttribPointer(L, 2, e.FLOAT, !1, 0, 0), R(G), e.bindBuffer(e.ARRAY_BUFFER, H);
    const C = () => {
      console.assert(this[D].LookingGlassEnabled), e.bindFramebuffer(e.FRAMEBUFFER, f);
      const V = e.getParameter(e.COLOR_CLEAR_VALUE), k = e.getParameter(e.DEPTH_CLEAR_VALUE), A = e.getParameter(e.STENCIL_CLEAR_VALUE);
      e.clearColor(0, 0, 0, 0), e.clearDepth(1), e.clearStencil(0), e.clear(e.DEPTH_BUFFER_BIT | e.COLOR_BUFFER_BIT | e.STENCIL_BUFFER_BIT), e.clearColor(V[0], V[1], V[2], V[3]), e.clearDepth(k), e.clearStencil(A);
    }, p = e.canvas;
    let F, I;
    const re = () => {
      if (!this[D].LookingGlassEnabled)
        return;
      (p.width !== s.calibration.screenW.value || p.height !== s.calibration.screenH.value) && s.capturing === !1 ? (F = p.width, I = p.height, p.width = s.calibration.screenW.value, p.height = s.calibration.screenH.value) : s.capturing === !0 && (F = p.width, I = p.height, p.width = s.framebufferWidth, p.height = s.framebufferHeight);
      const V = e.getParameter(T), k = e.getParameter(e.CULL_FACE), A = e.getParameter(e.BLEND), B = e.getParameter(e.DEPTH_TEST), X = e.getParameter(e.STENCIL_TEST), q = e.getParameter(e.SCISSOR_TEST), z = e.getParameter(e.VIEWPORT), ne = e.getParameter(e.FRAMEBUFFER_BINDING), ae = e.getParameter(e.RENDERBUFFER_BINDING), oe = e.getParameter(e.CURRENT_PROGRAM), le = e.getParameter(e.ACTIVE_TEXTURE);
      {
        const ce = e.getParameter(e.TEXTURE_BINDING_2D);
        e.bindFramebuffer(e.FRAMEBUFFER, null), e.useProgram(a), R(w), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, y), e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.STENCIL_TEST), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.uniform1i(M, 0), e.drawArrays(e.TRIANGLES, 0, 6), o == null || o.clearRect(0, 0, s.calibration.screenW.value, s.calibration.screenH.value), o == null || o.drawImage(p, 0, 0), s.inlineView !== 0 && (e.uniform1i(M, s.inlineView), e.drawArrays(e.TRIANGLES, 0, 6)), e.bindTexture(e.TEXTURE_2D, ce);
      }
      e.activeTexture(le), e.useProgram(oe), e.bindRenderbuffer(e.RENDERBUFFER, ae), e.bindFramebuffer(e.FRAMEBUFFER, ne), e.viewport(...z), (q ? W : b)(e.SCISSOR_TEST), (X ? W : b)(e.STENCIL_TEST), (B ? W : b)(e.DEPTH_TEST), (A ? W : b)(e.BLEND), (k ? W : b)(e.CULL_FACE), R(V);
    };
    this[D] = {
      LookingGlassEnabled: !1,
      framebuffer: f,
      clearFramebuffer: C,
      blitTextureToDefaultFramebufferIfNeeded: re,
      moveCanvasToWindow: Le,
      restoreOriginalCanvasDimensions: () => {
        F && I && (p.width = F, p.height = I, F = I = void 0);
      }
    };
  }
  get framebuffer() {
    return this[D].LookingGlassEnabled ? this[D].framebuffer : null;
  }
  get framebufferWidth() {
    return P().framebufferWidth;
  }
  get framebufferHeight() {
    return P().framebufferHeight;
  }
}
const N = class extends ve {
  constructor(i) {
    super(i), this.sessions = /* @__PURE__ */ new Map(), this.viewSpaces = [], this.basePoseMatrix = g.create(), this.inlineProjectionMatrix = g.create(), this.inlineInverseViewMatrix = g.create(), this.LookingGlassProjectionMatrices = [], this.LookingGlassInverseViewMatrices = [], this.captureScreenshot = !1, this.screenshotCallback = null, N.instance || (N.instance = this);
  }
  static getInstance() {
    return N.instance;
  }
  onBaseLayerSet(i, e) {
    const n = this.sessions.get(i);
    n.baseLayer = e;
    const s = P(), o = e[D];
    o.LookingGlassEnabled = n.immersive, n.immersive && (s.XRSession = this.sessions.get(i), s.popup == null ? o.moveCanvasToWindow(!0, () => {
      this.endSession(i);
    }) : console.warn("attempted to assign baselayer twice?"));
  }
  isSessionSupported(i) {
    return i === "inline" || i === "immersive-vr";
  }
  isFeatureSupported(i) {
    switch (i) {
      case "viewer":
        return !0;
      case "local":
        return !0;
      case "local-floor":
        return !0;
      case "bounded-floor":
        return !1;
      case "unbounded":
        return !1;
      default:
        return console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:", i), !1;
    }
  }
  async requestSession(i, e) {
    if (!this.isSessionSupported(i))
      return Promise.reject();
    const n = i !== "inline", s = new Ve(i, e), o = P();
    return this.sessions.set(s.id, s), n && (this.dispatchEvent("@@webxr-polyfill/vr-present-start", s.id), window.addEventListener("unload", () => {
      o.popup && o.popup.close(), o.popup = null;
    })), Promise.resolve(s.id);
  }
  requestAnimationFrame(i) {
    return this.global.requestAnimationFrame(i);
  }
  cancelAnimationFrame(i) {
    this.global.cancelAnimationFrame(i);
  }
  onFrameStart(i, e) {
    const n = this.sessions.get(i), s = P();
    if (n.immersive) {
      const o = Math.tan(0.5 * s.fovy), u = 0.5 * s.targetDiam / o, y = u - s.targetDiam, c = this.basePoseMatrix;
      g.fromTranslation(c, [s.targetX, s.targetY, s.targetZ]), g.rotate(c, c, s.trackballX, [0, 1, 0]), g.rotate(c, c, -s.trackballY, [1, 0, 0]), g.translate(c, c, [0, 0, u]);
      for (let v = 0; v < s.numViews; ++v) {
        const f = (v + 0.5) / s.numViews - 0.5, W = Math.tan(s.viewCone * f), b = u * W, x = this.LookingGlassInverseViewMatrices[v] = this.LookingGlassInverseViewMatrices[v] || g.create();
        g.translate(x, c, [b, 0, 0]), g.invert(x, x);
        const T = Math.max(y + e.depthNear, 0.01), R = y + e.depthFar, d = T * o, r = d, a = -d, l = T * -W, h = s.aspect * d, m = l + h, L = l - h, M = this.LookingGlassProjectionMatrices[v] = this.LookingGlassProjectionMatrices[v] || g.create();
        g.set(M, 2 * T / (m - L), 0, 0, 0, 0, 2 * T / (r - a), 0, 0, (m + L) / (m - L), (r + a) / (r - a), -(R + T) / (R - T), -1, 0, 0, -2 * R * T / (R - T), 0);
      }
    } else {
      const o = n.baseLayer.context, u = o.drawingBufferWidth / o.drawingBufferHeight;
      g.perspective(this.inlineProjectionMatrix, e.inlineVerticalFieldOfView, u, e.depthNear, e.depthFar), g.fromTranslation(this.basePoseMatrix, [0, j, 0]), g.invert(this.inlineInverseViewMatrix, this.basePoseMatrix), n.baseLayer[D].clearFramebuffer();
    }
  }
  onFrameEnd(i) {
    this.sessions.get(i).baseLayer[D].blitTextureToDefaultFramebufferIfNeeded(), this.captureScreenshot && this.screenshotCallback && (this.screenshotCallback(), this.captureScreenshot = !1);
  }
  async requestFrameOfReferenceTransform(i, e) {
    const n = g.create();
    switch (i) {
      case "viewer":
      case "local":
        return g.fromTranslation(n, [0, -j, 0]), n;
      case "local-floor":
        return n;
      default:
        throw new Error("XRReferenceSpaceType not understood");
    }
  }
  endSession(i) {
    const e = this.sessions.get(i);
    e.immersive && e.baseLayer && (e.baseLayer[D].moveCanvasToWindow(!1), e.baseLayer[D].LookingGlassEnabled = !1, e.baseLayer[D].restoreOriginalCanvasDimensions(), this.dispatchEvent("@@webxr-polyfill/vr-present-end", i)), e.ended = !0;
  }
  doesSessionSupportReferenceSpace(i, e) {
    const n = this.sessions.get(i);
    return n.ended ? !1 : n.enabledFeatures.has(e);
  }
  getViewSpaces(i) {
    if (i === "immersive-vr") {
      const e = P();
      for (let n = this.viewSpaces.length; n < e.numViews; ++n)
        this.viewSpaces[n] = new Pe(n);
      return this.viewSpaces.length = e.numViews, this.viewSpaces;
    }
  }
  getViewport(i, e, n, s, o) {
    if (o === void 0) {
      const y = this.sessions.get(i).baseLayer.context;
      s.x = 0, s.y = 0, s.width = y.drawingBufferWidth, s.height = y.drawingBufferHeight;
    } else {
      const u = P(), y = o % u.quiltWidth, c = Math.floor(o / u.quiltWidth);
      s.x = u.framebufferWidth / u.quiltWidth * y, s.y = u.framebufferHeight / u.quiltHeight * c, s.width = u.framebufferWidth / u.quiltWidth, s.height = u.framebufferHeight / u.quiltHeight;
    }
    return !0;
  }
  getProjectionMatrix(i, e) {
    return e === void 0 ? this.inlineProjectionMatrix : this.LookingGlassProjectionMatrices[e] || g.create();
  }
  getBasePoseMatrix() {
    return this.basePoseMatrix;
  }
  getBaseViewMatrix() {
    return this.inlineInverseViewMatrix;
  }
  _getViewMatrixByIndex(i) {
    return this.LookingGlassInverseViewMatrices[i] = this.LookingGlassInverseViewMatrices[i] || g.create();
  }
  getInputSources() {
    return [];
  }
  getInputPose(i, e, n) {
    return null;
  }
  onWindowResize() {
  }
};
let K = N;
S(K, "instance", null);
let Me = 0;
class Ve {
  constructor(i, e) {
    S(this, "mode");
    S(this, "immersive");
    S(this, "id");
    S(this, "baseLayer");
    S(this, "inlineVerticalFieldOfView");
    S(this, "ended");
    S(this, "enabledFeatures");
    this.mode = i, this.immersive = i === "immersive-vr" || i === "immersive-ar", this.id = ++Me, this.baseLayer = null, this.inlineVerticalFieldOfView = Math.PI * 0.5, this.ended = !1, this.enabledFeatures = e;
  }
}
class Pe extends me {
  constructor(e) {
    super();
    S(this, "viewIndex");
    this.viewIndex = e;
  }
  get eye() {
    return "none";
  }
  _onPoseUpdate(e) {
    this._inverseBaseMatrix = e._getViewMatrixByIndex(this.viewIndex);
  }
}
class se extends fe {
  constructor(e) {
    super();
    S(this, "vrButton");
    S(this, "device");
    S(this, "isPresenting", !1);
    ee(e), this.loadPolyfill();
  }
  static async init(e) {
    new se(e);
  }
  async loadPolyfill() {
    this.overrideDefaultVRButton(), console.warn('Looking Glass WebXR "polyfill" overriding native WebXR API.');
    for (const e in J)
      this.global[e] = J[e];
    this.global.XRWebGLLayer = Te, this.injected = !0, this.device = new K(this.global), this.xr = new de(Promise.resolve(this.device)), Object.defineProperty(this.global.navigator, "xr", {
      value: this.xr,
      configurable: !0
    });
  }
  async overrideDefaultVRButton() {
    this.vrButton = await De("VRButton"), this.vrButton && this.device ? (this.device.addEventListener("@@webxr-polyfill/vr-present-start", () => {
      this.isPresenting = !0, this.updateVRButtonUI();
    }), this.device.addEventListener("@@webxr-polyfill/vr-present-end", () => {
      this.isPresenting = !1, this.updateVRButtonUI();
    }), this.vrButton.addEventListener("click", (e) => {
      this.updateVRButtonUI();
    }), this.updateVRButtonUI()) : console.warn("Unable to find VRButton");
  }
  async updateVRButtonUI() {
    if (this.vrButton) {
      await We(100), this.isPresenting ? this.vrButton.innerHTML = "EXIT LOOKING GLASS" : this.vrButton.innerHTML = "ENTER LOOKING GLASS";
      const e = 220;
      this.vrButton.style.width = `${e}px`, this.vrButton.style.left = `calc(50% - ${e / 2}px)`;
    }
  }
  update(e) {
    ee(e);
  }
}
async function De(t) {
  return new Promise((i) => {
    const e = new MutationObserver(function(n) {
      n.forEach(function(s) {
        s.addedNodes.forEach(function(o) {
          const u = o;
          u.id === t && (i(u), e.disconnect());
        });
      });
    });
    e.observe(document.body, { subtree: !1, childList: !0 }), setTimeout(() => {
      e.disconnect(), i(null);
    }, 5e3);
  });
}
function We(t) {
  return new Promise((i) => setTimeout(i, t));
}
const Ne = P();
export {
  Ne as LookingGlassConfig,
  se as LookingGlassWebXRPolyfill
};
