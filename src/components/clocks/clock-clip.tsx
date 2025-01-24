"use client";

import styles from "./clock-clip.module.css";

export function ClockClip() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-[8vw] md:text-[12vw] lg:text-[16vw] font-bold text-gray-800 tabular-nums">
        <div className={styles.flip}>
          <div className={`${styles.up} ${styles.item}`}></div>
          <div className={`${styles.down} ${styles.item}`}></div>
        </div>
      </div>
    </div>
  );
}
