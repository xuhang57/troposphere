export default (str, limit) => {
    let subStr = str.substring(0, limit);
    return subStr.substring(0, subStr.lastIndexOf(" "));
}
