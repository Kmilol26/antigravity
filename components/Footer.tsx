import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-white pt-16 pb-10">
            <div className="mx-auto w-full max-w-[1280px] px-8">
                {/* Social Section */}
                <div className="mb-10">
                    <h3 className="text-sm font-medium text-gray-500 mb-6">Síguenos</h3>

                    <div className="flex items-center gap-10">
                        <Link href="#" className="text-[#FE6535] hover:opacity-80 transition">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-[#FE6535] hover:opacity-80 transition">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-[#FE6535] hover:opacity-80 transition">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-[#FE6535] hover:opacity-80 transition">
                            <Mail className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-10">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center">
                        <img
                            src="/logo-tikipal.svg"
                            alt="Tikipal"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Links */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex flex-wrap gap-2 text-sm text-[#FE6535]">
                            <span>© 2026 Tikipal</span>
                            <span>·</span>
                            <Link href="#" className="hover:opacity-80 transition">
                                Privacidad
                            </Link>
                            <span>·</span>
                            <Link href="#" className="hover:opacity-80 transition">
                                Términos
                            </Link>
                            <span>·</span>
                            <Link href="#" className="hover:opacity-80 transition">
                                Mapa del sitio
                            </Link>
                            <span>·</span>
                            <Link href="#" className="hover:opacity-80 transition">
                                Datos de la empresa
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-[#FE6535]">
                            <span>Español (CO)</span>
                            <span>·</span>
                            <span>$COP</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
