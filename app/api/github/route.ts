import { NextResponse } from "next/server";
import { profile } from "@/data/portfolio";

type GitHubRepo = {
  name: string;
  stargazers_count: number;
  language: string | null;
  languages_url: string;
  fork: boolean;
  updated_at: string;
};

type GitHubUser = {
  public_repos: number;
  followers: number;
};

const fallback = {
  repos: 0,
  stars: 0,
  followers: 0,
  languages: [
    "Python",
    "JavaScript",
    "CSS",
    "HTML",
    "Shell",
    "PyTorch",
    "TensorFlow",
    "Scikit-Learn",
    "Flask",
    "React",
    "PostgreSQL"
  ],
  recentRepos: ["Aiba AI Virtual Assistant", "AI Birthday Experience", "Restaurant Recommendation System"],
  commits: "Live"
};

const chosenStack = [
  "PyTorch",
  "TensorFlow",
  "Scikit-Learn",
  "Flask",
  "React",
  "PostgreSQL",
  "Prompt Engineering"
];

export async function GET() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userResponse, reposResponse, eventsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${profile.github}`, {
        headers,
        next: { revalidate: 1800 }
      }),
      fetch(`https://api.github.com/users/${profile.github}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 1800 }
      }),
      fetch(`https://api.github.com/users/${profile.github}/events/public?per_page=100`, {
        headers,
        next: { revalidate: 1800 }
      })
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      return NextResponse.json(fallback);
    }

    const user = (await userResponse.json()) as GitHubUser;
    const repos = (await reposResponse.json()) as GitHubRepo[];
    const events = eventsResponse.ok ? ((await eventsResponse.json()) as Array<{ type: string }>) : [];
    const sourceRepos = repos.filter((repo) => !repo.fork);
    const languageTotals = new Map<string, number>();
    const languageResponses = await Promise.all(
      sourceRepos.map((repo) =>
        fetch(repo.languages_url, {
          headers,
          next: { revalidate: 1800 }
        })
          .then((response) => (response.ok ? response.json() : {}))
          .catch(() => ({}))
      )
    );

    languageResponses.forEach((repoLanguages: Record<string, number>) => {
      Object.entries(repoLanguages).forEach(([language, bytes]) => {
        languageTotals.set(language, (languageTotals.get(language) ?? 0) + bytes);
      });
    });

    const detectedLanguages = Array.from(languageTotals.entries())
      .sort(([, leftBytes], [, rightBytes]) => rightBytes - leftBytes)
      .map(([language]) => language);
    const primaryLanguages = sourceRepos.map((repo) => repo.language).filter(Boolean) as string[];
    const languages = Array.from(
      new Set([...(detectedLanguages.length ? detectedLanguages : primaryLanguages), ...chosenStack])
    ).slice(0, 12);
    const stars = sourceRepos.reduce((total, repo) => total + repo.stargazers_count, 0);
    const commits = events.filter((event) => event.type === "PushEvent").length;

    return NextResponse.json({
      repos: user.public_repos,
      stars,
      followers: user.followers,
      languages: languages.length ? languages : fallback.languages,
      recentRepos: sourceRepos.slice(0, 4).map((repo) => repo.name),
      commits: commits || "Live"
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
