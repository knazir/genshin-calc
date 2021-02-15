export default class StringUtils {
  static capitalize(str) {
    if (!str) return str;
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }
}
