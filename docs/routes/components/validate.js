module.exports = {
    path: 'validate',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/validate').default);
        });
    }
};
