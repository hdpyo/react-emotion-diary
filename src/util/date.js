export const getStringDate = date => {
  // yyyy-MM-dd 형식으로 반환하기
  return date.toISOString().slice(0, 10);
};
