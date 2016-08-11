module.exports = {
    path: 'grid',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/grid').default);
        });
    }
};
