'use strict';

class Segment {
  constructor(id, darkColor, lightColor, borderTop, borderLeft, borderRight, borderBottom, top, left, width, height) {
    this._id = id;
    this._darkColor = darkColor;
    this._lightColor = lightColor;
    this._position = "absolute";
    this._borderTop = borderTop;
    this._borderLeft = borderLeft;
    this._borderRight =  borderRight;
    this._borderBottom =  borderBottom;
    this._top = top;
    this._left = left;
    this._width = width;
    this._height = height;
    this._element = document.getElementById(this._id);
  }
  get getId () {
    return this._id;
  }
}

class SegmentA extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 10, 10, 10, undefined, undefined, 1, 18, undefined);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.left = (this._left * factor) + "px";
		element.style.width = (this._width * factor) + "px";
		element.style.borderTop = (this._borderTop * factor) + "px solid " + this._darkColor;
		element.style.borderLeft = (this._borderLeft * factor) + "px solid transparent";
		element.style.borderRight = (this._borderRight * factor) + "px solid transparent";
  }
}

class SegmentB extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 10, undefined, 10, 5, 1, 30, undefined, 18);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.left = (this._left * factor) + "px";
		element.style.height = (this._height * factor) + "px";
		element.style.borderTop = (this._borderTop * factor) + "px solid transparent";
		element.style.borderRight = (this._borderRight * factor) + "px solid " + this._darkColor;
		element.style.borderBottom = (this._borderBottom * factor) + "px solid transparent";
  }
}

class SegmentC extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 5, undefined, 10, 10, 36, 30, undefined, 18);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.left = (this._left * factor) + "px";
		element.style.height = (this._height * factor) + "px";
		element.style.borderTop = (this._borderTop * factor) + "px solid transparent";
		element.style.borderRight = (this._borderRight * factor) + "px solid " + this._darkColor;
		element.style.borderBottom = (this._borderBottom * factor) + "px solid transparent";
  }
}

class SegmentD extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, undefined, 10, 10, 10, undefined, 1, 18, undefined);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.bottom = "0px";
		element.style.left = (this._left * factor) + "px";
		element.style.width = (this._width * factor) + "px";
		element.style.borderLeft = (this._borderLeft * factor) + "px solid transparent";
		element.style.borderRight = (this._borderRight * factor) + "px solid transparent";
		element.style.borderBottom = (this._borderBottom * factor) + "px solid " + this._darkColor;
  }
}

class SegmentE extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 5, 10, undefined, 10, 36, undefined, undefined, 18);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.height = (this._height * factor) + "px";
		element.style.borderTop = (this._borderTop * factor) + "px solid transparent";
		element.style.borderLeft = (this._borderLeft * factor) + "px solid " + this._darkColor;
		element.style.borderBottom = (this._borderBottom * factor) + "px solid transparent";
  }
}

class SegmentF extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 10, 10, undefined, 5, 1, undefined, undefined, 18);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.height = (this._height * factor) + "px";
		element.style.borderTop = (this._borderTop * factor) + "px solid transparent";
		element.style.borderLeft = (this._borderLeft * factor) + "px solid " + this._darkColor;
		element.style.borderBottom = (this._borderBottom * factor) + "px solid transparent";
  }
}

class SegmentGTop extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, undefined, 10, 10, 5, 30, 1, 18, undefined);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.left = (this._left * factor) + "px";
		element.style.width = (this._width * factor) + "px";
		element.style.borderLeft = (this._borderLeft * factor) + "px solid transparent";
		element.style.borderRight = (this._borderRight * factor) + "px solid transparent";
		element.style.borderBottom = Math.ceil(this._borderBottom * factor) + "px solid " + this._darkColor;
  }
}

class SegmentGBottom extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 5, 10, 10, undefined, 35, 1, 18, undefined);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.left = (this._left * factor) + "px";
		element.style.width = (this._width * factor) + "px";
		element.style.borderTop = (this._borderTop * factor) + "px solid " + this._darkColor;
		element.style.borderLeft = (this._borderLeft * factor) + "px solid transparent";
		element.style.borderRight = Math.ceil(this._borderRight * factor) + "px solid transparent";
  }
}

class SegmentH extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 5, undefined, undefined, undefined, 60, 42, 10, 10);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.left = (this._left * factor) + "px";
		element.style.width = (this._width * factor) + "px";
		element.style.height = (this._height * factor) + "px";
		element.style.borderRadius = (this._borderTop * factor) + "px";
		element.style.background = this._darkColor;
  }
}

class SegmentI extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 5, undefined, undefined, undefined, 20, 42, 10, 10);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.left = (this._left * factor) + "px";
		element.style.width = (this._width * factor) + "px";
		element.style.height = (this._height * factor) + "px";
		element.style.borderRadius = (this._borderTop * factor) + "px";
		element.style.background = this._darkColor;
  }
}

class SegmentJ extends Segment {
  constructor(id, darkColor, lightColor) {
    super(id, darkColor, lightColor, 5, undefined, undefined, undefined, 40, 42, 10, 10);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.top = (this._top * factor) + "px";
		element.style.left = (this._left * factor) + "px";
		element.style.width = (this._width * factor) + "px";
		element.style.height = (this._height * factor) + "px";
		element.style.borderRadius = (this._borderTop * factor) + "px";
		element.style.background = this._darkColor;
  }
}

//  constructor(id, darkColor, lightColor, borderTop, borderLeft, borderRight, borderBottom, top, left, width, height) {


class Digit {
  constructor(id, width, height, darkColor, lightColor) {
    this._id = id;
    this._width = width;
    this._height = height;
    this._segmentA = new SegmentA(this._id + "s0", darkColor, lightColor);
    this._segmentB = new SegmentB(this._id + "s1", darkColor, lightColor);
    this._segmentC = new SegmentC(this._id + "s2", darkColor, lightColor);
    this._segmentD = new SegmentD(this._id + "s3", darkColor, lightColor);
    this._segmentE = new SegmentE(this._id + "s4", darkColor, lightColor);
    this._segmentF = new SegmentF(this._id + "s5", darkColor, lightColor);
    this._segmentGTop = new SegmentGTop(this._id + "s6Top", darkColor, lightColor);
    this._segmentGBottom = new SegmentGBottom(this._id + "s6Bottom", darkColor, lightColor);
    this._segmentH = new SegmentH(this._id + "s7", darkColor, lightColor);
    this._segmentI = new SegmentI(this._id + "s8", darkColor, lightColor);
    this._segmentJ = new SegmentJ(this._id + "s9", darkColor, lightColor);
  }
  magnify(factor) {
    let element = document.getElementById(this._id);
		element.style.width = (this._width * factor) + "px";
		element.style.height = (this._height * factor) + "px";
    this._segmentA.magnify(factor);
    this._segmentB.magnify(factor);
    this._segmentC.magnify(factor);
    this._segmentD.magnify(factor);
    this._segmentE.magnify(factor);
    this._segmentF.magnify(factor);
    this._segmentGTop.magnify(factor);
    this._segmentGBottom.magnify(factor);
    this._segmentH.magnify(factor);
    this._segmentI.magnify(factor);
    this._segmentJ.magnify(factor);
  }
}

// const digit = new Digit("digit1");


