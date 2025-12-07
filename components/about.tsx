"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, User, Globe, Search, Heart } from "lucide-react";
import { EditableText } from "@/components/editable/editable-text";
import { EditableMedia } from "@/components/editable/editable-media";
import { EditableBackground } from "@/components/editable/editable-background";
import { useInlineEditor } from "@/contexts/inline-editor-context";
import { useLanguage } from "@/contexts/language-context";

// ------------------------------
//  🔵 포르투갈어 고정 텍스트
// ------------------------------
const PT = {
  title: "Sobre",
  subtitle:
    "Apresente sua formação, experiências e como você observa cidade, espaço e pessoas.",

  experiences: [
    {
      title: "Universidade Dankook",
      period: "Mar 2023 ~ Fev 2027 (previsto)",
      description: "Estudos Portugueses e Brasileiros | 3º ano",
    },
    {
      title: "Intercâmbio em Portugal",
      period: "Fev 2024 ~ Jul 2024",
      description:
        "Exploração baseada em língua, cultura e pesquisa urbana/imobiliária",
    },
    {
      title: "Certificação de Investimentos",
      period: "Aprovada na 43ª edição (2025)",
      description:
        "Qualificação para aprofundar finanças imobiliárias e urbanas",
    },
    {
      title: "FLEX (Prova de Proficiência)",
      period: "2023-2",
      description: "Certificação de proficiência em língua portuguesa",
    },
    {
      title: "Mentora do Clube Acadêmico",
      period: "Desde 2024-2",
      description:
        "Mentoria em estudos, carreira e preparação para intercâmbio",
    },
  ],

  skills: [
    {
      title: "Pesquisa urbana e imobiliária em perspectiva internacional",
      desc: "Compara estruturas urbanas e problemas habitacionais de países como Brasil e Europa.",
      meta: "Ferramentas: mapas, estatísticas, relatórios",
    },
    {
      title: "Compreensão de políticas urbanas e imobiliárias",
      desc: "Analisa habitação, renovação, desenvolvimento e infraestrutura.",
      meta: "Abordagem: comparação, análise de risco",
    },
    {
      title: "Especialização regional em Brasil e países lusófonos",
      desc: "Interpretação de políticas, problemas e mercado em português.",
      meta: "Base: leitura de fontes primárias",
    },
  ],

  storyTitle: "Minha história",
  story: [
    "Comecei estudando língua, cultura e modos de vida no curso de Estudos Portugueses e Brasileiros.",
    "Mas ao tentar entender estruturas urbanas e imobiliárias, percebi limites que meu curso não explicava totalmente.",
    "Para aprender outra 'linguagem' da cidade, entrei na área imobiliária. Termos técnicos eram difíceis no início, mas o processo mudou minha forma de pensar.",
    "Ainda não sei tudo. Mas por reconhecer essas lacunas, passei a observar mais, perguntar mais e ler a cidade em camadas.",
    "Quero unir português, estudos urbanos e finanças imobiliárias para me tornar alguém capaz de ler a cidade pela linguagem, pelo capital e pelas políticas públicas.",
  ],
};

// ------------------------------
//  🟢 한국어 기본 텍스트
// ------------------------------
const KO = {
  title: "소개",
  subtitle: "당신의 전문성과 경험을 소개해주세요.",

  experiences: [
    {
      title: "단국대학교",
      period: "2023.03 ~ 2027.02 (예정)",
      description: "포르투갈·브라질학 전공 | 3학년",
    },
    {
      title: "포르투갈 교환학생",
      period: "2024.02 ~ 2024.07",
      description: "언어·문화 + 도시/부동산 리서치 기반 탐색",
    },
    {
      title: "투자자산운용사",
      period: "2025년 제43회 합격",
      description: "부동산/도시 금융 이해를 위한 자격 취득",
    },
    {
      title: "FLEX 포르투갈어",
      period: "2023-2",
      description: "포르투갈어 전문성 인증",
    },
    {
      title: "학과 동아리 멘토",
      period: "2024-2~",
      description: "학업·전공·교환 준비 멘토링 진행",
    },
  ],

  skills: [
    {
      title: "국제적 관점의 도시·부동산 연구",
      desc: "브라질·유럽의 도시 구조와 주거 문제를 비교·분석합니다.",
      meta: "도구: 지도·통계·정책자료",
    },
    {
      title: "부동산 및 도시 정책 이해",
      desc: "주거·재생·개발·인프라 등 도시 구조와 정책의 영향을 분석합니다.",
      meta: "방식: 사례 비교·리스크 분석",
    },
    {
      title: "지역 전문성",
      desc: "브라질 정책·도시 문제·시장 자료를 포어 기반으로 해석합니다.",
      meta: "기반: 포어 1차 자료 분석",
    },
  ],

  storyTitle: "나의 이야기",
  story: [
    "저는 포르투갈·브라질학과에서 언어·문화·생활방식을 먼저 배웠습니다.",
    "하지만 도시와 부동산 구조를 이해하려 할 때 전공만으로는 부족함을 느꼈습니다.",
    "도시의 또 다른 언어를 배우기 위해 부동산학을 공부하게 되었고, 어려움도 있었지만 시야가 확장되었습니다.",
    "아직 부족하지만, 그래서 더 관찰하고 질문하며 도시를 여러 층위로 읽게 되었습니다.",
    "앞으로는 포어·도시 연구·부동산 금융을 하나로 묶어 도시를 언어·자본·정책으로 읽는 사람이 되고자 합니다.",
  ],
};

const ICONS = [GraduationCap, Globe, Award, Award, User];

export function About() {
  const { getData, saveData, isEditMode } = useInlineEditor();
  const { lang } = useLanguage();
  const T = lang === "pt" ? PT : KO;

  const [info, setInfo] = useState(KO);

  useEffect(() => {
    const saved = getData("about-info");
    if (saved) setInfo(saved);
  }, []);

  useEffect(() => {
    setInfo(lang === "pt" ? PT : KO);
  }, [lang]);

  return (
    <EditableBackground className="py-20 bg-muted/30">
      <section id="about" className="max-w-6xl mx-auto px-4">
        {/* 제목 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <EditableText
              value={T.title}
              onChange={(v) => saveData("about-info", { ...info, title: v })}
            />
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <EditableText
              value={T.subtitle}
              onChange={(v) => saveData("about-info", { ...info, subtitle: v })}
              multiline
            />
          </p>
        </div>

        {/* 경험 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {T.experiences.map((exp, i) => {
            const Icon = ICONS[i];
            return (
              <Card key={i} className="shadow-lg hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-1">
                        <EditableText value={exp.title} />
                      </h3>

                      <p className="text-sm text-primary mb-2">
                        <EditableText value={exp.period} />
                      </p>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <EditableText value={exp.description} multiline />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 핵심 역량 */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-10"> 
            <EditableText value={lang === "pt" ? "Competências principais" : "핵심 역량"} />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {T.skills.map((sk, i) => (
              <div key={i} className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />

                <h4 className="font-semibold mb-2">
                  <EditableText value={sk.title} />
                </h4>

                <p className="text-sm text-muted-foreground mb-2">
                  <EditableText value={sk.desc} multiline />
                </p>

                <p className="text-xs text-muted-foreground/80">{sk.meta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 나의 이야기 */}
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10">
            <h3 className="text-2xl font-bold mb-6">
              <EditableText value={T.storyTitle} />
            </h3>

            {T.story.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                <EditableText value={para} multiline />
              </p>
            ))}
          </div>

          <EditableMedia
            src={info.storyImage}
            onChange={(src) => saveData("about-info", { ...info, storyImage: src })}
            type="image"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </EditableBackground>
  );
}
