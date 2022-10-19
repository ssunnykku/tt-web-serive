function dayCountsBetweenTodayAnd(day) {
  const today = new Date();
  const date = new Date(day);
  const dayCount = Math.floor((today - date) / (1000 * 60 * 60 * 24));

  return dayCount;
}

export { dayCountsBetweenTodayAnd };
