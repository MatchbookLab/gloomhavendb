interface Position {
  top: number;
  left: number;
}

export interface MapLocation {
  id: number;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
  position: Position;
  number: Position;
  checkbox: Position;
}

export const MAP_URL = '/assets/cards/world-map/gloomhaven-map.png';

// scale: 0.79
export const mapLocations: MapLocation[] = [
  {
    id: 1,
    imageUrl: '/assets/cards/world-map/1-alt.png',
    name: 'Black Barrow',
    position: {
      left: 45.1,
      top: 41.225,
    },
    number: {
      left: 172,
      top: 109,
    },
    checkbox: {
      left: 108,
      top: 169,
    },
    width: 347,
    height: 260,
  },
  {
    id: 2,
    imageUrl: '/assets/cards/world-map/2-alt.png',
    name: 'Barrow Lair',
    position: {
      left: 49.25,
      top: 40.725,
    },
    number: {
      left: 79,
      top: 161,
    },
    checkbox: {
      left: 130,
      top: 83,
    },
    width: 358,
    height: 241,
  },
  {
    id: 3,
    imageUrl: '/assets/cards/world-map/3.png',
    name: 'Inox Encampment',
    position: {
      left: 13.95,
      top: 42.85,
    },
    number: {
      left: 79,
      top: 155,
    },
    checkbox: {
      left: 148,
      top: 95,
    },
    width: 428,
    height: 282,
  },
  {
    id: 4,
    imageUrl: '/assets/cards/world-map/4.png',
    name: 'Crypt of the Damned',
    position: {
      left: 45.625,
      top: 32.65,
    },
    number: {
      left: 331,
      top: 169,
    },
    checkbox: {
      left: 101,
      top: 214,
    },
    width: 420,
    height: 299,
  },
  {
    id: 5,
    imageUrl: '/assets/cards/world-map/5.png',
    name: 'Ruinous Crypt',
    position: {
      left: 26.825,
      top: 28.95,
    },
    number: {
      left: 199,
      top: 82,
    },
    checkbox: {
      left: 111,
      top: 229,
    },
    width: 347,
    height: 311,
  },
  {
    id: 6,
    imageUrl: '/assets/cards/world-map/6.png',
    name: 'Decaying Crypt',
    position: {
      left: 41.9,
      top: 38.425,
    },
    number: {
      left: 290,
      top: 125,
    },
    checkbox: {
      left: 99,
      top: 167,
    },
    width: 371,
    height: 258,
  },
  {
    id: 7,
    imageUrl: '/assets/cards/world-map/7.png',
    name: 'Vibrant Grotto',
    position: {
      left: 54.975,
      top: 23.35,
    },
    number: {
      left: 162,
      top: 91,
    },
    checkbox: {
      left: 101,
      top: 205,
    },
    width: 352,
    height: 289,
  },
  {
    id: 8,
    imageUrl: '/assets/cards/world-map/8.png',
    name: 'Gloomhaven Warehouse',
    position: {
      left: 79.85,
      top: 21.825,
    },
    number: {
      left: 139,
      top: 179,
    },
    checkbox: {
      left: 95,
      top: 73,
    },
    width: 304,
    height: 258,
  },
  {
    id: 9,
    imageUrl: '/assets/cards/world-map/9.png',
    name: 'Diamond Mine',
    position: {
      left: 10.05,
      top: 65.4,
    },
    number: {
      left: 101,
      top: 151,
    },
    checkbox: {
      left: 136,
      top: 226,
    },
    width: 384,
    height: 331,
  },
  {
    id: 10,
    imageUrl: '/assets/cards/world-map/10.png',
    name: 'Plane of Elemental Power',
    position: {
      left: 29.625,
      top: 26.425,
    },
    number: {
      left: 181,
      top: 82,
    },
    checkbox: {
      left: 84,
      top: 216,
    },
    width: 362,
    height: 303,
  },
  {
    id: 11,
    imageUrl: '/assets/cards/world-map/11-12.png',
    name: 'Gloomhaven Square A',
    position: {
      left: 72.75,
      top: 18.975,
    },
    number: {
      left: 137,
      top: 142,
    },
    checkbox: {
      left: 168,
      top: 66,
    },
    width: 347,
    height: 297,
  },
  {
    id: 12,
    imageUrl: '/assets/cards/world-map/11-12.png',
    name: 'Gloomhaven Square B',
    position: {
      left: 72.75,
      top: 18.95,
    },
    number: {
      left: 219,
      top: 127,
    },
    checkbox: {
      left: 226,
      top: 64,
    },
    width: 347,
    height: 297,
  },
  {
    id: 13,
    imageUrl: '/assets/cards/world-map/13.png',
    name: 'Temple of the Seer',
    position: {
      left: 17.4,
      top: 76.775,
    },
    number: {
      left: 128,
      top: 89,
    },
    checkbox: {
      left: 110,
      top: 227,
    },
    width: 393,
    height: 330,
  },
  {
    id: 14,
    imageUrl: '/assets/cards/world-map/14.png',
    name: 'Frozen Hollow',
    position: {
      left: 45.125,
      top: 22.925,
    },
    number: {
      left: 150,
      top: 93,
    },
    checkbox: {
      left: 99,
      top: 198,
    },
    width: 340,
    height: 289,
  },
  {
    id: 15,
    imageUrl: '/assets/cards/world-map/15.png',
    name: 'Shrine of Strength',
    position: {
      left: 48.7,
      top: 20.75,
    },
    number: {
      left: 217,
      top: 85,
    },
    checkbox: {
      left: 100,
      top: 240,
    },
    width: 383,
    height: 334,
  },
  {
    id: 16,
    imageUrl: '/assets/cards/world-map/16.png',
    name: 'Mountain Pass',
    position: {
      left: 26.95,
      top: 22.525,
    },
    number: {
      left: 194,
      top: 86,
    },
    checkbox: {
      left: 88,
      top: 191,
    },
    width: 324,
    height: 286,
  },
  {
    id: 17,
    imageUrl: '/assets/cards/world-map/17.png',
    name: 'Lost Island',
    position: {
      left: 80.575,
      top: 56.175,
    },
    number: {
      left: 91,
      top: 228,
    },
    checkbox: {
      left: 200,
      top: 357,
    },
    width: 460,
    height: 445,
  },
  {
    id: 18,
    imageUrl: '/assets/cards/world-map/18.png',
    name: 'Abandoned Sewers',
    position: {
      left: 65.025,
      top: 23.975,
    },
    number: {
      left: 155,
      top: 148,
    },
    checkbox: {
      left: 100,
      top: 69,
    },
    width: 371,
    height: 225,
  },
  {
    id: 19,
    imageUrl: '/assets/cards/world-map/19.png',
    name: 'Forgotten Crypt',
    position: {
      left: 32.925,
      top: 68.725,
    },
    number: {
      left: 137,
      top: 98,
    },
    checkbox: {
      left: 107,
      top: 248,
    },
    width: 361,
    height: 329,
  },
  {
    id: 20,
    imageUrl: '/assets/cards/world-map/20.png',
    name: "Necromancer's Sanctum",
    position: {
      left: 56.3,
      top: 44.05,
    },
    number: {
      left: 271,
      top: 90,
    },
    checkbox: {
      left: 109,
      top: 212,
    },
    width: 404,
    height: 308,
  },
  {
    id: 21,
    imageUrl: '/assets/cards/world-map/21.png',
    name: 'Infernal Throne',
    position: {
      left: 32.575,
      top: 25.525,
    },
    number: {
      left: 80,
      top: 89,
    },
    checkbox: {
      left: 124,
      top: 204,
    },
    width: 366,
    height: 286,
  },
  {
    id: 22,
    imageUrl: '/assets/cards/world-map/22.png',
    name: 'Temple of the Elements',
    position: {
      left: 38.05,
      top: 60,
    },
    number: {
      left: 109,
      top: 90,
    },
    checkbox: {
      left: 107,
      top: 212,
    },
    width: 396,
    height: 304,
  },
  {
    id: 23,
    imageUrl: '/assets/cards/world-map/23.png',
    name: 'Deep Ruins',
    position: {
      left: 69.875,
      top: 23.275,
    },
    number: {
      left: 79,
      top: 74,
    },
    checkbox: {
      left: 98,
      top: 186,
    },
    width: 305,
    height: 262,
  },
  {
    id: 24,
    imageUrl: '/assets/cards/world-map/24.png',
    name: 'Echo Chamber',
    position: {
      left: 23.65,
      top: 23.175,
    },
    number: {
      left: 218,
      top: 90,
    },
    checkbox: {
      left: 90,
      top: 228,
    },
    width: 313,
    height: 326,
  },
  {
    id: 25,
    imageUrl: '/assets/cards/world-map/25.png',
    name: 'Icecrag Ascent',
    position: {
      left: 19.85,
      top: 17.725,
    },
    number: {
      left: 168,
      top: 126,
    },
    checkbox: {
      left: 116,
      top: 254,
    },
    width: 369,
    height: 354,
  },
  {
    id: 26,
    imageUrl: '/assets/cards/world-map/26.png',
    name: 'Ancient Cistern',
    position: {
      left: 70,
      top: 26.025,
    },
    number: {
      left: 74,
      top: 86,
    },
    checkbox: {
      left: 102,
      top: 175,
    },
    width: 336,
    height: 252,
  },
  {
    id: 27,
    imageUrl: '/assets/cards/world-map/27.png',
    name: 'Ruinous Rift',
    position: {
      left: 27.775,
      top: 32.075,
    },
    number: {
      left: 80,
      top: 96,
    },
    checkbox: {
      left: 116,
      top: 113,
    },
    width: 341,
    height: 195,
  },
  {
    id: 28,
    imageUrl: '/assets/cards/world-map/28.png',
    name: 'Outer Ritual Chamber',
    position: {
      left: 17.35,
      top: 33.35,
    },
    number: {
      left: 78,
      top: 97,
    },
    checkbox: {
      left: 103,
      top: 194,
    },
    width: 396,
    height: 280,
  },
  {
    id: 29,
    imageUrl: '/assets/cards/world-map/29.png',
    name: 'Sanctuary of Gloom',
    position: {
      left: 13.275,
      top: 33.8,
    },
    number: {
      left: 261,
      top: 84,
    },
    checkbox: {
      left: 100,
      top: 217,
    },
    width: 384,
    height: 298,
  },
  {
    id: 30,
    imageUrl: '/assets/cards/world-map/30.png',
    name: 'Shrine of the Depths',
    position: {
      left: 69.525,
      top: 72.5,
    },
    number: {
      left: 98,
      top: 111,
    },
    checkbox: {
      left: 120,
      top: 197,
    },
    width: 413,
    height: 287,
  },
  {
    id: 31,
    imageUrl: '/assets/cards/world-map/31.png',
    name: 'Plane of Night',
    position: {
      left: 72.8,
      top: 14.175,
    },
    number: {
      left: 148,
      top: 83,
    },
    checkbox: {
      left: 92,
      top: 195,
    },
    width: 312,
    height: 276,
  },
  {
    id: 32,
    imageUrl: '/assets/cards/world-map/32.png',
    name: 'Decrepit Wood',
    position: {
      left: 51.8,
      top: 63.05,
    },
    number: {
      left: 89,
      top: 96,
    },
    checkbox: {
      left: 119,
      top: 188,
    },
    width: 350,
    height: 275,
  },
  {
    id: 33,
    imageUrl: '/assets/cards/world-map/33.png',
    name: 'Savvas Armory',
    position: {
      left: 29.025,
      top: 15.325,
    },
    number: {
      left: 232,
      top: 211,
    },
    checkbox: {
      left: 90,
      top: 96,
    },
    width: 330,
    height: 297,
  },
  {
    id: 34,
    imageUrl: '/assets/cards/world-map/34.png',
    name: 'Scorched Summit',
    position: {
      left: 16.2,
      top: 14.525,
    },
    number: {
      left: 86,
      top: 170,
    },
    checkbox: {
      left: 110,
      top: 220,
    },
    width: 365,
    height: 310,
  },
  {
    id: 35,
    imageUrl: '/assets/cards/world-map/35-36.png',
    name: 'Gloomhaven Battlements A',
    position: {
      left: 64.125,
      top: 14.825,
    },
    number: {
      left: 164,
      top: 114,
    },
    checkbox: {
      left: 224,
      top: 256,
    },
    width: 392,
    height: 350,
  },
  {
    id: 36,
    imageUrl: '/assets/cards/world-map/35-36.png',
    name: 'Gloomhaven Battlements B',
    position: {
      left: 64.125,
      top: 14.85,
    },
    number: {
      left: 203,
      top: 224,
    },
    checkbox: {
      left: 274,
      top: 254,
    },
    width: 392,
    height: 350,
  },
  {
    id: 37,
    imageUrl: '/assets/cards/world-map/37.png',
    name: 'Doom Trench',
    position: {
      left: 81.525,
      top: 39.775,
    },
    number: {
      left: 93,
      top: 106,
    },
    checkbox: {
      left: 124,
      top: 191,
    },
    width: 457,
    height: 280,
  },
  {
    id: 38,
    imageUrl: '/assets/cards/world-map/38.png',
    name: 'Slave Pens',
    position: {
      left: 10.425,
      top: 42.525,
    },
    number: {
      left: 104,
      top: 119,
    },
    checkbox: {
      left: 107,
      top: 234,
    },
    width: 325,
    height: 327,
  },
  {
    id: 39,
    imageUrl: '/assets/cards/world-map/39.png',
    name: 'Treacherous Divide',
    position: {
      left: 47.6,
      top: 17.325,
    },
    number: {
      left: 131,
      top: 146,
    },
    checkbox: {
      left: 97,
      top: 189,
    },
    width: 388,
    height: 275,
  },
  {
    id: 40,
    imageUrl: '/assets/cards/world-map/40.png',
    name: 'Ancient Defense Network',
    position: {
      left: 54.275,
      top: 35.825,
    },
    number: {
      left: 111,
      top: 154,
    },
    checkbox: {
      left: 84,
      top: 209,
    },
    width: 370,
    height: 281,
  },
  {
    id: 41,
    imageUrl: '/assets/cards/world-map/41.png',
    name: 'Timeworn Tomb',
    position: {
      left: 58.35,
      top: 35.65,
    },
    number: {
      left: 76,
      top: 106,
    },
    checkbox: {
      left: 111,
      top: 173,
    },
    width: 366,
    height: 254,
  },
  {
    id: 42,
    imageUrl: '/assets/cards/world-map/42.png',
    name: 'Realm of the Voice',
    position: {
      left: 18.65,
      top: 22.925,
    },
    number: {
      left: 309,
      top: 171,
    },
    checkbox: {
      left: 129,
      top: 238,
    },
    width: 405,
    height: 327,
  },
  {
    id: 43,
    imageUrl: '/assets/cards/world-map/43.png',
    name: 'Drake Nest',
    position: {
      left: 14.325,
      top: 31,
    },
    number: {
      left: 264,
      top: 120,
    },
    checkbox: {
      left: 105,
      top: 91,
    },
    width: 339,
    height: 258,
  },
  {
    id: 44,
    imageUrl: '/assets/cards/world-map/44.png',
    name: 'Tribal Assault',
    position: {
      left: 14.975,
      top: 38.325,
    },
    number: {
      left: 88,
      top: 145,
    },
    checkbox: {
      left: 143,
      top: 95,
    },
    width: 430,
    height: 312,
  },
  {
    id: 45,
    imageUrl: '/assets/cards/world-map/45.png',
    name: 'Rebel Swamp',
    position: {
      left: 39.675,
      top: 66.825,
    },
    number: {
      left: 237,
      top: 162,
    },
    checkbox: {
      left: 109,
      top: 223,
    },
    width: 334,
    height: 329,
  },
  {
    id: 46,
    imageUrl: '/assets/cards/world-map/46.png',
    name: 'Nightmare Peak',
    position: {
      left: 47.45,
      top: 13,
    },
    number: {
      left: 273,
      top: 225,
    },
    checkbox: {
      left: 95,
      top: 277,
    },
    width: 365,
    height: 361,
  },
  {
    id: 47,
    imageUrl: '/assets/cards/world-map/47.png',
    name: 'Lair of the Unseeing Eye',
    position: {
      left: 81.975,
      top: 42.95,
    },
    number: {
      left: 257,
      top: 100,
    },
    checkbox: {
      left: 114,
      top: 269,
    },
    width: 447,
    height: 371,
  },
  {
    id: 48,
    imageUrl: '/assets/cards/world-map/48.png',
    name: 'Shadow Weald',
    position: {
      left: 5.65,
      top: 33.95,
    },
    number: {
      left: 125,
      top: 101,
    },
    checkbox: {
      left: 120,
      top: 241,
    },
    width: 378,
    height: 333,
  },
  {
    id: 49,
    imageUrl: '/assets/cards/world-map/49.png',
    name: "Rebel's Stand",
    position: {
      left: 33.1,
      top: 73.275,
    },
    number: {
      left: 167,
      top: 81,
    },
    checkbox: {
      left: 125,
      top: 223,
    },
    width: 371,
    height: 307,
  },
  {
    id: 50,
    imageUrl: '/assets/cards/world-map/50.png',
    name: 'Ghost Fortress',
    position: {
      left: 75.6,
      top: 19,
    },
    number: {
      left: 159,
      top: 192,
    },
    checkbox: {
      left: 92,
      top: 253,
    },
    width: 331,
    height: 326,
  },
  {
    id: 51,
    imageUrl: '/assets/cards/world-map/51.png',
    name: 'The Void',
    position: {
      left: 68.7,
      top: 14.45,
    },
    number: {
      left: 135,
      top: 124,
    },
    checkbox: {
      left: 88,
      top: 196,
    },
    width: 286,
    height: 285,
  },
  {
    id: 52,
    imageUrl: '/assets/cards/world-map/52.png',
    name: 'Noxious Cellar',
    position: {
      left: 62.425,
      top: 24.675,
    },
    number: {
      left: 230,
      top: 176,
    },
    checkbox: {
      left: 89,
      top: 94,
    },
    width: 314,
    height: 246,
  },
  {
    id: 53,
    imageUrl: '/assets/cards/world-map/53.png',
    name: 'Crypt Basement',
    position: {
      left: 49.375,
      top: 35.025,
    },
    number: {
      left: 83,
      top: 139,
    },
    checkbox: {
      left: 97,
      top: 174,
    },
    width: 348,
    height: 265,
  },
  {
    id: 54,
    imageUrl: '/assets/cards/world-map/54.png',
    name: 'Palace of Ice',
    position: {
      left: 38.5,
      top: 26.25,
    },
    number: {
      left: 82,
      top: 193,
    },
    checkbox: {
      left: 115,
      top: 269,
    },
    width: 335,
    height: 348,
  },
  {
    id: 55,
    imageUrl: '/assets/cards/world-map/55.png',
    name: 'Foggy Thicket',
    position: {
      left: 21.625,
      top: 42.575,
    },
    number: {
      left: 100,
      top: 92,
    },
    checkbox: {
      left: 101,
      top: 204,
    },
    width: 335,
    height: 293,
  },
  {
    id: 56,
    imageUrl: '/assets/cards/world-map/56.png',
    name: "Bandit's Wood",
    position: {
      left: 17.925,
      top: 43.9,
    },
    number: {
      left: 217,
      top: 92,
    },
    checkbox: {
      left: 110,
      top: 223,
    },
    width: 347,
    height: 311,
  },
  {
    id: 57,
    imageUrl: '/assets/cards/world-map/57.png',
    name: 'Investigation',
    position: {
      left: 62.775,
      top: 27.075,
    },
    number: {
      left: 299,
      top: 169,
    },
    checkbox: {
      left: 221,
      top: 211,
    },
    width: 446,
    height: 290,
  },
  {
    id: 58,
    imageUrl: '/assets/cards/world-map/58.png',
    name: 'Bloody Shack',
    position: {
      left: 68.85,
      top: 31.65,
    },
    number: {
      left: 110,
      top: 80,
    },
    checkbox: {
      left: 104,
      top: 145,
    },
    width: 333,
    height: 225,
  },
  {
    id: 59,
    imageUrl: '/assets/cards/world-map/59.png',
    name: 'Forgotten Grove',
    position: {
      left: 4.624999999999995,
      top: 39.07499999999994,
    },
    number: {
      left: 86,
      top: 140,
    },
    checkbox: {
      left: 129,
      top: 249,
    },
    width: 387,
    height: 338,
  },
  {
    id: 60,
    imageUrl: '/assets/cards/world-map/60.png',
    name: 'Alchemy Lab',
    position: {
      left: 68.6,
      top: 17.95,
    },
    number: {
      left: 140,
      top: 111,
    },
    checkbox: {
      left: 91,
      top: 171,
    },
    width: 311,
    height: 261,
  },
  {
    id: 61,
    imageUrl: '/assets/cards/world-map/61.png',
    name: 'Fading Lighthouse',
    position: {
      left: 53.3,
      top: 72.825,
    },
    number: {
      left: 137,
      top: 86,
    },
    checkbox: {
      left: 102,
      top: 214,
    },
    width: 377,
    height: 294,
  },
  {
    id: 62,
    imageUrl: '/assets/cards/world-map/62.png',
    name: 'Pit of Souls',
    position: {
      left: 54.275,
      top: 76.025,
    },
    number: {
      left: 95,
      top: 75,
    },
    checkbox: {
      left: 116,
      top: 196,
    },
    width: 327,
    height: 289,
  },
  {
    id: 63,
    imageUrl: '/assets/cards/world-map/63.png',
    name: 'Magma Pit',
    position: {
      left: 6.325,
      top: 71.7,
    },
    number: {
      left: 94,
      top: 141,
    },
    checkbox: {
      left: 143,
      top: 275,
    },
    width: 380,
    height: 363,
  },
  {
    id: 64,
    imageUrl: '/assets/cards/world-map/64.png',
    name: 'Underwater Lagoon',
    position: {
      left: 75.775,
      top: 57.1,
    },
    number: {
      left: 124,
      top: 83,
    },
    checkbox: {
      left: 103,
      top: 234,
    },
    width: 380,
    height: 327,
  },
  {
    id: 65,
    imageUrl: '/assets/cards/world-map/65.png',
    name: 'Sulfur Mine',
    position: {
      left: 23.05,
      top: 66.4,
    },
    number: {
      left: 251,
      top: 96,
    },
    checkbox: {
      left: 160,
      top: 259,
    },
    width: 405,
    height: 356,
  },
  {
    id: 66,
    imageUrl: '/assets/cards/world-map/66.png',
    name: 'Clockwork Cove',
    position: {
      left: 64.625,
      top: 41.075,
    },
    number: {
      left: 95,
      top: 157,
    },
    checkbox: {
      left: 144,
      top: 194,
    },
    width: 409,
    height: 294,
  },
  {
    id: 67,
    imageUrl: '/assets/cards/world-map/67.png',
    name: 'Arcane Library',
    position: {
      left: 9.55,
      top: 59.475,
    },
    number: {
      left: 112,
      top: 110,
    },
    checkbox: {
      left: 114,
      top: 207,
    },
    width: 370,
    height: 307,
  },
  {
    id: 68,
    imageUrl: '/assets/cards/world-map/68.png',
    name: 'Toxic Moor',
    position: {
      left: 39.2,
      top: 72.825,
    },
    number: {
      left: 88,
      top: 234,
    },
    checkbox: {
      left: 109,
      top: 301,
    },
    width: 336,
    height: 404,
  },
  {
    id: 69,
    imageUrl: '/assets/cards/world-map/69.png',
    name: 'Well of the Unfortunate',
    position: {
      left: 36.475,
      top: 35.675,
    },
    number: {
      left: 101,
      top: 188,
    },
    checkbox: {
      left: 99,
      top: 250,
    },
    width: 432,
    height: 341,
  },
  {
    id: 70,
    imageUrl: '/assets/cards/world-map/70.png',
    name: 'Chained Isle',
    position: {
      left: 76.075,
      top: 51.575,
    },
    number: {
      left: 240,
      top: 180,
    },
    checkbox: {
      left: 293,
      top: 119,
    },
    width: 572,
    height: 518,
  },
  {
    id: 71,
    imageUrl: '/assets/cards/world-map/71.png',
    name: 'Windswept Highlands',
    position: {
      left: 26.45,
      top: 62.5,
    },
    number: {
      left: 132,
      top: 109,
    },
    checkbox: {
      left: 137,
      top: 216,
    },
    width: 451,
    height: 303,
  },
  {
    id: 72,
    imageUrl: '/assets/cards/world-map/72.png',
    name: 'Oozing Grove',
    position: {
      left: 51.475,
      top: 44.4,
    },
    number: {
      left: 252,
      top: 136,
    },
    checkbox: {
      left: 111,
      top: 189,
    },
    width: 348,
    height: 278,
  },
  {
    id: 73,
    imageUrl: '/assets/cards/world-map/73.png',
    name: 'Rockslide Ridge',
    position: {
      left: 25.875,
      top: 72.925,
    },
    number: {
      left: 169,
      top: 108,
    },
    checkbox: {
      left: 109,
      top: 273,
    },
    width: 392,
    height: 376,
  },
  {
    id: 74,
    imageUrl: '/assets/cards/world-map/74.png',
    name: 'Merchant Ship',
    position: {
      left: 64.3,
      top: 50.825,
    },
    number: {
      left: 82,
      top: 109,
    },
    checkbox: {
      left: 153,
      top: 235,
    },
    width: 452,
    height: 320,
  },
  {
    id: 75,
    imageUrl: '/assets/cards/world-map/75.png',
    name: 'Overgrown Graveyard',
    position: {
      left: 57.75,
      top: 41.275,
    },
    number: {
      left: 79,
      top: 105,
    },
    checkbox: {
      left: 97,
      top: 155,
    },
    width: 383,
    height: 239,
  },
  {
    id: 76,
    imageUrl: '/assets/cards/world-map/76.png',
    name: 'Harrower Hive',
    position: {
      left: 16.95,
      top: 66,
    },
    number: {
      left: 84,
      top: 137,
    },
    checkbox: {
      left: 121,
      top: 208,
    },
    width: 405,
    height: 296,
  },
  {
    id: 77,
    imageUrl: '/assets/cards/world-map/77.png',
    name: 'Vault of Secrets',
    position: {
      left: 75.6,
      top: 15.5,
    },
    number: {
      left: 175,
      top: 158,
    },
    checkbox: {
      left: 90,
      top: 222,
    },
    width: 327,
    height: 306,
  },
  {
    id: 78,
    imageUrl: '/assets/cards/world-map/78.png',
    name: 'Sacrifice Pit',
    position: {
      left: 62.225,
      top: 18.2,
    },
    number: {
      left: 86,
      top: 119,
    },
    checkbox: {
      left: 103,
      top: 150,
    },
    width: 316,
    height: 230,
  },
  {
    id: 79,
    imageUrl: '/assets/cards/world-map/79.png',
    name: 'Lost Temple',
    position: {
      left: 57.15,
      top: 57.7,
    },
    number: {
      left: 90,
      top: 99,
    },
    checkbox: {
      left: 116,
      top: 159,
    },
    width: 328,
    height: 243,
  },
  {
    id: 80,
    imageUrl: '/assets/cards/world-map/80.png',
    name: 'Vigil Keep',
    position: {
      left: 5.275,
      top: 62.025,
    },
    number: {
      left: 90,
      top: 114,
    },
    checkbox: {
      left: 106,
      top: 221,
    },
    width: 326,
    height: 319,
  },
  {
    id: 81,
    imageUrl: '/assets/cards/world-map/81.png',
    name: 'Temple of the Eclipse',
    position: {
      left: 8.725,
      top: 29.35,
    },
    number: {
      left: 101,
      top: 119,
    },
    checkbox: {
      left: 104,
      top: 234,
    },
    width: 387,
    height: 316,
  },
  {
    id: 82,
    imageUrl: '/assets/cards/world-map/82.png',
    name: 'Burning Mountain',
    position: {
      left: 28.775,
      top: 70.25,
    },
    number: {
      left: 79,
      top: 198,
    },
    checkbox: {
      left: 119,
      top: 245,
    },
    width: 382,
    height: 332,
  },
  {
    id: 83,
    imageUrl: '/assets/cards/world-map/83.png',
    name: 'Shadows Within',
    position: {
      left: 65.85,
      top: 22.15,
    },
    number: {
      left: 225,
      top: 85,
    },
    checkbox: {
      left: 88,
      top: 126,
    },
    width: 377,
    height: 199,
  },
  {
    id: 84,
    imageUrl: '/assets/cards/world-map/84.png',
    name: 'Crystalline Cave',
    position: {
      left: 55.775,
      top: 28.7,
    },
    number: {
      left: 94,
      top: 102,
    },
    checkbox: {
      left: 105,
      top: 157,
    },
    width: 356,
    height: 244,
  },
  {
    id: 85,
    imageUrl: '/assets/cards/world-map/85.png',
    name: 'Sun Temple',
    position: {
      left: 17.6,
      top: 70.525,
    },
    number: {
      left: 91,
      top: 98,
    },
    checkbox: {
      left: 136,
      top: 187,
    },
    width: 361,
    height: 276,
  },
  {
    id: 86,
    imageUrl: '/assets/cards/world-map/86.png',
    name: 'Harried Village',
    position: {
      left: 67.1,
      top: 29.025,
    },
    number: {
      left: 266,
      top: 83,
    },
    checkbox: {
      left: 96,
      top: 154,
    },
    width: 346,
    height: 232,
  },
  {
    id: 87,
    imageUrl: '/assets/cards/world-map/87.png',
    name: 'Corrupted Cove',
    position: {
      left: 43.55,
      top: 52.675,
    },
    number: {
      left: 104,
      top: 91,
    },
    checkbox: {
      left: 114,
      top: 207,
    },
    width: 369,
    height: 303,
  },
  {
    id: 88,
    imageUrl: '/assets/cards/world-map/88.png',
    name: 'Plane of Water',
    position: {
      left: 74.45,
      top: 26.05,
    },
    number: {
      left: 85,
      top: 100,
    },
    checkbox: {
      left: 124,
      top: 189,
    },
    width: 369,
    height: 279,
  },
  {
    id: 89,
    imageUrl: '/assets/cards/world-map/89.png',
    name: 'Syndicate Hideout',
    position: {
      left: 76.025,
      top: 22.675,
    },
    number: {
      left: 124,
      top: 116,
    },
    checkbox: {
      left: 84,
      top: 67,
    },
    width: 333,
    height: 208,
  },
  {
    id: 90,
    imageUrl: '/assets/cards/world-map/90.png',
    name: 'Demonic Rift',
    position: {
      left: 32.8,
      top: 55.7,
    },
    number: {
      left: 87,
      top: 201,
    },
    checkbox: {
      left: 135,
      top: 245,
    },
    width: 388,
    height: 339,
  },
  {
    id: 91,
    imageUrl: '/assets/cards/world-map/91.png',
    name: 'Wild Melee',
    position: {
      left: 9.8,
      top: 33.05,
    },
    number: {
      left: 86,
      top: 90,
    },
    checkbox: {
      left: 135,
      top: 177,
    },
    width: 341,
    height: 265,
  },
  {
    id: 92,
    imageUrl: '/assets/cards/world-map/92.png',
    name: 'Back Alley Brawl',
    position: {
      left: 63.525,
      top: 21.225,
    },
    number: {
      left: 142,
      top: 99,
    },
    checkbox: {
      left: 96,
      top: 136,
    },
    width: 345,
    height: 217,
  },
  {
    id: 93,
    imageUrl: '/assets/cards/world-map/93.png',
    name: 'Sunken Vessel',
    position: {
      left: 76.675,
      top: 71.95,
    },
    number: {
      left: 210,
      top: 98,
    },
    checkbox: {
      left: 250,
      top: 261,
    },
    width: 491,
    height: 441,
  },
  {
    id: 94,
    imageUrl: '/assets/cards/world-map/94.png',
    name: 'Vermling Nest',
    position: {
      left: 53.1,
      top: 38.925,
    },
    number: {
      left: 95,
      top: 116,
    },
    checkbox: {
      left: 91,
      top: 67,
    },
    width: 326,
    height: 244,
  },
  {
    id: 95,
    imageUrl: '/assets/cards/world-map/95.png',
    name: 'Payment Due',
    position: {
      left: 56.125,
      top: 38.825,
    },
    number: {
      left: 145,
      top: 100,
    },
    checkbox: {
      left: 96,
      top: 203,
    },
    width: 315,
    height: 279,
  },
];
