module.exports = {
    path: 'modals',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/modals').default);
        });
    }
};
