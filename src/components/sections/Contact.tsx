// src/components/sections/Contact.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, Award, Check, Copy } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
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
 * Contact section with social links and information
 */
export function Contact({ data }: ContactProps) {
  const { copy } = useCopyToClipboard()
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  const focusAreasPreviewCount = 10

  const handleCopy = async (text: string, label: string) => {
    await copy(text)
    setCopiedItem(label)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <AnimatedSection id="contact" className="bg-primary py-24">
      <Container>
        <SectionHeader>
          <span className="text-text-primary">Contact</span>
        </SectionHeader>

        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <motion.div variants={itemAnimation} className="mb-10 text-center">
            <h3 className="font-display text-h2 text-text-primary mb-4 font-bold">
              {data.heading}
            </h3>
            <p className="text-text-secondary mb-2">{data.subheading}</p>
            <p className="text-text-muted mx-auto max-w-2xl">{data.description}</p>
          </motion.div>

          {/* Centered card mosaic */}
          <div className="grid gap-6 lg:grid-cols-6">
            {/* Email - primary CTA */}
            <motion.div variants={itemAnimation} className="lg:col-span-6">
              <Card padding="md" hover>
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent-gold/20 rounded-sm p-2">
                        <Mail className="text-accent-gold h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm font-medium">Email</p>
                        <p className="text-text-primary font-mono">{data.email.display}</p>
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
                </CardHeader>
              </Card>
            </motion.div>

            {/* Location */}
            <motion.div variants={itemAnimation} className="lg:col-span-3">
              <Card padding="md">
                <div className="flex items-center gap-3">
                  <div className="bg-accent-blue/20 rounded-sm p-2">
                    <MapPin className="text-accent-blue h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Location</p>
                    <p className="text-text-primary">{data.location.display}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Timezone */}
            <motion.div variants={itemAnimation} className="lg:col-span-3">
              <Card padding="md">
                <div className="flex items-center gap-3">
                  <div className="bg-accent-gold/20 rounded-sm p-2">
                    <Clock className="text-accent-gold h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Timezone</p>
                    <p className="text-text-primary font-mono text-sm">{data.location.timezone}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Availability */}
            <motion.div variants={itemAnimation} className="lg:col-span-4">
              <Card padding="md">
                <CardHeader>
                  <CardTitle className="mb-4 flex items-center gap-2 text-lg">
                    <Clock className="text-accent-gold h-5 w-5" />
                    Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-border-subtle flex items-center justify-between border-b pb-3">
                    <span className="text-text-secondary">Status</span>
                    <span className="text-text-primary text-sm">{data.availability.status}</span>
                  </div>
                  <div className="border-border-subtle flex items-center justify-between border-b pb-3">
                    <span className="text-text-secondary">Response time</span>
                    <span className="text-text-primary font-mono text-sm">
                      {data.availability.response_time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Preferred contact</span>
                    <Badge variant="primary" size="sm">
                      {data.availability.preferred_contact}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Open to */}
            <motion.div variants={itemAnimation} className="lg:col-span-2">
              <Card padding="md" className="border-accent-gold/20">
                <CardHeader>
                  <CardTitle className="mb-4 text-lg">
                    <span className="text-accent-gold">Open to</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.availability.open_to.map((item, idx) => (
                      <li key={idx} className="text-text-secondary flex items-start gap-2">
                        <span className="text-accent-gold mt-0.5">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Focus Areas */}
            <motion.div variants={itemAnimation} className="lg:col-span-6">
              <Card padding="md">
                <CardHeader>
                  <CardTitle className="mb-4 flex items-center justify-center gap-2 text-lg">
                    <Award className="text-accent-gold h-5 w-5" />
                    Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BadgeGroup className="justify-center">
                    {data.expertise.slice(0, focusAreasPreviewCount).map((skill, idx) => (
                      <Badge key={skill} variant="secondary" size="sm" animated index={idx}>
                        {skill}
                      </Badge>
                    ))}

                    {data.expertise.length > focusAreasPreviewCount && (
                      <Badge variant="default" size="sm" className="font-mono">
                        +{data.expertise.length - focusAreasPreviewCount}
                      </Badge>
                    )}
                  </BadgeGroup>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </AnimatedSection>
  )
}
