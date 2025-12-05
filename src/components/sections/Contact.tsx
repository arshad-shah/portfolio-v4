// src/components/sections/Contact.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  Github,
  Linkedin,
  Award,
  Check,
  Copy,
  Twitter,
  Code2,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge, BadgeGroup } from '@/components/ui/Badge'
import { Button, IconButton } from '@/components/ui/Button'
import { SocialLink } from '@/components/ui/Link'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
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

  const handleCopy = async (text: string, label: string) => {
    await copy(text)
    setCopiedItem(label)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    GitHub: Github,
    LinkedIn: Linkedin,
    Email: Mail,
    Twitter: Twitter,
    HackerRank: Code2,
    Award,
    MapPin,
    Clock,
    Calendar,
    Briefcase,
  }

  return (
    <AnimatedSection id="contact" className="bg-primary py-24">
      <Container>
        <SectionHeader>
          <span className="text-accent-gold">&lt;</span>
          <span className="text-text-primary">Contact</span>
          <span className="text-accent-gold">/&gt;</span>
        </SectionHeader>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Contact Info */}
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemAnimation} className="mb-8">
              <h3 className="font-display text-h2 text-text-primary mb-4 font-bold">
                {data.heading}
              </h3>
              <p className="text-text-secondary mb-2">{data.subheading}</p>
              <p className="text-text-muted">{data.description}</p>
            </motion.div>

            {/* Email Card */}
            <motion.div variants={itemAnimation} className="mb-6">
              <Card padding="md" hover>
                <CardHeader>
                  <div className="flex items-center justify-between">
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

            {/* Location & Availability */}
            <motion.div variants={itemAnimation}>
              <div className="grid gap-4 sm:grid-cols-2">
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

                <Card padding="md">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="rounded-sm bg-green-500/20 p-2">
                        <Clock className="h-5 w-5 text-green-400" />
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                      </span>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm font-medium">Status</p>
                      <p className="text-text-primary">{data.availability.status}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemAnimation} className="mt-8">
              <h4 className="text-text-primary mb-4 font-medium">Connect with me</h4>
              <div className="flex gap-4">
                {data.social_links
                  .filter((link) => link.primary)
                  .map((link) => {
                    const IconComponent = iconMap[link.platform] || Mail
                    return (
                      <SocialLink
                        key={link.platform}
                        platform={link.platform}
                        href={link.url}
                        icon={<IconComponent className="h-5 w-5" />}
                        label={link.label}
                        className="h-12 w-12"
                      />
                    )
                  })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Working Hours Card */}
            <motion.div variants={itemAnimation}>
              <Card padding="md">
                <CardHeader>
                  <CardTitle className="mb-4 flex items-center gap-2 text-lg">
                    <Calendar className="text-accent-gold h-5 w-5" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-border-subtle flex items-center justify-between border-b pb-3">
                    <span className="text-text-secondary">Schedule</span>
                    <span className="text-text-primary font-mono text-sm">
                      {data.availability.working_hours}
                    </span>
                  </div>
                  <div className="border-border-subtle flex items-center justify-between border-b pb-3">
                    <span className="text-text-secondary">Response Time</span>
                    <span className="text-text-primary font-mono text-sm">
                      {data.availability.response_time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Preferred Contact</span>
                    <Badge variant="primary" size="sm">
                      {data.availability.preferred_contact}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Expertise Card */}
            <motion.div variants={itemAnimation}>
              <Card padding="md">
                <CardHeader>
                  <CardTitle className="mb-4 flex items-center gap-2 text-lg">
                    <Briefcase className="text-accent-gold h-5 w-5" />
                    Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BadgeGroup>
                    {data.expertise.map((skill, idx) => (
                      <Badge key={skill} variant="secondary" size="sm" animated index={idx}>
                        {skill}
                      </Badge>
                    ))}
                  </BadgeGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* Open To Card */}
            <motion.div variants={itemAnimation}>
              <Card padding="md" className="border-accent-gold/20">
                <CardHeader>
                  <CardTitle className="mb-4 text-lg">
                    <span className="text-accent-gold">{'{'}</span> Open to{' '}
                    <span className="text-accent-gold">{'}'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.availability.open_to.map((item, idx) => (
                      <li key={idx} className="text-text-secondary flex items-center gap-2">
                        <span className="text-accent-gold">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Resume Download */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open(data.resume.path, '_blank')}
            rightIcon={<Award className="h-5 w-5" />}
          >
            Download Resume
          </Button>
        </motion.div>
      </Container>

      {/* Footer */}
      <footer className="border-border-subtle mt-24 border-t pt-12">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <div className="font-display text-text-primary mb-2 text-lg font-bold">
                <span className="text-accent-gold">{data.footer.copyright.charAt(0)}</span>
                {data.footer.copyright.slice(1)}
              </div>
              <p className="text-text-secondary text-sm">{data.footer.tagline}</p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-text-muted text-sm">
                Crafted with <span className="text-accent-gold">{'<code/>'}</span> and{' '}
                <span className="text-red-500">♥</span>
              </p>
              <p className="text-text-muted mt-1 text-xs">
                © {data.footer.year === 'auto' ? new Date().getFullYear() : data.footer.year}{' '}
                {data.footer.copyright} • All Rights Reserved
              </p>
              <p className="text-text-muted mt-1 text-xs">
                Built with React, TypeScript, Vite & Tailwind CSS
              </p>
            </div>
          </div>

          {/* Additional Links (Optional) */}
          <div className="border-border-subtle mt-8 flex justify-center gap-6 border-t pt-6">
            {data.social_links.map((link) => {
              const IconComponent = iconMap[link.platform] || Mail
              return (
                <SocialLink
                  key={link.platform}
                  platform={link.platform}
                  href={link.url}
                  icon={<IconComponent className="h-4 w-4" />}
                  label={link.label}
                  className="h-8 w-8 opacity-70 hover:opacity-100"
                />
              )
            })}
          </div>
        </Container>
      </footer>
    </AnimatedSection>
  )
}
