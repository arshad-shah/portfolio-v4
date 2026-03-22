// src/components/sections/Contact.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, Check, Copy, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge, BadgeGroup } from '@/components/ui/Badge'
import { IconButton } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'
import type { Contact as ContactType } from '@/types/index'

interface ContactProps {
  data: ContactType
}

/**
 * Contact section — streamlined and professional
 */
export function Contact({ data }: ContactProps) {
  const { copy } = useCopyToClipboard()
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  const handleCopy = async (text: string, label: string) => {
    await copy(text)
    setCopiedItem(label)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const primaryLinks = data.social_links.filter((l) => l.primary)

  return (
    <AnimatedSection id="contact" className="bg-primary py-24">
      <Container>
        <SectionHeader align="center">
          <span className="text-text-primary">Let's Connect</span>
        </SectionHeader>

        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          {/* Intro */}
          <motion.div variants={itemAnimation} className="mb-10 text-center">
            <p className="text-text-secondary mb-2 text-lg">{data.subheading}</p>
            <p className="text-text-muted mx-auto max-w-xl">{data.description}</p>
          </motion.div>

          {/* Email CTA */}
          <motion.div variants={itemAnimation} className="mb-8">
            <Card padding="lg" hover>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-accent-gold/10 border-accent-gold/20 flex h-12 w-12 flex-shrink-0 items-center justify-center border">
                    <Mail className="text-accent-gold h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs font-medium uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-text-primary font-mono text-lg">{data.email.display}</p>
                  </div>
                </div>
                <IconButton
                  variant="accent"
                  icon={
                    copiedItem === 'email' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )
                  }
                  onClick={() => handleCopy(data.email.address, 'email')}
                  aria-label="Copy email"
                  className={cn(
                    copiedItem === 'email' &&
                      '!border-green-400/40 !bg-green-500/20 !text-green-400'
                  )}
                />
              </div>
            </Card>
          </motion.div>

          {/* Info Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <motion.div variants={itemAnimation}>
              <Card padding="md">
                <div className="flex items-center gap-3">
                  <MapPin className="text-accent-blue h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="text-text-muted text-xs">Location</p>
                    <p className="text-text-primary text-sm font-medium">
                      {data.location.display}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <Card padding="md">
                <div className="flex items-center gap-3">
                  <Clock className="text-accent-gold h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="text-text-muted text-xs">Timezone</p>
                    <p className="text-text-primary font-mono text-sm font-medium">
                      {data.location.timezone}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <Card padding="md">
                <div className="flex items-center gap-3">
                  <span className="bg-accent-gold inline-flex h-2 w-2 flex-shrink-0 rounded-full" />
                  <div>
                    <p className="text-text-muted text-xs">Response</p>
                    <p className="text-text-primary text-sm font-medium">
                      {data.availability.response_time}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div variants={itemAnimation} className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {primaryLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border-subtle hover:border-accent-gold/40 hover:bg-accent-gold/5 flex items-center gap-2 border px-5 py-2.5 text-sm transition-all"
                >
                  <span className="text-text-primary font-medium">{link.platform}</span>
                  <ArrowUpRight className="text-text-muted h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Expertise */}
          <motion.div variants={itemAnimation}>
            <Card padding="md">
              <CardContent>
                <p className="text-text-muted mb-4 text-center text-xs font-medium uppercase tracking-wider">
                  Areas of Expertise
                </p>
                <BadgeGroup className="justify-center">
                  {data.expertise.map((skill, idx) => (
                    <Badge key={skill} variant="secondary" size="sm" animated index={idx}>
                      {skill}
                    </Badge>
                  ))}
                </BadgeGroup>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </AnimatedSection>
  )
}
