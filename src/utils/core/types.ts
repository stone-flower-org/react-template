export interface ServiceProvider<S = unknown> {
  boot: () => Promise<S>;
  get: () => S;
}

export type BootFunc<S = unknown> = () => Promise<S>;
