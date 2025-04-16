// app/components/post/LocalizedContent.jsx
'use client';

import PortableText from "@/app/components/PortableText";
import { useLanguage } from "@/context/LanguageContext";

export default function LocalizedTitle({ titleEn, titleSw }) {
  const { language } = useLanguage();
  
  // Determine which content to display based on language
  const contentToDisplay = language === "en" ? titleEn : titleSw;
  
  if (!contentToDisplay?.length) {
    return null;
  }
  
  return (
    <div className="font-sans">
      {contentToDisplay}
    </div>
  );
}