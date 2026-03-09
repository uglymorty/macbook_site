import React, {Suspense, useEffect, useRef} from 'react'
import {Canvas} from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import {features, featureSequence} from "../src/constants/index.js";
import clsx from "clsx";
import {Html} from "@react-three/drei";
import MacBookModel from "./models/Macbook.jsx";
import {useMediaQuery} from "react-responsive";
import useMacBookStore from "../src/store/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
    const groupRef = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)"});
    const { setTexture } = useMacBookStore();

    useEffect(() => {
        featureSequence.forEach((feature) => {
            const v = document.createElement("video");

            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: "auto",
                crossOrigin: "anonymous",
            });

            v.load();
        })
    }, [])

    useGSAP(() => {
        const modelTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: "bottom top",
                scrub: 1,
                pin: true,
            }
        });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top center',
                end: "bottom top",
                scrub: 1
            }
        })

        if(groupRef.current) {
            modelTimeLine.to(groupRef.current.rotation, {y: Math.PI * 2, ease: 'power1.inOut'})
        }

        timeline
            .call(() => setTexture("/videos/feature-1.mp4"))
            .to('.box1', {opacity: 1, y: 0})

            .call(() => setTexture("/videos/feature-2.mp4"))
            .to('.box2', {opacity: 1, y: 0})

            .call(() => setTexture("/videos/feature-3.mp4"))
            .to('.box3', {opacity: 1, y: 0})

            .call(() => setTexture("/videos/feature-4.mp4"))
            .to('.box4', {opacity: 1, y: 0})

            .call(() => setTexture("/videos/feature-5.mp4"))
            .to('.box5', {opacity: 1, y: 0})

    }, []);

    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">Loading...</h1></Html>}>
                <MacBookModel scale={isMobile ? 0.05 : 0.08} position={[0,-1,0]}/>
            </Suspense>
        </group>
    )
}

const Features = () => {
    return (
        <section id="features">
            <h2>See all in a new light.</h2>

            <Canvas id="f-canvas" camera={{}}>
                <StudioLights/>
                <ambientLight itensity={0.5}/>
                <ModelScroll/>
            </Canvas>
            <div className="absolute inset-0">
                {features.map((feature, index) => (
                    <div className={clsx('box',`box${index + 1}`, feature.styles)}>
                        <img src={feature.icon} alt={feature.highlight}/>
                        <p>
                            <span className="text-white">{feature.highlight}</span>
                            {feature.text}
                        </p>
                    </div>

                ))}
            </div>
        </section>
    )
}
export default Features
