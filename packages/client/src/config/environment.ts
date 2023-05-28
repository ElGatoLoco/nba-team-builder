type Env = {
  apiUrl: string;
};

export const environment: Env = {
  apiUrl: import.meta.env.PUBLIC_API_URL || '',
};
