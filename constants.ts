
import { Wallpaper, NavItem, WallpaperCollection } from './types';
import { HomeIcon, InformationCircleIcon, CodeBracketIcon, CollectionIcon as NavCollectionIcon, TagIcon } from './components/Icons'; // Renamed CollectionIcon to avoid conflict

export const APP_TITLE = "ArtScapes AI";

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', path: '/', icon: HomeIcon },
  { label: 'Collections', path: '/collections-overview', icon: NavCollectionIcon },
  { label: 'Browse Tags', path: '/tags', icon: TagIcon }, // New link for tags page
  { label: 'About', path: '/about', icon: InformationCircleIcon },
  { label: 'GitHub', path: 'https://github.com/svijaykoushik/artscapes-ai/', icon: CodeBracketIcon },
];

export const WALLPAPERS: Wallpaper[] = [
  {
    id: '1',
    title: 'Cosmic Reef',
    theme: 'Abstract Space',
    resolution: '3840x2160',
    thumbnailUrl: 'https://picsum.photos/seed/cosmicreef/400/300',
    fullUrl: 'https://picsum.photos/seed/cosmicreef/1920/1080',
    altText: 'Vibrant abstract depiction of a cosmic reef with swirling nebulae and distant stars.',
    tags: ['Space', 'Abstract', 'Nebula', 'Colorful', '4K'],
    dateAdded: '2024-05-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Cybernetic Bloom',
    theme: 'Cyberpunk Nature',
    resolution: '2560x1440',
    thumbnailUrl: 'https://picsum.photos/seed/cyberbloom/400/250',
    fullUrl: 'https://picsum.photos/seed/cyberbloom/1280/720',
    altText: 'A metallic flower with glowing circuits blooming in a neon-lit cyberpunk city.',
    tags: ['Cyberpunk', 'Nature', 'Sci-Fi', 'Neon', 'Flower'],
    dateAdded: '2024-05-05T12:30:00Z',
  },
  {
    id: '3',
    title: 'Serene Valley',
    theme: 'Fantasy Landscape',
    resolution: '3440x1440',
    thumbnailUrl: 'https://picsum.photos/seed/serenevalley/400/200',
    fullUrl: 'https://picsum.photos/seed/serenevalley/1720/720',
    altText: 'A breathtaking fantasy valley with floating islands and a crystal-clear river under a pastel sky.',
    tags: ['Fantasy', 'Landscape', 'Pastel', 'River', 'Ultrawide'],
    dateAdded: '2024-04-20T15:00:00Z',
  },
  {
    id: '4',
    title: 'Neon Grid Runner',
    theme: 'Retro Sci-Fi',
    resolution: '1080x1920',
    thumbnailUrl: 'https://picsum.photos/seed/neongrid/300/400',
    fullUrl: 'https://picsum.photos/seed/neongrid/1080/1920',
    altText: 'A silhouette running across a glowing neon grid, reminiscent of 80s sci-fi movies, in portrait orientation.',
    tags: ['Retro', 'Sci-Fi', 'Neon', '80s', 'Portrait', 'Mobile'],
    dateAdded: '2024-05-10T08:00:00Z',
  },
  {
    id: '5',
    title: 'Enchanted Forest Path',
    theme: 'Mystical Nature',
    resolution: '2048x1536',
    thumbnailUrl: 'https://picsum.photos/seed/enchantedforest/400/350',
    fullUrl: 'https://picsum.photos/seed/enchantedforest/1024/768',
    altText: 'A winding path through an enchanted forest with bioluminescent plants and ancient trees.',
    tags: ['Mystical', 'Nature', 'Forest', 'Bioluminescent', 'Path'],
    dateAdded: '2024-04-15T11:00:00Z',
  },
  {
    id: '6',
    title: 'Steampunk Metropolis',
    theme: 'Steampunk Cityscape',
    resolution: '3000x2000',
    thumbnailUrl: 'https://picsum.photos/seed/steampunkcity/400/280',
    fullUrl: 'https://picsum.photos/seed/steampunkcity/1500/1000',
    altText: 'A sprawling steampunk city with intricate clockwork mechanisms and airships.',
    tags: ['Steampunk', 'Cityscape', 'Clockwork', 'Airship', 'Industrial'],
    dateAdded: '2024-05-12T14:00:00Z',
  },
   {
    id: '7',
    title: 'Quantum Entanglement',
    theme: 'Abstract Physics',
    resolution: '2778x1284',
    thumbnailUrl: 'https://picsum.photos/seed/quantum/400/185',
    fullUrl: 'https://picsum.photos/seed/quantum/1389/642',
    altText: 'Abstract representation of quantum entanglement with interconnected light particles.',
    tags: ['Abstract', 'Physics', 'Quantum', 'Particles', 'Light'],
    dateAdded: '2024-03-25T09:20:00Z',
  },
  {
    id: '8',
    title: 'Desert Mirage',
    theme: 'Surreal Landscape',
    resolution: '3840x1600',
    thumbnailUrl: 'https://picsum.photos/seed/desertmirage/400/166',
    fullUrl: 'https://picsum.photos/seed/desertmirage/1920/800',
    altText: 'A surreal desert landscape with floating geometric shapes and an oasis mirage.',
    tags: ['Surreal', 'Landscape', 'Desert', 'Geometric', 'Oasis', 'Ultrawide'],
    dateAdded: '2024-04-01T18:00:00Z',
  },
  {
    id: '9',
    title: 'Oceanic Depths',
    theme: 'Underwater Fantasy',
    resolution: '2560x1600',
    thumbnailUrl: 'https://picsum.photos/seed/oceanicdepths/350/300',
    fullUrl: 'https://picsum.photos/seed/oceanicdepths/1280/800',
    altText: 'Mysterious underwater scene with glowing creatures and ancient ruins in the deep ocean.',
    tags: ['Underwater', 'Fantasy', 'Ocean', 'Ruins', 'Glowing'],
    dateAdded: '2024-03-10T13:10:00Z',
  },
  {
    id: '10',
    title: 'Galactic Voyager',
    theme: 'Space Exploration',
    resolution: '5120x2880',
    thumbnailUrl: 'https://picsum.photos/seed/voyager/400/225',
    fullUrl: 'https://picsum.photos/seed/voyager/2560/1440',
    altText: 'A lone spaceship voyaging through a colorful galaxy filled with stars and nebulae.',
    tags: ['Space', 'Exploration', 'Galaxy', 'Stars', 'Spaceship', '5K'],
    dateAdded: '2024-05-15T10:00:00Z',
  },
  {
    id: '11',
    title: 'Vertical Dreams',
    theme: 'Abstract Portrait',
    resolution: '1080x1920',
    thumbnailUrl: 'https://picsum.photos/seed/verticaldream/300/533',
    fullUrl: 'https://picsum.photos/seed/verticaldream/1080/1920',
    altText: 'A dreamy abstract artwork in portrait orientation with flowing colors.',
    tags: ['Abstract', 'Portrait', 'Mobile', 'Colorful', 'Dreamy'],
    dateAdded: '2024-02-20T16:45:00Z',
  },
  {
    id: '12',
    title: 'Cityscape Horizon',
    theme: 'Urban Ultrawide',
    resolution: '3440x1440',
    thumbnailUrl: 'https://picsum.photos/seed/cityhorizon/600/250',
    fullUrl: 'https://picsum.photos/seed/cityhorizon/3440/1440',
    altText: 'An ultrawide panoramic view of a futuristic city skyline at dusk.',
    tags: ['Urban', 'Ultrawide', 'Cityscape', 'Futuristic', 'Dusk'],
    dateAdded: '2024-01-30T19:00:00Z',
  },
  {
    id: '13',
    title: 'Nature\'s Pillar',
    theme: 'Nature Portrait',
    resolution: '1440x2560',
    thumbnailUrl: 'https://picsum.photos/seed/naturepillar/300/533',
    fullUrl: 'https://picsum.photos/seed/naturepillar/1440/2560',
    altText: 'A tall, majestic tree standing as a pillar in a lush forest, portrait view.',
    tags: ['Nature', 'Portrait', 'Mobile', 'Forest', 'Tree', 'Lush'],
    dateAdded: '2024-02-10T09:30:00Z',
  },
  {
    id: '14',
    title: 'Digital Expanse',
    theme: 'Sci-Fi Wide',
    resolution: '2560x1080',
    thumbnailUrl: 'https://picsum.photos/seed/digitalexpanse/500/211',
    fullUrl: 'https://picsum.photos/seed/digitalexpanse/2560/1080',
    altText: 'A wide digital landscape with flowing data streams and geometric patterns.',
    tags: ['Sci-Fi', 'Wide', 'Digital', 'Data', 'Geometric'],
    dateAdded: '2024-01-15T14:20:00Z',
  },
  {
    id: '15',
    title: 'Mountain\'s Peak',
    theme: 'Landscape Wide',
    resolution: '1920x1080',
    thumbnailUrl: 'https://picsum.photos/seed/mountainpeak/500/281',
    fullUrl: 'https://picsum.photos/seed/mountainpeak/1920/1080',
    altText: 'A snow-capped mountain peak under a clear blue sky, wide aspect ratio.',
    tags: ['Landscape', 'Wide', 'Mountain', 'Snow', 'Sky', 'HD'],
    dateAdded: '2023-12-25T10:00:00Z',
  },
  {
    id: '16',
    title: 'Cosmic Filament',
    theme: 'Space Ultrawide',
    resolution: '5120x1440',
    thumbnailUrl: 'https://picsum.photos/seed/cosmicfilament/600/168',
    fullUrl: 'https://picsum.photos/seed/cosmicfilament/5120/1440',
    altText: 'An ultrawide view of a vast cosmic filament stretching across space.',
    tags: ['Space', 'Ultrawide', 'Cosmic', 'Filament', 'Vast', '5K'],
    dateAdded: '2024-05-20T11:50:00Z',
  }
];


export const WALLPAPER_COLLECTIONS: WallpaperCollection[] = [
  {
    id: 'col1',
    name: 'Cosmic Wonders',
    slug: 'cosmic-wonders',
    description: 'Explore the vastness of space, distant nebulae, and breathtaking galactic phenomena with these stunning cosmic-themed wallpapers.',
    coverWallpaperId: '1', // Cosmic Reef
    wallpaperIds: ['1', '7', '10', '16'],
    tags: ['Space', 'Galaxy', 'Exploration', 'Abstract'],
    zipUrl: 'https://example.com/zips/cosmic_wonders.zip', // Placeholder
    zipSizeMB: 42, // Placeholder
  },
  {
    id: 'col2',
    name: 'Cyberpunk Visions',
    slug: 'cyberpunk-visions',
    description: 'Dive into futuristic cityscapes, neon-lit alleys, and advanced technological aesthetics. Perfect for a cutting-edge desktop.',
    coverWallpaperId: '2', // Cybernetic Bloom
    wallpaperIds: ['2', '4', '14'],
    tags: ['Cyberpunk', 'Sci-Fi', 'Futuristic', 'Neon', 'Urban'],
    zipUrl: 'https://example.com/zips/cyberpunk_visions.zip', // Placeholder
    zipSizeMB: 28, // Placeholder
  },
  {
    id: 'col3',
    name: 'Enchanted Realms',
    slug: 'enchanted-realms',
    description: 'Journey through mystical forests, serene valleys, and fantasy landscapes that spark the imagination.',
    coverWallpaperId: '5', // Enchanted Forest Path
    wallpaperIds: ['3', '5', '9'],
    tags: ['Fantasy', 'Mystical', 'Nature', 'Landscape'],
    zipUrl: 'https://example.com/zips/enchanted_realms.zip', // Placeholder
    zipSizeMB: 35, // Placeholder
  },
  {
    id: 'col4',
    name: 'Portrait Perspectives',
    slug: 'portrait-perspectives',
    description: 'A collection of vertically oriented wallpapers, perfect for mobile devices or unique desktop setups.',
    coverWallpaperId: '11', // Vertical Dreams
    wallpaperIds: ['4', '11', '13'],
    tags: ['Portrait', 'Mobile', 'Vertical'],
    zipUrl: 'https://example.com/zips/portrait_perspectives.zip', // Placeholder
    zipSizeMB: 15, // Placeholder
  }
];
