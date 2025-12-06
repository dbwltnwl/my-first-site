"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowDown,
  Instagram,
  MessageCircle,
  Mail,
  Youtube,
  Facebook,
  Twitter,
  Globe,
  Linkedin,
  Settings,
  X,
  Plus,
  Github,
  Twitch,
  Send,
  MessageSquare,
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

// 언어 타입
type HeroLang = "ko" | "pt"

// 포르투갈어 버전 텍스트
const HERO_PT_TEXT = {
  greeting: "Departamento de Estudos Portugueses e Brasileiros — Universidade Dankook",
  title: "Leio o fluxo das cidades do mundo e imagino os espaços do futuro.",
  description:
    "Estudo como pessoas, políticas públicas e mercados se encontram no espaço urbano — especialmente em cidades lusófonas como Lisboa, Porto, São Paulo e Rio de Janeiro.",
  projectButton: "Ver projetos",
} as const

// 아이콘 모음
const AVAILABLE_ICONS = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  discord: MessageSquare,
  twitch: Twitch,
  telegram: Send,
  globe: Globe,
  message: MessageCircle,
  mail: Mail,
}

// ===============================
//  HERO SECTION START
// ===============================
export function Hero() {
  const { getData, saveData, isEditMode, saveToFile, saveFieldToFile } = useInlineEditor()

  // 🔤 Hero 전용 언어 상태
  const [lang, setLang] = useState<HeroLang>("ko")
  const isPT = !isEditMode && lang === "pt"

  // 기본 social
  const defaultSocialLinks = [
    { name: "GitHub", icon: "github", url: "https://github.com/dbwltnwl" },
  ]

  // 기본 hero 정보
  const defaultInfo = {
    greeting: "단국대학교 포르투갈브라질학과",
    name: "유지수",
    title: "세계 도시의 흐름을 읽고 미래의 공간을 계획합니다.",
    description:
      "도시·부동산·언어를 함께 보며, 사람들의 삶이 실제로 변하는 지점을 공부하고 기록합니다.",
    profileImage: "/uploads/hero-profile-1761477237286.png",
    projectButton: "프로젝트 보기",
    background: { image: "", video: "", color: "", opacity: 0.1 },
  }

  const [heroInfo, setHeroInfo] = useState(defaultInfo)
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)
  const [showSocialEditor, setShowSocialEditor] = useState(false)

  // 데이터 로드
  useEffect(() => {
    const saved = getData("hero-info")
    if (saved) setHeroInfo({ ...defaultInfo, ...saved })

    const savedSocial = getData("hero-social-links")
    if (savedSocial) setSocialLinks(savedSocial)

    const savedBg = getData("hero-background")
    if (savedBg) setBackgroundData(savedBg)
  }, [isEditMode])

  const updateHeroInfo = (key: string, value: string) => {
    const newInfo = { ...heroInfo, [key]: value }
    setHeroInfo(newInfo)
    saveData("hero-info", newInfo)
  }

  // 부드러운 스크롤 기능 (오류 안 남)
  const scrollToProjects = () => {
    const section = document.querySelector("#projects")
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAbout = () => {
    const section = document.querySelector("#about")
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  // 언어별 표시 텍스트
  const displayGreeting = isPT ? HERO_PT_TEXT.greeting : heroInfo.greeting
  const displayTitle = isPT ? HERO_PT_TEXT.title : heroInfo.title
  const displayDescription = isPT ? HERO_PT_TEXT.description : heroInfo.description
  const displayButton = isPT ? HERO_PT_TEXT.projectButton : heroInfo.projectButton

  // ===============================
  // RENDER START
  // ===============================
  return (
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const newBg = { ...backgroundData, ...data }
        setBackgroundData(newBg)
        saveData("hero-background", newBg)
      }}
      storageKey="hero-background"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <section id="hero" className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">

          {/* ================= LANGUAGE TOGGLE ================= */}
          <div className="order-2 md:order-1">
            <div className="mb-4 text-sm text-muted-foreground flex gap-2 items-center">
              <span>언어 / Idioma</span>
              <button onClick={() => setLang("ko")}
                className={lang === "ko" ? "font-semibold underline" : "opacity-60"}>
                한국어
              </button>
              <span>/</span>
              <button onClick={() => setLang("pt")}
                className={lang === "pt" ? "font-semibold underline" : "opacity-60"}>
                Português
              </button>
            </div>

            <h2 className="text-3xl font-bold mb-2">
              <EditableText
                value={displayGreeting}
                onChange={(v) => updateHeroInfo("greeting", v)}
                storageKey="hero-greeting"
              />
            </h2>

            <h1 className="text-5xl font-bold mb-4">
              <EditableText
                value={heroInfo.name}
                onChange={(v) => updateHeroInfo("name", v)}
                storageKey="hero-name"
              />
            </h1>

            <p className="text-2xl text-muted-foreground mb-4">
              <EditableText
                value={displayTitle}
                onChange={(v) => updateHeroInfo("title", v)}
                storageKey="hero-title"
              />
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              <EditableText
                value={displayDescription}
                onChange={(v) => updateHeroInfo("description", v)}
                storageKey="hero-description"
                multiline
              />
            </p>

            {/* ================= PROJECT BUTTON ================= */}
            {!isEditMode ? (
              <Button size="lg" onClick={scrollToProjects}>
                {displayButton}
              </Button>
            ) : (
              <div className="flex flex-col gap-2 w-fit">
                <input
                  type="text"
                  className="px-3 py-2 border rounded-lg bg-background text-sm"
                  value={heroInfo.projectButton}
                  onChange={(e) => updateHeroInfo("projectButton", e.target.value)}
                />
                <Button size="lg" disabled>{heroInfo.projectButton}</Button>
              </div>
            )}
          </div>

          {/* ================= PROFILE IMAGE ================= */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl bg-muted">
              <EditableMedia
                src={heroInfo.profileImage}
                onChange={(src) => updateHeroInfo("profileImage", src)}
                storageKey="hero-profileImage"
                type="image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 아래로 이동 */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </button>
      </section>
    </EditableBackground>
  )
}
