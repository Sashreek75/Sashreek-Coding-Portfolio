import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { buildBrain } from '../lib/brainModel'

/**
 * The hero brain, rendered with Three.js.
 * Left hemisphere = biology: round neurons, blue.
 * Right hemisphere = silicon: square nodes on right-angle traces, mint.
 * Action potentials hop node to node; click (or tap) to stimulate a region.
 */

const GROUP_COLORS = [new THREE.Color('#7fa6ff'), new THREE.Color('#5ef2c2'), new THREE.Color('#b98bff')]

const pointVert = /* glsl */ `
  attribute float aSize;
  attribute float aFlash;
  attribute float aShape;
  attribute vec3 color;
  uniform float uPixel;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vShape;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (1.0 + min(aFlash, 1.0) * 1.4) * uPixel * (3.6 / -mv.z);
    gl_Position = projectionMatrix * mv;
    float depth = smoothstep(-4.9, -2.7, mv.z);
    vAlpha = 0.18 + 0.82 * depth + aFlash;
    vColor = mix(color, vec3(1.0), clamp(aFlash, 0.0, 1.0) * 0.75);
    vShape = aShape;
  }
`

const pointFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vShape;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = vShape > 0.5 ? max(abs(c.x), abs(c.y)) : length(c);
    float core = 1.0 - smoothstep(0.12, 0.18, d);
    float glow = exp(-d * d * 18.0) * 0.55;
    float a = (core + glow) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * a, a);
  }
`

const lineVert = /* glsl */ `
  attribute vec3 color;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlpha = smoothstep(-4.9, -2.7, mv.z);
    vColor = color;
  }
`

const lineFrag = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float a = (0.12 + vAlpha * 0.88) * uOpacity;
    gl_FragColor = vec4(vColor * a, a);
  }
`

export function Brain({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dense = window.innerWidth > 900

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return // no WebGL: the page still works without the brain
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20)
    camera.position.set(0, 0.05, 3.8)

    const brain = new THREE.Group()
    brain.position.y = 0.12
    scene.add(brain)

    const { pts, edges, nbrs, bridges } = buildBrain(dense)
    const n = pts.length

    /* ── neurons ── */
    const pos = new Float32Array(n * 3)
    const col = new Float32Array(n * 3)
    const size = new Float32Array(n)
    const shape = new Float32Array(n)
    const flash = new Float32Array(n)
    pts.forEach((p, i) => {
      pos.set([p.x, p.y, p.z], i * 3)
      const c = GROUP_COLORS[p.g]
      col.set([c.r, c.g, c.b], i * 3)
      size[i] = p.g === 1 ? 7 : 8 + Math.random() * 4
      shape[i] = p.g === 1 ? 1 : 0
    })
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    nodeGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    nodeGeo.setAttribute('aShape', new THREE.BufferAttribute(shape, 1))
    const flashAttr = new THREE.BufferAttribute(flash, 1)
    flashAttr.setUsage(THREE.DynamicDrawUsage)
    nodeGeo.setAttribute('aFlash', flashAttr)
    const pointMat = new THREE.ShaderMaterial({
      uniforms: { uPixel: { value: dpr } },
      vertexShader: pointVert,
      fragmentShader: pointFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    brain.add(new THREE.Points(nodeGeo, pointMat))

    /* ── dendrites & traces ── */
    const segs: number[] = []
    const segCol: number[] = []
    // silicon edges follow a right-angle path; store the corners so pulses can follow them too
    const pathOf = (a: number, b: number): THREE.Vector3[] => {
      const A = pts[a]
      const B = pts[b]
      if (A.g !== 1) return [new THREE.Vector3(A.x, A.y, A.z), new THREE.Vector3(B.x, B.y, B.z)]
      return [new THREE.Vector3(A.x, A.y, A.z), new THREE.Vector3(B.x, A.y, A.z), new THREE.Vector3(B.x, B.y, A.z), new THREE.Vector3(B.x, B.y, B.z)]
    }
    for (const [a, b] of edges) {
      const path = pathOf(a, b)
      const c = GROUP_COLORS[pts[a].g]
      for (let k = 0; k < path.length - 1; k++) {
        segs.push(path[k].x, path[k].y, path[k].z, path[k + 1].x, path[k + 1].y, path[k + 1].z)
        segCol.push(c.r, c.g, c.b, c.r, c.g, c.b)
      }
    }
    // corpus callosum: arcs bridging the hemispheres
    for (const [a, b] of bridges) {
      const A = new THREE.Vector3(pts[a].x, pts[a].y, pts[a].z)
      const B = new THREE.Vector3(pts[b].x, pts[b].y, pts[b].z)
      const mid = A.clone().add(B).multiplyScalar(0.5)
      mid.y += 0.35
      const curve = new THREE.QuadraticBezierCurve3(A, mid, B).getPoints(16)
      for (let k = 0; k < curve.length - 1; k++) {
        segs.push(curve[k].x, curve[k].y, curve[k].z, curve[k + 1].x, curve[k + 1].y, curve[k + 1].z)
        segCol.push(0.55, 0.6, 0.7, 0.55, 0.6, 0.7)
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3))
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(segCol, 3))
    const lineMat = new THREE.ShaderMaterial({
      uniforms: { uOpacity: { value: 0.85 } },
      vertexShader: lineVert,
      fragmentShader: lineFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    brain.add(new THREE.LineSegments(lineGeo, lineMat))

    /* ── action potentials ── */
    const MAXP = dense ? 90 : 50
    const pPos = new Float32Array(MAXP * 3)
    const pCol = new Float32Array(MAXP * 3)
    const pSize = new Float32Array(MAXP).fill(11)
    const pShape = new Float32Array(MAXP)
    const pFlash = new Float32Array(MAXP).fill(0.6)
    const pulseGeo = new THREE.BufferGeometry()
    const pPosAttr = new THREE.BufferAttribute(pPos, 3).setUsage(THREE.DynamicDrawUsage)
    const pColAttr = new THREE.BufferAttribute(pCol, 3).setUsage(THREE.DynamicDrawUsage)
    const pShapeAttr = new THREE.BufferAttribute(pShape, 1).setUsage(THREE.DynamicDrawUsage)
    pulseGeo.setAttribute('position', pPosAttr)
    pulseGeo.setAttribute('color', pColAttr)
    pulseGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1))
    pulseGeo.setAttribute('aShape', pShapeAttr)
    pulseGeo.setAttribute('aFlash', new THREE.BufferAttribute(pFlash, 1))
    const pulsePoints = new THREE.Points(pulseGeo, pointMat)
    pulsePoints.frustumCulled = false
    brain.add(pulsePoints)

    type Pulse = { a: number; b: number; t: number; v: number; path: THREE.Vector3[] }
    let pulses: Pulse[] = []
    const spawnFrom = (a: number, prev = -1) => {
      const ns = nbrs[a].filter((k) => k !== prev)
      if (!ns.length || pulses.length >= MAXP) return
      const b = ns[Math.floor(Math.random() * ns.length)]
      pulses.push({ a, b, t: 0, v: 0.025 + Math.random() * 0.025, path: pathOf(a, b) })
    }
    const tmp = new THREE.Vector3()
    const along = (path: THREE.Vector3[], t: number) => {
      if (path.length === 2) return tmp.lerpVectors(path[0], path[1], t)
      const lens = [path[0].distanceTo(path[1]), path[1].distanceTo(path[2]), path[2].distanceTo(path[3])]
      let d = t * (lens[0] + lens[1] + lens[2])
      for (let k = 0; k < 3; k++) {
        if (d <= lens[k] || k === 2) return tmp.lerpVectors(path[k], path[k + 1], lens[k] ? Math.min(1, d / lens[k]) : 1)
        d -= lens[k]
      }
      return tmp
    }

    /* ── interaction ── */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5
      mouse.ty = e.clientY / window.innerHeight - 0.5
    }
    const proj = new THREE.Vector3()
    const nearestNode = (clientX: number, clientY: number) => {
      const r = renderer.domElement.getBoundingClientRect()
      let best = -1
      let bd = 60 * 60
      brain.updateMatrixWorld()
      for (let i = 0; i < n; i++) {
        proj.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]).applyMatrix4(brain.matrixWorld).project(camera)
        if (proj.z > 0.97) continue
        const sx = ((proj.x + 1) / 2) * r.width + r.left
        const sy = ((1 - proj.y) / 2) * r.height + r.top
        const d = (sx - clientX) ** 2 + (sy - clientY) ** 2
        if (d < bd) {
          bd = d
          best = i
        }
      }
      return best
    }
    const stimulate = (e: PointerEvent) => {
      const i = nearestNode(e.clientX, e.clientY)
      if (i < 0) return
      flash[i] = 1.6
      for (let k = 0; k < 8; k++) spawnFrom(i)
      for (const j of nbrs[i]) {
        flash[j] = 1.2
        for (let k = 0; k < 2; k++) spawnFrom(j, i)
      }
    }
    renderer.domElement.addEventListener('pointerdown', stimulate)
    window.addEventListener('pointermove', onMove)

    /* ── sizing ── */
    const resize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // keep the whole brain in frame on narrow screens
      camera.position.z = w / h < 1 ? 3.8 / Math.max(0.62, w / h) : 3.8
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    resize()

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(host)

    const clock = new THREE.Clock()
    let raf = 0
    const frame = () => {
      const t = clock.getElapsedTime()
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      // slow full turn so both the neuron side and the circuit side come around
      brain.rotation.y = Math.PI / 2 + (reduce ? 0.5 : t * 0.16) + mouse.x * 0.6
      brain.rotation.x = 0.3 + mouse.y * 0.3
      brain.scale.setScalar(1 + Math.sin(t * 1.2) * 0.01)

      if (!reduce) {
        while (pulses.length < (dense ? 28 : 16)) spawnFrom(Math.floor(Math.random() * n))
        const next: Pulse[] = []
        for (const p of pulses) {
          p.t += p.v
          if (p.t >= 1) {
            flash[p.b] = Math.max(flash[p.b], 1)
            if (Math.random() < 0.86) {
              const ns = nbrs[p.b].filter((k) => k !== p.a)
              if (ns.length && next.length < MAXP) {
                const b = ns[Math.floor(Math.random() * ns.length)]
                next.push({ a: p.b, b, t: 0, v: p.v, path: pathOf(p.b, b) })
              }
            }
            continue
          }
          next.push(p)
        }
        pulses = next
      }

      for (let k = 0; k < MAXP; k++) {
        const p = pulses[k]
        if (!p) {
          pPos.set([999, 999, 999], k * 3)
          continue
        }
        const v = along(p.path, p.t)
        pPos.set([v.x, v.y, v.z], k * 3)
        const c = GROUP_COLORS[pts[p.a].g]
        pCol.set([c.r, c.g, c.b], k * 3)
        pShape[k] = pts[p.a].g === 1 ? 1 : 0
      }
      pPosAttr.needsUpdate = true
      pColAttr.needsUpdate = true
      pShapeAttr.needsUpdate = true

      for (let i = 0; i < n; i++) flash[i] *= 0.93
      flashAttr.needsUpdate = true

      renderer.render(scene, camera)
    }
    const loop = () => {
      if (visible) frame()
      raf = requestAnimationFrame(loop)
    }
    if (reduce) frame()
    else loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      renderer.domElement.removeEventListener('pointerdown', stimulate)
      nodeGeo.dispose()
      lineGeo.dispose()
      pulseGeo.dispose()
      pointMat.dispose()
      lineMat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={ref} className={className} data-cursor="fire" />
}
