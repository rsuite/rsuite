export default function dynamicTests(arrayOfTests, generateTestDefinition) {
  arrayOfTests = arrayOfTests || [];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  generateTestDefinition = generateTestDefinition || function () {};

  arrayOfTests.forEach(function (test) {
    test = test || {};

    const testDefinition = generateTestDefinition(test) || {};

    it(testDefinition.description, testDefinition.body);
  });
}
