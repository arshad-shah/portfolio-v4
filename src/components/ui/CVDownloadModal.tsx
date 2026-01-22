import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  Layers,
  Monitor,
  Server,
  GitBranch,
  FileText,
  Sparkles,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateCV, getCVRoles } from '@/lib/cv-generator'
import { scaleIn, fadeIn, staggerContainer, staggerItem } from '@/lib/animations'

interface CVDownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Monitor,
  Server,
  GitBranch,
}

export function CVDownloadModal({ isOpen, onClose }: CVDownloadModalProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const roles = getCVRoles()

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedRole(null)
      setIsGenerating(false)
      setIsGenerated(false)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleDownload = useCallback(async () => {
    if (!selectedRole) return

    setIsGenerating(true)

    // Small delay for animation
    await new Promise((resolve) => setTimeout(resolve, 800))

    try {
      generateCV(selectedRole)
      setIsGenerated(true)

      // Auto close after success
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      console.error('Error generating CV:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [selectedRole, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
          >
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
            <div
              className="border-border-subtle bg-primary relative w-full max-w-2xl overflow-hidden border shadow-2xl"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header gradient line */}
              <div className="from-accent-gold via-accent-blue to-accent-gold absolute top-0 right-0 left-0 h-1 bg-gradient-to-r" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-accent-gold absolute top-4 right-4 z-10 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-6 pt-8 sm:p-8 sm:pt-10">
                {/* Header */}
                <div className="mb-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="bg-accent-gold/10 border-accent-gold/30 mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border"
                  >
                    <FileText className="text-accent-gold h-7 w-7" />
                  </motion.div>
                  <h2
                    id="cv-modal-title"
                    className="font-display text-text-primary mb-2 text-2xl font-bold sm:text-3xl"
                  >
                    Download My CV
                  </h2>
                  <p className="text-text-secondary mx-auto max-w-md text-sm">
                    Choose a role-tailored CV that highlights the most relevant skills and
                    experience for your needs
                  </p>
                </div>

                {/* Role selection grid */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {roles.map((role) => {
                    const IconComponent = iconMap[role.icon] || Layers
                    const isSelected = selectedRole === role.id

                    return (
                      <motion.button
                        key={role.id}
                        variants={staggerItem}
                        onClick={() => setSelectedRole(role.id)}
                        className={cn(
                          'group relative overflow-hidden border p-4 text-left transition-all duration-300',
                          isSelected
                            ? 'border-accent-gold bg-accent-gold/5'
                            : 'border-border-subtle hover:border-accent-gold/50 bg-secondary/30 hover:bg-secondary/50'
                        )}
                      >
                        {/* Selection indicator */}
                        <div
                          className={cn(
                            'absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full border transition-all',
                            isSelected
                              ? 'border-accent-gold bg-accent-gold'
                              : 'border-text-secondary/30 bg-transparent'
                          )}
                        >
                          {isSelected && <Check className="text-primary h-3 w-3" />}
                        </div>

                        {/* Icon and title */}
                        <div className="mb-2 flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-sm transition-colors"
                            style={{
                              backgroundColor: `${role.color}15`,
                              borderColor: `${role.color}30`,
                            }}
                          >
                            <IconComponent className="h-5 w-5" style={{ color: role.color }} />
                          </div>
                          <div className="pr-6">
                            <h3
                              className={cn(
                                'font-semibold transition-colors',
                                isSelected ? 'text-accent-gold' : 'text-text-primary'
                              )}
                            >
                              {role.title}
                            </h3>
                            <p className="text-text-secondary text-xs">{role.subtitle}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary text-xs leading-relaxed">
                          {role.description}
                        </p>

                        {/* Highlighted skills preview */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {role.highlightedSkills.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="bg-secondary text-text-secondary rounded-sm px-2 py-0.5 text-[10px]"
                            >
                              {skill}
                            </span>
                          ))}
                          {role.highlightedSkills.length > 4 && (
                            <span className="text-text-secondary/60 px-1 text-[10px]">
                              +{role.highlightedSkills.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Hover glow effect */}
                        <div
                          className={cn(
                            'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300',
                            isSelected ? 'opacity-100' : 'group-hover:opacity-50'
                          )}
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${role.color}10 0%, transparent 70%)`,
                          }}
                        />
                      </motion.button>
                    )
                  })}
                </motion.div>

                {/* Info box */}
                <div className="bg-secondary/50 border-border-subtle mb-6 flex items-start gap-3 border p-4">
                  <Sparkles className="text-accent-blue h-5 w-5 flex-shrink-0" />
                  <div className="text-xs">
                    <p className="text-text-primary mb-1 font-medium">ATS-Optimized Format</p>
                    <p className="text-text-secondary">
                      CVs are generated with clean formatting, proper headings, and standard fonts
                      to ensure maximum compatibility with applicant tracking systems.
                    </p>
                  </div>
                </div>

                {/* Download button */}
                <motion.button
                  onClick={handleDownload}
                  disabled={!selectedRole || isGenerating || isGenerated}
                  whileTap={{ scale: selectedRole ? 0.98 : 1 }}
                  className={cn(
                    'relative flex w-full items-center justify-center gap-2 py-4 font-semibold transition-all duration-300',
                    selectedRole && !isGenerating && !isGenerated
                      ? 'bg-accent-gold text-primary hover:bg-accent-gold-light'
                      : isGenerated
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-secondary text-text-secondary cursor-not-allowed opacity-60'
                  )}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <FileText className="h-5 w-5" />
                      </motion.div>
                      <span>Generating CV...</span>
                    </>
                  ) : isGenerated ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Downloaded Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      <span>{selectedRole ? 'Download CV' : 'Select a Role First'}</span>
                    </>
                  )}

                  {/* Button shine effect */}
                  {selectedRole && !isGenerating && !isGenerated && (
                    <motion.div
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ translateX: ['100%', '-100%'] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  )}
                </motion.button>

                {/* Selected role preview */}
                <AnimatePresence>
                  {selectedRole && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-text-secondary mt-3 text-center text-xs"
                    >
                      CV will be downloaded as{' '}
                      <span className="text-accent-gold font-medium">
                        Arshad_Shah_
                        {roles.find((r) => r.id === selectedRole)?.title.replace(/\s+/g, '_')}
                        _CV.pdf
                      </span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CVDownloadModal
