// 빈 객체 null 체크
export function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
