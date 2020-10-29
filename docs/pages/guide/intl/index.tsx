import React from 'react';
import { Calendar, SelectPicker, CustomProvider } from 'rsuite';
import format from 'date-fns/format';
import DefaultPage from '@/components/Page';
import ar_EG from '@rsuite-locales/ar_EG';
import da_DK from '@rsuite-locales/da_DK';
import en_GB from '@rsuite-locales/en_GB';
import en_US from '@rsuite-locales/en_US';
import es_AR from '@rsuite-locales/es_AR';
import es_ES from '@rsuite-locales/es_ES';
import fi_FI from '@rsuite-locales/fi_FI';
import it_IT from '@rsuite-locales/it_IT';
import ko_KR from '@rsuite-locales/ko_KR';
import pt_BR from '@rsuite-locales/pt_BR';
import ru_RU from '@rsuite-locales/ru_RU';
import sv_SE from '@rsuite-locales/sv_SE';
import zh_CN from '@rsuite-locales/zh_CN';
import zh_TW from '@rsuite-locales/zh_TW';

import ar from 'date-fns/locale/ar-DZ';
import da from 'date-fns/locale/da';
import enGB from 'date-fns/locale/en-GB';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import fi from 'date-fns/locale/fi';
import it from 'date-fns/locale/it';
import ko from 'date-fns/locale/ko';
import pt from 'date-fns/locale/pt';
import ru from 'date-fns/locale/ru';
import sv from 'date-fns/locale/sv';
import zhCN from 'date-fns/locale/zh-CN';
import zhTW from 'date-fns/locale/zh-TW';

const locales = [
  { key: 'ar_EG', value: ar_EG, formatDate: (data, str) => format(data, str, { locale: ar }) },
  { key: 'da_DK', value: da_DK, formatDate: (data, str) => format(data, str, { locale: da }) },
  { key: 'en_GB', value: en_GB, formatDate: (data, str) => format(data, str, { locale: enGB }) },
  { key: 'en_US', value: en_US, formatDate: (data, str) => format(data, str, { locale: enUS }) },
  { key: 'es_AR', value: es_AR, formatDate: (data, str) => format(data, str, { locale: es }) },
  { key: 'es_ES', value: es_ES, formatDate: (data, str) => format(data, str, { locale: es }) },
  { key: 'fi_FI', value: fi_FI, formatDate: (data, str) => format(data, str, { locale: fi }) },
  { key: 'it_IT', value: it_IT, formatDate: (data, str) => format(data, str, { locale: it }) },
  { key: 'ko_KR', value: ko_KR, formatDate: (data, str) => format(data, str, { locale: ko }) },
  { key: 'pt_BR', value: pt_BR, formatDate: (data, str) => format(data, str, { locale: pt }) },
  { key: 'ru_RU', value: ru_RU, formatDate: (data, str) => format(data, str, { locale: ru }) },
  { key: 'sv_SE', value: sv_SE, formatDate: (data, str) => format(data, str, { locale: sv }) },
  { key: 'zh_CN', value: zh_CN, formatDate: (data, str) => format(data, str, { locale: zhCN }) },
  { key: 'zh_TW', value: zh_TW, formatDate: (data, str) => format(data, str, { locale: zhTW }) }
];

export default function Page() {
  return <DefaultPage dependencies={{ CustomProvider, Calendar, SelectPicker, locales }} />;
}
