
const romanValues = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

// Function 1: แปลงตัวเลขเป็น Roman Numerals
function intToRoman(num: number): string {
  // 1. ตรวจสอบว่าเป็นจำนวนเต็มบวกในช่วงที่รองรับ
  if (!Number.isInteger(num) || num < 1 || num > 3999) {
    throw new Error("Number must be between 1 and 3999");
  }

  let result = "";

  // 2. วนค่าจากมากไปน้อย
  for (const { value, symbol } of romanValues) {
    // 3. ถ้าตัวเลขยังมากกว่าหรือเท่ากับค่า Roman
    // ให้เพิ่มสัญลักษณ์ แล้วลบค่าออก
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  // 4. คืนค่า Roman Numerals
  return result;
}

// Function 2: แปลง Roman Numerals เป็นตัวเลข
function romanToInt(roman: string): number {
  const values: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // 1. ตรวจสอบว่ามีข้อมูลและเป็นตัวอักษร Roman เท่านั้น
  if (!roman || !/^[IVXLCDM]+$/.test(roman)) {
    throw new Error("Invalid Roman numeral");
  }

  let result = 0;

  // 2. วนอ่านสัญลักษณ์จากซ้ายไปขวา
  for (let i = 0; i < roman.length; i++) {
    const current = values[roman[i]!]!;
    const next = values[roman[i + 1]!] ?? 0;

    // 3. ถ้าค่าปัจจุบันน้อยกว่าค่าถัดไป ให้ลบ
    // เช่น IV = -1 + 5 = 4
    if (current < next) {
      result -= current;
    } else {
      // 4. ถ้าไม่ใช่ ให้บวกค่าตามปกติ
      result += current;
    }
  }

  // 5. ตรวจสอบว่าเป็นรูปแบบ Roman ที่ถูกต้อง
  // เช่น IIII หรือ IC ไม่ใช่รูปแบบมาตรฐาน
  if (result < 1 || result > 3999 || intToRoman(result) !== roman) {
    throw new Error("Invalid Roman numeral");
  }

  // 6. คืนค่าตัวเลข
  return result;
}

// Test Cases
const testCases = [
  { input: 1989, expected: "MCMLXXXIX" },
  { input: 2000, expected: "MM" },
  { input: 68, expected: "LXVIII" },
  { input: 109, expected: "CIX" },
  { input: 1, expected: "I" },
  { input: 4, expected: "IV" },
  { input: 9, expected: "IX" },
  { input: 40, expected: "XL" },
  { input: 90, expected: "XC" },
  { input: 400, expected: "CD" },
  { input: 900, expected: "CM" },
  { input: 3999, expected: "MMMCMXCIX" },
];

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  04 / ROMAN NUMERALS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let passed = 0;

for (const test of testCases) {
  // ทดสอบทั้งแปลงเลขเป็น Roman และแปลงกลับเป็นเลข
  const roman = intToRoman(test.input);
  const number = romanToInt(test.expected);

  const isPassed =
    roman === test.expected &&
    number === test.input;

  if (isPassed) passed++;

  const status = isPassed ? "✓ PASS" : "✗ FAIL";

  console.log(
    `  ${status}   ${String(test.input).padEnd(5)} ` +
    `=> ${test.expected.padEnd(12)} ` +
    `=> ${number}`
  );

  if (!isPassed) {
    console.log(`           Actual Roman: ${roman}`);
  }
}

console.log(
  `\n  Result: ${passed}/${testCases.length} tests passed`
);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
