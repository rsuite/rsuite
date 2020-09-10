# DatePicker

To select or input a date or time

- `<DatePicker>`

> When you need to select a date range, it is recommended to use [`<DateRangePicker>`](./date-range-picker)

## Usage

<!--{include:(components/date-picker/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### One tap

<!--{include:`one-tap.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Block

<!--{include:`block.md`}-->

### Placeholder

<!--{include:`placeholder.md`}-->

### Date + Time

<!--{include:`format.md`}-->

### Show month

<!--{include:`format-month.md`}-->

### Show time

<!--{include:`format-time.md`}-->

### Meridian format
Display hours in 12 format.

<!--{include:`format-time-meridian.md`}-->

### ISO week

International Standard ISO 8601 defines that each calendar week begins on Monday and Sunday is the seventh day, [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date).

The calendar panel can be displayed in ISO standard via the ʻisoWeek` property setting.

<!--{include:`iso-week.md`}-->

### Disabled and hidden

<!--{include:`disabled.md`}-->

### Set the local language

`DatePicker` supports local language custom configuration, but we recommend using the unified [internationalization](/guide/intl) configuration.

<!--{include:`intl.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Custom short options

<!--{include:`custom.md`}-->

Clicking "The day before" in the example does not close the picker layer because the `closeOverlay:boolean` property is configured. This propperty is used to set whether to close the picker layer after clicking the shortcut item. The default value is `true`.

### Controlled

<!--{include:`control.md`}-->

### Selection range

<!--{include:`range.md`}-->

### Show week numbers

<!--{include:`show-week-numbers.md`}-->

### Time zone

<!--{include:`time-zone.md`}-->

- [Time zone selectable list reference](/components/date-picker#Time%20Zone%20List)
- [Notes on using time zone attributes](/components/date-picker#Time%20Zone%20Tips)

### Use `TimeZonePicker` to set time zone

<!--{include:`time-zone-with-picker.md`}-->

## Props

### `<DatePicker>`

| Property              | Type`(default)`                              | Description                                                                          |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| appearance            | enum: 'default', 'subtle' `('default')`      | Set picker appearence                                                                |
| block                 | boolean                                      | Blocking an entire row                                                               |
| calendarDefaultDate   | Date                                         | Calendar panel default presentation date and time                                    |
| cleanable             | boolean `(true)`                             | Whether the selected value can be cleared                                            |
| container             | HTMLElement or (() => HTMLElement)           | Sets the rendering container                                                         |
| defaultOpen           | boolean                                      | Default value of open property                                                       |
| defaultValue          | Date                                         | Default value                                                                        |
| disabled              | boolean                                      | Whether disabled the component                                                       |
| disabledDate          | (date:Date) => boolean                       | Disabled date                                                                        |
| disabledHours         | (hour:number, date:Date) => boolean          | Disabled hours                                                                       |
| disabledMinutes       | (minute:number, date:Date) => boolean        | Disabled minutes                                                                     |
| disabledSeconds       | (second:number, date:Date) => boolean        | Disabled seconds                                                                     |
| format                | string `('yyyy-MM-dd')`                      | Format date                                                                          |
| hideHours             | (hour:number, date:Date) => boolean          | Hidden hours                                                                         |
| hideMinutes           | (minute:number, date:Date) => boolean        | Hidden minutes                                                                       |
| hideSeconds           | (second:number, date:Date) => boolean        | Hidden seconds                                                                       |
| inline                | boolean                                      | Display date panel when component initial                                            |
| isoWeek               | boolean                                      | ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day |
| limitEndYear          | number `(1000)`                              | Set the lower limit of the available year relative to the current selection date     |
| locale                | Object [`(Locale)`](#Locale)                 | i18n config                                                                          |
| onChange              | (date: Date) => void                         | Callback fired when value changed                                                    |
| onChangeCalendarDate  | (date: Date, event?: SyntheticEvent) => void | Callback function that changes the calendar date.                                    |
| onClean               | (event:SyntheticEvent) => void               | Callback fired when value clean                                                      |
| onClose               | () => void                                   | Callback fired when close component                                                  |
| onEnter               | () => void                                   | Callback fired before the overlay transitions in                                     |
| onEntered             | () => void                                   | Callback fired after the overlay finishes transitioning in                           |
| onEntering            | () => void                                   | Callback fired as the overlay begins to transition in                                |
| onExit                | () => void                                   | Callback fired right before the overlay transitions out                              |
| onExited              | () => void                                   | Callback fired after the overlay finishes transitioning out                          |
| onExiting             | () => void                                   | Callback fired as the overlay begins to transition out                               |
| onNextMonth           | (date: Date) => void                         | Switch to the callback function for the next Month                                   |
| onOk                  | (date: Date, event: SyntheticEvent) => void  | Click the OK callback function                                                       |
| onOpen                | () => void                                   | Callback fired when open component                                                   |
| onPrevMonth           | (date: Date) => void                         | Switch to the callback function for the previous Month                               |
| onSelect              | (date: Date) => void                         | Callback fired when date or time is selected                                         |
| onToggleMonthDropdown | (open: boolean) => void                      | Callback function that switches to the month view                                    |
| onToggleTimeDropdown  | (open: boolean) => void                      | Callback function that switches to the time view                                     |
| oneTap                | boolean                                      | One click to complete the selection date                                             |
| open                  | boolean                                      | Whether open the component                                                           |
| placeholder           | string                                       | Placeholder                                                                          |
| placement             | enum: [Placement](#types) `('bottomStart')`  | The placement of component                                                           |
| preventOverflow       | boolean                                      | Prevent floating element overflow                                                    |
| ranges                | Array<[Range](#types)> [`(Ranges)`](#Ranges) | Shortcut config                                                                      |
| showMeridian          | boolean                                      | Display hours in 12 format                                                           |
| showWeekNumbers       | boolean                                      | Whether to show week numbers                                                         |
| toggleAs              | React.ElementType `('a')`                    | You can use a custom element for this component                                      |
| value                 | Date                                         | Value (Controlled)                                                                   |
| timeZone              | string                                       | [IANA Time zone name](#Time%20Zone%20List)  |

## Default

### Locale

```js
const Locale = {
  sunday: 'Su',
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Today',
  yesterday: 'Yesterday',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds'
};
```

### Ranges

```js
const Ranges = [
  {
    label: 'today',
    value: new Date(),
    closeOverlay: true
  },
  {
    label: 'yesterday',
    value: dateFns.addDays(new Date(), -1),
    closeOverlay: true
  }
];
```

## Time Zone

#### Time Zone Tips
The `timeZone` property in principle only affects the UI display to facilitate the user to select the time or date in the specified time zone, and does not affect the `date` object returned by the component **other APIs** to the outer component.
> For example: `disabledDate: (date: Date) => boolean` property, after setting the `timeZone` property, the `date` object passed in by the `disabledDate` property callback is still based on the corresponding time in the current time zone, not the specified time zone.

#### Time Zone List
> [IANA Time Zone List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

```json
[
    "Africa/Abidjan",
    "Africa/Accra",
    "Africa/Nairobi",
    "Africa/Algiers",
    "Africa/Lagos",
    "Africa/Bissau",
    "Africa/Maputo",
    "Africa/Cairo",
    "Africa/Casablanca",
    "Africa/Ceuta",
    "Africa/El_Aaiun",
    "Africa/Johannesburg",
    "Africa/Juba",
    "Africa/Khartoum",
    "Africa/Monrovia",
    "Africa/Ndjamena",
    "Africa/Sao_Tome",
    "Africa/Tripoli",
    "Africa/Tunis",
    "Africa/Windhoek",
    "America/Adak",
    "America/Anchorage",
    "America/Port_of_Spain",
    "America/Araguaina",
    "America/Argentina/Buenos_Aires",
    "America/Argentina/Catamarca",
    "America/Argentina/Cordoba",
    "America/Argentina/Jujuy",
    "America/Argentina/La_Rioja",
    "America/Argentina/Mendoza",
    "America/Argentina/Rio_Gallegos",
    "America/Argentina/Salta",
    "America/Argentina/San_Juan",
    "America/Argentina/San_Luis",
    "America/Argentina/Tucuman",
    "America/Argentina/Ushuaia",
    "America/Curacao",
    "America/Asuncion",
    "America/Atikokan",
    "America/Bahia_Banderas",
    "America/Bahia",
    "America/Barbados",
    "America/Belem",
    "America/Belize",
    "America/Blanc-Sablon",
    "America/Boa_Vista",
    "America/Bogota",
    "America/Boise",
    "America/Cambridge_Bay",
    "America/Campo_Grande",
    "America/Cancun",
    "America/Caracas",
    "America/Cayenne",
    "America/Panama",
    "America/Chicago",
    "America/Chihuahua",
    "America/Costa_Rica",
    "America/Creston",
    "America/Cuiaba",
    "America/Danmarkshavn",
    "America/Dawson_Creek",
    "America/Dawson",
    "America/Denver",
    "America/Detroit",
    "America/Edmonton",
    "America/Eirunepe",
    "America/El_Salvador",
    "America/Tijuana",
    "America/Fort_Nelson",
    "America/Fort_Wayne",
    "America/Fortaleza",
    "America/Glace_Bay",
    "America/Godthab",
    "America/Goose_Bay",
    "America/Grand_Turk",
    "America/Guatemala",
    "America/Guayaquil",
    "America/Guyana",
    "America/Halifax",
    "America/Havana",
    "America/Hermosillo",
    "America/Indiana/Knox",
    "America/Indiana/Marengo",
    "America/Indiana/Petersburg",
    "America/Indiana/Tell_City",
    "America/Indiana/Vevay",
    "America/Indiana/Vincennes",
    "America/Indiana/Winamac",
    "America/Inuvik",
    "America/Iqaluit",
    "America/Jamaica",
    "America/Juneau",
    "America/Kentucky/Louisville",
    "America/Kentucky/Monticello",
    "America/La_Paz",
    "America/Lima",
    "America/Los_Angeles",
    "America/Maceio",
    "America/Managua",
    "America/Manaus",
    "America/Martinique",
    "America/Matamoros",
    "America/Mazatlan",
    "America/Menominee",
    "America/Merida",
    "America/Metlakatla",
    "America/Mexico_City",
    "America/Miquelon",
    "America/Moncton",
    "America/Monterrey",
    "America/Montevideo",
    "America/Toronto",
    "America/Nassau",
    "America/New_York",
    "America/Nipigon",
    "America/Nome",
    "America/Noronha",
    "America/North_Dakota/Beulah",
    "America/North_Dakota/Center",
    "America/North_Dakota/New_Salem",
    "America/Ojinaga",
    "America/Pangnirtung",
    "America/Paramaribo",
    "America/Phoenix",
    "America/Port-au-Prince",
    "America/Rio_Branco",
    "America/Porto_Velho",
    "America/Puerto_Rico",
    "America/Punta_Arenas",
    "America/Rainy_River",
    "America/Rankin_Inlet",
    "America/Recife",
    "America/Regina",
    "America/Resolute",
    "America/Santarem",
    "America/Santiago",
    "America/Santo_Domingo",
    "America/Sao_Paulo",
    "America/Scoresbysund",
    "America/Sitka",
    "America/St_Johns",
    "America/Swift_Current",
    "America/Tegucigalpa",
    "America/Thule",
    "America/Thunder_Bay",
    "America/Vancouver",
    "America/Whitehorse",
    "America/Winnipeg",
    "America/Yakutat",
    "America/Yellowknife",
    "Antarctica/Casey",
    "Antarctica/Davis",
    "Antarctica/DumontDUrville",
    "Antarctica/Macquarie",
    "Antarctica/Mawson",
    "Pacific/Auckland",
    "Antarctica/Palmer",
    "Antarctica/Rothera",
    "Antarctica/Syowa",
    "Antarctica/Troll",
    "Antarctica/Vostok",
    "Europe/Oslo",
    "Asia/Riyadh",
    "Asia/Almaty",
    "Asia/Amman",
    "Asia/Anadyr",
    "Asia/Aqtau",
    "Asia/Aqtobe",
    "Asia/Ashgabat",
    "Asia/Atyrau",
    "Asia/Baghdad",
    "Asia/Qatar",
    "Asia/Baku",
    "Asia/Bangkok",
    "Asia/Barnaul",
    "Asia/Beirut",
    "Asia/Bishkek",
    "Asia/Brunei",
    "Asia/Kolkata",
    "Asia/Chita",
    "Asia/Choibalsan",
    "Asia/Shanghai",
    "Asia/Colombo",
    "Asia/Dhaka",
    "Asia/Damascus",
    "Asia/Dili",
    "Asia/Dubai",
    "Asia/Dushanbe",
    "Asia/Famagusta",
    "Asia/Gaza",
    "Asia/Hebron",
    "Asia/Ho_Chi_Minh",
    "Asia/Hong_Kong",
    "Asia/Hovd",
    "Asia/Irkutsk",
    "Europe/Istanbul",
    "Asia/Jakarta",
    "Asia/Jayapura",
    "Asia/Jerusalem",
    "Asia/Kabul",
    "Asia/Kamchatka",
    "Asia/Karachi",
    "Asia/Urumqi",
    "Asia/Kathmandu",
    "Asia/Khandyga",
    "Asia/Krasnoyarsk",
    "Asia/Kuala_Lumpur",
    "Asia/Kuching",
    "Asia/Macau",
    "Asia/Magadan",
    "Asia/Makassar",
    "Asia/Manila",
    "Asia/Nicosia",
    "Asia/Novokuznetsk",
    "Asia/Novosibirsk",
    "Asia/Omsk",
    "Asia/Oral",
    "Asia/Pontianak",
    "Asia/Pyongyang",
    "Asia/Qyzylorda",
    "Asia/Rangoon",
    "Asia/Sakhalin",
    "Asia/Samarkand",
    "Asia/Seoul",
    "Asia/Singapore",
    "Asia/Srednekolymsk",
    "Asia/Taipei",
    "Asia/Tashkent",
    "Asia/Tbilisi",
    "Asia/Tehran",
    "Asia/Thimphu",
    "Asia/Tokyo",
    "Asia/Tomsk",
    "Asia/Ulaanbaatar",
    "Asia/Ust-Nera",
    "Asia/Vladivostok",
    "Asia/Yakutsk",
    "Asia/Yekaterinburg",
    "Asia/Yerevan",
    "Atlantic/Azores",
    "Atlantic/Bermuda",
    "Atlantic/Canary",
    "Atlantic/Cape_Verde",
    "Atlantic/Faroe",
    "Atlantic/Madeira",
    "Atlantic/Reykjavik",
    "Atlantic/South_Georgia",
    "Atlantic/Stanley",
    "Australia/Sydney",
    "Australia/Adelaide",
    "Australia/Brisbane",
    "Australia/Broken_Hill",
    "Australia/Currie",
    "Australia/Darwin",
    "Australia/Eucla",
    "Australia/Hobart",
    "Australia/Lord_Howe",
    "Australia/Lindeman",
    "Australia/Melbourne",
    "Australia/Perth",
    "CET",
    "Pacific/Easter",
    "CST6CDT",
    "EET",
    "Europe/Dublin",
    "EST",
    "EST5EDT",
    "Etc/GMT-0",
    "Etc/GMT-1",
    "Etc/GMT-10",
    "Etc/GMT-11",
    "Etc/GMT-12",
    "Etc/GMT-13",
    "Etc/GMT-14",
    "Etc/GMT-2",
    "Etc/GMT-3",
    "Etc/GMT-4",
    "Etc/GMT-5",
    "Etc/GMT-6",
    "Etc/GMT-7",
    "Etc/GMT-8",
    "Etc/GMT-9",
    "Etc/GMT+1",
    "Etc/GMT+10",
    "Etc/GMT+11",
    "Etc/GMT+12",
    "Etc/GMT+2",
    "Etc/GMT+3",
    "Etc/GMT+4",
    "Etc/GMT+5",
    "Etc/GMT+6",
    "Etc/GMT+7",
    "Etc/GMT+8",
    "Etc/GMT+9",
    "Etc/UCT",
    "Etc/UTC",
    "Europe/Amsterdam",
    "Europe/Andorra",
    "Europe/Astrakhan",
    "Europe/Athens",
    "Europe/London",
    "Europe/Belgrade",
    "Europe/Berlin",
    "Europe/Prague",
    "Europe/Brussels",
    "Europe/Bucharest",
    "Europe/Budapest",
    "Europe/Zurich",
    "Europe/Chisinau",
    "Europe/Copenhagen",
    "Europe/Gibraltar",
    "Europe/Helsinki",
    "Europe/Kaliningrad",
    "Europe/Kiev",
    "Europe/Kirov",
    "Europe/Lisbon",
    "Europe/Luxembourg",
    "Europe/Madrid",
    "Europe/Malta",
    "Europe/Minsk",
    "Europe/Monaco",
    "Europe/Moscow",
    "Europe/Paris",
    "Europe/Riga",
    "Europe/Rome",
    "Europe/Samara",
    "Europe/Saratov",
    "Europe/Simferopol",
    "Europe/Sofia",
    "Europe/Stockholm",
    "Europe/Tallinn",
    "Europe/Tirane",
    "Europe/Ulyanovsk",
    "Europe/Uzhgorod",
    "Europe/Vienna",
    "Europe/Vilnius",
    "Europe/Volgograd",
    "Europe/Warsaw",
    "Europe/Zaporozhye",
    "HST",
    "Indian/Chagos",
    "Indian/Christmas",
    "Indian/Cocos",
    "Indian/Kerguelen",
    "Indian/Mahe",
    "Indian/Maldives",
    "Indian/Mauritius",
    "Indian/Reunion",
    "Pacific/Kwajalein",
    "MET",
    "MST",
    "MST7MDT",
    "Pacific/Chatham",
    "Pacific/Apia",
    "Pacific/Bougainville",
    "Pacific/Chuuk",
    "Pacific/Efate",
    "Pacific/Enderbury",
    "Pacific/Fakaofo",
    "Pacific/Fiji",
    "Pacific/Funafuti",
    "Pacific/Galapagos",
    "Pacific/Gambier",
    "Pacific/Guadalcanal",
    "Pacific/Guam",
    "Pacific/Honolulu",
    "Pacific/Kiritimati",
    "Pacific/Kosrae",
    "Pacific/Majuro",
    "Pacific/Marquesas",
    "Pacific/Pago_Pago",
    "Pacific/Nauru",
    "Pacific/Niue",
    "Pacific/Norfolk",
    "Pacific/Noumea",
    "Pacific/Palau",
    "Pacific/Pitcairn",
    "Pacific/Pohnpei",
    "Pacific/Port_Moresby",
    "Pacific/Rarotonga",
    "Pacific/Tahiti",
    "Pacific/Tarawa",
    "Pacific/Tongatapu",
    "Pacific/Wake",
    "Pacific/Wallis",
    "PST8PDT",
    "WET"
]
```
