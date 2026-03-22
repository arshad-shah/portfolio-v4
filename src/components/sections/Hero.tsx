// src/components/sections/Hero.tsx

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Mail, Sparkles } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/Button'
import { Badge, BadgeGroup } from '@/components/ui/Badge'
import { fadeInUp, fadeInDown, fadeInRight, staggerContainer, staggerItem } from '@/lib/animations'
import { scrollToElement } from '@/lib/utils'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'
import { useScrollAnimation } from '@/hooks/useIntersectionObserver'

interface HeroProps {
  data: {
    name: {
      first: string
      last: string
    }
    title: string
    headline?: string
    description: string
    location: {
      display: string
    }
    technologies: string[]
    availability: {
      status: string
    }
  }
}

/**
 * Hero section — Landing area with profile and introduction
 */
export function Hero({ data }: HeroProps) {
  const titleAnimation = useAccessibleAnimation(fadeInDown)
  const contentAnimation = useAccessibleAnimation(fadeInUp)
  const imageAnimation = useAccessibleAnimation(fadeInRight)
  const badgesAnimation = useAccessibleAnimation(staggerContainer)

  const { ref: scrollIndicatorRef, isIntersecting } = useScrollAnimation()

  const handleScrollToProjects = () => {
    scrollToElement('projects')
  }

  const handleScrollToContact = () => {
    scrollToElement('contact')
  }

  return (
    <section className="bg-primary relative min-h-screen pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-accent-gold/3 absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full blur-[120px]" />
        <div className="bg-accent-blue/3 absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,165,116,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.3) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <Container className="relative">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center py-12 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Content — Left Side */}
            <div className="lg:col-span-7">
              {/* Status badge */}
              <motion.div
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <span className="border-accent-gold/20 bg-accent-gold/5 text-accent-gold inline-flex items-center gap-2 border px-4 py-1.5 text-sm font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  {data.availability.status}
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="font-display text-text-primary lg:text-hero mb-4 text-5xl font-bold tracking-tight md:text-6xl"
              >
                {data.name.first}{' '}
                <span className="from-accent-gold to-accent-gold-light bg-gradient-to-r bg-clip-text text-transparent">
                  {data.name.last}
                </span>
              </motion.h1>

              {/* Title */}
              <motion.h2
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="font-display text-text-secondary mb-2 text-2xl font-semibold md:text-3xl"
              >
                {data.title}
              </motion.h2>

              {/* Headline */}
              {data.headline && (
                <motion.p
                  variants={contentAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.25 }}
                  className="text-accent-gold/80 mb-6 font-mono text-sm"
                >
                  {'// '}
                  {data.headline}
                </motion.p>
              )}

              {/* Description */}
              <motion.p
                variants={contentAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="text-text-secondary mb-8 max-w-xl text-lg leading-relaxed"
              >
                {data.description}
              </motion.p>

              {/* Location */}
              <motion.div
                variants={contentAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                className="text-text-secondary mb-8 flex items-center gap-2 text-sm"
              >
                <MapPin className="text-accent-gold h-4 w-4" />
                <span>{data.location.display}</span>
              </motion.div>

              {/* Technologies */}
              <motion.div
                variants={badgesAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="mb-10"
              >
                <BadgeGroup animated>
                  {data.technologies.map((tech, index) => (
                    <motion.div key={tech} variants={staggerItem} custom={index}>
                      <Badge variant="secondary" size="sm" className="font-mono">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </BadgeGroup>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={contentAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleScrollToProjects}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  View My Work
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleScrollToContact}
                  rightIcon={<Mail className="h-5 w-5" />}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </div>

            {/* Image — Right Side */}
            <div className="lg:col-span-5">
              <motion.div
                variants={imageAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="relative mx-auto max-w-sm lg:max-w-none"
              >
                {/* Decorative frame */}
                <div className="border-accent-gold/20 absolute -inset-3 border" />
                <div className="border-accent-gold/10 absolute -inset-6 border" />

                {/* Image container */}
                <div className="bg-secondary relative overflow-hidden">
                  <picture>
                    <source srcSet="/images/profile.webp" type="image/webp" />
                    <img
                      src="/images/profile.jpg"
                      alt={`${data.name.first} ${data.name.last} — Senior Software Engineer`}
                      width={400}
                      height={500}
                      className="relative z-10 w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>

                  {/* Overlay */}
                  <div className="bg-accent-gold/10 absolute inset-0 z-20 mix-blend-multiply transition-opacity duration-700 hover:opacity-0" />
                </div>

                {/* Stats card overlay */}
                <div className="border-border-subtle bg-primary/90 absolute -right-4 -bottom-4 z-30 border p-4 backdrop-blur-sm">
                  <div className="text-accent-gold font-mono text-xs">
                    <p>
                      <span className="text-text-muted">years</span> →{' '}
                      <span className="font-semibold">3+</span>
                    </p>
                    <p>
                      <span className="text-text-muted">rps</span> →{' '}
                      <span className="font-semibold">8,250+</span>
                    </p>
                    <p>
                      <span className="text-text-muted">uptime</span> →{' '}
                      <span className="font-semibold">99.9%</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        >
          <span className="text-text-muted font-mono text-xs">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="border-text-muted/30 flex h-8 w-5 items-start justify-center rounded-full border-2 p-1"
          >
            <motion.div className="bg-accent-gold h-1.5 w-1.5 rounded-full" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
