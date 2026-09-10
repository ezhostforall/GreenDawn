export interface ResponsiveImageSource {
  src: string;
  width: number;
}

export interface ResponsiveImageAsset {
  sources: readonly ResponsiveImageSource[];
  width: number;
  height: number;
  objectPosition?: string;
  mobileObjectPosition?: string;
}
