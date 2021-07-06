import dayjs from 'dayjs';

const formatDateTime = (date: string) =>
  dayjs(date).format('YYYY-MM-DD HH:mm:ss');

export default {
  formatDateTime,
};
