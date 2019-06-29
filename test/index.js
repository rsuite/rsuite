import '@babel/polyfill';

function runAllTests(tests) {
 

  //tests('./AutoComplete/test/AutoCompleteSpec.js')
  
  tests.keys().forEach((a)=>{
    console.log(a);
    tests(a);
  });

}

runAllTests(require.context('../src', true, /Spec.js$/));
