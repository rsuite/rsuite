module.exports = {
    path: 'pagination',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/pagination').default);
        });
    }
};
