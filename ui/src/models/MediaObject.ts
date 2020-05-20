export interface MediaObject {
  name: string;
  path?: string;
  id: number | string;
  visible?: boolean;
  thumbnailSize?: ThumbnailSize;
  noTitle?: boolean;
  noLabel?: boolean;
}

export enum ThumbnailSize {
  small = "SMALL",
  large = "LARGE"
};
