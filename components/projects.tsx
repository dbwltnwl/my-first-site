"use client"

import { useEffect, useState } from "react"

type ProjectItem = {
  title: string
  description: string
  image: string
}

// 한국어 버전 프로젝트 데이터
const PROJECTS_KO: ProjectItem[] = [
  {
    title: "브라질 파벨라 구역의 비공식 부동산 시장: '가격', '위험', '공간'",
    description: `파벨라는 브라질 도시의 비공식 정착지이지만, 내부적으로는 사회적 관계망과 위험 요인이 결합된 독자적인 가격 체계를 가진 시장입니다.
조사 과정에서 파벨라의 주거 가치는 법적 권리보다 안전성·네트워크·위험 비용이 더 강하게 영향을 미친다는 점을 발견했습니다.
이는 파벨라가 단순한 빈곤 주거지가 아니라, 공식 시장과는 다른 논리로 작동하는 자생적 부동산 시장임을 보여줍니다.`,
    image: "/uploads/project_3.png",
  },
  {
    title: "분당 정자동 아파트 지구 노후계획도시",
    description: `분당 정자동 아파트 지구의 노후화는 단순한 물리적 노후를 넘어, 초기 계획 도시의 구조적 한계가 표면화된 사례로 볼 수 있습니다.
조사 과정에서 주거 밀도·동선 체계·커뮤니티 공간의 취약성이 노후화와 함께 더욱 두드러졌으며, 이는 향후 재생 전략에서 기능 개선과 생활권 단위의 재구조화가 핵심 과제로 작용함을 확인했습니다.
본 분석은 정자동이 더 이상 ‘완성된 계획 도시’가 아니라, 변화된 생활 방식과 도시 수요에 맞춰 다시 설계되어야 하는 재구상(Reconfiguration)의 단계에 있음을 보여줍니다.`,
    image: "/uploads/project_2.png",
  },
  {
    title: "프랑스 사회주택의 HLM 정책",
    description: `프랑스의 사회주택(HLM) 체계는 단순한 저소득층 지원을 넘어, 도시 내 계층 혼합과 주거 안정성을 구조적으로 보장하기 위한 국가적 도시정책입니다.
발표에서는 HLM의 역사적 형성 배경, 공공·준공공 기관의 운영 구조, 임대료 규제 방식, 그리고 사회적 혼합(Mixité Sociale)을 구현하는 배분 원리를 중점적으로 분석했습니다.
이를 통해 프랑스 사회주택이 단순한 복지 수단이 아니라, 도시 불평등을 완화하고 공간적 균형을 조정하는 핵심 도시계획 도구로 작동한다는 점을 확인했습니다.`,
    image: "/uploads/project_1.png",
  },
  {
    title: "포르투갈 골든비자 정책이 부동산 가격에 미친 영향",
    description: `포르투갈의 골든비자 정책은 외국 자본을 도시 핵심 지역으로 집중시키며 부동산 가격을 급격히 상승시킨 대표적 사례입니다.
조사 과정에서 외국인 투자 확대가 지역 주민의 주거 접근성을 약화시키고, 도시 중심부에서의 인구 교체와 기능 변화가 가속화되는 글로벌형 젠트리피케이션으로 이어진다는 점을 확인했습니다.
또한 한국의 규제 중심 부동산 정책과 비교했을 때, 포르투갈은 투자 유치의 부작용이 도시 불평등으로 직결되는 구조적 취약성을 갖고 있으며, 이는 주거 안정성과 도시 지속가능성을 동시에 고민해야 함을 시사합니다.`,
    image: "/uploads/project_4.png",
  },
]

// 포르투갈어 버전 프로젝트 데이터
const PROJECTS_PT: ProjectItem[] = [
  {
    title: "Mercado imobiliário informal nas favelas brasileiras: ‘preço’, ‘risco’ e ‘espaço’",
    description: `As favelas são assentamentos informais nas cidades brasileiras, mas internamente funcionam como um mercado próprio, onde preços são formados pela combinação de redes sociais, risco e segurança.
Na pesquisa, observei que o valor residencial nas favelas é mais influenciado por segurança, vínculos locais e custo do risco do que por direitos legais de propriedade.
Isso mostra que a favela não é apenas um espaço de pobreza, mas um mercado imobiliário autônomo que opera com lógicas diferentes do mercado formal.`,
    image: "/uploads/project_3.png",
  },
  {
    title: "Envelhecimento urbano no distrito residencial de Jeongja, Bundang",
    description: `O envelhecimento do distrito de apartamentos em Jeongja, Bundang, revela não só a deterioração física, mas também limites estruturais do modelo de cidade planejada inicial.
A análise mostrou que densidade residencial, fluxos de circulação e fragilidade dos espaços comunitários tornam-se ainda mais visíveis com o tempo, exigindo estratégias de requalificação focadas em funcionalidade e reestruturação em escala de bairro.
Jeongja deixa de ser uma “cidade planejada acabada” e passa a ser um território em fase de reconfiguração, que precisa ser redesenhado de acordo com novos modos de vida e demandas urbanas.`,
    image: "/uploads/project_2.png",
  },
  {
    title: "Política de habitação social na França: o sistema HLM",
    description: `O sistema de habitação social (HLM) na França vai além do apoio a baixa renda: é um instrumento de política urbana voltado à mistura social e à estabilidade habitacional.
Na apresentação, analisei a formação histórica do HLM, a estrutura de gestão por instituições públicas e paraestatais, mecanismos de regulação de aluguel e critérios de distribuição voltados à mixité sociale.
Isso evidencia que a habitação social francesa não é apenas uma política de bem-estar, mas um dispositivo central de planejamento urbano que busca reduzir desigualdades e equilibrar o espaço urbano.`,
    image: "/uploads/project_1.png",
  },
  {
    title: "Impactos da política de Golden Visa no mercado imobiliário em Portugal",
    description: `A política de Golden Visa em Portugal concentrou capital estrangeiro em áreas centrais das cidades, gerando forte valorização imobiliária.
Na pesquisa, identifiquei que a expansão do investimento estrangeiro reduziu o acesso de moradores locais à habitação, acelerando substituição populacional e transformação funcional nos centros urbanos — um padrão de gentrificação em escala global.
Comparado ao modelo regulatório da Coreia, o caso português mostra uma vulnerabilidade estrutural em que a atração de investimento se converte diretamente em desigualdade urbana, apontando para o desafio de conciliar estabilidade habitacional e sustentabilidade urbana.`,
    image: "/uploads/project_4.png",
  },
]

export function Projects() {
  const [lang, setLang] = useState<"ko" | "pt">("ko")

  // Hero에서 저장한 global-lang 읽어서 따라가기
  useEffect(() => {
    if (typeof window === "undefined") return

    const readLang = () => {
      const stored = window.localStorage.getItem("global-lang")
      if (stored === "ko" || stored === "pt") {
        setLang(stored)
      }
    }

    // 처음 한 번 읽고
    readLang()
    // 0.5초마다 global-lang 값 체크 (간단하지만 확실한 방법)
    const intervalId = window.setInterval(readLang, 500)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const isPT = lang === "pt"
  const projects = isPT ? PROJECTS_PT : PROJECTS_KO

  const heading = isPT ? "Projetos" : "프로젝트"
  const subtitle = isPT
    ? "Pesquisas e estudos sobre cidade, habitação e políticas urbanas."
    : "도시, 주거, 정책과 공간을 중심으로 한 프로젝트들입니다."

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{heading}</h1>
        <p className="text-gray-500 text-sm sm:text-base">{subtitle}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((item, idx) => (
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
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
