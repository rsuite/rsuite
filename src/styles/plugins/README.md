# LESS Plugins

## Plugins included

### `calcFontColor`

Calculate readable font color against given background color.

```less
@plugin 'plugins/calcFontColor';

@whitish: calcFontColor(@dark-gray);
@blackish: calcFontColor(@bright-yellow);
```

### `palette`

Generate `50`-`900` color levels of given base color.

```less
@plugin 'plugins/palette';

@H050: palette(@base-color, 50);
@H100: palette(@base-color, 100);
@H200: palette(@base-color, 200);
@H300: palette(@base-color, 300);
@H400: palette(@base-color, 400);
@H500: @base-color;
@H600: palette(@base-color, 600);
@H700: palette(@base-color, 700);
@H800: palette(@base-color, 800);
@H900: palette(@base-color, 900);
```

## TODO

Consider publish as standalone packages.
