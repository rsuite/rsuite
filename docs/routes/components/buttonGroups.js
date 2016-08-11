module.exports = {
    path: 'buttonGroups',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/buttonGroups').default);
        });
    }
};
