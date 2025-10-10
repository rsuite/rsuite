'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import fr from 'date-fns/locale/fr';
var DateTimeFormats = {
  sunday: 'Di',
  monday: 'Lu',
  tuesday: 'Ma',
  wednesday: 'Me',
  thursday: 'Je',
  friday: 'Ve',
  saturday: 'Sa',
  ok: 'OK',
  today: "Aujourd'hui",
  yesterday: 'Hier',
  now: 'Maintenant',
  hours: 'Heures',
  minutes: 'Minutes',
  seconds: 'Secondes',
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: fr
};
var Combobox = {
  noResultsText: 'Aucun résultat trouvé',
  placeholder: 'Sélectionner',
  searchPlaceholder: 'Rechercher',
  checkAll: 'Tous'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Nouvel item',
  createOption: 'Option de création "{0}"'
});
export default {
  code: 'fr-FR',
  common: {
    loading: 'Chargement...',
    emptyMessage: 'Aucune donnée trouvée',
    remove: 'Retirer',
    clear: 'Clair'
  },
  Plaintext: {
    unfilled: 'Non rempli',
    notSelected: 'Non sélectionné',
    notUploaded: 'Non uploadé'
  },
  Pagination: {
    more: 'Plus',
    prev: 'Précédent',
    next: 'Suivant',
    first: 'Premier',
    last: 'Dernier',
    limit: '{0} / page',
    total: 'Lignes totales: {0}',
    skip: 'Aller à{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: _extends({}, DateTimeFormats, {
    last7Days: '7 Derniers Jours'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Initial',
    progress: 'Chargement',
    error: 'Erreur',
    complete: 'Terminé',
    emptyFile: 'Vide',
    upload: 'Uploader',
    removeFile: 'Supprimer le fichier'
  },
  CloseButton: {
    closeLabel: 'Fermer'
  },
  Breadcrumb: {
    expandText: 'Afficher le chemin'
  },
  Toggle: {
    on: 'Ouvrir',
    off: 'Fermer'
  }
};