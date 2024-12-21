import { Card, CardContent } from "@/components/ui/card"
import { Brain, Clock, FileText, MessageSquare, Upload, Zap, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Tube Help: Your AI Study Buddy for YouTube
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Analyze YouTube videos to generate timestamps, summaries, quizzes, and chat with an AI about your videos using the power of AI.
              </p>
            </div>
            <Link className="bg-black px-4 py-2 rounded-md shadow-md text-white" href="/process">Get Started Now</Link>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <Card>
              <CardContent className="p-6 space-y-2">
                <Clock className="w-12 h-12 text-primary" />
                <h3 className="text-lg font-bold">Timestamps</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quickly jump to specific sections of the video with AI-generated timestamps.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <FileText className="w-12 h-12 text-primary" />
                <h3 className="text-lg font-bold">Summarization</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get concise summaries in various styles: casual, professional, and more.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <Brain className="w-12 h-12 text-primary" />
                <h3 className="text-lg font-bold">Brain Rot Summary</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Too tired to focus? Let us create chaotic, meme-worthy summaries that make learning fun.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <BookOpen className="w-12 h-12 text-primary" />
                <h3 className="text-lg font-bold">Quizzes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Test your understanding with automatically generated quizzes based on video content.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <MessageSquare className="w-12 h-12 text-primary" />
                <h3 className="text-lg font-bold">Chatbot</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Have interactive conversations about your videos. Ask questions and get instant, contextual responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold">1. Input URL</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter a YouTube video URL to get started.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold">2. Access Features</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Instantly access all features: timestamps, summaries, quizzes, chatbot, and more. It`s that simple!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-foreground dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Learn Smarter, Not Harder?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Start using Tube Help to maximize your productivity and understanding.
              </p>
            </div>
              <Link className="bg-black px-4 py-2 rounded-md shadow-md text-white" href="/process">Get Started Now</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

