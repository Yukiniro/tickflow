"use client";

import { useEffect, useState, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { timeAtom, is24HourAtom, formattedTimeAtom } from "@/store/time";
import { soundEnabledAtom } from "@/store/sound";

export function useTime() {
  const [mounted, setMounted] = useState(false);
  const setTime = useSetAtom(timeAtom);
  const [is24Hour, setIs24Hour] = useAtom(is24HourAtom);
  const formattedTime = useAtomValue(formattedTimeAtom);
  const soundEnabled = useAtomValue(soundEnabledAtom);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    // 初始化 AudioContext
    audioContextRef.current = new AudioContext();

    // 加载音频文件
    fetch("/tick.mp3")
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContextRef.current?.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        if (audioBuffer) {
          audioBufferRef.current = audioBuffer;
        }
      })
      .catch(error => {
        console.error("Error loading audio:", error);
      });

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playTickSound = () => {
    if (!audioContextRef.current || !audioBufferRef.current || !soundEnabled) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  };

  useEffect(() => {
    // 挂载标记:SSR 水合后置位,属预期的 effect 内同步置位
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      playTickSound();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // playTickSound 依赖 soundEnabled(已在依赖中),无需将其加入依赖以免每次渲染重建定时器
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTime, soundEnabled]);

  return {
    ...formattedTime,
    is24Hour,
    toggleTimeFormat: () => setIs24Hour(!is24Hour),
    mounted,
  };
}
