'use client'

import { useEffect, useRef } from 'react'

const paragraphs = [
  `The first thing people often underestimate about long-form reading on the web is how physical it actually feels. Your eyes move in small jumps, your posture shifts without you noticing, and your sense of time subtly stretches as paragraphs continue beyond what you initially expected. A long paragraph invites commitment. It asks the reader not just to glance, but to settle in, to slow down, and to accept that meaning will unfold gradually rather than immediately. This is why long text benefits so strongly from motion that respects attention. When a paragraph flies into view only once it becomes relevant, it feels intentional rather than overwhelming. The content arrives when the reader is ready for it, not all at once, not demanding effort prematurely. As screens have grown taller and resolutions sharper, designers have rediscovered that vertical space is not merely a container but a rhythm. Each section becomes a moment, and motion becomes punctuation. In long essays, reports, or narrative-driven interfaces, animation should not entertain so much as guide. It should suggest that something new has arrived, not shout about it. A gentle upward motion mirrors how we naturally scroll, reinforcing the mental model that progress is happening. When text appears statically, it can feel heavy, especially when there is a lot of it. But when it arrives gradually, it feels lighter, even if the word count is substantial. This effect compounds across long reading sessions. The reader feels less fatigue because their attention is continuously re-engaged. They are not confronted with an intimidating wall of text; instead, they encounter a sequence of arrivals. Over time, this builds trust. The interface feels considerate. It respects cognitive load and acknowledges that reading is work, even when it is pleasurable. Long paragraphs also encourage better writing. When you know the reader will encounter your words one section at a time, you are more likely to shape each paragraph as a complete thought rather than a dumping ground for ideas. This discipline improves clarity and pacing. In a sense, motion design becomes a writing tool, reinforcing structure that already exists in the text. When used carefully, it disappears into the experience, leaving only the feeling that the page flows naturally.`,

  `In the second long passage, it is worth considering how scroll-based animation changes the relationship between reader and document. Traditional print assumes linear commitment: once you turn the page, everything is there, waiting. On the web, however, the act of scrolling is a negotiation. The reader controls speed, direction, and attention, and the interface responds in real time. This creates an opportunity to make reading feel more collaborative. When a paragraph animates into view, it signals that the system is paying attention to the reader’s actions. It reacts, rather than merely existing. This subtle feedback loop can increase engagement without the reader consciously noticing why. The key is restraint. If every element moves aggressively, the effect becomes tiring and even hostile. But when motion is reserved for meaningful transitions—such as the arrival of a new, substantial paragraph—it feels earned. Long paragraphs benefit especially because they mark a shift in mental state. The reader transitions from scanning to reading, from navigation to immersion. A fly-in animation provides a brief moment of orientation, allowing the reader to prepare for sustained focus. This mirrors techniques used in spoken storytelling, where a pause or change in tone signals importance. In interface design, motion can play the same role. Another important aspect is performance. Long text is cheap to render, but animation can become expensive if misused. Using IntersectionObserver ensures that animations only occur when necessary, preserving both battery life and smoothness. This technical choice aligns with the philosophical goal of respect: respect for the user’s device, their time, and their attention. Over hundreds or thousands of words, these small considerations accumulate. The experience becomes calm rather than frantic. The reader is less likely to abandon the page, not because they are forced to stay, but because nothing pushes them away. In this way, thoughtful animation supports long-form content rather than competing with it. It becomes part of the reading environment, like good lighting in a room: noticed only when it is missing.`,

  `The third paragraph expands on the idea that long text and modern interfaces are not enemies, despite common assumptions. Many people believe that users no longer read, that attention spans have collapsed, and that anything longer than a few sentences is destined to be ignored. In practice, people read extensively when the content respects them. They read documentation, essays, investigative journalism, and deep technical explanations every day. What they resist is friction. Poor typography, overwhelming layouts, and abrupt content dumps all create unnecessary barriers. Animation, when subtle and purposeful, can remove some of this friction. A long paragraph that enters the viewport smoothly feels less like an obligation and more like an invitation. The reader is given a moment to choose engagement. This autonomy is critical. It transforms reading from a chore into an act of consent. Additionally, long paragraphs encourage coherence. When ideas are allowed to develop fully, without being chopped into artificial fragments, the reader can build a mental model that persists across the text. Motion supports this by clearly separating one major idea from the next. Each fly-in marks a boundary, a transition point. This is especially valuable on mobile devices, where screen size limits context. A paragraph that animates in is unmistakably new. The reader does not need to guess where they are in the document. Over hundreds of words, this clarity reduces cognitive overhead. The result is paradoxical: a longer text that feels easier to read than a shorter one. This is the power of alignment between content and presentation. When structure, motion, and writing all reinforce the same rhythm, the reader can relax into the experience. They stop fighting the interface and start absorbing the ideas.`,

  `In the fourth long passage, we can look at how this approach scales beyond simple demos into real applications. Consider knowledge bases, onboarding flows, or educational platforms. These environments often contain dense explanations that users must understand to succeed. Throwing all of that information onto the screen at once is rarely effective. Progressive disclosure is a well-known principle, but it is often applied only at the level of navigation. Scroll-triggered animation applies the same principle within a single page. It acknowledges that even within a continuous document, attention unfolds over time. Long paragraphs are not just blocks of text; they are experiences with beginnings, middles, and ends. When each paragraph arrives as the user reaches it, the interface reinforces this temporal structure. This can improve comprehension, especially for complex material. The reader is less likely to skim accidentally, because the arrival of new content is marked. Importantly, this does not mean forcing the reader to slow down. The animation is fast and subtle. It respects fast readers while still providing orientation. From an implementation perspective, the pattern is simple and robust. IntersectionObserver is widely supported and efficient. CSS transitions handle the animation without heavy JavaScript involvement. This simplicity matters. The best reading experiences are often built from straightforward techniques applied thoughtfully. Overengineering can introduce bugs, performance issues, and distractions. By contrast, a small amount of well-placed motion can dramatically improve how long text feels. This is especially true when paragraphs exceed several hundred words. At that scale, anything that helps the reader maintain momentum is valuable. Motion becomes a quiet assistant, nudging the experience along without demanding attention for itself.`,

  `The final paragraph brings these ideas together into a broader reflection on digital reading. As screens continue to replace paper in many contexts, designers and developers inherit a responsibility that was once the domain of typographers and editors. They shape not only how content looks, but how it is encountered over time. Long paragraphs challenge us to think beyond minimalism and novelty. They demand durability. A reader may spend minutes with a single paragraph, returning to it, re-reading sections, and forming opinions. The interface should support this depth rather than rushing the reader onward. Fly-in animations tied to viewport entry are one small tool in this larger effort. They help establish pacing, mark transitions, and reduce intimidation. Most importantly, they signal care. They suggest that someone thought about how this text would be read, not just how it would be rendered. In an age of infinite feeds and disposable content, this care stands out. It invites trust. When readers feel respected, they are more willing to invest their time and attention, even across thousands of words. Long paragraphs stop being a liability and become a strength. They allow ideas to breathe, arguments to develop, and narratives to unfold. With the right presentation, length becomes depth rather than burden. And when the interface quietly supports that depth, the technology recedes, leaving only the exchange between writer and reader, which is where meaning ultimately lives.`,
]

export default function FiveParagraphs() {
  const refs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.2,
      }
    )

    refs.current.forEach(el => el && observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Fly-In Paragraphs</h1>

      {paragraphs.map((text, index) => (
        <p
          key={index}
          ref={el => {
            refs.current[index] = el
          }}
          className="fly-in"
          style={styles.paragraph}
        >
          {text}
        </p>
      ))}

      <style jsx>{`
        .fly-in {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fly-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: 1.7,
    marginBottom: '4rem',
    color: '#f5f8fa',
  },
}
