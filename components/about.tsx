"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Search,
  Heart,
  Coffee,
  Book,
  Plus,
  X,
  Settings,
  Calendar,
  Building,
  User,
  Trophy,
  Sparkles,
  Brain,
  Code,
  Database,
  Palette,
  Megaphone,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Cpu,
  Layers,
  Package,
  Server,
  Smartphone,
  Monitor,
  Wifi,
  Cloud,
  Lock,
  Key,
  Eye,
  Filter,
  Edit,
  FileText,
  FolderOpen,
  GitBranch,
  Hash,
  Inbox,
  Send,
  MessageSquare,
  Music,
  Camera,
  Video,
  Mic,
  Volume2,
  Headphones,
  Radio,
  Shield,
} from "lucide-react"

import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"
import { useLanguage } from "@/contexts/language-context"

// -------------------------------------------------------------
// 🔥 포르투갈어 텍스트 (Hero 버튼 누르면 이것만 적용됨)
// -------------------------------------------------------------
const PT = {
  title: "Sobre",
  subtitle:
    "Apresente sua formação, experiências e como você enxerga cidade, espaço e pessoas.",
  skillsTitle: "Competências principais",
  hobbiesTitle: "Hobbies & interesses",
  storyTitle: "Minha história",

  experience: [
    "Graduação em Estudos Portugueses e Brasileiros | 3º ano",
    "Intercâmbio focado em língua, cultura e pesquisa sobre cidade e mercado imobiliário",
    "Certificação para aprofundar o entendimento de finanças imobiliárias e urbanas",
    "Certificação de proficiência em língua portuguesa",
    "Experiência como mentora no clube do curso, apoiando estudantes mais novos em estudos, carreira e intercâmbio.",
  ],

  skillsTitleList: [
    "Pesquisa urbana e imobiliária em perspectiva internacional",
    "Compreensão de políticas urbanas e imobiliárias",
    "Especialização regional em Brasil e países lusófonos",
  ],
  skillsDescList: [
    "Compara estruturas urbanas e problemas habitacionais de diferentes países, como Brasil e Europa.",
    "Analisa como habitação, renovação urbana, desenvolvimento e infraestrutura impactam a cidade.",
    "Interpreta políticas, problemas urbanos e dados de mercado em português, com foco no contexto brasileiro.",
  ],

  story: [
    "Comecei estudando língua, cultura e modos de vida nas aulas de Estudos Portugueses e Brasileiros.",
    "Mas, quando tentei entender as estruturas da cidade e do mercado imobiliário, percebi limites que meu curso sozinho não conseguia explicar completamente.",
    "Para aprender uma outra 'linguagem' da cidade e do espaço, entrei na área de estudos imobiliários. No começo, os termos técnicos e conceitos eram desafiadores, mas esse processo trouxe mudanças importantes.",
    "Ainda tenho muito o que aprender. Não consigo explicar a cidade por completo, nem afirmar que entendo todos os mecanismos do mercado imobiliário. Mas, justamente por reconhecer essas lacunas, passei a observar com mais cuidado, fazer mais perguntas e ler a cidade em várias camadas.",
    "Daqui para frente, quero unir português, estudos urbanos e finanças imobiliárias em um único eixo — tornando-me alguém capaz de ler a cidade simultaneamente pela linguagem, pelo capital e pelas políticas públicas.",
  ],
}

const SKILL_META = {
  ko: [
    "도구: 지도, 통계, 정책 리포트",
    "접근법: 사례 비교, 리스크 분석",
    "기반: 포르투갈어 1차 자료 해석",
  ],
  pt: [
    "Ferramentas: mapas, estatísticas, relatórios de políticas públicas",
    "Abordagem: comparação de casos e análise de risco",
    "Base: leitura de fontes primárias em português",
  ],
}

// 아이콘 목록
const ICONS: Record<string, any> = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  award: Award,
  globe: Globe,
  search: Search,
  heart: Heart,
  coffee: Coffee,
  book: Book,
  building: Building,
  calendar: Calendar,
  user: User,
  trophy: Trophy,
  sparkles: Sparkles,
  brain: Brain,
  code: Code,
  database: Database,
  palette: Palette,
  megaphone: Megaphone,
  barChart: BarChart3,
  lineChart: LineChart,
  pieChart: PieChart,
  activity: Activity,
  cpu: Cpu,
  layers: Layers,
  package: Package,
  server: Server,
  smartphone: Smartphone,
  monitor: Monitor,
  wifi: Wifi,
  cloud: Cloud,
  lock: Lock,
  key: Key,
  eye: Eye,
  filter: Filter,
  edit: Edit,
  fileText: FileText,
  folderOpen: FolderOpen,
  gitBranch: GitBranch,
  hash: Hash,
  inbox: Inbox,
  send: Send,
  messageSquare: MessageSquare,
  music: Music,
  camera: Camera,
  video: Video,
  mic: Mic,
  volume: Volume2,
  headphones: Headphones,
  radio: Radio,
  shield: Shield,
}

// -------------------------------------------------------------
// 🔥 기본 데이터
// -------------------------------------------------------------
const DEFAULT = {
  title: "소개",
  subtitle: "당신의 전문성과 열정을 소개해주세요.",
  background: { image: "", video: "", color: "", opacity: 0.1 },

  experienceCards: [
    {
      icon: "briefcase",
      title: "단국대학교",
      period: "2023.03 ~ 2027.02 (예정)",
      description: "포르투갈·브라질학 전공 | 3학년",
    },
    {
      icon: "graduation",
      title: "포르투갈 교환학생",
      period: "2024.02 ~ 2024.07",
      description: "언어·문화 + 도시/부동산 리서치 기반 탐색",
    },
    {
      icon: "award",
      title: "투자자산운용사",
      period: "2025년 제43회 합격",
      description: "부동산/도시 금융 이해를 위한 자격 취득",
    },
    {
      icon: "award",
      title: "FLEX (Foreign Language Examination)",
      period: "2023-2",
      description: "포르투갈어 전문성 인증",
    },
    {
      icon: "user",
      title: "학과 동아리 멘토",
      period: "2024-2~",
      description: "학업·전공·교환 준비 멘토링 진행",
    },
  ],

  skills: [
    {
      icon: "globe",
      title: "국제적 관점의 도시·부동산 연구",
      description:
        "브라질·유럽 등 다양한 국가의 도시 구조와 주거 문제를 비교·분석합니다.",
    },
    {
      icon: "search",
      title: "부동산 및 도시 정책 이해",
      description:
        "주거, 재생, 개발, 인프라 등 도시를 둘러싼 구조와 정책의 영향을 함께 살펴봅니다.",
    },
    {
      icon: "lightbulb",
      title: "지역 전문성",
      description:
        "브라질 현지 정책, 도시 문제, 시장 자료를 포르투갈어 기반으로 해석·정리합니다.",
    },
  ],

  storyTitle: "나의 이야기",
  story: [
    "저는 포르투갈·브라질학과에서 언어와 문화, 그리고 사람의 생활방식을 먼저 배웠습니다.",
    "하지만 도시와 부동산의 구조를 이해하려 할 때 제 전공만으로는 설명하기 어려운 지점들이 생겼습니다.",
    "그래서 부동산학이라는 또 다른 ‘도시의 언어’를 배우기 시작했습니다.",
    "여전히 부족하지만, 그 부족함이 저를 더 깊게 관찰하고 질문하게 만들었습니다.",
    "앞으로는 포르투갈어·도시 연구·부동산 금융을 묶어 도시를 ‘언어·자본·정책’으로 읽는 사람이 되고자 합니다.",
  ],

  storyImage: "",
  hobbies: ["✈️ 여행"],
}

// -------------------------------------------------------------
// 🔥 COMPONENT
// -------------------------------------------------------------
export function About() {
  const { getData, saveData, isEditMode } = useInlineEditor()
  const { lang } = useLanguage()
  const isPT = lang === "pt"

  const [info, setInfo] = useState(DEFAULT)
  const [bg, setBg] = useState(DEFAULT.background)

  // 저장 데이터 불러오기
  useEffect(() => {
    const saved = getData("about-info")
    if (saved) setInfo({ ...DEFAULT, ...saved })

    const savedBg = getData("about-background")
    if (savedBg) setBg(savedBg)
  }, [getData, isEditMode])

  // 언어 전환 적용
  useEffect(() => {
    if (isPT) {
      setInfo((prev) => ({
        ...prev,
        title: PT.title,
        subtitle: PT.subtitle,
        storyTitle: PT.storyTitle,
        experienceCards: prev.experienceCards.map((c, i) => ({
          ...c,
          description: PT.experience[i] || c.description,
        })),
        skills: prev.skills.map((s, i) => ({
          ...s,
          title: PT.skillsTitleList[i] || s.title,
          description: PT.skillsDescList[i] || s.description,
        })),
        story: PT.story,
      }))
    } else {
      // 한국어로 복구
      setInfo(DEFAULT)
    }
  }, [isPT])

  const update = (key: string, val: any) => {
    const newInfo = { ...info, [key]: val }
    setInfo(newInfo)
    saveData("about-info", newInfo)
  }

  return (
    <EditableBackground
      image={bg.image}
      video={bg.video}
      color={bg.color}
      opacity={bg.opacity}
      onChange={(d) => {
        const newBg = { ...bg, ...d }
        setBg(newBg)
        saveData("about-background", newBg)
      }}
      storageKey="about-background"
      className="py-20"
    >
      <section id="about" className="max-w-6xl mx-auto px-6">

        {/* ===== 제목 / 소개 ===== */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            <EditableText
              value={info.title}
              onChange={(v) => update("title", v)}
              storageKey="about-title"
            />
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            <EditableText
              value={info.subtitle}
              onChange={(v) => update("subtitle", v)}
              storageKey="about-subtitle"
              multiline
            />
          </p>
        </div>

        {/* ===== 경험 카드 ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {info.experienceCards.map((card, i) => {
            const Icon = ICONS[card.icon] || Briefcase

            return (
              <Card key={i} className="shadow-md relative">
                <CardContent className="p-6">
                  {isEditMode && (
                    <button
                      onClick={() =>
                        update(
                          "experienceCards",
                          info.experienceCards.filter((_, idx) => idx !== i),
                        )
                      }
                      className={COMMON_STYLES.deleteButton}
                    >
                      <X className={COMMON_STYLES.deleteIcon} />
                    </button>
                  )}

                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        <EditableText
                          value={card.title}
                          onChange={(v) => {
                            const arr = [...info.experienceCards]
                            arr[i].title = v
                            update("experienceCards", arr)
                          }}
                          storageKey={`exp-title-${i}`}
                        />
                      </h3>

                      <p className="text-sm text-primary mb-1">
                        <EditableText
                          value={card.period}
                          onChange={(v) => {
                            const arr = [...info.experienceCards]
                            arr[i].period = v
                            update("experienceCards", arr)
                          }}
                          storageKey={`exp-period-${i}`}
                        />
                      </p>

                      <p className="text-sm text-muted-foreground">
                        <EditableText
                          value={card.description}
                          onChange={(v) => {
                            const arr = [...info.experienceCards]
                            arr[i].description = v
                            update("experienceCards", arr)
                          }}
                          storageKey={`exp-desc-${i}`}
                        />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ===== 핵심 역량 ===== */}
        <h3 className="text-2xl font-bold text-center mb-10">
          {isPT ? PT.skillsTitle : "핵심 역량"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {info.skills.map((s, i) => {
            const Icon = ICONS[s.icon] || Trophy
            return (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                <h4 className="font-semibold">
                  <EditableText
                    value={s.title}
                    onChange={(v) => {
                      const arr = [...info.skills]
                      arr[i].title = v
                      update("skills", arr)
                    }}
                    storageKey={`skill-title-${i}`}
                  />
                </h4>

                <p className="text-muted-foreground text-sm">
                  <EditableText
                    value={s.description}
                    onChange={(v) => {
                      const arr = [...info.skills]
                      arr[i].description = v
                      update("skills", arr)
                    }}
                    storageKey={`skill-desc-${i}`}
                    multiline
                  />
                </p>

                <p className="text-xs text-muted-foreground/80">
                  {isPT ? SKILL_META.pt[i] : SKILL_META.ko[i]}
                </p>
              </div>
            )
          })}
        </div>

        {/* ===== 자기소개 (스토리) ===== */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">{info.storyTitle}</h3>

              {info.story.map((p, i) => (
                <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
                  <EditableText
                    value={p}
                    onChange={(v) => {
                      const arr = [...info.story]
                      arr[i] = v
                      update("story", arr)
                    }}
                    storageKey={`story-${i}`}
                    multiline
                  />
                </p>
              ))}
            </div>

            <EditableMedia
              src={info.storyImage}
              onChange={(src) => update("storyImage", src)}
              type="image"
              storageKey="about-storyImage"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ===== 취미 ===== */}
        <h3 className="text-2xl font-bold text-center mt-20 mb-6">
          {isPT ? PT.hobbiesTitle : "취미 & 관심사"}
        </h3>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {info.hobbies.map((h, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm"
            >
              <EditableText
                value={h}
                onChange={(v) => {
                  const arr = [...info.hobbies]
                  arr[i] = v
                  update("hobbies", arr)
                }}
                storageKey={`hobby-${i}`}
              />
            </span>
          ))}
        </div>
      </section>
    </EditableBackground>
  )
}
