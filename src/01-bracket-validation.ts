
function isValidBrackets(input: string): boolean {
  const stack: string[] = [];
  const openstack = ["(", "[", "{"];

  for (let i = 0; i < input.length; i++) {
    const current= input.charAt(i);;

    // 1. ถ้าเป็นวงเล็บเปิด ให้เก็บเข้า Stack
    if (openstack.includes(current)) {
      stack.push(current);
    } else {
      // 2. ถ้าเป็นวงเล็บปิด แต่ Stack ว่าง = ผิด
      if (stack.length === 0) {
        return false;
      }

      // 3. ดึงวงเล็บเปิดล่าสุดมาตรวจสอบ
      const last = stack.pop();

      const isSquare = last === "[" && current === "]";
      const isRound = last === "(" && current === ")";
      const isBraces = last === "{" && current === "}";

      // 4. ถ้าวงเล็บไม่ตรงคู่ = ผิด
      if (!(isSquare || isRound || isBraces)) {
        return false;
      }
    }
  }

  // 5. ถ้า Stack ว่าง แสดงว่าจับคู่ครบ
  return stack.length === 0;
}

// Test
// console.log(isValidBrackets("()"));      // true
// console.log(isValidBrackets("([])"));    // true
// console.log(isValidBrackets("({[]})"));  // true
// console.log(isValidBrackets("([)]"));    // false
// console.log(isValidBrackets("((("));     // false
// console.log(isValidBrackets(")"));       // false
// console.log(isValidBrackets(""));        // true

const testCases = [
  { input: "()", expected: true },
  { input: "([])", expected: true },
  { input: "({[]})", expected: true },
  { input: "([)]", expected: false },
  { input: "(((", expected: false },
  { input: ")", expected: false },
  { input: "", expected: true },
];

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  01 / BRACKET VALIDATION");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let passed = 0;

for (const test of testCases) {
  const actual = isValidBrackets(test.input);
  const isPassed = actual === test.expected;

  if (isPassed) passed++;

  const status = isPassed ? "✓ PASS" : "✗ FAIL";
  const label = test.input || "(empty)";

  console.log(
    `  ${status}   ${label.padEnd(10)} Expected: ${test.expected}`
  );
}

console.log(
  `\n  Result: ${passed}/${testCases.length} tests passed`
);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");