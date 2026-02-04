'use client'

import { useEffect, useRef } from 'react'

const paragraphs: string[] = [
  'Cats are a masterclass in biological refinement, blending the prowess of a prehistoric predator with the charm of a domestic companion. These obligate carnivores possess an extraordinary physiological toolkit, including retractable claws, exceptional night vision, and a specialized skeletal structure that allows them to right themselves mid-air during a fall. Beyond their physical agility, cats communicate through a sophisticated lexicon of vocalizations, body language, and scent marking. The purr, perhaps their most enigmatic trait, is not merely a sign of contentment but a therapeutic mechanism that may promote bone density and tissue repair through low-frequency vibrations. While often labeled as aloof, cats form deep, complex bonds with their human counterparts, offering a unique brand of quiet, observant companionship. Whether they are patrolling a farm for pests or reclaiming a sunny patch on a living room rug, cats remain icons of independence and grace, effortlessly maintaining their mysterious allure across cultures and centuries today.',
  'The Cavapoo, a deliberate crossbreed between a Cavalier King Charles Spaniel and a Poodle, has surged in popularity as the quintessential family pet. Known for their soft, wavy coats that are often hypoallergenic, these dogs inherit the gentle, affectionate nature of the Spaniel alongside the high intelligence and low-shedding qualities of the Poodle. Their temperament is remarkably social; they thrive on human interaction and are frequently employed as therapy animals due to their intuitive ability to provide comfort. Because they vary in size depending on whether the Poodle parent was toy or miniature, they adapt easily to both city apartments and sprawling suburban homes. Training a Cavapoo is typically a joy, as their eagerness to please makes them quick learners of tricks and commands. Ultimately, the Cavapoo represents a harmonious blend of playfulness and serenity, making them a loyal companion for those seeking a spirited yet very snuggly addition to homes.',
  'The snow leopard, often referred to as the ghost of the mountains, is a solitary and elusive predator native to the rugged peaks of Central and South Asia. Perfectly adapted for life in the alpine tundra, these cats possess thick, smoky-grey fur patterned with dark rosettes that provide camouflage against the rocky terrain. Their physiological adaptations are stunning: they have wide, fur-covered paws that act as natural snowshoes and a massive, muscular tail used for balance on steep cliffs and as a makeshift blanket against the freezing cold. Unlike other large felines, snow leopards cannot roar; instead, they communicate through chuffs, growls, and mews. Despite their physical dominance, they face significant threats from habitat fragmentation, climate change, and poaching. Conservation efforts are vital for protecting this flagship species, which serves as a critical indicator of the health of high-altitude ecosystems and remains one of the most majestic symbols of wild wilderness regions.',
  'Drones, or Unmanned Aerial Vehicles, have transitioned from specialized military hardware to ubiquitous tools that are reshaping modern industry and recreation. These versatile machines utilize complex flight controllers and GPS stabilization to navigate environments with surgical precision. In the commercial sector, drones have revolutionized fields such as cinematography, allowing for sweeping aerial shots that were once only possible with expensive helicopters. Agriculture has also seen a massive shift, with farmers using thermal imaging drones to monitor crop health and optimize irrigation. Beyond utility, the rise of First Person View racing has turned drone piloting into a high-speed competitive sport. However, the proliferation of drones also raises significant questions regarding privacy, airspace regulation, and security. As battery technology improves and autonomous AI integration becomes more sophisticated, drones are poised to become even more integrated into our daily lives, potentially handling everything from emergency medical deliveries to large-scale infrastructure inspections throughout the globe.',
  'The Milky Way galaxy is a vast, barred spiral system containing an estimated 100 to 400 billion stars, including our own Sun. Spanning approximately 100,000 light-years in diameter, this celestial structure is part of the Local Group of galaxies and is currently on a multi-billion-year collision course with its neighbor, Andromeda. From our perspective on Earth, the galaxy appears as a shimmering, milky band of light stretching across the night sky, a result of the dense concentration of stars and interstellar dust within the galactic plane. At its very heart lies Sagittarius A*, a supermassive black hole around which the entire galaxy rotates. The Milky Way’s spiral arms are regions of active star formation, rich in the gas and dust necessary to birth new solar systems. Studying our home galaxy allows astronomers to understand the fundamental processes of galactic evolution, chemical enrichment, and the mysterious role of dark matter in the universe.',
]

export default function FiveParagraphs() {
  const refs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          } else {
            entry.target.classList.add('opacity-0', 'translate-y-10')
            entry.target.classList.remove('opacity-100', 'translate-y-0')
          }
        })
      },
      {
        threshold: 0.2,
      },
    )

    refs.current.forEach(el => el && observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="max-w-2xl mx-auto px-6 py-12  text-slate-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12">Staggered Reveal</h1>

      <div className="flex flex-col gap-12">
        {paragraphs.map((text, index) => (
          <p
            key={index}
            ref={el => {
              refs.current[index] = el
            }}
            className="text-lg leading-relaxed transition-all duration-700 ease-out opacity-0 translate-y-10"
            style={{
              // This creates a 150ms delay between each paragraph
              // that scales with the index
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </main>
  )
}
