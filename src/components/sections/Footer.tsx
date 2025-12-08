// src/components/sections/Footer.tsx

import { Container } from '@/components/common/Container'
import { SocialLink } from '@/components/ui/Link'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { SOCIAL_LINKS, NAV_ITEMS } from '@/lib/constants'
import { scrollToElement } from '@/lib/utils'
import contactData from '@/data/contact.json'

/**
 * Footer component with copyright, navigation, and social links
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      scrollToElement(href.substring(1))
    }
  }

  return (
    <footer className="border-border-subtle bg-primary border-t py-12">
      <Container>
        <div className="flex flex-col items-center gap-8">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-text-secondary hover:text-accent-gold transition-colors"
            >
              Home
            </button>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-text-secondary hover:text-accent-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <SocialLink
              platform="GitHub"
              href={SOCIAL_LINKS.github}
              icon={<Github className="h-5 w-5" />}
              className="h-10 w-10"
            />
            <SocialLink
              platform="LinkedIn"
              href={SOCIAL_LINKS.linkedin}
              icon={<Linkedin className="h-5 w-5" />}
              className="h-10 w-10"
            />
            <SocialLink
              platform="Email"
              href={SOCIAL_LINKS.email}
              icon={<Mail className="h-5 w-5" />}
              className="h-10 w-10"
            />
          </div>

          {/* Divider */}
          <div className="bg-border-subtle h-px w-full max-w-xs" />

          {/* Copyright & Tagline */}
          <div className="text-center">
            <p className="text-text-secondary mb-2 text-sm">{contactData.footer.tagline}</p>
            <p className="text-text-muted flex items-center justify-center gap-1 text-sm">
              <span>&copy; {currentYear}</span>
              <span>{contactData.footer.copyright}.</span>
              <span>Made with</span>
              <Heart className="text-accent-gold h-3 w-3 fill-current" />
              <span>in Dublin</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
