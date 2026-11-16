export type SkillGroup = {
  id: string;
  title: string;
  command: string;
  skills: string[];
};

/**
 * Technology groups. No proficiency percentages: evidence comes from the
 * projects that use each tool (see `skillEvidence` in lib/projects.ts).
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming & Development",
    command: "lang --list",
    skills: ["Python", "SQL", "Bash", "Git", "GitHub"],
  },
  {
    id: "databases",
    title: "Databases & Warehousing",
    command: "db --engines",
    skills: ["PostgreSQL", "MySQL", "BigQuery", "Snowflake"],
  },
  {
    id: "pipelines",
    title: "ETL, ELT & Orchestration",
    command: "pipeline --tools",
    skills: ["Apache Airflow", "dbt", "Python data pipelines", "pandas"],
  },
  {
    id: "streaming",
    title: "Big Data & Streaming",
    command: "stream --engines",
    skills: ["Apache Kafka", "Apache Spark", "PySpark"],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    command: "infra --providers",
    skills: ["AWS", "Google Cloud Platform", "Docker"],
  },
  {
    id: "analytics",
    title: "Analytics & Visualization",
    command: "bi --tools",
    skills: ["Power BI", "Excel", "Looker", "Grafana"],
  },
  {
    id: "practices",
    title: "Engineering Practices",
    command: "practices --show",
    skills: [
      "Data Modeling",
      "Data Quality",
      "Testing",
      "CI/CD",
      "Pipeline Monitoring",
      "Data Governance",
    ],
  },
];
