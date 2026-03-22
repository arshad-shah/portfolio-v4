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
  const config = roleConfig[roleId]
  if (!config) throw new Error(`Unknown role: ${roleId}`)

  const [reactPdfModule, cvDocModule] = await Promise.all([
    import('@react-pdf/renderer'),
    import('@/components/CVDocument'),
  ])

  const { pdf } = reactPdfModule
  const { CVDocument } = cvDocModule

  const doc = <CVDocument roleId={roleId} config={config} />
  const blob = await pdf(doc).toBlob()

  return blob
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
    id: 'senior-software-engineer',
    title: 'Senior Software Engineer',
    subtitle: 'Full-spectrum engineering & leadership',
    description:
      'Comprehensive overview highlighting system design, performance engineering, technical leadership, and full-stack expertise.',
    icon: 'Code2',
    color: 'gold',
    highlights: ['System Architecture', 'Leadership', 'Full-Stack'],
    recommended: true,
  },
  {
    id: 'fullstack-developer',
    title: 'Senior Full-Stack Developer',
    subtitle: 'End-to-end solutions',
    description:
      'Balanced focus on frontend and backend technologies, API development, and database design.',
    icon: 'Layers',
    color: 'blue',
    highlights: ['React & Spring Boot', 'GraphQL', 'Database'],
    recommended: false,
  },
  {
    id: 'frontend-developer',
    title: 'Senior Frontend Developer',
    subtitle: 'UI architecture & DX',
    description:
      'Emphasis on React, TypeScript, microfrontends, build optimization, and creating exceptional user experiences.',
    icon: 'Monitor',
    color: 'cyan',
    highlights: ['React & TypeScript', 'Microfrontends', 'Build Optimization'],
    recommended: false,
  },
  {
    id: 'backend-developer',
    title: 'Senior Backend Developer',
    subtitle: 'Distributed systems',
    description:
      'Focus on Spring Boot, microservices, GraphQL Federation, and scalable backend architecture.',
    icon: 'Server',
    color: 'green',
    highlights: ['Spring Boot', 'GraphQL Federation', 'Microservices'],
    recommended: false,
  },
  {
    id: 'mobile-developer',
    title: 'Senior Mobile Developer',
    subtitle: 'Native & cross-platform',
    description:
      'Highlighting Android development with Kotlin, mobile architecture, and native integrations.',
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
      const blob = await generatePDF(roleId)

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Arshad_Shah_CV_${config.title.replace(/\s+/g, '_')}.pdf`
      link.style.display = 'none'
      document.body.appendChild(link)

      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 1000)
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
              'relative max-h-[90vh] w-full max-w-4xl overflow-y-auto',
              'bg-secondary border-border-subtle border',
              'shadow-2xl shadow-black/50'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
          >
            {/* Header */}
            <div className="bg-secondary/95 border-border-subtle sticky top-0 border-b p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="bg-accent-gold/10 border-accent-gold/20 border p-2">
                      <FileDown className="text-accent-gold h-5 w-5" />
                    </div>
                    <h2
                      id="cv-modal-title"
                      className="font-display text-text-primary text-2xl font-bold sm:text-3xl"
                    >
                      Download CV
                    </h2>
                  </div>
                  <p className="text-text-secondary max-w-xl text-sm sm:text-base">
                    Each CV is tailored to the role — highlighting relevant skills, experience, and
                    projects
                  </p>
                </div>
                <IconButton
                  variant="ghost"
                  icon={<X className="h-5 w-5" />}
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
                        'hover:-translate-y-1 hover:shadow-lg',
                        colors.border,
                        colors.glow,
                        variant.recommended && 'ring-accent-gold/50 ring-1'
                      )}
                    >
                      {/* Recommended Badge */}
                      {variant.recommended && (
                        <div className="bg-accent-gold text-primary absolute -top-3 left-4 flex items-center gap-1 px-3 py-1 text-xs font-semibold">
                          <Sparkles className="h-3 w-3" />
                          Recommended
                        </div>
                      )}

                      {/* Icon & Title */}
                      <div className="mb-3 flex items-start gap-3">
                        <div className={cn('border p-2.5', colors.bg, colors.border)}>
                          <Icon className={cn('h-5 w-5', colors.text)} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-text-primary text-base leading-tight font-semibold">
                            {variant.title}
                          </h3>
                          <p className={cn('mt-0.5 text-xs font-medium', colors.text)}>
                            {variant.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary mb-4 flex-1 text-sm leading-relaxed">
                        {variant.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {variant.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className={cn(
                              'px-2 py-0.5 text-xs font-medium',
                              'border-border-subtle bg-primary/50 border',
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
                          'flex w-full items-center justify-center gap-2 px-4 py-2.5',
                          'text-sm font-medium transition-all duration-300',
                          'border',
                          'disabled:cursor-not-allowed disabled:opacity-50',
                          variant.recommended
                            ? 'bg-accent-gold text-primary hover:bg-accent-gold-light border-accent-gold'
                            : cn('bg-transparent hover:bg-white/5', colors.border, colors.text),
                          'focus-visible:ring-accent-gold focus-visible:ring-2 focus-visible:outline-none'
                        )}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Download CV
                          </>
                        )}
                      </button>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer Note */}
              <div className="border-border-subtle mt-8 border-t pt-6">
                <p className="text-text-muted text-center text-xs">
                  CVs are generated on-demand with role-specific content • Last updated: March 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
