export type InvalidFields<T> = T extends object
  ? { [P in keyof T]?: InvalidFields<T[P]> } & { non_field_errors?: string[] }
  : string[];
