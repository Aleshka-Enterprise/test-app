export const REQUIRED_FIELD_ERROR = "Поле не заполнено!"

export const snakeToCamel = (str: string): string =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );

export const camelToSnakeCase = (str: string): string => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const converCase = (value: Record<string, any>, type: "camel" | "snake"): Record<string, any> => {
  const res: Record<string, any> = {};
  for (const key in value) {
    res[type === "camel" ? snakeToCamel(key) : camelToSnakeCase(key)] = value[key]
  }
  return res;
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
