import React from 'react';
import { Calendar, SelectPicker, DatePicker, CustomProvider } from 'rsuite';

import DefaultPage from '@/components/Page';
import ar_EG from '@rsuite-locales/ar_EG';
import da_DK from '@rsuite-locales/da_DK';
import de_DE from '@rsuite-locales/de_DE';
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

const locales = [
  { key: 'ar_EG', value: ar_EG },
  { key: 'da_DK', value: da_DK },
  { key: 'de_DE', value: de_DE },
  { key: 'en_GB', value: en_GB },
  { key: 'en_US', value: en_US },
  { key: 'es_AR', value: es_AR },
  { key: 'es_ES', value: es_ES },
  { key: 'fi_FI', value: fi_FI },
  { key: 'it_IT', value: it_IT },
  { key: 'ko_KR', value: ko_KR },
  { key: 'pt_BR', value: pt_BR },
  { key: 'ru_RU', value: ru_RU },
  { key: 'sv_SE', value: sv_SE },
  { key: 'zh_CN', value: zh_CN },
  { key: 'zh_TW', value: zh_TW }
];

export default function Page() {
  return (
    <DefaultPage dependencies={{ CustomProvider, Calendar, SelectPicker, DatePicker, locales }} />
  );
}
