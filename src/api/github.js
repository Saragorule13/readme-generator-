const GITHUB_API = "https://api.github.com";

/**
 * Parse a GitHub repo input string into { owner, repo }.
 * Supports:
 *   - https://github.com/owner/repo
 *   - https://github.com/owner/repo/...anything
 *   - github.com/owner/repo
 *   - owner/repo
 */
export function parseRepoInput(input) {
  if (!input || typeof input !== "string") return null;

  const trimmed = input.trim().replace(/\/+$/, "");

  // Try URL format
  const urlPattern =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)/;
  const urlMatch = trimmed.match(urlPattern);
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2] };
  }

  // Try owner/repo format
  const shortPattern = /^([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)$/;
  const shortMatch = trimmed.match(shortPattern);
  if (shortMatch) {
    return { owner: shortMatch[1], repo: shortMatch[2] };
  }

  return null;
}

/**
 * Fetch repository metadata.
 */
export async function fetchRepoInfo(owner, repo) {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`);
  if (res.status === 404) {
    throw new Error("Repository not found. Please check the owner and repository name.");
  }
  if (res.status === 403) {
    const data = await res.json().catch(() => ({}));
    if (data.message && data.message.includes("rate limit")) {
      throw new Error(
        "GitHub API rate limit exceeded. Please wait a few minutes and try again."
      );
    }
    throw new Error("Access forbidden. The repository may be private.");
  }
  if (!res.ok) {
    throw new Error(`GitHub API error (${res.status}). Please try again later.`);
  }
  return res.json();
}

/**
 * Fetch root-level contents of a repository.
 */
export async function fetchRepoContents(owner, repo) {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/`);
  if (!res.ok) return [];
  return res.json();
}

/**
 * Fetch and decode a file from the repo (base64 content from GitHub API).
 */
export async function fetchFileContent(owner, repo, path) {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.content && data.encoding === "base64") {
    try {
      return atob(data.content.replace(/\n/g, ""));
    } catch {
      return null;
    }
  }
  return null;
}

// Technology detection maps
const NPM_TECH_MAP = {
  react: { name: "React", badge: "React-61DAFB?logo=react&logoColor=black" },
  "react-dom": { name: "React", badge: "React-61DAFB?logo=react&logoColor=black" },
  next: { name: "Next.js", badge: "Next.js-000000?logo=nextdotjs&logoColor=white" },
  express: { name: "Express", badge: "Express-000000?logo=express&logoColor=white" },
  tailwindcss: { name: "Tailwind CSS", badge: "Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" },
  typescript: { name: "TypeScript", badge: "TypeScript-3178C6?logo=typescript&logoColor=white" },
  mongodb: { name: "MongoDB", badge: "MongoDB-47A248?logo=mongodb&logoColor=white" },
  mongoose: { name: "Mongoose", badge: "MongoDB-47A248?logo=mongodb&logoColor=white" },
  axios: { name: "Axios", badge: "Axios-5A29E4?logo=axios&logoColor=white" },
  vite: { name: "Vite", badge: "Vite-646CFF?logo=vite&logoColor=white" },
  redux: { name: "Redux", badge: "Redux-764ABC?logo=redux&logoColor=white" },
  "@reduxjs/toolkit": { name: "Redux", badge: "Redux-764ABC?logo=redux&logoColor=white" },
  vue: { name: "Vue.js", badge: "Vue.js-4FC08D?logo=vuedotjs&logoColor=white" },
  angular: { name: "Angular", badge: "Angular-DD0031?logo=angular&logoColor=white" },
  "@angular/core": { name: "Angular", badge: "Angular-DD0031?logo=angular&logoColor=white" },
  svelte: { name: "Svelte", badge: "Svelte-FF3E00?logo=svelte&logoColor=white" },
  prisma: { name: "Prisma", badge: "Prisma-2D3748?logo=prisma&logoColor=white" },
  "@prisma/client": { name: "Prisma", badge: "Prisma-2D3748?logo=prisma&logoColor=white" },
  socket: { name: "Socket.io", badge: "Socket.io-010101?logo=socketdotio&logoColor=white" },
  "socket.io": { name: "Socket.io", badge: "Socket.io-010101?logo=socketdotio&logoColor=white" },
  jest: { name: "Jest", badge: "Jest-C21325?logo=jest&logoColor=white" },
  webpack: { name: "Webpack", badge: "Webpack-8DD6F9?logo=webpack&logoColor=black" },
  "styled-components": { name: "Styled Components", badge: "Styled_Components-DB7093?logo=styledcomponents&logoColor=white" },
};

const PYTHON_TECH_MAP = {
  flask: { name: "Flask", badge: "Flask-000000?logo=flask&logoColor=white" },
  django: { name: "Django", badge: "Django-092E20?logo=django&logoColor=white" },
  fastapi: { name: "FastAPI", badge: "FastAPI-009688?logo=fastapi&logoColor=white" },
  numpy: { name: "NumPy", badge: "NumPy-013243?logo=numpy&logoColor=white" },
  pandas: { name: "Pandas", badge: "Pandas-150458?logo=pandas&logoColor=white" },
  tensorflow: { name: "TensorFlow", badge: "TensorFlow-FF6F00?logo=tensorflow&logoColor=white" },
  torch: { name: "PyTorch", badge: "PyTorch-EE4C2C?logo=pytorch&logoColor=white" },
  pytorch: { name: "PyTorch", badge: "PyTorch-EE4C2C?logo=pytorch&logoColor=white" },
  scikit: { name: "scikit-learn", badge: "scikit--learn-F7931E?logo=scikitlearn&logoColor=white" },
  "scikit-learn": { name: "scikit-learn", badge: "scikit--learn-F7931E?logo=scikitlearn&logoColor=white" },
  requests: { name: "Requests", badge: "Requests-3776AB?logo=python&logoColor=white" },
  celery: { name: "Celery", badge: "Celery-37814A?logo=celery&logoColor=white" },
  sqlalchemy: { name: "SQLAlchemy", badge: "SQLAlchemy-D71F00?logo=python&logoColor=white" },
};

/**
 * Detect tech stack from repo contents.
 * Returns an array of { name, badge } objects.
 */
export async function detectTechStack(owner, repo, contents) {
  const fileNames = contents.map((f) => f.name);
  const detected = new Map(); // name -> badge (deduplicate)

  // Check for tsconfig.json → TypeScript
  if (fileNames.includes("tsconfig.json")) {
    detected.set("TypeScript", "TypeScript-3178C6?logo=typescript&logoColor=white");
  }

  // Check package.json
  if (fileNames.includes("package.json")) {
    detected.set("Node.js", "Node.js-339933?logo=nodedotjs&logoColor=white");
    const raw = await fetchFileContent(owner, repo, "package.json");
    if (raw) {
      try {
        const pkg = JSON.parse(raw);
        const allDeps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
        };
        for (const dep of Object.keys(allDeps)) {
          const match = NPM_TECH_MAP[dep];
          if (match && !detected.has(match.name)) {
            detected.set(match.name, match.badge);
          }
        }
      } catch {
        // invalid JSON, skip
      }
    }
  }

  // Check requirements.txt
  if (fileNames.includes("requirements.txt")) {
    detected.set("Python", "Python-3776AB?logo=python&logoColor=white");
    const raw = await fetchFileContent(owner, repo, "requirements.txt");
    if (raw) {
      const lines = raw.split("\n").map((l) => l.trim().toLowerCase());
      for (const line of lines) {
        // Extract package name (before ==, >=, etc.)
        const pkgName = line.split(/[=<>!~[\]]/)[0].trim();
        if (pkgName) {
          const match = PYTHON_TECH_MAP[pkgName];
          if (match && !detected.has(match.name)) {
            detected.set(match.name, match.badge);
          }
        }
      }
    }
  }

  // Check for Dockerfile
  if (fileNames.includes("Dockerfile") || fileNames.includes("docker-compose.yml") || fileNames.includes("docker-compose.yaml")) {
    detected.set("Docker", "Docker-2496ED?logo=docker&logoColor=white");
  }

  // Check for Go
  if (fileNames.includes("go.mod")) {
    detected.set("Go", "Go-00ADD8?logo=go&logoColor=white");
  }

  // Check for Rust
  if (fileNames.includes("Cargo.toml")) {
    detected.set("Rust", "Rust-000000?logo=rust&logoColor=white");
  }

  return Array.from(detected.entries()).map(([name, badge]) => ({ name, badge }));
}
