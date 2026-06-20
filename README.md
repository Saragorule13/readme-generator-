# RepoReadme

Generate professional README files directly from any public GitHub repository.

RepoReadme analyzes a repository using the GitHub API and automatically creates a structured README with detected technologies, installation instructions, usage commands, and project information.

## Live Demo

🔗 https://readme-generator-topaz.vercel.app/

---

## Features

* Generate README files from public GitHub repositories.
* Supports both GitHub URLs and `owner/repository` format.
* Automatic repository information extraction.
* Detects technologies from project dependencies.
* Generates technology badges.
* Live markdown preview.
* Raw markdown output.
* Copy README to clipboard.
* Download README.md file.
* Responsive design for desktop and mobile.

---

## Tech Stack

* React
* Vite
* Tailwind CSS
* JavaScript
* GitHub REST API
* React Markdown
* Vercel

---

## How It Works

1. Enter a public GitHub repository URL.
2. The application fetches repository information using the GitHub API.
3. Dependencies and project metadata are analyzed.
4. A structured README file is generated automatically.
5. Users can preview, copy, or download the generated README.

---

## Supported Input Formats

```text
https://github.com/facebook/react
```

or

```text
facebook/react
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/reporeadme.git
```

Navigate to the project folder:

```bash
cd reporeadme
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

---

## Project Structure

```text
src/
├── components/
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

---

## API Used

This project uses the public GitHub REST API.

No authentication or API keys are required for public repositories.

---

## Future Improvements

* Support additional package managers.
* More language ecosystem detection.
* README templates.
* Export to different formats.
* Repository statistics.
* Dark/light mode.

---

## Built For

This project was developed as part of the Digital Heroes developer evaluation task.

---

## Author

**Sara Gorule**

Computer Engineering Student
Frontend & Full Stack Developer

GitHub: https://github.com/Saragorule13

---

## License

This project is open source and available under the MIT License.
