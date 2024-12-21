"use client"
import ReactMarkdown from "react-markdown";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimestampTimeline } from "@/components/timestamp-timeline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Loader2 } from 'lucide-react';
import { VideoPlayer } from "@/components/VideoPlayerr";
import Chatbot from "./Chatbot";
// const BACKEND_URL = "http://localhost:3000";

export default function VideoProcessingPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [timestamps, setTimestamps] = useState<string>('');
 
  const [videoDetails, setVideoDetails] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>('');
  const [quiz, setQuiz] = useState<string>('');
  const [mindMap, setMindMap] = useState<string>('');
  const [seekFunction, setSeekFunction] = useState<((time: number) => void) | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('timestamps');
  const [loading, setLoading] = useState<boolean>(false);
  const [featureLoading, setFeatureLoading] = useState<boolean>(false);
  const [isChatbotExpanded, setIsChatbotExpanded] = useState(false);

 
  function removeHtmlTags(input: string): string {
    return input.replace(/```/g, "").replace("html", '');
  }





  async function generate() {
    switch (selectedTab) {
      case "timestamps":
        await getTimestamps();
        break;
      case "casual":
      case "professional":
      case "bullet":
      case "genz":
        await getSummary(selectedTab);
        break;
      case "quiz":
        await getQuiz();
        break;
      case "mindmap":
        await getSimplifiedText();
        break;
      default:
        break;
    }
  }

  async function getSimplifiedText() {
    try {
      setFeatureLoading(true);
      const response = await fetch('https://youtube-timestamp-generator-production.up.railway.app/simpletext', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to generate mindmap');
      }

      const data = await response.json();
      setMindMap(data.simplifiedText);
    } catch (error) {
      console.error('Error fetching mindmap:', error);
      setMindMap('Failed to generate mindmap');
    } finally {
      setFeatureLoading(false);
    }
  }

  async function getQuiz() {
    try {
      setFeatureLoading(true);
      const response = await fetch('https://youtube-timestamp-generator-production.up.railway.app/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to generate quiz');
      }

      const data = await response.json();
      setQuiz(data.quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setQuiz('Failed to generate quiz');
    } finally {
      setFeatureLoading(false);
    }
  }

  async function getTimestamps() {
    try {
      setFeatureLoading(true);
      const response = await fetch('https://youtube-timestamp-generator-production.up.railway.app/timestamps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to generate timestamps');
      }

      const data = await response.json();
      setTimestamps(data.timestamps);
    } catch (error) {
      console.error('Error fetching timestamps:', error);
      setTimestamps('Failed to generate timestamps');
    } finally {
      setFeatureLoading(false);
    }
  }

  async function getSummary(style: string) {
    try {
      setFeatureLoading(true);
      const response = await fetch('https://youtube-timestamp-generator-production.up.railway.app/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl, style }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Failed to generate summary');
    } finally {
      setFeatureLoading(false);
    }
  }

  return (
    <div className="container py-8 w-[90%] md:w-[70%] mx-auto">
      <h1 className="mb-8 text-xl md:text-3xl font-bold">Video Processing</h1>
      <Alert className="mb-8">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>How it works</AlertTitle>
        <AlertDescription>
          Enter a YouTube URL, and our AI will analyze the video to generate timestamps, summaries, quizzes, and more. This process helps you learn more efficiently and effectively.
        </AlertDescription>
      </Alert>
      <div className="grid gap-8 lg:grid-cols-1 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Input Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter YouTube URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <Button onClick={() => setVideoDetails(true)}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Fetch Video'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {videoDetails && (
        <>
            <Card>
              <CardContent>
                <div className="m-8 flex gap-2 w-full md:flex-row flex-col">
                  <div className="md:w-[50%] md:h-[400px] ml-[-20px] w-[95%] ">
                    <VideoPlayer
                      videoUrl={videoUrl}
                      onSeek={(seek) => setSeekFunction(() => seek)}
                    />
                  </div>
                  <div className="md:w-[50%] ml-[-20px] w-[95%] flex justify-center items-center  md:h-[400px] ">
                    
                    {isChatbotExpanded &&
                    <>
                      <Chatbot isChatbotExpanded={isChatbotExpanded} setIsChatbotExpanded={setIsChatbotExpanded} videoUrl={videoUrl} />
                    </>
                      }
                      <button onClick={() => setIsChatbotExpanded(!isChatbotExpanded)} className="bg-black md:hidden text-white px-2 py-1 rounded-md mt-4">
                        {isChatbotExpanded ? 'Hide Chatbot' : 'Show Chatbot'}
                      </button>
                      <div className="hidden md:block">
                      <Chatbot isChatbotExpanded={isChatbotExpanded} setIsChatbotExpanded={setIsChatbotExpanded} videoUrl={videoUrl} />

                      </div>

                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 md:w-auto w-[250px] text-[9px] md:text-sm bg-gray-200 px-4 py-2 rounded-md">

                    <button className={`${selectedTab === "timestamps"? "bg-gray-400 text-white py-1 px-2 rounded-md shadow-md " : ""}`} onClick={() => setSelectedTab('timestamps')}>
                    
                    Get Timestamps
                    </button>
                    <button className={`${(selectedTab === "casual" || selectedTab === "professional" || selectedTab === "bullet" || selectedTab === "genz")? "bg-gray-400 text-white py-1 px-2 rounded-md shadow-md " : ""}`} onClick={() => setSelectedTab('casual')}>
                    
                    Summarize
                    </button>
                    <button className={`${selectedTab === "quiz"? "bg-gray-400 text-white py-1 px-2 rounded-md shadow-md " : ""}`}  onClick={() => setSelectedTab('quiz')}>
                   
                    Get Quiz
                    </button>
                    <button className={`${selectedTab === "mindmap"? "bg-gray-400 text-white py-1 px-2 rounded-md shadow-md " : ""}`} onClick={() => setSelectedTab('mindmap')}>
                    
                    Simplified Mode
                    </button>
                  </div>
                   
                 
                   
                  <button
                    className="bg-black md:text-sm text-xs px-2 py-1 text-white rounded-md"
                    onClick={generate}
                  >
                    {featureLoading === true   ? 
              <Loader2 className="h-4 w-4 animate-spin" /> : 'Generate'}
                  </button>
                </div>
              </CardContent>
            </Card>

           { selectedTab === 'timestamps' && 
            <div >
              <div>
                {!loading ? (
                  <div className="space-y-4">

                    {timestamps &&
                      <div className="text-gray-500 text-sm mt-4">
                    Select a timestamp to navigate directly to that specific section of the video

                  </div>}
                    {seekFunction && (
                      <TimestampTimeline timestamps={timestamps} onTimestampClick={seekFunction} />
                    )}
                  </div>
                ) : (
                  null
                )}
                {!loading && !timestamps && (
                  <div className="text-gray-500 text-sm">
                    Click Generate to create Timestamps.
                  </div>
                )}
              </div>
            </div>}
           { (selectedTab === 'casual' ||selectedTab === 'genz' || selectedTab === 'professional' || selectedTab === 'bullet') &&
            <div >
              <div>
                <p className="mb-4 mt-4 text-gray-500">Choose a summary style:</p>
                <Tabs defaultValue="casual">
                  <TabsList>
                    <button onClick={() => setSelectedTab('casual')}>
                    <TabsTrigger value="casual" >
                      Casual
                    </TabsTrigger>

                    </button>
                    <button onClick={() => setSelectedTab('professional')}>
                    <TabsTrigger value="professional" >
                      Professional
                    </TabsTrigger>

                    </button>
                    <button onClick={() => setSelectedTab('bullet')}>

                    <TabsTrigger value="bullet" >
                      In Points
                    </TabsTrigger>
                    </button>
                    <button onClick={() => setSelectedTab('genz')}>
                    <TabsTrigger value="genz" >
                    Brain Rot 😵‍💫
                    </TabsTrigger>
                      
                    </button>
                  </TabsList>
                  <TabsContent value="casual">
                    {!loading ? (
                      <div className="space-y-4">
                        {summary && (
                          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
                               <ReactMarkdown>{summary}</ReactMarkdown>

                          </pre>
                        )}
                      </div>
                    ) : (
                     null
                    )}
                  </TabsContent>
                  <TabsContent value="professional">
                    {!loading ? (
                      <div className="space-y-4">
                        {summary && (
                          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
                            <ReactMarkdown>{summary}</ReactMarkdown>

                          </pre>
                        )}
                      </div>
                    ) : (
                     null
                    )}
                  </TabsContent>
                  <TabsContent value="bullet">
                    {!loading ? (
                      <div className="space-y-4">
                        {summary && (
                          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
                            <div dangerouslySetInnerHTML={{__html: removeHtmlTags(summary)}} />
                          </pre>
                        )}
                      </div>
                    ) : (
                      null
                     
                    )}
                  </TabsContent>
                  <TabsContent value="genz">
                    {!loading ? (
                      <div className="space-y-4">
                        {summary && (
                          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
                            <div dangerouslySetInnerHTML={{__html: removeHtmlTags(summary)}} />
                          </pre>
                        )}
                      </div>
                    ) : (
                      null
                     
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>}
            { selectedTab === 'quiz' &&
              <div >
              <div>
                {!loading ? (
                  <div className="space-y-4">
                    {quiz && (
                      <>
                    <p className="mb-4">Test your understanding of the video content:</p>
                      <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
                        <div dangerouslySetInnerHTML={{__html: removeHtmlTags(quiz)}} />  
                      </pre>
                      </>
                    )}
                  </div>
                ) : (
                  null
                )}
                {!quiz && !loading && (
                 <div className="text-gray-500 text-sm mt-4 mb-[-4px]">
                 Click to create Quiz.
                </div>
                )}
              </div>
            </div>}
            {selectedTab === 'mindmap' &&
              <div>

                <div>
                  {!loading ? (
              <div className="space-y-4">
                {
                  mindMap &&
                    <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
                      <div dangerouslySetInnerHTML={{__html: removeHtmlTags(mindMap)}} />
                    </pre>

                }
              </div>
            ) : (
              null
            )}
             {!mindMap && (
                <div className="text-gray-500 text-sm mt-4 mb-[-4px]">
                 Click Generate to create Simplified Text.
                </div>
              )}
                </div>
            </div>}

        </>
      )}
    </div>
  )
}

