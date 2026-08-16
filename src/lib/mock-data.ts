export interface Repository {
  id: string;
  name: string;
  owner: string;
  branch: string;
  issuesCount: number;
  status: "connected" | "syncing" | "disconnected";
  stars: number;
  lastActivity: string;
  description: string;
  language: string;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  repository: string;
  label: "bug" | "feature" | "chore" | "enhancement";
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "completed" | "failed";
  runId?: string;
  createdAt: string;
  author: string;
  description: string;
}

export interface TimelineStep {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  timestamp?: string;
  description: string;
}

export interface FileChange {
  path: string;
  status: "M" | "A" | "D";
  additions: number;
  deletions: number;
  diff?: string;
}

export interface TerminalLog {
  id: string;
  type: "command" | "info" | "success" | "error" | "output";
  text: string;
}

export interface AgentRun {
  id: string;
  issueId: string;
  issueNumber: number;
  issueTitle: string;
  repository: string;
  branch: string;
  status: "pending" | "running" | "completed" | "failed";
  duration: string;
  createdAt: string;
  prUrl?: string;
  prNumber?: number;
  steps: TimelineStep[];
  logs: TerminalLog[];
  changedFiles: FileChange[];
}

export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: "repo_001",
    name: "ecommerce-api",
    owner: "abhishek",
    branch: "main",
    issuesCount: 8,
    status: "connected",
    stars: 124,
    lastActivity: "2 hours ago",
    description: "Core REST API microservices for e-commerce backend processing",
    language: "TypeScript",
  },
  {
    id: "repo_002",
    name: "devflow",
    owner: "abhishek",
    branch: "main",
    issuesCount: 4,
    status: "connected",
    stars: 412,
    lastActivity: "10 mins ago",
    description: "Autonomous AI Software Engineer web application & orchestration",
    language: "TypeScript",
  },
  {
    id: "repo_003",
    name: "auth-service",
    owner: "abhishek",
    branch: "main",
    issuesCount: 2,
    status: "connected",
    stars: 89,
    lastActivity: "1 day ago",
    description: "OAuth2 and JWT authentication identity management service",
    language: "Go",
  },
  {
    id: "repo_004",
    name: "payment-gateway",
    owner: "abhishek",
    branch: "main",
    issuesCount: 5,
    status: "connected",
    stars: 230,
    lastActivity: "3 days ago",
    description: "Stripe and PayPal multi-tenant payment abstraction worker",
    language: "TypeScript",
  },
];

export const MOCK_ISSUES: Issue[] = [
  {
    id: "issue_42",
    number: 42,
    title: "Fix login API returning 500 error when user email has trailing space",
    repository: "ecommerce-api",
    label: "bug",
    priority: "high",
    status: "in_progress",
    runId: "run_001",
    createdAt: "1 hour ago",
    author: "sarah_dev",
    description: "When submitting authentication POST /api/auth/login with trailing whitespace in email input, controller throws uncaught TypeError inside bcrypt hash comparison resulting in HTTP 500.",
  },
  {
    id: "issue_18",
    number: 18,
    title: "Add pagination support to GET /products endpoint",
    repository: "ecommerce-api",
    label: "feature",
    priority: "medium",
    status: "open",
    runId: "run_002",
    createdAt: "3 hours ago",
    author: "alex_m",
    description: "Implement limit/offset pagination and total count metadata for product query response payload.",
  },
  {
    id: "issue_8",
    number: 8,
    title: "Fix JWT token expiration handling in auth middleware",
    repository: "auth-service",
    label: "bug",
    priority: "critical",
    status: "failed",
    runId: "run_003",
    createdAt: "5 hours ago",
    author: "abhishek",
    description: "Expired JWT tokens return 500 Internal Server Error instead of structured 401 TokenExpired response payload.",
  },
  {
    id: "issue_105",
    number: 105,
    title: "Implement exponential backoff retry logic for payment webhooks",
    repository: "payment-gateway",
    label: "feature",
    priority: "high",
    status: "completed",
    runId: "run_004",
    createdAt: "1 day ago",
    author: "emily_k",
    description: "Failed Stripe webhook payloads should be retried using BullMQ queue with custom 3-step exponential backoff.",
  },
  {
    id: "issue_12",
    number: 12,
    title: "Update rate limiter configuration for public API endpoints",
    repository: "devflow",
    label: "chore",
    priority: "low",
    status: "open",
    runId: "run_005",
    createdAt: "2 days ago",
    author: "abhishek",
    description: "Adjust redis token-bucket rate limiter thresholds from 60 req/min to 120 req/min for authenticated developer tokens.",
  },
];

export const MOCK_AGENT_RUNS: Record<string, AgentRun> = {
  run_001: {
    id: "run_001",
    issueId: "issue_42",
    issueNumber: 42,
    issueTitle: "Fix login API returning 500 error when user email has trailing space",
    repository: "ecommerce-api",
    branch: "devflow/fix-login-500",
    status: "running",
    duration: "3m 42s",
    createdAt: "12 minutes ago",
    steps: [
      {
        id: "step_1",
        name: "Understanding issue",
        status: "completed",
        timestamp: "14:02:10",
        description: "Parsed issue title, user stack trace, and identified root cause in email input handling.",
      },
      {
        id: "step_2",
        name: "Analyzing repository",
        status: "completed",
        timestamp: "14:02:25",
        description: "Mapped AST symbols for src/controllers/auth.ts and locate validateEmail helper functions.",
      },
      {
        id: "step_3",
        name: "Creating implementation plan",
        status: "completed",
        timestamp: "14:02:40",
        description: "Generated fix strategy: trim email string in auth controller prior to DB query and add unit test case.",
      },
      {
        id: "step_4",
        name: "Writing code modifications",
        status: "completed",
        timestamp: "14:03:05",
        description: "Applied patch to src/controllers/auth.ts and added new test assertion in tests/auth.test.ts.",
      },
      {
        id: "step_5",
        name: "Running test suite",
        status: "running",
        timestamp: "14:03:30",
        description: "Executing npm test to verify fix against existing regression suite and new test case.",
      },
      {
        id: "step_6",
        name: "Code review & linting",
        status: "pending",
        description: "Automated static analysis, formatting checks, and security scan.",
      },
      {
        id: "step_7",
        name: "Creating Pull Request",
        status: "pending",
        description: "Push branch to remote origin and open GitHub Pull Request with detailed description.",
      },
    ],
    logs: [
      { id: "l1", type: "command", text: "$ devflow checkout -b devflow/fix-login-500" },
      { id: "l2", type: "info", text: "Switched to a new branch 'devflow/fix-login-500'" },
      { id: "l3", type: "command", text: "$ devflow analyze --issue #42" },
      { id: "l4", type: "info", text: "Found target file: src/controllers/auth.ts (line 45)" },
      { id: "l5", type: "info", text: "Found test file: tests/auth.test.ts" },
      { id: "l6", type: "info", text: "Modifying src/controllers/auth.ts to sanitize user email input..." },
      { id: "l7", type: "success", text: "✓ Successfully updated src/controllers/auth.ts (+8 lines, -3 lines)" },
      { id: "l8", type: "success", text: "✓ Successfully added test case in tests/auth.test.ts" },
      { id: "l9", type: "command", text: "$ npm test tests/auth.test.ts" },
      { id: "l10", type: "output", text: "PASS src/controllers/auth.ts (1.12s)" },
      { id: "l11", type: "output", text: "PASS tests/auth.test.ts (2.84s)" },
      { id: "l12", type: "output", text: "  Auth API Controller" },
      { id: "l13", type: "output", text: "    ✓ should trim trailing whitespace from email during login (14ms)" },
      { id: "l14", type: "output", text: "    ✓ should return 401 status for invalid credentials (8ms)" },
      { id: "l15", type: "output", text: "    ✓ should return JWT bearer token for valid authentication (22ms)" },
      { id: "l16", type: "info", text: "Test Suites: 1 passed, 1 total" },
      { id: "l17", type: "info", text: "Tests:       12 passed, 12 total" },
      { id: "l18", type: "info", text: "Time:        3.42s" },
      { id: "l19", type: "info", text: "Ran all test suites matching /tests\\/auth.test.ts/i." },
    ],
    changedFiles: [
      {
        path: "src/controllers/auth.ts",
        status: "M",
        additions: 8,
        deletions: 3,
        diff: `@@ -42,9 +42,14 @@ export async function loginUser(req: Request, res: Response) {
   try {
-    const { email, password } = req.body;
-    const user = await prisma.user.findUnique({ where: { email } });
+    const rawEmail = req.body.email || '';
+    const email = rawEmail.trim().toLowerCase();
+    const password = req.body.password;
+    
+    if (!email) {
+      return res.status(400).json({ error: 'Email address is required' });
+    }
+    const user = await prisma.user.findUnique({ where: { email } });`,
      },
      {
        path: "tests/auth.test.ts",
        status: "A",
        additions: 24,
        deletions: 0,
        diff: `@@ -0,0 +1,24 @@
+import request from 'supertest';
+import app from '../src/app';
+
+describe('POST /api/auth/login', () => {
+  it('should trim trailing whitespace from email during login', async () => {
+    const response = await request(app)
+      .post('/api/auth/login')
+      .send({
+        email: 'user@example.com   ',
+        password: 'securepassword123'
+      });
+    
+    expect(response.status).toBe(200);
+    expect(response.body).toHaveProperty('token');
+  });
+});`,
      },
      {
        path: "src/utils/sanitize.ts",
        status: "M",
        additions: 5,
        deletions: 1,
        diff: `@@ -10,3 +10,7 @@ export function sanitizeInput(input: string): string {
-  return input.replace(/<[^>]*>?/gm, '');
+  if (typeof input !== 'string') return '';
+  return input.trim().replace(/<[^>]*>?/gm, '');
 }`,
      },
    ],
  },
  run_002: {
    id: "run_002",
    issueId: "issue_18",
    issueNumber: 18,
    issueTitle: "Add pagination support to GET /products endpoint",
    repository: "ecommerce-api",
    branch: "devflow/feature-pagination",
    status: "completed",
    duration: "5m 14s",
    createdAt: "3 hours ago",
    prUrl: "https://github.com/abhishek/ecommerce-api/pull/49",
    prNumber: 49,
    steps: [
      { id: "s1", name: "Understanding issue", status: "completed", timestamp: "11:15:00", description: "Analyzed pagination requirements." },
      { id: "s2", name: "Analyzing repository", status: "completed", timestamp: "11:15:20", description: "Found product controller & prisma schemas." },
      { id: "s3", name: "Creating implementation plan", status: "completed", timestamp: "11:15:45", description: "Planned pagination DTO and query params." },
      { id: "s4", name: "Writing code modifications", status: "completed", timestamp: "11:17:10", description: "Added page and limit parsing." },
      { id: "s5", name: "Running test suite", status: "completed", timestamp: "11:18:30", description: "All pagination unit & integration tests passed." },
      { id: "s6", name: "Code review & linting", status: "completed", timestamp: "11:19:10", description: "Passed lint & static checks." },
      { id: "s7", name: "Creating Pull Request", status: "completed", timestamp: "11:20:14", description: "PR #49 created successfully." },
    ],
    logs: [
      { id: "l1", type: "command", text: "$ npm test tests/products.test.ts" },
      { id: "l2", type: "output", text: "PASS tests/products.test.ts (3.10s)" },
      { id: "l3", type: "success", text: "✓ 14 tests passed" },
      { id: "l4", type: "info", text: "Created Pull Request #49 on github.com/abhishek/ecommerce-api" },
    ],
    changedFiles: [
      { path: "src/controllers/products.ts", status: "M", additions: 18, deletions: 4 },
      { path: "tests/products.test.ts", status: "M", additions: 32, deletions: 2 },
    ],
  },
  run_003: {
    id: "run_003",
    issueId: "issue_8",
    issueNumber: 8,
    issueTitle: "Fix JWT token expiration handling in auth middleware",
    repository: "auth-service",
    branch: "devflow/fix-jwt-expiration",
    status: "failed",
    duration: "2m 18s",
    createdAt: "5 hours ago",
    steps: [
      { id: "s1", name: "Understanding issue", status: "completed", timestamp: "09:40:00", description: "Identified unhandled TokenExpiredError." },
      { id: "s2", name: "Analyzing repository", status: "completed", timestamp: "09:40:20", description: "Found auth middleware." },
      { id: "s3", name: "Creating implementation plan", status: "completed", timestamp: "09:40:40", description: "Planned catch block handling." },
      { id: "s4", name: "Writing code modifications", status: "completed", timestamp: "09:41:10", description: "Updated jwt.verify catch block." },
      { id: "s5", name: "Running test suite", status: "failed", timestamp: "09:42:18", description: "3 integration tests failed due to mock Redis disconnection." },
      { id: "s6", name: "Code review & linting", status: "pending", description: "Pending test resolution." },
      { id: "s7", name: "Creating Pull Request", status: "pending", description: "Pending test resolution." },
    ],
    logs: [
      { id: "l1", type: "command", text: "$ go test ./..." },
      { id: "l2", type: "error", text: "FAIL: TestJWTExpirationHandler (redis connection refused)" },
      { id: "l3", type: "error", text: "Error: 3 test cases failed in auth_test.go" },
    ],
    changedFiles: [
      { path: "middleware/auth.go", status: "M", additions: 12, deletions: 8 },
    ],
  },
};
