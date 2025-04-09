import { Suspense } from "react";
import Link from "next/link";

import { AllPosts } from "@/app/components/Posts";
import GetStartedCode from "@/app/components/GetStartedCode";
import Hero from "./components/HeroSection";
import { CallToAction } from "./components/CTASection";
import {ProgramsSection} from './components/ProgramsSections'

export default async function Page() {
  return (
    <>
      <div className="bg-gradient-to-r from-red-200 from-0% via-white via-40%  relative">
      <Hero />
      </div>
      <div className="border-t border-gray-10">
        <div className="container">
          <aside className="py-12 sm:py-12">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
        <ProgramsSection />
        <CallToAction />
      </div>
    </>
  );
}
