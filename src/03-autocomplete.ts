
function autocomplete(
  search: string,
  items: string[],
  maxResult: number
): string[] {
  // 1. ถ้าไม่มีคำค้นหา หรือจำนวนผลลัพธ์ที่ต้องการ <= 0 ให้คืน Array ว่าง
  if (!search || maxResult <= 0) {
    return [];
  }

  // 2. แปลงคำค้นหาเป็นตัวพิมพ์เล็ก เพื่อค้นหาแบบ Ignore Case
  const query = search.toLowerCase();

  return items
    // 3. วนแต่ละคำ และหาตำแหน่งที่พบคำค้นหา
    // index ใช้เก็บลำดับเดิมของคำ
    // position = -1 หมายถึงไม่พบคำค้นหา
    .map((item, index) => ({
      item,
      index,
      position: item.toLowerCase().indexOf(query),
    }))

    // 4. กรองเฉพาะคำที่มีคำค้นหาอยู่ภายใน
    .filter(({ position }) => position >= 0)

    // 5. เรียงลำดับตามตำแหน่งของคำค้นหา
    .sort((a, b) => {
      const rank = (entry: {
        item: string;
        position: number;
      }): number => {
        // คำค้นหาอยู่ต้นคำ ให้ลำดับ 0
        if (entry.position === 0) {
          return 0;
        }

        // คำค้นหาอยู่ท้ายคำ ให้ลำดับ 2
        if (entry.position + query.length === entry.item.length) {
          return 2;
        }

        // คำค้นหาอยู่กลางคำ ให้ลำดับ 1
        return 1;
      };

      // เรียงจาก Rank น้อยไปมาก
      // ถ้า Rank เท่ากัน ให้เรียงตามลำดับเดิมใน items
      return rank(a) - rank(b) || a.index - b.index;
    })

    // 6. จำกัดจำนวนผลลัพธ์ตาม maxResult
    .slice(0, maxResult)

    // 7. ดึงเฉพาะข้อความออกมาเป็น Array ของ String
    .map(({ item }) => item);
}

// Test Cases
const testCases = [
  {
    search: "th",
    items: ["Mother", "Think", "Worthy", "Apple", "Android"],
    maxResult: 2,
    expected: ["Think", "Mother"],
  },
  {
    search: "TH",
    items: ["Mother", "Think", "Worthy"],
    maxResult: 3,
    expected: ["Think", "Mother", "Worthy"],
  },
  {
    search: "app",
    items: ["Pineapple", "Application", "Happy", "Apple"],
    maxResult: 4,
    expected: ["Application", "Apple", "Pineapple", "Happy"],
  },
  {
    search: "cat",
    items: ["Cat", "Educate", "Copycat", "Category"],
    maxResult: 4,
    expected: ["Cat", "Category", "Educate", "Copycat"],
  },
  {
    search: "xyz",
    items: ["Apple", "Banana", "Orange"],
    maxResult: 3,
    expected: [],
  },
  {
    search: "",
    items: ["Apple", "Banana"],
    maxResult: 3,
    expected: [],
  },
  {
    search: "a",
    items: ["Apple", "Banana"],
    maxResult: 0,
    expected: [],
  },
  {
    search: "a",
    items: ["Apple", "Apricot", "Avocado"],
    maxResult: 2,
    expected: ["Apple", "Apricot"],
  },
];

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  03 / AUTOCOMPLETE");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let passed = 0;

for (const test of testCases) {
  const actual = autocomplete(
    test.search,
    test.items,
    test.maxResult
  );

  // เปรียบเทียบ Array ทั้งค่าและลำดับของสมาชิก
  const isPassed =
    JSON.stringify(actual) === JSON.stringify(test.expected);

  if (isPassed) passed++;

  const status = isPassed ? "✓ PASS" : "✗ FAIL";
  const label = test.search || "(empty)";

  console.log(
    `  ${status}   ${label.padEnd(10)} Expected: ${JSON.stringify(test.expected)}`
  );

  if (!isPassed) {
    console.log(`           Actual:   ${JSON.stringify(actual)}`);
  }
}

console.log(
  `\n  Result: ${passed}/${testCases.length} tests passed`
);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
