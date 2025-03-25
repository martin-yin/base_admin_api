import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * @description 格式化时间
 * @param fm string
 * @param date Date
 * @returns {string}
 */
export const dateFormat = (fm: string, date: Date = new Date()): string => {
  return format(date, fm, { locale: zhCN });
};

/**
 * @description 获取当前时间
 * @returns {string}
 */
export const get_current_time = (): string => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};
