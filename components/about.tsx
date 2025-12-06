"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { X, Settings, Plus, Briefcase, GraduationCap, Award } from "lucide-react"

// 포르투갈어 번역본
const ABOUT_PT = {
  title: "Sobre Mim",
  subtitle:
    "Apresento minha trajetória, perspectivas e áreas de especialização.",
  experience: [
    {
      title: "Universidade Dankook",
      period: "Mar 2023 ~ Fev 2027 (previsto)",
      description: "Graduação em Estudos Portugueses e Brasileiros",
    },
    {
      title: "Intercâmbio em Portugal",
      period: "Fev 2024 ~ Jul 2024",
      description: "Universidade de Coimbra",
    },
    {
      title: "Certificação em Investimentos",
      period: "43ª edição, 2025",
      description: "Certificação de Gestor de Ativos",
    },
    {
      title: "FLEX — Exame de Língua Estrangeira",
      period: "2023-2",
      description: "Certificação de proficiência",
    },
  ],
  skills: [
    {
      title: "Pesquisa urbana com perspectiva internacional",
      description:
        "Analiso estruturas urbanas e questões habitacionais em países como Brasil, Portugal e França.",
    },
    {
      title: "Compreensão de políticas imobiliárias",
      description:
        "Estudo habitação, reabilitação urbana, infraestrutura e o impacto das políticas sobre as cidades.",
    },
    {
      title: "Especialização regional",
      description:
        "Interpreto políticas, dados e problemas urbanos do Brasil com base no idioma e nas fontes locais.",
    },
  ],
  storyTitle: "Minha História",
  story: [
    "Estudei a língua, cultura e formas de viver das pessoas no Departamento de Estudos Portugueses e Brasileiros.",
    "Ao observar cidades e estruturas urbanas, percebi limites que não poderiam ser explicados apenas pelo meu campo original.",
    "Isso me levou a ingressar no estudo de mercado imobiliário e planejamento urbano.",
    "Ainda estou aprendendo e evoluindo, mas observo as cidades com mais profundidade e curiosidade do que antes.",
  ],
  hobbies: ["✈️ Viagens"],
}

// 한국어 기본 데이터
const ABOUT_KO = {
  title: "소개",
  subtitle: "당신의 전문성과 열정을 소개해주세요.",
}

export function About() {
  const { getData, saveData, isEditMode } = useInlineEditor()

  // Hero에서 저장한 global 언어 값 읽기
  const [lang, setLang] = useState<"ko" | "pt">("ko")

  useEffect(() => {
    const storedLang = localStorage.getItem("global-lang")
    if (storedLang === "pt" || storedLang === "ko") {
      setLang(storedLang)
    }
  }, [])

  // ===== 기본 About 정보 =====
  const defaultInfo = {
    experienceCards: [
      { icon: "briefcase", title: "단국대학교", period: "2023.03~2027.02 예정", description: "포르투갈·브라질학 전공" },
      { icon: "graduation", title: "포르투갈 교환학생", period: "2024.02~07", description: "University of Coimbra" },
      { icon: "award", title: "투자자산운용사", period: "2025년 제43회", description: "자격증 합격" },
      { icon: "award", title: "FLEX", period: "2023-2", description: "외국어시험 인증" },
    ],
    skills: [
      { icon: "globe", title: "국제적 관점의 도시·부동산 연구", description: "브라질·유럽 도시 구조 및 주거 문제 비교 분석" },
      { icon: "search", title: "부동산 및 도시 정책 이해", description: "주거·재생·개발·인프라 정책의 구조적 의미 분석" },
      { icon: "lightbulb", title: "지역 전문성", description: "브라질 정책·시장 자료를 포르투갈어 기반으로 분석" },
    ],
    storyTitle: "나의 이야기",
    story: [
      "포르투갈·브라질학을 통해 언어와 문화를 배웠습니다.",
      "도시 문제를 보며 기존 전공만으로 설명되지 않는 영역을 발견했습니다.",
      "이에 부동산·도시 연구 분야로 관심이 확장되었습니다.",
      "도시는 계속 배워야 하는 복합적인 존재임을 깨달았습니다.",
    ],
    hobbies: ["✈️ 여행"],
    storyImage: "",
  }

  const [info, setInfo] = useState(defaultInfo)
  const [bg, setBg] = useState({ image: "", video: "", color: "", opacity: 0.1 })

  // 저장된 데이터 로드
  useEffect(() => {
    const saved = getData("about-info")
    if (saved) setInfo({ ...defaultInfo, ...saved })

    const savedBg = getData("about-background")
    if (savedBg) setBg(savedBg)
  }, [isEditMode])

  // ===== 표시용 데이터 (한국어/포르투갈어 자동 전환) =====
  const isPT = !isEditMode && lang === "pt"

  const displayTitle = isPT ? ABOUT_PT.title : ABOUT_KO.title
  const displaySubtitle = isPT ? ABOUT_PT.subtitle : ABOUT_KO.subtitle
  const displayExperience = isPT ? ABOUT_PT.experience : info.experienceCards
  const displaySkills = isPT ? ABOUT_PT.skills : info.skills
  const displayStoryTitle = isPT ? ABOUT_PT.storyTitle : info.storyTitle
  const displayStory = isPT ? ABOUT_PT.story : info.story
  const displayHobbies = isPT ? ABOUT_PT.hobbies : info.hobbies

  // 간단한 업데이트 기능
  const updateInfo = (key: string, value: any) => {
    const newInfo = { ...info, [key]: value }
    setInfo(newInfo)
    saveData("about-info", newInfo)
  }

  return (
    <EditableBackground
      image={bg.image}
      video={bg.video}
      color={bg.color}
      opacity={bg.opacity}
      onChange={(b) => {
        const newBg = { ...bg, ...b }
        setBg(newBg)
        saveData("about-background", newBg)
      }}
      storageKey="about-background"
      className="py-20"
    >
      <section id="about" className="max-w-6xl mx-auto px-4">

        {/* 제목 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <EditableText
              value={displayTitle}
              onChange={(v) => updateInfo("title", v)}
              storageKey="about-title"
            />
          </h2>

          <p className="text-muted-foreground mt-2">
            <EditableText
              value={displaySubtitle}
              onChange={(v) => updateInfo("subtitle", v)}
              storageKey="about-subtitle"
            />
          </p>
        </div>

        {/* ===== 경험 카드 ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayExperience.map((item, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <h3 className="font-semibold">
                  <EditableText
                    value={item.title}
                    onChange={(v) => updateInfo("experienceCards", info.experienceCards)}
                    storageKey={`exp-title-${i}`}
                  />
                </h3>
                <p className="text-sm text-primary mt-1">
                  <EditableText
                    value={item.period}
                    onChange={(v) => updateInfo("experienceCards", info.experienceCards)}
                    storageKey={`exp-period-${i}`}
                  />
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <EditableText
                    value={item.description}
                    onChange={(v) => updateInfo("experienceCards", info.experienceCards)}
                    storageKey={`exp-desc-${i}`}
                  />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===== 스킬 ===== */}
        <h3 className="text-2xl font-bold mb-6 text-center">핵심 역량</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {displaySkills.map((skill, i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold mb-2">
                  <EditableText
                    value={skill.title}
                    onChange={(v) => updateInfo("skills", info.skills)}
                    storageKey={`skill-title-${i}`}
                  />
                </h4>
                <p className="text-sm text-muted-foreground">
                  <EditableText
                    value={skill.description}
                    onChange={(v) => updateInfo("skills", info.skills)}
                    storageKey={`skill-desc-${i}`}
                  />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===== 이야기 ===== */}
        <div className="bg-card rounded-xl shadow-lg p-8 grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <EditableText
                value={displayStoryTitle}
                onChange={(v) => updateInfo("storyTitle", v)}
                storageKey="story-title"
              />
            </h3>

            {displayStory.map((p, i) => (
              <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                <EditableText
                  value={p}
                  onChange={(v) => updateInfo("story", info.story)}
                  storageKey={`story-${i}`}
                  multiline
                />
              </p>
            ))}
          </div>

          <EditableMedia
            src={info.storyImage}
            onChange={(src) => updateInfo("storyImage", src)}
            type="image"
            storageKey="about-image"
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>

        {/* ===== 취미 ===== */}
        <h3 className="text-2xl font-bold mb-4 text-center">취미 & 관심사</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {displayHobbies.map((hobby, i) => (
            <span key={i} className="px-4 py-2 bg-primary/10 text-primary rounded-full">
              {hobby}
            </span>
          ))}
        </div>
      </section>
    </EditableBackground>
  )
}
