# [5.27.0](https://github.com/rsuite/rsuite/compare/v5.26.1...v5.27.0) (2023-02-17)

### Bug Fixes

- **Message,Notification:** duration property migrated to `toaster.push` option ([#3065](https://github.com/rsuite/rsuite/issues/3065)) ([f18cc32](https://github.com/rsuite/rsuite/commit/f18cc32e4822fa3596b350efe0dc31f286b3918b))
- **Schema:** add missing Types.MixedType ([#3058](https://github.com/rsuite/rsuite/issues/3058)) ([b6c9654](https://github.com/rsuite/rsuite/commit/b6c965449f5eb1d13b72b02cfd16f454bc942c90))

### Features

- **Button:** add startIcon and endIcon props ([#3067](https://github.com/rsuite/rsuite/issues/3067)) ([d3e967e](https://github.com/rsuite/rsuite/commit/d3e967e3be84ab6f76eb5a2415989a4f592c6674))

## [5.26.1](https://github.com/rsuite/rsuite/compare/v5.26.0...v5.26.1) (2023-02-09)

### Bug Fixes

- **Form.Control:** shouldResetWithUnmount isn't working ([#3055](https://github.com/rsuite/rsuite/issues/3055)) ([98c7e1d](https://github.com/rsuite/rsuite/commit/98c7e1d1959e46a6bec97931f159abbaf32dd779))

# [5.26.0](https://github.com/rsuite/rsuite/compare/v5.25.0...v5.26.0) (2023-02-03)

### Bug Fixes

- **DatePicker:** fix uncontrolled default date on calendar ([#3045](https://github.com/rsuite/rsuite/issues/3045)) ([c530b25](https://github.com/rsuite/rsuite/commit/c530b2550c62a8343eb759b60942858a0921c2a2))
- **Form.Control:** fix `acceptor` prop can not accept `Toggle` ([#3048](https://github.com/rsuite/rsuite/issues/3048)) ([43a413a](https://github.com/rsuite/rsuite/commit/43a413a0b96b3adb88deea54e41b56c582d4e3b6))
- **Nav.Menu:** open with hover trigger in Navbar ([#3041](https://github.com/rsuite/rsuite/issues/3041)) ([ddbc325](https://github.com/rsuite/rsuite/commit/ddbc3253d5e714d03c5a43daa7bd2c52adec5638))

### Features

- **i18n:** added Dutch locale (nl_NL) ([#3035](https://github.com/rsuite/rsuite/issues/3035)) ([47342c9](https://github.com/rsuite/rsuite/commit/47342c9373c02ce9393fd03693d9e45cc601a186))

# [5.25.0](https://github.com/rsuite/rsuite/compare/v5.24.1...v5.25.0) (2023-01-20)

### Bug Fixes

- **Breadcrumb:** improve font color for active item ([#3028](https://github.com/rsuite/rsuite/issues/3028)) ([1efcbf9](https://github.com/rsuite/rsuite/commit/1efcbf90a345ee93928ca13c181c103d247e869d))
- **Breadcrumb:** rendered breadcrumbs as span when href is not specified ([#3027](https://github.com/rsuite/rsuite/issues/3027)) ([8ad16e4](https://github.com/rsuite/rsuite/commit/8ad16e4d572b55892a50c0cad747554039b43398))
- **Button:** fix disabled icon button bug in dark mode ([#3020](https://github.com/rsuite/rsuite/issues/3020)) ([8975eff](https://github.com/rsuite/rsuite/commit/8975eff6b6e9a4ec9c2ed4c58cfbdf4f23e5d94a))
- **DatePicker:** fix first click not working on month selection ([#3019](https://github.com/rsuite/rsuite/issues/3019)) ([42eeaa3](https://github.com/rsuite/rsuite/commit/42eeaa3cc5e19442157f771f02dab850f257c2dc))
- **Whisper:** add type checking for child components ([#3012](https://github.com/rsuite/rsuite/issues/3012)) ([c189119](https://github.com/rsuite/rsuite/commit/c18911903141423d79eb79d5313bc47dd974705e))

### Features

- **CustomProvider:** add support for disableRipple on `<CustomProvider>` ([#3030](https://github.com/rsuite/rsuite/issues/3030)) ([c6bb7ad](https://github.com/rsuite/rsuite/commit/c6bb7ade76ea843b43e799c5cb797b6b5e69d98f))

### Performance Improvements

- **Button:** improved button color when hovered and activated ([#3022](https://github.com/rsuite/rsuite/issues/3022)) ([7973696](https://github.com/rsuite/rsuite/commit/7973696c2854d7199fc27d040dffe45dc356dc9a))

## [5.24.1](https://github.com/rsuite/rsuite/compare/v5.24.0...v5.24.1) (2023-01-12)

### Bug Fixes

- **DatePicker,DateRangePicker:** fix the background color error when the cell is hovered ([#3018](https://github.com/rsuite/rsuite/issues/3018)) ([9d6f43e](https://github.com/rsuite/rsuite/commit/9d6f43e6db6049b7fdcc8514e071d870b785ecbb))
- **MultiCascader:** fix load async data error in inline mode ([#3015](https://github.com/rsuite/rsuite/issues/3015)) ([081eb14](https://github.com/rsuite/rsuite/commit/081eb14de9fb37d80a95324a669b8089e29ef03c)), closes [#3014](https://github.com/rsuite/rsuite/issues/3014)
- **Navbar.Brand:** fix missing href prop ([#3007](https://github.com/rsuite/rsuite/issues/3007)) ([d0a1f27](https://github.com/rsuite/rsuite/commit/d0a1f276d63e25c295fbef94f82559333ba4c148))
- **Tree:** fix Tree drag preview style error ([#3003](https://github.com/rsuite/rsuite/issues/3003)) ([4830148](https://github.com/rsuite/rsuite/commit/4830148b9e325bee926a2bfefe0786c08952ec79))

### Performance Improvements

- **CSS transitions:** improved duration of transitions ([#3016](https://github.com/rsuite/rsuite/issues/3016)) ([d1829da](https://github.com/rsuite/rsuite/commit/d1829da2e77131e031479ef9aa4f6d00d6307a52))

# [5.24.0](https://github.com/rsuite/rsuite/compare/v5.23.3...v5.24.0) (2022-12-30)

### Bug Fixes

- **AutoComplete:** fix AutoComplete size property not working ([#2990](https://github.com/rsuite/rsuite/issues/2990)) ([add665b](https://github.com/rsuite/rsuite/commit/add665b82b9d2cbd21e07576bf77f74e18991e21))
- **DatePicker:** fix inconsistency between month selectable state and ok button clickable state ([#2984](https://github.com/rsuite/rsuite/issues/2984)) ([70e6aba](https://github.com/rsuite/rsuite/commit/70e6aba0b7a3216c9f8b59b033826e55bebac1a1))
- **Sidenav:** fix Sidenav multilevel Nav.Menu arrow icon exception ([#2986](https://github.com/rsuite/rsuite/issues/2986)) ([87f6748](https://github.com/rsuite/rsuite/commit/87f67482b60eae4ed445246fe3e6ac9b0cad0385))

### Features

- **Dropdown:** add Dropdown.Separator component ([#2979](https://github.com/rsuite/rsuite/issues/2979)) ([db6fcbb](https://github.com/rsuite/rsuite/commit/db6fcbbd88961e3506f6b2d2146cf43717d1e1db))

## [5.23.3](https://github.com/rsuite/rsuite/compare/v5.23.2...v5.23.3) (2022-12-16)

### Bug Fixes

- **Modal:** fix close button alignment and color ([#2973](https://github.com/rsuite/rsuite/issues/2973)) ([b1eb5b4](https://github.com/rsuite/rsuite/commit/b1eb5b406a29788290a704414cc5a19b115690c7))

## [5.23.2](https://github.com/rsuite/rsuite/compare/v5.23.1...v5.23.2) (2022-12-09)

### Bug Fixes

- **Form.HelpText:** change font size to 12px ([#2968](https://github.com/rsuite/rsuite/issues/2968)) ([5c3898e](https://github.com/rsuite/rsuite/commit/5c3898ed2726beb81c09accd4d91963849d0dd31))
- **Nav.Menu:** fix noCaret has No Effect on a Sub-menu ([#2960](https://github.com/rsuite/rsuite/issues/2960)) ([e51fb6b](https://github.com/rsuite/rsuite/commit/e51fb6b593f0221f2ac3288b55658d540db214f9))
- **pickers:** the focused item should be within the container's viewport ([#2957](https://github.com/rsuite/rsuite/issues/2957)) ([cab5c63](https://github.com/rsuite/rsuite/commit/cab5c63ffde3963c72363adf00531ef3ab9d9e83))
- **Tooltip:** should use the default text alignment ([#2965](https://github.com/rsuite/rsuite/issues/2965)) ([3280775](https://github.com/rsuite/rsuite/commit/3280775a699a3683b2c45b543fbd8e6576206142))

## [5.23.1](https://github.com/rsuite/rsuite/compare/v5.23.0...v5.23.1) (2022-12-02)

### Bug Fixes

- **AutoComplete:** fix animation props being passed on Input ([#2950](https://github.com/rsuite/rsuite/issues/2950)) ([4c21993](https://github.com/rsuite/rsuite/commit/4c21993531ef775e9b505d8d1d1fafce04e1b49b))
- **MultiCascader:** fix unable to search for child items when `childKey` is set a value other than "children" ([#2926](https://github.com/rsuite/rsuite/issues/2926)) ([5d35f6c](https://github.com/rsuite/rsuite/commit/5d35f6c1639a49174274ccabf2edd3b40a388c32))

# [5.23.0](https://github.com/rsuite/rsuite/compare/v5.22.2...v5.23.0) (2022-11-25)

### Bug Fixes

- **Dropdown:** fix error on deletion of last Dropdown.Item ([#2931](https://github.com/rsuite/rsuite/issues/2931)) ([8ed39e5](https://github.com/rsuite/rsuite/commit/8ed39e5673beb9224eded31096f5fa08297dfeed))
- **InputNumber:** fix `scrollable` not working ([#2915](https://github.com/rsuite/rsuite/issues/2915)) ([c76589e](https://github.com/rsuite/rsuite/commit/c76589e57c4f01d5b410672b6b7f703a6dfd6deb))

### Features

- **locales:** add Turkish locale file ([#2933](https://github.com/rsuite/rsuite/issues/2933)) ([7277d09](https://github.com/rsuite/rsuite/commit/7277d09f6e2fde3e3e4ac0786f20dd2efaeb9062))
- **locales:** added kk_KZ locale ([#2924](https://github.com/rsuite/rsuite/issues/2924)) ([779a65a](https://github.com/rsuite/rsuite/commit/779a65ad5c255b60a91959d7b9846346982009bb))

## [5.22.2](https://github.com/rsuite/rsuite/compare/v5.22.1...v5.22.2) (2022-11-17)

### Bug Fixes

- **DatePicker:** call onSelect when meridian toggled ([#2907](https://github.com/rsuite/rsuite/issues/2907)) ([9028097](https://github.com/rsuite/rsuite/commit/9028097c0049df152f83b14267c3ec30f6ae7fa9))

## [5.22.1](https://github.com/rsuite/rsuite/compare/v5.22.0...v5.22.1) (2022-11-11)

### Bug Fixes

- **DateRangePicker:** fix time on calendar changing with date change ([#2884](https://github.com/rsuite/rsuite/issues/2884)) ([77529af](https://github.com/rsuite/rsuite/commit/77529af661eac3abec994f146c3c7262a85f2009))

# [5.22.0](https://github.com/rsuite/rsuite/compare/v5.21.0...v5.22.0) (2022-11-03)

### Bug Fixes

- **DateRangePicker:** fix end time not using time on second calendar ([#2852](https://github.com/rsuite/rsuite/issues/2852)) ([b243567](https://github.com/rsuite/rsuite/commit/b243567520404b65bdb4d07d9a150f09730fd66e))
- **Table:** remove transition on hover of table row ([#2858](https://github.com/rsuite/rsuite/issues/2858)) ([9d26226](https://github.com/rsuite/rsuite/commit/9d26226004b618e8acb7b4d0802b1c3757b0a8e6))

### Features

- **DatePicker:** allow ranges on left of calendar ([#2851](https://github.com/rsuite/rsuite/issues/2851)) ([ba2f7ee](https://github.com/rsuite/rsuite/commit/ba2f7ee1355ec70089557f4eab1614f53bfd6857)), closes [#2845](https://github.com/rsuite/rsuite/issues/2845)
- **Table:** support for show full text when hovering over a cell ([#2862](https://github.com/rsuite/rsuite/issues/2862)) ([f8b7eeb](https://github.com/rsuite/rsuite/commit/f8b7eebd9b456c4d154695dcfc6c59ce0b82aeac))
- **Table:** support for show full text when hovering over a cell ([#2862](https://github.com/rsuite/rsuite/issues/2862)) ([5528225](https://github.com/rsuite/rsuite/commit/5528225c432b6e909ce3ee0d82240070886e3811))
- **Table:** support for show full text when hovering over a cell ([#2862](https://github.com/rsuite/rsuite/issues/2862)) ([fe2d769](https://github.com/rsuite/rsuite/commit/fe2d769a53549ec77f510b1d5075bb8c66511647))
- **Table:** support for show full text when hovering over a cell ([#2862](https://github.com/rsuite/rsuite/issues/2862)) ([6c4cf18](https://github.com/rsuite/rsuite/commit/6c4cf18bb9001940cbdbc9c9464faf5783691dc6))

# [5.21.0](https://github.com/rsuite/rsuite/compare/v5.20.0...v5.21.0) (2022-10-27)

### Bug Fixes

- **DateRangePicker:** fix end time will change with the start time ([#2841](https://github.com/rsuite/rsuite/issues/2841)) ([7fb38dd](https://github.com/rsuite/rsuite/commit/7fb38dd6aaf84e018d4f3e06882fb92dfa20e5bd))

### Features

- support React 18 ([#2595](https://github.com/rsuite/rsuite/issues/2595)) ([a071214](https://github.com/rsuite/rsuite/commit/a071214e4cffb2f9607887e776a52af42aed58cb)), closes [#2646](https://github.com/rsuite/rsuite/issues/2646) [#2661](https://github.com/rsuite/rsuite/issues/2661) [#2681](https://github.com/rsuite/rsuite/issues/2681) [#2776](https://github.com/rsuite/rsuite/issues/2776) [#2806](https://github.com/rsuite/rsuite/issues/2806) [#2826](https://github.com/rsuite/rsuite/issues/2826) [#2825](https://github.com/rsuite/rsuite/issues/2825)

# [5.20.0](https://github.com/rsuite/rsuite/compare/v5.19.1...v5.20.0) (2022-10-21)

### Bug Fixes

- **DatePicker:** reset calendar selection after closing picker menu ([#2807](https://github.com/rsuite/rsuite/issues/2807)) ([1ef91a8](https://github.com/rsuite/rsuite/commit/1ef91a846fc6d99c7479e96994aa50da2af9ef9e))
- **Form.Control:** when shouldResetWithUnmount should remove value and error ([#2802](https://github.com/rsuite/rsuite/issues/2802)) ([f8d108a](https://github.com/rsuite/rsuite/commit/f8d108aed3e94811491be63e3373008d12e83b60))

### Features

- **SelectPicker,CheckPicker:** add `loading` prop ([#2808](https://github.com/rsuite/rsuite/issues/2808)) ([3a5e5d5](https://github.com/rsuite/rsuite/commit/3a5e5d5d4b891373c8a05ec4d642103f75920f10))

## [5.19.1](https://github.com/rsuite/rsuite/compare/v5.19.0...v5.19.1) (2022-10-13)

### Bug Fixes

- **Cascader,MultiCascader:** fix sub-columns not being removed when a leaf node is selected ([#2792](https://github.com/rsuite/rsuite/issues/2792)) ([619c7de](https://github.com/rsuite/rsuite/commit/619c7debfca63a58622a1ae4a4776544bebf3405))
- **CheckTreePicker:** fix children node can't uncheck when setting virtualized ([#2782](https://github.com/rsuite/rsuite/issues/2782)) ([#2783](https://github.com/rsuite/rsuite/issues/2783)) ([50f7b89](https://github.com/rsuite/rsuite/commit/50f7b89dbe1a2b59c212e021e1bc42c50e9ebb37))
- **DateRangePicker:** fix predefined range affecting calendar height ([#2794](https://github.com/rsuite/rsuite/issues/2794)) ([957ce4e](https://github.com/rsuite/rsuite/commit/957ce4e197355ecbb9a0aea6cb6c5906ab1e1a2a))
- **TreePicker, CheckTreePicker:** ignore backspace when setting cleanable=false or disabled=true ([#2798](https://github.com/rsuite/rsuite/issues/2798)) ([eefe0eb](https://github.com/rsuite/rsuite/commit/eefe0ebc396ee1764243a1e2c8ec432dc6ce39a5))
- **TreePicker,CheckTreePicker:** fix `renderExtraFooter` causing the … ([#2745](https://github.com/rsuite/rsuite/issues/2745)) ([d7279d1](https://github.com/rsuite/rsuite/commit/d7279d14877e4b3b0ac74abdfeb56836b3a07780)), closes [#2758](https://github.com/rsuite/rsuite/issues/2758)
- **TreePicker,CheckTreePicker:** fix value being cleared internally when value is controlled ([#2788](https://github.com/rsuite/rsuite/issues/2788)) ([4521a27](https://github.com/rsuite/rsuite/commit/4521a2730a7311b7fe095d85e39966a1d56f5d9d)), closes [#2784](https://github.com/rsuite/rsuite/issues/2784)

### Features

- **i18n:** add fr_FR locale ([#2735](https://github.com/rsuite/rsuite/issues/2735)) ([087cfc8](https://github.com/rsuite/rsuite/commit/087cfc885252d764864e075b086f5d980f94db94))

### Performance Improvements

- **CheckTreePicker:** improve performance when using large data ([#2767](https://github.com/rsuite/rsuite/issues/2767)) ([651a8a1](https://github.com/rsuite/rsuite/commit/651a8a1ebb0bf1c1e07e1541ca1f0a61a96a3df4))

# [5.19.0](https://github.com/rsuite/rsuite/compare/v5.18.1...v5.19.0) (2022-09-23)

### Bug Fixes

- **CheckPicker,SelectPicker:** fix inconsistent label spacing ([#2739](https://github.com/rsuite/rsuite/issues/2739)) ([2441d7e](https://github.com/rsuite/rsuite/commit/2441d7efa20e92f11b3266ca2434a9529b31ecb4))
- **Dropdown:** fix `disabled` not working when trigger is set to hover or contextMenu ([#2740](https://github.com/rsuite/rsuite/issues/2740)) ([147821c](https://github.com/rsuite/rsuite/commit/147821c54ef7814820a91edb79e0923c99ab6d0b))
- **Sidenav:** fix tooltip blocking menu items ([#2747](https://github.com/rsuite/rsuite/issues/2747)) ([d3568e1](https://github.com/rsuite/rsuite/commit/d3568e18fc5951340951a49c2ac121a786763dd9))
- **Stack:** filter children that should not be rendered ([#2732](https://github.com/rsuite/rsuite/issues/2732)) ([23c283f](https://github.com/rsuite/rsuite/commit/23c283f26da8ed9db4f4975c79b7cfe916f82903))

### Features

- **Stack:** add `Item` to adjust single child ([#2730](https://github.com/rsuite/rsuite/issues/2730)) ([5af6256](https://github.com/rsuite/rsuite/commit/5af625690be33c54def844db3bcf6aa47cc72eed))

## [5.18.1](https://github.com/rsuite/rsuite/compare/v5.18.0...v5.18.1) (2022-09-15)

### Bug Fixes

- **Nav:** fix incorrect height of <Nav.Menu>, fix [#2678](https://github.com/rsuite/rsuite/issues/2678) ([#2716](https://github.com/rsuite/rsuite/issues/2716)) ([8cefc64](https://github.com/rsuite/rsuite/commit/8cefc64ecfc6614bff4842b193f515064f0b5e3b))
- **Stack:** fix spacing compat for chrome under 84 ([#2718](https://github.com/rsuite/rsuite/issues/2718)) ([a75b6a6](https://github.com/rsuite/rsuite/commit/a75b6a6b8cf0e2aa11abfde6205ddba57f458414))

### Features

- **Calendar:** add a button to collapse the month and time view ([#2722](https://github.com/rsuite/rsuite/issues/2722)) ([b49bfaf](https://github.com/rsuite/rsuite/commit/b49bfaf5b553d1d13c17ba07951306147091ee44))
- **List:** add size prop to ListItem ([#2714](https://github.com/rsuite/rsuite/issues/2714)) ([ed3b023](https://github.com/rsuite/rsuite/commit/ed3b02305ef603d2d1b60bedd849f6c946ef7127))

# [5.18.0](https://github.com/rsuite/rsuite/compare/v5.17.1...v5.18.0) (2022-09-08)

### Bug Fixes

- **CheckTreePicker:** fix uncheckable style errors ([#2695](https://github.com/rsuite/rsuite/issues/2695)) ([b47a048](https://github.com/rsuite/rsuite/commit/b47a048f358ca187079ec049340288c72c8999bd))
- **DateRangePicker:** fix predefined range and OK button conflict ([#2701](https://github.com/rsuite/rsuite/issues/2701)) ([e538d57](https://github.com/rsuite/rsuite/commit/e538d57e209548f2ca9c9b1f937e275181ae97d9))
- **Dropdown.Menu:** fix custom className overriding rsuite classNames ([#2703](https://github.com/rsuite/rsuite/issues/2703)) ([db1a4db](https://github.com/rsuite/rsuite/commit/db1a4dbf5ddd7cbd4765e91f76bc4c4f8eb598c2))
- **FormControl:** fix InputGroup not filling the container when fluid ([#2689](https://github.com/rsuite/rsuite/issues/2689)) ([d7b5550](https://github.com/rsuite/rsuite/commit/d7b55506d9810fd854c4ebe60c99a36e9fb9545e))
- **Input:** fix missing focus ring when mouse hover ([#2702](https://github.com/rsuite/rsuite/issues/2702)) ([f548514](https://github.com/rsuite/rsuite/commit/f548514ed93945d27903190627d03380874d8f1a))
- **List:** fix helper/holder classname ([#2697](https://github.com/rsuite/rsuite/issues/2697)) ([cd2c42d](https://github.com/rsuite/rsuite/commit/cd2c42d4e3fc9659e3936bec26117cc79882420c))

### Features

- **List:** allow sort with non-adjacent collection ([#2690](https://github.com/rsuite/rsuite/issues/2690)) ([24cfffb](https://github.com/rsuite/rsuite/commit/24cfffb32253e5da463807768318be22bc647ceb))
- **Uploader:** add support for Button properties on Uploader ([#2688](https://github.com/rsuite/rsuite/issues/2688)) ([6c07781](https://github.com/rsuite/rsuite/commit/6c07781c13a1d46a9220511cd046d668ce593122))

## [5.17.1](https://github.com/rsuite/rsuite/compare/v5.17.0...v5.17.1) (2022-09-01)

### Bug Fixes

- **InputGroup:** fix icons not being vertically centered within the input ([#2680](https://github.com/rsuite/rsuite/issues/2680)) ([b10a050](https://github.com/rsuite/rsuite/commit/b10a050fb52f6fbc23e2cc308d57d67a515596e7))

### Features

- **DatePicker,DateRangePicker:** support to disable keyboard input ([#2673](https://github.com/rsuite/rsuite/issues/2673)) ([01ec4a8](https://github.com/rsuite/rsuite/commit/01ec4a8587d72842f0ae2d76ee51715e9bf7c6c2))

# [5.17.0](https://github.com/rsuite/rsuite/compare/v5.16.6...v5.17.0) (2022-08-26)

### Features

- **DateRangePicker:** supports placing predefined ranges on the left ([#2670](https://github.com/rsuite/rsuite/issues/2670)) ([8df4a61](https://github.com/rsuite/rsuite/commit/8df4a61d3b81e6054369197ff44e1416ea1aefbb))

## [5.16.6](https://github.com/rsuite/rsuite/compare/v5.16.5...v5.16.6) (2022-08-18)

### Bug Fixes

- **Button:** use [@cursor-disabled](https://github.com/cursor-disabled) intead of hardcoded cursor ([#2658](https://github.com/rsuite/rsuite/issues/2658)) ([5731762](https://github.com/rsuite/rsuite/commit/57317622eb2d65e94e0a8bb962512232cc4dfd3d))
- **DatePicker,DateRangePicker:** display month name as title of month calendar view ([#2660](https://github.com/rsuite/rsuite/issues/2660)) ([1e812ef](https://github.com/rsuite/rsuite/commit/1e812ef7510ea7b82beda7c058bd07080db198f5))
- **Form.Control:** apply className to accepter component ([#2662](https://github.com/rsuite/rsuite/issues/2662)) ([a164d28](https://github.com/rsuite/rsuite/commit/a164d287acfe8be2f98080e3b7eb15971f47809f))

## [5.16.5](https://github.com/rsuite/rsuite/compare/v5.16.4...v5.16.5) (2022-08-11)

### Bug Fixes

- **AutoComplete:** fix `listbox` not keeping the same width as `input` ([#2645](https://github.com/rsuite/rsuite/issues/2645)) ([ad09288](https://github.com/rsuite/rsuite/commit/ad09288e0fc38f964524466a79ca25532dc221f8))
- **AutoComplete:** fix missing definition of string in datatype ([#2644](https://github.com/rsuite/rsuite/issues/2644)) ([528e291](https://github.com/rsuite/rsuite/commit/528e29154d188d928e3d93853f5ed0673b932b4a))
- **DateRangePicker:** fix default time not working ([#2642](https://github.com/rsuite/rsuite/issues/2642)) ([915de28](https://github.com/rsuite/rsuite/commit/915de2820af418195e7f9a6ed228c1b05362d633))

## [5.16.4](https://github.com/rsuite/rsuite/compare/v5.16.3...v5.16.4) (2022-08-04)

### Bug Fixes

- **DatePicker:** fix issues with focus event ([#2636](https://github.com/rsuite/rsuite/issues/2636)) ([76b68aa](https://github.com/rsuite/rsuite/commit/76b68aa79dd129a210238517c279fe41b0da89ac))

## [5.16.3](https://github.com/rsuite/rsuite/compare/v5.16.2...v5.16.3) (2022-07-29)

### Bug Fixes

- **DateRangePicker:** fix predefined `ranges` cannot close picker ([#2614](https://github.com/rsuite/rsuite/issues/2614)) ([7773899](https://github.com/rsuite/rsuite/commit/7773899d5cda5ce53d556be85abc76f23166fc28))
- **listProps:** fix properties in listProps to be optional ([#2622](https://github.com/rsuite/rsuite/issues/2622)) ([650abbd](https://github.com/rsuite/rsuite/commit/650abbdd7b1073fb1a5a3d3ca761127ac2dcdd08))

## [5.16.2](https://github.com/rsuite/rsuite/compare/v5.16.1...v5.16.2) (2022-07-28)

### Bug Fixes

- **CustomProvider:** fix warnings caused by server-side rendering ([#2599](https://github.com/rsuite/rsuite/issues/2599)) ([ea05efb](https://github.com/rsuite/rsuite/commit/ea05efba3c53bf7e04ea4caa7b378a762b85af93))
- **DateRangePicker:** improved experience for date range selection ([#2618](https://github.com/rsuite/rsuite/issues/2618)) ([225fc08](https://github.com/rsuite/rsuite/commit/225fc08e21d43c41d92c1514f67c05eb660bf9dd))
- **focus:** fix outline style for form components when focused ([#2601](https://github.com/rsuite/rsuite/issues/2601)) ([0e2f9df](https://github.com/rsuite/rsuite/commit/0e2f9dffe5e882fc56727eb8ba8901aaf1b7d7b3))
- **OverlayTrigger:** fix invalid rendering without followCursor ([#2600](https://github.com/rsuite/rsuite/issues/2600)) ([08abc8e](https://github.com/rsuite/rsuite/commit/08abc8e825af55d8334a6e6057d4f5582a3197ac))
- **Panel:** allow custom header in collapsible panels ([#2611](https://github.com/rsuite/rsuite/issues/2611)) ([6372d44](https://github.com/rsuite/rsuite/commit/6372d441235b5b65036c257608098df01f93bf6d))
- **Picker:** add missing caretAs prop declaration ([#2592](https://github.com/rsuite/rsuite/issues/2592)) ([faabba4](https://github.com/rsuite/rsuite/commit/faabba4b32d82f819b5c5431c3d7040798db1765))
- **Picker:** fix style dependency ([#2612](https://github.com/rsuite/rsuite/issues/2612)) ([0b5b1d6](https://github.com/rsuite/rsuite/commit/0b5b1d60909a069c317f069e9ab235da70eb4aa3))
- **SelectPicker:** make controlled value nullable ([#2591](https://github.com/rsuite/rsuite/issues/2591)) ([6619a75](https://github.com/rsuite/rsuite/commit/6619a75eca9eabf9bf08dd84dee78f1df0e094ca))
- **treelike:** fix data item stringify throw error ([#2606](https://github.com/rsuite/rsuite/issues/2606)) ([3a586d2](https://github.com/rsuite/rsuite/commit/3a586d28e075b5bdd95d8df948ce4887570fab1d))

## [5.16.1](https://github.com/rsuite/rsuite/compare/v5.16.0...v5.16.1) (2022-07-15)

### Bug Fixes

- **InputNumber:** fix unexpected focus ring when used within an InputGroup ([#2585](https://github.com/rsuite/rsuite/issues/2585)) ([6f76b57](https://github.com/rsuite/rsuite/commit/6f76b5752bca2e11639d7fe34dd927dd84c98f73))
- **SelectPicker,CheckPicker:** add missing label prop declaration ([#2586](https://github.com/rsuite/rsuite/issues/2586)) ([e1a8cfe](https://github.com/rsuite/rsuite/commit/e1a8cfe32223ec210ac9a5ff793b973d4bcac131))

# [5.16.0](https://github.com/rsuite/rsuite/compare/v5.15.2...v5.16.0) (2022-07-07)

### Features

- **SelectPicker,CheckPicker:** add label prop ([#2572](https://github.com/rsuite/rsuite/issues/2572)) ([d00f442](https://github.com/rsuite/rsuite/commit/d00f442c46eb5edbb13d127b23f1c2eda6cf60d7))

## [5.15.2](https://github.com/rsuite/rsuite/compare/v5.15.1...v5.15.2) (2022-06-30)

### Bug Fixes

- **DateRangePicker:** fix Ok button not clickable ([#2564](https://github.com/rsuite/rsuite/issues/2564)) ([f80f94d](https://github.com/rsuite/rsuite/commit/f80f94db2a1c9c7738c3fc514e24c8ceb7b50d9b))
- **InputGroup.Addon:** extend props from as element ([#2559](https://github.com/rsuite/rsuite/issues/2559)) ([d0c947c](https://github.com/rsuite/rsuite/commit/d0c947c7a6ea5fd3ed95a71b573c957be4d5f009))
- **Whisper:** specify speaker function argument types ([#2558](https://github.com/rsuite/rsuite/issues/2558)) ([6dda5c6](https://github.com/rsuite/rsuite/commit/6dda5c61d6f833174a576d814ce27287c92ed33f))

## [5.15.1](https://github.com/rsuite/rsuite/compare/v5.15.0...v5.15.1) (2022-06-16)

### Features

- **Uploader:** support `method` on `<Uploader>` ([#2541](https://github.com/rsuite/rsuite/issues/2541)) ([d3b821a](https://github.com/rsuite/rsuite/commit/d3b821a8f2acbd3162ec965ffdbaac07af23a727))

# [5.15.0](https://github.com/rsuite/rsuite/compare/v5.14.0...v5.15.0) (2022-06-09)

### Features

- **less:** expose primary palette variables ([#2532](https://github.com/rsuite/rsuite/issues/2532)) ([b1d187d](https://github.com/rsuite/rsuite/commit/b1d187da0f831a31d87f0e73ab28216d86394327))

# [5.14.0](https://github.com/rsuite/rsuite/compare/v5.13.1...v5.14.0) (2022-06-02)

### Bug Fixes

- **Button:** remove underline when hovered ([#2516](https://github.com/rsuite/rsuite/issues/2516)) ([8bbb10d](https://github.com/rsuite/rsuite/commit/8bbb10db425dadd4110db60b8b7066d8f97bab54))
- **Dropdown:** fix vertical alignment of submenus ([#2524](https://github.com/rsuite/rsuite/issues/2524)) ([7c0ef52](https://github.com/rsuite/rsuite/commit/7c0ef52e9c7f57abfd97814725f5b3b82cc5dd70))
- **Form:** make FormInstance methods non-nullable ([#2521](https://github.com/rsuite/rsuite/issues/2521)) ([225af8a](https://github.com/rsuite/rsuite/commit/225af8a9abdffaf76101f28e3690b7ede6a16139))
- **Modal:** expose missing props ([#2522](https://github.com/rsuite/rsuite/issues/2522)) ([2ed7040](https://github.com/rsuite/rsuite/commit/2ed704002d03cec1478de879b08c0d3e7fd2dcf1))
- **Panel:** fix accordion not collapsible expanded panel ([#2514](https://github.com/rsuite/rsuite/issues/2514)) ([10c80f2](https://github.com/rsuite/rsuite/commit/10c80f26622e2f5b8c2e81731b66e2276d5622c4))
- **Sidenav:** display tooltip when hovering collapsed Sidenav item ([#2504](https://github.com/rsuite/rsuite/issues/2504)) ([d1238eb](https://github.com/rsuite/rsuite/commit/d1238ebb22e2458a780846903e042de72c1d8143))
- **Sidenav:** remove subtle item bg when focused by mouse ([#2511](https://github.com/rsuite/rsuite/issues/2511)) ([819461c](https://github.com/rsuite/rsuite/commit/819461c918e809fa397fe3dc6146510a9ffb1bd2))
- **Table:** fix elements in merged cells being occluded ([#2513](https://github.com/rsuite/rsuite/issues/2513)) ([22e5467](https://github.com/rsuite/rsuite/commit/22e54671cbeb3e63d8480469c3d53744732308f2))

### Features

- **grid:** synchronize all grid size and breakpoint with bootstrap5 ([e8d2d37](https://github.com/rsuite/rsuite/commit/e8d2d372e2280336482de648d9619607b9cb1798))
- **Nav.Menu:** add `openDirection` prop ([#2523](https://github.com/rsuite/rsuite/issues/2523)) ([bd824ac](https://github.com/rsuite/rsuite/commit/bd824ac9359cc5cebb848424d8045986e32c6462))
- **toaster:** add support for useToaster ([#2518](https://github.com/rsuite/rsuite/issues/2518)) ([75cb960](https://github.com/rsuite/rsuite/commit/75cb9601b56fbdc64a09b9bbc93aaf2b22b715c4))
- **Tooltip,Popover:** add arrow props to hide arrow indicator ([48d876f](https://github.com/rsuite/rsuite/commit/48d876f7d2211f5e9cb1db7e8f552152821e05ac))
- **Tooltip,Popover:** add followCursor props to enable speaker follow cursor ([e3bf75d](https://github.com/rsuite/rsuite/commit/e3bf75d4e4c537bf677c404fce84b76266531630))

### Performance Improvements

- **Dropdown:** improve contrast of active Dropdown item background color ([#2510](https://github.com/rsuite/rsuite/issues/2510)) ([35a418a](https://github.com/rsuite/rsuite/commit/35a418ae5f2104e6ac56ebe5c91d426025fce94a))

## [5.13.1](https://github.com/rsuite/rsuite/compare/v5.13.0...v5.13.1) (2022-05-27)

### Bug Fixes

- **CheckTreePicker:** fix duplicated key when data changed ([#2486](https://github.com/rsuite/rsuite/issues/2486)) ([#2500](https://github.com/rsuite/rsuite/issues/2500)) ([d155719](https://github.com/rsuite/rsuite/commit/d155719a9ae9d9cec119a0c33281c628379b4a78))
- **Sidenav:** correct Sidenav.Toggle styles ([#2497](https://github.com/rsuite/rsuite/issues/2497)) ([b3168e4](https://github.com/rsuite/rsuite/commit/b3168e426c3a2caad1689e9e9d3babf1d76022b8))
- **Sidenav:** correct subtle Sidenav item hover styles ([#2498](https://github.com/rsuite/rsuite/issues/2498)) ([2d853ee](https://github.com/rsuite/rsuite/commit/2d853ee8419a3283683bbf897442b9bc789b5a2a))
- **Sidenav:** fix Sidenav.Toggle icon direction ([#2495](https://github.com/rsuite/rsuite/issues/2495)) ([c490632](https://github.com/rsuite/rsuite/commit/c490632cc613807ff27124140b4250fc132aa8b2))
- **Whisper:** correct type declarations for ref ([856877a](https://github.com/rsuite/rsuite/commit/856877aec5a20710b94f6ddf241be76ecd34c88d))

### Features

- export WhisperInstance ([1c4eb5f](https://github.com/rsuite/rsuite/commit/1c4eb5ffbb6b5e69987436c03cc133f39c245866))

# [5.13.0](https://github.com/rsuite/rsuite/compare/v5.12.0...v5.13.0) (2022-05-19)

### Bug Fixes

- **listbox:** fix broken keyboard navigation after filtering ([#2491](https://github.com/rsuite/rsuite/issues/2491)) ([329623a](https://github.com/rsuite/rsuite/commit/329623a21e8d551db3e634894ddcbb3658b1579d))

### Performance Improvements

- **Cascader:** apply tree view pattern ([#2492](https://github.com/rsuite/rsuite/issues/2492)) ([f3a5808](https://github.com/rsuite/rsuite/commit/f3a5808eb60cc4f5250cce908322a702a91a9d96))

# [5.12.0](https://github.com/rsuite/rsuite/compare/v5.11.0...v5.12.0) (2022-05-12)

### Features

- **Form.Control:** add `rule` prop ([#2482](https://github.com/rsuite/rsuite/issues/2482)) ([d1917df](https://github.com/rsuite/rsuite/commit/d1917dfcb9474236f756551fa8908edc85e37197))

# [5.11.0](https://github.com/rsuite/rsuite/compare/v5.10.0...v5.11.0) (2022-05-05)

### Bug Fixes

- **ButtonToolbar:** change item gap to 10px ([#2475](https://github.com/rsuite/rsuite/issues/2475)) ([d97810a](https://github.com/rsuite/rsuite/commit/d97810ab4cd401b27be929569ce85bff0f498498))
- **Dropdown.Menu:** fix expected highlight item when focus moving in ([#2477](https://github.com/rsuite/rsuite/issues/2477)) ([b9fdea5](https://github.com/rsuite/rsuite/commit/b9fdea5d57ce76ddc80f5e9776feab02e4ebfacd))
- **Menubar:** fix unhandled nullish value ([#2478](https://github.com/rsuite/rsuite/issues/2478)) ([10d515d](https://github.com/rsuite/rsuite/commit/10d515d06dd08f2b93e5d7dbd3be7b1114185cab))

### Features

- **DateRangePicker:** expose calendars renderTitle ([#2480](https://github.com/rsuite/rsuite/issues/2480)) ([4461e09](https://github.com/rsuite/rsuite/commit/4461e09ec3917f379b5df213db16cedade6f39e1))

# [5.10.0](https://github.com/rsuite/rsuite/compare/v5.9.0...v5.10.0) (2022-04-28)

### Features

- **FormControl:** support `shouldResetWithUnmount` on `<FormControl>` ([#2468](https://github.com/rsuite/rsuite/issues/2468)) ([69dee5e](https://github.com/rsuite/rsuite/commit/69dee5ece1c20bdc1e1f42429e93150afb7995d8))

# [5.9.0](https://github.com/rsuite/rsuite/compare/v5.8.1...v5.9.0) (2022-04-21)

### Features

- **Dropdown:** add `open` and `defaultOpen` props ([#2442](https://github.com/rsuite/rsuite/issues/2442)) ([ab13d63](https://github.com/rsuite/rsuite/commit/ab13d6368676c19f8a4fb041e84a423b1a810914))

## [5.8.1](https://github.com/rsuite/rsuite/compare/v5.8.0...v5.8.1) (2022-04-15)

### Bug Fixes

- **Cascader:** infer value and onChange types from data ([#2449](https://github.com/rsuite/rsuite/issues/2449)) ([2a8ef48](https://github.com/rsuite/rsuite/commit/2a8ef481e49dec2570868982e0dbbba808efbc03))
- **Dropdown.Menu:** de-highlight item when mouse leaving ([#2443](https://github.com/rsuite/rsuite/issues/2443)) ([0d7b963](https://github.com/rsuite/rsuite/commit/0d7b96350b79a41557d1a7b67140c9654755194e))

# [5.8.0](https://github.com/rsuite/rsuite/compare/v5.7.1...v5.8.0) (2022-04-07)

### Bug Fixes

- **RangeSlider:** fix RangeSlider progress bar misalignment ([#2435](https://github.com/rsuite/rsuite/issues/2435)) ([e612ee3](https://github.com/rsuite/rsuite/commit/e612ee3b6bb97217ad08744c6b57b47e21397944))
- **SelectPicker:** call onSearch with empty string when closed ([#2411](https://github.com/rsuite/rsuite/issues/2411)) ([c6e5d54](https://github.com/rsuite/rsuite/commit/c6e5d54bdda0cdc61b65fbed78518ccef5d7672f))
- **Toggle:** add missing properties to onChange event target ([#2422](https://github.com/rsuite/rsuite/issues/2422)) ([5d1d5a2](https://github.com/rsuite/rsuite/commit/5d1d5a29a03f642c88aa66851163c9bb20d69684))

### Features

- **Cascader:** add `renderSearchItem` for customizing search result ([#2427](https://github.com/rsuite/rsuite/issues/2427)) ([e1b1dbd](https://github.com/rsuite/rsuite/commit/e1b1dbd2fd6cde10dfb1e041d9483b6748a0855f))
- **DateRangePicker:** export type definition ([#2434](https://github.com/rsuite/rsuite/issues/2434)) ([76e4bc3](https://github.com/rsuite/rsuite/commit/76e4bc38e8e939ae6ffbcf5bc154281b4ec9360c))

## [5.7.1](https://github.com/rsuite/rsuite/compare/v5.7.0...v5.7.1) (2022-04-02)

### Bug Fixes

- **Checkbox:** correct checked state in onChange callback ([#2430](https://github.com/rsuite/rsuite/issues/2430)) ([c6819f9](https://github.com/rsuite/rsuite/commit/c6819f98fe33e197376ecd1e301eaa471c6c2178))

# [5.7.0](https://github.com/rsuite/rsuite/compare/v5.6.6...v5.7.0) (2022-03-31)

### Bug Fixes

- **Checkbox:** set checked attribute on underlying input ([#2419](https://github.com/rsuite/rsuite/issues/2419)) ([5ded872](https://github.com/rsuite/rsuite/commit/5ded8720c70c1fe4aee3941a81c0d7ec3b0c7423))
- **Dropdown:** Fix menu item hover highlight ([#2415](https://github.com/rsuite/rsuite/issues/2415)) ([59453cc](https://github.com/rsuite/rsuite/commit/59453cc0c3c6f648b2797c48473c22104e579b4a))
- **Dropdown:** Fixed Triggering onSelect twice on Dropdown Menu ([#2414](https://github.com/rsuite/rsuite/issues/2414)) ([e09eee5](https://github.com/rsuite/rsuite/commit/e09eee5f6dac88816ecbf8d20f3bb1b78f4afa71))

### Features

- **Form:** export useFormClassNames hook ([#2420](https://github.com/rsuite/rsuite/issues/2420)) ([7e2bb85](https://github.com/rsuite/rsuite/commit/7e2bb8548103117a2df004f367fbde6609fcc216))

## [5.6.6](https://github.com/rsuite/rsuite/compare/v5.6.5...v5.6.6) (2022-03-24)

### Bug Fixes

- **InputNumber:** make plus/minus buttons unfocusable ([#2398](https://github.com/rsuite/rsuite/issues/2398)) ([ab4c721](https://github.com/rsuite/rsuite/commit/ab4c7218f20fd6aa6f4bad7818d403a3b6fd68df))
- **Uploader:** expose missing public types ([#2404](https://github.com/rsuite/rsuite/issues/2404)) ([5b1791f](https://github.com/rsuite/rsuite/commit/5b1791f0f0b23a230d03772178e9069bc16c8aa9))

## [5.6.5](https://github.com/rsuite/rsuite/compare/v5.6.4...v5.6.5) (2022-03-17)

### Features

- **Pickers:** `groupBy` supports dot notation ([#2397](https://github.com/rsuite/rsuite/issues/2397)) ([2ba7c0b](https://github.com/rsuite/rsuite/commit/2ba7c0b622c68b2fc526aa7ad2feaa8e73767e9c))

## [5.6.4](https://github.com/rsuite/rsuite/compare/v5.6.3...v5.6.4) (2022-03-10)

### Bug Fixes

- **CheckTree:** fix missing type definition [#2388](https://github.com/rsuite/rsuite/issues/2388) ([#2391](https://github.com/rsuite/rsuite/issues/2391)) ([0fe4e9f](https://github.com/rsuite/rsuite/commit/0fe4e9f34d7f07354541f4d23b0278cd1d892c2e))
- **Sidenav:** remove underline from focused sidenav item ([#2387](https://github.com/rsuite/rsuite/issues/2387)) ([a22f569](https://github.com/rsuite/rsuite/commit/a22f569a8c3f2b71513af20b4be6607cd1825783))

## [5.6.3](https://github.com/rsuite/rsuite/compare/v5.6.2...v5.6.3) (2022-03-05)

## [5.6.2](https://github.com/rsuite/rsuite/compare/v5.6.1...v5.6.2) (2022-02-24)

### Bug Fixes

- **Affix:** fix left offset not update after position change ([#2370](https://github.com/rsuite/rsuite/issues/2370)) ([eba3536](https://github.com/rsuite/rsuite/commit/eba353685f4892e1143b8c249ac956b2522a2993))
- **typescript:** remove not-null assertion operator ([#2359](https://github.com/rsuite/rsuite/issues/2359)) ([5c07293](https://github.com/rsuite/rsuite/commit/5c07293f5c9c2d4deee768be17e8cea840868708))

## [5.6.1](https://github.com/rsuite/rsuite/compare/v5.6.0...v5.6.1) (2022-02-17)

### Bug Fixes

- **caretAs:** fix DatePicker and DateRangePicker cannot replace caret ([#2360](https://github.com/rsuite/rsuite/issues/2360)) ([1e619b2](https://github.com/rsuite/rsuite/commit/1e619b2ef7abc58a93f6d6d4fc78ffea07761c81))
- **IconButton:** infer addtional props from as prop ([#2343](https://github.com/rsuite/rsuite/issues/2343)) ([3b6c25c](https://github.com/rsuite/rsuite/commit/3b6c25c103ed33a86baa47b8c757462da7ae8c4c))
- **Toaster:** code breaks when toaster is in a useEffect ([#2353](https://github.com/rsuite/rsuite/issues/2353)) ([d083fe2](https://github.com/rsuite/rsuite/commit/d083fe27013659cbc45196b7ead9ff5863404fb8)), closes [#2336](https://github.com/rsuite/rsuite/issues/2336)
- **useTimeout:** fix callback not being called after timeout ([#2349](https://github.com/rsuite/rsuite/issues/2349)) ([e82a12a](https://github.com/rsuite/rsuite/commit/e82a12aa2929cf66e7a3c6d70008c5bedb4ab128))

# [5.6.0](https://github.com/rsuite/rsuite/compare/v5.5.2...v5.6.0) (2022-02-10)

### Bug Fixes

- **DatePicker:** fixed oneTap to work in month view ([#2342](https://github.com/rsuite/rsuite/issues/2342)) ([d5368cd](https://github.com/rsuite/rsuite/commit/d5368cdfb2a6386bfb509a6316520e450f35f2b4))
- handle some null value branch ([#2323](https://github.com/rsuite/rsuite/issues/2323)) ([3ffd1d9](https://github.com/rsuite/rsuite/commit/3ffd1d966d5fd7f0a4f42bb8b08bf0cb65955fef))

### Features

- **Carousel:** Expose active index ([#2338](https://github.com/rsuite/rsuite/issues/2338)) ([beac483](https://github.com/rsuite/rsuite/commit/beac48395c9fc7c30efb3f49f81e8969cd3ee71d))

## [5.5.2](https://github.com/rsuite/rsuite/compare/v5.5.1...v5.5.2) (2022-01-27)

### Features

- **Cascader:** add parent node in serach result while parentSelectable ([#2313](https://github.com/rsuite/rsuite/issues/2313)) ([e677bb6](https://github.com/rsuite/rsuite/commit/e677bb6b75d0cc26dafedc8e5326d413969c2867))

## [5.5.1](https://github.com/rsuite/rsuite/compare/v5.5.0...v5.5.1) (2022-01-21)

### Bug Fixes

- **Carousel:** add a flex-wrap property on toolbar buttons ([#2302](https://github.com/rsuite/rsuite/issues/2302)) ([a9a9113](https://github.com/rsuite/rsuite/commit/a9a911378c4aaeba43233dd3acdc05913a9bf6ae))
- **CheckTreePicker:** fix CheckTreePicker label style ([#2304](https://github.com/rsuite/rsuite/issues/2304)) ([07eb5ac](https://github.com/rsuite/rsuite/commit/07eb5acd4e8283529619ad2b4d6003b0c4f8614d))
- **DateRangePicker:** fix month not selectable on calendar ([#2312](https://github.com/rsuite/rsuite/issues/2312)) ([5199845](https://github.com/rsuite/rsuite/commit/5199845ee435e923c807da5e0813f4ba06a86798))
- **Sidenav:** hide focus ring when interacting with mouse ([#2311](https://github.com/rsuite/rsuite/issues/2311)) ([9413bc9](https://github.com/rsuite/rsuite/commit/9413bc9a48fb8a3f915cc811b3392ba4e65b0b70))

### Performance Improvements

- Responsive for small screen ([#2293](https://github.com/rsuite/rsuite/issues/2293)) ([cadc42e](https://github.com/rsuite/rsuite/commit/cadc42e39baee174ff7d5577ea933cb471ef5bd0))

# [5.5.0](https://github.com/rsuite/rsuite/compare/v5.4.4...v5.5.0) (2022-01-13)

### Bug Fixes

- **Dropdown:** infer toggleAs component props ([#2299](https://github.com/rsuite/rsuite/issues/2299)) ([84611cc](https://github.com/rsuite/rsuite/commit/84611cc6f88e1d9cd712bc3f08be559d0a146ba0))
- **InputNumber:** inherit html input attributes ([#2298](https://github.com/rsuite/rsuite/issues/2298)) ([d7622ee](https://github.com/rsuite/rsuite/commit/d7622eed72b36ed15e91f606027d2e540391bdc7))
- **MultiCascader:** fix not rendering the count of selected values ([#2289](https://github.com/rsuite/rsuite/issues/2289)) ([324e90c](https://github.com/rsuite/rsuite/commit/324e90c8499adf58cb25083fd5c99fe98eb9ecba))
- **Tree:** fix dragNode has cyclic object ([#2281](https://github.com/rsuite/rsuite/issues/2281)) ([26cbaf2](https://github.com/rsuite/rsuite/commit/26cbaf2fd92ab562174e19cf55388c01fe22143a)), closes [#2268](https://github.com/rsuite/rsuite/issues/2268)

### Features

- **InputNumber:** support keyboard interaction ([#2294](https://github.com/rsuite/rsuite/issues/2294)) ([46993e2](https://github.com/rsuite/rsuite/commit/46993e235ca3d3ee8b6faa16a5fa11a8ed544e3b))
- **RangeSlider:** add `constraint` prop ([#2291](https://github.com/rsuite/rsuite/issues/2291)) ([a2d38a8](https://github.com/rsuite/rsuite/commit/a2d38a8efe4f85c28ce1f4ee79a89eda1e1cf7b0))

### Performance Improvements

- **styles:** simplify compound selectors over 4 levels ([#2282](https://github.com/rsuite/rsuite/issues/2282)) ([304e8da](https://github.com/rsuite/rsuite/commit/304e8da0c2057d148bbad36674aba33382439949))

## [5.4.4](https://github.com/rsuite/rsuite/compare/v5.4.3...v5.4.4) (2022-01-06)

### Bug Fixes

- **CheckTreePicker:** fix root node style incorrect ([#2279](https://github.com/rsuite/rsuite/issues/2279)) ([c09226e](https://github.com/rsuite/rsuite/commit/c09226e141f7881b11fe5594d802974f49e789a9))
- **DatePicker:** fix clear button not working ([#2273](https://github.com/rsuite/rsuite/issues/2273)) ([649362a](https://github.com/rsuite/rsuite/commit/649362aa697a292af28c5ec666e4337a7bd449c7))
- **Dropdown:** wrong submenu placement in RTL direction ([#2280](https://github.com/rsuite/rsuite/issues/2280)) ([c3735c3](https://github.com/rsuite/rsuite/commit/c3735c335d5a8ca6e9954af1e5b77c453b5bd4d2))
- **Navbar:** fix Whisper on Nav.Item within Navbar wrong positioning ([#2274](https://github.com/rsuite/rsuite/issues/2274)) ([bd0f5e3](https://github.com/rsuite/rsuite/commit/bd0f5e316e6bb910d9a41e43770b4d1a61528d9f)), closes [#2263](https://github.com/rsuite/rsuite/issues/2263)

## [5.4.3](https://github.com/rsuite/rsuite/compare/v5.4.2...v5.4.3) (2021-12-30)

### Bug Fixes

- **Drawer:** fix Drawer cannot be closed when backdrop is clicked ([#2259](https://github.com/rsuite/rsuite/issues/2259)) ([a49ee03](https://github.com/rsuite/rsuite/commit/a49ee03db33c11db30597221ca61ce6daa088c4b))
- **Picker:** add ref to PickerComponentProps ([#2261](https://github.com/rsuite/rsuite/issues/2261)) ([6e3e6c5](https://github.com/rsuite/rsuite/commit/6e3e6c57932af142dc1a74da6b7fffb57ae628ca))

## [5.4.2](https://github.com/rsuite/rsuite/compare/v5.4.1...v5.4.2) (2021-12-24)

### Bug Fixes

- **Affix:** fix unupdated position after window size change ([#2256](https://github.com/rsuite/rsuite/issues/2256)) ([61c7b27](https://github.com/rsuite/rsuite/commit/61c7b279f136ae44b9470046344cd6e163d02589))
- **Modal:** improve the mouse scrolling experience on Modal ([#2254](https://github.com/rsuite/rsuite/issues/2254)) ([137d57e](https://github.com/rsuite/rsuite/commit/137d57ef1e79ca0055b3af8d6cd5cff2a9c4ef55))
- **Navbar:** fix dropdown submenu throwing error ([#2250](https://github.com/rsuite/rsuite/issues/2250)) ([875130d](https://github.com/rsuite/rsuite/commit/875130d342f58e4078babe428913640e0b2faa04))

## [5.4.1](https://github.com/rsuite/rsuite/compare/v5.4.0...v5.4.1) (2021-12-23)

### Bug Fixes

- **Dropdown:** reduce padding in noCaret variant ([#2236](https://github.com/rsuite/rsuite/issues/2236)) ([682f883](https://github.com/rsuite/rsuite/commit/682f8830601d784452c10729a369ebe91057eddb))
- **Sidenav:** fix missing highlight on selected dropdown items ([#2216](https://github.com/rsuite/rsuite/issues/2216)) ([8f79d4a](https://github.com/rsuite/rsuite/commit/8f79d4a8aafb123f75f420a3adf3f680386aae68))
- **Sidenav:** prevent text wrapping when collapsing ([#2245](https://github.com/rsuite/rsuite/issues/2245)) ([4094233](https://github.com/rsuite/rsuite/commit/409423360a5226c8a0e11bbeecea0a4316c5c8e0))
- **Toggle:** dismiss uncontrolled input warning ([#2243](https://github.com/rsuite/rsuite/issues/2243)) ([c4737d5](https://github.com/rsuite/rsuite/commit/c4737d5af2fabf88312c7ee2b84d4e9139e743f1))

### Performance Improvements

- **Context:** use `useMemo` to memozie the values returned to the Context Provider ([#2244](https://github.com/rsuite/rsuite/issues/2244)) ([d25a719](https://github.com/rsuite/rsuite/commit/d25a71920d38bceefcf100248173121d54be8313))
- **DatePicker:** improve date grid a11y ([#2220](https://github.com/rsuite/rsuite/issues/2220)) ([655178e](https://github.com/rsuite/rsuite/commit/655178e05afe5e4b4619bda3a222dc753766e13b))

# [5.4.0](https://github.com/rsuite/rsuite/compare/v5.3.0...v5.4.0) (2021-12-17)

### Bug Fixes

- **DatePicker,DateRangePicker:** suppress depreated caretComponent warning ([#2233](https://github.com/rsuite/rsuite/issues/2233)) ([3a79d48](https://github.com/rsuite/rsuite/commit/3a79d486268ff31ad6a620dfc17165c3be259219))
- **DateRangePicker:** fix selecting ending date not working ([#2217](https://github.com/rsuite/rsuite/issues/2217)) ([2136aa3](https://github.com/rsuite/rsuite/commit/2136aa3327f914a910fb5805b2d11a036e0f6601))
- **Modal:** fix Modal focus being reset on re-rendering ([#2208](https://github.com/rsuite/rsuite/issues/2208)) ([a931b06](https://github.com/rsuite/rsuite/commit/a931b06942e7fc011ab77e70b105f5790a33e55b))
- **Nav:** fix incorrect Dropdown button background ([#2227](https://github.com/rsuite/rsuite/issues/2227)) ([421de83](https://github.com/rsuite/rsuite/commit/421de838ed13694254cc6a178d0369e12b666202))
- **Navbar:** fix icon style in Navbar items ([#2229](https://github.com/rsuite/rsuite/issues/2229)) ([560df61](https://github.com/rsuite/rsuite/commit/560df61a44c0338b153b2c09a50e946c207c684a))
- **Overlay:** overlay is rendered inside Modal by default ([#2230](https://github.com/rsuite/rsuite/issues/2230)) ([4fac628](https://github.com/rsuite/rsuite/commit/4fac628e23e41db097ec63c2ac348a7345f3ee31))
- **Radio:** fix unclickable without children ([#2190](https://github.com/rsuite/rsuite/issues/2190)) ([cef5946](https://github.com/rsuite/rsuite/commit/cef59463e281d6aa6b4b9576204d16eed58087c8))
- **SelectPicker:** fix onChange argument type ([#2193](https://github.com/rsuite/rsuite/issues/2193)) ([db0efa9](https://github.com/rsuite/rsuite/commit/db0efa94ad33de5d02bfd81e926cf622c40ecce7))
- **Steps:** step item not rendering number ([#2202](https://github.com/rsuite/rsuite/issues/2202)) ([413880b](https://github.com/rsuite/rsuite/commit/413880be99972d8a58d5f0a0c9b6b08017ad33a2))
- **Toggle:** fix Toggle is still clickable in loading state ([#2219](https://github.com/rsuite/rsuite/issues/2219)) ([e5661fd](https://github.com/rsuite/rsuite/commit/e5661fdb4ef659527ca97c2ea2231b4025e904d3))
- **Tree:** remove dragNode Element when drag node ([#2185](https://github.com/rsuite/rsuite/issues/2185)) ([#2237](https://github.com/rsuite/rsuite/issues/2237)) ([f6e959f](https://github.com/rsuite/rsuite/commit/f6e959f4aa24f0fa87b5fa1bbc6e1aa775fecd2b))

### Features

- **Stack:** add Stack support to the layout ([#2199](https://github.com/rsuite/rsuite/issues/2199)) ([1ac132e](https://github.com/rsuite/rsuite/commit/1ac132e0fc98a6739dee07d9e6281202530d80fa))

### Performance Improvements

- **CheckPicker:** infer value and onChange types from data prop ([#2228](https://github.com/rsuite/rsuite/issues/2228)) ([eb4f9a8](https://github.com/rsuite/rsuite/commit/eb4f9a8f4c84cf30b3521532d95f4dc2490d0699))

# [5.3.0](https://github.com/rsuite/rsuite/compare/5.2.4...5.3.0) (2021-12-10)

### Bug Fixes

- **Breadcrumb:** avoid separator key conflict with item key ([#2186](https://github.com/rsuite/rsuite/issues/2186)) ([428529a](https://github.com/rsuite/rsuite/commit/428529afb4f1c746ccebe06db3dd10438be8aa31))
- **Button:** apply size from parent ButtonGroup ([#2194](https://github.com/rsuite/rsuite/issues/2194)) ([85e9a21](https://github.com/rsuite/rsuite/commit/85e9a21d5cbc5c4fd4e92d591a8fe0cce5f43a15))
- **dts:** fix declaration errors in typescript strict mode ([#2130](https://github.com/rsuite/rsuite/issues/2130)) ([c31f080](https://github.com/rsuite/rsuite/commit/c31f080ea290d8420df77b406c29b89be44bef01))
- **Modal:** fix Modal not focused when opened ([#2180](https://github.com/rsuite/rsuite/issues/2180)) ([383ea12](https://github.com/rsuite/rsuite/commit/383ea129b315590700301ef823e7a24309e8237b))

### Features

- **AvatarGroup:** add support for AvatarGroup ([#2195](https://github.com/rsuite/rsuite/issues/2195)) ([2647bea](https://github.com/rsuite/rsuite/commit/2647bea5fcbe7148049ed5b6fa3118e86971572e))
- **FormControl:** allow explicit default value ([#2182](https://github.com/rsuite/rsuite/issues/2182)) ([691ee38](https://github.com/rsuite/rsuite/commit/691ee3807d567a379b3e82195d2b2d303449a466))
- **Tree,CheckTree:** support showIndentLine on <Tree> and <CheckTree> ([#2181](https://github.com/rsuite/rsuite/issues/2181)) ([720768e](https://github.com/rsuite/rsuite/commit/720768e7ac89752f11b5387f76b1e5e36c54221d))

## [5.2.4](https://github.com/rsuite/rsuite/compare/v5.2.3...v5.2.4) (2021-12-03)

### Bug Fixes

- **Carousel:** make onSelect prop optional ([#2170](https://github.com/rsuite/rsuite/issues/2170)) ([c4d7a63](https://github.com/rsuite/rsuite/commit/c4d7a63f4ec71ebb05d92b04bd26ebe547609dd0))
- **DateRangePicker:** fix DateRangePicker cannot switch am/pm ([#2171](https://github.com/rsuite/rsuite/issues/2171)) ([4c55db9](https://github.com/rsuite/rsuite/commit/4c55db9a3a96927589d4366ece1f329c011ccb0f))
- **pickers:** fix custom input in Picker cannot be focused ([#2176](https://github.com/rsuite/rsuite/issues/2176)) ([8a94bd6](https://github.com/rsuite/rsuite/commit/8a94bd6f9640995e017716fe69b68912c55e4c86))
- **Table:** fix the column of grouping cannot be centered ([#2168](https://github.com/rsuite/rsuite/issues/2168)) ([4fbe460](https://github.com/rsuite/rsuite/commit/4fbe460da4e9744eee8589233b305b7e15295e41))
- **tree:** expose methods for tree that can scroll the list ([#2178](https://github.com/rsuite/rsuite/issues/2178)) ([0a6f9ee](https://github.com/rsuite/rsuite/commit/0a6f9ee57ed33477472f2ad41c06d5242d3d62d5))

## [5.2.3](https://github.com/rsuite/rsuite/compare/v5.2.2...v5.2.3) (2021-11-26)

### Bug Fixes

- **useElementResize:** fix ResizeObserver being created repeatedly ([#2161](https://github.com/rsuite/rsuite/issues/2161)) ([32e2fa7](https://github.com/rsuite/rsuite/commit/32e2fa76a396945498f198d176b630ac09a4e20d))
- focus handler ([#2154](https://github.com/rsuite/rsuite/issues/2154)) ([3b17fbc](https://github.com/rsuite/rsuite/commit/3b17fbcae6da59ca58788c6b3aa60d79692dffa1))
- **TagPicker:** fix tag misplacement in plaintext mode ([#2152](https://github.com/rsuite/rsuite/issues/2152)) ([6d32c71](https://github.com/rsuite/rsuite/commit/6d32c714e1b9be743d57b3ae4f1622d006e0f52c))

### Performance Improvements

- **Menu:** prevent uneccesary re-render when mouseove on menuitems ([#2148](https://github.com/rsuite/rsuite/issues/2148)) ([dc06498](https://github.com/rsuite/rsuite/commit/dc0649822fd68964281f44c4ec2daf84953edc63))

## [5.2.2](https://github.com/rsuite/rsuite/compare/v5.2.1...v5.2.2) (2021-11-19)

### Bug Fixes

- **Dropdown:** dropdown item panel not rendering content ([#2128](https://github.com/rsuite/rsuite/issues/2128)) ([6631500](https://github.com/rsuite/rsuite/commit/6631500c74b0305026931a6379980fda9b587c6e))
- **IconButton:** primary icon button with text wrong bg ([#2141](https://github.com/rsuite/rsuite/issues/2141)) ([fde0cd4](https://github.com/rsuite/rsuite/commit/fde0cd4bce84c8f5d054d1722e9dfa61de49a7fa))
- **PanelGroup:** missing border for nested panels ([#2142](https://github.com/rsuite/rsuite/issues/2142)) ([225821f](https://github.com/rsuite/rsuite/commit/225821f2cdeba8637d70f4626f02ae1acd93eb24))

### Performance Improvements

- **resize:** improve the rerender performance of components after resize ([#2135](https://github.com/rsuite/rsuite/issues/2135)) ([71648ab](https://github.com/rsuite/rsuite/commit/71648ab061f7b4057675de2d0a6e08f2f8a70a61))

## [5.2.1](https://github.com/rsuite/rsuite/compare/v5.2.0...v5.2.1) (2021-11-12)

### Bug Fixes

- **CheckTree:** root node indeterminate state error ([#2124](https://github.com/rsuite/rsuite/issues/2124)) ([9dac0bc](https://github.com/rsuite/rsuite/commit/9dac0bc0e51b58b46aa85dac8a0348a9d73b2503))
- **Sidenav:** remove underline on hovered SidenavItem ([#2118](https://github.com/rsuite/rsuite/issues/2118)) ([56f7c3a](https://github.com/rsuite/rsuite/commit/56f7c3ad0f7ab31c7d5aef2fe2cde1661024f034))
- **Sidenav:** sidenav dropdown item accept as prop ([#2120](https://github.com/rsuite/rsuite/issues/2120)) ([5386999](https://github.com/rsuite/rsuite/commit/538699962dfd46faf41bb377833b0dcd06112039))

# [5.2.0](https://github.com/rsuite/rsuite/compare/v5.1.0...v5.2.0) (2021-11-05)

### Bug Fixes

- **Button:** Add button radius variable ([#2106](https://github.com/rsuite/rsuite/issues/2106)) ([63a61c4](https://github.com/rsuite/rsuite/commit/63a61c4eede3b22c91eef126b72fc1afb280a18e))
- **less:** palette function accepts rgb color ([#2107](https://github.com/rsuite/rsuite/issues/2107)) ([92c2dc5](https://github.com/rsuite/rsuite/commit/92c2dc5cf9273a26de189cee6e79b57740e17b49))
- can't perform a React state update on an unmounted component ([#2105](https://github.com/rsuite/rsuite/issues/2105)) ([44439af](https://github.com/rsuite/rsuite/commit/44439afdfdf481887a78fbd86f527e29eafb1a78))
- **dts:** remove redundant generics on SyntheticEvent ([#2099](https://github.com/rsuite/rsuite/issues/2099)) ([30ccd68](https://github.com/rsuite/rsuite/commit/30ccd685fb09092fb1fa693929cdba5d26967f96))
- **fa_IR:** trim long text of days to shorter ones ([#2076](https://github.com/rsuite/rsuite/issues/2076)) ([a893b82](https://github.com/rsuite/rsuite/commit/a893b82b835f9268a0053ede64565c96e6110095))
- **FormControl:** infer additional props from accepter ([#2084](https://github.com/rsuite/rsuite/issues/2084)) ([5d39fed](https://github.com/rsuite/rsuite/commit/5d39fed6e56418e85367df9dd5aeb7b49774380b))
- **Input:** correct value argument type for onChange callback ([#2087](https://github.com/rsuite/rsuite/issues/2087)) ([7a4ff02](https://github.com/rsuite/rsuite/commit/7a4ff02e1e01b40f2e2bffea105181500848d2c9))
- **Slider,RangeSlider:** reverse marks order in vertical orientation ([#2080](https://github.com/rsuite/rsuite/issues/2080)) ([07fdd09](https://github.com/rsuite/rsuite/commit/07fdd09bb504ea7e876e6e6b4da439a725f716a9))

# [5.1.0](https://github.com/rsuite/rsuite/compare/v5.0.3...v5.1.0) (2021-10-29)

### Bug Fixes

- **DatePicker:** fix DatePicker does not change value after pressing enter ([#2055](https://github.com/rsuite/rsuite/issues/2055)) ([c775444](https://github.com/rsuite/rsuite/commit/c7754445763f2553a3cc50e195b1dc347f774415))
- **DateRangePicker:** fix DateRangePicker does not change value after pressing enter ([#2056](https://github.com/rsuite/rsuite/issues/2056)) ([8e5db2e](https://github.com/rsuite/rsuite/commit/8e5db2e54d8e6ad79f7219dc69cd1f52f32a8295))
- **Dropdown.Item:** item inside Nav not pass "as" ([#2026](https://github.com/rsuite/rsuite/issues/2026)) ([34bfffd](https://github.com/rsuite/rsuite/commit/34bfffdbcd353753912b30b38523e3b62f430e98)), closes [#2025](https://github.com/rsuite/rsuite/issues/2025)
- **Dropdown.Item:** render custom element inside li ([#2044](https://github.com/rsuite/rsuite/issues/2044)) ([a2e8a00](https://github.com/rsuite/rsuite/commit/a2e8a00c94f77028ed489a65f970264eeb9551ea))
- **Overlay:** fix position offset inside container ([#2049](https://github.com/rsuite/rsuite/issues/2049)) ([c27b19e](https://github.com/rsuite/rsuite/commit/c27b19e9c9ec0191ccf5d36d9efe6b176b0b6d84))
- **Toggle:** improve a11y (keyboard focusable + keyboard events) ([#2032](https://github.com/rsuite/rsuite/issues/2032)) ([9fdfd52](https://github.com/rsuite/rsuite/commit/9fdfd52e1eab3ad3e93569112e33ad3490335fbd))

### Features

- **locales:** Created fa_IR locale to add support of Persian language in Rsuite locals ([#2061](https://github.com/rsuite/rsuite/issues/2061)) ([14e5946](https://github.com/rsuite/rsuite/commit/14e59466cfd285ec1098d67280338a7df1ef8f5f))
- **MaskedInput:** added support for MaskedInput to replace `react-text-mask` ([#2054](https://github.com/rsuite/rsuite/issues/2054)) ([496416a](https://github.com/rsuite/rsuite/commit/496416a2e4b32362252ef70f5c4e40f785ecf5be))
- **Toggle:** add loading prop ([#2031](https://github.com/rsuite/rsuite/issues/2031)) ([28778de](https://github.com/rsuite/rsuite/commit/28778de0af0495a1bb68479bf3c679413255ce7b))

## [5.0.3](https://github.com/rsuite/rsuite/compare/v5.0.2...v5.0.3) (2021-10-22)

### Bug Fixes

- **Navbar:** fix item hover style ([#2010](https://github.com/rsuite/rsuite/issues/2010)) ([8e6e13f](https://github.com/rsuite/rsuite/commit/8e6e13f3eafc1b0cd89900943e351fac817b8598))
- **pickers:** add missing default appearance ([#2004](https://github.com/rsuite/rsuite/issues/2004)) ([e0bbc45](https://github.com/rsuite/rsuite/commit/e0bbc45cfe5a1cc9978dd8e1d988294764ec321a))
- **Uploader:** fix disabled button opacity ([#2009](https://github.com/rsuite/rsuite/issues/2009)) ([a02aae7](https://github.com/rsuite/rsuite/commit/a02aae7395521a1246082e410811fe0e71b02a03))

<a name="5.0.2"></a>

## [5.0.2](https://github.com/rsuite/rsuite/compare/v5.0.1...v5.0.2) (2021-10-15)

### Bug Fixes

- **date-range-picker:** fix date formatting error when typing ([#1991](https://github.com/rsuite/rsuite/issues/1991)) ([f65f7f8](https://github.com/rsuite/rsuite/commit/f65f7f8))
- **pickers:** clean button overlapping with value ([#1984](https://github.com/rsuite/rsuite/issues/1984)) ([ec127dc](https://github.com/rsuite/rsuite/commit/ec127dc))
- **table:** fix the typescript type definition of Table ([#1998](https://github.com/rsuite/rsuite/issues/1998)) ([8d00b8d](https://github.com/rsuite/rsuite/commit/8d00b8d)), closes [#1958](https://github.com/rsuite/rsuite/issues/1958)
- **tag-picker:** update TagPicker trigger props declare. ([#1996](https://github.com/rsuite/rsuite/issues/1996)) ([27da381](https://github.com/rsuite/rsuite/commit/27da381))
- **uploader:** improve thumbnail rendering on file list ([#1997](https://github.com/rsuite/rsuite/issues/1997)) ([68344d7](https://github.com/rsuite/rsuite/commit/68344d7))

<a name="5.0.1"></a>

## [5.0.1](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.8...v5.0.1) (2021-10-09)

### Bug Fixes

- **check-picker:** fix `onClean` should not be triggered on Input ([#1947](https://github.com/rsuite/rsuite/issues/1947)) ([5cb1685](https://github.com/rsuite/rsuite/commit/5cb1685))
- **col:** fix the missing className prefix in Col ([#1967](https://github.com/rsuite/rsuite/issues/1967)) ([fc0e0af](https://github.com/rsuite/rsuite/commit/fc0e0af))
- **DateRangePicker:** support time selection ([#1882](https://github.com/rsuite/rsuite/issues/1882)) ([59779ef](https://github.com/rsuite/rsuite/commit/59779ef))
- **picker:** [TS] fix the missing definition of `size` in Pickers ([#1926](https://github.com/rsuite/rsuite/issues/1926)) ([6497698](https://github.com/rsuite/rsuite/commit/6497698))
- **pickers:** fix `listProps` not working on picker ([#1962](https://github.com/rsuite/rsuite/issues/1962)) ([956ef12](https://github.com/rsuite/rsuite/commit/956ef12))
- **sidenav:** accent dropdown icon w/ active item ([#1913](https://github.com/rsuite/rsuite/issues/1913)) ([efa389c](https://github.com/rsuite/rsuite/commit/efa389c))
- **sidenav:** Dropdown not expanding inside Sidenav ([#1956](https://github.com/rsuite/rsuite/issues/1956)) ([07723cd](https://github.com/rsuite/rsuite/commit/07723cd))
- **sidenav:** fix nav item not activated in collapsed sidenav ([#1918](https://github.com/rsuite/rsuite/issues/1918)) ([59fe040](https://github.com/rsuite/rsuite/commit/59fe040))
- **slider:** fix missing `input` in Slider and RangeSlider ([#1968](https://github.com/rsuite/rsuite/issues/1968)) ([a35bd2b](https://github.com/rsuite/rsuite/commit/a35bd2b))

<a name="5.0.0"></a>

# [5.0.0](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.8...v5.0.0) (2021-09-26)

### Bug Fixes

- **DateRangePicker:** support time selection ([#1882](https://github.com/rsuite/rsuite/issues/1882)) ([59779ef](https://github.com/rsuite/rsuite/commit/59779ef))
- **picker:** [TS] fix the missing definition of `size` in Pickers ([#1926](https://github.com/rsuite/rsuite/issues/1926)) ([6497698](https://github.com/rsuite/rsuite/commit/6497698))
- **sidenav:** accent dropdown icon w/ active item ([#1913](https://github.com/rsuite/rsuite/issues/1913)) ([efa389c](https://github.com/rsuite/rsuite/commit/efa389c))
- **sidenav:** fix nav item not activated in collapsed sidenav ([#1918](https://github.com/rsuite/rsuite/issues/1918)) ([59fe040](https://github.com/rsuite/rsuite/commit/59fe040))

<a name="5.0.0-beta.8"></a>

# [5.0.0-beta.8](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.7...v5.0.0-beta.8) (2021-09-17)

### Bug Fixes

- **date-picker:** fix calendar header wrapping ([#1907](https://github.com/rsuite/rsuite/issues/1907)) ([4cfc3af](https://github.com/rsuite/rsuite/commit/4cfc3af))
- **navbar,dropdown:** unexpected focus submenu ([#1908](https://github.com/rsuite/rsuite/issues/1908)) ([697aa3e](https://github.com/rsuite/rsuite/commit/697aa3e))

### Features

- **table:** support `rowSpan` on `<Table.Column>` ([#1909](https://github.com/rsuite/rsuite/issues/1909)) ([34a3a1f](https://github.com/rsuite/rsuite/commit/34a3a1f))

<a name="5.0.0-beta.7"></a>

# [5.0.0-beta.7](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.6...v5.0.0-beta.7) (2021-09-09)

### Bug Fixes

- **tag-input:** adjust default value of the trigger to `Enter` ([#1886](https://github.com/rsuite/rsuite/issues/1886)) ([4405b6b](https://github.com/rsuite/rsuite/commit/4405b6b))

### Features

- **carousel:** support `onSelect`, `onSlideEnd`, `onSlideStart` on `<Carousel>` ([#1889](https://github.com/rsuite/rsuite/issues/1889)) ([91e7b98](https://github.com/rsuite/rsuite/commit/91e7b98))
- **date-picker:** remove `inline` on `<DatePicker>` ([#1892](https://github.com/rsuite/rsuite/issues/1892)) ([83a77df](https://github.com/rsuite/rsuite/commit/83a77df))
- **theme:** added support for high-contrast theme ([#1828](https://github.com/rsuite/rsuite/pull/1828))

<a name="5.0.0-beta.6"></a>

# [5.0.0-beta.6](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.5...v5.0.0-beta.6) (2021-09-06)

### Bug Fixes

- **drawer:** fix incorrect styles in drawer title and drawer actions ([#1874](https://github.com/rsuite/rsuite/issues/1874)) ([747a5f1](https://github.com/rsuite/rsuite/commit/747a5f1))
- **list-item:** fix unable to set HTML event on List.Item ([#1863](https://github.com/rsuite/rsuite/issues/1863)) ([07578a2](https://github.com/rsuite/rsuite/commit/07578a2)), closes [#1859](https://github.com/rsuite/rsuite/issues/1859)
- **sidenav:** fix incorrect indent before dropdown toggle ([#1856](https://github.com/rsuite/rsuite/issues/1856)) ([048da73](https://github.com/rsuite/rsuite/commit/048da73))

### Features

- **tag-input:** add support for TagInput ([#1848](https://github.com/rsuite/rsuite/issues/1848)) ([eb66602](https://github.com/rsuite/rsuite/commit/eb66602)), closes [#1265](https://github.com/rsuite/rsuite/issues/1265)
- **tag-picker:** support `trigger` on `<TagPicker>` ([#1847](https://github.com/rsuite/rsuite/issues/1847)) ([8ace065](https://github.com/rsuite/rsuite/commit/8ace065))
- **uploader:** support `disableMultipart` on `<Uploader>` ([#1862](https://github.com/rsuite/rsuite/issues/1862)) ([a6d7dcb](https://github.com/rsuite/rsuite/commit/a6d7dcb))

<a name="5.0.0-beta.5"></a>

# [5.0.0-beta.5](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.4...v5.0.0-beta.5) (2021-08-18)

### Bug Fixes

- **date-picker:** fix DatePicker cannot be used as controlled ([#1844](https://github.com/rsuite/rsuite/issues/1844)) ([3d6c035](https://github.com/rsuite/rsuite/commit/3d6c035)), closes [#1842](https://github.com/rsuite/rsuite/issues/1842)

### Features

- **dropdown:** support `renderToggle` on `<Dropdown>` ([#1843](https://github.com/rsuite/rsuite/issues/1843)) ([99c1925](https://github.com/rsuite/rsuite/commit/99c1925))

<a name="5.0.0-beta.4"></a>

# [5.0.0-beta.4](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.3...v5.0.0-beta.4) (2021-08-16)

### Bug Fixes

- **date-picker:** fix AM/PM display incorrect issue when switching hours ([#1823](https://github.com/rsuite/rsuite/issues/1823)) ([110715e](https://github.com/rsuite/rsuite/commit/110715e))
- **dropdown-menu:** remove unrecognizable activeKey from dom ([#1827](https://github.com/rsuite/rsuite/issues/1827)) ([d578b5b](https://github.com/rsuite/rsuite/commit/d578b5b))
- **locales:** fix the undefined problem of Locale ([#1834](https://github.com/rsuite/rsuite/issues/1834)) ([bf35a23](https://github.com/rsuite/rsuite/commit/bf35a23))
- refactor(styles): change body background in light theme (#1840)

### BREAKING CHANGES

- build(deps): bump rsuite-table from 5.0.0-alpha.5 to 5.0.0-alpha.8 (#1836)
- chore: use proxyDirectories to build esm/cjs (#1830)

<a name="5.0.0-beta.3"></a>

# [5.0.0-beta.3](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.2...v5.0.0-beta.3) (2021-08-08)

### Bug Fixes

- **pagination:** export type definition of `PaginationProps` ([#1817](https://github.com/rsuite/rsuite/issues/1817)) ([80c7d9e](https://github.com/rsuite/rsuite/commit/80c7d9e))
- **sidenav:** trigger `<Nav onSelect>` on click `<Nav.Item>` ([#1815](https://github.com/rsuite/rsuite/issues/1815)) ([cae171d](https://github.com/rsuite/rsuite/commit/cae171d))

<a name="5.0.0-beta.2"></a>

# [5.0.0-beta.2](https://github.com/rsuite/rsuite/compare/v5.0.0-beta.1...v5.0.0-beta.2) (2021-08-03)

### Bug Fixes

- **check-picker:** fix unable to clear value when pressing `Backspace` ([#1812](https://github.com/rsuite/rsuite/issues/1812)) ([1534174](https://github.com/rsuite/rsuite/commit/1534174))
- **nav:** trigger `onSelect` on `<Nav>` when clicking `<Nav.Item>` ([#1797](https://github.com/rsuite/rsuite/issues/1797)) ([3fc99c4](https://github.com/rsuite/rsuite/commit/3fc99c4))
- CheckTreePicker and TreePicker search problems ([#1808](https://github.com/rsuite/rsuite/issues/1808)) ([2c5e651](https://github.com/rsuite/rsuite/commit/2c5e651)), closes [#1577](https://github.com/rsuite/rsuite/issues/1577)
- **message:** improve close icon style ([#1807](https://github.com/rsuite/rsuite/issues/1807)) ([4d1bf3f](https://github.com/rsuite/rsuite/commit/4d1bf3f))
- **typescript:** export props of all components ([#1803](https://github.com/rsuite/rsuite/issues/1803)) ([a4edeba](https://github.com/rsuite/rsuite/commit/a4edeba))

### Features

- **CustomProvider:** support `theme` on `<CustomProvider>` ([#1798](https://github.com/rsuite/rsuite/issues/1798)) ([cb5794c](https://github.com/rsuite/rsuite/commit/cb5794c))

<a name="5.0.0-beta.1"></a>

# [5.0.0-beta.1](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.9...v5.0.0-beta.1) (2021-07-23)

### Bug Fixes

- **calendar:** fix the date on the calendar as controlled and remove timezone ([#1781](https://github.com/rsuite/rsuite/issues/1781)) ([70e323d](https://github.com/rsuite/rsuite/commit/70e323d))
- **cascader:** adjust the rendering status of async loaded child nodes ([#1764](https://github.com/rsuite/rsuite/issues/1764)) ([ae41a18](https://github.com/rsuite/rsuite/commit/ae41a18))
- **cascader:** fix data not controlled on MultiCascader ([#1747](https://github.com/rsuite/rsuite/issues/1747)) ([593adc5](https://github.com/rsuite/rsuite/commit/593adc5))
- **check-tree-picker:** onChange does't return the correct value ([#1743](https://github.com/rsuite/rsuite/issues/1743)) ([b34a919](https://github.com/rsuite/rsuite/commit/b34a919))
- **dropdown-item:** close <Dropdown> inside <Navbar> on click its item ([#1791](https://github.com/rsuite/rsuite/issues/1791)) ([cc01a34](https://github.com/rsuite/rsuite/commit/cc01a34))
- **navigation:** improve accessibility of nav components ([#1792](https://github.com/rsuite/rsuite/issues/1792)) ([45468bd](https://github.com/rsuite/rsuite/commit/45468bd))
- **picker:** picker should not focus when it is disabled ([#1782](https://github.com/rsuite/rsuite/issues/1782)) ([6640c58](https://github.com/rsuite/rsuite/commit/6640c58))
- **picker:** update the position after the overlay size is changed ([#1780](https://github.com/rsuite/rsuite/issues/1780)) ([6366c36](https://github.com/rsuite/rsuite/commit/6366c36))
- **styles:** enable dark mode by default ([#1776](https://github.com/rsuite/rsuite/issues/1776)) ([13420e3](https://github.com/rsuite/rsuite/commit/13420e3))
- add less plugins to output lib dir, fix [#1767](https://github.com/rsuite/rsuite/issues/1767) ([#1770](https://github.com/rsuite/rsuite/issues/1770)) ([7a83699](https://github.com/rsuite/rsuite/commit/7a83699))
- **use-controlled:** value doest't change when controlledValue changed ([#1742](https://github.com/rsuite/rsuite/issues/1742)) ([682eb2b](https://github.com/rsuite/rsuite/commit/682eb2b))

<a name="5.0.0-alpha.9"></a>

# [5.0.0-alpha.9](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.8...v5.0.0-alpha.9) (2021-06-15)

### Bug Fixes

- **cascader:** fix search result row height ([#1717](https://github.com/rsuite/rsuite/issues/1717)) ([94696eb](https://github.com/rsuite/rsuite/commit/94696eb))
- **date-picker:** correct the style of non-current month dates ([#1732](https://github.com/rsuite/rsuite/issues/1732)) ([90058f8](https://github.com/rsuite/rsuite/commit/90058f8))
- **datepicker:** fix gap between date cells ([#1726](https://github.com/rsuite/rsuite/issues/1726)) ([03a7604](https://github.com/rsuite/rsuite/commit/03a7604))
- **input-picker:** fix extra height in disabled state ([#1718](https://github.com/rsuite/rsuite/issues/1718)) ([dd56301](https://github.com/rsuite/rsuite/commit/dd56301))
- **input-picker:** fix InputPicker value not rendering when plaintext ([#1690](https://github.com/rsuite/rsuite/issues/1690)) ([fcb5995](https://github.com/rsuite/rsuite/commit/fcb5995))
- **keyboard-event:** replace the deprecated keyCode with key ([#1691](https://github.com/rsuite/rsuite/issues/1691)) ([2f7a6d1](https://github.com/rsuite/rsuite/commit/2f7a6d1))
- **list:** wrong position when auto scrolling ([#1687](https://github.com/rsuite/rsuite/issues/1687)) ([6b387f0](https://github.com/rsuite/rsuite/commit/6b387f0))
- **modal:** remove extra margins in full-size modal ([#1699](https://github.com/rsuite/rsuite/issues/1699)) ([d231cc6](https://github.com/rsuite/rsuite/commit/d231cc6))
- **navbar:** fix navbar dropdown hover text color ([#1719](https://github.com/rsuite/rsuite/issues/1719)) ([44230fd](https://github.com/rsuite/rsuite/commit/44230fd))
- **position:** fix the exception that occurs when overlay is unmount ([#1714](https://github.com/rsuite/rsuite/issues/1714)) ([9a29a5a](https://github.com/rsuite/rsuite/commit/9a29a5a))
- **radio:** fix checked radio style in disabled state ([#1708](https://github.com/rsuite/rsuite/issues/1708)) ([62a4dc7](https://github.com/rsuite/rsuite/commit/62a4dc7))
- **radio:** fix disabled radio hover style ([#1709](https://github.com/rsuite/rsuite/issues/1709)) ([cdf0d09](https://github.com/rsuite/rsuite/commit/cdf0d09))
- **timeline:** fix incorrect spacing around axis in alternate alignment ([#1731](https://github.com/rsuite/rsuite/issues/1731)) ([b0e2f18](https://github.com/rsuite/rsuite/commit/b0e2f18))
- MultiCascader data cann't be controlled ([#1696](https://github.com/rsuite/rsuite/issues/1696)) ([7f9b03b](https://github.com/rsuite/rsuite/commit/7f9b03b))

### Features

- **nav:** improve NavItem visibility ([#1702](https://github.com/rsuite/rsuite/issues/1702)) ([8cb0b82](https://github.com/rsuite/rsuite/commit/8cb0b82))
- **pickers:** improve picker keyboard interaction experience ([#1700](https://github.com/rsuite/rsuite/issues/1700)) ([b3bde80](https://github.com/rsuite/rsuite/commit/b3bde80))
- Rewrite style system (#1476) ([19ed855](https://github.com/rsuite/rsuite/commit/19ed855)), closes [#1476](https://github.com/rsuite/rsuite/issues/1476) [#1671](https://github.com/rsuite/rsuite/issues/1671) [#1679](https://github.com/rsuite/rsuite/issues/1679)

### BREAKING CHANGES

- deprecate Navbar.Header and Navbar.Body
- refactor(styles): re-org Sidenav styles
- refactor(styles): re-org Pagination styles
- refactor(styles): re-org Button styles
- refactor(styles): re-org InputGroup styles
- refactor(styles): re-org InputNumber styles
- refactor(styles): re-org AutoComplete styles
- refactor(styles): re-org SelectPicker styles
- refactor(styles): re-org CheckPicker styles
- refactor(styles): re-org Checkbox styles
- refactor(styles): re-org Radio styles
- refactor(styles): re-org Toggle styles
- refactor(styles): re-org Rate styles
- refactor(styles): re-org Slider styles
- refactor(styles): re-org Uploader styles
- refactor(styles): re-org Cascader styles
- refactor(styles): remove iconfont related styles
- refactor(styles): re-org Avatar styles
- refactor(styles): re-org Badge styles
- refactor(styles): re-org Tag styles
- refactor(styles): re-org Carousel styles
- refactor(styles): re-org ButtonToolbar styles
- refactor(styles): re-org ButtonGroup styles
- refactor(styles): re-org Animation styles
- refactor(styles): re-org Panel styles
- refactor(styles): re-org List styles
- refactor(styles): re-org Timeline styles
- refactor(styles): re-org Table styles
- refactor(styles): re-org CloseButton styles
- refactor(styles): re-org Modal and Drawer styles
- refactor(styles): re-org IconButton styles
- refactor(styles): re-org Form styles
- refactor(styles): re-org toaster styles
- refactor(styles): re-org Message styles
- docs(theme): add rs-theme- classes on container element
- refactor(theme): use rs-theme- classes to determine color theme
- refactor(styles): remove unused files in Ripple
- refactor(styles): re-org CheckTree and CheckTreePicker styles
- refactor(styles): re-org Picker styles
- refactor(styles): re-org Tree and TreePicker styles
- refactor(styles): re-org InputPicker styles
- refactor(styles): re-org Calendar styles
- refactor(styles): re-org DatePicker and DateRangePicker styles
- refactor(styles): unify theme styles
- refactor(button): alter default button background color
- refactor(styles): remove unused less variables
- docs: use unified themes
- refactor(styles): split themes mixins
- refactor(styles): split non-common keyframes
- refactor(styles): re-order imports
- refactor(styles): remove unused global utility classes
- refactor(styles): remove unused common mixins
- refactor(styles): remove keyframe.less
- refactor(styles): rename core.less to common
- refactor(styles): transform palette hack mixin into less plugin
- refactor(styles): fix palette plugin output type
- test(styles): fix button style tests
- test(styles): fix missing imports that prevent tests running
- fix(styles): fix primary border color in default theme
- chore(deps): re-generate package-lock.json
- style: prettier format
- chore(deps): downgrade eslint-plugin-react to 7.20.3 to avoid issues
- style: upgrade stylelint and resolve violations
- refactor(styles): simplify ripple related styles
- refactor(styles): re-org button styles in different states
- refactor(styles): re-org icon-button in different states
- refactor(styles): remove .rs-btn-default class
- refactor(styles): re-org Button sizing mixins
- refactor(styles): re-org Ripple styles and mixins
- docs: fix docs.css missing from docs app
- chore(stylelint): add stylelint-config-prettier
- docs: add docs for less plugins
- refactor(styles): re-org primary and secondary palettes
- refactor(styles): remove unused color variables in dark theme
- refactor(styles): split theme palette and functional colors
- refactor(styles): remove direct use of gray/highlight levels
- refactor(styles): fix icon button in primary appearance
- refactor(styles): remove redundant color variables from dark theme
- build: omit javascriptEnabled option for less
- chore: eslint ignore less plugins
- refactor(styles): prefix css variables with rs instead of rs-color
- refactor(styles): re-org color themes inclusion
- refactor(styles): re-org variable declarations
- docs(button): fix custom combination example
- refactor(nav): remove margins between nav items
- refactor(styles): replace stateful color variables with semantic colors
- refactor(styles): separate color variables for light/dark modes
- feat(styles): add variable for toggling dark mode inclusion
- fix(styles): fix styling test failures
- test(autocomplete): fix test failures
- test(cascader): fix test failures due to dom change
- test(inputpicker): fix test failures due to dom change
- test(picker): fix test failures due to dom change
- test(selectpicker): fix test failures due to dom change
- chore: skip checking style existence
- build: fix build scripts for stylesheets
- fix(styles): fix incorrect casing in importing paths
- docs: fix button heights in toolbar
- docs: fix button style in codeview toolbar
- fix(styles): remove dark mode styles when enable-dark-mode is false
- docs: add docs for dark mode
- docs(customize): replace deprecated variables with new ones
- fix(message): re-org Message styles
- deprecate Drawer.Footer in favor of new Drawer.Actions
- feat(drawer): improve close button placement and appearance
- feat(drawer): deprecate Drawer.Footer replaced with Drawer.Actions
- fix(drawer): fix drawer body overflow height
- style(drawer): remove redundant comments
- fix(drawer): remove classes incorrectly assigned to close button
- fix(radiogroup): fix radio group picker width

<a name="5.0.0-alpha.8"></a>

# [5.0.0-alpha.8](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.7...v5.0.0-alpha.8) (2021-05-17)

### Bug Fixes

- **cascader:** fix `childrenKey` property not work when searching([#1568](https://github.com/rsuite/rsuite/issues/1568)) ([#1666](https://github.com/rsuite/rsuite/issues/1666)) ([c5f3fc6](https://github.com/rsuite/rsuite/commit/c5f3fc6))
- **drawer:** remove height on Drawer body ([#1683](https://github.com/rsuite/rsuite/issues/1683)) ([759fd69](https://github.com/rsuite/rsuite/commit/759fd69))
- **input-picker:** fix InputPicker can select values in readOnly mode ([#1674](https://github.com/rsuite/rsuite/issues/1674)) ([7e5d02b](https://github.com/rsuite/rsuite/commit/7e5d02b))
- treePicker & CheckTreePicker ([ec88694](https://github.com/rsuite/rsuite/commit/ec88694))

### Features

- **cascader:** add `layer` parameter in `renderMenu` callback ([#1681](https://github.com/rsuite/rsuite/issues/1681)) ([1c6b1e0](https://github.com/rsuite/rsuite/commit/1c6b1e0))
- **nav-item:** support `tooltip` on NavItem ([#1680](https://github.com/rsuite/rsuite/issues/1680)) ([f25d569](https://github.com/rsuite/rsuite/commit/f25d569))
- **Whisper:** added support for trigger prop value `contextMenu` on `Whisper` ([491be3a](https://github.com/rsuite/rsuite/commit/491be3a))

<a name="5.0.0-alpha.7"></a>

# [5.0.0-alpha.7](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.6...v5.0.0-alpha.7) (2021-05-11)

### Bug Fixes

- **lgtm:** fix vulnerabilities in static code scanning using lgtm ([#1651](https://github.com/rsuite/rsuite/issues/1651)) ([77d04a7](https://github.com/rsuite/rsuite/commit/77d04a7))
- **overlay:** update the overlay to the correct position ([#1654](https://github.com/rsuite/rsuite/issues/1654)) ([8148b7a](https://github.com/rsuite/rsuite/commit/8148b7a))
- **typescript:** fix incorrect definition of Typescript ([#1656](https://github.com/rsuite/rsuite/issues/1656)) ([87c5f3d](https://github.com/rsuite/rsuite/commit/87c5f3d))

### Features

- **inputpicker:** support onCreate on InputPicker and TagPicker ([#1645](https://github.com/rsuite/rsuite/issues/1645)) ([5f33fe9](https://github.com/rsuite/rsuite/commit/5f33fe9))
- **multi-cascader:** support onCheck on MultiCascader ([#1648](https://github.com/rsuite/rsuite/issues/1648)) ([0088a29](https://github.com/rsuite/rsuite/commit/0088a29))

<a name="5.0.0-alpha.6"></a>

# [5.0.0-alpha.6](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.5...v5.0.0-alpha.6) (2021-05-07)

### Bug Fixes

- **cascader:** fixed the option not re-rendering after data update ([#1608](https://github.com/rsuite/rsuite/issues/1608)) ([6a83064](https://github.com/rsuite/rsuite/commit/6a83064)), closes [#1599](https://github.com/rsuite/rsuite/issues/1599)
- **customprovider:** integrate the locale of date-fns in CustomProvider ([#1637](https://github.com/rsuite/rsuite/issues/1637)) ([1817430](https://github.com/rsuite/rsuite/commit/1817430)), closes [#1636](https://github.com/rsuite/rsuite/issues/1636)
- **pickers:** Fixed the inability to pass the type check when the `labelKey` and `valueKey` of the pickers are changed. ([#1589](https://github.com/rsuite/rsuite/issues/1589)) ([ed1bea6](https://github.com/rsuite/rsuite/commit/ed1bea6))
- **typescript:** fix incorrect definition of Typescript ([#1640](https://github.com/rsuite/rsuite/issues/1640)) ([73bbe88](https://github.com/rsuite/rsuite/commit/73bbe88)), closes [#1633](https://github.com/rsuite/rsuite/issues/1633)

### Features

- **hooks:** add the useWillUnmount hook and apply it to Modal ([#1607](https://github.com/rsuite/rsuite/issues/1607)) ([73e3948](https://github.com/rsuite/rsuite/commit/73e3948))

<a name="5.0.0-alpha.5"></a>

# [5.0.0-alpha.5](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.4...v5.0.0-alpha.5) (2021-03-19)

### Bug Fixes

- **daterangepicker:** modify the `character` prop to be optional ([#1518](https://github.com/rsuite/rsuite/issues/1518)) ([6b77e52](https://github.com/rsuite/rsuite/commit/6b77e52))
- **inputpicker:** fix the input does not work when focused by keyboard ([b2dc612](https://github.com/rsuite/rsuite/commit/b2dc612))
- **inputpicker:** inputPicker should clear search keywords when closed ([679edc3](https://github.com/rsuite/rsuite/commit/679edc3))
- **modal:** fix input is not allowed to input text in Modal ([#1579](https://github.com/rsuite/rsuite/issues/1579)) ([f4ec497](https://github.com/rsuite/rsuite/commit/f4ec497)), closes [#1570](https://github.com/rsuite/rsuite/issues/1570)
- **overlaytrigger:** rename `child` to `root` in OverlayTrigger instance ([05ce0ec](https://github.com/rsuite/rsuite/commit/05ce0ec))
- **pickers:** picker should not be interactive during animation exit ([1f657b7](https://github.com/rsuite/rsuite/commit/1f657b7))
- **rangeslider:** fix RangeSlider style problem ([cfaa93e](https://github.com/rsuite/rsuite/commit/cfaa93e))
- **table:** change `Table` locale prop to optional ([#1581](https://github.com/rsuite/rsuite/issues/1581)) ([ca15531](https://github.com/rsuite/rsuite/commit/ca15531))
- **tree:** fix `spin` icon does not display when Tree is loaded async ([#1535](https://github.com/rsuite/rsuite/issues/1535)) ([0294a43](https://github.com/rsuite/rsuite/commit/0294a43))
- **uploader:** fixed the status icon not showing during upload ([#1547](https://github.com/rsuite/rsuite/issues/1547)) ([8f24c69](https://github.com/rsuite/rsuite/commit/8f24c69))

### Features

- **form:** support for data verification of complex object structure ([#1558](https://github.com/rsuite/rsuite/issues/1558)) ([d5b23f4](https://github.com/rsuite/rsuite/commit/d5b23f4))
- **pagination:** added for support `layout` on Pagination ([#1533](https://github.com/rsuite/rsuite/issues/1533)) ([9713cd5](https://github.com/rsuite/rsuite/commit/9713cd5))
- **whisper:** support `onClose` on the `speaker` prop of Whisper ([4ecad64](https://github.com/rsuite/rsuite/commit/4ecad64))

<a name="5.0.0-alpha.4"></a>

# [5.0.0-alpha.4](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.3...v5.0.0-alpha.4) (2021-02-23)

### Bug Fixes

- **babel:** fix the problem that commonjs import `default` is undefined ([#1514](https://github.com/rsuite/rsuite/issues/1514)) ([9855f54](https://github.com/rsuite/rsuite/commit/9855f54))
- **daterangepicker:** delete duplicate type definitions ([#1513](https://github.com/rsuite/rsuite/issues/1513)) ([26c9283](https://github.com/rsuite/rsuite/commit/26c9283))
- **input-group:** fix InputGroup size misalignment when inside ([#1474](https://github.com/rsuite/rsuite/issues/1474)) ([ca0f90f](https://github.com/rsuite/rsuite/commit/ca0f90f))
- **radio:** fixed the color of Radio in active state ([#1475](https://github.com/rsuite/rsuite/issues/1475)) ([bc9a3dd](https://github.com/rsuite/rsuite/commit/bc9a3dd))
- **rtl:** fixed the docs not work when using `rtl` ([#1501](https://github.com/rsuite/rsuite/issues/1501)) ([9ee8ce3](https://github.com/rsuite/rsuite/commit/9ee8ce3))
- **table:** fixed unhandled scroll bar width when Cell is fixed on right ([#1486](https://github.com/rsuite/rsuite/issues/1486)) ([7e9ccc1](https://github.com/rsuite/rsuite/commit/7e9ccc1))
- **typos:** fix typos in the docs ([#1502](https://github.com/rsuite/rsuite/issues/1502)) ([15e9170](https://github.com/rsuite/rsuite/commit/15e9170))

### Features

- **locales:** add translations for German ([#1495](https://github.com/rsuite/rsuite/issues/1495)) ([b71ed41](https://github.com/rsuite/rsuite/commit/b71ed41))
- **uploader:** support file async check on Uploader ([#1509](https://github.com/rsuite/rsuite/issues/1509)) ([4726c5a](https://github.com/rsuite/rsuite/commit/4726c5a))

<a name="5.0.0-alpha.3"></a>

# [5.0.0-alpha.3](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.2...v5.0.0-alpha.3) (2021-01-23)

### Bug Fixes

- **divider:** set aria-orientation on Divider ([#1457](https://github.com/rsuite/rsuite/issues/1457)) ([fe46e4d](https://github.com/rsuite/rsuite/commit/fe46e4d))
- **picker:** fixed the non-unique key in the Picker option when groupBy ([#1460](https://github.com/rsuite/rsuite/issues/1460)) ([5ca0fa0](https://github.com/rsuite/rsuite/commit/5ca0fa0))
- **tree:** fix className of Tree and CheckTree ([#1456](https://github.com/rsuite/rsuite/issues/1456)) ([de79cbf](https://github.com/rsuite/rsuite/commit/de79cbf))
- **whisper:** fix overlay jittering when the cursor is hovered ([#1459](https://github.com/rsuite/rsuite/issues/1459)) ([d29e785](https://github.com/rsuite/rsuite/commit/d29e785))

<a name="5.0.0-alpha.2"></a>

# [5.0.0-alpha.2](https://github.com/rsuite/rsuite/compare/v5.0.0-alpha.1...v5.0.0-alpha.2) (2021-01-05)

### Bug Fixes

- **calendar:** fix the issue of disabled date styles in Calendar ([#1424](https://github.com/rsuite/rsuite/issues/1424)) ([13b64be](https://github.com/rsuite/rsuite/commit/13b64be))
- **cascader:** fix icon style in Cascader ([#1426](https://github.com/rsuite/rsuite/issues/1426)) ([3076eb8](https://github.com/rsuite/rsuite/commit/3076eb8))
- **check-picker:** fixed the group icon not showing in CheckPicker ([#1422](https://github.com/rsuite/rsuite/issues/1422)) ([082a648](https://github.com/rsuite/rsuite/commit/082a648))
- **formcontrol:** improve the accessibility of FormControl ([#1433](https://github.com/rsuite/rsuite/issues/1433)) ([c7855d4](https://github.com/rsuite/rsuite/commit/c7855d4))
- **pickers:** fix the missing value on input in picker ([#1430](https://github.com/rsuite/rsuite/issues/1430)) ([7d06531](https://github.com/rsuite/rsuite/commit/7d06531))
- **rate:** fix the half-ratings style of Rate ([#1423](https://github.com/rsuite/rsuite/issues/1423)) ([f064f48](https://github.com/rsuite/rsuite/commit/f064f48))
- **select-picker:** fix SelectPicker not re-render when data is updated ([#1421](https://github.com/rsuite/rsuite/issues/1421)) ([0eb2a65](https://github.com/rsuite/rsuite/commit/0eb2a65))
- **uploader:** fix the style of Uploader in plaintext ([#1427](https://github.com/rsuite/rsuite/issues/1427)) ([dfb98ee](https://github.com/rsuite/rsuite/commit/dfb98ee))

### Performance Improvements

- **date-fns:** use `date-fns-tz` instead of `date-fns-timezone` ([#1413](https://github.com/rsuite/rsuite/issues/1413)) ([1747d27](https://github.com/rsuite/rsuite/commit/1747d27))

<a name="5.0.0-alpha.1"></a>

# [5.0.0-alpha.1](https://github.com/rsuite/rsuite/compare/4.8.0...5.0.0-alpha.1) (2020-12-24)

### Bug Fixes

- **breadcrumb:** update locales of Breadcrumb ([30a1550](https://github.com/rsuite/rsuite/commit/30a1550))
- **checkpicker:** fix value error problem when keyboard interaction ([#1332](https://github.com/rsuite/rsuite/issues/1332)) ([ea5f91c](https://github.com/rsuite/rsuite/commit/ea5f91c))
- **daterangepicker:** fix the issue of DateRangePicker closing delay ([9fc40ee](https://github.com/rsuite/rsuite/commit/9fc40ee))
- **DateRangePicker:** 修复选择时间时面板收起的问题 & prettier code ([#1330](https://github.com/rsuite/rsuite/issues/1330)) ([afd0b7e](https://github.com/rsuite/rsuite/commit/afd0b7e))
- **form-controls:** adjust the style of the plain text of form controls ([#1405](https://github.com/rsuite/rsuite/issues/1405)) ([cca782f](https://github.com/rsuite/rsuite/commit/cca782f))
- **icon:** adjust the dependent icons in the component ([70fdddb](https://github.com/rsuite/rsuite/commit/70fdddb))
- **icon:** fix icon-related style issues ([b0ebaba](https://github.com/rsuite/rsuite/commit/b0ebaba))
- **icon-button:** fix IconButton style error when disabled ([ecbf4e5](https://github.com/rsuite/rsuite/commit/ecbf4e5))
- **input-group:** adjust button elements in input-group ([#1406](https://github.com/rsuite/rsuite/issues/1406)) ([14acbab](https://github.com/rsuite/rsuite/commit/14acbab))
- **list:** improve List ([0eb95b0](https://github.com/rsuite/rsuite/commit/0eb95b0))
- **modal:** fix ModalManager uncontrollable ([#1335](https://github.com/rsuite/rsuite/issues/1335)) ([26834da](https://github.com/rsuite/rsuite/commit/26834da))
- **pickers:** fixed picker will select children when set invalid value ([#1336](https://github.com/rsuite/rsuite/issues/1336)) ([dd99886](https://github.com/rsuite/rsuite/commit/dd99886))
- **popover:** set shadow to popover component ([#1360](https://github.com/rsuite/rsuite/issues/1360)) ([94c6851](https://github.com/rsuite/rsuite/commit/94c6851))
- **tagpicker:** fix tagpicker rendervalue styles ([#1376](https://github.com/rsuite/rsuite/issues/1376)) ([4fdf09d](https://github.com/rsuite/rsuite/commit/4fdf09d))
- **tree:** revese Left and Right Arrow event in rtl ([#1337](https://github.com/rsuite/rsuite/issues/1337)) ([cfae655](https://github.com/rsuite/rsuite/commit/cfae655))
- **tree-picker:** fixed the icon problem in TreePicker ([#1382](https://github.com/rsuite/rsuite/issues/1382)) ([ba78f3c](https://github.com/rsuite/rsuite/commit/ba78f3c))
- **v4:** sync the bugs fixed in v4 ([#1380](https://github.com/rsuite/rsuite/issues/1380)) ([9053982](https://github.com/rsuite/rsuite/commit/9053982))
- 🐛 修复非法传递到 DOM 节点上的问题 ([#1268](https://github.com/rsuite/rsuite/issues/1268)) ([aedaae1](https://github.com/rsuite/rsuite/commit/aedaae1))
- 🐛 修正 Rate 笔误 ([#1230](https://github.com/rsuite/rsuite/issues/1230)) ([83d1cee](https://github.com/rsuite/rsuite/commit/83d1cee))
- fix typescript type definition ([#1366](https://github.com/rsuite/rsuite/issues/1366)) ([9bfb445](https://github.com/rsuite/rsuite/commit/9bfb445))
- fixed document sidenav icon ([3881e44](https://github.com/rsuite/rsuite/commit/3881e44))
- form method cleanErrorForFiled renamed into cleanErrorForField ([#1236](https://github.com/rsuite/rsuite/issues/1236)) ([1aaaab0](https://github.com/rsuite/rsuite/commit/1aaaab0))
- ISO week format on calendar panel ([666bc2b](https://github.com/rsuite/rsuite/commit/666bc2b))
- **tag-picker:** fix tag picker styles issue ([#1167](https://github.com/rsuite/rsuite/issues/1167)) ([4f4e88b](https://github.com/rsuite/rsuite/commit/4f4e88b))

### Features

- **slider:** support `onChangeCommitted` on Slider and RangeSlider ([#1404](https://github.com/rsuite/rsuite/issues/1404)) ([fca8c86](https://github.com/rsuite/rsuite/commit/fca8c86)), closes [#1321](https://github.com/rsuite/rsuite/issues/1321)
- support focus on form controls ([#1391](https://github.com/rsuite/rsuite/issues/1391)) ([820a31b](https://github.com/rsuite/rsuite/commit/820a31b))
- **cascader:** support keyboard interaction on Cascader ([#1339](https://github.com/rsuite/rsuite/issues/1339)) ([252afdf](https://github.com/rsuite/rsuite/commit/252afdf))
- **daterangepicker:** support input and mask on DateRangePicker and DatePicker ([#1368](https://github.com/rsuite/rsuite/issues/1368)) ([4b47e09](https://github.com/rsuite/rsuite/commit/4b47e09))
- **icons:** update icon list ([#1363](https://github.com/rsuite/rsuite/issues/1363)) ([a9b584f](https://github.com/rsuite/rsuite/commit/a9b584f))
- `rootPrefix` supports compound parameters ([268aef9](https://github.com/rsuite/rsuite/commit/268aef9))
- replace icon component ([#1359](https://github.com/rsuite/rsuite/issues/1359)) ([6ad16b9](https://github.com/rsuite/rsuite/commit/6ad16b9))
- **datepicker:** support keyboard input on DatePicker ([#1350](https://github.com/rsuite/rsuite/issues/1350)) ([36e3268](https://github.com/rsuite/rsuite/commit/36e3268))
- **form:** support plaintext on all form controls ([#1328](https://github.com/rsuite/rsuite/issues/1328)) ([a26dfc6](https://github.com/rsuite/rsuite/commit/a26dfc6))
- **slider:** support keyboard interaction on Slider and RangeSlider ([#1324](https://github.com/rsuite/rsuite/issues/1324)) ([8b1f6cf](https://github.com/rsuite/rsuite/commit/8b1f6cf))
- improve the accessibility of Nav ([278696e](https://github.com/rsuite/rsuite/commit/278696e))
- **toaster:** add support for toaster ([#1246](https://github.com/rsuite/rsuite/issues/1246)) ([41b86db](https://github.com/rsuite/rsuite/commit/41b86db))

### Performance Improvements

- improve accessibility with ARIA ([#1323](https://github.com/rsuite/rsuite/issues/1323)) ([24b4379](https://github.com/rsuite/rsuite/commit/24b4379))
- remove deprecated code ([1ef99b1](https://github.com/rsuite/rsuite/commit/1ef99b1))
- **selectpicker:** adjust the dependency of Picker ([1fc5f24](https://github.com/rsuite/rsuite/commit/1fc5f24))
