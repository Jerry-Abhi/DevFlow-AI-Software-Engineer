export type RunStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED";
export type StepStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

export interface RepositoryItem {
  id: string;
  githubId?: string;
  name: string;
  owner: string;
  branch: string;
  issuesCount?: number;
  status?: string;
  description?: string;
  stars?: number;
  lastActivity?: string;
  language?: string;
}

export interface IssueItem {
  id: string;
  githubId?: string;
  number: number;
  title: string;
  repository: string;
  repositoryId?: string;
  label?: string;
  priority?: string;
  status?: string;
  body?: string;
}

export interface RunStepItem {
  id: string;
  name: string;
  status: StepStatus;
  output?: string;
  createdAt?: string;
}

export interface RunFileItem {
  id: string;
  path: string;
  status: string;
  additions: number;
  deletions: number;
  diff?: string;
}

export interface AgentRunResponse {
  id: string;
  status: RunStatus;
  issueId?: string;
  issue?: {
    number: number;
    title: string;
    repository?: string;
  };
  steps?: RunStepItem[];
  files?: RunFileItem[];
  logs?: string[];
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
  prUrl?: string;
  prNumber?: number;
}
