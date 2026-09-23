"use client";

import * as Icons from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { whyUs } from "@/data/home";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Parses a stat value string like "6+", "13+", "4 hrs", "7" into:
 *   { numeric: 6, suffix: "+" }
 *   { numeric: 13, suffix: "+" }
 *   { numeric: 4, suffix: " hrs" }
 *   { numeric: 7, suffix: "" }
 */
function parseStat(value) {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { numeric: 0, suffix: value };
  return { numeric: parseInt(match[1], 10), suffix: match[2] };
}

/** Single animated stat counter — must be its own component so each has its own hook */
function AnimatedStat({ stat }) {
  const { numeric, suffix } = parseStat(stat.value);
  const { ref, count } = useCountUp(numeric, 1800);

  return (
    <div ref={ref} className="pl-5">
      <dd className="text-4xl font-bold tracking-[-0.03em] text-brand-navy sm:text-6xl">
        {count}
        {suffix}
      </dd>
      <dt className="mt-2 max-w-[20ch] text-[13px] font-medium leading-snug text-brand-muted sm:text-sm">
        {stat.label}
      </dt>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Watercolor traveller illustration – decorative corner accent */}
      <img
        src="/side1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-50 hidden w-[340px] select-none opacity-90 lg:block xl:w-[500px]"
        style={{ transform: "translateX(33%)" }}
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading lines={whyUs.heading} />
            </Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {whyUs.values.map((v) => {
                const Icon = Icons[v.icon] || Icons.Check;
                return (
                  <li key={v.label} className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand-blue shadow-[0_1px_0_0_#e6eaf1]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] font-semibold text-brand-ink">{v.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <p className="max-w-xl text-[15px] leading-[1.8] text-brand-muted sm:text-base">{whyUs.copy}</p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
              {whyUs.stats.map((s) => (
                <AnimatedStat key={s.label} stat={s} />
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
