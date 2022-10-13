function remainingDateMiddleware(day) {
  const today = new Date();
  // startRemainingDate(시작까지 남은 날짜)
  const date = new Date(day);
  const remainingDate = Math.floor((today - date) / (1000 * 60 * 60 * 24));

  return remainingDate;
}

export { remainingDateMiddleware };
