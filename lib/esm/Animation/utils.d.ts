import PropTypes from 'prop-types';
export declare function getAnimationEnd(): "webkitAnimationEnd" | "animationend";
export declare const animationPropTypes: {
    onEnter: PropTypes.Requireable<(...args: any[]) => any>;
    onEntering: PropTypes.Requireable<(...args: any[]) => any>;
    onEntered: PropTypes.Requireable<(...args: any[]) => any>;
    onExit: PropTypes.Requireable<(...args: any[]) => any>;
    onExiting: PropTypes.Requireable<(...args: any[]) => any>;
    onExited: PropTypes.Requireable<(...args: any[]) => any>;
};
