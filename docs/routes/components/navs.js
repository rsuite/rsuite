module.exports = {
    path: 'navs',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/navs').default);
        });
    }
};
