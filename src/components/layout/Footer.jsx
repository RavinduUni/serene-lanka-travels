"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Send, Award, Medal } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import Container from "@/components/ui/Container";
import { site, footerColumns } from "@/data/site";
import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = time.getFullYear();
  
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  const formattedDate = time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="bg-white text-gray-800 font-sans pb-6">
      <Container className="pt-16 lg:pt-20">
        
        {/* --- TOP SECTION --- */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-32">
          
          {/* Logo, Description & Social */}
          <div className="flex flex-col items-center max-w-sm text-center">
            <div className="inline-flex">
              <Image 
                src="/logo/seren-lanka-travels.png" 
                alt={site.name} 
                width={250} 
                height={250} 
                className="h-25 w-auto object-contain" 
              />
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">
              <a href={site.social.facebook} aria-label="Facebook" className="grid size-8 place-items-center rounded-full border-[1.5px] border-gray-800 text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue">
                <FacebookIcon className="size-4" />
              </a>
              <a href={site.social.youtube} aria-label="YouTube" className="grid size-8 place-items-center rounded-full border-[1.5px] border-gray-800 text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue">
                <YoutubeIcon className="size-4" />
              </a>
              <a href={site.social.instagram} aria-label="Instagram" className="grid size-8 place-items-center rounded-full border-[1.5px] border-gray-800 text-gray-800 transition-colors hover:border-brand-blue hover:text-brand-blue">
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-10">
            <h3 className="text-[22px] font-serif text-gray-900 mb-6 tracking-wide">
              Receive Travel Inspirations
            </h3>
            <div className="flex items-center border-b-[1.5px] border-gray-400 pb-2 max-w-sm w-full lg:w-[350px]">
              <input 
                type="email" 
                placeholder="Your email address *" 
                className="outline-none bg-transparent text-[14px] w-full placeholder-gray-500 text-gray-800" 
              />
              <button type="button" aria-label="Subscribe" className="text-gray-800 hover:text-brand-blue transition-colors ml-2">
                 <Send className="size-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Description */}
        <div className="flex flex-col items-center mt-8 justify-center w-full text-center">
            <p className="text-[14px] leading-relaxed text-black tracking-wide max-w-xl">
              {site.tagline} {site.promise}
            </p>
        </div>

        {/* --- CONTACT SECTION --- */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 mt-16 text-[13px] font-bold text-gray-800 tracking-wide">
          <div className="flex items-center gap-3">
            <div className="bg-[#4CAF50] rounded-full p-2 text-white">
               <Phone className="size-4" fill="currentColor" />
            </div>
            <a href={`tel:${site.whatsappNumber}`} className="hover:text-brand-blue transition-colors text-[15px]">{site.phones[0]}</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#2196F3] rounded-full p-2 text-white">
               <Phone className="size-4" fill="currentColor" />
            </div>
            <a href={`tel:${site.phones[1].replace(/\s/g, "")}`} className="hover:text-brand-blue transition-colors text-[15px]">{site.phones[1]}</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#F44336] rounded-full p-2 text-white">
               <Mail className="size-4" fill="currentColor" />
            </div>
            <a href={`mailto:${site.email}`} className="hover:text-brand-blue transition-colors text-[15px]">{site.email}</a>
          </div>
        </div>

        {/* --- LINKS SECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 mt-20 px-2 lg:px-4">
          {footerColumns.map((col, index) => (
            <div key={index} className="flex flex-col">
              {col.title ? (
                <h4 className="text-[14px] font-bold text-gray-900 mb-6 tracking-wide">
                  {col.title}
                </h4>
              ) : (
                <div className="h-[43px] hidden lg:block"></div> /* Empty space for alignment */
              )}
              <ul className="space-y-3.5">
                {col.links.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-[13px] text-black transition-colors hover:text-brand-blue">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-200 pt-8 px-2 lg:px-4">
          <div className="flex flex-col items-center md:items-start text-gray-500">
            {mounted ? (
              <>
                <span className="text-[20px] font-medium text-gray-700 tracking-wide leading-tight">{formattedTime}</span>
                <span className="text-[11px] mt-1">{formattedDate}</span>
              </>
            ) : (
              <div className="h-[42px] w-[150px] bg-transparent"></div>
            )}
          </div>
          <p className="text-[12px] text-gray-700">
            © Copyright {year}. {site.name}. All Rights Reserved
          </p>
        </div>

      </Container>
    </footer>
  );
}
