// src/components/CVDownloadModal.tsx

import { useRef, useEffect } from 'react'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconButton } from '@/components/ui/Button'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useKeyPress } from '@/hooks/useKeyPress'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'
import { fadeIn, scaleIn, staggerContainer, staggerItem } from '@/lib/animations'
import { Z_INDEX } from '@/lib/constants'
import cvData from '@/data/cv.json'

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

export function CVDownloadModal({ isOpen, onClose }: CVDownloadModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropAnimation = useAccessibleAnimation(fadeIn)
  const modalAnimation = useAccessibleAnimation(scaleIn)
  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  // Close on escape
  useKeyPress('Escape', () => {
    if (isOpen) onClose()
  })

  // Close on click outside
  useClickOutside(modalRef, () => {
    if (isOpen) onClose()
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

  const handleDownload = (path: string, filename: string) => {
    const link = document.createElement('a')
    link.href = path
    link.download = filename
    link.click()
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
            onClick={onClose}
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
                      {cvData.title}
                    </h2>
                  </div>
                  <p className="text-text-secondary text-sm sm:text-base max-w-xl">
                    {cvData.subtitle}
                  </p>
                </div>
                <IconButton
                  variant="ghost"
                  icon={<X className="w-5 h-5" />}
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex-shrink-0"
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
              <p className="text-text-muted text-sm mb-6">{cvData.description}</p>

              {/* CV Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cvData.variants.map((variant) => {
                  const Icon = iconMap[variant.icon] || Code2
                  const colors = colorMap[variant.color] || colorMap.gold

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
                        onClick={() => handleDownload(variant.path, variant.filename)}
                        className={cn(
                          'w-full flex items-center justify-center gap-2 py-2.5 px-4',
                          'font-medium text-sm transition-all duration-300',
                          'border',
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
                        <Download className="w-4 h-4" />
                        Download CV
                      </button>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-border-subtle">
                <p className="text-text-muted text-xs text-center">
                  Last updated: {cvData.lastUpdated} · All CVs are in PDF format
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
