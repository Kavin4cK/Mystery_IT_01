// Comprehensive Testing Suite for Mystery.exe
// Run with: npx tsx tests/comprehensive.test.ts

import {
  ALL_ROOMS,
  ROOM_MAPPINGS,
  VALID_ROOM_CODES,
  getRoomByCode,
  getNextRoom,
  getRoomMapping,
  isValidRoomCode,
  isFinalRoom
} from '../src/constants/roomConfig'

// Test Results
interface TestResult {
  name: string
  passed: boolean
  message: string
  details?: any
}

const results: TestResult[] = []

// Helper function to add test result
function addTest(name: string, passed: boolean, message: string, details?: any) {
  results.push({ name, passed, message, details })
  console.log(`${passed ? '✅' : '❌'} ${name}: ${message}`)
}

// Test 1: Verify all 8 standard rooms exist
function testRoomCount() {
  const standardRooms = ALL_ROOMS.filter(room => !room.isFinal)
  const expectedCount = 8

  addTest(
    'Room Count Check',
    standardRooms.length === expectedCount,
    `Found ${standardRooms.length} standard rooms, expected ${expectedCount}`,
    { standardRooms: standardRooms.length, expected: expectedCount }
  )
}

// Test 2: Verify all Level 1 rooms
function testLevel1Rooms() {
  const level1Rooms = ALL_ROOMS.filter(room => room.level === 1)
  const expectedCodes = ['1EC210', '1EC211', '1EC205', '1EC204']
  const actualCodes = level1Rooms.map(room => room.code)

  const passed = expectedCodes.every(code => actualCodes.includes(code)) &&
                 actualCodes.every(code => expectedCodes.includes(code))

  addTest(
    'Level 1 Rooms',
    passed,
    passed ? 'All Level 1 rooms configured correctly' : 'Level 1 room mismatch',
    { expected: expectedCodes, actual: actualCodes }
  )
}

// Test 3: Verify all Level 2 rooms
function testLevel2Rooms() {
  const level2Rooms = ALL_ROOMS.filter(room => room.level === 2)
  const expectedCodes = ['2EC212', '2EC213', '2EC203', '2EC202']
  const actualCodes = level2Rooms.map(room => room.code)

  const passed = expectedCodes.every(code => actualCodes.includes(code)) &&
                 actualCodes.every(code => expectedCodes.includes(code))

  addTest(
    'Level 2 Rooms',
    passed,
    passed ? 'All Level 2 rooms configured correctly' : 'Level 2 room mismatch',
    { expected: expectedCodes, actual: actualCodes }
  )
}

// Test 4: Verify Level 3 Final rooms
function testLevel3Rooms() {
  const level3Rooms = ALL_ROOMS.filter(room => room.level === 3)
  const expectedCodes = ['3FINAL01', '3FINAL02', '3FINAL03', '3FINAL04']
  const actualCodes = level3Rooms.map(room => room.code)

  const passed = expectedCodes.every(code => actualCodes.includes(code)) &&
                 actualCodes.every(code => expectedCodes.includes(code)) &&
                 level3Rooms.every(room => room.isFinal === true)

  addTest(
    'Level 3 Final Rooms',
    passed,
    passed ? 'All Level 3 final rooms configured correctly' : 'Level 3 room mismatch',
    { expected: expectedCodes, actual: actualCodes }
  )
}

// Test 5: Verify room mappings (Level 1 → Level 2)
function testLevel1ToLevel2Mappings() {
  const expectedMappings = {
    '1EC210': '2EC212',
    '1EC211': '2EC213',
    '1EC205': '2EC203',
    '1EC204': '2EC202'
  }

  let passed = true
  const issues: string[] = []

  for (const [from, expectedTo] of Object.entries(expectedMappings)) {
    const actualTo = getNextRoom(from)
    if (actualTo !== expectedTo) {
      passed = false
      issues.push(`${from} → ${actualTo} (expected ${expectedTo})`)
    }
  }

  addTest(
    'Level 1 → Level 2 Mappings',
    passed,
    passed ? 'All Level 1→2 mappings correct' : 'Mapping issues found',
    { issues }
  )
}

// Test 6: Verify room mappings (Level 2 → Level 3)
function testLevel2ToLevel3Mappings() {
  const expectedMappings = {
    '2EC212': '3FINAL01',
    '2EC213': '3FINAL02',
    '2EC203': '3FINAL03',
    '2EC202': '3FINAL04'
  }

  let passed = true
  const issues: string[] = []

  for (const [from, expectedTo] of Object.entries(expectedMappings)) {
    const actualTo = getNextRoom(from)
    if (actualTo !== expectedTo) {
      passed = false
      issues.push(`${from} → ${actualTo} (expected ${expectedTo})`)
    }
  }

  addTest(
    'Level 2 → Level 3 Mappings',
    passed,
    passed ? 'All Level 2→3 mappings correct' : 'Mapping issues found',
    { issues }
  )
}

// Test 7: Verify room data integrity
function testRoomDataIntegrity() {
  let passed = true
  const issues: string[] = []

  ALL_ROOMS.forEach(room => {
    // Check required fields
    const requiredFields = ['code', 'level', 'department', 'roomNumber', 'name', 'description', 'clearance', 'clueImage', 'status']
    requiredFields.forEach(field => {
      if (!room[field as keyof typeof room]) {
        passed = false
        issues.push(`${room.code}: Missing required field '${field}'`)
      }
    })

    // Check code format
    const codeRegex = /^[123][A-Z]{2,5}\d{2,3}$/
    if (!codeRegex.test(room.code)) {
      passed = false
      issues.push(`${room.code}: Invalid code format`)
    }

    // Check image path format
    if (!room.clueImage.startsWith('/clues/') || !room.clueImage.endsWith('.jpg')) {
      passed = false
      issues.push(`${room.code}: Invalid image path: ${room.clueImage}`)
    }

    // Check level validity
    if (room.level < 1 || room.level > 3) {
      passed = false
      issues.push(`${room.code}: Invalid level: ${room.level}`)
    }
  })

  addTest(
    'Room Data Integrity',
    passed,
    passed ? 'All room data is valid' : 'Data integrity issues found',
    { issueCount: issues.length, issues: issues.slice(0, 5) } // Show first 5 issues
  )
}

// Test 8: Verify passcode validation
function testPasscodeValidation() {
  const validPasscodes = [
    '1EC210', '1EC211', '1EC205', '1EC204',
    '2EC212', '2EC213', '2EC203', '2EC202',
    '3FINAL01', '3FINAL02', '3FINAL03', '3FINAL04'
  ]

  const invalidPasscodes = [
    '', // Empty
    '123', // Too short
    'INVALID', // Wrong format
    '9INVALID', // Invalid level
    '1XX9999', // Too long
    '1ec210', // Lowercase
    '1EC2100' // Too many digits
  ]

  let passed = true
  const issues: string[] = []

  // Test valid passcodes
  validPasscodes.forEach(code => {
    if (!isValidRoomCode(code)) {
      passed = false
      issues.push(`Valid code rejected: ${code}`)
    }
  })

  // Test invalid passcodes
  invalidPasscodes.forEach(code => {
    if (isValidRoomCode(code)) {
      passed = false
      issues.push(`Invalid code accepted: ${code}`)
    }
  })

  addTest(
    'Passcode Validation',
    passed,
    passed ? 'Passcode validation working correctly' : 'Validation issues found',
    { issues }
  )
}

// Test 9: Verify final room detection
function testFinalRoomDetection() {
  const finalRoomCodes = ['3FINAL01', '3FINAL02', '3FINAL03', '3FINAL04']
  const nonFinalRoomCodes = ['1EC210', '1EC211', '2EC212', '2EC213']

  let passed = true
  const issues: string[] = []

  finalRoomCodes.forEach(code => {
    if (!isFinalRoom(code)) {
      passed = false
      issues.push(`Final room not detected: ${code}`)
    }
  })

  nonFinalRoomCodes.forEach(code => {
    if (isFinalRoom(code)) {
      passed = false
      issues.push(`Non-final room incorrectly detected as final: ${code}`)
    }
  })

  addTest(
    'Final Room Detection',
    passed,
    passed ? 'Final room detection working correctly' : 'Detection issues found',
    { issues }
  )
}

// Test 10: Verify room retrieval functions
function testRoomRetrieval() {
  let passed = true
  const issues: string[] = []

  ALL_ROOMS.forEach(room => {
    const retrieved = getRoomByCode(room.code)
    if (!retrieved) {
      passed = false
      issues.push(`Room not found: ${room.code}`)
    } else if (retrieved.code !== room.code) {
      passed = false
      issues.push(`Wrong room returned for ${room.code}: got ${retrieved.code}`)
    }
  })

  addTest(
    'Room Retrieval Functions',
    passed,
    passed ? 'Room retrieval working correctly' : 'Retrieval issues found',
    { issues }
  )
}

// Test 11: Verify VALID_ROOM_CODES matches actual rooms
function testValidRoomCodes() {
  const level1Actual = ALL_ROOMS.filter(r => r.level === 1).map(r => `${r.department}${r.roomNumber}`)
  const level2Actual = ALL_ROOMS.filter(r => r.level === 2).map(r => `${r.department}${r.roomNumber}`)
  const level3Actual = ALL_ROOMS.filter(r => r.level === 3).map(r => `${r.department}${r.roomNumber}`.replace('FINAL', ''))

  const passed = (
    JSON.stringify(level1Actual.sort()) === JSON.stringify(VALID_ROOM_CODES.level1.sort()) &&
    JSON.stringify(level2Actual.sort()) === JSON.stringify(VALID_ROOM_CODES.level2.sort()) &&
    JSON.stringify(level3Actual.sort()) === JSON.stringify(VALID_ROOM_CODES.level3.sort())
  )

  addTest(
    'VALID_ROOM_CODES Consistency',
    passed,
    passed ? 'VALID_ROOM_CODES matches actual room data' : 'VALID_ROOM_CODES mismatch',
    {
      level1: { expected: VALID_ROOM_CODES.level1, actual: level1Actual },
      level2: { expected: VALID_ROOM_CODES.level2, actual: level2Actual },
      level3: { expected: VALID_ROOM_CODES.level3, actual: level3Actual }
    }
  )
}

// Run all tests
function runTests() {
  console.log('🧪 Running Comprehensive Mystery.exe Tests...\n')

  testRoomCount()
  testLevel1Rooms()
  testLevel2Rooms()
  testLevel3Rooms()
  testLevel1ToLevel2Mappings()
  testLevel2ToLevel3Mappings()
  testRoomDataIntegrity()
  testPasscodeValidation()
  testFinalRoomDetection()
  testRoomRetrieval()
  testValidRoomCodes()

  // Summary
  const passed = results.filter(r => r.passed).length
  const total = results.length

  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`)

  if (passed === total) {
    console.log('🎉 All tests passed! Mystery.exe is ready for deployment.')
  } else {
    console.log('⚠️  Some tests failed. Please review and fix issues before deployment.')
    console.log('\nFailed Tests:')
    results.filter(r => !r.passed).forEach(result => {
      console.log(`❌ ${result.name}: ${result.message}`)
      if (result.details) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`)
      }
    })
  }

  return { passed, total }
}

// Export for use in other files
export { runTests }

// Run tests if this file is executed directly
if (require.main === module) {
  runTests()
}
