export const BASIC_DATABASE = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: [],
};

export const UUID_REGEX = `/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i`;

export const HTTP_MESSAGES = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Unprocessable Content',
};
