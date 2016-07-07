export class Drag {
  constructor(el, config) {
    this.exec(el, config)
  }

  exec(el, {
    lockX=false,
    lockY=false,
    container=document.documentElement || document.body
    }) {
    this.el = this.$(el);
    this.x = this.y = 0;
    this.lockX = lockX;
    this.lockY = lockY;
    this.container = this.$(container);
    this.reset();
    let $this = this;
    let mouseMove = function (event) {
      event = event || window.event;
      event.preventDefault && event.preventDefault();
      $this.move(event.clientX - $this.x, event.clientY - $this.y);
      $this.moveHandler && $this.moveHandler(event.clientX - $this.x, event.clientY - $this.y);
    };
    let mouseUp = function (event) {
      $this.el.releaseCapture && $this.el.releaseCapture();
      $this.move(event.clientX - $this.x, event.clientY - $this.y);
      $this.container.removeEventListener('mousemove', mouseMove);
      $this.container.removeEventListener('mouseup', mouseUp);
      $this.stopHandler && $this.stopHandler(event.clientX - $this.x, event.clientY - $this.y);
    };
    let mouseDown = function (event) {
      event = event || window.event;
      event.preventDefault && event.preventDefault();
      $this.el.setCapture && $this.el.setCapture();
      $this.x = event.clientX - $this.el.offsetLeft;
      $this.y = event.clientY - $this.el.offsetTop;
      $this.container.addEventListener('mousemove', mouseMove);
      $this.container.addEventListener('mouseup', mouseUp);
      $this.startHandler && $this.startHandler();
    };
    this.el.addEventListener('mousedown', mouseDown);
  }

  maxTop() {
    return Math.max(this.container.clientHeight, this.container.scrollHeight) - this.el.offsetHeight;
  }

  maxLeft() {
    return Math.max(this.container.clientWidth, this.container.scrollWidth) - this.el.offsetWidth;
  }

  move(x, y) {
    if (!this.lockX && x > 0 && x < this.maxLeft()) {
      this.el.style.left = x + 'px';
    }
    if (!this.lockY && y > 0 && y < this.maxTop()) {
      this.el.style.top = y + 'px';
    }
  }

  onStart(startHandler) {
    this.startHandler = startHandler;
  }

  onMove(moveHandler) {
    this.moveHandler = moveHandler;
  }

  onStop(stopHandler) {
    this.stopHandler = stopHandler;
  }

  $(id) {
    return typeof id === 'string' ? document.querySelector(id) : id;
  }

  reset(left, top) {
    if (typeof left !== 'undefined') {
      this.el.style.left = left + 'px';
    }
    if (typeof top !== 'undefined') {
      this.el.style.top = top + 'px';
    }
    this.el.style.position = 'absolute';
    this.el.style.margin = '0'
  }
}
