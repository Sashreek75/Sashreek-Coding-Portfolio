// Shared geometry for the hero brain (see components/Brain.tsx)
export type P = { x: number; y: number; z: number; g: 0 | 1 | 2 } // g: 0 bio, 1 silicon, 2 hindbrain
export type Edge = [number, number]

function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildBrain(dense: boolean) {
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

