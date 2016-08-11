module.exports = {
    childRoutes: [{
        path: '/',
        component: require('../components/App').default,
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
                //indexRoute: { onEnter: (nextState, replace) => replace('/components/buttons') },
                childRoutes: [
                    require('./components/breadcrumbs'),
                    require('./components/buttonGroups'),
                    require('./components/buttons'),
                    require('./components/controls'),
                    require('./components/dropdowns'),
                    require('./components/formlayout'),
                    require('./components/grid'),
                    require('./components/modals'),
                    require('./components/navbars'),
                    require('./components/navs'),
                    require('./components/pagination'),
                    require('./components/panels'),
                    require('./components/popovers'),
                    require('./components/tables'),
                    require('./components/tooltips'),
                    require('./components/validate')
                ]
            }

        ]
    }]
};
