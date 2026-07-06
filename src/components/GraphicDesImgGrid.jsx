import { useEffect, useRef } from 'react'

function GraphicDesImgGrid() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleScroll() {
    if (window.innerWidth <= 768) return

    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const windowHeight = window.innerHeight

    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrolled = windowHeight - rect.top
      const move = scrolled * 0.1

      section.querySelector('.item-1').style.transform = `translateY(${move}px)`
      section.querySelector('.item-3').style.transform = `translateY(${move}px)`
      section.querySelector('.item-2').style.transform = `translateY(-${move}px)`
      section.querySelector('.item-4').style.transform = `translateY(-${move}px)`
    }
  }

  return (
    <section
      ref={sectionRef}
      className="image-grid-wrapper grid grid-cols-4 gap-4 px-[6%] pb-15 mb-8 items-start"
    >

      <div className="grid-item item-1 rounded-[20px] aspect-square overflow-hidden relative cursor-pointer">
        <img src="/images/grid-1.jpg" alt="Designer at laptop" className="w-full h-full object-cover" />
        <div className="grid-overlay">
          <span className="text-white font-bold text-lg uppercase tracking-wide">Design</span>
        </div>
      </div>

      <div className="grid-item item-2 rounded-[20px] aspect-square overflow-hidden relative cursor-pointer mt-12.5">
        <img src="/images/grid-2.jpg" alt="Designer at monitor" className="w-full h-full object-cover" />
        <div className="grid-overlay">
          <span className="text-white font-bold text-lg uppercase tracking-wide">Colours</span>
        </div>
      </div>

      <div className="grid-item item-3 rounded-[20px] aspect-square overflow-hidden relative cursor-pointer">
        <img src="/images/grid-3.jpg" alt="Color swatches" className="w-full h-full object-cover" />
        <div className="grid-overlay">
          <span className="text-white font-bold text-lg uppercase tracking-wide">Creative</span>
        </div>
      </div>

      <div className="grid-item item-4 rounded-[20px] aspect-square overflow-hidden relative cursor-pointer mt-12.5">
        <img src="/images/grid-4.jpg" alt="Designer sketching" className="w-full h-full object-cover" />
        <div className="grid-overlay">
          <span className="text-white font-bold text-lg uppercase tracking-wide">Sketch</span>
        </div>
      </div>

    </section>
  )
}

export default GraphicDesImgGrid
