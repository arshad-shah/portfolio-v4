// src/components/sections/Hero.tsx

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Mail } from 'lucide-react'
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
 * Hero section - Landing area with profile and introduction
 */
export function Hero({ data }: HeroProps) {
  const titleAnimation = useAccessibleAnimation(fadeInDown)
  const contentAnimation = useAccessibleAnimation(fadeInUp)
  const imageAnimation = useAccessibleAnimation(fadeInRight)
  const badgesAnimation = useAccessibleAnimation(staggerContainer)

  const technologiesPreviewCount = 6

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
        <div className="bg-accent-gold/5 absolute top-20 left-1/4 h-64 w-64 rounded-full blur-3xl" />
        <div className="bg-accent-blue/5 absolute right-1/4 bottom-20 h-64 w-64 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center py-12 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Content - Left Side */}
            <div className="lg:col-span-7">
              {/* Label */}
              <motion.div
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                className="mb-4"
              >
                <span className="text-accent-gold inline-block font-medium">
                  {data.headline || 'Software Engineer'}
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="font-display text-text-primary lg:text-hero mb-2 text-5xl font-bold md:text-6xl"
              >
                {data.name.first} <span className="text-accent-gold">{data.name.last}</span>.
              </motion.h1>

              {/* Title */}
              <motion.h2
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="font-display text-text-secondary lg:text-display mb-6 text-3xl font-bold md:text-4xl"
              >
                {data.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={contentAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="text-text-secondary mb-6 max-w-xl text-lg leading-relaxed"
              >
                {data.description}
              </motion.p>

              {/* Location & Availability */}
              <motion.div
                variants={contentAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="text-text-secondary mb-8 flex flex-wrap items-center gap-4 text-sm"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="text-accent-gold h-4 w-4" />
                  <span>{data.location.display}</span>
                </div>
                <div className="bg-text-secondary/30 h-4 w-px" />
                <div className="flex items-center gap-2">
                  <span className="bg-accent-gold inline-flex h-2 w-2 rounded-full" />
                  <span>{data.availability.status}</span>
                </div>
              </motion.div>

              {/* Technologies */}
              <motion.div
                variants={badgesAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <p className="text-text-secondary mb-3 text-sm font-medium">Core stack:</p>
                <BadgeGroup animated>
                  {data.technologies.slice(0, technologiesPreviewCount).map((tech, index) => (
                    <motion.div key={tech} variants={staggerItem} custom={index}>
                      <Badge variant="secondary" size="sm" className="font-mono">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}

                  {data.technologies.length > technologiesPreviewCount && (
                    <motion.div
                      key="more-tech"
                      variants={staggerItem}
                      custom={technologiesPreviewCount}
                    >
                      <Badge variant="default" size="sm" className="font-mono">
                        +{data.technologies.length - technologiesPreviewCount}
                      </Badge>
                    </motion.div>
                  )}
                </BadgeGroup>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={contentAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                className="mb-8 flex flex-wrap items-center gap-4"
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

            {/* Image - Right Side */}
            <div className="lg:col-span-5">
              <motion.div
                variants={imageAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="relative mx-auto max-w-sm lg:max-w-none"
              >
                {/* Border decoration */}
                <div className="border-accent-gold absolute inset-0 translate-x-6 translate-y-6 border-2 transition-transform duration-300 hover:translate-x-4 hover:translate-y-4" />

                {/* Image container */}
                <div className="bg-secondary relative overflow-hidden">
                  <picture>
                    <source srcSet="/images/profile.webp" type="image/webp" />
                    <img
                      src="/images/profile.jpg"
                      alt={`${data.name.first} ${data.name.last} - Software Engineer`}
                      width={400}
                      height={500}
                      className="relative z-10 w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>

                  {/* Overlay */}
                  <div className="bg-accent-gold/10 absolute inset-0 z-20 mix-blend-multiply transition-opacity duration-500 hover:opacity-0" />
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
          <span className="text-text-muted text-xs">Scroll down</span>
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
