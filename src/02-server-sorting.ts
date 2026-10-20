
type ServerInfo = {
  countryCode: string;
  serverNumber: number;
  serverName: string;
};

// แยกข้อมูล Server ออกเป็น 3 ส่วน
function parseServer(server: string): ServerInfo {
  let countryCode = "";
  let serverNumber = "";
  let serverName = "";

  // ใช้แยกว่ากำลังอ่านส่วนไหน
  let hasNumber = false;
  let hasSuffix = false;

  for (let i = 0; i < server.length; i++) {
    const current = server.charAt(i);
    const isDigit = current >= "0" && current <= "9";

    if (!hasNumber && !isDigit) {
      countryCode += current;
    } else if (!hasSuffix && isDigit) {
      serverNumber += current;
      hasNumber = true;
    } else {
      serverName += current;
      hasSuffix = true;
    }
  }

  return {
    countryCode,
    serverNumber: Number(serverNumber),
    serverName,
  };
}

// เรียงลำดับ Server
function sortServers(servers: string[]): string[] {
  return [...servers].sort((a, b) => {
    const serverA = parseServer(a);
    const serverB = parseServer(b);

    // 1. เรียง Country Code ก่อน
    const countryCompare = serverA.countryCode.localeCompare(
      serverB.countryCode
    );

    if (countryCompare !== 0) {
      return countryCompare;
    }

    // 2. เรียงหมายเลข Server จากน้อยไปมาก
    const numberCompare =
      serverA.serverNumber - serverB.serverNumber;

    if (numberCompare !== 0) {
      return numberCompare;
    }

    // 3. ถ้า Country และ Number เท่ากัน เรียงชื่อต่อท้าย
    return serverA.serverName.localeCompare(serverB.serverName);
  });
}

// ===============================
// TEST CASES
// ===============================

const testCases = [
  {
    input: ["TH19", "SG20", "TH2"],
    expected: ["SG20", "TH2", "TH19"],
  },
  {
    input: ["TH10", "TH3Netflix", "TH1", "TH7"],
    expected: ["TH1", "TH3Netflix", "TH7", "TH10"],
  },
  {
    input: ["TH3", "TH1", "TH2"],
    expected: ["TH1", "TH2", "TH3"],
  },
  {
    input: ["SG10", "TH2", "SG1", "TH1"],
    expected: ["SG1", "SG10", "TH1", "TH2"],
  },
  {
    input: ["TH3Netflix", "TH3Gaming", "TH3"],
    expected: ["TH3", "TH3Gaming", "TH3Netflix"],
  },
  {
    input: ["TH3Netflix2", "TH3Netflix1"],
    expected: ["TH3Netflix1", "TH3Netflix2"],
  },
  {
    input: [],
    expected: [],
  },
];

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  02 / SERVER NAME SORTING");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let passed = 0;

for (const test of testCases) {
  const actual = sortServers(test.input);
  const isPassed =
    JSON.stringify(actual) === JSON.stringify(test.expected);

  if (isPassed) passed++;

  console.log(
    `  ${isPassed ? "✓ PASS" : "✗ FAIL"}  ${JSON.stringify(test.input)}`
  );

  if (!isPassed) {
    console.log(`    Expected: ${JSON.stringify(test.expected)}`);
    console.log(`    Actual:   ${JSON.stringify(actual)}`);
  }
}

console.log(
  `\n  Result: ${passed}/${testCases.length} tests passed`
);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
