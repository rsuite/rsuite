module.exports = {
    path: 'dropdowns',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/dropdowns').default);
        });
    }
};
