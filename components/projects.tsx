"use client";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

const PROJECTS: TimelineItem[] = [
  {
    year: "1",
    title: "브라질 파벨라",
    description: "22",
  },
  {
    year: "2",
    title: "포르투갈 골든",
    description: "포르투갈 골든",
  },
];

export default function ProjectsTimeline() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">프로젝트</h1>
        <p className="text-sm text-gray-500">
          나의 프로젝트를 타임라인으로 정리했습니다.
        </p>
      </header>

      <ol className="relative border-l border-gray-200">
        {PROJECTS.map((item, index) => (
          <li key={index} className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-gray-900" />
            </span>

            <p className="text-xs font-semibold text-gray-400 mb-1">
              STEP {item.year}
            </p>

            <h2 className="text-lg font-semibold text-gray-900">
              {item.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
