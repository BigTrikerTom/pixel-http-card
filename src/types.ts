export interface Pixel {
r: number;
g: number;
b: number;
}


export type Framebuffer = Pixel[];


export interface PixelHttpCardConfig {
type: string;
name?: string;
host: string;
port?: number;
poll_interval?: number;
layout?: 'linear' | 'grid';
columns?: number;
pixel_size?: number;
pixel_gap?: number;
}