"use client";
import dynamic from 'next/dynamic';
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import Navbar from "../components/navbar"
const Hero = dynamic(() => import('../components/hero'), { ssr: false });
import Features from "../components/features"
import Howitworks from "../components/howitworks"
const Community = dynamic(() => import('../components/community'), { ssr: false });
import Footer from "../components/footer"


export default function Home() {

  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/home");
    }
  }, [isLoaded, isSignedIn, router]);


  if (!isLoaded || isSignedIn) return null;
  return (
    <>
      <Navbar />
      <main>
        <section>
          <Hero />
        </section>
        <section>
          <Features />
        </section>
        <section>
          <Howitworks />
        </section>
        <section>
          <Community />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  );
}
