"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";

type BlogPodcastPlayerProps = {
  src: string;
  mimeType: string;
  title: string;
};

const playbackRates = [1, 1.25, 1.5, 1.75, 2] as const;
const volumeSteps = [0, 0.35, 0.7, 1] as const;

const formatTime = (rawSeconds: number) => {
  if (!Number.isFinite(rawSeconds) || rawSeconds < 0) {
    return "0:00";
  }

  const seconds = Math.floor(rawSeconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainSeconds,
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainSeconds).padStart(2, "0")}`;
};

const getVolumeIcon = (value: number) => {
  if (value <= 0) {
    return VolumeX;
  }

  if (value <= 0.35) {
    return Volume;
  }

  if (value <= 0.7) {
    return Volume1;
  }

  return Volume2;
};

export default function BlogPodcastPlayer({
  src,
  mimeType,
  title,
}: BlogPodcastPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState<(typeof playbackRates)[number]>(1);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audio.pause();
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value);
    const audio = audioRef.current;

    if (!audio || Number.isNaN(nextTime)) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleCycleVolume = () => {
    const currentStepIndex = volumeSteps.findIndex(
      (step) => Math.abs(step - volume) < 0.001,
    );
    const nextVolume =
      volumeSteps[(currentStepIndex + 1) % volumeSteps.length] ?? volumeSteps[0];
    setVolume(nextVolume);
  };

  const handleCyclePlaybackRate = () => {
    const currentRateIndex = playbackRates.findIndex((rate) => rate === playbackRate);
    const nextRate = playbackRates[(currentRateIndex + 1) % playbackRates.length];
    setPlaybackRate(nextRate);
  };

  const progressMax = duration > 0 ? duration : 0;
  const progressValue =
    progressMax > 0 ? Math.min(currentTime, progressMax) : 0;
  const volumePercent = Math.round(volume * 100);
  const VolumeIcon = getVolumeIcon(volume);

  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
        AIによる音声版
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          aria-label={isPlaying ? "一時停止" : "再生"}
        >
          {isPlaying ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-current"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-current"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-900">{title}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="shrink-0 tabular-nums text-[11px] text-slate-500">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={progressMax}
              step={1}
              value={progressValue}
              onChange={handleSeek}
              className="h-1 min-w-0 flex-1 cursor-pointer accent-slate-700"
              aria-label="再生位置"
              disabled={progressMax === 0}
            />
            <span className="shrink-0 tabular-nums text-[11px] text-slate-500">
              {formatTime(duration)}
            </span>

            <button
              type="button"
              onClick={handleCyclePlaybackRate}
              className="h-6 shrink-0 rounded-md border border-slate-300 px-1.5 text-[11px] font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              aria-label={`再生速度 ${playbackRate}倍`}
            >
              {playbackRate}x
            </button>

            <button
              type="button"
              onClick={handleCycleVolume}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              aria-label={`音量 ${volumePercent}%`}
              title={`音量 ${volumePercent}%`}
            >
              <VolumeIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="none">
        <source src={src} type={mimeType} />
        お使いのブラウザでは音声再生に対応していません。
      </audio>
    </div>
  );
}
