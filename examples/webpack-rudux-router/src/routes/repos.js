module.exports = {
    path: 'repos',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/Repos/Index').default);
        });
    }
};
