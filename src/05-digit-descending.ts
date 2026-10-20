
function digitDescending(num: number): number {
  // 1. ตรวจสอบว่าข้อมูลเป็นจำนวนเต็มบวก
  if (!Number.isSafeInteger(num) || num <= 0) {
    throw new Error("Input must be a positive safe integer");
  }

  // 2. แปลงตัวเลขเป็น String แล้วแยกแต่ละหลักเป็น Array
  // เช่น 3008 => ["3", "0", "0", "8"]
  const digits = String(num).split("");

  // 3. เรียงตัวเลขจากมากไปน้อย
  // เช่น ["3", "0", "0", "8"] => ["8", "3", "0", "0"]
  digits.sort((a, b) => Number(b) - Number(a));

  // 4. รวม Array กลับเป็น String
  // เช่น ["8", "3", "0", "0"] => "8300"
  const result = digits.join("");

  // 5. แปลง String กลับเป็น Integer
  return Number(result);
}

// Test Cases
const testCases = [
  { input: 3008, expected: 8300 },
  { input: 1989, expected: 9981 },
  { input: 2679, expected: 9762 },
  { input: 9163, expected: 9631 },
  { input: 12345, expected: 54321 },
  { input: 98765, expected: 98765 },
  { input: 1111, expected: 1111 },
  { input: 1000, expected: 1000 },
  { input: 102030, expected: 321000 },
  { input: 5, expected: 5 },
];

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  05 / DIGIT DESCENDING");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let passed = 0;

for (const test of testCases) {
  const actual = digitDescending(test.input);
  const isPassed = actual === test.expected;

  if (isPassed) passed++;

  const status = isPassed ? "✓ PASS" : "✗ FAIL";

  console.log(
    `  ${status}   ${String(test.input).padEnd(10)} ` +
    `Expected: ${test.expected}`
  );

  if (!isPassed) {
    console.log(`           Actual: ${actual}`);
  }
}

console.log(
  `\n  Result: ${passed}/${testCases.length} tests passed`
);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
