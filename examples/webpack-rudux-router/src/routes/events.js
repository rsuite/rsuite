module.exports = {
    path: 'events',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/Events/Index').default);
        });
    }
};
