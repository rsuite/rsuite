export function hasClass(target, className) {
    if (target.classList) {
        return !!className && target.classList.contains(className);
    }
    return (' ' + target.className + ' ').indexOf(' ' + className + ' ') > -1;
}

export function addClass(target, className) {

    if (className) {
        if (target.classList) {
            target.classList.add(className);
        } else if (!hasClass(className, target)) {
            target.className = target.className + ' ' + className;
        }
    }
    return target;
}


export function removeClass(target, className) {
    if (className) {
        if (target.classList) {
            target.classList.remove(className);
        } else if (hasClass(className, target)) {
            target.className = target.className
                .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
                .replace(/\s+/g, ' ') // multiple spaces to one
                .replace(/^\s*|\s*$/g, ''); // trim the ends
        }
    }
    return target;
}
