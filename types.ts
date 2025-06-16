
export interface Wallpaper {
  id: string;
  title: string;
  theme: string; // Represents a primary theme, can also be part of tags
  resolution: string;
  thumbnailUrl: string;
  fullUrl: string;
  altText: string;
  tags?: string[];
  dateAdded?: string; // ISO 8601 date string
}

export interface NavItem {
  label: string;
  path: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}

export interface WallpaperCollection {
  id: string;
  name: string;
  description: string;
  slug: string; // URL-friendly identifier
  coverWallpaperId: string; // ID of one of the wallpapers to use as a cover
  wallpaperIds: string[];
  tags?: string[];
  zipUrl?: string; // Optional URL for downloading the entire collection as a zip
  zipSizeMB?: number; // Optional size of the zip file in MB
}
