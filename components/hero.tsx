"use client"

import { useState, useEffect } from "react"

type SiteLang = "ko" | "pt"

const getInitialLang = (): SiteLang => {
  if (typeof window === "undefined") return "ko"
  const stored = window.localStorage.getItem("site-lang")
  return stored === "pt" ? "pt" : "ko"
}

type ProjectItem = {
  titleKo: string
  titlePt: string
  descriptionKo: string
  descriptionPt: string
  image: string
}

const PROJECTS: ProjectItem[] = [
  {
    titleKo: "브라질 파벨라 구역의 비공식 부동산 시장: '가격', '위험', '공간'",
    titlePt:
      "Mercado imobiliário informal nas favelas brasileiras: ‘preço’, ‘risco’ e ‘espaço’",
    descriptionKo: `파벨라는 브라질 도시의 비공식 정착지이지만, 내부적으로는 사회적 관계망과 위험 요인이 결합된 독자적인 가격 체계를 가진 시장입니다.
조사 과정에서 파벨라의 주거 가치는 법적 권리보다 안전성·네트워크·위험 비용이 더 강하게 영향을 미친다는 점을 발견했습니다.
이는 파벨라가 단순한 빈곤 주거지가 아니라, 공식 시장과는 다른 논리로 작동하는 자생적 부동산 시장임을 보여줍니다.`,
    descriptionPt: `As favelas são assentamentos informais, mas funcionam como um mercado imobiliário próprio, em que redes sociais e fatores de risco definem a lógica de preços.
A pesquisa mostrou que o valor habitacional é mais influenciado por segurança, redes locais e custo do risco do que por direitos formais de propriedade.
Isso revela as favelas não apenas como espaços de pobreza, mas como um mercado imobiliário autônomo, que opera com lógicas distintas do mercado formal.`,
    image: "/uploads/project_3.png",
  },
  {
    titleKo: "분당 정자동 아파트 지구 노후계획도시",
    titlePt:
      "Bairro de apartamentos em Jeongja-dong, Bundang: envelhecimento de uma cidade planejada",
    descriptionKo: `분당 정자동 아파트 지구의 노후화는 단순한 물리적 노후를 넘어, 초기 계획 도시의 구조적 한계가 표면화된 사례로 볼 수 있습니다.
조사 과정에서 주거 밀도·동선 체계·커뮤니티 공간의 취약성이 노후화와 함께 더욱 두드러졌으며, 이는 향후 재생 전략에서 기능 개선과 생활권 단위의 재구조화가 핵심 과제로 작용함을 확인했습니다.
본 분석은 정자동이 더 이상 ‘완성된 계획 도시’가 아니라, 변화된 생활 방식과 도시 수요에 맞춰 다시 설계되어야 하는 재구상(Reconfiguration)의 단계에 있음을 보여줍니다.`,
    descriptionPt: `O envelhecimento do bairro de apartamentos em Jeongja-dong não é apenas físico; ele expõe limites estruturais de uma cidade planejada em seu estágio inicial.
A pesquisa identificou que densidade habitacional, circulação e fragilidade dos espaços comunitários tornam-se mais visíveis com o tempo, apontando para a necessidade de reestruturar o bairro em escala de cotidiano.
A análise sugere que Jeongja-dong deixou de ser uma “cidade planejada acabada” e entrou em uma fase de reconfiguração, em que precisa ser redesenhada segundo novos estilos de vida e demandas urbanas.`,
    image: "/uploads/project_2.png",
  },
  {
    titleKo: "프랑스 사회주택의 HLM 정책",
    titlePt: "Política de habitação social HLM na França",
    descriptionKo: `프랑스의 사회주택(HLM) 체계는 단순한 저소득층 지원을 넘어, 도시 내 계층 혼합과 주거 안정성을 구조적으로 보장하기 위한 국가적 도시정책입니다.
발표에서는 HLM의 역사적 형성 배경, 공공·준공공 기관의 운영 구조, 임대료 규제 방식, 그리고 사회적 혼합(Mixité Sociale)을 구현하는 배분 원리를 중점적으로 분석했습니다.
이를 통해 프랑스 사회주택이 단순한 복지 수단이 아니라, 도시 불평등을 완화하고 공간적 균형을 조정하는 핵심 도시계획 도구로 작동한다는 점을 확인했습니다.`,
    descriptionPt: `O sistema de habitação social HLM na França vai além do apoio à população de baixa renda; ele é um instrumento de política urbana voltado à mistura social e à estabilidade habitacional.
A apresentação analisou a formação histórica do HLM, a estrutura de gestão público–paraestatal, os mecanismos de regulação de aluguel e os princípios de distribuição que viabilizam a “mixité sociale”.
Isso mostra que a habitação social francesa não é apenas uma política assistencial, mas um dispositivo central de planejamento urbano para reduzir desigualdades e reorganizar o equilíbrio espacial.`,
    image: "/uploads/project_1.png",
  },
  {
    titleKo: "포르투갈 골든비자 정책이 부동산 가격에 미친 영향",
    titlePt:
      "Impacto da política de Golden Visa nos preços imobiliários em Portugal",
    descriptionKo: `포르투갈의 골든비자 정책은 외국 자본을 도시 핵심 지역으로 집중시키며 부동산 가격을 급격히 상승시킨 대표적 사례입니다.
조사 과정에서 외국인 투자 확대가 지역 주민의 주거 접근성을 약화시키고, 도시 중심부에서의 인구 교체와 기능 변화가 가속화되는 글로벌형 젠트리피케이션으로 이어진다는 점을 확인했습니다.
또한 한국의 규제 중심 부동산 정책과 비교했을 때, 포르투갈은 투자 유치의 부작용이 도시 불평등으로 직결되는 구조적 취약성을 갖고 있으며, 이는 주거 안정성과 도시 지속가능성을 동시에 고민해야 함을 시사합니다.`,
    descriptionPt: `A política de Golden Visa em Portugal concentrou capital estrangeiro nas áreas centrais das cidades, impulsionando fortemente os preços imobiliários.
A pesquisa mostrou que a ampliação do investimento externo reduz o acesso à moradia para residentes locais e acelera a substituição populacional e funcional dos centros urbanos — uma forma de gentrificação em escala global.
Comparada à política imobiliária mais regulatória da Coreia, a experiência portuguesa revela uma vulnerabilidade estrutural: os efeitos colaterais da atração de capital são rapidamente convertidos em desigualdade urbana, exigindo respostas que conciliem investimento, estabilidade habitacional e sustentabilidade urbana.`,
    image: "/uploads/project_4.png",
  },
]

export function Projects() {
  const [lang, setLang] = useState<SiteLang>(getInitialLang)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as SiteLang
      setLang(detail)
    }
    if (typeof window !== "undefined") {
      setLang(getInitialLang())
      window.addEventListener("site-lang-change", handler as EventListener)
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("site-lang-change", handler as EventListener)
      }
    }
  }, [])

  const isPT = lang === "pt"

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {isPT ? "Projetos" : "프로젝트"}
        </h1>
        <p className="text-gray-500 text-sm">
          {isPT
            ? "Pesquisas e apresentações sobre cidades, habitação e políticas urbanas."
            : "도시, 주거, 부동산·도시 정책을 다룬 연구와 발표 작업들입니다."}
        </p>
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
