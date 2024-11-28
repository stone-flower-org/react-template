export enum LoadingStatus {
  ERROR = 'error',
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
}

export const isErrorStatus = (status: unknown): status is LoadingStatus.ERROR => status === LoadingStatus.ERROR;
export const isIdleStatus = (status: unknown): status is LoadingStatus.IDLE => status === LoadingStatus.IDLE;
export const isLoadingStatus = (status: unknown): status is LoadingStatus.LOADING => status === LoadingStatus.LOADING;
export const isSuccessStatus = (status: unknown): status is LoadingStatus.SUCCESS => status === LoadingStatus.SUCCESS;
export const isLoadedStatus = (status: unknown): status is LoadingStatus.SUCCESS | LoadingStatus.ERROR =>
  status === LoadingStatus.SUCCESS || status === LoadingStatus.ERROR;
