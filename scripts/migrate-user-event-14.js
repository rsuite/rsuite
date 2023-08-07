const { Project, SyntaxKind } = require('ts-morph');

const project = new Project({
  tsConfigFilePath: './tsconfig.json',
  skipAddingFilesFromTsConfig: true
});

project.addSourceFilesAtPaths('./src/**/*Spec.tsx').forEach(sourceFile => {
  // Get "import userEvent from '@testing-library/user-event';" statements
  const importUserEvent = sourceFile.getImportDeclaration(
    importDeclaration =>
      importDeclaration.getModuleSpecifierValue() === '@testing-library/user-event'
  );
  if (importUserEvent) {
    // For each arrow function in sourceFile
    // If the function body contains "userEvent.*" method calls
    // Add a variable declaration to the beginning of the body, which declares a const named "user" and assigns it the return value of "userEvent.setup()"
    // Replace all "userEvent.*" method calls with "user.*" method calls, mark the call as await if it is not already
    // If the function is not async, add async keyword to the function
    sourceFile.forEachDescendant(node => {
      if (node.isKind(SyntaxKind.ArrowFunction)) {
        // Make sure this arrow function is the second arg to a "it()" call
        const arrowFunction = node;
        const itCall = arrowFunction.getParentIfKind(SyntaxKind.CallExpression);
        if (!itCall) {
          return;
        }
        const expression = itCall.getExpression();
        if (!expression.isKind(SyntaxKind.Identifier)) {
          return;
        }
        if (expression.getText() !== 'it') {
          return;
        }
        const itCallArgs = itCall.getArguments();
        if (itCallArgs.length !== 2) {
          return;
        }
        const secondArg = itCallArgs[1];
        if (!secondArg.isKind(SyntaxKind.ArrowFunction)) {
          return;
        }
        if (secondArg !== arrowFunction) {
          return;
        }

        const functionDeclaration = node;

        let hasUserEventCalls = false;
        let alreadyHasUserSetup = false;
        functionDeclaration.forEachDescendant(node => {
          if (node.isKind(SyntaxKind.CallExpression)) {
            const callExpression = node;
            const expression = callExpression.getExpression();
            if (expression.isKind(SyntaxKind.PropertyAccessExpression)) {
              const propertyAccessExpression = expression;
              const subjectName = propertyAccessExpression.getExpression().getText();
              if (subjectName === 'userEvent') {
                console.log(propertyAccessExpression.getName());
                if (propertyAccessExpression.getName() === 'setup') {
                  alreadyHasUserSetup = true;
                  return;
                } else {
                  hasUserEventCalls = true;
                }
                propertyAccessExpression.getExpression().replaceWithText('user');

                const awaitExpression = callExpression.getParentIfKind(SyntaxKind.AwaitExpression);
                if (!awaitExpression) {
                  callExpression.replaceWithText(`await ${callExpression.getText()}`);
                }
              }
            }
          }
        });

        if (hasUserEventCalls) {
          functionDeclaration.setIsAsync(true);
          if (!alreadyHasUserSetup) {
            functionDeclaration.setBodyText(`
          const user = userEvent.setup();
          ${functionDeclaration.getBodyText()}
          `);
          }
        }
      }
    });
    sourceFile.saveSync();
    return;

    // Find all "userEvent.*" method calls
    // Prepend "await" keyword to that call
    // If the function is not async, add async keyword to the function
    // If the subject of the call is userEvent, replace it with a variable named "user" which is the return value of "userEvent.setup()"
    sourceFile.forEachDescendant(node => {
      if (node.isKind(SyntaxKind.CallExpression)) {
        const callExpression = node;
        const expression = callExpression.getExpression();
        if (expression.isKind(SyntaxKind.PropertyAccessExpression)) {
          const propertyAccessExpression = expression;
          const expressionName = propertyAccessExpression.getExpression().getText();
          if (expressionName === 'userEvent') {
            const functionDeclaration = callExpression.getFirstAncestorByKind(
              SyntaxKind.ArrowFunction
            );

            if (functionDeclaration) {
              functionDeclaration.setIsAsync(true);

              propertyAccessExpression.getExpression().replaceWithText('user');

              const awaitExpression = callExpression.getParentIfKind(SyntaxKind.AwaitExpression);
              if (!awaitExpression) {
                callExpression.replaceWithText(`await ${callExpression.getText()}`);
              }
              functionDeclaration.setBodyText(`
              const user = userEvent.setup();
              ${functionDeclaration.getBodyText()}
              `);
            }
          }
        }
      }
    });
    sourceFile.saveSync();
  }
});
