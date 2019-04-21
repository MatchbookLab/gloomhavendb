// template string tags
export function nil2Empty(strings: TemplateStringsArray, ...keys: any[]): string {
  return convertNil(strings, keys);
}

export function nl2br(strings: TemplateStringsArray, ...keys: any[]): string {
  return newLineToBreak(convertNil(strings, keys));
}

export function nil2na(strings: TemplateStringsArray, ...keys: any[]): string {
  return convertNil(strings, keys, 'N/A');
}

function convertNil(strings: TemplateStringsArray, keys: any[], defaultVal = ''): string {
  return strings
    .map((str, i) => {
      const val = keys[i];

      return str + (val === null || val === undefined ? defaultVal : val);
    })
    .join('');
}

function newLineToBreak(str: string): string {
  return str.replace(/\n/g, '<br />\n');
}
