module.exports = {
    path: 'navbars',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/navbars').default);
        });
    }
};
