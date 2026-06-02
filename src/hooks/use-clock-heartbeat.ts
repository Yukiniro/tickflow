"use client";

import { useEffect, useRef } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { timeAtom } from "@/store/time";
import { soundEnabledAtom } from "@/store/sound";

/**
 * 全站唯一时钟心跳:每秒写一次 timeAtom,并按需播放滴答声。
 * 必须只挂载一次(见 <ClockHeartbeat>),所有展示组件用只读的 useClock() 订阅,
 * 不要再各自新建 setInterval / AudioContext。
 */
export function useClockHeartbeat() {
  const setTime = useSetAtom(timeAtom);
  const soundEnabled = useAtomValue(soundEnabledAtom);

  // 把 soundEnabled 放进 ref:切换声音时不必重建定时器(否则每次切换都重启心跳)
  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  // 初始化音频(一次):加载 /tick.mp3 并解码为 AudioBuffer
  useEffect(() => {
    const ctx = new AudioContext();
    audioContextRef.current = ctx;
    let cancelled = false;

    fetch("/tick.mp3")
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        if (!cancelled) audioBufferRef.current = audioBuffer;
      })
      .catch(error => {
        console.error("Error loading audio:", error);
      });

    return () => {
      cancelled = true;
      ctx.close();
    };
  }, []);

  // 单一心跳:依赖仅 setTime(稳定引用),故定时器只创建一次
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());

      const ctx = audioContextRef.current;
      const buffer = audioBufferRef.current;
      if (ctx && buffer && soundEnabledRef.current) {
        // AudioContext 可能因无用户手势而处于挂起态,播放前先尝试恢复
        if (ctx.state === "suspended") ctx.resume();
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [setTime]);
}
