const SHIELDS_BASE = "https://img.shields.io/badge/";

/**
 * Generate shields.io badge markdown for a technology.
 */
function badgeMarkdown(tech) {
  const url = `${SHIELDS_BASE}${tech.badge}`;
  return `![${tech.name}](${url})`;
}

/**
 * Helper to generate directory tree structure from GitHub contents array.
 */
function generateDirectoryTree(contents) {
  if (!contents || !Array.isArray(contents) || contents.length === 0) {
    return "";
  }
  
  // Sort contents: directories first, then files
  const sorted = [...contents].sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === "dir" ? -1 : 1;
  });

  const lines = ["```text"];
  sorted.forEach((item, index) => {
    const isLast = index === sorted.length - 1;
    const prefix = isLast ? "└── " : "├── ";
    const suffix = item.type === "dir" ? "/" : "";
    lines.push(`${prefix}${item.name}${suffix}`);
  });
  lines.push("```");
  return lines.join("\n");
}

/**
 * Helper to generate key features dynamically based on detected stack.
 */
function getDynamicFeatures(techStack) {
  const features = [];

  const hasReact = techStack.some(t => t.name === "React");
  const hasTypeScript = techStack.some(t => t.name === "TypeScript");
  const hasTailwind = techStack.some(t => t.name === "Tailwind CSS");
  const hasVite = techStack.some(t => t.name === "Vite");
  const hasDocker = techStack.some(t => t.name === "Docker");
  const hasJest = techStack.some(t => t.name === "Jest");
  const hasNext = techStack.some(t => t.name === "Next.js");
  const hasNode = techStack.some(t => t.name === "Node.js");
  const hasPython = techStack.some(t => t.name === "Python");

  if (hasReact) {
    features.push("- ⚛️ **Component-Driven UI**: Built with reusable React UI elements and streamlined state hooks.");
  }
  if (hasNext) {
    features.push("- 🌐 **SEO Optimized SSR**: Next.js Server-Side Rendering and fast dynamic routing.");
  }
  if (hasTypeScript) {
    features.push("- 🛡️ **Strict Type-Safety**: Built with TypeScript for static type checking and top-tier autocompletion.");
  }
  if (hasTailwind) {
    features.push("- 🎨 **Tailwind Styling**: Utility-first CSS architecture for highly-responsive and beautiful interfaces.");
  }
  if (hasVite) {
    features.push("- ⚡ **Ultra-Fast Bundling**: Bundled and compiled with Vite for near-instant hot module replacement.");
  }
  if (hasDocker) {
    features.push("- 🐳 **Container Ready**: Ready to be orchestrated, deployed, and compiled via Docker container configuration.");
  }
  if (hasJest) {
    features.push("- 🧪 **Unit Tests**: Full unit/integration testing suite using Jest.");
  }
  if (hasNode) {
    features.push("- 🟢 **Node.js Environment**: Scalable architecture optimized for modern JavaScript backends or toolchains.");
  }
  if (hasPython) {
    features.push("- 🐍 **Python Core**: High-performance scripting, data manipulation, or web backend infrastructure.");
  }

  // Core defaults
  features.push("- 📱 **Responsive Viewports**: Optimized layouts that look stunning on desktop, tablet, and mobile screens.");
  features.push("- ⚡ **Performance Minded**: Lightweight execution stack with optimized asset loads.");

  return features.join("\n");
}

/**
 * Generate the full README markdown string.
 */
export function generateReadme(repoInfo, techStack, contents = []) {
  const lines = [];

  // Title & Logo Header
  lines.push(`<div align="center">`);
  lines.push("");
  lines.push(`# 🚀 ${repoInfo.name.toUpperCase()}`);
  lines.push("");
  lines.push(`**${repoInfo.description || "A professional software repository."}**`);
  lines.push("");
  
  // Dynamic Live Demo link inside header
  if (repoInfo.homepage) {
    lines.push(`[**Live Demo 🌐**](${repoInfo.homepage}) • [**Report Bug 🐛**](${repoInfo.html_url}/issues) • [**Request Feature 💡**](${repoInfo.html_url}/issues)`);
  } else {
    lines.push(`[**Report Bug 🐛**](${repoInfo.html_url}/issues) • [**Request Feature 💡**](${repoInfo.html_url}/issues)`);
  }
  lines.push("");

  // Badges Group 1: Repository Stats & Metadata
  const statBadges = [];
  if (repoInfo.stargazers_count !== undefined) {
    statBadges.push(`![Stars](https://img.shields.io/github/stars/${repoInfo.full_name}?style=for-the-badge&color=8b5cf6)`);
  }
  if (repoInfo.forks_count !== undefined) {
    statBadges.push(`![Forks](https://img.shields.io/github/forks/${repoInfo.full_name}?style=for-the-badge&color=a78bfa)`);
  }
  if (repoInfo.license?.spdx_id && repoInfo.license.spdx_id !== "NOASSERTION") {
    statBadges.push(`![License](https://img.shields.io/github/license/${repoInfo.full_name}?style=for-the-badge&color=55556a)`);
  }
  if (repoInfo.size) {
    statBadges.push(`![Repo Size](https://img.shields.io/github/repo-size/${repoInfo.full_name}?style=for-the-badge&color=111120)`);
  }
  if (statBadges.length > 0) {
    lines.push(statBadges.join("  "));
    lines.push("");
  }

  // Badges Group 2: Tech Stack Badges
  if (techStack.length > 0) {
    const techBadges = techStack.map(badgeMarkdown).join(" ");
    lines.push(techBadges);
    lines.push("");
  }

  lines.push(`</div>`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // Table of Contents
  lines.push("## 📖 Table of Contents");
  lines.push("");
  lines.push("- [Features](#-features)");
  lines.push("- [Tech Stack](#-tech-stack)");
  lines.push("- [Project Structure](#-project-structure)");
  lines.push("- [Getting Started](#-getting-started)");
  lines.push("  - [Prerequisites](#prerequisites)");
  lines.push("  - [Installation](#installation)");
  lines.push("  - [Usage](#usage)");
  if (repoInfo.license && repoInfo.license.spdx_id !== "NOASSERTION") {
    lines.push("- [License](#-license)");
  }
  lines.push("- [Contributing](#-contributing)");
  lines.push("");
  lines.push("---");
  lines.push("");

  // Features Section
  lines.push("## ✨ Features");
  lines.push("");
  lines.push(getDynamicFeatures(techStack));
  lines.push("");
  lines.push("---");
  lines.push("");

  // Tech Stack Section
  if (techStack.length > 0) {
    lines.push("## 🛠️ Tech Stack");
    lines.push("");
    for (const tech of techStack) {
      lines.push(`- **${tech.name}** — For codebase implementation, configuration, or environment runtime.`);
    }
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Project Structure Section
  if (contents && contents.length > 0) {
    lines.push("## 📂 Project Structure");
    lines.push("");
    lines.push("Below is the high-level layout of the repository files:");
    lines.push("");
    lines.push(generateDirectoryTree(contents));
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Getting Started Section
  lines.push("## 🚀 Getting Started");
  lines.push("");
  lines.push("To get a local copy up and running, follow these steps.");
  lines.push("");
  lines.push("### Prerequisites");
  lines.push("");

  const hasNode = techStack.some((t) => t.name === "Node.js");
  const hasPython = techStack.some((t) => t.name === "Python");

  if (hasNode) {
    lines.push("Make sure you have Node.js and its package manager installed on your machine:");
    lines.push("- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)");
    lines.push("- **npm** or **yarn** or **pnpm**");
  } else if (hasPython) {
    lines.push("Make sure you have Python and its packages setup:");
    lines.push("- **[Python 3.8+](https://python.org/)**");
    lines.push("- **pip** package installer");
  } else {
    lines.push("- See repository configuration for environment prerequisites.");
  }
  lines.push("");

  lines.push("### Installation");
  lines.push("");
  lines.push("1. Clone the repository:");
  lines.push("```bash");
  lines.push(`git clone ${repoInfo.html_url}.git`);
  lines.push("```");
  lines.push("");
  lines.push(`2. Navigate to the project directory:`);
  lines.push("```bash");
  lines.push(`cd ${repoInfo.name}`);
  lines.push("```");
  lines.push("");

  if (hasNode || hasPython) {
    lines.push(`3. Install dependencies:`);
    lines.push("```bash");
    if (hasNode) {
      lines.push("npm install");
    } else if (hasPython) {
      lines.push("pip install -r requirements.txt");
    }
    lines.push("```");
    lines.push("");
  }

  // Usage Section
  lines.push("### Usage");
  lines.push("");
  lines.push("Run the main application using the following commands:");
  lines.push("");
  lines.push("```bash");

  if (hasNode) {
    const hasVite = techStack.some((t) => t.name === "Vite");
    const hasNext = techStack.some((t) => t.name === "Next.js");
    if (hasNext) {
      lines.push("npm run dev");
    } else if (hasVite) {
      lines.push("npm run dev");
    } else {
      lines.push("npm start");
    }
  } else if (hasPython) {
    const hasFlask = techStack.some((t) => t.name === "Flask");
    const hasDjango = techStack.some((t) => t.name === "Django");
    const hasFastAPI = techStack.some((t) => t.name === "FastAPI");
    if (hasFlask) {
      lines.push("flask run");
    } else if (hasDjango) {
      lines.push("python manage.py runserver");
    } else if (hasFastAPI) {
      lines.push("uvicorn main:app --reload");
    } else {
      lines.push("python main.py");
    }
  } else {
    lines.push("# Run the main application file or build output");
  }

  lines.push("```");
  lines.push("");
  lines.push("---");
  lines.push("");

  // Contributing Section
  lines.push("## 🤝 Contributing");
  lines.push("");
  lines.push("Contributions, issues, and feature requests are welcome!");
  lines.push("Feel free to check the [issues page](#) or follow these steps to contribute:");
  lines.push("");
  lines.push("1. Fork the Project");
  lines.push("2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)");
  lines.push("3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)");
  lines.push("4. Push to the Branch (`git push origin feature/AmazingFeature`)");
  lines.push("5. Open a Pull Request");
  lines.push("");
  lines.push("---");
  lines.push("");

  // License Section
  if (repoInfo.license && repoInfo.license.spdx_id !== "NOASSERTION") {
    lines.push("## 📄 License");
    lines.push("");
    lines.push(
      `Distributed under the [${repoInfo.license.name}](${repoInfo.html_url}/blob/${repoInfo.default_branch}/LICENSE). See \`LICENSE\` for more information.`
    );
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Footer Signature
  lines.push(`<div align="center">`);
  lines.push("");
  lines.push(`*Generated with ❤️ by [RepoReadme](https://github.com/Saragorule13/RepoReadme) from [${repoInfo.full_name}](${repoInfo.html_url})*`);
  lines.push("");
  lines.push("</div>");

  return lines.join("\n");
}
