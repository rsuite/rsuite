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

# 4.8.0

> July 9, 2020

- **Feature**: Added support for `none` in `trigger` props on `<Whisper>`. [#1155]
- **Feature**: Support `scrollable` on `<InputNumber>`. ([#1133])
- **Improve**: Impove `<DateRangePicker>` panel range layout styles. ([#1164])
- **Improve**: Improve all Pickers renderValue methods. ([#1151],[#1139])
- **Bugfix**: Fix Uploader repeatedly triggering onChange event in IE11. ([#1156])
- **Bugfix**: Fix `<Whisper>` delay not working. ([#1153])
- **Bugfix**: Fix the issue of height reduction when reopening `<Modal>`. ([#1152])
- **Bugfix**: Fix the style problem of various combinations of `<InputGroup>`. ([#1149],[#1150],[#1158],[#1163])
- **Bugfix**: Fix `<Carousel>` autoplay direction error on RTL. ([#1136])

---

- **Feature**: `<InputNumber>` 新增支持 `scrollable` 属性，默认值为 `true`, 设置为 `false` 则禁用滚动更新值。 ([#1133])
- **Feature**: `<Whisper>` 的 `trigger` 属性值新增 `none` 。 [#1155]
- **Improve**: 改进 `<DateRangePicker>` 的面板样式，可以容纳更多自定义选项。 ([#1164])
- **Improve**: 改进所有 Picker 的 `renderValue` 方法，解决值与数据不匹配时也能自定义显示。 ([#1151],[#1139])
- **Bugfix**: 修复 `Uploader` 在 IE11 浏览器会触发两次 `onChange` 的问题. ([#1156])
- **Bugfix**: 修复 `<Whisper>` 的 `delay` 值属性无效的问题。 ([#1153])
- **Bugfix**: 修复 `<Modal>` 在再一次打开后高度计算不一致的问题。 ([#1152])
- **Bugfix**: 修复 `<InputGroup>` 在多种组合场景下存在的样式问题。 ([#1149],[#1150],[#1158],[#1163])
- **Bugfix**: 修复 `<Carousel>` RTL 视图下自动播放方向错误的问题。 ([#1136])

[#1164]: https://github.com/rsuite/rsuite/pull/1164
[#1156]: https://github.com/rsuite/rsuite/pull/1156
[#1155]: https://github.com/rsuite/rsuite/pull/1153
[#1153]: https://github.com/rsuite/rsuite/pull/1153
[#1152]: https://github.com/rsuite/rsuite/pull/1152
[#1163]: https://github.com/rsuite/rsuite/pull/1163
[#1158]: https://github.com/rsuite/rsuite/pull/1158
[#1150]: https://github.com/rsuite/rsuite/pull/1150
[#1149]: https://github.com/rsuite/rsuite/pull/1149
[#1148]: https://github.com/rsuite/rsuite/pull/1148
[#1139]: https://github.com/rsuite/rsuite/pull/1139
[#1151]: https://github.com/rsuite/rsuite/pull/1151
[#1136]: https://github.com/rsuite/rsuite/pull/1136
[#1133]: https://github.com/rsuite/rsuite/pull/1133

# 4.7.5

> June 18, 2020

- **Bugfix**: fix(dropdown): fixed an issue where the menu and tooltip overlapped. ([#1132])
- **Bugfix**: fix(treepicker): called onDragStart only when the node is draggable. ([#1124])

[#1132]: https://github.com/rsuite/rsuite/pull/1132
[#1124]: https://github.com/rsuite/rsuite/pull/1124

# 4.7.4

> June 11, 2020

- **Bugfix**: Fix autoplay can't be interrupted in `Carousel`. ([#1120])
- **Bugfix**: Fixed `ShowOneCalendar` disabled Months after date. ([#1118])
- **Bugfix**: Fixed type errors defined by Typescript. ([#1098],[#1106])

[#1120]: https://github.com/rsuite/rsuite/pull/1120
[#1118]: https://github.com/rsuite/rsuite/pull/1118
[#1106]: https://github.com/rsuite/rsuite/pull/1106
[#1098]: https://github.com/rsuite/rsuite/pull/1098

# 4.7.3

> June 8, 2020

- **Bugfix**: fix TypeError Cannot redefine property: prefix. ([#1115])

[#1115]: https://github.com/rsuite/rsuite/pull/1115

# 4.7.2

> June 4, 2020

- **Bugfix** fix(steps): fixed the description of Steps will break layout. ([#1100])
- **Bugfix** fix(inputpicker): fix InputNumber will not trigger onChange when input. ([#1096])
- **Bugfix** fix(ts): fix errors in Typescript. ([#1095],[#1103])
- **Bugfix** fix(dropdown): fix incorrect Dropdown caret position. ([#1094])
- **Bugfix** fix(picker): remove redundant ripple elements in PickerToggle ([#1092])
- **Bugfix** fix(sidenav): fixed display issue when sidenav was collapsed. ([#1090])
- **Bugfix**: fix(buttongroup): fixed Button componentClass not work with ButtonGroup. ([#1087])
- **Example**: docs(example): add example of Reason app. ([#1101])

---

- **Bugfix** 修复 Steps 组件描述过长后导致布局异常。 ([#1100])
- **Bugfix** 修复 InputNumber 键盘输入未触发 onChange 事件。 ([#1096])
- **Bugfix** 修复 Typescript 中存在的类型定义错误。 ([#1095],[#1103])
- **Bugfix** 修复 Dropdown 内 caret 图标的位置。 ([#1094])
- **Bugfix** 修复 PickerToggle 内冗余的涟漪元素。 ([#1092])
- **Bugfix** 修复 Sidenav 折叠以后存在的显示问题。 ([#1090])
- **Bugfix**: 修复 ButtonGroup 内 Button 的 componentClass 属性无效的问题。 ([#1087])
- **Example**: 新增 ReasonML 的示例项目 ([#1101])

[#1103]: https://github.com/rsuite/rsuite/pull/1103
[#1101]: https://github.com/rsuite/rsuite/pull/1101
[#1100]: https://github.com/rsuite/rsuite/pull/1100
[#1096]: https://github.com/rsuite/rsuite/pull/1096
[#1095]: https://github.com/rsuite/rsuite/pull/1095
[#1094]: https://github.com/rsuite/rsuite/pull/1094
[#1092]: https://github.com/rsuite/rsuite/pull/1092
[#1090]: https://github.com/rsuite/rsuite/pull/1090
[#1087]: https://github.com/rsuite/rsuite/pull/1087

# 4.7.1

> May 28, 2020

- **Improve**: Improved `<TreePicker>` and `<CheckTreePicker>` to expand nodes when searching. ([#1075])
- **Improve**: Export component props from `rsuite`. ([#1068])
- **Bugfix**: Fixed the content of the last marker of `<Slider>` not being dot-aligned. ([#1079])
- **Bugfix**: Fixed `<Slider>` drag handle error ([#1082])
- **Bugfix**: Fixed errors in the docs. ([#1080])
- **Bugfix**: Fixed type errors defined by Typescript. ([#1081])
- **Chore**: Added `commintlint` to check git meesage. ([#1078])

---

- **Improve**: 改进 `<TreePicker>` 和 `<CheckTreePicker>` 在搜索时展开节点。 ([#1075])
- **Improve**: 导出 `rsuite` 所有组件的 `props`。 ([#1068])
- **Bugfix**: 修复了 `<Slider>` 的最后一个标记的内容未点对齐的问题。([#1079])
- **Bugfix**: 修复了 `<Slider>` 拖拽手柄报错的问题。 ([#1082])
- **Bugfix**: 修复了一些文档中的错误。 ([#1080])
- **Bugfix**: 修复了一些 Typescript 类型定义错误。 ([#1081])
- **Chore**: 添加 `commintlint`，用于对 git meesage 的格式进行检查。 ([#1078])

[#1082]: https://github.com/rsuite/rsuite/pull/1082
[#1081]: https://github.com/rsuite/rsuite/pull/1081
[#1080]: https://github.com/rsuite/rsuite/pull/1080
[#1079]: https://github.com/rsuite/rsuite/pull/1079
[#1078]: https://github.com/rsuite/rsuite/pull/1078
[#1075]: https://github.com/rsuite/rsuite/pull/1075
[#1068]: https://github.com/rsuite/rsuite/pull/1068

# 4.7.0

> May 21, 2020

- **Feature**: Support `onRowContextMenu` on `<Table>`. ([rsuite-table#150])
- **Feature**: Add `<Table.ColumnGroup>`. ([rsuite-table#146])
- **Feature**: Support `filterBy` on `<AutoComplete>`. ([#1063])
- **Feature**: Added support for Spanish ([#1054])
- **Bugfix**: Fixed `<Loader>` spinner not centered when given size. ([#1059])
- **Example**: Add example for draggable table. ([#1065])

---

- **Feature**: `<Table>`新增 `onRowContextMenu` 属性，行点击右键的回调。 ([rsuite-table#150])
- **Feature**: 新增 `<Table.ColumnGroup>` 组件，用于表头分组。 ([rsuite-table#146])
- **Feature**: `<AutoComplete>` 新增 `filterBy`属性，用于自定义过滤显示的选项。 ([#1063])
- **Feature**: 新增对西班牙语的支持。 ([#1054])
- **Bugfix**: 修复 `<Loader>` 当设置 `size` 时候，未居中的问题。 ([#1059])
- **Example**: 添加了表格可拖拽行与列的示例。 ([#1065])

[#1065]: https://github.com/rsuite/rsuite/pull/1065
[#1063]: https://github.com/rsuite/rsuite/pull/1063
[#1059]: https://github.com/rsuite/rsuite/pull/1059
[#1054]: https://github.com/rsuite/rsuite/pull/1054
[rsuite-table#150]: https://github.com/rsuite/rsuite-table/pull/150
[rsuite-table#146]: https://github.com/rsuite/rsuite-table/pull/146

# 4.6.0

> May 14, 2020

- **Feature**: Support `formatDate` on `<IntlProvider>`. ([#1036])

- **Feature**: Support animation related callbacks on Picker ([#1042])
- **Improve**: The basic styles of HTML elements support import on demand. ([#1039])
- **Bugfix**: Fixed an issue that caused data inconsistency when uncheckableItemValues changed in `<CheckTreePicker>`. ([#1053])
- **Bugfix**: Fixed `<Sidenav>` style issues. ([#1052])
- **Bugfix**: Fixed `Notification` closeAll sync problem. ([#1047])
- **Bugfix**: Fixed performance issues caused by arrays in `Col`. ([#1037])
- **Bugfix**: Fixed `Affix` typings definition wrong. ([#1051])
- **Bugfix**: Fixed Table `scrollTop` method not working, when setting`virtualized`. ([rsuite-table#152])
- **Example**: Add with-electron example. ([#1045])

---

- **Feature**: `<IntlProvider>` 新增支持 `formatDate` 属性，用于对日期格式。 ([#1036])
- **Feature**: 所有 Picker 组件支持动画相关的回调。 ([#1042])
- **Improve**: HTML 元素的基础样式支持按需导入。 ([#1039])
- **Bugfix**: 修复了 `<CheckTreePicker>` 的 `uncheckableItemValues` 更新后导致的数据不一致问题。 ([#1053])
- **Bugfix**: 修复了 `<Sidenav>` 中存在的样式问题。 ([#1052])
- **Bugfix**: 修复了 `Notification` 的 `closeAll` 方法同步执行的问题。 ([#1047])
- **Bugfix**: 修复了 `<Col>` 中数组导致的性能问题。 ([#1037])
- **Bugfix**: 修复了 `<Affix>` 中 typescript 类型定义错误的问题。 ([#1051])
- **Bugfix**: 修复了 `Table`在设置 `virtualized` 属性后，`scrollTop` 方法导致白屏的问题。 ([rsuite-table#152])
- **Example**: 新增示例 `with-electron`。 ([#1045])

[#1053]: https://github.com/rsuite/rsuite/pull/1053
[#1052]: https://github.com/rsuite/rsuite/pull/1052
[#1051]: https://github.com/rsuite/rsuite/pull/1051
[#1047]: https://github.com/rsuite/rsuite/pull/1047
[#1045]: https://github.com/rsuite/rsuite/pull/1045
[#1042]: https://github.com/rsuite/rsuite/pull/1042
[#1039]: https://github.com/rsuite/rsuite/pull/1039
[#1037]: https://github.com/rsuite/rsuite/pull/1037
[#1036]: https://github.com/rsuite/rsuite/pull/1036
[rsuite-table#152]: https://github.com/rsuite/rsuite-table/pull/152

# 4.5.0

> May 7, 2020

- **Feature**: Support `maxItems` and `onExpand` on `<Breadcrumb>`.([#1009])
- **Bugfix**: Fixed TableProps onDataUpdated & shouldUpdateScroll optional. ([#1035])
- **Bugfix**: Fixed Carousel unable to render invalid children. ([#1027])
- **Bugfix**: Fixed the clear button style issue on Picker. ([#1029])
- **Bugfix**: Fixed Sidenav style issue. ([#1020])

---

- **Feature**: `<Breadcrumb>` 新增属性 `maxItems` 和 `onExpand` 。([#1009])
- **Bugfix**: 修复 TableProps 的属性 `onDataUpdated` 与 `shouldUpdateScroll` 为可选属性. ([#1035])
- **Bugfix**: 修复 `<Carousel>` 出现无效子项导致组件渲染错误的问题. ([#1027])
- **Bugfix**: 修复了 `Picker` 上清除按钮样式问题。 ([#1029])
- **Bugfix**: 修复了 `<Sidenav>` 样式问题。([#1020])

[#1035]: https://github.com/rsuite/rsuite/pull/1035
[#1029]: https://github.com/rsuite/rsuite/pull/1029
[#1027]: https://github.com/rsuite/rsuite/pull/1027
[#1020]: https://github.com/rsuite/rsuite/pull/1020
[#1009]: https://github.com/rsuite/rsuite/pull/1009

# 4.4.1

> April 29, 2020

- **Bugfix**: Fix the clear button of picker not clickable in IE11. ([#1017])
- **Bugfix**: Fix toggle clean button styles issue. ([#1016])
- **Bugfix**: Fix missing typescript type definitions. ([#1008])
- **Bugfix**: Fix the expanded state of the menu. ([#1007])

---

- **Bugfix**: 修复了 IE11 的一个兼容性问题，Picker 的清除按钮不可点击 ([#1017])
- **Bugfix**: 修复了 Toggle 按钮样式问题。 ([#1016])
- **Bugfix**: 修复了遗漏的 Typescript 类型定义。 ([#1008])
- **Bugfix**: 修复了 Dropdown 中的菜单状态错误的问题。([#1007])

[#1017]: https://github.com/rsuite/rsuite/pull/1017
[#1016]: https://github.com/rsuite/rsuite/pull/1016
[#1008]: https://github.com/rsuite/rsuite/pull/1008
[#1007]: https://github.com/rsuite/rsuite/pull/1007

# 4.4.0

> April 24, 2020

- **Feature**: Support `draggable` on `<Tree>` ([#987])
- **Feature**: Added `<Rete>`. ([#981])
- **Feature**: Added support for Italian ([#971])
- **Feature**: Added support for custom overlay. ([#969])
- **Feature**: Support `endless` on `<Timeline>` ([#982])
- **Feature**: Support `vertical` on `<Progress.Line>`. ([#938])
- **Feature**: Support `showMeridian` on `<DatePicker>`. ([#932])
- **Feature**: Support `searchBy` on all picker. ([#928],[#965])
- **Feature**: Support `tagProps` on `<TagPicker>`. ([#927])
- **Feature**: Support `container` on `<Affix>`. ([#912])
- **Feature**: Support `onDataUpdated` on `<Table>`. ([rsuite-table#140])
- **Feature**: Support `affixHorizontalScrollbar` on `<Table>`. ([rsuite-table#137])
- **Breaking**: Fix misspelling of Uploader props `dragable`, modify to`draggable`.
- **Improve**: Picker support size props at default. ([#917])
- **Improve** Improved animation of `<Placeholder>` active state.
- **Improve**: Improved `wordWrap` property for compatibility with `rowHeight`. ([rsuite-table#138])
- **Bugfix**: Fix Types.PlacementAuto definition. ([#962])
- **Chore**: Migrating `rsuite-utils` to `rsuite`. ([#963])
- **Example**: Add with-preact example. ([#977])

---

- **Feature**: `<Tree>` 组件新增 `draggable`属性， 支持拖拽。 ([#987])
- **Feature**: 新增 `<Rete>` 组件。 ([#981])
- **Feature**: 新增对意大利语言支持。 ([#971])
- **Feature**: 支持自定义浮层。 ([#969])
- **Feature**: `<Timeline>` 组件新增 `endless` 属性。 ([#982])
- **Feature**: `<Progress.Line>` 组件新增 `vertical` 属性，垂直显示进度条。 ([#938])
- **Feature**: `<DatePicker>` 组件新增 `showMeridian` 属性，支持时间 12 小时格式显示。 ([#932])
- **Feature**: `<TagPicker>` 组件支持 `tagProps`，设置 Tag 属性。 ([#927])
- **Feature**: `<Affix>` 支持 `container` 属性，把元素只在容器可见范围内才固定。 ([#912])
- **Feature**: `<Table>` 支持 `onDataUpdated` 属性，在表格数据加载完成以后的回调函数。 ([rsuite-table#140])
- **Feature**: `<Table>` 支持 `affixHorizontalScrollbar` 属性，让表格底部横向滚动条固定在可视范围内。 ([rsuite-table#137])
- **Feature**: 所有带搜索功能的 Picker 组件 `searchBy`属性，可以自定义搜索规则。 ([#928],[#965])
- **Breaking**: 修复 Uploader 属性 `dragable` 拼写错误，修改为 `draggable`。 ([#984])
- **Improve**: 改进所有的 Picker 组件，默认支持 `size` 属性。([#917])
- **Improve** 改进 `<Placeholder>` 的动画效果。
- **Bugfix**: 修复 `<Table>` 的 `wordWrap` 属性与 `rowHeight`不兼容的问题。 ([rsuite-table#138])
- **Bugfix**: 修复 Typescript 一些定义错误。([#962])
- **Example**: 新增示例项目 with-preact。 ([#977])
- **Chore**: 迁移 `rsuite-utils` 库到 `rsuite`，方便维护。 ([#963])

[#987]: https://github.com/rsuite/rsuite/pull/987
[#984]: https://github.com/rsuite/rsuite/pull/984
[#987]: https://github.com/rsuite/rsuite/pull/982
[#981]: https://github.com/rsuite/rsuite/pull/981
[#977]: https://github.com/rsuite/rsuite/pull/977
[#971]: https://github.com/rsuite/rsuite/pull/971
[#969]: https://github.com/rsuite/rsuite/pull/969
[#965]: https://github.com/rsuite/rsuite/pull/965
[#963]: https://github.com/rsuite/rsuite/pull/963
[#962]: https://github.com/rsuite/rsuite/pull/962
[#938]: https://github.com/rsuite/rsuite/pull/938
[#933]: https://github.com/rsuite/rsuite/pull/933
[#932]: https://github.com/rsuite/rsuite/pull/932
[#928]: https://github.com/rsuite/rsuite/pull/928
[#927]: https://github.com/rsuite/rsuite/pull/927
[#917]: https://github.com/rsuite/rsuite/pull/917
[#912]: https://github.com/rsuite/rsuite/pull/912
[rsuite-table#140]: https://github.com/rsuite/rsuite-table/pull/140
[rsuite-table#138]: https://github.com/rsuite/rsuite-table/pull/138
[rsuite-table#137]: https://github.com/rsuite/rsuite-table/pull/137

# 4.3.4

> April 10, 2020

- **Bugfix**: Fixed `<DatePciker>` onlyTime icon to clock icon. ([#933])
- **Bugfix**: Fixed an issue where the cache was not reset after the data was updated in `<InputPicker>`. ([#948])

---

- **Bugfix**: 修复了 `<DatePciker>` 在只显示时间时图标错误的问题。([#933])
- **Bugfix**: 修复了 `<InputPicker>` 在更新数据后未重置缓存的问题，导致新建项重复。 ([#948])

[#948]: https://github.com/rsuite/rsuite/pull/948
[#933]: https://github.com/rsuite/rsuite/pull/933

# 4.3.3

> March 26, 2020

- **Bugfix**: Fixed `<InputNumber>` triggering `onChange` event incorrectly when losing focus. ([#923])
- **Bugfix**: Update broken types in `<DateRangePicker>`. ([#916])
- **Bugfix**: `rowHeight` should be optional on `<Table>`. ([#913])
- **Improve**: The `content` props value supports `false` on `<Badge>`. ([#915])
- **Improve**: Support keyboard enter key selection after the search is completed on Picker. ([#914])

---

- **Bugfix**: 修复了 `<InputNumber>` 在失去焦点时候，值未改变的情况下也触发了 `onChange` 事件。 ([#923])
- **Bugfix**: 修复了 `<DateRangePicker>` 中错误的 typescript 类型定义。 ([#916])
- **Bugfix**: 修复了 `<Table>` 错误的 typescript 类型定义, `rowHeight` 应该是可选属性。 ([#913])
- **Improve**: 更新 `<Badge>` 组件 `content` 属性的值可以设置为 `false`。 ([#915])
- **Improve**: 改进了 `Picker` 组件在搜索后，支持键盘 `Enter` 键直接选中第一个结果。 ([#914])

[#923]: https://github.com/rsuite/rsuite/pull/923
[#916]: https://github.com/rsuite/rsuite/pull/916
[#915]: https://github.com/rsuite/rsuite/pull/915
[#914]: https://github.com/rsuite/rsuite/pull/914
[#913]: https://github.com/rsuite/rsuite/pull/913

# 4.3.2

> March 19, 2020

- **Feature**: Support `showOneCalendar` on `<DateRangePicker>`. ([#911],[#848])
- **Bugfix**: Fixed an issue where the scroll bar would not reset after the table was updated with data. ([rsuite-table#136])
- **Bugfix**: Fixed missing typescript type definition in table.
- **Example**: Added example for `Nav.Item` with `react-router-dom/link`. ([#909])
- **Example**: Added example for `Nav.Item` with `next/link`. ([#907])

---

- **Feature**: `<DateRangePicker>` 新增 `showOneCalendar` 属性，支持只显示一个日历。([#911],[#848])
- **Bugfix**: 修复了 `<Table>` 在数据更新后，滚动条位置未重重的问题。 ([rsuite-table#136])
- **Bugfix**: 修复了 `<Table>` 缺少 Typescript 的类型定义。
- **Example**: 新增 `Nav.Item` 与 `react-router-dom/link`组合的示例 ([#909])
- **Example**: 新增 `Nav.Item` 与 `next/link`组合的示例 ([#907])

[#911]: https://github.com/rsuite/rsuite/pull/911
[#909]: https://github.com/rsuite/rsuite/pull/909
[#907]: https://github.com/rsuite/rsuite/pull/907
[#904]: https://github.com/rsuite/rsuite/pull/904
[#848]: https://github.com/rsuite/rsuite/pull/848
[rsuite-table#136]: https://github.com/rsuite/rsuite-table/pull/136

# 4.3.1

> March 13, 2020

- **Bugfix**: Fixed rendering error in local language. ([#903])
- **Bugfix**: Fixed the problem that the `resizable` property of the columns of the table would not work. ([rsuite-table#135])
- **Bugfix**: Fix Icon issue when Panel is nested. ([#894])
- **Bugfix**: Fix incorrect value passing. ([#888])
- **Bugfix**: [docs] Fixed issue that website can't load in safari and ie. ([#901])
- **Bugfix**: [docs] Add title to home page. ([#898])
- **Example**: Add with-gatsby example. ([#897])

---

- **Bugfix**: 修复本地语言渲染错误的问题。 ([#903])
- **Bugfix**: 修复 Table 列设置 `resizable` 以后拖拽列宽不工作的问题。 ([rsuite-table#135])
- **Bugfix**: 修复 Panel 组件嵌套 Icon 重复显示的问题 ([#894])
- **Bugfix**: 修复 PaginationButton 中传递的错误值。 ([#888])
- **Bugfix**: [docs] 修复文档不能再 safari 和 ie 浏览器正常访问的问题。 ([#901])
- **Bugfix**: [docs] 修复文档首页缺失 title 的问题 ([#898])
- **Example**: 添加 rsuite 与 gatsby 集成的示例 ([#897])

[#903]: https://github.com/rsuite/rsuite/pull/903
[#901]: https://github.com/rsuite/rsuite/pull/901
[#898]: https://github.com/rsuite/rsuite/pull/898
[#894]: https://github.com/rsuite/rsuite/pull/894
[#888]: https://github.com/rsuite/rsuite/pull/888
[#897]: https://github.com/rsuite/rsuite/pull/897
[rsuite-table#135]: https://github.com/rsuite/rsuite-table/pull/135

# 4.3.0

> March 5, 2020

- **Feature**: Added Arabic, Finnish, Swedish and Danish locales. ([#849],[#821])
- **Feature**: Added `expanded` parameter in `renderTreeToggle` of `<Table>`. ([rsuite-table#130])
- **Feature**: Added support `treeCol` on `<Table.Column>`. ([rsuite-table#129])
- **Bugfix**: Fixed `<CheckPicker>` rendering error when setting `groupBy`. ([#887])
- **Bugfix**: Fixed `<Slider>` bar is invisible on Drawer in dark mode. ([#876])
- **Bugfix**: Fixed disabled `<InputNumber>` in `<InputGroup>` shows unexpected border radius. ([#875])
- **Bugfix**: Fixed radio-group inline item styles. ([#872])
- **Bugfix**: Fixed missing typescript declaration files \*.d.ts in `/locales`. ([#856])
- **Bugfix**: Fixed mark cannot be customized rendering in `<Slider>` correctly. ([#840])
- **Improve**: Updated check rules for disabled times on `<DatePicker>`. ([#852])
- **Improve**: Support for getting the `active` property when the Pagination button is a custom element. ([#833])
- **Breaking**: The `rowHeight` property of Table supports function values. Remove the`setRowHeight` property.
- **Chore**: Improved HoC to support ref passing. ([#862],[#872])
- **Chore**: Added some integrated examples. ([#860],[examples])
- **Chore**: The Table component migrates Typescript from Flow. ([rsuite-table#127])

---

- **Feature**: 新增支持阿拉伯语，芬兰语，瑞典语和丹麦语。 ([#849],[#821])
- **Feature**: `<Table>` 的 `renderTreeToggle`属性新增 `expanded` 参数。 ([rsuite-table#130])
- **Feature**: `<Table.Column>` 上新增 `treeCol` 属性，指定 Tree 显示的列。 ([rsuite-table#129])
- **Bugfix**: 修复了 `<CheckPicker>` 当设置 `groupBy='group'`渲染出错。 ([#887])
- **Bugfix**: 修复了 `<Slider>` 在 dark 主题下选择栏不可见的问题。 ([#876])
- **Bugfix**: 修复了 `<InputGroup>` 里禁用的 `<InputNumber>` 显示错误的边框。 ([#875])
- **Bugfix**: 修复了 `<RadioGroup>` 单行显示时的样式问题。 ([#872])
- **Bugfix**: 修复了 locales 目录下语言包缺少 Typescript 类型定义。 ([#856])
- **Bugfix**: 修复了 `<Slider>` 的标记在自定义时候无法正确呈现。 ([#840])
- **Improve**: 更新了 `<DatePicker>` 上禁用时间的检查规则。 ([#852])
- **Improve**: 支持在 `<Pagination>` 按钮是自定义元素时获取 `active` 属性 。 ([#833])
- **Breaking**: `<Table>` 的 `rowHeight` 属性值支持函数，同时删除了 `setRowHeight` 属性。
- **Chore**: 改进了高阶组件以支持 ref 传递。 ([#862],[#872])
- **Chore**: 新增了一些集成的示例项目。 ([#860],[examples])
- **Chore**: Table 组件库从 Flow 迁移到 Typescript。 ([rsuite-table#127])

[#887]: https://github.com/rsuite/rsuite/pull/887
[#876]: https://github.com/rsuite/rsuite/pull/876
[#875]: https://github.com/rsuite/rsuite/pull/875
[#873]: https://github.com/rsuite/rsuite/pull/873
[#872]: https://github.com/rsuite/rsuite/pull/872
[#862]: https://github.com/rsuite/rsuite/pull/862
[#860]: https://github.com/rsuite/rsuite/pull/860
[#856]: https://github.com/rsuite/rsuite/pull/856
[#852]: https://github.com/rsuite/rsuite/pull/852
[#849]: https://github.com/rsuite/rsuite/pull/849
[#840]: https://github.com/rsuite/rsuite/pull/840
[#833]: https://github.com/rsuite/rsuite/pull/831
[#821]: https://github.com/rsuite/rsuite/pull/821
[rsuite-table#130]: https://github.com/rsuite/rsuite-table/pull/130
[rsuite-table#129]: https://github.com/rsuite/rsuite-table/pull/129
[rsuite-table#127]: https://github.com/rsuite/rsuite-table/pull/127
[examples]: https://github.com/rsuite/rsuite/tree/master/examples

# 4.2.1

> February 2, 2020

- **Bugfix**: Fixed "script-src" content security policy (CSP) failure ([#830])
- **Bugfix**: Fixed an issue where `onSelect` was called undefined, when using `enter` on the `<AutoComplete>` to select it. ([#828])
- **Bugfix**: Fixed vertical alignment of xs `<Datepicker>` icon. ([#817])
- **Bugfix**: Fixed List and Modal combo setting has drag issue. ([#812])
- **Bugfix**: Fixed toggle text/icon font size. ([#810])
- **Bugfix**: Fixed an issue where `scrollTop` would not work in `<Table>`. ([rsuite-table#13da7a9])
- **Bugfix**: Fixed `<Table>` style overlap problem, when there are both loading and empty states. ([rsuite-table#120])
- **Bugfix**: [TS] Update ts type definition for Animation. ([#822])
- **Improve**: Special handling of `<Button>` when it is used as a `link`. ([#831])
- **Improve**: Remove defalut value of `parentSelectable` in `<Cascader>` ([#808])
- **Chore**: Update eslint ([#808])

---

- **Bugfix**: 修复了 `script-src` 内容安全策略（CSP）失败的问题。 ([#830])
- **Bugfix**: 修复了 `<AutoComplete>` 组件使用 `enter` 选择时候 `onSelect` 回调未被调用的问题。([#828])
- **Bugfix**: 修复了 xs `<Datepicker>` 图标的垂直对齐方式。 ([#817])
- **Bugfix**: 修复了 List 和 Modal 组合时候存在的拖拽问题。 ([#812])
- **Bugfix**: 修复了 Toggle 字体大小的问题。 ([#810])
- **Bugfix**: 修复了 `<Table>` 的 `scrollTop` API 调用无效的问题。([rsuite-table#13da7a9])
- **Bugfix**: 修复了 `<Table>` 的加载中状态与数据为空状态的样式重叠的问题。 ([rsuite-table#120])
- **Bugfix**: [TS] 更新了 Animation 的类型定义。 ([#822])
- **Improve**: 当 `<Button>` 为 `link` 的时候的特殊处理。 ([#831])
- **Improve**: 删除 `<Cascader>` 的 `parentSelectable` 属性的默认值。 ([#808])
- **Chore**: 更新 eslint 配置。 ([#808])

[#831]: https://github.com/rsuite/rsuite/pull/831
[#830]: https://github.com/rsuite/rsuite/pull/830
[#828]: https://github.com/rsuite/rsuite/pull/828
[#822]: https://github.com/rsuite/rsuite/pull/822
[#817]: https://github.com/rsuite/rsuite/pull/817
[#812]: https://github.com/rsuite/rsuite/pull/812
[#810]: https://github.com/rsuite/rsuite/pull/810
[#808]: https://github.com/rsuite/rsuite/pull/808
[rsuite-table#13da7a9]: https://github.com/rsuite/rsuite-table/commit/476c7573172205ba8df976035a1e770298a33367
[rsuite-table#120]: https://github.com/rsuite/rsuite-table/pull/124

# 4.2.0

> January 2, 2020

- **Feature**: Added support for `<RangeSlider>` ([#805])
- **Feature**: Added support for `parentSelectable` on `<Cascader>`. ([#802])
- **Feature**: Added support for Russian. ([#799])
- **Feature**: Added option `image` to the `graph` property of `<Placeholder>` ([#755])
- **Feature**: Added support for `draggable` on `<Uploader>`. ([#752])
- **Improve**: Enhance `<Tooltip>` and `<Popover>` to support HTML attributes ([#806])
- **Bugfix**: Fixed the height of the buttons in the `<InputGroup>`.([#807])
- **Bugfix**: Fixed `Drawer` gap bug when in RTL mode.([#803])
- **Bugfix**: Fixed `<TreePicker>` changing width does not work when setting `virtualized` props. ([#796])
- **Bugfix**: Fixed `<TreePicker>` not showing child nodes when loading data asynchronously. ([#796])
- **Bugfix**: Fixed `xsHidden` don't work as expected ([#795])

---

- **Feature**: 新增组件 `<RangeSlider>` ([#805])
- **Feature**: `<Cascader>` 组件支持 `parentSelectable` 属性，让父节点可选择。([#802])
- **Feature**: 添加对俄语支持。([#799])
- **Feature**: `<Placeholder>`的 `graph` 属性值添加了 `image` 选项。 ([#755])
- **Feature**: `<Uploader>` 组件支持 `draggable` 属性，可以拖拽上传文件。([#752])
- **Improve**: `<Tooltip>` 和 `<Popover>` 支持 HTML 元素默认属性。 ([#806])
- **Bugfix**: 修复了 `<InputGroup>` 内部按钮高度的问题。([#807])
- **Bugfix**: 修复了 `<Drawer>` 在 RTL 模式下，左侧存在间隙的样式问题。([#803])
- **Bugfix**: 修复了 `<TreePicker>` 在设置 `virtualized` 属性后，改变宽度无效的问题。 ([#796])
- **Bugfix**: 修复了 `<TreePicker>` 在异步更新后，不能展示子节点的问题。 ([#796])
- **Bugfix**: 修复了 `xsHidden` 属性不能按照预期显示的问题。 ([#795])

[#807]: https://github.com/rsuite/rsuite/pull/807
[#806]: https://github.com/rsuite/rsuite/pull/806
[#805]: https://github.com/rsuite/rsuite/pull/805
[#803]: https://github.com/rsuite/rsuite/pull/803
[#802]: https://github.com/rsuite/rsuite/pull/802
[#799]: https://github.com/rsuite/rsuite/pull/799
[#796]: https://github.com/rsuite/rsuite/pull/796
[#795]: https://github.com/rsuite/rsuite/pull/795
[#755]: https://github.com/rsuite/rsuite/pull/755
[#752]: https://github.com/rsuite/rsuite/pull/752

# 4.1.5

> December 19, 2019

- **Feature**: Added support for `virtualized` on picker.([#786])
- **Bugfix**: Fixed `<CheckTreePicker>` checkbox style issue.([#786])
- **Bugfix**: Fixed RTL related bugs. ([#779])
- **Bugfix**: Fixed `<Icon>` rotate props not working. ([#790])
- **Improve**: Added parameter to Uploader's callback method. ([#781])
- **Chore**: Added component prefix to `<Popover>` arrow. ([#791])
- **Chore**: upgrade ESLint and format code. ([#780])

---

- **Feature**: Picker 相关组件添加了 `virtualized` 属性。([#786])
- **Bugfix**: 修复了 `<CheckTreePicker>` 复选框样式问题。([#786])
- **Bugfix**: 修复了 RTL 相关的 Bug。 ([#779])
- **Bugfix**: 修复 `<Icon>` rotate 属性无效的问题。 ([#790])
- **Improve**: 为 `<Uploader>` 的回调方法中添加参数 `XMLHttpRequest`。 ([#781])
- **Chore**: 调整 `<Popover>` 内部样式的命名。 ([#791])
- **Chore**: 更新了 ESLint。 ([#780])

[#792]: https://github.com/rsuite/rsuite/pull/792
[#791]: https://github.com/rsuite/rsuite/pull/791
[#790]: https://github.com/rsuite/rsuite/pull/790
[#789]: https://github.com/rsuite/rsuite/pull/789
[#786]: https://github.com/rsuite/rsuite/pull/786
[#781]: https://github.com/rsuite/rsuite/pull/781
[#780]: https://github.com/rsuite/rsuite/pull/780
[#779]: https://github.com/rsuite/rsuite/pull/779

# 4.1.4

> December 12, 2019

- **Improve**: Improve the performance of virtualized table ([rsuite-table#120])
- **Chore**: Adjusted the sideEffects configuration.. ([#774])

---

- **Improve**: 优化了 Table 组件在渲染大数据时候性能。 ([rsuite-table#120])
- **Chore**: 调整了 sideEffects 配置。 ([#774])

[#774]: https://github.com/rsuite/rsuite/pull/774
[rsuite-table#120]: https://github.com/rsuite/rsuite-table/pull/120

# 4.1.3

> December 5, 2019

- **Bugfix**: Fixed some style issues. ([#770],[#771],[#767])
- **Bugfix**: Fixed the issue that events cannot be accessed in asynchronous callbacks. ([#763])
- **Bugfix**: Fix RTL related bugs ([#757],[#760],[#769])
- **Improve**: Improved the speed at which `<DateRangePicker`> opens. ([#768])

---

- **Bugfix**: 修复了一些样式问题。 ([#770],[#771],[#767])
- **Bugfix**: 修复了无法在组件的异步回调中获取 Event 对象的问题。 ([#763])
- **Bugfix**: 修复 RTL 相关 Bug。 ([#757],[#760],[#769])
- **Improve**: 优化了 `<DateRangePicker>` 打开的速度。 ([#768])

[#771]: https://github.com/rsuite/rsuite/pull/771
[#770]: https://github.com/rsuite/rsuite/pull/770
[#769]: https://github.com/rsuite/rsuite/pull/769
[#768]: https://github.com/rsuite/rsuite/pull/768
[#767]: https://github.com/rsuite/rsuite/pull/767
[#763]: https://github.com/rsuite/rsuite/pull/763
[#760]: https://github.com/rsuite/rsuite/pull/760
[#757]: https://github.com/rsuite/rsuite/pull/757

# 4.1.2

> November 29, 2019

- **Bugfix**: Fixed the issue where `<DateRangePicker>` was not disabled in the previous month and the next month. ([#747])
- **Bugfix**: Fixed `<DateRangePicker>` panel collapse issue. ([#746])
- **Bugfix**: Fixed multiple picker count label vertical align issue when set `size=lg` ([#742])
- **Bugfix**: Fix FormControl typescript type definition error ([#741])
- **Bugfix**: Fix RTL related bugs ([#732],[#733],[#734],[#743],[#748],[#749])
- **Chore**: Update Schema typescript definition. ([#754])
- **Chore**: Add a default value for the variable in `createConcatChildrenFunction`. ([#753])

---

- **Bugfix**: 修复 `<DateRangePicker>` 上一月与下一月未禁用的问题。 ([#747])
- **Bugfix**: 修复了 `<DateRangePicker>` 面板折叠的问题。 ([#746])
- **Bugfix**: 修复了设置 `size = lg` 时 `Picker` 计数标签垂直对齐的问题 ([#742])
- **Bugfix**: 修复 `FormControl` 的 `Typescript` 类型定义错误 ([#741])
- **Bugfix**: 修复 RTL 相关 Bug ([#732],[#733],[#734],[#743],[#748],[#749])
- **Chore**: 更新 Schema typescript 类型定义。 ([#754])
- **Chore**: 在 `createConcatChildrenFunction` 中为变量添加一个默认值。 ([#753])

[#754]: https://github.com/rsuite/rsuite/pull/754
[#753]: https://github.com/rsuite/rsuite/pull/753
[#749]: https://github.com/rsuite/rsuite/pull/749
[#748]: https://github.com/rsuite/rsuite/pull/748
[#747]: https://github.com/rsuite/rsuite/pull/747
[#746]: https://github.com/rsuite/rsuite/pull/746
[#743]: https://github.com/rsuite/rsuite/pull/743
[#742]: https://github.com/rsuite/rsuite/pull/742
[#741]: https://github.com/rsuite/rsuite/pull/741
[#734]: https://github.com/rsuite/rsuite/pull/734
[#733]: https://github.com/rsuite/rsuite/pull/733
[#732]: https://github.com/rsuite/rsuite/pull/732

# 4.1.1

> November 14, 2019

- **Feature**: Added support for `affixHeader` on `<Table>`. ([#720],[rsuite-table#105])
- **Feature**: Added support for `inline` on Cascader and MultiCascader ([#724])
- **Bugfix**: Fixed a problem where the Chinese formatting characters were too long to cause time wrap on the DatePicker. ([#722])
- **Bugfix**: Fixed checktree menu item text-algin styles issue. ([#718])
- **Bugfix**: Fixed DatePicker format issue. ([#723])
- **Bugfix**: Fixed an issue where the Table scroll bar was out of control.([rsuite-table#105])
- **Chore**: Upgrade to typescirpt 3.7. ([#721])

---

- **Feature**: 在 `<Table>` 组件上新增 `affixHeader` 属性，可以让表头页面级固定。([#720],[rsuite-table#105])
- **Feature**: 在 `<Cascader>` 与 `<MultiCascader>` 组件上新增 `inline` 属性。 ([#724])
- **Bugfix**: 修复了日期中文格式化字符过长而导致 `<DatePicker>` 上的时间换行的问题。 ([#722])
- **Bugfix**: 修复了 `<CheckTree>` 菜单项文本对齐样式问题。 ([#718])
- **Bugfix**: 修复了 `<DatePicker>` 日期格式化问题。 ([#723])
- **Bugfix**: 修复了 `<Table>` 滚动条失控的问题。 ([rsuite-table#105])
- **Chore**: 升级 Typescirpt 至 3.7 版本。 ([#721])

[#724]: https://github.com/rsuite/rsuite/pull/724
[#723]: https://github.com/rsuite/rsuite/pull/723
[#722]: https://github.com/rsuite/rsuite/pull/722
[#721]: https://github.com/rsuite/rsuite/pull/721
[#720]: https://github.com/rsuite/rsuite/pull/720
[#718]: https://github.com/rsuite/rsuite/pull/718
[rsuite-table#106]: https://github.com/rsuite/rsuite-table/pull/106
[rsuite-table#105]: https://github.com/rsuite/rsuite-table/pull/105

# 4.1.0

> November 7, 2019

- **Feature**: Add support for `<Carousel>`. ([#716])
- **Feature**: Added Right-to-left supported. ([#715])
- **Feature**: Add support for `renderItem` on the navigation component. ([#713])
- **Feature**: Added for `fileListVisible` on `<Uploader>`. ([#709])
- **Feature**: Added `shaded` props for `<Panel>`. ([#677])
- **Feature**: Added support for `<Affix>` . ([#701])
- **Feature**: Supported show mode and customizing time for `<Timeline>`. ([#666])
- **Bugfix**: Fixed sideEffects configuration. ([#706])
- **Bugfix**: Fixed when setting `sticky` and all options were selected to not render the menu. ([#710])

---

- **Feature**: 支持 `<Carousel>` 组件。 ([#716])
- **Feature**: 支持 Right-to-left。 ([#715])
- **Feature**: 导航相关组件添加 `renderItem` 属性。 ([#713])
- **Feature**: 在 `<Uploader>` 组件上，添加支持 `fileListVisible` 属性，默认为 `true`, 设置 `false` 则不显示文件列表。 ([#709])
- **Feature**: 在 `<Panel>`组件上，添加支持 `shaded`属性，用于显示阴影。 ([#677])
- **Feature**: 支持 `<Affix>` 组件。 ([#701])
- **Feature**: 在 `<Timeline>` 组件添加了更多显示模式。 ([#666])
- **Bugfix**: 修复 sideEffects 配置错误导致样式文件丢失的问题。 ([#706])
- **Bugfix**: 修复了当设置`sticky`并选择了所有选项的时候，不渲染菜单的问题。([#710])

[#716]: https://github.com/rsuite/rsuite/pull/716
[#715]: https://github.com/rsuite/rsuite/pull/715
[#713]: https://github.com/rsuite/rsuite/pull/713
[#710]: https://github.com/rsuite/rsuite/pull/710
[#709]: https://github.com/rsuite/rsuite/pull/709
[#706]: https://github.com/rsuite/rsuite/pull/706
[#701]: https://github.com/rsuite/rsuite/pull/701
[#677]: https://github.com/rsuite/rsuite/pull/677
[#666]: https://github.com/rsuite/rsuite/pull/666

# 4.0.5

> October 31, 2019

- **Improve**: Use context to refactor the logic of partial arguments. ([#695])
- **Improve**: Adjust the implementation logic of `preventOverflow` in all Picker. ([rsuite-utils#14])
- **Bugfix**: Fix `<Alert>` font color problem under dark theme. ([#697])
- **Bugfix**: Fix the problem that can't extends in the ie10 browser. ([#694])

---

- **Improve**: 使用 context API 重构部分子父组件传参的逻辑。 ([#695])
- **Improve**: 调整了所有 `Picker`组件的 `preventOverflow` 属性的实现方式。 ([rsuite-utils#14])
- **Bugfix**: 修复 `<Alert>` 组件在 dark 主题下字体颜色问题。 ([#697])
- **Bugfix**: 修复 ie10 兼容性问题，context API 在高价函数中未继承。 ([#694])

[#697]: https://github.com/rsuite/rsuite/pull/697
[#695]: https://github.com/rsuite/rsuite/pull/695
[#694]: https://github.com/rsuite/rsuite/pull/694
[rsuite-utils#14]: https://github.com/rsuite/rsuite-utils/pull/14

# 4.0.4

> October 17, 2019

- **Bugfix**: Fixed a problem with the `Dropdown` and `Button`, the `ButtonGroup` is vertically aligned. ([#682])
- **Bugfix**: Fixed an error when `CheckTreePicker` changed data. ([#681])
- **Bugfix**: Fixed an issue where `isOneOf` was not valid in `Schema.Types.StringType`. ([schema-typed#18])
- **Bugfix**: Fixed a misalignment of scroll position after `Table` data update. ([rsuite-table#100])
- **Bugfix**: [TS] Fixed an issue with type definition errors in `List`. ([#678])

---

- **Bugfix**: 修复了 `Dropdown`, `Button` 与 `ButtonGroup` 垂直对齐的问题。 ([#682])
- **Bugfix**: 修复了 `CheckTreePicker` 数据改变后出现错误的问题 ([#681])
- **Bugfix**: 修复了 `Schema.Types.StringType` 中的 `isOneOf` 方法无效的问题。 ([schema-typed#18])
- **Bugfix**: 修复了 `Table` 数据更新后滚动位置出现偏移。 ([rsuite-table#100])
- **Bugfix**: [TS] 修复了 `List` 中类型定义错误的问题。 ([#678])

[#682]: https://github.com/rsuite/rsuite/pull/682
[#681]: https://github.com/rsuite/rsuite/pull/681
[#678]: https://github.com/rsuite/rsuite/pull/678
[schema-typed#18]: https://github.com/rsuite/schema-typed/pull/18
[rsuite-table#100]: https://github.com/rsuite/rsuite-table/pull/100

# 4.0.3

> October 10, 2019

- **Feature**: Added support for Korean ([#675])
- **Improve**: The corresponding format date is displayed on the calendar according to different regional languages. ([#668])
- **Bugfix**: Add the babel plugin for `lodash` and `date-fns`. ([#674])
- **Bugfix**: Change the sm breakpoint to 480px in the Grid ([#671])
- **Bugfix**: Fix the precision of floating point arithmetic in Slider. ([#660])
- **Bugfix**: Fixed an issue with type definition errors in `List`. ([#676])

---

- **Feature**: 添加对韩语/朝鲜语的支持。 ([#675])
- **Improve**: 根据不同地域语言在日历上显示对应格式日期。([#668])
- **Bugfix**: 为 `lodash` 和 `date-fns` 添加 babel 插件,按需加载代码。 ([#674])
- **Bugfix**: 在 `<Grid>` 中将 `sm` 断点更改为 `480px`。 ([#671])
- **Bugfix**: 修复`<Slider>` 中浮点运算的精度问题。 ([#660])
- **Bugfix**: [TS] 修复了 `List` 中类型定义错误的问题。 ([#676])

[#676]: https://github.com/rsuite/rsuite/pull/676
[#675]: https://github.com/rsuite/rsuite/pull/675
[#674]: https://github.com/rsuite/rsuite/pull/674
[#671]: https://github.com/rsuite/rsuite/pull/671
[#668]: https://github.com/rsuite/rsuite/pull/668
[#660]: https://github.com/rsuite/rsuite/pull/660

# 4.0.2

> September 29, 2019

- **Feature**: Added language Traditional Chinese. ([#652])
- **Feature**: Fixed an issue where the CheckTreePicker and TreePicker keyboard operations were invalid.
- **Bugfix**: Fixed `<Cascader>` search styles ([#651])
- **Bugfix**: Fixed uncontrolled issues with `<Cascader>` and `<MultiCascader>` ([#650])
- **Bugfix**: Fixed `<Cascader>` crash while search RegExp special_characters. ([#648])
- **Bugfix**: Fixed `<Panel>` title font size.([#644])
- **Bugfix**: Fixed item styles when set active and disable. ([#641])
- **Bugfix**: Fixed `<Sidebar>` can't collapse on Firefox browser ([#638])
- **Bugfix**: Fixed `<Tree>` rendering error on the server side.([#637])
- **Bugfix**: Fixed `<CheckTreePicker>` setting root node uncheckable error.([#637])
- **Bugfix**: Fixed IE browser compatibility issue. ([#631],[#632])
- **Bugfix**: Fixed a rendering error when the column in the `<Table>` was null. ([rsuite/rsuite-table#99])
- **Bugfix**: Fixed a problem with scrolling white screen after changing height on `<Table>`. ([rsuite/rsuite-table#97])
- **Bugfix**: [TS] Fixed type definitions for missing `Notification` and `Alert`. ([#633])
- **Bugfix**: [TS] Fixed `List` component not exported. ([#625])

---

- **Feature**: 添加组件对繁体中文的支持。 ([#652])
- **Bugfix**: 修复了 CheckTreePicker 和 TreePicker 键盘操作无效的问题。
- **Bugfix**: 修复了 `<Cascader>` 搜索列表样式问题。 ([#651])
- **Bugfix**: 修复了 `<Cascader>` 和 `<MultiCascader>` 不受控的问题。 ([#650])
- **Bugfix**: 修复了 `<Cascader>` 搜索正则表达元字符报错的问题。 ([#648])
- **Bugfix**: 修复了 `<Panel>` 标题字体大小与设计不符的问题。([#644])
- **Bugfix**: 修复了选项在设置 `active` 或者 `disable` 后的样式问题。 ([#641])
- **Bugfix**: 修复了 `<Sidebar>`在 Firefox 浏览器不能收缩的问题。 ([#638])
- **Bugfix**: 修复了 `<Tree>` 在服务端渲染报错的问。([#637])
- **Bugfix**: 修复了 `<CheckTreePicker>` 设置根节点不可点击后出现的渲染问题。([#637])
- **Bugfix**: 修复了 IE 浏览器兼容性问题。 ([#631],[#632])
- **Bugfix**: 修复了 `<Table>` 的列设置中存在 `null` 时候，导致的渲染出错问题。 ([rsuite/rsuite-table#99])
- **Bugfix**: 修复了 `<Table>` 在改变高度后出现白屏的问题。 ([rsuite/rsuite-table#97])
- **Bugfix**: [TS] 修复了 `Notification` 和 `Alert` 中缺少的方法定义。 ([#633])
- **Bugfix**: [TS] 修复了 `List` 组件找不到定义。 ([#625])

[#653]: https://github.com/rsuite/rsuite/pull/653
[#652]: https://github.com/rsuite/rsuite/pull/652
[#651]: https://github.com/rsuite/rsuite/pull/651
[#650]: https://github.com/rsuite/rsuite/pull/650
[#648]: https://github.com/rsuite/rsuite/pull/648
[#644]: https://github.com/rsuite/rsuite/pull/644
[#641]: https://github.com/rsuite/rsuite/pull/641
[#638]: https://github.com/rsuite/rsuite/pull/638
[#637]: https://github.com/rsuite/rsuite/pull/637
[#633]: https://github.com/rsuite/rsuite/pull/633
[#632]: https://github.com/rsuite/rsuite/pull/632
[#631]: https://github.com/rsuite/rsuite/pull/631
[#625]: https://github.com/rsuite/rsuite/pull/625
[rsuite/rsuite-table#99]: https://github.com/rsuite/rsuite-table/pull/99
[rsuite/rsuite-table#97]: https://github.com/rsuite/rsuite-table/pull/97

# 4.0.1

> September 19, 2019

- **Feature**: Support `defaultCalendarValue` on `<DateRangePicker>` ([#610])
- **Improve**: Add ARIA for accessibility ([#612],[#613])
- **Improve**: Use grab cursors for sortable List.Item ([#617])
- **Bugfix**: Fixed ESM build error ([#611])
- **Bugfix**: Fixed component not re-rendered after `sortType` update on `<Table>`. ([rsuite/rsuite-table#96])
- **Bugfix**: Fixed the position of the scroll bar when the height of the `<Table>` changes. ([rsuite/rsuite-table#95])
- **Bugfix**: Fixed validation of merged cells for custom children in `<Table>` ([rsuite/rsuite-table#94])
- **Bugfix**: Fixed unable to find node on an unmounted component in `<Dropdown>` ([rsuite/rsuite-utils@f205799])

---

- **Feature**: `<DateRangePicker>` 支持 `defaultCalendarValue` 属性。([#610])
- **Improve**: 为可访问性添加 ARIA。 ([#612],[#613])
- **Improve**: 调整 List.Item 拖拽时候的光标为 grab。 ([#617])
- **Bugfix**: 修复 ESM 构建时候报错。 ([#611])
- **Bugfix**: 修复在 `<Table>` 上 `sortType` 更新后没有重新渲染的组件。 ([rsuite/rsuite-table#96])
- **Bugfix**: 修复 `<Table>` 高度变化后更新滚动条位置 ([rsuite/rsuite-table#95])
- **Bugfix**: 修复 `<Table>` 中自定义 `children` 后，合并单元格的校验逻辑 ([rsuite/rsuite-table#94])
- **Bugfix**: 修复 `<Dropdown>` 中报错"无法在已卸载组件上找到节点"([rsuite/rsuite-utils@f205799])

[#617]: https://github.com/rsuite/rsuite/pull/617
[#613]: https://github.com/rsuite/rsuite/pull/613
[#612]: https://github.com/rsuite/rsuite/pull/612
[#611]: https://github.com/rsuite/rsuite/pull/611
[#610]: https://github.com/rsuite/rsuite/pull/610
[rsuite/rsuite-table#96]: https://github.com/rsuite/rsuite-table/pull/96
[rsuite/rsuite-table#95]: https://github.com/rsuite/rsuite-table/pull/95
[rsuite/rsuite-table#94]: https://github.com/rsuite/rsuite-table/pull/94
[rsuite/rsuite-utils@f205799]: https://github.com/rsuite/rsuite-utils/commit/f205799796595d78dff990b0f740c8c4a9e3d581

# 4.0.0

> September 9, 2019

- **Feature**: Add `<Placeholder>`. ([#418],[#420],[#423])
- **Feature**: Add `<List>`. ([#451])
- **Feature**: Add `<Calendar>`. ([#492])
- **Feature**: Add `<Avatar>`.([#486])
- **Feature**: Add `<Badge>`.([#484])
- **Feature**: Support `size` on all `Picker`.([#494])
- **Feature**: Support dark theme.([#544])
- **Feature**: Support for asynchronous validation in `<Form>`, based on Schema. ([#570])
- **Feature**: Support for expandItemValues on `<TreePicker>` and `<CheckTreePicker>`.([#569])
- **Feature**: Support `readOnly` prop on `<FormControl>`. ([#432])
- **Feature**: Support `plaintext` prop on `<FormControl>`. ([#448],[#449])
- **Feature**: `<Whisper>` and all `Picker` components support the `preventOverfow` property to prevent overflow. ([#443])
- **Improve**: Adjust swatch algorithm to adjust font color contrast. ([#433])
- **Improve**: Migrate from Flow to Typescript. ([#531])
- **Improve**: Support showWeekNumbers on <DatePicker> and <DateRangePicker>. ([#526] @viart)
- **Breaking**: Adjust the value of `<Whisper>` with all `Picker` components `placement` properties.([#443])
- **Bugfix**: Fixed an issue where the `<Uploader>` upload file was larger than 1GB.([#536])
- **Bugfix**: Fixed compatibility issue with `<Input>` on IE browser display. ([#507])
- **Bugfix**: Fixed `<InputPicker>` on the keyboard Delete key will clear the input worthy question. ([#577])
- **Bugfix**: Fixed an issue where `<Dropdown>` set `toggleComponentClass={Button}` background style error.([#525])
- **Bugfix**: Fixed an issue where styles were missing when introduced on demand.([#567])
- **Bugfix**: Fixed an issue where `<DatePicker>` disabled day and inactive month were inconsistent.([#595])
- **Bugfix**: Fixed an issue where the scrollbar position was not updated after the `<Table>` data was updated.([#table-92])
- **Bugfix**: Fixed `<Table>` property `expandedRowKeys` The update value is not controlled. ([#table-90])
- **Bugfix**: Fixed callback `<Table>` property `onRowClick`'s callback parameter is missing `event`. ([#table-89])
- **Bugfix**: Fixed support for `focus` events by the `<Form>` component.([#566])
- **Bugfix**: Modified the default separator for `<Breadcrumb>`.([#543])
- **Bugfix**: Fixed an issue where `<Slider>` did not update the position of the handle after the change from hidden to display state.([#542])

---

- **Feature**: 支持 `<Placeholder>` 组件。 ([#418],[#420],[#423])
- **Feature**: 支持 `<List>` 组件。 ([#451])
- **Feature**: 支持 `<Calendar>` 组件。([#492])
- **Feature**: 支持 `<Avatar>` 组件。([#486])
- **Feature**: 支持 `<Badge>` 组件。([#484])
- **Feature**: `<Picker>` 组件支持 `size` 属性。([#494])
- **Feature**: 支持 dark 主题。([#544])
- **Feature**: `<Form>`组件基于 Schema 支持异步校验。([#570])
- **Feature**: `<TreePicker>` 与 `<CheckTreePicker>` 支持 expandItemValues 属性。([#569])
- **Feature**: `<FormControl>` 组件支持 `readOnly` 属性。 ([#432])
- **Feature**: `<FormControl>` 组件支持 `plaintext` 属性。 ([#448],[#449])
- **Feature**: `<Whisper>` 组件与所有的 `Picker` 组件支持 `preventOverfow` 属性，防止溢出。
- **Improve**: 调整色板算法，调整字体颜色对比度。 ([#433])
- **Improve**: 从 Flow 迁移到 Typescript。 ([#531])
- **Improve**: `<DatePicker>`和`<DateRangePicker>`组件支持 showWeekNumbers 属性，显示周数 。([#526] @viart)
- **Breaking**: 调整 `<Whisper>` 组件与所有的 `<Picker>` 组件 `placement` 属性的值。([#443])
- **Bugfix**: 修复了 `<Uploader>` 上传文件大于 1GB 显示问题。([#536])
- **Bugfix**: 修复了 `<Input>` 在 IE 浏览器显示上的兼容性问题。 ([#507])
- **Bugfix**: 修复了 `<InputPicker>` 在键盘 Delete 键会清除输入值得问题。([#577])
- **Bugfix**: 修复了 `<Dropdown>` 设置 `toggleComponentClass={Button}` 背景样式错误的问题。([#525])
- **Bugfix**: 修复了按需引入时候样式缺失的问题。 ([#567])
- **Bugfix**: 修复了 `<DatePicker>` 禁用日与禁用月不一致的问题。([#595])
- **Bugfix**: 修复了 `<Table>` 数据更新后滚动条位置不更新的问题。([#table-92])
- **Bugfix**: 修复了 `<Table>` 属性 `expandedRowKeys` 更新值不受控。 ([#table-90])
- **Bugfix**: 修复了 `<Table>` 属性 `onRowClick` 的回调参数缺少 `event`。 ([#table-89])
- **Bugfix**: 修复了 `<Form>` 组件对 `focus` 事件的支持。([#566])
- **Bugfix**: 修改了 `<Breadcrumb>` 的默认分隔符。([#543])
- **Bugfix**: 修复了 `<Slider>` 在从隐藏到显示状态变化后，手柄的位置不更新的问题。([#542])

[#595]: https://github.com/rsuite/rsuite/pull/595
[#577]: https://github.com/rsuite/rsuite/pull/577
[#570]: https://github.com/rsuite/rsuite/pull/570
[#569]: https://github.com/rsuite/rsuite/pull/569
[#567]: https://github.com/rsuite/rsuite/pull/567
[#566]: https://github.com/rsuite/rsuite/pull/566
[#544]: https://github.com/rsuite/rsuite/pull/544
[#543]: https://github.com/rsuite/rsuite/pull/543
[#542]: https://github.com/rsuite/rsuite/pull/542
[#536]: https://github.com/rsuite/rsuite/pull/536
[#525]: https://github.com/rsuite/rsuite/pull/525
[#507]: https://github.com/rsuite/rsuite/pull/507
[#494]: https://github.com/rsuite/rsuite/pull/494
[#492]: https://github.com/rsuite/rsuite/pull/492
[#486]: https://github.com/rsuite/rsuite/pull/486
[#484]: https://github.com/rsuite/rsuite/pull/484
[#451]: https://github.com/rsuite/rsuite/pull/451
[#449]: https://github.com/rsuite/rsuite/pull/449
[#448]: https://github.com/rsuite/rsuite/pull/448
[#443]: https://github.com/rsuite/rsuite/pull/443
[#433]: https://github.com/rsuite/rsuite/pull/433
[#432]: https://github.com/rsuite/rsuite/pull/432
[#423]: https://github.com/rsuite/rsuite/pull/423
[#420]: https://github.com/rsuite/rsuite/pull/420
[#418]: https://github.com/rsuite/rsuite/pull/418
[#table-92]: https://github.com/rsuite/rsuite-table/pull/92
[#table-90]: https://github.com/rsuite/rsuite-table/pull/90
[#table-89]: https://github.com/rsuite/rsuite-table/pull/89
