import { includes, invert, startCase } from 'lodash';
import { GloomhavenIcon } from '../shared/icon/icon.enum';

export const gloomhavenIconRegex: RegExp = new RegExp(`\{\\s*(${Object.keys(GloomhavenIcon).join('|')})\\s*\}`, 'g');

// every other part is a string or an icon, always starting and ending with a string (even if blank)
export type ExplodedPart = string | GloomhavenIcon;

export const InvertedGloomhavenIcon = invert(GloomhavenIcon);

const necessaryForClarity: string[] = [
  InvertedGloomhavenIcon[GloomhavenIcon.ConsumeAir],
  InvertedGloomhavenIcon[GloomhavenIcon.ConsumeFire],
  InvertedGloomhavenIcon[GloomhavenIcon.ConsumeEarth],
  InvertedGloomhavenIcon[GloomhavenIcon.ConsumeIce],
  InvertedGloomhavenIcon[GloomhavenIcon.ConsumeLight],
  InvertedGloomhavenIcon[GloomhavenIcon.ConsumeDark],
];

const needRemapping: { [key: string]: string } = {
  [InvertedGloomhavenIcon[GloomhavenIcon.SmallItem]]: 'small',
};

// attempts to remove icon code while keeping it readable
export function cleanIconCode(str: string): string {
  return explodeStringWithIcons(str)
    .map((icon: GloomhavenIcon, index) => {
      if (!(index % 2)) {
        // icon is actually a string
        return icon;
      }

      if (includes(necessaryForClarity, icon)) {
        return startCase(icon).toLowerCase();
      }

      if (needRemapping[icon]) {
        return needRemapping[icon];
      }

      // most appear to be redundant, so that's the default
      return '';
    })
    .join('')
    .replace(/ +/g, ' ');
}

export function explodeStringWithIcons(str: string): ExplodedPart[] {
  return (str || '').split(gloomhavenIconRegex);
}
