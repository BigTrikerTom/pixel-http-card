var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './styles';
let PixelHttpCard = (() => {
    let _classDecorators = [customElement('pixel-http-card')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = LitElement;
    let _hass_decorators;
    let _hass_initializers = [];
    let _hass_extraInitializers = [];
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _framebuffer_decorators;
    let _framebuffer_initializers = [];
    let _framebuffer_extraInitializers = [];
    var PixelHttpCard = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _hass_decorators = [property({ attribute: false })];
            _config_decorators = [state()];
            _framebuffer_decorators = [state()];
            __esDecorate(null, null, _hass_decorators, { kind: "field", name: "hass", static: false, private: false, access: { has: obj => "hass" in obj, get: obj => obj.hass, set: (obj, value) => { obj.hass = value; } }, metadata: _metadata }, _hass_initializers, _hass_extraInitializers);
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _framebuffer_decorators, { kind: "field", name: "framebuffer", static: false, private: false, access: { has: obj => "framebuffer" in obj, get: obj => obj.framebuffer, set: (obj, value) => { obj.framebuffer = value; } }, metadata: _metadata }, _framebuffer_initializers, _framebuffer_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PixelHttpCard = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static styles = styles;
        hass = __runInitializers(this, _hass_initializers, void 0);
        config = (__runInitializers(this, _hass_extraInitializers), __runInitializers(this, _config_initializers, {}));
        framebuffer = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _framebuffer_initializers, []));
        timer = __runInitializers(this, _framebuffer_extraInitializers);
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
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return PixelHttpCard = _classThis;
})();
export { PixelHttpCard };
//# sourceMappingURL=pixel-http-card.js.map