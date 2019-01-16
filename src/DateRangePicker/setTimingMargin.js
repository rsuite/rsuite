import { startOfDay, endOfDay } from 'date-fns';

export default (date, way = 'left') => (way === 'right' ? endOfDay(date) : startOfDay(date));
