# LESS Plugins

## Plugins included

### `palette`

Generate `50`-`900` color levels of given base color.

```less
@plugin 'plugins/palette';

@H050: palette(@primary-color, 50);
@H100: palette(@primary-color, 100);
@H200: palette(@primary-color, 200);
@H300: palette(@primary-color, 300);
@H400: palette(@primary-color, 400);
@H500: @primary-color;
@H600: palette(@primary-color, 600);
@H700: palette(@primary-color, 700);
@H800: palette(@primary-color, 800);
@H900: palette(@primary-color, 900);
```

## TODO

Consider publish as standalone packages.
