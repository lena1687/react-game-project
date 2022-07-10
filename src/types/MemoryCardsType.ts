export interface InitialLoadingState {
  data: ImagesState;
  error: boolean;
  loading: boolean;
}

export interface ImagesState {
  images: string[];
  params: {
    userName: string | null;
    themeGame: string | null;
    complexity: number | null;
  };
}
