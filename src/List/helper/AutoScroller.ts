import { Offset } from '../../@types/common';
import { Axis } from './utils';

type OffsetCallback = (offset: Offset) => void;

export interface AutoScrollerUpdatePayload {
  translate: Axis;
  minTranslate: Axis;
  maxTranslate: Axis;
  width: number;
  height: number;
}

const ACCELERATION = 5; // for auto scroll

/***
 * Auto scroll when approaching the edge
 * */
class AutoScroller {
  private readonly container: HTMLElement;
  private readonly onScrollCallback: OffsetCallback;
  private interval: NodeJS.Timeout | null = null;

  isAutoScrolling = true;

  constructor(container: HTMLElement, onScrollCallback: OffsetCallback) {
    this.container = container;
    this.onScrollCallback = onScrollCallback;
  }

  clear() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  update({ translate, minTranslate, maxTranslate, width, height }: AutoScrollerUpdatePayload) {
    const direction = { x: 0, y: 0 };
    const speed = { x: 0, y: 0 };
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } =
      this.container;

    const isTop = scrollTop === 0;
    const isBottom = scrollTop === scrollHeight - clientHeight;
    const isLeft = scrollLeft === 0;
    const isRight = scrollLeft === scrollWidth - clientWidth;

    if (translate.y! >= maxTranslate.y! - height / 2 && !isBottom) {
      // Scroll Down
      direction.y = 1;
      speed.y = ACCELERATION * Math.abs((maxTranslate.y! - height / 2 - translate.y!) / height);
    } else if (translate.x! >= maxTranslate.x! - width / 2 && !isRight) {
      // Scroll Right
      direction.x = 1;
      speed.x = ACCELERATION * Math.abs((maxTranslate.x! - width / 2 - translate.x!) / width);
    } else if (translate.y! <= minTranslate.y! + height / 2 && !isTop) {
      // Scroll Up
      direction.y = -1;
      speed.y = ACCELERATION * Math.abs((translate.y! - height / 2 - minTranslate.y!) / height);
    } else if (translate.x! <= minTranslate.x! + width / 2 && !isLeft) {
      // Scroll Left
      direction.x = -1;
      speed.x = ACCELERATION * Math.abs((translate.x! - width / 2 - minTranslate.x!) / width);
    }

    if (this.interval) {
      this.clear();
      this.isAutoScrolling = false;
    }

    if (direction.x !== 0 || direction.y !== 0) {
      // duration of auto scroll
      this.interval = setInterval(() => {
        this.isAutoScrolling = true;
        const offset = {
          left: speed.x * direction.x,
          top: speed.y * direction.y
        };
        this.container.scrollTop += offset.top;
        this.container.scrollLeft += offset.left;
        this.onScrollCallback(offset);
      }, 20);
    }
  }
}

export default AutoScroller;
