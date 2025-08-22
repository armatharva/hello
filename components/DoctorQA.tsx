"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, MessageCircle, AlertTriangle, Clock, CheckCircle } from "lucide-react";

type UrgencyLevel = "Emergency" | "Concerning" | "Normal";

type QAItem = {
  question: string;
  answer: string;
  urgency: UrgencyLevel;
  urgencyLevel: 1 | 2 | 3; // 3 = Emergency, 2 = Concerning, 1 = Normal
};

const qaData: QAItem[] = [
  { question: "Why do my cramps worsen some months?",
    answer: "Cramps happen when your uterus muscles contract to shed its lining. Other times your stress or hormonal level may make them worse. You can relieve them with exercise, a heat pack, and hydration. If cramps force you to vomit or miss school regularly, that's not normal—see a doctor.",
    urgency: "Emergency", urgencyLevel: 3 },
  { question: "Sometimes I get clumps or clots in my blood—is that bad?",
    answer: "Small clots can be normal (dime-sized or smaller). Blood gets old and you're shedding pieces of tissue. If you constantly pass large clots, however, or find yourself soaking pads in minutes, see a doctor as this can mean excessive menstrual bleeding.",
    urgency: "Emergency", urgencyLevel: 3 },
  { question: "I feel super tired during my period. Is that normal?",
    answer: "Yes, that is normal. You're losing blood and your body's working overtime. Eat iron-rich foods (beans, leafy greens, fortified cereals) and hydrate. If you feel faint or lightheaded frequently, a physician might check your blood iron status.",
    urgency: "Emergency", urgencyLevel: 3 },

  { question: "Why am I sometimes left with an odour when I am on my period?",
    answer: "Some smell is okay—it's just blood and normal bacteria. But if it's strong or fishy, or if you aren't changing often, talk to a doctor and change more frequently.",
    urgency: "Concerning", urgencyLevel: 2 },
  { question: "Is it bad if I skip a month sometimes?",
    answer: "Common in the first few years. If you miss several months or have symptoms like sudden weight change or new hair growth, see a clinician.",
    urgency: "Concerning", urgencyLevel: 2 },
  { question: "Why does my mood get really bad before my period?",
    answer: "Likely PMS due to a hormone drop. Journaling, talking to someone, and light exercise help. If it’s severe, ask about PMDD—treatments exist.",
    urgency: "Concerning", urgencyLevel: 2 },
  { question: "What do I do if I don't have any pads or tampons—what can I use?",
    answer: "Fold clean, soft cotton cloths thick enough to absorb. Wash with soap and water and dry fully (sun is best). Reusable cloth pads are safe when cleaned well.",
    urgency: "Concerning", urgencyLevel: 2 },
  { question: "What do I do if my period bleeds through my clothes at school?",
    answer: "It happens. Tie a sweatshirt around your waist, change your pad, and keep spare underwear if you can.",
    urgency: "Concerning", urgencyLevel: 2 },
  { question: "How do I keep the same cloth or pad on all day?",
    answer: "Try not to—change every 6–8 hours. If you can’t, fold a clean layer over the used cloth and wash ASAP. Long use increases rash/infection risk.",
    urgency: "Concerning", urgencyLevel: 2 },
  { question: "How do I avoid rashes when changing isn't an option?",
    answer: "A thin layer of petroleum jelly can reduce friction. Wear looser clothes to let air circulate.",
    urgency: "Concerning", urgencyLevel: 2 },
  { question: "What if I can't wash my hands before or after changing?",
    answer: "Use sanitizer if possible. If not, only touch clean sides of products and wash as soon as you can.",
    urgency: "Concerning", urgencyLevel: 2 },

  { question: "Why are my periods so different from my friends?",
    answer: "Bodies vary. See a doctor if your period lasts >7 days, is extremely painful, or makes you miss school often.",
    urgency: "Normal", urgencyLevel: 1 },
  { question: "Am I able to swim or participate in sports on my period?",
    answer: "Yes. Tampons or cups work well for swimming. Exercise can even reduce cramps.",
    urgency: "Normal", urgencyLevel: 1 },
  { question: "Is it okay to be embarrassed to have my period?",
    answer: "Totally normal—but it’s a healthy, universal process. Talking about it reduces stigma.",
    urgency: "Normal", urgencyLevel: 1 },
  { question: "How do I stay clean if I cannot shower every day?",
    answer: "Wipe the vulva (outside only) front-to-back with a clean wet cloth once or twice a day. Breathable underwear helps.",
    urgency: "Normal", urgencyLevel: 1 },
  { question: "What do I do if I lack products or am too shy to ask?",
    answer: "Check schools, community centers, shelters, and food pantries for free supplies. A school nurse or trusted adult can help.",
    urgency: "Normal", urgencyLevel: 1 },
  { question: "Why do I get bloated or puffy before my period?",
    answer: "Hormonal water retention. Hydrate and reduce very salty foods.",
    urgency: "Normal", urgencyLevel: 1 },
  { question: "Is it wrong that I use toilet paper instead of a pad for a while?",
    answer: "Okay only briefly—it doesn’t absorb well. Switch to a pad or clean cloth as soon as possible.",
    urgency: "Normal", urgencyLevel: 1 },
  { question: "What if I don't have a location where I can change my pad or cloth in private?",
    answer: "Plan short windows of privacy: school nurse’s office, public restrooms, or ask a friend to stand guard.",
    urgency: "Normal", urgencyLevel: 1 },
  { question: "How do I keep my reusable cloths clean if I can't dry them in the sun?",
    answer: "Air-dry in a clean, well-ventilated area until fully dry to prevent bacteria growth.",
    urgency: "Normal", urgencyLevel: 1 },
];

const urgencyStyles: Record<UrgencyLevel, {
  bg: string; text: string; border: string; icon: React.ComponentType<{className?: string}>;
  caption: string;
}> = {
  Emergency: {
    bg: "bg-red-50", text: "text-red-800", border: "border-red-200", icon: AlertTriangle,
    caption: "Needs immediate medical attention or advice",
  },
  Concerning: {
    bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200", icon: Clock,
    caption: "Monitor and discuss with a healthcare provider",
  },
  Normal: {
    bg: "bg-green-50", text: "text-green-800", border: "border-green-200", icon: CheckCircle,
    caption: "Common questions about typical experiences",
  },
};

export default function DoctorQA() {
  // sort without mutating original
  const sorted = [...qaData].sort((a, b) => b.urgencyLevel - a.urgencyLevel);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-600">
            <Stethoscope className="h-5 w-5" />
            Ask a Doctor
          </CardTitle>
          <CardDescription>
            Common questions about menstruation answered by pediatrician Dr. Vani Venkatachalam of Care &amp; Cure Pediatrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-50 mb-6">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-blue-700">
              These are real questions grouped by urgency to help you know when to get help.
            </p>
          </div>

          {/* Legend */}
          <div className="grid gap-4 md:grid-cols-3">
            {(Object.keys(urgencyStyles) as UrgencyLevel[]).map((level) => {
              const S = urgencyStyles[level];
              const Icon = S.icon;
              return (
                <div key={level} className={`p-3 rounded-lg border ${S.bg} ${S.border}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${S.text}`} />
                    <span className="text-sm font-medium">{level}</span>
                  </div>
                  <p className="text-xs opacity-80">{S.caption}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">Frequently Asked Questions</CardTitle>
          <CardDescription>Tap a question to expand.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {sorted.map((qa, i) => {
              const S = urgencyStyles[qa.urgency];
              const Icon = S.icon;
              return (
                <AccordionItem key={i} value={`q-${i}`} className="border-b">
                  <AccordionTrigger className="text-left hover:no-underline hover:bg-gray-50 px-4 py-3 rounded-lg">
                    <div className="flex items-start gap-3 w-full">
                      <Icon className="h-4 w-4 text-gray-500 mt-1" />
                      <p className="text-sm text-gray-900 flex-1 pr-4">{qa.question}</p>
                      <Badge variant="outline" className={`${S.text} ${S.border} bg-white`}>
                        {qa.urgency}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={`mx-4 mb-4 rounded-lg border ${S.border} ${S.bg}`}>
                      <p className="p-4 text-sm text-gray-800 leading-relaxed">{qa.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-pink-50 to-purple-50">
        <CardContent className="p-6">
          <h3 className="text-lg mb-4 text-purple-700">Important Reminders</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="text-pink-600 mb-2">You're Not Alone</h4>
              <p className="text-gray-700">
                Everyone’s cycle is unique. Questions are normal.
              </p>
            </div>
            <div>
              <h4 className="text-pink-600 mb-2">When to Seek Help</h4>
              <p className="text-gray-700">
                Don’t wait to talk to a healthcare provider for items marked “Emergency” or if you’re worried.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// app/ask-a-doctor/page.tsx
import DoctorQA from "@/components/DoctorQA";

export default function Page() {
  return (
    <main className="container mx-auto p-6">
      <DoctorQA />
    </main>
  );
}
<img src="/girl-scouts-logo.png" alt="Girl Scouts Logo" />
<img src="/anatomy-diagram.png" alt="Female Reproductive System Diagram" />
<video controls src="/demo-video.mp4" />
