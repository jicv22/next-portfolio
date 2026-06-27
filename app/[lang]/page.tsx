import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n.config";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import AboutMe from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Plans from "@/components/plans";
import Contact from "@/components/contact";
import ScrollIndicator from "@/components/common/ScrollIndicator";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main className="flex flex-col min-h-screen pt-12">
        <Hero dict={dict} lang={lang} />
        <Projects dict={dict} />
        <Skills dict={dict} />
        <Experience dict={dict} />
        <AboutMe dict={dict} />
        <Plans dict={dict} lang={lang} />
        <Contact dict={dict} />
      </main>
      <ScrollIndicator />
    </>
  );
}
