/**
 * 浏览器侦测类
 */
const userAgent = navigator.userAgent.toLocaleLowerCase();

function isIOS() {
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return true;
  }
  return false;
}
function isAndroid() {
  if (/android/.test(userAgent)) {
    return true;
  }
  return false;
}
export {
  isIOS,
  isAndroid,
};
