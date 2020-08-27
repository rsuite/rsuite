# DatePicker 时间选择器

时间选择器，可以选择日期和时间。

- `<DatePicker>`

> 当需要选择日期范围，推荐使用 [`<DateRangePicker>`](./date-range-picker)

## 获取组件

<!--{include:(components/date-picker/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 一键选值

<!--{include:`one-tap.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 撑满

<!--{include:`block.md`}-->

### 占位符

<!--{include:`placeholder.md`}-->

### 日期 + 时间

<!--{include:`format.md`}-->

### 只显示月份

<!--{include:`format-month.md`}-->

### 只显示时间

<!--{include:`format-time.md`}-->

### 以 12 小时制的格式显示

<!--{include:`format-time-meridian.md`}-->

### ISO week

国际标准 ISO 8601 定义，每个日历星期从星期一开始，星期日为第7天, [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date).

可以通过 `isoWeek` 属性设置以 ISO 标准显示日历面板。

<!--{include:`iso-week.md`}-->

### 禁用与隐藏

禁用是把一个可点击元素设置为不可点击状态，隐藏是直接在选项中不出现。

<!--{include:`disabled.md`}-->

### 设置本地语言

`DatePicker` 支持本地语言自定义配置，但是我们更推荐使用统一[国际化](/guide/intl)配置。

<!--{include:`intl-zh-cn.md`}-->


### 位置

<!--{include:`placement.md`}-->

> 提示：设置为 `auto*`时， 尝试滚动页面，或者改变浏览器大小，会自动显示在合适的位置。

### 自定义快捷项

<!--{include:`custom.md`}-->

示例中点击“前一天”，不会关闭浮层，是因为配置 `closeOverlay:boolean` 参数，该参数用于设置点击快捷项以后是否关闭浮层，默认为 `true`。

### 受控

<!--{include:`control.md`}-->

### 选择范围

<!--{include:`range.md`}-->

### 显示周数

<!--{include:`show-week-numbers.md`}-->

### 设定时区

<!--{include:`time-zone.md`}-->

- [时区可选择列表参考](/zh/components/date-picker#Time%20Zone%20List)
- [使用时区注意事项](/zh/components/date-picker#Time%20Zone%20Tips)

### 与 `TimeZonePicker` 配合设定时区

<!--{include:`time-zone-with-picker.md`}-->




## Props

### `<DatePicker>`

| 属性名称              | 类型`(默认值)`                               | 描述                                                      |
| --------------------- | -------------------------------------------- | --------------------------------------------------------- |
| appearance            | enum: 'default', 'subtle' `('default')`      | 设置外观                                                  |
| block                 | boolean                                      | 堵塞整行                                                  |
| calendarDefaultDate   | Date                                         | 日历面板默认呈现的日期时间                                |
| cleanable             | boolean `(true)`                             | 可以清除                                                  |
| container             | HTMLElement or (() => HTMLElement)           | 设置渲染的容器                                            |
| defaultOpen           | boolean                                      | 默认打开                                                  |
| defaultValue          | Date                                         | 默认值                                                    |
| disabled              | boolean                                      | 禁用组件                                                  |
| disabledDate          | (date:Date) => boolean                       | 禁用日期                                                  |
| disabledHours         | (hour:number, date:Date) => boolean          | 禁用小时                                                  |
| disabledMinutes       | (minute:number, date:Date) => boolean        | 禁用分钟                                                  |
| disabledSeconds       | (second:number, date:Date) => boolean        | 禁用秒                                                    |
| format                | string `('yyyy-MM-dd')`                      | 日期显示格式化                                            |
| hideHours             | (hour:number, date:Date) => boolean          | 隐藏小时                                                  |
| hideMinutes           | (minute:number, date:Date) => boolean        | 隐藏分钟                                                  |
| hideSeconds           | (second:number, date:Date) => boolean        | 隐藏秒                                                    |
| inline                | boolean                                      | 默认显示日历面板                                          |
| isoWeek               | boolean                                      | ISO 8601 标准， 每个日历星期从星期一开始，星期日为第 7 天 |
| limitEndYear          | number `(1000)`                              | 相对当前选择日期，设置可选年份下限                        |
| locale                | Object [`(Locale)`](#Locale)                 | 本地化对应的语言描述                                      |
| menuClassName         | string                                       | 选项菜单的 className                                      |
| onChange              | (date:Date) => void                          | 值改变后的回调函数                                        |
| onChangeCalendarDate  | (date: Date, event?: SyntheticEvent) => void | 日历日期改变后的回调函数                                  |
| onClean               | (event:SyntheticEvent) => void               | 清除值后的回调函数                                        |
| onClose               | () => void                                   | 关闭回调函数                                              |
| onEnter               | () => void                                   | 显示前动画过渡的回调函数                                  |
| onEntered             | () => void                                   | 显示后动画过渡的回调函数                                  |
| onEntering            | () => void                                   | 显示中动画过渡的回调函数                                  |
| onExit                | () => void                                   | 退出前动画过渡的回调函数                                  |
| onExited              | () => void                                   | 退出后动画过渡的回调函数                                  |
| onExiting             | () => void                                   | 退出中动画过渡的回调函数                                  |
| onNextMonth           | (date: Date) => void                         | 切换到下一月的回调函数                                    |
| onOk                  | (date: Date, event: SyntheticEvent) => void  | 点击确定后的回调函数                                      |
| onOpen                | () => void                                   | 打开回调函数                                              |
| onPrevMonth           | (date: Date) => void                         | 切换到上一月的回调函数                                    |
| onSelect              | (date:Date) => void                          | 选择日期或者时间的回调函数                                |
| onToggleMonthDropdown | (open: boolean) => void                      | 切换到月份视图的回调函数                                  |
| onToggleTimeDropdown  | (open: boolean) => void                      | 切换到时间视图的回调函数                                  |
| oneTap                | boolean                                      | 一个点击完成选择日期                                      |
| open                  | boolean                                      | 打开 (受控)                                               |
| placeholder           | string                                       | 没有值时候默认显示内容                                    |
| placement             | enum: [Placement](#types) `('bottomStart')`  | 显示位置                                                  |
| preventOverflow       | boolean                                      | 防止浮动元素溢出                                          |
| ranges                | Array<[Range](#types)> [`(Ranges)`](#Ranges) | 快捷项配置                                                |
| showMeridian          | boolean                                      | 显示 12 小时制的时间格式                                  |
| showWeekNumbers       | boolean                                      | 显示周数量                                                |
| toggleAs              | React.ElementType `('a')`                    | 为组件自定义元素类型                                      |
| value                 | Date                                         | 值`受控`                                                  |
| timeZone              | string                                       | [IANA 时区名](#Time%20Zone%20List)                      |

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
`timeZone` 属性原则上只影响 UI 显示以方便使用者选择到指定时区的时间或日期，不影响组件**其他 API 回传**给外层组件的 `date` 对象。
> 例如: `disabledDate: (date: Date) => boolean` 属性，在设定 `timeZone` 属性之后，`disabledDate` 属性回调传入的 `date` 对象仍然是基于当前时区的对应时间, 而不是指定时区下的时间。

#### Time Zone List
> [IANA 时区名](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

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
