import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import kebabCase from 'lodash/kebabCase';
import { ownerDocument, getOffset, getPosition, scrollTop, scrollLeft } from 'dom-lib';

const AutoPlacement = {
  left: 'Start',
  right: 'End',
  top: 'Start',
  bottom: 'End'
};

function getContainerDimensions(containerNode) {
  let width;
  let height;
  let scrollX;
  let scrollY;
  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;
    scrollY = scrollTop(ownerDocument(containerNode).documentElement) || scrollTop(containerNode);
    scrollX = scrollLeft(ownerDocument(containerNode).documentElement) || scrollLeft(containerNode);
  } else {
    ({ width, height } = getOffset(containerNode));
    scrollY = scrollTop(containerNode);
    scrollX = scrollLeft(containerNode);
  }
  return { width, height, scrollX, scrollY };
}

export default props => {
  const { placement, preventOverflow, padding } = props;

  function getTopDelta(top, overlayHeight, container) {
    if (!preventOverflow) {
      return 0;
    }
    const containerDimensions = getContainerDimensions(container);
    const { height: containerHeight, scrollY } = containerDimensions;

    const topEdgeOffset = top - padding - scrollY;
    const bottomEdgeOffset = top + padding + overlayHeight - scrollY;

    if (topEdgeOffset < 0) {
      return -topEdgeOffset;
    } else if (bottomEdgeOffset > containerHeight) {
      return containerHeight - bottomEdgeOffset;
    }

    return 0;
  }

  function getLeftDelta(left, overlayWidth, container) {
    if (!preventOverflow) {
      return 0;
    }
    const containerDimensions = getContainerDimensions(container);
    const { scrollX, width: containerWidth } = containerDimensions;

    const leftEdgeOffset = left - padding - scrollX;
    const rightEdgeOffset = left + padding + overlayWidth - scrollX;

    if (leftEdgeOffset < 0) {
      return -leftEdgeOffset;
    } else if (rightEdgeOffset > containerWidth) {
      return containerWidth - rightEdgeOffset;
    }

    return 0;
  }

  function getPositionTop(container, overlayHeight, top) {
    if (!preventOverflow) {
      return top;
    }
    const { scrollY, height: containerHeight } = getContainerDimensions(container);

    // 判断 overlay 底部是否溢出，设置 top
    if (overlayHeight + top > containerHeight + scrollY) {
      return containerHeight - overlayHeight + scrollY;
    }

    // top 的最小值不能少于纵向滚动条 y 的值
    return Math.max(scrollY, top);
  }

  function getPositionLeft(container, overlayWidth, left) {
    if (!preventOverflow) {
      return left;
    }

    const { scrollX, width: containerWidth } = getContainerDimensions(container);

    if (overlayWidth + left > containerWidth + scrollX) {
      return containerWidth - overlayWidth + scrollX;
    }

    // left 的最小值不能少于横向滚动条 x 的值
    return Math.max(scrollX, left);
  }

  return {
    getPosition(target, container) {
      const offset =
        container.tagName === 'BODY' ? getOffset(target) : getPosition(target, container);
      return offset;
    },

    calcAutoPlacement(targetOffset, container, overlay) {
      const { width, height, scrollX, scrollY } = getContainerDimensions(container);
      const left = targetOffset.left - scrollX - overlay.width;
      const top = targetOffset.top - scrollY - overlay.height;
      const right = width - targetOffset.left - targetOffset.width + scrollX - overlay.width;
      const bottom = height - targetOffset.top - targetOffset.height + scrollY - overlay.height;

      const horizontal = [
        { key: 'left', value: left },
        { key: 'right', value: right }
      ];
      const vertical = [
        { key: 'top', value: top },
        { key: 'bottom', value: bottom }
      ];
      const AV = 'autoVertical';
      const AH = 'autoHorizontal';

      let direction;
      let align;

      if (placement.indexOf(AV) !== -1) {
        direction = maxBy(vertical, o => o.value);
        return placement === AV ? direction.key : `${direction.key}${placement.replace(AV, '')}`;
      } else if (placement.indexOf(AH) !== -1) {
        direction = maxBy(horizontal, o => o.value);
        return placement === AH ? direction.key : `${direction.key}${placement.replace(AH, '')}`;
      }

      /**
       * Precedence Vertical
       * [...vertical, ...horizontal]
       */
      direction = maxBy([...vertical, ...horizontal], o => o.value);

      if (direction.key === 'left' || direction.key === 'right') {
        align = minBy(vertical, o => o.value);
      } else {
        align = minBy(horizontal, o => o.value);
      }

      return `${direction.key}${AutoPlacement[align.key]}`;
    },
    // 计算浮层的位置

    calcOverlayPosition(overlayNode, target, container) {
      const childOffset = this.getPosition(target, container);
      const { height: overlayHeight, width: overlayWidth } = getOffset(overlayNode);
      const { top, left } = childOffset;

      let nextPlacement = placement;

      if (placement && placement.indexOf('auto') >= 0) {
        nextPlacement = this.calcAutoPlacement(childOffset, container, {
          height: overlayHeight,
          width: overlayWidth
        });
      }

      let positionLeft;
      let positionTop;
      let arrowOffsetLeft;
      let arrowOffsetTop;

      if (nextPlacement === 'left' || nextPlacement === 'right') {
        positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

        const topDelta = getTopDelta(positionTop, overlayHeight, container);

        positionTop += topDelta;
        arrowOffsetTop = `${50 * (1 - (2 * topDelta) / overlayHeight)}%`;
        arrowOffsetLeft = undefined;
      } else if (nextPlacement === 'top' || nextPlacement === 'bottom') {
        positionLeft = left + (childOffset.width - overlayWidth) / 2;

        const leftDelta = getLeftDelta(positionLeft, overlayWidth, container);
        positionLeft += leftDelta;

        arrowOffsetLeft = `${50 * (1 - (2 * leftDelta) / overlayWidth)}%`;
        arrowOffsetTop = undefined;
      }

      if (nextPlacement === 'top' || nextPlacement === 'topStart' || nextPlacement === 'topEnd') {
        positionTop = getPositionTop(container, overlayHeight, childOffset.top - overlayHeight);
      }

      if (
        nextPlacement === 'bottom' ||
        nextPlacement === 'bottomStart' ||
        nextPlacement === 'bottomEnd'
      ) {
        positionTop = getPositionTop(
          container,
          overlayHeight,
          childOffset.top + childOffset.height
        );
      }

      if (
        nextPlacement === 'left' ||
        nextPlacement === 'leftStart' ||
        nextPlacement === 'leftEnd'
      ) {
        positionLeft = getPositionLeft(container, overlayWidth, childOffset.left - overlayWidth);
      }

      if (
        nextPlacement === 'right' ||
        nextPlacement === 'rightStart' ||
        nextPlacement === 'rightEnd'
      ) {
        positionLeft = getPositionLeft(
          container,
          overlayWidth,
          childOffset.left + childOffset.width
        );
      }

      if (
        document.dir === 'rtl' &&
        (nextPlacement === 'left' ||
          nextPlacement === 'leftStart' ||
          nextPlacement === 'leftEnd' ||
          nextPlacement === 'right' ||
          nextPlacement === 'rightStart' ||
          nextPlacement === 'rightEnd')
      ) {
        /**
         * When laying out in rtl, if the width of the container
         * is less than the width of the container scrolling,
         * you need to recalculate the left value.
         */
        const { width: containerWidth } = getContainerDimensions(container);
        if (container.scrollWidth > containerWidth) {
          positionLeft = containerWidth + positionLeft - container.scrollWidth;
        }
      }

      if (nextPlacement === 'topStart' || nextPlacement === 'bottomStart') {
        if (document.dir === 'rtl') {
          const nextLeft = left + (childOffset.width - overlayWidth);
          positionLeft = nextLeft + getLeftDelta(nextLeft, overlayWidth, container);
        } else {
          positionLeft = left + getLeftDelta(left, overlayWidth, container);
        }
      }

      if (nextPlacement === 'topEnd' || nextPlacement === 'bottomEnd') {
        if (document.dir === 'rtl') {
          positionLeft = left + getLeftDelta(left, overlayWidth, container);
        } else {
          const nextLeft = left + (childOffset.width - overlayWidth);
          positionLeft = nextLeft + getLeftDelta(nextLeft, overlayWidth, container);
        }
      }

      if (nextPlacement === 'leftStart' || nextPlacement === 'rightStart') {
        positionTop = top + getTopDelta(top, overlayHeight, container);
      }

      if (nextPlacement === 'leftEnd' || nextPlacement === 'rightEnd') {
        const nextTop = top + (childOffset.height - overlayHeight);
        positionTop = nextTop + getTopDelta(nextTop, overlayHeight, container);
      }

      return {
        positionLeft,
        positionTop,
        arrowOffsetLeft,
        arrowOffsetTop,
        positionClassName: `placement-${kebabCase(nextPlacement)}`
      };
    }
  };
};
