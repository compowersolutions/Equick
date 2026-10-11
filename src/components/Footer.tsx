import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/compower-logo.webp";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy-900 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="ComPower logo" className="h-9 w-auto" width={311} height={36} />
            <p className="mt-3 text-sm leading-relaxed text-navy-300">
              Simple solutions for complex problems. Your trusted partner for generators, solar, and rectifiers in Botswana.
            </p>
          </div>


          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Products
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/products" hash="generators" className="text-sm text-navy-300 hover:text-white transition-colors">
                  Generators
                </Link>
              </li>
              <li>
                <Link to="/products" hash="solar" className="text-sm text-navy-300 hover:text-white transition-colors">
                  Solar Systems
                </Link>
              </li>
              <li>
                <Link to="/products" hash="rectifiers" className="text-sm text-navy-300 hover:text-white transition-colors">
                  Rectifiers
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-sm text-navy-300 hover:text-white transition-colors">
                  Downloads
                </Link>
              </li>
              <li>
                <Link to="/generator-sizing" className="text-sm text-navy-300 hover:text-white transition-colors">
                  Generator Size Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-navy-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-navy-300 hover:text-white transition-colors">
                  Services & Maintenance
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-navy-300 hover:text-white transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-navy-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <a href="tel:+26772732668" className="text-sm text-navy-300 hover:text-white transition-colors">+267 72732668</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <a href="mailto:highsystembotswana@gmail.com" className="text-sm text-navy-300 hover:text-white transition-colors break-all">highsystembotswana@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span className="text-sm text-navy-300">Takatokwane Road, G-West, Gaborone, Botswana</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-300">
            &copy; {new Date().getFullYear()} Highsystem Botswana. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-navy-300">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
