module.exports = {
    path: 'tooltips',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/tooltips').default);
        });
    }
};
