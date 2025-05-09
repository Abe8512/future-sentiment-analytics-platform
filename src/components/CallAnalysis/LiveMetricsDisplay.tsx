
import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Clock, MessageSquare, TrendingUp, Volume2 } from "lucide-react";
import { ThemeContext } from "@/App";
import AnimatedNumber from "../ui/AnimatedNumber";
import AIWaveform from "../ui/AIWaveform";
import GlowingCard from "../ui/GlowingCard";
import { useCallMetricsStore } from "@/store/useCallMetricsStore";
import { useSharedTeamMetrics } from "@/services/SharedDataService";
import { useSharedFilters } from "@/contexts/SharedFilterContext";

interface LiveMetricsDisplayProps {
  isCallActive?: boolean;
}

const LiveMetricsDisplay = ({ isCallActive }: LiveMetricsDisplayProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { 
    isRecording, 
    duration: callDuration, 
    talkRatio, 
    sentiment, 
    isTalkingMap, 
    keyPhrases 
  } = useCallMetricsStore();
  
  // Use shared team metrics for consistent data across components
  const { filters } = useSharedFilters();
  const { metrics: sharedMetrics } = useSharedTeamMetrics(filters);
  
  // Check if we should display metrics
  const showMetrics = isCallActive !== undefined ? isCallActive : isRecording;
  
  // Format duration into minutes:seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Call Duration */}
        <Card className={`${isDarkMode ? "border-neon-blue/20 bg-black/20" : "border-blue-100 bg-blue-50"}`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Call Duration</p>
                <div className="text-2xl font-bold mt-1 flex items-center">
                  <Clock className={`h-5 w-5 mr-2 ${isDarkMode ? "text-neon-blue" : "text-blue-500"}`} />
                  <AnimatedNumber 
                    value={callDuration} 
                    formatter={formatDuration}
                  />
                </div>
              </div>
              {showMetrics && <AIWaveform color="blue" barCount={3} className="h-6" />}
            </div>
          </CardContent>
        </Card>
        
        {/* Talk Ratio */}
        <Card className={`${isDarkMode ? "border-purple-500/20 bg-black/20" : "border-purple-100 bg-purple-50"}`}>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Talk Ratio</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isDarkMode ? "text-neon-blue" : "text-blue-500"}`}>Agent</span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-blue rounded-full" 
                    style={{ width: `${talkRatio.agent}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold w-8 text-end">
                  {Math.round(talkRatio.agent)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isDarkMode ? "text-neon-pink" : "text-pink-500"}`}>Customer</span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-pink rounded-full" 
                    style={{ width: `${talkRatio.customer}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold w-8 text-end">
                  {Math.round(talkRatio.customer)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Live Sentiment */}
        <Card className={`${isDarkMode ? "border-green-500/20 bg-black/20" : "border-green-100 bg-green-50"}`}>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Live Sentiment</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isDarkMode ? "text-neon-blue" : "text-blue-500"}`}>Agent</span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${sentiment.agent > 0.7 ? "bg-green-500" : sentiment.agent > 0.4 ? "bg-yellow-500" : "bg-red-500"} rounded-full`}
                    style={{ width: `${sentiment.agent * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold w-8 text-end">
                  {Math.round(sentiment.agent * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isDarkMode ? "text-neon-pink" : "text-pink-500"}`}>Customer</span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${sentiment.customer > 0.7 ? "bg-green-500" : sentiment.customer > 0.4 ? "bg-yellow-500" : "bg-red-500"} rounded-full`}
                    style={{ width: `${sentiment.customer * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold w-8 text-end">
                  {Math.round(sentiment.customer * 100)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Speech Pace */}
        <Card className={`${isDarkMode ? "border-amber-500/20 bg-black/20" : "border-amber-100 bg-amber-50"}`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Speech Pace</p>
                <div className="text-2xl font-bold mt-1 flex items-center">
                  <Volume2 className={`h-5 w-5 mr-2 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
                  <AnimatedNumber 
                    value={showMetrics ? 140 + Math.random() * 30 : 0} 
                    formatter={(val) => val.toFixed(0)}
                    suffix=" wpm"
                  />
                </div>
              </div>
              {showMetrics && <Activity className={`h-6 w-6 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Key Phrases and Stats */}
      {showMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlowingCard gradient="purple" className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-2">Real-time Keywords</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {keyPhrases.map((phrase, index) => {
                // Make sure we render the text correctly based on the data structure
                const phraseText = typeof phrase === 'string' ? phrase : phrase.text;
                return (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white"
                  >
                    {phraseText}
                  </span>
                );
              })}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neon-blue/30 text-white">
                pricing
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neon-pink/30 text-white">
                feature request
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neon-green/30 text-white">
                integration
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neon-purple/30 text-white">
                timeline
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-500/30 text-white">
                competitors
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400 mt-4">
              <AIWaveform color="pink" barCount={8} className="h-5" />
              <p>AI analyzing speech patterns...</p>
            </div>
          </GlowingCard>
          
          <Card className={`${isDarkMode ? "border-white/10 bg-black/20" : "border-gray-200 bg-gray-50"}`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Call Analytics</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <MessageSquare className="h-4 w-4 inline mr-1" /> Questions Asked
                    </span>
                    <span className="font-medium">
                      <AnimatedNumber value={7} />
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <TrendingUp className="h-4 w-4 inline mr-1" /> Engagement Score
                    </span>
                    <span className="font-medium">
                      <AnimatedNumber value={sharedMetrics ? sharedMetrics.performanceScore : 82} suffix="%" />
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <Activity className="h-4 w-4 inline mr-1" /> Energy Level
                    </span>
                    <span className="font-medium">
                      <AnimatedNumber value={76} suffix="%" />
                    </span>
                  </div>
                </div>
                
                <div className={`mt-3 p-2 rounded text-sm ${isDarkMode ? "bg-neon-green/10 text-neon-green" : "bg-green-100 text-green-700"}`}>
                  <strong>AI Analysis:</strong> High engagement, positive trends detected
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LiveMetricsDisplay;
