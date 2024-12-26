export default function dynamicTests(arrayOfTests, generateTestDefinition) {
  arrayOfTests = arrayOfTests || [];
  generateTestDefinition = generateTestDefinition || function () {};

  arrayOfTests.forEach(function (test) {
    test = test || {};

    const testDefinition = generateTestDefinition(test) || {};

    it(testDefinition.description, testDefinition.body);
  });
}
