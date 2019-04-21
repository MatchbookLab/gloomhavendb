// adapted from https://github.com/bsalex/typed-path

export type TypedPath<T> = { [P in keyof T]: TypedPath<T[P]> };

const toStringMethods: (string | symbol | number)[] = [
  'toString',
  // 'path',
  Symbol.toStringTag,
  'valueOf',
];

export function typedPath<T>(): TypedPath<T> {
  return _typedPath<T>();
}

function _typedPath<T>(path: string[] = []): TypedPath<T> {
  return <TypedPath<T>>new Proxy(
    {},
    {
      get(target: T, name: string | symbol | number) {
        if (toStringMethods.includes(name)) {
          return () => path.join('.');
        }

        return _typedPath([...path, name.toString()]);
      },
    },
  );
}
