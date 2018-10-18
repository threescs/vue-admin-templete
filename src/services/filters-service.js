function fixDate(val) {
  return val < 10 ? `0${val}` : val;
}

// 结算调整
// .filter('symbloFilter',function(){
//   return function(s){
//       s=Number(s)
//       if(s>0){
//        return s='+'+s
//      }else if(s<=0){
//        return s
//      }
//   }
// })


// 账户类型
const UserType = {
  STYLISTA: "潮流达人",
  NEWS: "新闻资讯",
  MOTHERBABY: "母婴亲子",
  SPORTS: "运动健身",
  TRAVEL: "旅行",
  FOOD: "美食",
  TECHNOLOGY: "科技",
  ACG: "动漫游戏",
  SPORTSEVENTS: "体育赛事",
  EMOTIONAL: "情感八卦",
  CONSTELLATION: "星座时尚",
  CAR: "汽车",
  AMUSE: "搞笑",
  OUTDOORS: "户外",
  OTHERS: "其他",
};


const enumFilter = allEnums => key => allEnums[key] || key;

const filters = {
  dateFormat: (val, type) => {
    const value = new Date(val * 1);
    const year = value.getFullYear();
    const month = fixDate(value.getMonth() + 1);
    const day = fixDate(value.getDate());
    const hour = fixDate(value.getHours());
    const minutes = fixDate(value.getMinutes());
    const seconds = fixDate(value.getSeconds());
    let result = "";
    if (type == "DATE") {
      result = `${year}-${month}-${day}`;
    } else if (type == "TIME") {
      result = `${year}-${month}-${day} ${hour}:${minutes}`;
    } else {
      result = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    }
    return result;
  },
  toPecent: (num) => { // 百分比
    const pencent = Number(num * 100).toFixed(1);
    return `${pencent}%`;
  },
  userType: enumFilter(UserType),
};

export default filters;
