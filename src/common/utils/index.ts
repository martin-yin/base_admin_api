import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const dateFormat = (fm: string, date: Date = new Date()) => {
  return format(date, fm, { locale: zhCN });
};

export const get_current_time = () => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};
