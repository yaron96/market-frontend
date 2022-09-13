export const paths = {
  empty: () => '/',
  home: () => `/${gitHubPages}`,
  auth: () => '/auth',
  signIn: () => '/auth/sign-in',
  signUp: () => '/auth/sign-up',
  notFound: () => '/404',
  // settings: () => '/settings',
  createProduct: () => '/create-product',
  editProduct: (id: string) => `/edit-product/${id}`,
  product: (id: string) => `/product/${id}`,
  // favorites: () => '/favorites',
};

const gitHubPages = 'market-frontend'