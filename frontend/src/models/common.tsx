export interface IPage<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null
}