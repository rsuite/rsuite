# Contributing to RSUITE

Rsuite wants to get help from the community while providing a developer service.

This article describes how you can help rsuite do a better job and contribute with your own strengths.

## Development

Fork this repo to your namespace and clone to your local machine.

    $ git clone git@github.com:<YOUR NAME>/rsuite.git
    $ cd rsuite

Install dependencies in root directory and `docs/` directory.

    $ npm i && npm i --prefix docs

Now you can start the development server by running `npm run dev` in `docs/` directory. It's serving at http://127.0.0.1:3000/ by default.

    $ npm run dev --prefix docs

### Testing

Most of the time while you're making changes,
you should make sure you're not breaking the tests.
To run and watch unit tests, you can run `npm run tdd` in root directory.

    $ npm run tdd

And it's possible to run only tests in a specific component using an `M` environment variable.

    # only run tests in src/Button directory
    $ M=Button npm run tdd

It's also possible to run tests in several different components as `M` accepts any glob pattern.

    # run tests in src/Button and src/ButtonGroup directories
    $ M={Button,ButtonGroup} npm run tdd

When writing tests, we use [the BDD assertion style](https://www.chaijs.com/api/bdd/).

```ts
expect(instance).to.have.class('class-in');
```

## Bug reports

We uniformly collect bugs and state management through 'Github Issues'. If you find a bug, you can notify us by 'Github issues'.

## Feature requests

If you have a feature idea for rsuite, you can let us know and we will assess the rationality of the requirements and implement your functionality in the appropriate version.
You can also participate in our development by submitting a pull request.

## Pull Request

We take every pull request seriously and will incorporate your code if it meets our code requirements.

You need to follow these procedures:

- Fork the project, clone your fork.

```bash
git clone https://github.com/<your-username>/rsuite.git
# Navigate to the newly cloned directory
cd rsuite
```

- Install project dependencies, executing at the project root:

```bash
npm install
```

-Then you can start, add your code, and either fix a bug or create a new feature.

-To ensure functional stability, you need to write tests for your code and pass the tests. Execute tests with the following command:

```bash
npm run test
```

-To ensure the unified style of your code, you need to pay attention to code specifications and execute the following commands:

```bash
npm run lint
```

- Open a Pull Request.

Thank you for your participation!
