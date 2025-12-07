"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
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
  Star,
  Lightbulb,
  Target,
  Rocket,
  Shield,
  Sparkles,
  Code,
  Database,
  Palette,
  Megaphone,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Brain,
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
  Search,
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
  Zap,
  Globe,
  Users,
  TrendingUp,
  BookOpen,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Home,
  School,
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"

type SiteLang = "ko" | "pt"

function useSiteLang() {
  const [lang, setLang] = useState<SiteLang>("ko")

  useEffect(() => {
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

    window.addEventListener("site-lang-change", handler)
    return () => window.removeEventListener("site-lang-change", handler)
  }, [])

  return lang
}

// 경험 카드용 아이콘
const AVAILABLE_ICONS = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  award: Award,
  trophy: Trophy,
  star: Star,
  lightbulb: Lightbulb,
  target: Target,
  rocket: Rocket,
  shield: Shield,
  building: Building,
  calendar: Calendar,
  book: Book,
  heart: Heart,
  coffee: Coffee,
  user: User,
  zap: Zap,
  globe: Globe,
  users: Users,
  trending: TrendingUp,
  bookOpen: BookOpen,
  mapPin: MapPin,
  clock: Clock,
  check: CheckCircle,
  alert: AlertCircle,
  home: Home,
  school: School,
}

// 스킬용 아이콘
const SKILL_ICONS = {
  trophy: Trophy,
  sparkles: Sparkles,
  target: Target,
  rocket: Rocket,
  star: Star,
  zap: Zap,
  lightbulb: Lightbulb,
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
  search: Search,
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
  heart: Heart,
  shield: Shield,
  globe: Globe,
  users: Users,
}

// 🔹 포르투갈어 버전 텍스트
const ABOUT_PT_TEXT = {
  title: "Sobre mim",
  subtitle:
    "Apresento aqui minha formação, interesses e o caminho que estou construindo entre cidades, línguas e mercado imobiliário.",
  experience: [
    {
      title: "Universidade Dankook",
      period: "03.2023 ~ 02.2027 (previsto)",
      description: "Graduação em Português e Estudos Brasileiros",
    },
    {
      title: "Intercâmbio em Portugal",
      period: "02.2024 ~ 07.2024",
      description: "Universidade de Coimbra",
    },
    {
      title: "Certificado de Gestora de Investimentos",
      period: "43ª edição (2025)",
      description: "",
    },
    {
      title: "FLEX (Foreign Language EXamination)",
      period: "2023-2",
      description: "",
    },
  ],
  skills: [
    {
      title: "Pesquisa urbana e imobiliária em perspectiva internacional",
      description:
        "Comparo estruturas urbanas e problemas habitacionais em diferentes países.",
    },
    {
      title: "Compreensão de políticas urbanas e imobiliárias",
      description:
        "Analiso como habitação, requalificação, desenvolvimento e infraestrutura se articulam nas cidades.",
    },
    {
      title: "Especialização regional",
      description:
        "Interpreto políticas, questões urbanas e dados de mercado brasileiros com base em fontes em português.",
    },
  ],
  storyTitle: "Minha trajetória",
  story: [
    "Comecei estudando português, cultura e modos de vida em países lusófonos no curso de Estudos Portugueses e Brasileiros.",
    "Mas, ao tentar entender a estrutura das cidades e do mercado imobiliário, percebi que só o meu curso de origem não explicava todos os pontos que eu via na realidade.",
    "Para aprender uma nova “língua” que explicasse cidade e espaço, entrei na área de estudos imobiliários. No início, enfrentei muitos termos e conceitos desconhecidos, mas esse processo trouxe mudanças importantes na forma como observo o mundo urbano.",
    "Ainda tenho muito o que aprender. Não consigo explicar completamente a cidade nem entendo todos os mecanismos do mercado imobiliário. Mesmo assim, não paro por causa dessas faltas. Pelo contrário, elas me fazem observar com mais cuidado, fazer mais perguntas e ler, com calma, as várias camadas que compõem a cidade.",
  ],
  hobbiesTitle: "Interesses & hobbies",
}

export function About() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()
  const lang = useSiteLang()
  const isPT = !isEditMode && lang === "pt"

  // 기본 데이터 (한국어 버전)
  const defaultInfo = {
    title: "소개",
    subtitle: "당신의 전문성과 열정을 소개해주세요.",
    background: { image: "", video: "", color: "", opacity: 0.1 },
    experienceCards: [
      {
        icon: "briefcase",
        title: "단국대학교",
        period: "2023.03 ~ 2027.02 (예정)",
        description: "포르투갈·브라질학 전공",
      },
      {
        icon: "graduation",
        title: "포르투갈 교환학생",
        period: "2024.02 ~ 2024.07",
        description: "University of Coimbra",
      },
      {
        icon: "award",
        title: "투자자산운용사",
        period: "2025년 제43회 합격",
        description: "",
      },
      {
        icon: "award",
        title: "FLEX (Foreign Language EXamination)",
        period: "2023-2",
        description: "",
      },
    ],
    skills: [
      {
        icon: "globe",
        title: "국제적 관점의 도시·부동산 연구",
        description: "브라질·유럽 등 다양한 국가의 도시 구조와 주거 문제를 비교·분석합니다.",
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
      "하지만 도시와 부동산의 구조를 이해하려 할 때 제 전공만으로는 설명하기 어려운 지점들이 자연스럽게 보이기 시작했습니다.",
      "도시와 공간을 이해하는 또 하나의 언어를 배우기 위해 저는 부동산학이라는 영역에 발을 들였습니다. 처음에는 낯선 용어와 개념들에 부딪히며 시행착오도 많았지만, 그 과정에서 중요한 변화를 경험했습니다.",
      "물론 저는 여전히 부족한 점이 많습니다. 도시를 완벽하게 설명할 수 있는 것도 아니고, 부동산 시장의 모든 원리를 이해한 것도 아닙니다. 그러나 저는 이런 부족함 때문에 멈추지 않습니다. 오히려 더 깊이 관찰하고 더 많이 질문하며, 도시를 구성하는 여러 층위를 천천히 읽어나갈 수 있게 되었습니다.",
    ],
    storyImage: "",
    hobbies: ["✈️ 여행"],
  }

  const [aboutInfo, setAboutInfo] = useState(defaultInfo)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)
  const [showCareerModal, setShowCareerModal] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showHobbyModal, setShowHobbyModal] = useState(false)

  // 데이터 로드
  useEffect(() => {
    const savedData = getData("about-info") as typeof defaultInfo | null
    if (savedData) {
      setAboutInfo({ ...defaultInfo, ...savedData })
      if (savedData.background) {
        setBackgroundData(savedData.background as any)
      }
    }

    const savedBg = getData("about-background") as {
      image: string
      video: string
      color: string
      opacity: number
    } | null
    if (savedBg) {
      setBackgroundData(savedBg)
    }
  }, [getData, isEditMode])

  const updateAboutInfo = (key: keyof typeof defaultInfo, value: any) => {
    const newInfo = { ...aboutInfo, [key]: value }
    setAboutInfo(newInfo)
    saveData("about-info", newInfo)
  }

  const updateExperienceCard = (index: number, field: string, value: string) => {
    const newCards = [...aboutInfo.experienceCards]
    newCards[index] = { ...newCards[index], [field]: value }
    updateAboutInfo("experienceCards", newCards)
  }

  const addExperienceCard = () => {
    updateAboutInfo("experienceCards", [
      ...aboutInfo.experienceCards,
      {
        icon: "briefcase",
        title: "새 경험",
        period: "2024",
        description: "설명을 입력하세요",
      },
    ])
  }

  const removeExperienceCard = (index: number) => {
    updateAboutInfo(
      "experienceCards",
      aboutInfo.experienceCards.filter((_, i) => i !== index)
    )
  }

  const updateSkill = (index: number, field: string, value: string) => {
    const newSkills = [...aboutInfo.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    updateAboutInfo("skills", newSkills)
  }

  const addSkill = () => {
    updateAboutInfo("skills", [
      ...aboutInfo.skills,
      { icon: "star", title: "새 스킬", description: "스킬 설명" },
    ])
  }

  const removeSkill = (index: number) => {
    updateAboutInfo(
      "skills",
      aboutInfo.skills.filter((_, i) => i !== index)
    )
  }

  const updateStory = (index: number, value: string) => {
    const newStory = [...aboutInfo.story]
    newStory[index] = value
    updateAboutInfo("story", newStory)
  }

  const addStory = () => {
    updateAboutInfo("story", [...aboutInfo.story, "새로운 문단"])
  }

  const removeStory = (index: number) => {
    updateAboutInfo(
      "story",
      aboutInfo.story.filter((_, i) => i !== index)
    )
  }

  const updateHobby = (index: number, value: string) => {
    const newHobbies = [...aboutInfo.hobbies]
    newHobbies[index] = value
    updateAboutInfo("hobbies", newHobbies)
  }

  const addHobby = () => {
    updateAboutInfo("hobbies", [...aboutInfo.hobbies, "🎯 새 취미"])
  }

  const removeHobby = (index: number) => {
    updateAboutInfo(
      "hobbies",
      aboutInfo.hobbies.filter((_, i) => i !== index)
    )
  }

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

        const updatedAboutInfo = { ...aboutInfo, background: newData }
        setAboutInfo(updatedAboutInfo)
        saveData("about-info", updatedAboutInfo)
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
                value={isPT ? ABOUT_PT_TEXT.title : aboutInfo.title}
                onChange={(value) => updateAboutInfo("title", value)}
                storageKey="about-title"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <EditableText
                value={isPT ? ABOUT_PT_TEXT.subtitle : aboutInfo.subtitle}
                onChange={(value) => updateAboutInfo("subtitle", value)}
                storageKey="about-subtitle"
                multiline
              />
            </p>
          </div>

          {/* 경험 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {aboutInfo.experienceCards?.map((card, index) => {
              const Icon =
                AVAILABLE_ICONS[
                  card.icon as keyof typeof AVAILABLE_ICONS
                ] || Briefcase

              const ptExp = ABOUT_PT_TEXT.experience[index]

              const titleValue =
                isPT && ptExp ? ptExp.title : card.title
              const periodValue =
                isPT && ptExp ? ptExp.period : card.period
              const descValue =
                isPT && ptExp ? ptExp.description : card.description

              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative"
                >
                  <CardContent className="p-6">
                    {isEditMode && (
                      <button
                        onClick={() => removeExperienceCard(index)}
                        className={COMMON_STYLES.deleteButton}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          <EditableText
                            value={titleValue}
                            onChange={(value) =>
                              updateExperienceCard(index, "title", value)
                            }
                            storageKey={`about-experience-${index}-title`}
                          />
                        </h3>
                        <p className="text-sm text-primary mb-2">
                          <EditableText
                            value={periodValue}
                            onChange={(value) =>
                              updateExperienceCard(index, "period", value)
                            }
                            storageKey={`about-experience-${index}-period`}
                          />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <EditableText
                            value={descValue}
                            onChange={(value) =>
                              updateExperienceCard(
                                index,
                                "description",
                                value
                              )
                            }
                            storageKey={`about-experience-${index}-description`}
                          />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* 경험 카드 편집 버튼 */}
            {isEditMode && (
              <Card
                className="border-2 border-dashed border-muted-foreground/30 shadow-none hover:border-primary transition-all cursor-pointer"
                onClick={() => setShowCareerModal(true)}
              >
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      경험 카드 편집
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 핵심 역량 */}
          {(aboutInfo.skills.length > 0 || isEditMode) && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                {isPT ? "Competências principais" : "핵심 역량"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aboutInfo.skills.map((skill, index) => {
                  const Icon =
                    SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] ||
                    Trophy
                  const ptSkill = ABOUT_PT_TEXT.skills[index]

                  const skillTitle =
                    isPT && ptSkill ? ptSkill.title : skill.title
                  const skillDesc =
                    isPT && ptSkill
                      ? ptSkill.description
                      : skill.description

                  return (
                    <div key={index} className="text-center relative">
                      {isEditMode && (
                        <button
                          onClick={() => removeSkill(index)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        <EditableText
                          value={skillTitle}
                          onChange={(value) =>
                            updateSkill(index, "title", value)
                          }
                          storageKey={`about-skill-${index}-title`}
                        />
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        <EditableText
                          value={skillDesc}
                          onChange={(value) =>
                            updateSkill(index, "description", value)
                          }
                          storageKey={`about-skill-${index}-description`}
                          multiline
                        />
                      </p>
                    </div>
                  )
                })}
                {isEditMode && (
                  <div
                    className="text-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-primary transition-all"
                    onClick={() => setShowSkillModal(true)}
                  >
                    <div>
                      <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        스킬 편집
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 자기소개 상세 */}
          {(aboutInfo.story.length > 0 || isEditMode) && (
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    <EditableText
                      value={
                        isPT
                          ? ABOUT_PT_TEXT.storyTitle
                          : aboutInfo.storyTitle
                      }
                      onChange={(value) =>
                        updateAboutInfo("storyTitle", value)
                      }
                      storageKey="about-storyTitle"
                    />
                  </h3>
                  {aboutInfo.story.map((paragraph, index) => {
                    const ptPara = ABOUT_PT_TEXT.story[index]
                    const value =
                      isPT && ptPara ? ptPara : paragraph
                    return (
                      <div key={index} className="relative mb-4">
                        {isEditMode && (
                          <button
                            onClick={() => removeStory(index)}
                            className={COMMON_STYLES.deleteButton}
                          >
                            <X className={COMMON_STYLES.deleteIcon} />
                          </button>
                        )}
                        <p className="text-muted-foreground leading-relaxed">
                          <EditableText
                            value={value}
                            onChange={(v) => updateStory(index, v)}
                            storageKey={`about-story-${index}`}
                            multiline
                          />
                        </p>
                      </div>
                    )
                  })}
                  {isEditMode && (
                    <button
                      onClick={addStory}
                      className="mt-2 px-4 py-2 border border-dashed border-muted-foreground/30 rounded-lg hover:border-primary transition-all"
                    >
                      <Plus className="h-4 w-4 inline mr-2" />
                      문단 추가
                    </button>
                  )}
                </div>

                {/* 이미지 영역 */}
                <div className="relative w-full h-full min-h-[500px] lg:min-h-full">
                  <EditableMedia
                    src={aboutInfo.storyImage}
                    onChange={(src) =>
                      updateAboutInfo("storyImage", src)
                    }
                    type="image"
                    storageKey="about-storyImage"
                    className="w-full h-full object-cover"
                    alt="소개 이미지"
                    purpose="about-image"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 취미 & 관심사 */}
          {(aboutInfo.hobbies.length > 0 || isEditMode) && (
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                {isPT
                  ? ABOUT_PT_TEXT.hobbiesTitle
                  : "취미 & 관심사"}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {aboutInfo.hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm relative group flex items-center justify-center"
                  >
                    {isEditMode && (
                      <button
                        onClick={() => removeHobby(index)}
                        className={`${COMMON_STYLES.deleteButton} opacity-0 group-hover:opacity-100 transition-opacity`}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <EditableText
                      value={hobby}
                      onChange={(value) =>
                        updateHobby(index, value)
                      }
                      storageKey={`about-hobby-${index}`}
                    />
                  </span>
                ))}
                {isEditMode && (
                  <button
                    onClick={() => setShowHobbyModal(true)}
                    className="px-4 py-2 border border-dashed border-muted-foreground/30 rounded-full text-sm hover:border-primary transition-all"
                  >
                    <Settings className="h-4 w-4 inline mr-1" />
                    편집
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 경험 카드 편집 모달 */}
      {showCareerModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-background border rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">경험 카드 편집</h3>
              <button
                onClick={() => setShowCareerModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.experienceCards?.map((card, index) => {
                const Icon =
                  AVAILABLE_ICONS[
                    card.icon as keyof typeof AVAILABLE_ICONS
                  ] || Briefcase
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30"
                  >
                    {/* 아이콘 선택 */}
                    <select
                      value={card.icon}
                      onChange={(e) =>
                        updateExperienceCard(
                          index,
                          "icon",
                          e.target.value
                        )
                      }
                      className="w-40 px-2 py-2 border rounded-lg bg-background"
                    >
                      <option value="briefcase">💼 직장</option>
                      <option value="graduation">🎓 학교</option>
                      <option value="award">🏆 수상</option>
                      <option value="trophy">🏅 성과</option>
                      <option value="star">⭐ 우수</option>
                      <option value="lightbulb">💡 아이디어</option>
                      <option value="target">🎯 목표</option>
                      <option value="rocket">🚀 시작</option>
                      <option value="shield">🛡️ 보안</option>
                      <option value="building">🏢 회사</option>
                      <option value="calendar">📅 기간</option>
                      <option value="book">📚 교육</option>
                      <option value="heart">❤️ 열정</option>
                      <option value="coffee">☕ 일상</option>
                      <option value="user">👤 개인</option>
                    </select>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) =>
                          updateExperienceCard(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="예: ABC 회사, 서울대학교, 구글 자격증"
                        className="w-full px-3 py-2 border rounded-lg bg-background font-semibold"
                      />

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={card.period}
                          onChange={(e) =>
                            updateExperienceCard(
                              index,
                              "period",
                              e.target.value
                            )
                          }
                          placeholder="예: 2020 - 현재"
                          className="flex-1 px-3 py-2 border rounded-lg bg-background"
                        />

                        <input
                          type="text"
                          value={card.description}
                          onChange={(e) =>
                            updateExperienceCard(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="예: 마케팅 매니저, 경영학 학사, GAIQ 인증"
                          className="flex-1 px-3 py-2 border rounded-lg bg-background"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => removeExperienceCard(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={addExperienceCard}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                카드 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCareerModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowCareerModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 스킬 편집 모달 */}
      {showSkillModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">핵심 역량 편집</h3>
              <button
                onClick={() => setShowSkillModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.skills.map((skill, index) => {
                const Icon =
                  SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] ||
                  Trophy
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30"
                  >
                    {/* 아이콘 선택 */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <select
                        value={skill.icon}
                        onChange={(e) =>
                          updateSkill(index, "icon", e.target.value)
                        }
                        className="w-32 px-2 py-1 text-xs border rounded-lg bg-background"
                      >
                        <optgroup label="기술 스킬">
                          <option value="code">💻 코드/개발</option>
                          <option value="database">🗜️ 데이터베이스</option>
                          <option value="server">🌐 서버/클라우드</option>
                          <option value="smartphone">📱 모바일</option>
                          <option value="monitor">🖥️ 프론트엔드</option>
                          <option value="cpu">🤖 AI/ML</option>
                          <option value="gitBranch">🌿 Git/버전관리</option>
                          <option value="lock">🔒 보안</option>
                        </optgroup>
                        <optgroup label="비즈니스">
                          <option value="barChart">📊 데이터 분석</option>
                          <option value="lineChart">📈 성과 분석</option>
                          <option value="pieChart">🥧 통계/시각화</option>
                          <option value="megaphone">📢 마케팅</option>
                          <option value="target">🎯 전략/기획</option>
                          <option value="users">👥 팀워크</option>
                        </optgroup>
                        <optgroup label="창의적 스킬">
                          <option value="palette">🎨 디자인</option>
                          <option value="camera">📷 사진/영상</option>
                          <option value="music">🎵 음악/오디오</option>
                          <option value="edit">✏️ 글쓰기/편집</option>
                          <option value="video">🎬 영상 제작</option>
                        </optgroup>
                        <optgroup label="일반 역량">
                          <option value="trophy">🏆 리더십</option>
                          <option value="sparkles">✨ 혁신</option>
                          <option value="rocket">🚀 실행력</option>
                          <option value="brain">🧠 분석력</option>
                          <option value="lightbulb">💡 창의력</option>
                          <option value="zap">⚡ 속도/효율</option>
                          <option value="star">⭐ 전문성</option>
                          <option value="heart">❤️ 열정</option>
                          <option value="shield">🛡️ 신뢰성</option>
                          <option value="globe">🌍 글로벌</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={skill.title}
                        onChange={(e) =>
                          updateSkill(index, "title", e.target.value)
                        }
                        placeholder="예: 프론트엔드 개발, 데이터 분석, 프로젝트 관리"
                        className="w-full px-3 py-2 border rounded-lg bg-background font-semibold"
                      />

                      <textarea
                        value={skill.description}
                        onChange={(e) =>
                          updateSkill(index, "description", e.target.value)
                        }
                        placeholder="예: React와 TypeScript를 활용한 모던 웹 애플리케이션 개발"
                        className="w-full px-3 py-2 border rounded-lg bg-background resize-none"
                        rows={2}
                      />
                    </div>

                    <button
                      onClick={() => removeSkill(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={addSkill}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                스킬 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 아이콘을 선택하고 제목과 설명을 입력하세요. 필요한 만큼 자유롭게 추가할 수 있습니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSkillModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowSkillModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 취미 편집 모달 */}
      {showHobbyModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">취미 & 관심사 편집</h3>
              <button
                onClick={() => setShowHobbyModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <input
                    type="text"
                    value={hobby}
                    onChange={(e) =>
                      updateHobby(index, e.target.value)
                    }
                    placeholder="예: 📚 독서"
                    className="flex-1 px-3 py-2 border rounded-lg bg-background"
                  />

                  <button
                    onClick={() => removeHobby(index)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addHobby}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                취미 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">
                  🎯 취미 예시:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "📚 독서",
                    "☕ 카페 투어",
                    "🎨 전시회 관람",
                    "✈️ 여행",
                    "🏃 러닝",
                    "📸 사진",
                    "🎮 게임",
                    "🎬 영화 감상",
                    "🎵 음악 감상",
                    "🍳 요리",
                    "🌱 가드닝",
                    "🏊 수영",
                    "🧘 요가",
                    "🎸 기타 연주",
                    "✍️ 글쓰기",
                    "🏕️ 캠핑",
                    "🎭 연극 관람",
                    "🎪 공연 관람",
                    "🚴 자전거",
                    "⛷️ 스키",
                  ].map((example) => (
                    <button
                      key={example}
                      className="px-3 py-1 text-sm bg-muted hover:bg-primary/10 rounded-full transition-all"
                      onClick={() => {
                        if (!aboutInfo.hobbies.includes(example)) {
                          updateAboutInfo("hobbies", [
                            ...aboutInfo.hobbies,
                            example,
                          ])
                        }
                      }}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 이모지와 함께 취미를 입력하세요. 예시를 클릭하면 새 취미가 추가됩니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHobbyModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowHobbyModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </EditableBackground>
  )
}
