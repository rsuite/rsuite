module.exports = {
    path: 'breadcrumbs',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/breadcrumbs').default);
        });
    }
};
