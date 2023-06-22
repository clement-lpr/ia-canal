export interface LoadingStatus {
  error: unknown;
  isLoaded: boolean;
  isLoading: boolean;
}

export const initialStatus: LoadingStatus = {
  error: undefined,
  isLoaded: false,
  isLoading: false,
};
