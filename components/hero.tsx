"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Mail, Globe } from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

type SiteLang = "ko" | "pt"

/**
 * 전역 언어 상태 훅
 * - 초기값: localStorage("site-lang") 있으면 그 값, 없으면 "ko"
 * - Hero에서 lang을 토글하면:
 *   - localStorage에 저장
 *   - window에 "site-lang-change" 이벤트 발행
 * - 다른 섹션(About, Projects 등)은 이 이벤트만 구독해서 따라가면 됨
 */
function useSiteLangInHero(initial: SiteLang = "ko") {
  const [lang, setLang] = useState<SiteLang>(initial)

  useEffect(() => {
    if (typeof window === "undefined") return

    // 처음 로딩 시 localStorage 값 반영
    const stored = window.localStorage.getItem("site-lang")
    if (stored === "ko" || stored === "pt") {
      setLang(stored)
    }

    return
  }, [])

  const toggleLang = () => {
    const next: SiteLang = lang === "ko" ? "pt" : "ko"
    setLang(next)

    if (typeof window !== "undefined") {
      window.localStorage.setItem("site-lang", next)
      window.dispatchEvent(
        new CustomEvent("site-lang-change", {
          detail: { lang: next },
        })
      )
    }
  }

  return { lang, toggleLang }
}

const defaultSocialLinks = [
  {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/dbwltnwl",
  },
  {
    name: "Email",
    icon: "mail",
    url: "mailto:jisoo9305@gmail.com",
  },
]

const defaultInfo = {
  greeting: "단국대학교 포르투갈·브라질학과",
  name: "유지수",
  title: "세계 도시의 흐름을 읽고 미래의 공간을 계획합니다.",
  description:
    "언어와 문화, 그리고 도시와 부동산 구조를 함께 공부하며 ‘사람이 사는 공간’을 더 깊이 이해하고자 합니다.",
  profileImage: "/uploads/hero-profile-1761477237286.png",
  background: {
    image: "",
    video: "",
    color: "",
    opacity: 0.1,
  },
  projectButton: "프로젝트 보기",
}

const AVAILABLE_ICONS = {
  github: Github,
  mail: Mail,
  globe: Globe,
}

export function Hero() {
  const { getData, saveData, isEditMode } = useInlineEditor()

  // 전역 언어 상태 (Hero에서만 토글, 나머지는 구독만)
  const { lang, toggleLang } = useSiteLangInHero("ko")
  const isPT = !isEditMode && lang === "pt"

  const [heroInfo, setHeroInfo] = useState(defaultInfo)
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks)
  const [backgroundData, setBackgroundData] = useState<{
    image: string
    video: string
    color: string
    opacity: number
  } | null>(null)

  // 기존 템플릿 데이터 불러오기
  useEffect(() => {
    const savedInfo = getData("hero-info") as typeof defaultInfo | null
    if (savedInfo) {
      setHeroInfo({ ...defaultInfo, ...savedInfo })
    }

    const savedSocial = getData("hero-social-links") as
      | { name: string; icon: string; url: string }[]
      | null
    if (savedSocial && savedSocial.length > 0) {
      setSocialLinks(savedSocial)
    }

    const savedBg = getData("hero-background") as {
      image: string
      video: string
      color: string
      opacity: number
    } | null
    if (savedBg) {
      setBackgroundData(savedBg)
    } else {
      setBackgroundData(defaultInfo.background)
    }
  }, [getData, isEditMode])

  const updateHeroInfo = (key: keyof typeof defaultInfo, value: any) => {
    const newInfo = {
      ...heroInfo,
      [key]: value,
    }
    setHeroInfo(newInfo)
    saveData("hero-info", newInfo)
  }

  const scrollToAbout = () => {
    if (typeof document === "undefined") return
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToProjects = () => {
    if (typeof document === "undefined") return
    const projectsSection = document.querySelector("#projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // 화면에 보여줄 텍스트 (한국어 / 포어)
  const displayGreeting = isPT
    ? "Departamento de Português e Estudos Brasileiros, Universidade Dankook"
    : heroInfo.greeting

  const displayName = isPT ? "Yu Jisu" : heroInfo.name

  const displayTitle = isPT
    ? "Leio os fluxos das cidades do mundo e penso em futuros espaços urbanos."
    : heroInfo.title

  const displayDescription = isPT
    ? "Estudo línguas, culturas, cidades e mercados imobiliários para entender melhor como as pessoas vivem e ocupam o espaço urbano."
    : heroInfo.description

  const projectButtonLabel = isPT
    ? "Ver projetos"
    : heroInfo.projectButton || "프로젝트 보기"

  // 소셜 아이콘 렌더링
  const renderSocialIcon = (
    link: { name: string; icon: string; url: string },
    index: number
  ) => {
    if (!link.url) return null
    const Icon =
      AVAILABLE_ICONS[link.icon as keyof typeof AVAILABLE_ICONS] || Globe

    const isEmail = link.icon === "mail" || link.url.startsWith("mailto:")
    const href =
      isEmail && !link.url.startsWith("mailto:")
        ? `mailto:${link.url}`
        : link.url

    return (
      <a
        key={index}
        href={href}
        target={isEmail ? undefined : "_blank"}
        rel={isEmail ? undefined : "noopener noreferrer"}
        className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all hover:scale-110"
        title={link.name}
      >
        <Icon className="h-5 w-5" />
      </a>
    )
  }

  return (
    <EditableBackground
      image={backgroundData?.image || ""}
      video={backgroundData?.video || ""}
      color={backgroundData?.color || ""}
      opacity={backgroundData?.opacity ?? 0.1}
      onChange={(data) => {
        const newData = {
          image: backgroundData?.image || "",
          video: backgroundData?.video || "",
          color: backgroundData?.color || "",
          opacity: backgroundData?.opacity ?? 0.1,
          ...data,
        }
        setBackgroundData(newData)
        saveData("hero-background", newData)

        const updatedHeroInfo = { ...heroInfo, background: newData }
        setHeroInfo(updatedHeroInfo)
        saveData("hero-info", updatedHeroInfo)
      }}
      storageKey="hero-background"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <section id="hero" className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 */}
            <div className="order-2 md:order-1">
              {/* 언어 토글 */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="text-muted-foreground">언어 / Idioma</span>
                <div className="inline-flex rounded-full border border-border p-1 bg-background/60 backdrop-blur">
                  <button
                    type="button"
                    onClick={() => {
                      if (lang !== "ko") {
                        // 한국어로 전환
                        if (typeof window !== "undefined") {
                          window.localStorage.setItem("site-lang", "ko")
                          window.dispatchEvent(
                            new CustomEvent("site-lang-change", {
                              detail: { lang: "ko" as SiteLang },
                            })
                          )
                        }
                      }
                    }}
                    className={`px-3 py-1 text-xs rounded-full ${
                      lang === "ko"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    한국어
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (lang !== "pt") {
                        if (typeof window !== "undefined") {
                          window.localStorage.setItem("site-lang", "pt")
                          window.dispatchEvent(
                            new CustomEvent("site-lang-change", {
                              detail: { lang: "pt" as SiteLang },
                            })
                          )
                        }
                      }
                    }}
                    className={`px-3 py-1 text-xs rounded-full ${
                      lang === "pt"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    Português
                  </button>
                </div>
              </div>

              {/* 인사 / 이름 / 타이틀 */}
              <h2 className="text-3xl font-bold mb-2">
                {isPT ? (
                  <span>{displayGreeting}</span>
                ) : (
                  <EditableText
                    value={heroInfo.greeting}
                    onChange={(value) => updateHeroInfo("greeting", value)}
                    storageKey="hero-greeting"
                  />
                )}
              </h2>

              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {isPT ? (
                  <span>{displayName}</span>
                ) : (
                  <EditableText
                    value={heroInfo.name}
                    onChange={(value) => updateHeroInfo("name", value)}
                    storageKey="hero-name"
                  />
                )}
              </h1>

              <p className="text-2xl mb-4 text-muted-foreground">
                {isPT ? (
                  <span>{displayTitle}</span>
                ) : (
                  <EditableText
                    value={heroInfo.title}
                    onChange={(value) => updateHeroInfo("title", value)}
                    storageKey="hero-title"
                  />
                )}
              </p>

              <p className="text-lg mb-6 text-muted-foreground">
                {isPT ? (
                  <span>{displayDescription}</span>
                ) : (
                  <EditableText
                    value={heroInfo.description}
                    onChange={(value) =>
                      updateHeroInfo("description", value)
                    }
                    storageKey="hero-description"
                    multiline
                  />
                )}
              </p>

              {/* 프로젝트 버튼 */}
              <div className="mb-8">
                <Button
                  onClick={scrollToProjects}
                  size="lg"
                  className="justify-center"
                >
                  {projectButtonLabel}
                </Button>
              </div>

              {/* 소셜 링크 (GitHub / Email 기본) */}
              <div className="flex gap-4 flex-wrap items-center">
                {socialLinks.map((link, index) =>
                  renderSocialIcon(link, index)
                )}
              </div>
            </div>

            {/* 오른쪽: 프로필 이미지 */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-muted overflow-hidden shadow-2xl">
                  <EditableMedia
                    src={heroInfo.profileImage}
                    onChange={(src) => updateHeroInfo("profileImage", src)}
                    type="image"
                    storageKey="hero-profileImage"
                    className="w-full h-full object-contain"
                    alt="프로필"
                    purpose="hero-profile"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 아래로 스크롤 인디케이터 */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          type="button"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </button>
      </section>
    </EditableBackground>
  )
}
