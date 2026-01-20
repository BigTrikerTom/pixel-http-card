var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './styles';
let PixelHttpCard = class PixelHttpCard extends LitElement {
    constructor() {
        super(...arguments);
        this.config = {};
        this.framebuffer = [];
    }
    static { this.styles = styles; }
    setConfig(config) {
        if (!config.host)
            throw new Error('host is required');
        this.config = {
            port: 80,
            poll_interval: 500,
            layout: 'linear',
            pixel_size: 10,
            pixel_gap: 2,
            columns: 16,
            ...config
        };
        this.startPolling();
    }
    disconnectedCallback() {
        if (this.timer)
            clearInterval(this.timer);
        super.disconnectedCallback();
    }
    startPolling() {
        if (this.timer)
            clearInterval(this.timer);
        this.fetchPixels();
        this.timer = window.setInterval(() => this.fetchPixels(), this.config.poll_interval);
    }
    async fetchPixels() {
        try {
            const url = `http://${this.config.host}:${this.config.port}/pixels`;
            const resp = await fetch(url, { cache: 'no-store' });
            if (!resp.ok)
                return;
            this.framebuffer = await resp.json();
        }
        catch (err) {
            console.warn('pixel-http-card fetch failed', err);
        }
    }
    render() {
        const size = this.config.pixel_size ?? 10;
        const gap = this.config.pixel_gap ?? 2;
        const gridStyle = this.config.layout === 'grid'
            ? `display:grid; grid-template-columns: repeat(${this.config.columns ?? 16}, ${size}px); gap:${gap}px;`
            : `display:flex; flex-wrap:wrap; gap:${gap}px;`;
        return html `
      <ha-card header=${this.config.name ?? ''}>
        <div class="card">
          <div class="pixels ${this.config.layout}" style="${gridStyle}">
            ${this.framebuffer.map(p => html `
              <div class="pixel" style="width:${size}px; height:${size}px; background-color: rgb(${p.r},${p.g},${p.b});"></div>
            `)}
          </div>
        </div>
      </ha-card>
    `;
    }
};
__decorate([
    property({ attribute: false })
], PixelHttpCard.prototype, "hass", void 0);
__decorate([
    state()
], PixelHttpCard.prototype, "config", void 0);
__decorate([
    state()
], PixelHttpCard.prototype, "framebuffer", void 0);
PixelHttpCard = __decorate([
    customElement('pixel-http-card')
], PixelHttpCard);
export { PixelHttpCard };
//# sourceMappingURL=pixel-http-card.js.map