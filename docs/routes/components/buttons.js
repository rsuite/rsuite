module.exports = {
    path: 'buttons',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/button').default);
        });
    }
};
