// src/components/CVDownloadModal.tsx

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  Code2,
  Layers,
  Monitor,
  Server,
  Smartphone,
  Sparkles,
  FileDown,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconButton } from '@/components/ui/Button'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useKeyPress } from '@/hooks/useKeyPress'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'
import { fadeIn, scaleIn, staggerContainer, staggerItem } from '@/lib/animations'
import { Z_INDEX } from '@/lib/constants'
import { roleConfig } from '@/lib/cv-data'

// Lazy load PDF generation to reduce initial bundle size
const generatePDF = async (roleId: string) => {
  const [{ pdf }, { CVDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('@/components/CVDocument'),
  ])
  const config = roleConfig[roleId]
  if (!config) throw new Error(`Unknown role: ${roleId}`)
  return pdf(<CVDocument roleId={roleId} config={config} />).toBlob()
}

interface CVDownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layers,
  Monitor,
  Server,
  Smartphone,
}

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  gold: {
    bg: 'bg-accent-gold/10',
    border: 'border-accent-gold/30 hover:border-accent-gold/60',
    text: 'text-accent-gold',
    glow: 'hover:shadow-accent-gold/20',
  },
  blue: {
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/30 hover:border-accent-blue/60',
    text: 'text-accent-blue',
    glow: 'hover:shadow-accent-blue/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30 hover:border-cyan-500/60',
    text: 'text-cyan-400',
    glow: 'hover:shadow-cyan-500/20',
  },
  green: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    text: 'text-emerald-400',
    glow: 'hover:shadow-emerald-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30 hover:border-purple-500/60',
    text: 'text-purple-400',
    glow: 'hover:shadow-purple-500/20',
  },
}

// CV variants with metadata
const cvVariants = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    subtitle: 'Full-spectrum engineering',
    description: 'Comprehensive overview highlighting system design, performance engineering, and full-stack expertise.',
    icon: 'Code2',
    color: 'gold',
    highlights: ['System Architecture', 'Performance', 'Full-Stack'],
    recommended: true,
  },
  {
    id: 'fullstack-developer',
    title: 'Full-Stack Developer',
    subtitle: 'End-to-end solutions',
    description: 'Balanced focus on frontend and backend technologies, API development, and database design.',
    icon: 'Layers',
    color: 'blue',
    highlights: ['React & Spring Boot', 'API Design', 'Database'],
    recommended: false,
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    subtitle: 'UI/UX focused',
    description: 'Emphasis on React, TypeScript, microfrontends, and creating exceptional user experiences.',
    icon: 'Monitor',
    color: 'cyan',
    highlights: ['React & TypeScript', 'Microfrontends', 'Performance'],
    recommended: false,
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    subtitle: 'Server-side specialist',
    description: 'Focus on Spring Boot, microservices, GraphQL, and scalable backend architecture.',
    icon: 'Server',
    color: 'green',
    highlights: ['Spring Boot', 'Microservices', 'GraphQL'],
    recommended: false,
  },
  {
    id: 'mobile-developer',
    title: 'Mobile Developer',
    subtitle: 'Native & cross-platform',
    description: 'Highlighting Android development with Kotlin, mobile architecture, and native integrations.',
    icon: 'Smartphone',
    color: 'purple',
    highlights: ['Android & Kotlin', 'MVVM', 'Offline-First'],
    recommended: false,
  },
]

export function CVDownloadModal({ isOpen, onClose }: CVDownloadModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [generatingId, setGeneratingId] = useState<string | null>(null)
  const backdropAnimation = useAccessibleAnimation(fadeIn)
  const modalAnimation = useAccessibleAnimation(scaleIn)
  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  // Close on escape
  useKeyPress('Escape', () => {
    if (isOpen && !generatingId) onClose()
  })

  // Close on click outside
  useClickOutside(modalRef, () => {
    if (isOpen && !generatingId) onClose()
  })

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleDownload = async (roleId: string) => {
    const config = roleConfig[roleId]
    if (!config) return

    setGeneratingId(roleId)

    try {
      // Generate PDF blob on-the-fly (lazy loaded)
      const blob = await generatePDF(roleId)

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Arshad_Shah_CV_${config.title.replace(/\s+/g, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to generate PDF:', error)
    } finally {
      setGeneratingId(null)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          style={{ zIndex: Z_INDEX.modal }}
        >
          {/* Backdrop */}
          <motion.div
            className="bg-primary/80 absolute inset-0 backdrop-blur-md"
            onClick={() => !generatingId && onClose()}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            variants={modalAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'relative w-full max-w-4xl max-h-[90vh] overflow-y-auto',
              'bg-secondary border border-border-subtle',
              'shadow-2xl shadow-black/50'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
          >
            {/* Header */}
            <div className="sticky top-0 bg-secondary/95 backdrop-blur-sm border-b border-border-subtle p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-accent-gold/10 border border-accent-gold/20">
                      <FileDown className="w-5 h-5 text-accent-gold" />
                    </div>
                    <h2
                      id="cv-modal-title"
                      className="font-display text-2xl sm:text-3xl font-bold text-text-primary"
                    >
                      Download CV
                    </h2>
                  </div>
                  <p className="text-text-secondary text-sm sm:text-base max-w-xl">
                    Choose the version tailored for your target role
                  </p>
                </div>
                <IconButton
                  variant="ghost"
                  icon={<X className="w-5 h-5" />}
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex-shrink-0"
                  disabled={!!generatingId}
                />
              </div>
            </div>

            {/* Content */}
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="visible"
              className="p-6 sm:p-8"
            >
              <p className="text-text-muted text-sm mb-6">
                Each CV is dynamically generated with role-specific skills, experience highlights, and projects to maximize relevance.
              </p>

              {/* CV Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cvVariants.map((variant) => {
                  const Icon = iconMap[variant.icon] || Code2
                  const colors = colorMap[variant.color] || colorMap.gold
                  const isGenerating = generatingId === variant.id

                  return (
                    <motion.div
                      key={variant.id}
                      variants={itemAnimation}
                      className={cn(
                        'group relative flex flex-col p-5',
                        'border transition-all duration-300',
                        'hover:shadow-lg hover:-translate-y-1',
                        colors.border,
                        colors.glow,
                        variant.recommended && 'ring-1 ring-accent-gold/50'
                      )}
                    >
                      {/* Recommended Badge */}
                      {variant.recommended && (
                        <div className="absolute -top-3 left-4 px-3 py-1 bg-accent-gold text-primary text-xs font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Recommended
                        </div>
                      )}

                      {/* Icon & Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={cn('p-2.5 border', colors.bg, colors.border)}>
                          <Icon className={cn('w-5 h-5', colors.text)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-text-primary text-lg leading-tight">
                            {variant.title}
                          </h3>
                          <p className={cn('text-xs font-medium mt-0.5', colors.text)}>
                            {variant.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                        {variant.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {variant.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className={cn(
                              'px-2 py-0.5 text-xs font-medium',
                              'border border-border-subtle bg-primary/50',
                              'text-text-muted'
                            )}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownload(variant.id)}
                        disabled={!!generatingId}
                        className={cn(
                          'w-full flex items-center justify-center gap-2 py-2.5 px-4',
                          'font-medium text-sm transition-all duration-300',
                          'border',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          variant.recommended
                            ? 'bg-accent-gold text-primary hover:bg-accent-gold-light border-accent-gold'
                            : cn(
                                'bg-transparent hover:bg-white/5',
                                colors.border,
                                colors.text
                              ),
                          'focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none'
                        )}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download CV
                          </>
                        )}
                      </button>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-border-subtle">
                <p className="text-text-muted text-xs text-center">
                  CVs are generated on-demand with ATS-optimized formatting • Last updated: January 2025
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
