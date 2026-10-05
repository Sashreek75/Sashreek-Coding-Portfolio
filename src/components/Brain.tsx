import { useEffect, useRef } from 'react'

/**
 * A rotating 3D brain made of particles, drawn on a 2D canvas.
 * Left hemisphere = biology (round neurons, curved dendrites, blue/violet).
 * Right hemisphere = silicon (square nodes, right-angle circuit traces, mint).
 * Signals propagate node-to-node like action potentials.
 */

type P = { x: number; y: number; z: number; g: 0 | 1 | 2 } // g: 0 bio, 1 silicon, 2 hindbrain
type Edge = [number, number]

function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildBrain(dense: boolean) {
  const rnd = mulberry(42)
  const pts: P[] = []
  const sphere = () => {
    const u = rnd() * 2 - 1
    const th = rnd() * Math.PI * 2
    const r = Math.sqrt(1 - u * u)
    return { x: r * Math.cos(th), y: u, z: r * Math.sin(th) }
  }
  const per = dense ? 720 : 420
  for (const s of [-1, 1]) {
    for (let i = 0; i < per; i++) {
      const d = sphere()
      const outer = s * d.x > 0
      let x = s * 0.05 + (outer ? d.x * 0.6 : d.x * 0.08)
      let y = d.y < 0 ? d.y * 0.5 : d.y * 0.68
      const z = d.z * 0.98
      if (d.z > 0) y *= 1 - 0.18 * d.z // narrower frontal lobe
      if (d.y < -0.15 && d.z > -0.35 && outer) y -= 0.1 * Math.sin((d.z + 0.35) * 2.2) // temporal lobe
      if (outer) {
        const k = 1 + 0.055 * Math.sin(9 * d.z + 4 * d.y) * Math.cos(8 * d.y - 3 * d.z) // gyri
        x *= k
        y *= k
      }
      pts.push({ x, y, z, g: s < 0 ? 0 : 1 })
    }
  }
  // cerebellum
  for (let i = 0; i < (dense ? 170 : 100); i++) {
    const d = sphere()
    if (d.z > 0.3) continue
    const stri = 1 + 0.06 * Math.sin(d.y * 26)
    pts.push({ x: d.x * 0.46 * stri, y: -0.5 + d.y * 0.2, z: -0.6 + d.z * 0.3, g: 2 })
  }
  // brain stem
  for (let i = 0; i < (dense ? 60 : 36); i++) {
    const t = rnd()
    const a = rnd() * Math.PI * 2
    pts.push({ x: Math.cos(a) * 0.08, y: -0.45 - t * 0.55, z: -0.22 - t * 0.12 + Math.sin(a) * 0.08, g: 2 })
  }

  // nearest-neighbour edges within each group
  const edges: Edge[] = []
  const nbrs: number[][] = pts.map(() => [])
  for (let i = 0; i < pts.length; i++) {
    const best: [number, number][] = []
    for (let j = 0; j < pts.length; j++) {
      if (i === j || pts[i].g !== pts[j].g) continue
      const dx = pts[i].x - pts[j].x
      const dy = pts[i].y - pts[j].y
      const dz = pts[i].z - pts[j].z
      const d = dx * dx + dy * dy + dz * dz
      if (d > 0.05) continue
      best.push([d, j])
    }
    best.sort((a, b) => a[0] - b[0])
    for (const [, j] of best.slice(0, 3)) {
      if (j > i || !nbrs[j].includes(i)) {
        if (!nbrs[i].includes(j)) {
          edges.push([i, j])
          nbrs[i].push(j)
          nbrs[j].push(i)
        }
      }
    }
  }
  // corpus callosum: long bridges between hemispheres
  const bridges: Edge[] = []
  const bio = pts.map((p, i) => (p.g === 0 ? i : -1)).filter((i) => i >= 0)
  const sil = pts.map((p, i) => (p.g === 1 ? i : -1)).filter((i) => i >= 0)
  for (let k = 0; k < 18; k++) {
    const a = bio[Math.floor(rnd() * bio.length)]
    const b = sil[Math.floor(rnd() * sil.length)]
    if (pts[a].y > -0.1 && pts[b].y > -0.1) bridges.push([a, b])
  }
  return { pts, edges, nbrs, bridges }
}

const COL = [
  [120, 160, 255], // bio blue
  [94, 242, 194], // silicon mint
  [180, 119, 255], // hindbrain violet
]

export function Brain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dense = window.innerWidth > 900
    const { pts, edges, nbrs, bridges } = buildBrain(dense)
    const n = pts.length
    const sx = new Float32Array(n)
    const sy = new Float32Array(n)
    const sz = new Float32Array(n)
    const flash = new Float32Array(n)

    // glow sprites
    const sprite = (rgb: number[]) => {
      const c = document.createElement('canvas')
      c.width = c.height = 64
      const g = c.getContext('2d')!
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32)
      gr.addColorStop(0, 'rgba(255,255,255,1)')
      gr.addColorStop(0.25, `rgba(${rgb.join(',')},0.8)`)
      gr.addColorStop(1, `rgba(${rgb.join(',')},0)`)
      g.fillStyle = gr
      g.fillRect(0, 0, 64, 64)
      return c
    }
    const sprites = COL.map(sprite)

    type Pulse = { a: number; b: number; t: number; v: number }
    let pulses: Pulse[] = []
    const spawn = (from?: number) => {
      const a = from ?? Math.floor(Math.random() * n)
      const ns = nbrs[a]
      if (!ns.length) return
      pulses.push({ a, b: ns[Math.floor(Math.random() * ns.length)], t: 0, v: 0.03 + Math.random() * 0.03 })
    }

    let w = 0
    let h = 0
    let scale = 1
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      scale = Math.min(w * 0.4, h * 0.52)
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5
      mouse.ty = e.clientY / window.innerHeight - 0.5
    }

    let visible = true
    let raf = 0
    const start = performance.now()

    const frame = (now: number) => {
      const t = (now - start) / 1000
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      // swing between left (neurons) and right (circuits) side views — the most brain-like angles
      const ry = Math.PI / 2 + (reduce ? 0.5 : Math.sin(t * 0.22) * 1.05) + mouse.x * 0.6
      const rx = 0.32 + mouse.y * 0.3
      const cy = Math.cos(ry)
      const syn = Math.sin(ry)
      const cx = Math.cos(rx)
      const sxn = Math.sin(rx)
      const breathe = 1 + Math.sin(t * 1.2) * 0.012

      for (let i = 0; i < n; i++) {
        const p = pts[i]
        const x1 = p.x * cy + p.z * syn
        const z1 = -p.x * syn + p.z * cy
        const y1 = p.y * cx - z1 * sxn
        const z2 = p.y * sxn + z1 * cx
        const f = 3.2 / (3.2 - z2)
        sx[i] = w / 2 + x1 * scale * f * breathe
        sy[i] = h / 2 - (y1 + 0.12) * scale * f * breathe
        sz[i] = z2
      }

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      // edges, bucketed by depth so the back fades
      for (let g = 0; g < 3; g++) {
        for (let bucket = 0; bucket < 3; bucket++) {
          ctx.beginPath()
          for (const [a, b] of edges) {
            if (pts[a].g !== g) continue
            const z = (sz[a] + sz[b]) / 2
            const bk = z < -0.3 ? 0 : z < 0.3 ? 1 : 2
            if (bk !== bucket) continue
            ctx.moveTo(sx[a], sy[a])
            if (g === 1) {
              // circuit trace: right angle
              ctx.lineTo(sx[b], sy[a])
              ctx.lineTo(sx[b], sy[b])
            } else {
              const mx = (sx[a] + sx[b]) / 2 + (sy[b] - sy[a]) * 0.25
              const my = (sy[a] + sy[b]) / 2 - (sx[b] - sx[a]) * 0.25
              ctx.quadraticCurveTo(mx, my, sx[b], sy[b])
            }
          }
          const [r, gg, b] = COL[g]
          ctx.strokeStyle = `rgba(${r},${gg},${b},${[0.05, 0.12, 0.22][bucket]})`
          ctx.lineWidth = bucket === 2 ? 0.9 : 0.6
          ctx.stroke()
        }
      }

      // corpus callosum bridges
      ctx.beginPath()
      for (const [a, b] of bridges) {
        ctx.moveTo(sx[a], sy[a])
        ctx.quadraticCurveTo((sx[a] + sx[b]) / 2, Math.min(sy[a], sy[b]) - 40, sx[b], sy[b])
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 0.8
      ctx.stroke()

      // nodes
      for (let i = 0; i < n; i++) {
        const p = pts[i]
        const depth = (sz[i] + 1) / 2 // 0 back → 1 front
        const [r, g, b] = COL[p.g]
        const fl = flash[i]
        const a = 0.18 + depth * 0.6 + fl
        const size = (0.7 + depth * 1.3) * (1 + fl * 1.5)
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a)})`
        if (p.g === 1) ctx.fillRect(sx[i] - size * 0.8, sy[i] - size * 0.8, size * 1.6, size * 1.6)
        else {
          ctx.beginPath()
          ctx.arc(sx[i], sy[i], size, 0, Math.PI * 2)
          ctx.fill()
        }
        if (fl > 0.05) {
          const s = 14 * fl + 5
          ctx.globalAlpha = fl
          ctx.drawImage(sprites[p.g], sx[i] - s, sy[i] - s, s * 2, s * 2)
          ctx.globalAlpha = 1
        }
        flash[i] *= 0.92
      }

      // action potentials
      if (!reduce) {
        while (pulses.length < (dense ? 26 : 14)) spawn()
        const next: Pulse[] = []
        for (const pu of pulses) {
          pu.t += pu.v
          if (pu.t >= 1) {
            flash[pu.b] = 1
            if (Math.random() < 0.88 && next.length < 60) {
              const ns = nbrs[pu.b].filter((k) => k !== pu.a)
              if (ns.length) next.push({ a: pu.b, b: ns[Math.floor(Math.random() * ns.length)], t: 0, v: pu.v })
            }
            continue
          }
          const g = pts[pu.a].g
          let x: number
          let y: number
          if (g === 1) {
            // follow the L-shaped trace
            const ax = sx[pu.a]
            const ay = sy[pu.a]
            const bx = sx[pu.b]
            const by = sy[pu.b]
            const l1 = Math.abs(bx - ax)
            const l2 = Math.abs(by - ay)
            const d = pu.t * (l1 + l2 || 1)
            if (d < l1) {
              x = ax + Math.sign(bx - ax) * d
              y = ay
            } else {
              x = bx
              y = ay + Math.sign(by - ay) * (d - l1)
            }
          } else {
            x = sx[pu.a] + (sx[pu.b] - sx[pu.a]) * pu.t
            y = sy[pu.a] + (sy[pu.b] - sy[pu.a]) * pu.t
          }
          const depth = (sz[pu.a] + 1) / 2
          const s = 5 + depth * 6
          ctx.globalAlpha = 0.4 + depth * 0.6
          ctx.drawImage(sprites[g], x - s, y - s, s * 2, s * 2)
          ctx.globalAlpha = 1
          next.push(pu)
        }
        pulses = next
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = (now: number) => {
      if (visible) frame(now)
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    resize()
    if (reduce) frame(performance.now())
    else raf = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden />
}
