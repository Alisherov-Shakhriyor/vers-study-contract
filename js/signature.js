/**
 * Signature Canvas Engine for VERS STUDY Contracts
 * High-performance mobile-first touch & mouse signature pad with smooth interpolation
 */

class SignaturePad {
  /**
   * @param {HTMLCanvasElement} canvas 
   * @param {Object} options 
   */
  constructor(canvas, options = {}) {
    if (!canvas) throw new Error("Canvas element is required.");
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = Object.assign({
      penColor: '#0F2B66', // Deep legal navy blue ink
      lineWidth: 2.8,
      minWidth: 1.5,
      maxWidth: 3.5,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      onBegin: null,
      onEnd: null
    }, options);

    this.isDrawing = false;
    this.points = [];
    this.hasDrawn = false;
    this._pixelRatio = window.devicePixelRatio || 1;

    this._bindEvents();
    this.resizeCanvas();
  }

  /**
   * High-DPI (Retina) ekranlar uchun canvas o'lchamini to'g'irlash
   */
  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width || 360;
    const height = rect.height || 180;

    this._pixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = width * this._pixelRatio;
    this.canvas.height = height * this._pixelRatio;

    this.ctx.scale(this._pixelRatio, this._pixelRatio);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.options.penColor;
    this.ctx.lineWidth = this.options.lineWidth;

    if (!this.hasDrawn) {
      this.clear();
    }
  }

  _bindEvents() {
    // Touch scrolling to'sqinligini olish
    this.canvas.style.touchAction = 'none';

    // Pointer events (handles Mouse, Pen, Touch seamlessly)
    this.canvas.addEventListener('pointerdown', this._handlePointerDown.bind(this));
    window.addEventListener('pointermove', this._handlePointerMove.bind(this));
    window.addEventListener('pointerup', this._handlePointerUp.bind(this));
    window.addEventListener('pointercancel', this._handlePointerUp.bind(this));

    // Ekran o'zgarganda qayta masshtablash
    window.addEventListener('resize', () => {
      // Agar hali imzo bo'lmasa o'lchamni yangilash
      if (!this.hasDrawn) {
        this.resizeCanvas();
      }
    });
  }

  _getCoordinates(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      pressure: event.pressure || 0.5
    };
  }

  _handlePointerDown(event) {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    this.isDrawing = true;
    this.canvas.setPointerCapture(event.pointerId);

    const pt = this._getCoordinates(event);
    this.points = [pt];
    this.hasDrawn = true;

    this.ctx.beginPath();
    this.ctx.moveTo(pt.x, pt.y);

    if (typeof this.options.onBegin === 'function') {
      this.options.onBegin();
    }
  }

  _handlePointerMove(event) {
    if (!this.isDrawing) return;
    event.preventDefault();

    const pt = this._getCoordinates(event);
    this.points.push(pt);

    if (this.points.length >= 3) {
      const p1 = this.points[this.points.length - 2];
      const p2 = this.points[this.points.length - 1];
      const midPoint = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
      };

      this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      this.ctx.stroke();
    } else {
      this.ctx.lineTo(pt.x, pt.y);
      this.ctx.stroke();
    }
  }

  _handlePointerUp(event) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    try {
      this.canvas.releasePointerCapture(event.pointerId);
    } catch (e) {}

    if (this.points.length === 1) {
      // Nuqta qo'yilgan holat
      const pt = this.points[0];
      this.ctx.arc(pt.x, pt.y, this.options.lineWidth / 2, 0, Math.PI * 2);
      this.ctx.fillStyle = this.options.penColor;
      this.ctx.fill();
    }

    this.points = [];

    if (typeof this.options.onEnd === 'function') {
      this.options.onEnd();
    }
  }

  /**
   * Canvasni tozalash
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width / this._pixelRatio, this.canvas.height / this._pixelRatio);
    this.hasDrawn = false;
    this.points = [];
  }

  /**
   * Imzo bo'shmi yoki yo'qmi tekshirish
   */
  isEmpty() {
    return !this.hasDrawn;
  }

  /**
   * Shaffof PNG Data URL sifatida eksport qilish
   * @returns {string} data:image/png;base64,...
   */
  toDataURL(type = 'image/png') {
    if (this.isEmpty()) return null;
    return this.canvas.toDataURL(type);
  }

  /**
   * Joriy mahalliy sana va vaqtni formatlash (YYYY-MM-DD va HH:mm)
   */
  static getTimestamp() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');

    const timeStr = now.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    return {
      date: dateStr,
      time: timeStr,
      fullISO: now.toISOString()
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SignaturePad;
} else {
  window.SignaturePad = SignaturePad;
}
