"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function SpotifyNowPlay() {
  const [songName, setSongName] = useState<string>("");
  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [progressMs, setProgressMs] = useState<number>(0);
  const [durationMs, setDurationMs] = useState<number>(0);
  const [trakURL, setTrakURL] = useState<string>("");
  const [albumCoverImage, setAlbumCoverImage] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isNameHover, setIsNameHover] = useState<boolean>(false);
  const [isArtistHover, setIsArtistHover] = useState<boolean>(false);
  const spotifyPlayerRef = useRef<any>();
  const MTimeout = useRef<any>();
  useEffect(() => {
    async function getSpotify() {
      const res = await fetch(
        "https://spotify-now-playing.tokuzou.workers.dev/"
      );
      if (res.status === 204) {
        return;
      }
      const data = await res.json();
      if (!data.is_playing || data.currently_playing_type !== "album") {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        const CoverImage = data.item.album.images[0].url;
        setSongName(data.item.name);
        setArtistNames(
          data.item.artists.map((artist: any) => artist.name).join(", ")
        );
        setDurationMs(data.item.duration_ms);
        setProgressMs(data.progress_ms);
        setTrakURL(data.item.external_urls.spotify);
        setAlbumCoverImage(CoverImage);
      }
    }
    getSpotify();
    const loop = setInterval(getSpotify, 60000);
    return () => clearInterval(loop);
  }, []);
  useEffect(() => {
    const toggleVisibility = () => {
      if (spotifyPlayerRef.current) {
        let documentHeight = document.documentElement.scrollHeight;
        let windowHeight = window.innerHeight;
        let scrollPosition = document.documentElement.scrollTop;
        if (scrollPosition + windowHeight >= documentHeight) {
          spotifyPlayerRef.current.classList.add("s-bottom");
        } else {
          spotifyPlayerRef.current.classList.remove("s-bottom");
        }
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-0 right-0 m-[20px] drop-shadow-md rounded-xl"
          ref={spotifyPlayerRef}
        >
          <Link href={trakURL} target="_blank">
            <div className=" w-[70px] h-[70px] rounded-sm flex playbox p-[10px] relative overflow-hidden bg-white">
              <img
                src={albumCoverImage}
                alt={songName}
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <div className="trak-data ml-[10px]">
                {songName.length > 15 ? (
                  <div
                    onMouseEnter={() => {
                      MTimeout.current = setTimeout(() => {
                        setIsNameHover(true);
                      }, 1000);
                    }}
                    onMouseLeave={() => {
                      clearTimeout(MTimeout.current);
                      setIsNameHover(false);
                    }}
                  >
                    <Marquee
                      style={{ fontWeight: "bold", width: 220 }}
                      autoFill={false}
                      play={isNameHover}
                    >
                      {songName + "        "}
                    </Marquee>
                  </div>
                ) : (
                  <p className="mr-1 whitespace-nowrap font-bold">{songName}</p>
                )}
                {artistNames.length > 20 ? (
                  <div
                    onMouseEnter={() => {
                      MTimeout.current = setTimeout(() => {
                        setIsArtistHover(true);
                      }, 1000);
                    }}
                    onMouseLeave={() => {
                      clearTimeout(MTimeout.current);
                      setIsArtistHover(false);
                    }}
                  >
                    <Marquee
                      className="text-slate-600 text-xs"
                      style={{ width: 220 }}
                      play={isArtistHover}
                    >
                      {artistNames}
                    </Marquee>
                  </div>
                ) : (
                  <p className="text-slate-600 text-xs whitespace-nowrap">
                    {artistNames}
                  </p>
                )}
              </div>
              <div className="flex items-center absolute bottom-1 right-0 s-logo mr-[5px]">
                <Image
                  src="/spotify_icon.png"
                  alt="Spotify Logo"
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] aspect-square mr-[3px]"
                />
                <p className="text-slate-400 text-[10px]">
                  Now playing on Spotify
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
