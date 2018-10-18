
function searchValueByKey(key) {
  const location = window.location;
  const search = location.search;
  const result = Object.assign({});
  if (search.length > 1) {
    const keyValuePair = search.substr(1);
    const searchKeyValuePairList = keyValuePair.split('&');
    searchKeyValuePairList.forEach((item) => {
      const name = item.substring(item.indexOf('='), -1);
      const value = item.substr(item.indexOf('=') + 1);
      result[name] = value;
    });
    return result[key];
  }
  console.log(`location.search is not contain ${key}`);
}
// 单行变量渲染，比如支持传入传入变量字符串 "${name} is 19"
function templateCompile(str, data) {
  const _regVar = /\$\{(.*?)\}/;
  // 变量渲染
  while (_regVar.test(str)) {
    try {
      let v = _regVar.exec(str)[1];
      v = v.replace(/\s/g, '');
      str = str.replace(_regVar, data[v]);
    } catch (err) {
      console.error(err);
    }
  }
  return str;
}
export {
  searchValueByKey,
  templateCompile,
};
