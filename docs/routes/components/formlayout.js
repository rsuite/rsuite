module.exports = {
    path: 'formlayout',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/formlayout').default);
        });
    }
};
