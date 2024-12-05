export const ROOT = {
  MAIN: '/',
  READING: '/reading',
  NEW: '/new',
} as const;

export const ROUTES = {
  DETAIL: `${ROOT.READING}/:id`,
  EDIT: `${ROOT.READING}/:id/edit`,
} as const;
