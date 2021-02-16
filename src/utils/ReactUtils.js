class ReactUtils {
  constructor() {
    this._successHandler = null;
    this._errorHandler = null;
    this._uniqueIds = {};
  }

  nextUniqueId(key) {
    if (!this._uniqueIds[key]) this._uniqueIds[key] = 1;
    const id = this._uniqueIds[key];
    this._uniqueIds[key]++;
    return `${key}_${id}`;
  }

  registerSuccessHandler(successHandler) {
    this._successHandler = successHandler;
  }

  registerErrorHandler(errorHandler) {
    this._errorHandler = errorHandler;
  }

  onSuccess(message) {
    if (this._successHandler) this._successHandler(message);
  }

  onError(message) {
    if (this._errorHandler) this._errorHandler(message);
  }
}

export default new ReactUtils();
