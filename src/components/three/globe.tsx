"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { networkNodes, networkArcs, type NetworkNode } from "@/data/network";

const GLOBE_RADIUS = 1;

const COLORS = {
  deep: new THREE.Color("#070a2c"),
  lit: new THREE.Color("#1b2a74"),
  rim: new THREE.Color("#3aa0e0"),
  graticule: "#3f4aa0",
  sky: "#5cb0ea",
  copper: "#e0a06a",
  headquarters: "#8fcdf2",
  atmosphere: new THREE.Color("#2e8fca"),
};

function latLonToVec3(lat: number, lon: number, radius = GLOBE_RADIUS): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(theta)
  );
}

/** Great-circle-ish arc: spherical interpolation with a sine altitude bump. */
function arcPoints(from: THREE.Vector3, to: THREE.Vector3, segments = 64): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const angle = from.angleTo(to);
  const altitude = 0.1 + angle * 0.14;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().copy(from).lerp(to, t).normalize();
    point.multiplyScalar(GLOBE_RADIUS * (1 + Math.sin(t * Math.PI) * altitude));
    points.push(point);
  }
  return points;
}

/**
 * Shaded globe surface: a deep-to-lit directional terminator plus a sky-tinted
 * fresnel rim, so the sphere reads as a lit 3D planet rather than a flat disc.
 * Opaque, so back-facing graticule/arcs are correctly occluded.
 */
function GlobeCore() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uDeep: { value: COLORS.deep },
          uLit: { value: COLORS.lit },
          uRim: { value: COLORS.rim },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uDeep;
          uniform vec3 uLit;
          uniform vec3 uRim;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            // Directional terminator — light from the upper-right, in view space.
            vec3 lightDir = normalize(vec3(0.45, 0.55, 0.75));
            float light = clamp(dot(vNormal, lightDir), 0.0, 1.0);
            vec3 base = mix(uDeep, uLit, pow(light, 1.3) * 0.85);
            // Fresnel rim glow toward the silhouette.
            float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
            base = mix(base, uRim, fres * 0.85);
            gl_FragColor = vec4(base, 1.0);
          }
        `,
      }),
    []
  );

  return (
    <mesh material={material}>
      <sphereGeometry args={[GLOBE_RADIUS * 0.996, 96, 96]} />
    </mesh>
  );
}

/** Additive atmosphere halo around the silhouette. */
function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: COLORS.atmosphere } },
        vertexShader: /* glsl */ `
          varying float vIntensity;
          void main() {
            vec3 viewNormal = normalize(normalMatrix * normal);
            vIntensity = pow(0.68 - dot(viewNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying float vIntensity;
          void main() {
            gl_FragColor = vec4(uColor, 1.0) * clamp(vIntensity, 0.0, 1.0) * 0.9;
          }
        `,
      }),
    []
  );
  return (
    <mesh material={material} scale={1.14}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
    </mesh>
  );
}

function Graticule() {
  const lines = useMemo(() => {
    const group: THREE.Vector3[][] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const ring: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 360; lon += 4) {
        ring.push(latLonToVec3(lat, lon, GLOBE_RADIUS * 1.002));
      }
      group.push(ring);
    }
    for (let lon = 0; lon < 360; lon += 30) {
      const meridian: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        meridian.push(latLonToVec3(lat, lon, GLOBE_RADIUS * 1.002));
      }
      group.push(meridian);
    }
    return group;
  }, []);

  return (
    <>
      {lines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={COLORS.graticule}
          lineWidth={0.6}
          transparent
          opacity={0.45}
        />
      ))}
    </>
  );
}

function NodeMarker({ node }: { node: NetworkNode }) {
  const position = useMemo(() => latLonToVec3(node.lat, node.lon, GLOBE_RADIUS * 1.008), [node]);
  const isHub = node.kind !== "market";
  const color =
    node.kind === "headquarters"
      ? COLORS.headquarters
      : node.kind === "development"
        ? COLORS.sky
        : COLORS.copper;

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[isHub ? 0.02 : 0.012, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[isHub ? 0.04 : 0.024, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} toneMapped={false} />
      </mesh>
      {isHub && (
        <Html
          position={[0, 0.075, 0]}
          center
          occlude
          distanceFactor={2.4}
          className="pointer-events-none select-none"
        >
          <div className="whitespace-nowrap rounded-sm border border-white/20 bg-[#0b0e33]/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
            {node.city}
          </div>
        </Html>
      )}
    </group>
  );
}

function Arcs() {
  const arcs = useMemo(() => {
    const byId = Object.fromEntries(networkNodes.map((n) => [n.id, n]));
    return networkArcs.map(({ from, to }, i) => {
      const a = byId[from];
      const b = byId[to];
      const points = arcPoints(latLonToVec3(a.lat, a.lon), latLonToVec3(b.lat, b.lon));
      const curve = new THREE.CatmullRomCurve3(points);
      const isTechArc = from === "chicago" && to === "mehsana";
      return { points, curve, isTechArc, phase: (i / networkArcs.length) * Math.PI * 2 };
    });
  }, []);

  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    arcs.forEach((arc, i) => {
      const pulse = pulseRefs.current[i];
      if (!pulse) return;
      const progress = (t * 0.14 + arc.phase / (Math.PI * 2)) % 1;
      arc.curve.getPoint(progress, pulse.position);
      const fade = Math.sin(progress * Math.PI);
      pulse.scale.setScalar(0.55 + fade * 0.7);
      (pulse.material as THREE.MeshBasicMaterial).opacity = 0.2 + fade * 0.8;
    });
  });

  return (
    <>
      {arcs.map((arc, i) => (
        <group key={i}>
          <Line
            points={arc.points}
            color={arc.isTechArc ? COLORS.sky : COLORS.copper}
            lineWidth={arc.isTechArc ? 1.6 : 1.1}
            transparent
            opacity={arc.isTechArc ? 0.85 : 0.5}
          />
          <mesh
            ref={(el) => {
              pulseRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.013, 12, 12]} />
            <meshBasicMaterial
              color={arc.isTechArc ? COLORS.sky : COLORS.copper}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

export function Globe({ interactive = true }: { interactive?: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const tiltRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
    }
    if (tiltRef.current && interactive) {
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(
        tiltRef.current.rotation.x,
        pointer.y * -0.12,
        0.04
      );
      tiltRef.current.rotation.y = THREE.MathUtils.lerp(
        tiltRef.current.rotation.y,
        pointer.x * 0.18,
        0.04
      );
    }
  });

  return (
    <group ref={tiltRef} rotation={[0.34, 0, -0.06]}>
      <Atmosphere />
      {/* Rotate the globe so the US–India corridor faces the camera on load */}
      <group ref={globeRef} rotation={[0, -0.4, 0]}>
        <GlobeCore />
        <Graticule />
        <Arcs />
        {networkNodes.map((node) => (
          <NodeMarker key={node.id} node={node} />
        ))}
      </group>
    </group>
  );
}
