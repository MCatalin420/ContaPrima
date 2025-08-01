const { exec } = require('child_process');
const path = require('path');

// Test files to run
const testFiles = [
  'Declaratia112.test.js',
  'Declaratia300.test.js', 
  'Declaratia394.test.js',
  'Declartia100.test.js',
  'AllDeclaratia.test.js'
];

// Function to run a single test file
function runTestFile(testFile) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 Running tests for ${testFile}...`);
    console.log('='.repeat(50));
    
    const command = `npx hardhat test test/${testFile}`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error running ${testFile}:`, error.message);
        reject(error);
        return;
      }
      
      if (stderr) {
        console.error(`⚠️  Warnings in ${testFile}:`, stderr);
      }
      
      console.log(stdout);
      console.log(`✅ Completed tests for ${testFile}`);
      resolve();
    });
  });
}

// Function to run all tests
async function runAllTests() {
  console.log('🚀 Starting comprehensive test suite for Declaratia contracts...\n');
  
  const results = [];
  
  for (const testFile of testFiles) {
    try {
      await runTestFile(testFile);
      results.push({ file: testFile, status: 'PASSED' });
    } catch (error) {
      results.push({ file: testFile, status: 'FAILED', error: error.message });
    }
  }
  
  // Print summary
  console.log('\n📊 Test Summary:');
  console.log('='.repeat(50));
  
  const passed = results.filter(r => r.status === 'PASSED').length;
  const failed = results.filter(r => r.status === 'FAILED').length;
  
  results.forEach(result => {
    const status = result.status === 'PASSED' ? '✅' : '❌';
    console.log(`${status} ${result.file}: ${result.status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  console.log(`\n📈 Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed successfully!');
  }
}

// Function to run specific test file
async function runSpecificTest(testFileName) {
  if (!testFiles.includes(testFileName)) {
    console.error(`❌ Test file ${testFileName} not found. Available tests:`);
    testFiles.forEach(file => console.log(`   - ${file}`));
    process.exit(1);
  }
  
  try {
    await runTestFile(testFileName);
    console.log('\n🎉 Test completed successfully!');
  } catch (error) {
    console.log('\n❌ Test failed!');
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  // Run all tests
  runAllTests();
} else if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
🧪 Declaratia Contracts Test Runner

Usage:
  node test/run-tests.js                    # Run all tests
  node test/run-tests.js <test-file>       # Run specific test file

Available test files:
${testFiles.map(file => `  - ${file}`).join('\n')}

Examples:
  node test/run-tests.js Declaratia112.test.js
  node test/run-tests.js AllDeclaratia.test.js
`);
} else {
  // Run specific test file
  runSpecificTest(args[0]);
} 