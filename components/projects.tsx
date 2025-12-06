"use client"

import * as React from "react"

type SiteLang = "ko" | "pt"

function useSiteLang() {
  const [lang, setLang] = React.useState<SiteLang>("ko")

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const stored = window.localStorage.getItem("site-lang")
    if (stored === "ko" || stored === "pt") {
      setLang(stored)
    }

    const handler = (e: Event) => {
      const anyEvent = e as CustomEvent
      const next = anyEvent.detail?.lang
      if (next === "ko" || next === "pt") {
        setLang(next)
      }
    }

    window.addEventListener("site-lang-change", handler as EventListener)
    return () => window.removeEventListener("site-lang-change", handler as EventListener)
  }, [])

  return lang
}

type ProjectItem = {
  image: string
  titleKo: string
  titlePt: string
  descriptionKo: string
  descriptionPt: string
}

const PROJECTS: ProjectItem[] = [
  {
    image: "/uploads/project_3.png",
    titleKo: "브라질 파벨라 구역의 비공식 부동산 시장: '가격', '위험', '공간'",
    titlePt: "Mercado imobiliário informal nas favelas brasileiras: “preço”, “risco”, “espaço”",
    descriptionKo: `파벨라는 브라질 도시의 비공식 정착지이지만, 내부적으로는 사회적 관계망과 위험 요인이 결합된 독자적인 가격 체계를 가진 시장입니다.
조사 과정에서 파벨라의 주거 가치는 법적 권리보다 안전성·네트워크·위험 비용이 더 강하게 영향을 미친다는 점을 발견했습니다.
이는 파벨라가 단순한 빈곤 주거지가 아니라, 공식 시장과는 다른 논리로 작동하는 자생적 부동산 시장임을 보여줍니다.`,
    descriptionPt: `As favelas são assentamentos informais nas cidades brasileiras, mas funcionam como um mercado imobiliário próprio, estruturado por redes sociais, percepção de risco e custos de segurança.
Ao longo da pesquisa, identifiquei que o valor da moradia é definido menos por direitos formais de propriedade e mais por fatores como segurança, vínculos comunitários e exposição ao risco.
Isso mostra que a favela não é apenas um território de pobreza, mas um mercado imobiliário autônomo, com lógica distinta do mercado formal.`,
  },
  {
    image: "/uploads/project_2.png",
    titleKo: "분당 정자동 아파트 지구 노후계획도시",
    titlePt: "Cidade planejada em envelhecimento: bairro de apartamentos em Jeongja, Bundang",
    descriptionKo: `분당 정자동 아파트 지구의 노후화는 단순한 물리적 노후를 넘어, 초기 계획 도시의 구조적 한계가 표면화된 사례로 볼 수 있습니다.
조사 과정에서 주거 밀도·동선 체계·커뮤니티 공간의 취약성이 노후화와 함께 더욱 두드러졌으며, 이는 향후 재생 전략에서 기능 개선과 생활권 단위의 재구조화가 핵심 과제로 작용함을 확인했습니다.
본 분석은 정자동이 더 이상 ‘완성된 계획 도시’가 아니라, 변화된 생활 방식과 도시 수요에 맞춰 다시 설계되어야 하는 재구상(Reconfiguration)의 단계에 있음을 보여줍니다.`,
    descriptionPt: `O envelhecimento do bairro de apartamentos em Jeongja, Bundang, revela limites estruturais de uma cidade planejada de primeira geração.
A análise mostrou que a combinação entre alta densidade residencial, circulação pouco flexível e falta de espaços comunitários se torna mais crítica com o tempo.
O estudo indica que Jeongja deixou de ser uma “cidade planejada acabada” e entrou numa fase de reconfiguração, em que é necessário redesenhar funções urbanas e escalas de vida cotidiana.`,
  },
  {
    image: "/uploads/project_1.png",
    titleKo: "프랑스 사회주택의 HLM정책",
    titlePt: "Política de habitação social na França: o sistema HLM",
    descriptionKo: `프랑스의 사회주택(HLM) 체계는 단순한 저소득층 지원을 넘어, 도시 내 계층 혼합과 주거 안정성을 구조적으로 보장하기 위한 국가적 도시정책입니다.
발표에서는 HLM의 역사적 형성 배경, 공공·준공공 기관의 운영 구조, 임대료 규제 방식, 그리고 사회적 혼합(Mixité Sociale)을 구현하는 배분 원리를 중점적으로 분석했습니다.
이를 통해 프랑스 사회주택이 단순한 복지 수단이 아니라, 도시 불평등을 완화하고 공간적 균형을 조정하는 핵심 도시계획 도구로 작동한다는 점을 확인했습니다.`,
    descriptionPt: `O sistema de habitação social francês (HLM) vai além do apoio à baixa renda: é um instrumento de política urbana voltado à mistura social e à estabilidade habitacional.
No estudo, analisei a formação histórica do HLM, a estrutura de gestão por instituições públicas e paraestatais, os mecanismos de regulação de aluguel e os critérios de alocação voltados à “mixité sociale”.
A pesquisa mostra que a habitação social na França funciona como uma ferramenta central de planejamento urbano para reduzir desigualdades e reorganizar o equilíbrio espacial nas cidades.`,
  },
  {
    image: "/uploads/project_4.png",
    titleKo: "포르투갈 골든비자 정책이 부동산 가격에 미친 영향",
    titlePt: "Impacto do programa de Golden Visa no mercado imobiliário em Portugal",
    descriptionKo: `포르투갈의 골든비자 정책은 외국 자본을 도시 핵심 지역으로 집중시키며 부동산 가격을 급격히 상승시킨 대표적 사례입니다.
조사 과정에서 외국인 투자 확대가 지역 주민의 주거 접근성을 약화시키고, 도시 중심부에서의 인구 교체와 기능 변화가 가속화되는 글로벌형 젠트리피케이션으로 이어진다는 점을 확인했습니다.
또한 한국의 규제 중심 부동산 정책과 비교했을 때, 포르투갈은 투자 유치의 부작용이 도시 불평등으로 직결되는 구조적 취약성을 갖고 있으며, 이는 주거 안정성과 도시 지속가능성을 동시에 고민해야 함을 시사합니다.`,
    descriptionPt: `O programa de Golden Visa em Portugal tornou-se um caso emblemático de como a atração de capitais estrangeiros pode concentrar investimentos em áreas centrais e pressionar fortemente os preços dos imóveis.
A pesquisa mostrou que a expansão desse tipo de investimento reduz o acesso à moradia para residentes locais e acelera processos de gentrificação globalizada nos centros urbanos.
Em comparação com o modelo mais regulatório da Coreia, o caso português revela uma vulnerabilidade estrutural: os benefícios da atração de capital podem ser rapidamente convertidos em maior desigualdade urbana, exigindo políticas que conciliem investimento, estabilidade habitacional e sustentabilidade urbana.`,
  },
]

export function Projects() {
  const lang = useSiteLang()
  const isPT = lang === "pt"

  const sectionTitle = isPT ? "Projetos" : "프로젝트"
  const sectionSubtitle = isPT
    ? "Pesquisas e trabalhos que conectam cidade, habitação e políticas urbanas em diferentes contextos."
    : ""

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {sectionTitle}
        </h1>
        {sectionSubtitle && (
          <p className="text-gray-500 whitespace-pre-line">
            {sectionSubtitle}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition bg-white"
          >
            <img
              src={item.image}
              alt={isPT ? item.titlePt : item.titleKo}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">
                {isPT ? item.titlePt : item.titleKo}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {isPT ? item.descriptionPt : item.descriptionKo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
