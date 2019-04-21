export type Callback<T = void> = (err?: Error | null, result?: T) => void;

export function promisify<T = any>(fn: (callback: Callback<T>) => void): () => Promise<T> {
  return () => {
    return new Promise((resolve, reject) => {
      try {
        fn((err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  };
}
