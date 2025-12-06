"use client";

import { EditableText } from "@/components/editable/editable-text";
import { EditableBackground } from "@/components/editable/editable-background";
import { useInlineEditor } from "@/contexts/inline-editor-context";

type ProjectItem = {
  id: string;
  title_ko: string;
  title_pt: string;
  description_ko: string;
  description_pt: string;
  image: string;
};

const PROJECTS: ProjectItem[] = [
  {
    id: "project1",
    title_ko: "브라질 파벨라 구역의 비공식 부동산 시장",
    title_pt: "Mercado imobiliário informal nas favelas do Brasil",
    description_ko: `파벨라는 비공식 정착지이지만 내부적으로 고유한 가격 체계가 존재합니다.
네트워크·안전성·위험 비용이 법적 권리보다 더 중요한 역할을 한다는 점을 확인했습니다.`,
    description_pt: `Apesar de serem assentamentos informais, as favelas possuem um sistema próprio de precificação.
Descobri que fatores como segurança, redes sociais e custos de risco influenciam mais que direitos legais.`,
    image: "/uploads/project_3.png",
  },
  {
    id: "project2",
    title_ko: "분당 정자동 아파트 지구 노후계획도시",
    title_pt: "Bairro planejado de Jeongja (Bundang) e seu processo de envelhecimento urbano",
    description_ko: `정자동은 초기 계획 도시의 한계가 노후화와 함께 드러난 사례입니다.
생활권 기반 재구조화가 필요하다는 결론을 얻었습니다.`,
    description_pt: `Jeongja revela limitações estruturais de cidades planejadas à medida que envelhecem.
Concluí que é necessária uma reconfiguração baseada no cotidiano dos moradores.`,
    image: "/uploads/project_2.png",
  },
  {
    id: "project3",
    title_ko: "프랑스 사회주택의 HLM 정책",
    title_pt: "Política habitacional HLM na França",
    description_ko: `HLM은 도시 불평등을 완화하고 사회적 혼합을 실현하는 핵심 정책입니다.
운영 구조·임대 규제·배분 원리를 중심으로 발표했습니다.`,
    description_pt: `O sistema HLM atua como ferramenta para reduzir desigualdades urbanas e promover mistura social.
Analisei sua gestão, regulação de aluguel e princípios de distribuição.`,
    image: "/uploads/project_1.png",
  },
  {
    id: "project4",
    title_ko: "포르투갈 골든비자 정책과 부동산 가격",
    title_pt: "Impacto do Golden Visa no mercado imobiliário português",
    description_ko: `골든비자는 외국 자본을 집중시키며 가격 상승과 젠트리피케이션을 초래했습니다.
한국 정책과 비교하여 도시 불평등 문제를 분석했습니다.`,
    description_pt: `O Golden Visa atraiu capital estrangeiro, elevou preços e acelerou gentrificação.
Comparei com o modelo regulatório coreano para analisar desigualdade urbana.`,
    image: "/uploads/project_4.png",
  },
];

export function Projects() {
  const { isEditMode } = useInlineEditor();
  const [lang, setLang] = useState<"ko" | "pt">("ko");

  return (
    <EditableBackground className="py-16" storageKey="projects-bg">
      <section className="max-w-6xl mx-auto px-4">
        
        {/* 언어 토글 */}
        <div className="flex justify-center gap-3 mb-6 text-sm">
          <button
            onClick={() => setLang("ko")}
            className={lang === "ko" ? "font-bold underline" : "opacity-50"}
          >
            한국어
          </button>
          <span>/</span>
          <button
            onClick={() => setLang("pt")}
            className={lang === "pt" ? "font-bold underline" : "opacity-50"}
          >
            Português
          </button>
        </div>

        {/* 제목 */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <EditableText
              value={lang === "ko" ? "프로젝트" : "Projetos"}
              storageKey={`projects-title-${lang}`}
            />
          </h1>

          <p className="text-gray-500">
            <EditableText
              storageKey={`projects-subtitle-${lang}`}
              value={
                lang === "ko"
                  ? "학부 과정에서 진행한 연구와 발표 프로젝트들입니다."
                  : "Projetos e pesquisas desenvolvidos durante minha graduação."
              }
            />
          </p>
        </header>

        {/* 프로젝트 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((item) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition bg-white"
            >
              <img
                src={item.image}
                alt={item.title_ko}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">
                  <EditableText
                    storageKey={`${item.id}-title-${lang}`}
                    value={lang === "ko" ? item.title_ko : item.title_pt}
                  />
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  <EditableText
                    multiline
                    storageKey={`${item.id}-desc-${lang}`}
                    value={
                      lang === "ko"
                        ? item.description_ko
                        : item.description_pt
                    }
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </EditableBackground>
  );
}
