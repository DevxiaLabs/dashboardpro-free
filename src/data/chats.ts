export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "offline";
  lastMessage: string;
  lastTime: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  contactId: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

export const contacts: ChatContact[] = [
  { id: "c1", name: "Sarah Johnson", avatar: "SJ", status: "online", lastMessage: "Sounds great! Let me know when it's ready.", lastTime: "2m", unread: 2 },
  { id: "c2", name: "Alex Chen", avatar: "AC", status: "online", lastMessage: "I've pushed the latest changes to the repo.", lastTime: "15m", unread: 0 },
  { id: "c3", name: "Maria Garcia", avatar: "MG", status: "away", lastMessage: "Can we reschedule tomorrow's meeting?", lastTime: "1h", unread: 1 },
  { id: "c4", name: "James Wilson", avatar: "JW", status: "offline", lastMessage: "The design looks perfect 👍", lastTime: "3h", unread: 0 },
  { id: "c5", name: "Emma Davis", avatar: "ED", status: "online", lastMessage: "Let me check with the team first.", lastTime: "5h", unread: 0 },
  { id: "c6", name: "Ryan Miller", avatar: "RM", status: "away", lastMessage: "I'll send the invoice by Friday.", lastTime: "1d", unread: 0 },
  { id: "c7", name: "Lisa Park", avatar: "LP", status: "offline", lastMessage: "Thanks for the update!", lastTime: "2d", unread: 0 },
  { id: "c8", name: "Dev Team", avatar: "DT", status: "online", lastMessage: "Alex: Sprint planning starts at 10am", lastTime: "30m", unread: 5 },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  c1: [
    { id: "m1", contactId: "c1", sender: "them", text: "Hey! How's the dashboard project going?", time: "10:15 AM" },
    { id: "m2", contactId: "c1", sender: "me", text: "Going well! Almost done with the components library.", time: "10:18 AM" },
    { id: "m3", contactId: "c1", sender: "them", text: "That's awesome! Can you show me a preview?", time: "10:20 AM" },
    { id: "m4", contactId: "c1", sender: "me", text: "Sure, I'll deploy it to staging in about an hour.", time: "10:22 AM" },
    { id: "m5", contactId: "c1", sender: "them", text: "Sounds great! Let me know when it's ready.", time: "10:23 AM" },
  ],
  c2: [
    { id: "m6", contactId: "c2", sender: "them", text: "The CI pipeline is failing on the test suite", time: "9:30 AM" },
    { id: "m7", contactId: "c2", sender: "me", text: "Let me check. Which branch?", time: "9:32 AM" },
    { id: "m8", contactId: "c2", sender: "them", text: "feature/auth-refactor. It's the JWT tests.", time: "9:33 AM" },
    { id: "m9", contactId: "c2", sender: "me", text: "Found it — the mock was outdated. Fixing now.", time: "9:45 AM" },
    { id: "m10", contactId: "c2", sender: "them", text: "I've pushed the latest changes to the repo.", time: "10:10 AM" },
  ],
  c3: [
    { id: "m11", contactId: "c3", sender: "them", text: "Hi, are you free for a quick call?", time: "8:00 AM" },
    { id: "m12", contactId: "c3", sender: "me", text: "In a meeting right now, can we chat at 11?", time: "8:05 AM" },
    { id: "m13", contactId: "c3", sender: "them", text: "Can we reschedule tomorrow's meeting?", time: "9:00 AM" },
  ],
  c8: [
    { id: "m14", contactId: "c8", sender: "them", text: "Good morning team! 🚀", time: "9:00 AM" },
    { id: "m15", contactId: "c8", sender: "me", text: "Morning! Ready for the sprint.", time: "9:02 AM" },
    { id: "m16", contactId: "c8", sender: "them", text: "Sprint planning starts at 10am", time: "9:55 AM" },
  ],
};
