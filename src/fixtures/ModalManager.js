
import { addClass, removeClass, addStyle, getScrollbarSize, isOverflowing} from 'dom-lib';


function findIndexOf(arr, cb) {
    let idx = -1;
    arr.some((d, i) => {
        if (cb(d, i)) {
            idx = i;
            return true;
        }
    });
    return idx;
}

function findContainer(data, modal) {
    return findIndexOf(data, d => d.modals.indexOf(modal) !== -1);
}

/**
 * Proper state managment for containers and the modals in those containers.
 *
 * @internal Used by the Modal to ensure proper styling of containers.
 */
class ModalManager {

    constructor(hideSiblingNodes = true) {
        this.hideSiblingNodes = hideSiblingNodes;
        this.modals = [];
        this.containers = [];
        this.data = [];
    }

    add(modal, container, className) {
        let modalIdx = this.modals.indexOf(modal);
        let containerIdx = this.containers.indexOf(container);



        if (modalIdx !== -1) {
            return modalIdx;
        }

        modalIdx = this.modals.length;
        this.modals.push(modal);

        if (containerIdx !== -1) {
            this.data[containerIdx].modals.push(modal);
            return modalIdx;
        }

        let data = {
            modals: [modal],
            //right now only the first modal of a container will have its classes applied
            classes: className ? className.split(/\s+/) : [],
            //we are only interested in the actual `style` here becasue we will override it
            style: {
                overflow: container.style.overflow,
                paddingRight: container.style.paddingRight
            }
        };

        let style = {
            overflow: 'hidden'
        };

        data.overflowing = isOverflowing(container);

        if (data.overflowing) {
            // use computed style, here to get the real padding
            // to add our scrollbar width
            style.paddingRight = parseInt(addStyle(container, 'paddingRight') || 0, 10) + getScrollbarSize() + 'px';
        }

        addStyle(container, style);

        data.classes.forEach(addClass.bind(null, container));

        this.containers.push(container);
        this.data.push(data);

        return modalIdx;
    }

    remove(modal) {

        let modalIdx = this.modals.indexOf(modal);


        if (modalIdx === -1) {
            return;
        }

        let containerIdx = findContainer(this.data, modal);

        let data = this.data[containerIdx];
        let container = this.containers[containerIdx];


        data.modals.splice(data.modals.indexOf(modal), 1);

        this.modals.splice(modalIdx, 1);

        // if that was the last modal in a container,
        // clean up the container stylinhg.
        if (data.modals.length === 0) {
            Object.keys(data.style).forEach(key => container.style[key] = data.style[key]);

            data.classes.forEach(removeClass.bind(null, container));

            this.containers.splice(containerIdx, 1);
            this.data.splice(containerIdx, 1);
        }
    }

    isTopModal(modal) {
        return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
    }
}

export default ModalManager;
