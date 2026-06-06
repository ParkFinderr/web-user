import { Suspense, useRef, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import carModelUrl from '../../assets/3d/mclaren_600lt.glb'

function CarMesh({ scale = 2.5 }) {
  const { scene } = useGLTF(carModelUrl)
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.08
  })

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={scale}
        position={[0, -0.1, 0]}
        rotation={[0, -Math.PI / 6, 0]}
      />
    </group>
  )
}

function LoadingFallback({ height }) {
  return (
    <div
      style={{
        width: '100%',
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div className="spinner-3d" />
      <span style={{ fontSize: 12, color: 'var(--pf-text3)' }}>Memuat 3D…</span>
    </div>
  )
}

export default function CarModel3D({
  height = 360,
  scale = 2.5,
  autoRotate = true,
  interactive = false,
  fov = 35,
  cameraPos = [3, 0.8, 3],
}) {
  return (
    <div style={{ width: '100%', height }}>
      <Suspense fallback={<LoadingFallback height={height} />}>
        <Canvas
          camera={{ position: cameraPos, fov }}
          style={{ width: '100%', height: '100%', display: 'block' }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          {/* Lights – no shadow maps (avoids context loss) */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[8, 10, 6]} intensity={2.5} />
          <directionalLight position={[-6, 5, -4]} intensity={0.8} color="#93C5FD" />
          <pointLight position={[0, 5, 3]} intensity={1.2} color="#00D2FF" />

          {/* Environment for reflections on car body */}
          <Environment preset="city" />

          <CarMesh scale={scale} />

          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            enableZoom={interactive}
            enablePan={false}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2.2}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
