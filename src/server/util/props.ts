export type Prop<T> = Extract<keyof T, string>;

export type Props<T> = Prop<T>[];

export function props<T>(...val: Props<T>): Props<T> {
  return val;
}
