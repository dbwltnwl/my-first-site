"use client";

import * as React from "react";

type Lang = "ko" | "pt";

type ProjectItem = {
  titleKo: string;
  titlePt: string;
  descriptionKo: string;
  descriptionPt: string;
  image: string;
};

const PROJECTS: ProjectItem[] = [
  {
    titleKo: "브라질 파벨라 구역의 비공식 부동산 시장: '가격', '위험', '공간'",
    titlePt:
      "Mercado imobiliário informal nas favelas do Brasil: preço, risco e espaço",
    descriptionKo: `파벨라는 브라질 도시의 비공식 정착지이지만, 내부적으로는 사회적 관계망과 위험 요인이 결합된 독자적인 가격 체계를 가진 시장입니다.
조사 과정에서 파벨라의 주거 가치는 법적 권리보다 안전성·네트워크·위험 비용이 더 강하게 영향을 미친다는 점을 발견했습니다.
이는 파벨라가 단순한 빈곤 주거지가 아니라, 공식 시장과는 다른 논리로 작동하는 자생적 부동산 시장임을 보여줍니다.`,
    descriptionPt: `As favelas são assentamentos informais nas cidades brasileiras, mas funcionam como um mercado próprio, com regras internas de preço ligadas a redes sociais e à percepção de risco.
No estudo, observei que o valor da moradia é definido menos por direitos legais e mais por segurança, vínculos comunitários e custo do risco.
Isso mostra que a favela não é apenas um espaço de pobreza, mas um mercado imobiliário autônomo que opera segundo uma lógica diferente do mercado formal.`,
    image: "/uploads/project_3.png",
  },
  {
    titleKo: "분당 정자동 아파트 지구 노후계획도시",
    titlePt:
      "Bairro planejado de Jeongja (Bundang) e o envelhecimento da cidade planejada",
    descriptionKo: `분당 정자동 아파트 지구의 노후화는 단순한 물리적 노후를 넘어, 초기 계획 도시의 구조적 한계가 표면화된 사례로 볼 수 있습니다.
조사 과정에서 주거 밀도·동선 체계·커뮤니티 공간의 취약성이 노후화와 함께 더욱 두드러졌으며, 이는 향후 재생 전략에서 기능 개선과 생활권 단위의 재구조화가 핵심 과제로 작용함을 확인했습니다.
본 분석은 정자동이 더 이상 ‘완성된 계획 도시’가 아니라, 변화된 생활 방식과 도시 수요에 맞춰 다시 설계되어야 하는 재구상(Reconfiguration)의 단계에 있음을 보여줍니다.`,
    descriptionPt: `O envelhecimento do bairro de apartamentos em Jeongja, em Bundang, revela limites estruturais de uma cidade planejada em seu estágio inicial.
A pesquisa destacou problemas de densidade habitacional, circulação e fragilidade dos espaços comunitários, que ficam mais evidentes com o tempo.
A análise indica que Jeongja deixou de ser uma “cidade planejada acabada” e entrou numa fase de reconfiguração, em que precisa ser redesenhada de acordo com novos estilos de vida e demandas urbanas.`,
    image: "/uploads/project_2.png",
  },
  {
    titleKo: "프랑스 사회주택의 HLM 정책",
    titlePt: "Política de habitação social HLM na França",
    descriptionKo: `프랑스의 사회주택(HLM) 체계는 단순한 저소득층 지원을 넘어, 도시 내 계층 혼합과 주거 안정성을 구조적으로 보장하기 위한 국가적 도시정책입니다.
발표에서는 HLM의 역사적 형성 배경, 공공·준공공 기관의 운영 구조, 임대료 규제 방식, 그리고 사회적 혼합(Mixité Sociale)을 구현하는 배분 원리를 중점적으로 분석했습니다.
이를 통해 프랑스 사회주택이 단순한 복지 수단이 아니라, 도시 불평등을 완화하고 공간적 균형을 조정하는 핵심 도시계획 도구로 작동한다는 점을 확인했습니다.`,
    descriptionPt: `O sistema de habitação social HLM na França vai além do apoio a famílias de baixa renda: ele é um instrumento de política urbana voltado à mistura social e à estabilidade residencial.
Na apresentação, analisei a formação histórica do HLM, a estrutura de gestão pública e paraestatal, os mecanismos de regulação de aluguel e os princípios de distribuição voltados à mixité sociale.
Isso mostra que o HLM não é apenas uma política assistencial, mas uma ferramenta central para reduzir desigualdades urbanas e reorganizar o equilíbrio espacial nas cidades francesas.`,
    image: "/uploads/project_1.png",
  },
  {
    titleKo: "포르투갈 골든비자 정책이 부동산 가격에 미친 영향",
    titlePt:
      "Impacto do programa Golden Visa no mercado imobiliário em Portugal",
    descriptionKo: `포르투갈의 골든비자 정책은 외국 자본을 도시 핵심 지역으로 집중시키며 부동산 가격을 급격히 상승시킨 대표적 사례입니다.
조사 과정에서 외국인 투자 확대가 지역 주민의 주거 접근성을 약화시키고, 도시 중심부에서의 인구 교체와 기능 변화가 가속화되는 글로벌형 젠트리피케이션으로 이어진다는 점을 확인했습니다.
또한 한국의 규제 중심 부동산 정책과 비교했을 때, 포르투갈은 투자 유치의 부작용이 도시 불평등으로 직결되는 구조적 취약성을 갖고 있으며, 이는 주거 안정성과 도시 지속가능성을 동시에 고민해야 함을 시사합니다.`,
    descriptionPt: `O programa Golden Visa em Portugal concentrou capital estrangeiro nas áreas centrais das cidades, contribuindo para a rápida alta dos preços dos imóveis.
A pesquisa mostrou que esse movimento enfraquece o acesso à moradia para moradores locais e acelera processos de gentrificação de perfil global, com troca de população e mudança de usos no centro urbano.
Comparando com o modelo mais regulatório da Coreia, ficou evidente que Portugal tem maior vulnerabilidade estrutural a desigualdades urbanas geradas por políticas de atração de investimento.`,
    image: "/uploads/project_4.png",
  },
];

export function Projects() {
  const [lang, setLang] = React.useState<Lang>("ko");

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* 언어 토글 */}
      <div className="flex justify-center gap-3 mb-4 text-sm text-gray-600">
        <button
          type="button"
          onClick={() => setLang("ko")}
          className={lang === "ko" ? "font-semibold underline" : "opacity-60"}
        >
          한국어
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => setLang("pt")}
          className={lang === "pt" ? "font-semibold underline" : "opacity-60"}
        >
          Português
        </button>
      </div>

      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {lang === "ko" ? "프로젝트" : "Projetos"}
        </h1>
        <p className="text-gray-500">
          {lang === "ko"
            ? "도시, 부동산, 브라질·유럽을 중심으로 진행한 학부 연구와 발표들입니다."
            : "Projetos acadêmicos nas áreas de cidade, mercado imobiliário, Brasil e Europa."}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((item, idx) => {
          const title = lang === "ko" ? item.titleKo : item.titlePt;
          const description =
            lang === "ko" ? item.descriptionKo : item.descriptionPt;

          return (
            <div
              key={idx}
              className="rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition bg-white"
            >
              <img
                src={item.image}
                alt={title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 whitespace-pre-line">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
