export const projects = [
  {
    id: 1,
    type: "web",
    label: "Full Stack Web App",
    category: "Full Stack Web App",
    title: "Inventory & POS Management App",
    description:
      "A multi-role cashier and owner app where admins manage shops, products, categories, and track revenue & profit. Employees handle sales transactions with cart checkout.",
    overview:
      "A multi-role inventory and point-of-sale application where shop owners (admin) and employees (user) have distinct capabilities. Admins manage the full business — shops, products, categories, revenue — while employees operate as cashiers to process customer transactions.",
    liveLink: "https://my-ecommerce-6s1bddcxq-charles-projects-73090cc9.vercel.app/",
    github: "https://github.com/CharlesProf?tab=repositories",
    slides: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      {
        role: "Admin (Owner)",
        points: [
          "Create and manage multiple shops",
          "Add products with categories, subcategories, SKUs, stock, pricing, and sale prices",
          "Activate or deactivate products for sale",
          "View revenue, realized profit per shop, and transaction history by date range",
          "Access a Customers & Leads CRM with repeat buyer tracking",
          "Dashboard with sales trend charts and order flow analytics"
        ]
      },
      {
        role: "User (Employee / Cashier)",
        points: [
          "Browse products from the assigned store",
          "Search products and add them to cart",
          "Proceed to checkout with customer name, phone, address, and payment method",
          "Create and complete transactions",
          "View personal transaction history"
        ]
      }
    ],
    techStack: ["Next.js", "NeonDBServerless", "PostgreSQL", "Vercel", "Tailwind CSS"]
  },
  {
    id: 2,
    type: "web",
    label: "Thesis Project",
    category: "Website",
    title: "Campus Event Network App",
    description:
      "A web application centralizing campus event discovery for students who need community service hours and student activity scores for graduation requirements.",
    overview:
      "A web application built as a thesis project to solve the fragmented event discovery problem on campus. Students need to attend events to earn Community Service Hours (jam pengmas) and Student Activity scores required for graduation — but these events were scattered across different sources and hard to track.",
    liveLink: "https://youtu.be/RAJ-jVMKBfA?si=Jtuj4Wa4o6pQnwQN",
    github: "https://github.com/CharlesProf/skripsi/tree/main",
    slides: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      {
        role: "The Problem",
        points: [
          "Students needed to find events from multiple disconnected sources",
          "Missing an event meant missing graduation requirement points",
          "No central platform to browse, register, or track attended events",
          "Important self-improvement and community events were often overlooked"
        ]
      },
      {
        role: "The Solution",
        points: [
          "Centralized event discovery feed for all campus events",
          "Students can filter events by type, date, and points category",
          "Registration and attendance tracking in one place",
          "Automated score/hour accumulation toward graduation requirements",
          "Notifications for upcoming events relevant to each student"
        ]
      }
    ],
    techStack: ["Next.JS", "Prisma PostgreSQL", "Firebase", "Bootstrap", "JavaScript"]
  },
  {
    id: 3,
    type: "web",
    label: "Seller Dashboard",
    category: "Dashboard",
    title: "Indotrading Seller Analytics Dashboard",
    description:
      "A seller dashboard on Indonesia's largest B2B supplier network, featuring visitor analytics, RFQ statistics, product performance tracking, and SLA monitoring.",
    overview:
      "A seller-facing analytics dashboard on Indotrading, Indonesia's largest B2B supplier network. The dashboard gives sellers a full picture of their store performance — from visitor traffic and lead counts to SLA compliance, RFQ statistics, and product-level engagement.",
    liveLink: "https://seller.indotrading.com",
    github: "https://github.com/CharlesProf?tab=repositories",
    slides: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      {
        role: "Analytics & Monitoring",
        points: [
          "Visitor statistics broken down by region (domestic and international)",
          "Top 5 most and least visited products",
          "RFQ (Request for Quotation) and verified user statistics over 6 months",
          "Incoming message and phone click tracking",
          "Traffic, RFQ, and phone click SLA target vs. actual comparison"
        ]
      },
      {
        role: "Business Overview",
        points: [
          "Monthly lead count and unread message alerts",
          "Membership status and responsiveness rate",
          "Product catalog count and category structure",
          "Pending marketplace fees and incomplete invoice alerts",
          "Export to PDF for reporting"
        ]
      }
    ],
    techStack: ["ASP.NET", "C#", "React", "SQL Server", "Indotrading Platform", "MongoDB", "Redis"]
  }
];
