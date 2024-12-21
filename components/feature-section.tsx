import { Clock, FileText, HelpCircle, List, Map, PlaySquare } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    title: "Timestamps Generation",
    description: "Automatically generate timestamps for easy navigation.",
    icon: Clock,
    details: "Our AI analyzes video content to create accurate timestamps, allowing you to jump to specific topics instantly. Perfect for long videos or lectures.",
  },
  {
    title: "Multiple Summary Styles",
    description: "Get summaries in casual, professional, or bullet point formats.",
    icon: FileText,
    details: "Choose from three summary styles to fit your needs: casual for easy reading, professional for formal contexts, and bullet points for quick review.",
  },
  {
    title: "Quiz Questions",
    description: "Test your knowledge with AI-generated quiz questions.",
    icon: HelpCircle,
    details: "Reinforce your learning with automatically generated quiz questions based on video content. Great for self-assessment and exam preparation.",
  },
  {
    title: "Mind Maps",
    description: "Visualize concepts and connections with interactive mind maps.",
    icon: Map,
    details: "Transform complex topics into easy-to-understand visual representations. Our mind maps help you grasp relationships between concepts quickly.",
  },
  {
    title: "Learning Path Recommendations",
    description: "Get personalized recommendations for your learning journey.",
    icon: List,
    details: "Based on your interests and viewing history, we suggest related videos and topics to expand your knowledge and guide your learning process.",
  },
  {
    title: "Playlist Summaries",
    description: "Summarize entire playlists for comprehensive learning.",
    icon: PlaySquare,
    details: "Get an overview of entire courses or playlists. Ideal for deciding whether a course is right for you or for quick revision of completed courses.",
  },
]

export function FeatureSection() {
  return (
    <section className="container">
      <h2 className="mb-8 text-center text-3xl font-bold">Features</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <feature.icon className="mb-2 h-8 w-8" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{feature.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

