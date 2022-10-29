export default class StringUtils {
  static capitalize(str) {
    if (!str) return str;
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }

  static camelCase(str) {
    return str.split(" ")
              .map((token, idx) => {
                if (idx === 0) return token.toLowerCase();
                return StringUtils.capitalize(token);
              })
              .join("");
  }
}
