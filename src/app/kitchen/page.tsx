"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

// アクティビティデータの型定義
interface ActivityLog {
  id: number;
  title: string;
  date: string;
  type: string;
  description: string;
}

interface Activity {
  log: ActivityLog[];
  live: {
    status: string;
    url: string;
  };
}

// フォールバックデータ
const fallbackData: Activity = {
  live: {
    status: "offline",
    url: "",
  },
  log: [
    {
      id: 1,
      title: "データの取得に失敗しました",
      date: new Date().toLocaleDateString("ja-JP"),
      type: "post",
      description: "しばらく経ってから再度お試しください",
    },
  ],
};

export default function About() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [live, setLive] = useState({ status: "offline", url: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          "https://for-friend.tokuzou.moe/api/activity-log"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data: Activity = await response.json();
        setActivities(data.log);
        setLive(data.live);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities(fallbackData.log);
        setLive(fallbackData.live);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto py-12 px-4">
        {/* ヘッダーセクション */}
        <div className="relative mb-16 text-center">
          <h1 className="relative text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Tokuzou&apos;s Kitchen
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            プログラミングと料理を愛する配信者のスペース。一緒に創造的な旅を楽しみましょう！
          </p>
        </div>

        {/* 動画セクション */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-4xl aspect-video relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-300">
                  読み込み中...
                </p>
              </div>
            ) : (
              <iframe
                src={live.url}
                title="Tokuzou's Kitchen Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full tokuly-live rounded-lg"
              ></iframe>
            )}
          </div>
        </div>

        {/* 最近のアクティビティ */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8 px-1">
            <div className="h-8 w-1 bg-gray-800 dark:bg-gray-200 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              直近のアクティビティ
            </h2>
          </div>

          <div className="space-y-5">
            {loading ? (
              <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  読み込み中...
                </p>
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity) => (
                <Card
                  key={activity.id}
                  className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900"
                >
                  <div className="h-0.5 w-full bg-gray-800 dark:bg-gray-200"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold">
                          {activity.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">
                          {activity.date}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${
                          activity.type === "stream" ||
                          activity.type === "upload"
                            ? "bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                        variant="default"
                      >
                        {activity.type === "stream"
                          ? "配信"
                          : activity.type === "upload"
                          ? "動画"
                          : "投稿"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  現在アクティビティはありません
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
