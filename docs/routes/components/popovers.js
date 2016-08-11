module.exports = {
    path: 'popovers',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/popovers').default);
        });
    }
};
