export const BASIC_DATABASE = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

export const SAFE_FIELDS = {
  id: true,
  login: true,
  password: false,
  version: true,
  createdAt: true,
  updatedAt: true,
};

export const UUID_REGEX = `/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i`;
