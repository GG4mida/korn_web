enum ResponseCode {
  SUCCESS = 200,
  FAILED = 400,
  NOAUTH = 401,
}

const StorageKey = {
  AUTHTOKEN: 'AUTH_TOKEN',
};

export { ResponseCode, StorageKey };
