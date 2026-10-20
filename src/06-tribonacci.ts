
function tribonacci(signature: number[], n: number): number[] {
  // 1. ตรวจสอบจำนวนผลลัพธ์ว่าต้องเป็นจำนวนเต็มที่ไม่ติดลบ
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }

  // 2. ตรวจสอบว่าค่าเริ่มต้นมีจำนวนไม่เกิน 3 ตัว
  if (signature.length > 3) {
    throw new Error("Signature must contain 0 to 3 numbers");
  }

  // 3. ถ้า n = 0 ให้คืน Array ว่าง
  if (n === 0) {
    return [];
  }

  // 4. คัดลอกค่าเริ่มต้น เพื่อไม่แก้ไข Array ต้นฉบับ
  // ถ้ามีค่าไม่ครบ 3 ตัว จะเติม 0 ให้ครบ
  // เช่น [1] => [1, 0, 0]
  const result = [...signature];

  while (result.length < 3) {
    result.push(0);
  }

  // 5. ถ้า n น้อยกว่าหรือเท่ากับ 3
  // ให้คืนค่าตามจำนวนที่ต้องการ
  if (n <= 3) {
    return result.slice(0, n);
  }

  // 6. เริ่มคำนวณตั้งแต่ตำแหน่งที่ 4 เป็นต้นไป
  while (result.length < n) {
    const length = result.length;

    // 7. นำตัวเลข 3 ตัวล่าสุดมาบวกกัน
    const next =
      result[length - 1]! +
      result[length - 2]! +
      result[length - 3]!;

    // 8. เพิ่มผลรวมเข้าไปใน Array
    result.push(next);
  }

  // 9. คืนค่า Array ที่มีจำนวนสมาชิกเท่ากับ n
  return result;
}

// Test Cases
const testCases = [
  {
    signature: [1, 3, 5],
    n: 5,
    expected: [1, 3, 5, 9, 17],
  },
  {
    signature: [2, 2, 2],
    n: 3,
    expected: [2, 2, 2],
  },
  {
    signature: [10, 10, 10],
    n: 4,
    expected: [10, 10, 10, 30],
  },
  {
    signature: [1, 1, 1],
    n: 6,
    expected: [1, 1, 1, 3, 5, 9],
  },
  {
    signature: [2, 3, 1],
    n: 6,
    expected: [2, 3, 1, 6, 10, 17],
  },
  {
    signature: [5, 2, 0],
    n: 6,
    expected: [5, 2, 0, 7, 9, 16],
  },
  {
    signature: [1],
    n: 5,
    expected: [1, 0, 0, 1, 1],
  },
  {
    signature: [],
    n: 5,
    expected: [0, 0, 0, 0, 0],
  },
  {
    signature: [3, 4, 1],
    n: 2,
    expected: [3, 4],
  },
  {
    signature: [1, 2, 3],
    n: 0,
    expected: [],
  },
];

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  06 / TRIBONACCI");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let passed = 0;

for (const test of testCases) {
  const actual = tribonacci(test.signature, test.n);

  // เปรียบเทียบ Array ทั้งค่าและลำดับสมาชิก
  const isPassed =
    JSON.stringify(actual) === JSON.stringify(test.expected);

  if (isPassed) passed++;

  const status = isPassed ? "✓ PASS" : "✗ FAIL";

  console.log(
    `  ${status}   ${JSON.stringify(test.signature).padEnd(12)} ` +
    `n=${test.n}  Expected: ${JSON.stringify(test.expected)}`
  );

  if (!isPassed) {
    console.log(`           Actual: ${JSON.stringify(actual)}`);
  }
}

console.log(
  `\n  Result: ${passed}/${testCases.length} tests passed`
);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
