const SHIELDS_BASE = "https://img.shields.io/badge/";

/**
 * Generate shields.io badge markdown for a technology.
 */
function badgeMarkdown(tech) {
  const url = `${SHIELDS_BASE}${tech.badge}`;
  return `![${tech.name}](${url})`;
}

/**
 * Generate the full README markdown string.
 */
export function generateReadme(repoInfo, techStack) {
  const lines = [];

  // Title
  lines.push(`# ${repoInfo.name}`);
  lines.push("");

  // Badges
  if (techStack.length > 0) {
    const badges = techStack.map(badgeMarkdown).join(" ");
    lines.push(badges);
    lines.push("");
  }

  // Stars / forks / license badges
  const metaBadges = [];
  if (repoInfo.stargazers_count !== undefined) {
    metaBadges.push(
      `![GitHub stars](https://img.shields.io/github/stars/${repoInfo.full_name}?style=social)`
    );
  }
  if (repoInfo.forks_count !== undefined) {
    metaBadges.push(
      `![GitHub forks](https://img.shields.io/github/forks/${repoInfo.full_name}?style=social)`
    );
  }
  if (repoInfo.license?.spdx_id && repoInfo.license.spdx_id !== "NOASSERTION") {
    metaBadges.push(
      `![License](https://img.shields.io/github/license/${repoInfo.full_name})`
    );
  }
  if (metaBadges.length > 0) {
    lines.push(metaBadges.join(" "));
    lines.push("");
  }

  // Description
  lines.push("## Description");
  lines.push("");
  lines.push(repoInfo.description || "_No description provided._");
  lines.push("");

  // Homepage
  if (repoInfo.homepage) {
    lines.push(`**🌐 Live Demo:** [${repoInfo.homepage}](${repoInfo.homepage})`);
    lines.push("");
  }

  // Tech Stack
  if (techStack.length > 0) {
    lines.push("## Tech Stack");
    lines.push("");
    for (const tech of techStack) {
      lines.push(`- ${tech.name}`);
    }
    lines.push("");
  }

  // Topics
  if (repoInfo.topics && repoInfo.topics.length > 0) {
    lines.push("## Topics");
    lines.push("");
    lines.push(repoInfo.topics.map((t) => `\`${t}\``).join(" "));
    lines.push("");
  }

  // Installation
  lines.push("## Getting Started");
  lines.push("");
  lines.push("### Prerequisites");
  lines.push("");

  const hasNode = techStack.some((t) => t.name === "Node.js");
  const hasPython = techStack.some((t) => t.name === "Python");

  if (hasNode) {
    lines.push("- [Node.js](https://nodejs.org/) (v18 or higher recommended)");
    lines.push("- npm or yarn");
  } else if (hasPython) {
    lines.push("- [Python](https://python.org/) (3.8+)");
    lines.push("- pip");
  } else {
    lines.push("- See repository documentation for prerequisites");
  }
  lines.push("");

  lines.push("### Installation");
  lines.push("");
  lines.push("```bash");
  lines.push(`git clone ${repoInfo.html_url}.git`);
  lines.push(`cd ${repoInfo.name}`);

  if (hasNode) {
    lines.push("npm install");
  } else if (hasPython) {
    lines.push("pip install -r requirements.txt");
  }

  lines.push("```");
  lines.push("");

  // Usage
  lines.push("### Usage");
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
    lines.push("# Add usage instructions here");
  }

  lines.push("```");
  lines.push("");

  // License
  lines.push("## License");
  lines.push("");
  if (repoInfo.license && repoInfo.license.spdx_id !== "NOASSERTION") {
    lines.push(
      `This project is licensed under the [${repoInfo.license.name}](${repoInfo.html_url}/blob/${repoInfo.default_branch}/LICENSE).`
    );
  } else {
    lines.push("This project does not specify a license.");
  }
  lines.push("");

  // Footer
  lines.push("---");
  lines.push("");
  lines.push(
    `*Generated with [RepoReadme](https://github.com) from [${repoInfo.full_name}](${repoInfo.html_url})*`
  );
  lines.push("");

  return lines.join("\n");
}
