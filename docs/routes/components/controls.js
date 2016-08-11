module.exports = {
    path: 'controls',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/controls').default);
        });
    }
};
