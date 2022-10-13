import React from 'react';
import { Calendar, SelectPicker, DatePicker, CustomProvider } from 'rsuite';

import DefaultPage from '@/components/Page';
import ar_EG from 'rsuite/locales/ar_EG';
import da_DK from 'rsuite/locales/da_DK';
import de_DE from 'rsuite/locales/de_DE';
import en_GB from 'rsuite/locales/en_GB';
import en_US from 'rsuite/locales/en_US';
import es_AR from 'rsuite/locales/es_AR';
import es_ES from 'rsuite/locales/es_ES';
import fi_FI from 'rsuite/locales/fi_FI';
import it_IT from 'rsuite/locales/it_IT';
import ko_KR from 'rsuite/locales/ko_KR';
import pt_BR from 'rsuite/locales/pt_BR';
import ru_RU from 'rsuite/locales/ru_RU';
import sv_SE from 'rsuite/locales/sv_SE';
import zh_CN from 'rsuite/locales/zh_CN';
import zh_TW from 'rsuite/locales/zh_TW';
import fa_IR from 'rsuite/locales/fa_IR';
import fr_FR from 'rsuite/locales/fr_FR';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        CustomProvider,
        Calendar,
        SelectPicker,
        DatePicker,
        ar_EG,
        da_DK,
        de_DE,
        en_GB,
        en_US,
        es_AR,
        es_ES,
        fi_FI,
        it_IT,
        ko_KR,
        pt_BR,
        ru_RU,
        sv_SE,
        zh_CN,
        zh_TW,
        fa_IR,
        fr_FR
      }}
    />
  );
}
