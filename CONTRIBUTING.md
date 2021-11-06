# Contributing to RSUITE

Rsuite wants to get help from the community while providing a developer service.

This article describes how you can help rsuite do a better job and contribute with your own strengths.

## Development

### Test-Driven Development（TDD）

1. Fork `https://github.com/rsuite/rsuite` this repo.

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.git
$ cd rsuite
```

2. Install it and run

```bash
$ npm i
$ npm run tdd
```

3. Run a single component test case.

```bash
$ M=Button npm run tdd
```

### UI-Driven Development

1. Fork `https://github.com/rsuite/rsuite` this repo.

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.git
```

2. Install it and run

```bash
$ npm i
$ npm run dev
```

3. Your show time. Open url http://127.0.0.1:3000/ in browser.

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
