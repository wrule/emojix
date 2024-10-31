'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center } from '@react-three/drei'
import * as THREE from 'three'

function createEmojiTexture(emoji: string): Promise<THREE.Texture> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const size = 256
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Failed to get 2d context')

    ctx.clearRect(0, 0, size, size)
    
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, '#E6B642')    
    gradient.addColorStop(0.5, '#D4A43E')  
    gradient.addColorStop(1, '#E6B642')    
    ctx.fillStyle = gradient

    for(let i = 0; i < size; i += 3) {
      ctx.globalAlpha = 0.04
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, size)
      ctx.strokeStyle = i % 6 === 0 ? '#C69536' : '#E6B642'
      ctx.stroke()
    }

    for(let i = 0; i < size; i += 20) {
      ctx.globalAlpha = 0.03
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(size, i)
      ctx.strokeStyle = '#C69536'
      ctx.stroke()
    }

    ctx.globalAlpha = 1
    ctx.fillStyle = gradient
    ctx.globalAlpha = 0.95
    ctx.fillRect(0, 0, size, size)

    ctx.globalAlpha = 1
    ctx.fillStyle = '#734A12'
    ctx.font = '200px system-ui'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(emoji, size/2, size/2)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false
    resolve(texture)
  })
}

const emojis = ['😊', '😎', '🚀', '💫', '✨', '🎮', '🎯', '🎲', '🎨', '🎭', '🎪', '🎡']

function EmojiCube() {
  const groupRef = useRef<THREE.Group>(null)
  const [textures, setTextures] = useState<THREE.Texture[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTextures = async () => {
      try {
        setIsLoading(true)
        const loadedTextures = await Promise.all(
          emojis.map(emoji => createEmojiTexture(emoji))
        )
        setTextures(loadedTextures)
      } catch (error) {
        console.error('Error loading textures:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTextures()

    return () => {
      textures.forEach(texture => texture.dispose())
    }
  }, [])

  const cubePositions = [
    // 中心层
    [0, 0, 0],      // 中心
    [1.1, 0, 0],    // 右
    [-1.1, 0, 0],   // 左
    [0, 0, 1.1],    // 前
    [0, 0, -1.1],   // 后
    
    // 上层
    [0.8, 1.1, 0.8],    // 右前
    [-0.8, 1.1, 0.8],   // 左前
    [0.8, 1.1, -0.8],   // 右后
    [-0.8, 1.1, -0.8],  // 左后
    
    // 下层
    [0.8, -1.1, 0.8],    // 右前
    [-0.8, -1.1, 0.8],   // 左前
    [0.8, -1.1, -0.8],   // 右后
  ]

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.position.y = Math.sin(time) * 0.15
    groupRef.current.rotation.y = time * 0.4
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.15
    groupRef.current.rotation.z = Math.cos(time * 0.3) * 0.1
    
    groupRef.current.scale.x = 1 + Math.sin(time * 2) * 0.03
    groupRef.current.scale.y = 1 + Math.sin(time * 2) * 0.03
    groupRef.current.scale.z = 1 + Math.sin(time * 2) * 0.03
  })

  if (isLoading) return null

  return (
    <group ref={groupRef}>
      {cubePositions.map((position, index) => (
        <group 
          key={index} 
          position={[position[0], position[1], position[2]]}
          rotation={[
            Math.sin(index * 0.5) * 0.2,
            Math.cos(index * 0.3) * 0.2,
            Math.sin(index * 0.4) * 0.2
          ]}
        >
          <mesh renderOrder={1}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial
              color="#D4A43E"
              metalness={0.1}
              roughness={0.8}
              emissive="#946B2D"
              emissiveIntensity={0.05}
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          </mesh>

          {textures[index % textures.length] && [
            // 前面
            <mesh key="front" position={[0, 0, 0.451]} renderOrder={2}>
              <planeGeometry args={[0.9, 0.9]} />
              <meshStandardMaterial
                transparent
                map={textures[index % textures.length]}
                alphaTest={0.1}
                side={THREE.FrontSide}
                depthWrite={false}
                metalness={0.1}
                roughness={0.8}
              />
            </mesh>,
            // 后面
            <mesh key="back" position={[0, 0, -0.451]} rotation={[0, Math.PI, 0]} renderOrder={2}>
              <planeGeometry args={[0.9, 0.9]} />
              <meshStandardMaterial
                transparent
                map={textures[index % textures.length]}
                alphaTest={0.1}
                side={THREE.FrontSide}
                depthWrite={false}
                metalness={0.1}
                roughness={0.8}
              />
            </mesh>,
            // 右面
            <mesh key="right" position={[0.451, 0, 0]} rotation={[0, Math.PI / 2, 0]} renderOrder={2}>
              <planeGeometry args={[0.9, 0.9]} />
              <meshStandardMaterial
                transparent
                map={textures[index % textures.length]}
                alphaTest={0.1}
                side={THREE.FrontSide}
                depthWrite={false}
                metalness={0.1}
                roughness={0.8}
              />
            </mesh>,
            // 左面
            <mesh key="left" position={[-0.451, 0, 0]} rotation={[0, -Math.PI / 2, 0]} renderOrder={2}>
              <planeGeometry args={[0.9, 0.9]} />
              <meshStandardMaterial
                transparent
                map={textures[index % textures.length]}
                alphaTest={0.1}
                side={THREE.FrontSide}
                depthWrite={false}
                metalness={0.1}
                roughness={0.8}
              />
            </mesh>,
            // 上面
            <mesh key="top" position={[0, 0.451, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
              <planeGeometry args={[0.9, 0.9]} />
              <meshStandardMaterial
                transparent
                map={textures[index % textures.length]}
                alphaTest={0.1}
                side={THREE.FrontSide}
                depthWrite={false}
                metalness={0.1}
                roughness={0.8}
              />
            </mesh>,
            // 下面
            <mesh key="bottom" position={[0, -0.451, 0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={2}>
              <planeGeometry args={[0.9, 0.9]} />
              <meshStandardMaterial
                transparent
                map={textures[index % textures.length]}
                alphaTest={0.1}
                side={THREE.FrontSide}
                depthWrite={false}
                metalness={0.1}
                roughness={0.8}
              />
            </mesh>
          ]}
        </group>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <div className="h-[40vh] md:h-[50vh] w-full bg-transparent">
      <Canvas
        camera={{
          position: [4, 4, 4],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 2]}
        gl={{ 
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          logarithmicDepthBuffer: true,
          premultipliedAlpha: false,
          clearColor: [0, 0, 0, 0]
        } as any}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.4}
          castShadow
        />
        
        <Center>
          <EmojiCube />
        </Center>
      </Canvas>
    </div>
  )
}