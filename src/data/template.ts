interface Template {
  id: string;
  title: string;
  content: string;
}

export const templates: Template[] = [
  {
    id: "1",
    title: "Welcome Email",
    content:
      "Hi <strong>{{name}}</strong>,<br><br>Thank you for joining us! We are glad to have you.<br><br>Thanks,<br>{{email}}<br>{{number}}",
  },
  {
    id: "2",
    title: "Password Reset",
    content:
      "Hi <strong>{{name}}</strong>,<br><br>To reset your password, click on the link below.<br><br>Thanks,<br>{{email}}<br>{{number}}",
  },
  {
    id: "3",
    title: "Subscription Confirmation",
    content:
      "Hi <strong>{{name}}</strong>,<br><br>Your subscription was successful. Welcome to our newsletter!<br><br>Thanks,<br>{{email}}<br>{{number}}",
  },
  {
    id: "4",
    title: "Order Confirmation",
    content:
      "Hi <strong>{{name}}</strong>,<br><br>We have received your order and it is now being processed.<br><br>Thanks,<br>{{email}}<br>{{number}}",
  },
  {
    id: "5",
    title: "Feedback Request",
    content:
      "Hi <strong>{{name}}</strong>,<br><br>We would love to hear about your experience with our product.<br><br>Thanks,<br>{{email}}<br>{{number}}",
  },
  {
    id: "6",
    title: "Welcome Email",
    content: "Thank you for joining us! We are glad to have you.",
  },
  {
    id: "7",
    title: "Password Reset",
    content: "To reset your password, click on the link below.",
  },
  {
    id: "8",
    title: "Subscription Confirmation",
    content: "Your subscription was successful. Welcome to our newsletter!",
  },
  {
    id: "9",
    title: "Order Confirmation",
    content: "We have received your order and it is now being processed.",
  },
  {
    id: "10",
    title: "Feedback Request",
    content: "We would love to hear about your experience with our product.",
  },
  {
    id: "11",
    title: "Booking Confirmation",
    content:
      "Your reservation is confirmed. Here are the details of your upcoming stay with us.",
  },
  {
    id: "12",
    title: "Pre-Arrival Information",
    content:
      "Excited for your stay? Here’s everything you need to know before your arrival.",
  },
  {
    id: "13",
    title: "Welcome to Our Resort",
    content:
      "Welcome! We’re thrilled to have you. Here’s a guide to make the most of your stay.",
  },
  {
    id: "14",
    title: "Special Offers for Our Guests",
    content: "As a valued guest, here are some exclusive offers just for you!",
  },
  {
    id: "15",
    title: "Event Schedule",
    content: "Check out the exciting events we have lined up during your stay.",
  },
  {
    id: "16",
    title: "Dining Reservations",
    content:
      "Reserve your spot at our exclusive dining experiences. Bon appétit!",
  },
  {
    id: "17",
    title: "Spa Booking Confirmation",
    content: "Your spa appointment is set. Get ready to relax and rejuvenate.",
  },
  {
    id: "18",
    title: "Activity Booking Confirmation",
    content: "Excitement awaits! Your activity booking is confirmed.",
  },
  {
    id: "19",
    title: "Room Upgrade Offer",
    content:
      "Enhance your stay with a room upgrade. Special rates available for a limited time.",
  },
  {
    id: "20",
    title: "Check-Out Instructions",
    content:
      "We hope you enjoyed your stay! Here’s what you need to know about check-out.",
  },
  {
    id: "21",
    title: "Post-Stay Thank You",
    content: "Thank you for choosing us. We hope to welcome you back soon!",
  },
  {
    id: "22",
    title: "Stay Feedback Request",
    content: "Tell us about your experience. Your feedback helps us improve!",
  },
  {
    id: "23",
    title: "Loyalty Program Invitation",
    content:
      "Join our loyalty program and enjoy exclusive benefits on your next stay.",
  },
  {
    id: "24",
    title: "Anniversary Special Offer",
    content:
      "Celebrating a special occasion? Let us make it memorable with an exclusive offer.",
  },
  {
    id: "25",
    title: "Holiday Season Greetings",
    content:
      "Wishing you a joyous holiday season from all of us at the resort!",
  },
  {
    id: "26",
    title: "Weather Alert",
    content:
      "Heads up on the weather forecast during your stay for optimal planning.",
  },
  {
    id: "27",
    title: "Referral Program",
    content:
      "Refer a friend and earn rewards. Sharing the joy has never been so rewarding!",
  },
  {
    id: "28",
    title: "New Facility Opening",
    content:
      "Exciting news! Our new facility is now open. Be among the first to experience it.",
  },
  {
    id: "29",
    title: "Renovation Notice",
    content:
      "We’re upgrading to serve you better. Here’s what to expect during our renovation.",
  },
  {
    id: "30",
    title: "Exclusive Return Guest Offer",
    content:
      "As a valued guest, we’re offering you an exclusive rate for your next stay.",
  },
];
