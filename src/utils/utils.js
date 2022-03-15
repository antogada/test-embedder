const getDate = (dateStr, withYear = true) => {
  const date = new Date(dateStr);
  const months = ['Ян', 'Февр', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Септ', 'Окт', 'Ноем', 'Дек'];

  const day = date.getDate();
  const month = ` ${months[date.getMonth()]}`;
  const year = ` ${date.getFullYear()}`;

  return `${day}${month}${withYear ? year : ''}`;
};

export {
  getDate,
};
