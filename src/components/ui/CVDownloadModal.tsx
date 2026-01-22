import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  Layers,
  Monitor,
  Server,
  GitBranch,
  Smartphone,
  Check,
  FileText,
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
  Smartphone,
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

  // Prevent body scroll when modal is open
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

  const handleDownload = useCallback(async () => {
    if (!selectedRole) return

    setIsGenerating(true)

    // Small delay for animation
    await new Promise((resolve) => setTimeout(resolve, 600))

    try {
      generateCV(selectedRole)
      setIsGenerated(true)

      // Auto close after success
      setTimeout(() => {
        onClose()
      }, 1200)
    } catch (error) {
      console.error('Error generating CV:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [selectedRole, onClose])

  const selectedRoleData = roles.find((r) => r.id === selectedRole)

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
            className="bg-primary/80 fixed inset-0 z-50 backdrop-blur-sm"
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
              className="bg-secondary border-border-subtle relative w-full max-w-2xl overflow-hidden border"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-accent-gold hover:bg-secondary-light absolute top-4 right-4 z-10 rounded-sm p-1 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="mb-6">
                  <h2
                    id="cv-modal-title"
                    className="font-display text-text-primary mb-2 text-xl font-semibold sm:text-2xl"
                  >
                    Download CV
                  </h2>
                  <p className="text-text-secondary text-sm">
                    Select a role to get a tailored CV with relevant skills and experience.
                  </p>
                </div>

                {/* Role selection grid */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
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
                          'group relative border p-4 text-left transition-all duration-200',
                          isSelected
                            ? 'border-accent-gold bg-accent-gold/5'
                            : 'border-border-subtle hover:border-accent-gold/50 bg-primary/50 hover:bg-primary'
                        )}
                      >
                        {/* Selection indicator */}
                        <div
                          className={cn(
                            'absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full border transition-all',
                            isSelected
                              ? 'border-accent-gold bg-accent-gold'
                              : 'border-text-secondary/30 bg-transparent'
                          )}
                        >
                          {isSelected && <Check className="text-primary h-2.5 w-2.5" />}
                        </div>

                        {/* Icon and title */}
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-sm border transition-colors',
                              isSelected
                                ? 'border-accent-gold/30 bg-accent-gold/10'
                                : 'border-border-subtle bg-secondary'
                            )}
                          >
                            <IconComponent
                              className={cn(
                                'h-4 w-4 transition-colors',
                                isSelected ? 'text-accent-gold' : 'text-text-secondary'
                              )}
                            />
                          </div>
                          <div className="min-w-0 flex-1 pr-4">
                            <h3
                              className={cn(
                                'truncate text-sm font-medium transition-colors',
                                isSelected ? 'text-accent-gold' : 'text-text-primary'
                              )}
                            >
                              {role.title}
                            </h3>
                            <p className="text-text-muted truncate text-xs">{role.subtitle}</p>
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </motion.div>

                {/* Selected role details */}
                <AnimatePresence mode="wait">
                  {selectedRoleData && (
                    <motion.div
                      key={selectedRoleData.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="border-border-subtle bg-primary/50 mb-6 border p-4"
                    >
                      <p className="text-text-secondary mb-3 text-sm">
                        {selectedRoleData.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRoleData.highlightedSkills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-secondary border-border-subtle text-text-secondary border px-2 py-0.5 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Info text */}
                <p className="text-text-muted mb-4 flex items-center gap-2 text-xs">
                  <FileText className="h-3.5 w-3.5" />
                  <span>ATS-optimized PDF with clean formatting</span>
                </p>

                {/* Download button */}
                <button
                  onClick={handleDownload}
                  disabled={!selectedRole || isGenerating || isGenerated}
                  className={cn(
                    'flex w-full items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-200',
                    selectedRole && !isGenerating && !isGenerated
                      ? 'bg-accent-gold text-primary hover:bg-accent-gold-light'
                      : isGenerated
                        ? 'bg-accent-gold/20 text-accent-gold'
                        : 'bg-secondary text-text-muted cursor-not-allowed'
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
                        <Download className="h-4 w-4" />
                      </motion.div>
                      <span>Generating...</span>
                    </>
                  ) : isGenerated ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>{selectedRole ? 'Download CV' : 'Select a role'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CVDownloadModal
