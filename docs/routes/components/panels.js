module.exports = {
    path: 'panels',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/panels').default);
        });
    }
};
