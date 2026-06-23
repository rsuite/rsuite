import { getTranslateDOMPositionXY } from 'dom-lib/translateDOMPositionXY';

const setCssPosition = getTranslateDOMPositionXY({ enable3DTransform: true });

export default setCssPosition;
