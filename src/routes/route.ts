export const ROOT = {
  MAIN: '/',
  READING: '/reading',
} as const;

export const ROUTES = {
  NEW: `${ROOT.MAIN}/new`,
  READING: `${ROOT.READING}/:id`,
  EDIT: `${ROOT.READING}/:id/edit`,
} as const;
