module.exports = {
    childRoutes: [{
        path: '/',
        // 异步请求的路由如果不加 default 会报错: The root route must render a single element
        // http://stackoverflow.com/questions/36194806/invariant-violation-the-root-route-must-render-a-single-element-error-in-react
        component: require('../containers/Index').default,

        //https://github.com/reactjs/react-router/blob/master/docs/guides/IndexRoutes.md
        indexRoute: { onEnter: (nextState, replace) => replace('/events') },
        childRoutes: [
            require('./events'),
            require('./repos')
        ]
    }]
};
