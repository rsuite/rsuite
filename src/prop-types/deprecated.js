export default function deprecated(propType, explanation) {
    return function validate(props, propName, componentName) {
        if (props[propName] !== null) {
            new Error(`"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`);
        }

        return propType(props, propName, componentName);
    };
}
