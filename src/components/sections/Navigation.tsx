// src/components/sections/Navigation.tsx

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { NavLink, ButtonLink } from '@/components/ui/Link'
import { IconButton } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, EXTERNAL_LINKS } from '@/lib/constants'
import { useScrollDirection, useScrollPast } from '@/hooks/useScrollDirection'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useKeyPress } from '@/hooks/useKeyPress'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { fadeInDown, menuAnimation } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'
import { useRef } from 'react'

/**
 * Navigation component with sticky header and mobile menu
 */
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const { scrollDirection } = useScrollDirection({ threshold: 10 })
  const isPastTop = useScrollPast(50)
  const isMobile = useIsMobile()
  const menuRef = useRef<HTMLDivElement>(null)

  const animation = useAccessibleAnimation(fadeInDown)

  // Close mobile menu when escape is pressed
  useKeyPress('Escape', () => setMobileMenuOpen(false))

  // Close mobile menu when clicking outside
  useClickOutside(menuRef, () => setMobileMenuOpen(false))

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.substring(1))

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle navigation click
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        // Close menu first if mobile
        if (mobileMenuOpen) {
          setMobileMenuOpen(false)
          // Wait for menu animation to complete before scrolling
          setTimeout(() => {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
          }, 300) // Match the menu animation duration
        } else {
          // Desktop - scroll immediately
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }
    }
  }

  return (
    <motion.header
      variants={animation}
      initial="hidden"
      animate="visible"
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        'transition-all duration-300',
        // Hide on scroll down, show on scroll up
        scrollDirection === 'down' && isPastTop && '-translate-y-full',
        // Background when scrolled
        isPastTop && 'bg-primary/90 shadow-primary/5 shadow-lg backdrop-blur-md',
        // Border when scrolled
        isPastTop && 'border-border-subtle border-b'
      )}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-text-primary focus-visible:ring-accent-gold focus-visible:ring-offset-primary rounded-sm text-xl font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span className="text-accent-gold">A</span>rshad{' '}
            <span className="text-accent-gold">S</span>hah
          </motion.a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-8">
              <ul className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      active={activeSection === item.href.substring(1)}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={EXTERNAL_LINKS.resume}
                variant="secondary"
                size="sm"
                rightIcon={<Download className="h-4 w-4" />}
              >
                Resume
              </ButtonLink>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              variant="outline"
              icon={mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            />
          )}
        </nav>
      </Container>

      {/* Mobile Menu */}
      {isMobile && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={menuRef}
              variants={menuAnimation}
              initial="closed"
              animate="open"
              exit="closed"
              className="border-border-subtle bg-primary/95 border-t backdrop-blur-md"
            >
              <Container>
                <nav className="py-6">
                  <ul className="space-y-4">
                    {NAV_ITEMS.map((item) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <NavLink
                          href={item.href}
                          active={activeSection === item.href.substring(1)}
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavClick(item.href)
                          }}
                          className="block py-2 text-lg"
                        >
                          {item.label}
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="border-border-subtle mt-6 border-t pt-6">
                    <ButtonLink
                      href={EXTERNAL_LINKS.resume}
                      variant="secondary"
                      size="md"
                      className="w-full"
                      rightIcon={<Download className="h-4 w-4" />}
                    >
                      Resume
                    </ButtonLink>
                  </div>
                </nav>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.header>
  )
}
