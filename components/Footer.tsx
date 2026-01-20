import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full mt-auto border-t border-white/20 bg-white/40 backdrop-blur-lg">
            <div className="mx-auto w-full max-w-[1280px] px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Brand & Copy */}
                    <div className="flex items-center gap-4">
                        <img src="/logo-tikipal.svg" alt="Tikipal" className="h-5 opacity-80" />
                        <span className="text-xs text-gray-500 font-medium">© 2026</span>
                    </div>

                    {/* Compact Links */}
                    <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
                        <Link href="#" className="hover:text-[#FE6535] transition">Privacidad</Link>
                        <Link href="#" className="hover:text-[#FE6535] transition">Términos</Link>
                        <Link href="#" className="hover:text-[#FE6535] transition">Soporte</Link>
                    </div>

                    {/* Social Icons (Compact) */}
                    <div className="flex items-center gap-4 opacity-70">
                        <Link href="#" className="hover:text-[#FE6535] hover:scale-110 transition"><Instagram className="w-4 h-4" /></Link>
                        <Link href="#" className="hover:text-[#FE6535] hover:scale-110 transition"><Facebook className="w-4 h-4" /></Link>
                        <Link href="#" className="hover:text-[#FE6535] hover:scale-110 transition"><Linkedin className="w-4 h-4" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
