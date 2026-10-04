import { useEffect, useRef } from 'react'

/**
 * A drifting field of "neurons". Nearby nodes connect, the cursor pulls them in,
 * and every so often a signal fires down a connection like a synapse.
 */
export function NeuralField({ className, density = 0.00009 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number }
    type Pulse = { a: number; b: number; t: number; speed: number }
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const mouse = { x: -9999, y: -9999 }
    const LINK = 150

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(28, Math.min(140, Math.floor(w * h * density)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random(),
      }))
      pulses = []
    }

    const color = (t: number, a: number) => {
      // blend brand blue (109,156,255) → purple (180,119,255)
      const r = Math.round(109 + (180 - 109) * t)
      const g = Math.round(156 + (119 - 156) * t)
      return `rgba(${r},${g},255,${a})`
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        // gentle pull toward cursor
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d2 = dx * dx + dy * dy
        if (d2 < 200 * 200) {
          n.vx += dx * 0.00004
          n.vy += dy * 0.00004
        }
        n.vx *= 0.995
        n.vy *= 0.995
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = w + 20
        if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        if (n.y > h + 20) n.y = -20
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK) {
            const near = Math.hypot(mouse.x - (a.x + b.x) / 2, mouse.y - (a.y + b.y) / 2) < 180
            ctx.strokeStyle = color((a.hue + b.hue) / 2, (1 - d / LINK) * (near ? 0.55 : 0.18))
            ctx.lineWidth = near ? 1 : 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            if (!reduce && pulses.length < 14 && Math.random() < 0.0006) {
              pulses.push({ a: i, b: j, t: 0, speed: 0.012 + Math.random() * 0.02 })
            }
          }
        }
      }

      // signals firing along connections
      pulses = pulses.filter((p) => p.t <= 1)
      for (const p of pulses) {
        p.t += p.speed
        const a = nodes[p.a]
        const b = nodes[p.b]
        if (!a || !b) continue
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10)
        g.addColorStop(0, 'rgba(255,255,255,0.95)')
        g.addColorStop(0.3, color(a.hue, 0.6))
        g.addColorStop(1, color(a.hue, 0))
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()
      }

      // nodes
      for (const n of nodes) {
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 160
        ctx.fillStyle = color(n.hue, near ? 1 : 0.7)
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? n.r + 1.2 : n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      if (visible) step()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    resize()
    if (reduce) step()
    else loop()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [density])

  return <canvas ref={ref} className={className} aria-hidden />
}
