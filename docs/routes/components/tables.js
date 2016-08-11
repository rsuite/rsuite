module.exports = {
    path: 'tables',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/tables').default);
        });
    }
};
