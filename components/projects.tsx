"use client";

type ProjectItem = {
  title: string;
  description: string;
  image: string; // 이미지 경로
};

const PROJECTS: ProjectItem[] = [
  {
    title: "1",
    description: "브라질 파벨라 구역",
    image: "/uploads/프롭테크 프로젝트 첨부_1.png",
  },
  {
    title: "2",
    description: "포르투갈 골든",
    image: "/uploads/프롭테크 프로젝트 첨부_2.png",
  },
  {
    title: "프랑스 사회주택의 HLM정책",
    description: "프랑스의 대표적인 HLM 정책에 대해 분석 ",
    image: " ",
  },
];

export function Projects() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">프로젝트</h1>
        <p className="text-gray-500">저의 프로젝트와 작업물을 정리했습니다.</p>
      </header>

      {/* 그리드 */}      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition bg-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
