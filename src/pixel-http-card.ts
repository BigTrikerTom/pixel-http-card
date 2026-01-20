export const CARD_VERSION = 'v.1.0.0-Beta-2';  // Versionskonstante für HACS / UI-Abfrage
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './styles';
import type { Framebuffer, PixelHttpCardConfig } from './types';

@customElement('pixel-http-card')
export class PixelHttpCard extends LitElement {
  static styles = styles;

  @property({ attribute: false })
  public hass: any;

  @state()
  private config: Partial<PixelHttpCardConfig> = {};

  @state()
  private framebuffer: Framebuffer = [];

  private timer?: number;

  setConfig(config: PixelHttpCardConfig) {
    if (!config.host) throw new Error('host is required');

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
    if (this.timer) clearInterval(this.timer);
    super.disconnectedCallback();
  }

  private startPolling() {
    if (this.timer) clearInterval(this.timer);
    this.fetchPixels();
    this.timer = window.setInterval(() => this.fetchPixels(), this.config.poll_interval);
  }

  private async fetchPixels() {
    try {
      const url = `http://${this.config.host}:${this.config.port}/pixels`;
      const resp = await fetch(url, { cache: 'no-store' });
      if (!resp.ok) return;
      this.framebuffer = await resp.json();
    } catch (err) {
      console.warn('pixel-http-card fetch failed', err);
    }
  }

  render() {
    const size = this.config.pixel_size ?? 10;
    const gap = this.config.pixel_gap ?? 2;

    const gridStyle = this.config.layout === 'grid'
      ? `display:grid; grid-template-columns: repeat(${this.config.columns ?? 16}, ${size}px); gap:${gap}px;`
      : `display:flex; flex-wrap:wrap; gap:${gap}px;`;

    return html`
      <ha-card header=${this.config.name ?? ''}>
        <div class="card">
          <div class="pixels ${this.config.layout}" style="${gridStyle}">
            ${this.framebuffer.map(p => html`
              <div class="pixel" style="width:${size}px; height:${size}px; background-color: rgb(${p.r},${p.g},${p.b});"></div>
            `)}
          </div>
        </div>
      </ha-card>
    `;
  }
}