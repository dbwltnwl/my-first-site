"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  School,
  Globe,
  Search,
  Lightbulb,
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

type SiteLang = "ko" | "pt"

const getInitialLang = (): SiteLang => {
  if (typeof window === "undefined") return "ko"
  const stored = window.localStorage.getItem("site-lang")
  return stored === "pt" ? "pt" : "ko"
}

type AboutInfo = {
  title: string
  subtitle: string
  story1: string
  story2: string
  story3: string
  story4: string
  storyImage: string
}

const defaultInfo: AboutInfo = {
  title: "소개",
  subtitle: "언어와 도시, 그리고 사람의 생활 방식을 함께 바라보며 공간을 이해합니다.",
  story1:
    "저는 포르투갈·브라질학과에서 언어와 문화, 그리고 사람의 생활방식을 먼저 배웠습니다. 언어를 통해 사람들의 일상, 관계, 세계를 바라보는 시각이 조금씩 열렸고, 자연스럽게 그들이 살아가는 ‘공간’에 대한 관심으로 이어졌습니다.",
  story2:
    "하지만 도시와 부동산의 구조를 이해하려 할 때 제 전공만으로는 설명하기 어려운 지점들이 보이기 시작했습니다. 같은 장소를 보더라도, 언어와 문화의 관점만으로는 읽히지 않는 층위들이 있다는 걸 깨닫게 되었고, 그 지점을 이해하기 위해 부동산학이라는 새로운 언어를 배우기 시작했습니다.",
  story3:
    "처음에는 낯선 용어와 개념들에 부딪히며 시행착오도 많았지만, 그 과정에서 도시를 보는 제 시야가 조금씩 달라졌습니다. 한 도시의 가격 구조, 정책, 재생 전략을 함께 보면서, ‘사람이 어떻게 살아가는가’와 ‘도시가 어떻게 작동하는가’를 동시에 연결해 이해하려고 노력하고 있습니다.",
  story4:
    "물론 저는 여전히 도시와 부동산을 완벽하게 설명할 수 있는 단계는 아닙니다. 하지만 이런 부족함 때문에 멈추기보다는, 더 깊이 관찰하고 더 많이 질문하며, 도시를 구성하는 여러 층위를 천천히 읽어나가고 있습니다. 이 포트폴리오는 그런 시도들의 기록입니다.",
  storyImage: "",
}

// 포르투갈어 버전 텍스트
const ABOUT_PT = {
  title: "Sobre mim",
  subtitle:
    "Estudo línguas, cidades e formas de vida urbana para compreender como o espaço é produzido.",
  story1:
    "Sou estudante do Departamento de Português e Estudos Brasileiros. A partir da língua e da cultura, comecei a observar o cotidiano, as relações e as formas de viver das pessoas, e isso naturalmente me levou a me interessar pelos espaços em que elas habitam.",
  story2:
    "Quando tentei entender as estruturas das cidades e do mercado imobiliário, percebi que apenas a minha formação em língua e cultura não era suficiente. Havia camadas da cidade que não se explicavam apenas pela dimensão cultural, e por isso comecei a aprender uma nova linguagem: a do mercado imobiliário e das políticas urbanas.",
  story3:
    "No início, muitos conceitos e termos eram estranhos, mas esse processo mudou pouco a pouco a forma como enxergo a cidade. Tenho buscado conectar preços, políticas, projetos de renovação urbana e formas de moradia para entender, ao mesmo tempo, como as pessoas vivem e como a cidade funciona.",
  story4:
    "Ainda estou longe de explicar completamente a cidade ou o mercado imobiliário. Mas, em vez de parar por causa dessa falta, escolhi observar com mais calma, fazer mais perguntas e ler lentamente as múltiplas camadas que compõem o espaço urbano. Este portfólio é um registro dessas tentativas.",
}

export function About() {
  const { getData, saveData, isEditMode } = useInlineEditor()

  const [lang, setLang] = useState<SiteLang>(getInitialLang)
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(defaultInfo)
  const [backgroundData, setBackgroundData] = useState<{
    image: string
    video: string
    color: string
    opacity: number
  }>({
    image: "",
    video: "",
    color: "",
    opacity: 0.1,
  })

  const isPT = lang === "pt"

  useEffect(() => {
    const savedData = getData("about-info") as
      | (Partial<AboutInfo> & { background?: any })
      | null
    if (savedData) {
      setAboutInfo({ ...defaultInfo, ...savedData })
      if (savedData.background) {
        setBackgroundData(savedData.background as any)
      }
    }
    const savedBg = getData("about-background") as
      | { image: string; video: string; color: string; opacity: number }
      | null
    if (savedBg) setBackgroundData(savedBg)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode])

  const updateAboutInfo = (key: keyof AboutInfo, value: string) => {
    const newInfo = { ...aboutInfo, [key]: value }
    setAboutInfo(newInfo)
    saveData("about-info", newInfo)
  }

  const titleText = isPT ? ABOUT_PT.title : aboutInfo.title
  const subtitleText = isPT ? ABOUT_PT.subtitle : aboutInfo.subtitle

  const story1 = isPT ? ABOUT_PT.story1 : aboutInfo.story1
  const story2 = isPT ? ABOUT_PT.story2 : aboutInfo.story2
  const story3 = isPT ? ABOUT_PT.story3 : aboutInfo.story3
  const story4 = isPT ? ABOUT_PT.story4 : aboutInfo.story4

  return (
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const newData = { ...backgroundData, ...data }
        setBackgroundData(newData)
        saveData("about-background", newData)

        const updated = { ...aboutInfo, background: newData as any }
        saveData("about-info", updated)
      }}
      storageKey="about-background"
      className="py-20 bg-muted/30 relative"
    >
      <section id="about" className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 섹션 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <EditableText
                value={titleText}
                onChange={(value) => updateAboutInfo("title", value)}
                storageKey="about-title"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <EditableText
                value={subtitleText}
                onChange={(value) => updateAboutInfo("subtitle", value)}
                storageKey="about-subtitle"
                multiline
              />
            </p>
          </div>

          {/* 경험 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* 단국대학교 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <School className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {isPT ? "Universidade Dankook" : "단국대학교"}
                    </h3>
                    <p className="text-sm text-primary mb-1">
                      {isPT
                        ? "03.2023 ~ 02.2027 (previsto)"
                        : "2023.03 ~ 2027.02 (예정)"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isPT
                        ? "Graduação em Português e Estudos Brasileiros"
                        : "포르투갈·브라질학 전공"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 포르투갈 교환학생 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {isPT ? "Intercâmbio em Portugal" : "포르투갈 교환학생"}
                    </h3>
                    <p className="text-sm text-primary mb-1">
                      {isPT ? "02.2024 ~ 07.2024" : "2024.02 ~ 2024.07"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      University of Coimbra
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 투자자산운용사 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {isPT ? "Gestor de Investimentos" : "투자자산운용사"}
                    </h3>
                    <p className="text-sm text-primary mb-1">
                      {isPT ? "Aprovada no 43º exame (2025)" : "2025년 제43회 합격"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isPT ? "Certificação de investimentos" : "금융투자자격시험"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FLEX */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      FLEX (Foreign Language EXamination)
                    </h3>
                    <p className="text-sm text-primary mb-1">
                      {isPT ? "2023-2" : "2023-2"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isPT
                        ? "Avaliação de proficiência em português"
                        : "포르투갈어 능력 평가"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 핵심 역량 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              {isPT ? "Competências principais" : "핵심 역량"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1 */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {isPT
                      ? "Pesquisa urbana e imobiliária em perspectiva internacional"
                      : "국제적 관점의 도시·부동산 연구"}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isPT
                      ? "Comparo estruturas urbanas e problemas habitacionais em países como Brasil e Europa."
                      : "브라질·유럽 등 다양한 국가의 도시 구조와 주거 문제를 비교·분석합니다."}
                  </p>
                </CardContent>
              </Card>

              {/* 2 */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {isPT
                      ? "Compreensão de políticas urbanas e imobiliárias"
                      : "부동산 및 도시 정책 이해"}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isPT
                      ? "Analiso habitação, regeneração urbana, desenvolvimento e infraestrutura como partes de um mesmo sistema."
                      : "주거, 재생, 개발, 인프라 등 도시를 둘러싼 구조와 정책의 영향을 함께 살펴봅니다."}
                  </p>
                </CardContent>
              </Card>

              {/* 3 */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {isPT ? "Especialização regional" : "지역 전문성"}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isPT
                      ? "Leio políticas, problemas urbanos e dados de mercado do Brasil a partir da língua portuguesa."
                      : "브라질 현지 정책, 도시 문제, 시장 자료를 포르투갈어 기반으로 해석·정리합니다."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 나의 이야기 */}
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
              {/* 텍스트 */}
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {isPT ? "Minha trajetória" : "나의 이야기"}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  <EditableText
                    value={story1}
                    onChange={(value) => updateAboutInfo("story1", value)}
                    storageKey="about-story-1"
                    multiline
                  />
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <EditableText
                    value={story2}
                    onChange={(value) => updateAboutInfo("story2", value)}
                    storageKey="about-story-2"
                    multiline
                  />
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <EditableText
                    value={story3}
                    onChange={(value) => updateAboutInfo("story3", value)}
                    storageKey="about-story-3"
                    multiline
                  />
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <EditableText
                    value={story4}
                    onChange={(value) => updateAboutInfo("story4", value)}
                    storageKey="about-story-4"
                    multiline
                  />
                </p>
              </div>

              {/* 이미지 */}
              <div className="relative w-full h-full min-h-[320px] lg:min-h-full">
                <EditableMedia
                  src={aboutInfo.storyImage}
                  onChange={(src) => updateAboutInfo("storyImage", src)}
                  type="image"
                  storageKey="about-storyImage"
                  className="w-full h-full object-cover"
                  alt="소개 이미지"
                  purpose="about-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </EditableBackground>
  )
}
