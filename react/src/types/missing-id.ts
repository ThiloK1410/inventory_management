export type MissingId<T> = Omit<T, "id"> | T;
