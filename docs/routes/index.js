module.exports = {
    childRoutes: [{
        path: '/',
        component: App,
        indexRoute: { component: require('../pages/PageIndex').default },
        childRoutes: [
            {
                path: 'getting-started',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('../pages/PageGettingStarted').default);
                    });
                }
            },{
                path: 'components',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('../pages/PageComponents').default);
                    });
                },
                indexRoute: { onEnter: (nextState, replace) => replace('/components/buttons') },
                childRoutes: [
                    require('../components/buttons')
                ]
            }

        ]
    }]
};
