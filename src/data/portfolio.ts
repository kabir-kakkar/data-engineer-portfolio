export const siteConfig = {
  name: "Kabir Kakkar",
  title: "Data Engineer",
  email: "kabir.kakkar.cmu@gmail.com",
  location: "United States",
  resumePath: "/Kabir_Kakkar_Resume_DataEngineer.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/kabir-kakkar/",
    github: "https://github.com/kabir-kakkar",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  availability: "Open to Data Engineer roles · Full-time · United States",
  credential:
    "🎓 Master’s in Information Systems Management · Carnegie Mellon University",
  headline: "Building reliable data systems at production scale",
  introduction:
    "I design batch and streaming pipelines across Kafka, Spark, Flink, and Airflow, and cloud data warehouses on Snowflake, Redshift, and BigQuery—processing hundreds of gigabytes to hundreds of millions of events daily with measurable gains in latency, quality, and reliability.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Hire Me" },
} as const;

export const hireModal = {
  title: "Hire Me",
  description:
    "Share a few details about the role and I will follow up over email.",
  fields: {
    name: "Name",
    company: "Company",
    email: "Email",
    message: "Message",
  },
  namePlaceholder: "[Name]",
  companyPlaceholder: "[Company]",
  defaultMessage:
    "Hi Kabir,\n\nMy name is [Name]. I came across your portfolio and wanted to reach out about a job opportunity at [Company]. We'd love to discuss how your experience with streaming pipelines and cloud data warehouses could be a fit.\n\nLooking forward to connecting.",
  sendLabel: "Send",
  cancelLabel: "Cancel",
} as const;

export const about = {
  paragraphs: [
    "I specialize in production-scale ETL/ELT and streaming architectures—moving messy, high-volume data into reliable, queryable systems that analytics and product teams can trust.",
    "My strongest areas are streaming pipelines (Kafka, Spark Streaming, Flink), cloud warehouses and lakehouses (Snowflake, Redshift, BigQuery, Iceberg, Delta Lake), and orchestration with Airflow and dbt. I care as much about data quality, cost efficiency, and observability as I do about throughput.",
    "Recently I have worked on unstructured document ingestion for hybrid RAG retrieval, warehouse performance tuning, medallion lakehouses for clickstream analytics, and real-time fraud detection. I am interested in systems that stay correct under load—and stay affordable as they grow.",
  ],
} as const;

export const experience = [
  {
    company: "MedSarthi LLC",
    role: "Software Development Engineer - Data Engineer",
    type: "Internship",
    dates: "July 2025 – August 2025",
    highlights: [
      "Designed and built a data ingestion pipeline that parsed, cleaned, and structured unstructured CV/document data into PostgreSQL, standardizing inconsistent source formats into a queryable schema with 95%+ extraction accuracy.",
      "Built the retrieval infrastructure for a hybrid RAG system—embedding generation, vector indexing in Pinecone, and semantic search across 100+ program records—enabling end-to-end recommendation delivery in under 3 seconds.",
      "Engineered backend data infrastructure for document ingestion, storage, and observability, supporting over 10,000 daily processing requests with Dockerized deployment for reliable, repeatable pipeline execution.",
      "Integrated structured applicant data with the retrieval layer to feed a downstream ranking and recommendation engine, ensuring low-latency, high-integrity data flow across the pipeline.",
    ],
    technologies: [
      "PostgreSQL",
      "Pinecone",
      "Docker",
      "RAG",
      "Embeddings",
      "Python",
    ],
  },
  {
    company: "Accenture",
    role: "Software Engineer - Data Engineer",
    type: "Full-time",
    dates: "May 2021 – May 2023",
    highlights: [
      "Designed and maintained scalable ETL pipelines using Apache Spark and Python on AWS Glue, processing 500GB+ of data daily and improving data availability by 30% for downstream analytics teams.",
      "Built and optimized data warehouse solutions on Amazon Redshift, implementing partitioning and query tuning strategies that reduced average query latency by 40%.",
      "Migrated legacy on-premise data infrastructure to the cloud, improving system scalability and reducing operational costs by 20%.",
      "Automated data workflows using Apache Airflow, cutting manual data processing effort by 15+ hours per week and improving pipeline reliability.",
    ],
    technologies: [
      "Apache Spark",
      "Python",
      "AWS Glue",
      "Amazon Redshift",
      "Apache Airflow",
      "AWS",
    ],
  },
] as const;

export const projects = [
  {
    name: "Real-Time Anomaly Detection Pipeline for Financial Fraud",
    featured: true,
    summary:
      "A Kafka + Flink streaming pipeline for fraud detection with exactly-once semantics and a Redis-backed real-time feature store.",
    problem:
      "Financial fraud signals need sub-second decisioning without sacrificing correctness under high event throughput.",
    highlights: [
      "Designed a Kafka + Flink streaming pipeline processing 15K+ events/sec with exactly-once checkpointing and event-time watermarking, reducing fraud detection latency to under 2 seconds.",
      "Built a Redis-backed real-time feature store integrated into a stateful Flink job, cutting feature-lookup latency by 90% and supporting sub-second decisioning at production scale.",
    ],
    technologies: ["Kafka", "Apache Flink", "Redis", "Streaming"],
  },
  {
    name: "E-Commerce Clickstream Lakehouse",
    featured: true,
    summary:
      "A medallion lakehouse on Apache Iceberg for high-volume clickstream analytics with dbt Gold models and automated quality tests.",
    problem:
      "Clickstream volumes create small-file and reprocessing cost problems that degrade lakehouse reliability and BI freshness.",
    highlights: [
      "Architected a medallion lakehouse (Bronze/Silver/Gold) on Apache Iceberg processing 100M+ daily clickstream events, using PySpark and Kafka for ingestion and automated compaction to cut small-file count by 95%.",
      "Built incremental Merge-based transformations and dbt Gold-layer models with 150+ automated tests, reducing reprocessing cost by 80% and catching data quality regressions before they reached BI dashboards.",
    ],
    technologies: [
      "Apache Iceberg",
      "PySpark",
      "Kafka",
      "dbt",
      "Lakehouse",
    ],
  },
  {
    name: "Cloud Analytics Warehouse (dbt)",
    featured: true,
    summary:
      "A Kimball-style BigQuery warehouse with SCD Type 2 dimensions, extensive dbt testing, and CI-gated pull requests.",
    problem:
      "Business stakeholders need accurate historical trend analysis without undetected data quality regressions reaching dashboards.",
    highlights: [
      "Designed a Kimball-style star schema in BigQuery with SCD Type 2 dimension tracking across 500K+ records, enabling accurate historical trend analysis for business stakeholders.",
      "Built 40+ dbt models with 150+ automated tests (uniqueness, referential integrity, freshness) and a CI pipeline gating pull requests, reducing undetected data quality issues by ~70%.",
    ],
    technologies: ["BigQuery", "dbt", "Kimball", "SCD Type 2", "CI/CD"],
  },
] as const;

export const skillCategories = [
  {
    name: "Data Engineering & Streaming",
    skills: [
      "Kafka",
      "Spark (PySpark)",
      "Spark Streaming",
      "Flink",
      "Airflow",
      "Hadoop",
      "dbt",
      "ETL",
      "Databricks",
      "Kinesis",
    ],
  },
  {
    name: "Databases & Warehousing",
    skills: [
      "Snowflake",
      "Redshift",
      "BigQuery",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Pinecone",
      "Data Lake",
      "Delta Lake",
      "Apache Iceberg",
      "Apache Beam",
      "Data Modeling",
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
      "CI/CD",
      "Prometheus",
      "Grafana",
      "AWS Glue",
      "AWS EMR",
      "GitHub Actions",
    ],
  },
  {
    name: "Languages",
    skills: [
      "Python",
      "SQL",
      "Java",
      "JavaScript",
      "TypeScript",
      "C++",
      "Linux / Bash",
    ],
  },
  {
    name: "Backend & APIs",
    skills: [
      "FastAPI",
      "Flask",
      "Django",
      "Spring Boot",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "Git",
    ],
  },
] as const;

export const education = [
  {
    institution: "Carnegie Mellon University",
    degree: "Master of Information Systems Management",
    dates: "August 2024 – December 2025",
  },
  {
    institution: "Manipal University Jaipur",
    degree: "Bachelor of Technology, Computer and Communication Engineering",
    dates: "June 2017 – June 2021",
  },
] as const;

export const contact = {
  headline: "Let's build something together.",
  body: "Open to data engineering roles and collaborations on streaming pipelines, lakehouses, and cloud warehouse platforms. Reach out by email or connect on LinkedIn.",
} as const;
