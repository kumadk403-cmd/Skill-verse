// SkillVerse data layer — skill metadata, roadmaps, resources, checklists.
// Kept separate from UI code so it's easy to extend.

const SKILLS = [
  {
    id: "website-development",
    name: "Website Development",
    icon: "🖥️",
    tagline: "Learn to create websites, landing pages, portfolios, and interactive web applications.",
    include: "HTML, CSS, JavaScript, responsive design, GitHub, website hosting, and basic maintenance.",
    estTime: "8–12 weeks",
    android: "friendly",
    laptop: "recommended",
    whatYouLearn: [
      "How a webpage is structured and displayed in a browser.",
      "How to style pages with layout, color, and typography.",
      "How to make a page interactive with JavaScript.",
      "How to publish a site so anyone can visit it."
    ],
    canLearnOnPhone: [
      { text: "HTML and CSS can be written in an Android code editor.", ok: true },
      { text: "You can preview pages right in your phone's browser.", ok: true },
      { text: "GitHub works fine from a mobile browser.", ok: true },
      { text: "Larger projects with many files get easier on a laptop.", ok: false }
    ],
    projects: ["A personal website", "A business landing page", "A freelance portfolio"],
    roadmap: {
      beginner: [
        {
          id: "wd-b1", title: "How websites work", time: "3 days",
          explain: "Understand what a browser, a server, and a webpage actually are.",
          skills: ["Client vs. server", "URLs", "How a page loads"],
          resources: ["mdn", "w3schools"],
          assignment: "Write down, in your own words, what happens when you type a URL and press enter."
        },
        {
          id: "wd-b2", title: "HTML elements and structure", time: "1 week",
          explain: "Learn the building blocks that give a page its structure and content.",
          skills: ["Tags and elements", "Headings, links, images", "Lists and tables", "Forms"],
          resources: ["freecodecamp", "mdn", "w3schools"],
          assignment: "Build a one-page bio with a heading, a photo, a list of hobbies, and a link."
        },
        {
          id: "wd-b3", title: "CSS, colors, typography, layout", time: "1.5 weeks",
          explain: "Learn to style HTML — colors, fonts, spacing, and page layout.",
          skills: ["Selectors", "Box model", "Flexbox", "Color and type"],
          resources: ["freecodecamp", "mdn", "w3schools"],
          assignment: "Style your bio page with a color palette, custom fonts, and a card layout."
        },
        {
          id: "wd-b4", title: "Responsive design for mobile", time: "1 week",
          explain: "Make sure your page looks good on any screen size, phone included.",
          skills: ["Media queries", "Flexible units", "Mobile-first thinking"],
          resources: ["freecodecamp", "mdn"],
          assignment: "Make your bio page look good at 360px, 768px, and 1200px wide."
        }
      ],
      intermediate: [
        {
          id: "wd-i1", title: "JavaScript fundamentals", time: "2 weeks",
          explain: "Learn to make pages react to what the user does.",
          skills: ["Variables", "Functions", "Events", "DOM manipulation"],
          resources: ["freecodecamp", "codewithharry", "mdn"],
          assignment: "Build a button that changes the page's background color when clicked."
        },
        {
          id: "wd-i2", title: "Interactive forms and navigation", time: "1 week",
          explain: "Learn to build forms and multi-section navigation that respond to input.",
          skills: ["Form validation", "Nav menus", "Local storage basics"],
          resources: ["freecodecamp", "mdn"],
          assignment: "Build a contact form that checks fields before showing a success message."
        },
        {
          id: "wd-i3", title: "Git and GitHub", time: "4 days",
          explain: "Learn to track changes to your code and back it up online.",
          skills: ["git init/add/commit", "Repositories", "Branches (basic)"],
          resources: ["github"],
          assignment: "Put your bio page project into a GitHub repository."
        },
        {
          id: "wd-i4", title: "Publishing with GitHub Pages", time: "2 days",
          explain: "Learn to put your website live on the internet for free.",
          skills: ["GitHub Pages settings", "Custom domains (optional)"],
          resources: ["githubpages"],
          assignment: "Publish your bio page so it's reachable at a public URL."
        }
      ],
      projects: [
        {
          id: "wd-p1", title: "Build a personal portfolio", time: "1 week",
          explain: "Combine everything so far into a site that represents you.",
          skills: ["Planning a layout", "Reusable sections"],
          resources: ["freecodecamp"],
          assignment: "Build and publish a 3–4 section portfolio site."
        },
        {
          id: "wd-p2", title: "Build a business landing page", time: "1 week",
          explain: "Practice designing for a business rather than yourself.",
          skills: ["Hero sections", "Calls to action"],
          resources: ["w3schools"],
          assignment: "Design a landing page for a small fictional business."
        },
        {
          id: "wd-p3", title: "Build a mobile-friendly interactive site", time: "1.5 weeks",
          explain: "Bring together layout, responsiveness, and JavaScript interactivity.",
          skills: ["Component thinking", "State in plain JS"],
          resources: ["freecodecamp", "codewithharry"],
          assignment: "Build a small site with a working feature like a to-do list or gallery."
        }
      ]
    },
    resources: [
      { id: "freecodecamp", name: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/", desc: "Free, project-based curriculum covering HTML, CSS, and JavaScript from scratch.", learn: "Structured lessons plus certifications you build by coding real projects.", price: "free", android: true, type: "website" },
      { id: "mdn", name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", desc: "The standard reference for web technologies, maintained by Mozilla.", learn: "In-depth, accurate explanations of HTML, CSS, and JavaScript concepts.", price: "free", android: true, type: "website" },
      { id: "w3schools", name: "W3Schools", url: "https://www.w3schools.com/", desc: "Beginner-friendly tutorials with an in-browser code editor.", learn: "Quick syntax references and a 'Try it Yourself' editor for instant practice.", price: "free", android: true, type: "website" },
      { id: "codewithharry", name: "CodeWithHarry", url: "https://www.youtube.com/@CodeWithHarry", desc: "A popular Hindi/English YouTube channel teaching web development.", learn: "Video walkthroughs of HTML, CSS, JavaScript, and full projects.", price: "free", android: true, type: "website" },
      { id: "github", name: "GitHub", url: "https://github.com/", desc: "Where you store, version, and share your code.", learn: "How to create repositories and track changes to your projects.", price: "freemium", android: true, type: "website" },
      { id: "githubpages", name: "GitHub Pages", url: "https://pages.github.com/", desc: "Free static-site hosting built into GitHub.", learn: "How to publish a repository as a live website.", price: "free", android: true, type: "website" }
    ],
    checklist: [
      "Learn HTML basics.",
      "Practise headings, links, and images.",
      "Learn CSS styling.",
      "Practise layouts and responsive design.",
      "Learn JavaScript basics.",
      "Build an interactive website.",
      "Publish a website on GitHub Pages.",
      "Complete a portfolio project."
    ]
  },
  {
    id: "graphic-design",
    name: "Graphic Designing",
    icon: "🎨",
    tagline: "Learn to create posters, thumbnails, advertisements, invitations, and social media graphics.",
    include: "Canva, typography, color theory, layouts, image editing, and visual design.",
    estTime: "6–8 weeks",
    android: "friendly",
    laptop: "not required",
    whatYouLearn: [
      "How color, type, and layout work together to communicate.",
      "How to use Canva to build real designs quickly.",
      "How to edit and combine images cleanly.",
      "How to design consistently for a brand or theme."
    ],
    canLearnOnPhone: [
      { text: "Canva works well on Android, including templates and editing.", ok: true },
      { text: "Photopea runs in a mobile browser with some limitations.", ok: true },
      { text: "Exporting and sharing designs works fine from a phone.", ok: true },
      { text: "Very detailed photo retouching is easier with a mouse on a laptop.", ok: false }
    ],
    projects: ["A YouTube thumbnail", "A social media poster", "An invitation design"],
    roadmap: {
      beginner: [
        {
          id: "gd-b1", title: "Design fundamentals", time: "4 days",
          explain: "Learn the core vocabulary: contrast, alignment, balance, hierarchy.",
          skills: ["Contrast", "Alignment", "Visual hierarchy"],
          resources: ["canva-school"],
          assignment: "Redesign one bad-looking poster you find online, explaining what you changed."
        },
        {
          id: "gd-b2", title: "Color theory", time: "3 days",
          explain: "Learn how colors work together and what moods they create.",
          skills: ["Color wheel", "Palettes", "Contrast and readability"],
          resources: ["canva-school"],
          assignment: "Build 3 color palettes for 3 different moods (calm, energetic, professional)."
        },
        {
          id: "gd-b3", title: "Typography basics", time: "4 days",
          explain: "Learn how font choice and pairing affects a design's feel.",
          skills: ["Font pairing", "Sizing and spacing", "Readability"],
          resources: ["canva-school"],
          assignment: "Design a title card using only two fonts, well-paired."
        },
        {
          id: "gd-b4", title: "Learning Canva", time: "1 week",
          explain: "Get comfortable with the tool you'll use for most projects.",
          skills: ["Templates", "Layers", "Text and shapes", "Exporting"],
          resources: ["canva"],
          assignment: "Recreate a simple poster from a template, then customize it fully."
        }
      ],
      intermediate: [
        {
          id: "gd-i1", title: "Layouts for social media", time: "1 week",
          explain: "Learn correct sizes and layout patterns for Instagram, YouTube, and posters.",
          skills: ["Aspect ratios", "Grid layouts", "Safe zones"],
          resources: ["canva", "canva-school"],
          assignment: "Design a 3-post Instagram carousel with a consistent style."
        },
        {
          id: "gd-i2", title: "Image editing basics", time: "1 week",
          explain: "Learn to crop, retouch, and combine images cleanly.",
          skills: ["Cropping", "Background removal", "Layering images"],
          resources: ["photopea", "adobe-express"],
          assignment: "Remove the background from a photo and place it on a new backdrop."
        },
        {
          id: "gd-i3", title: "Branding basics", time: "1 week",
          explain: "Learn to keep a design consistent across multiple pieces.",
          skills: ["Logos (simple)", "Brand colors and fonts", "Templates"],
          resources: ["canva"],
          assignment: "Design a mini brand kit: logo, 2 colors, 2 fonts, one template."
        }
      ],
      projects: [
        {
          id: "gd-p1", title: "Design a YouTube thumbnail", time: "3 days",
          explain: "Practice bold, clickable design at a specific required size.",
          skills: ["High contrast", "Large readable text"],
          resources: ["canva"],
          assignment: "Design 2 thumbnail variants for the same fictional video."
        },
        {
          id: "gd-p2", title: "Design an event poster", time: "4 days",
          explain: "Combine type, color, and layout into one finished piece.",
          skills: ["Hierarchy", "Information design"],
          resources: ["canva"],
          assignment: "Design a poster for a fictional college fest or event."
        },
        {
          id: "gd-p3", title: "Design a social media kit", time: "1 week",
          explain: "Build a small, consistent set of graphics for one 'brand'.",
          skills: ["Consistency", "Templating"],
          resources: ["canva", "adobe-express"],
          assignment: "Design a profile picture, cover image, and 3 post templates."
        }
      ]
    },
    resources: [
      { id: "canva", name: "Canva", url: "https://www.canva.com/", desc: "A drag-and-drop design tool with thousands of templates.", learn: "How to build real posters, thumbnails, and social posts fast.", price: "freemium", android: true, type: "app & website" },
      { id: "canva-school", name: "Canva Design School", url: "https://www.canva.com/designschool/", desc: "Canva's own free tutorials on design fundamentals.", learn: "Color theory, typography, and layout, taught for beginners.", price: "free", android: true, type: "website" },
      { id: "photopea", name: "Photopea", url: "https://www.photopea.com/", desc: "A free, browser-based image editor similar to Photoshop.", learn: "Layer-based photo editing and compositing.", price: "free", android: true, type: "website" },
      { id: "adobe-express", name: "Adobe Express", url: "https://www.adobe.com/express/", desc: "Adobe's simplified design tool for quick graphics.", learn: "Fast templated design with Adobe's stock assets.", price: "freemium", android: true, type: "app & website" }
    ],
    checklist: [
      "Learn design fundamentals (contrast, alignment, hierarchy).",
      "Learn color theory and build 3 palettes.",
      "Learn typography and font pairing.",
      "Get comfortable with Canva's editor.",
      "Design a 3-post social media carousel.",
      "Learn basic image editing in Photopea.",
      "Design a YouTube thumbnail.",
      "Complete a social media kit project."
    ]
  },
  {
    id: "video-editing",
    name: "Video Editing",
    icon: "🎬",
    tagline: "Learn to edit YouTube videos, Instagram reels, short videos, gaming clips, and promotional content.",
    include: "Video cutting, captions, transitions, sound editing, color correction, and exporting.",
    estTime: "6–10 weeks",
    android: "friendly for short-form",
    laptop: "recommended for longer projects",
    whatYouLearn: [
      "How to cut and arrange clips into a coherent video.",
      "How to add captions, music, and sound effects.",
      "How to color-correct footage so it looks polished.",
      "How to export videos correctly for YouTube and Instagram."
    ],
    canLearnOnPhone: [
      { text: "VN Video Editor is built for Android and works well for reels/shorts.", ok: true },
      { text: "Basic cutting, captions, and music can all be done on a phone.", ok: true },
      { text: "DaVinci Resolve is a desktop application, not available on Android.", ok: false },
      { text: "Long, multi-track projects are far more comfortable on a laptop.", ok: false }
    ],
    projects: ["An edited Instagram reel", "A YouTube intro", "A short gaming highlight clip"],
    roadmap: {
      beginner: [
        {
          id: "ve-b1", title: "Editing basics and timelines", time: "3 days",
          explain: "Understand how a timeline, clips, and tracks work.",
          skills: ["Timeline", "Trimming", "Splitting clips"],
          resources: ["youtube-academy", "vn"],
          assignment: "Cut a 3-minute raw clip down to a clean 30-second version."
        },
        {
          id: "ve-b2", title: "Transitions and pacing", time: "4 days",
          explain: "Learn how transitions affect the feel and rhythm of a video.",
          skills: ["Cuts vs. transitions", "Pacing to music"],
          resources: ["vn", "youtube-academy"],
          assignment: "Edit 5 clips together with at least 2 different transition styles."
        },
        {
          id: "ve-b3", title: "Captions and text", time: "3 days",
          explain: "Learn to add readable, well-timed captions and titles.",
          skills: ["Auto-captions", "Text animation", "Timing"],
          resources: ["vn"],
          assignment: "Caption a 1-minute talking video accurately."
        },
        {
          id: "ve-b4", title: "Sound editing", time: "4 days",
          explain: "Learn to balance voice, music, and sound effects.",
          skills: ["Audio levels", "Background music", "Fades"],
          resources: ["vn", "youtube-academy"],
          assignment: "Add background music under a voice clip without drowning it out."
        }
      ],
      intermediate: [
        {
          id: "ve-i1", title: "Color correction", time: "1 week",
          explain: "Learn to make footage look consistent and polished.",
          skills: ["Exposure", "White balance", "Basic grading"],
          resources: ["davinci", "davinci-training"],
          assignment: "Color-correct 3 clips shot in different lighting to match."
        },
        {
          id: "ve-i2", title: "Multi-track editing", time: "1 week",
          explain: "Learn to work with several video and audio tracks together.",
          skills: ["Layering clips", "B-roll", "Picture-in-picture"],
          resources: ["davinci", "davinci-training"],
          assignment: "Edit a video with a main clip, B-roll overlay, and background music."
        },
        {
          id: "ve-i3", title: "Exporting correctly", time: "2 days",
          explain: "Learn the right settings for YouTube vs. Instagram/Reels.",
          skills: ["Resolution", "Aspect ratio", "Bitrate basics"],
          resources: ["youtube-academy"],
          assignment: "Export the same edit correctly for both YouTube (16:9) and Reels (9:16)."
        }
      ],
      projects: [
        {
          id: "ve-p1", title: "Edit an Instagram reel", time: "3 days",
          explain: "Practice fast-paced, vertical, short-form editing.",
          skills: ["Vertical framing", "Trend pacing"],
          resources: ["vn"],
          assignment: "Edit a 15–30 second reel with captions and music."
        },
        {
          id: "ve-p2", title: "Edit a YouTube intro", time: "4 days",
          explain: "Practice branding and pacing for a channel intro.",
          skills: ["Titles", "Logo reveal (simple)"],
          resources: ["vn", "davinci"],
          assignment: "Create a 10–15 second channel intro."
        },
        {
          id: "ve-p3", title: "Edit a gaming highlight clip", time: "5 days",
          explain: "Practice fast cuts, sound effects, and captions together.",
          skills: ["Fast cuts", "Sound effects", "Highlight selection"],
          resources: ["vn", "davinci"],
          assignment: "Cut a 5-minute gameplay recording into a 60-second highlight reel."
        }
      ]
    },
    resources: [
      { id: "davinci", name: "DaVinci Resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve", desc: "A professional, desktop video editor with a free tier.", learn: "Multi-track editing, color grading, and audio mixing.", price: "freemium", android: false, type: "desktop application" },
      { id: "davinci-training", name: "Blackmagic Design Training", url: "https://www.blackmagicdesign.com/products/davinciresolve/training", desc: "Official training resources for DaVinci Resolve.", learn: "Structured lessons on Resolve's editing and color tools.", price: "free", android: false, type: "website" },
      { id: "vn", name: "VN Video Editor", url: "https://www.vlognow.me/", desc: "A free, popular mobile video editor.", learn: "Fast, touch-friendly editing for reels and shorts.", price: "free", android: true, type: "app" },
      { id: "youtube-academy", name: "YouTube Creator Academy", url: "https://creatoracademy.youtube.com/", desc: "YouTube's own free courses for creators.", learn: "Editing, thumbnails, storytelling, and channel growth.", price: "free", android: true, type: "website" }
    ],
    checklist: [
      "Learn timelines and trimming.",
      "Practise transitions and pacing.",
      "Add captions to a video.",
      "Balance voice, music, and sound effects.",
      "Learn basic color correction.",
      "Practise multi-track / B-roll editing.",
      "Export correctly for YouTube and Reels.",
      "Complete a highlight-reel project."
    ]
  },
  {
    id: "3d-modelling",
    name: "3D Modelling and CAD",
    icon: "🧊",
    tagline: "Learn to design 3D objects, printable parts, product models, and mechanical components.",
    include: "Tinkercad, Onshape, basic CAD, dimensions, sketches, 3D modelling, and STL export.",
    estTime: "8–10 weeks",
    android: "browser-based basics only",
    laptop: "recommended",
    whatYouLearn: [
      "What CAD is and how 3D models are built from 2D sketches.",
      "How to design simple, printable objects with correct dimensions.",
      "How STL files work and how they're used for 3D printing.",
      "How to move from simple shapes to more precise mechanical parts."
    ],
    canLearnOnPhone: [
      { text: "Tinkercad runs in a browser and covers basic shape modelling.", ok: true },
      { text: "Onshape's browser app can be used on some Android devices.", ok: false },
      { text: "Precise dimensioning and complex assemblies are hard with touch input.", ok: false },
      { text: "A laptop with a mouse makes CAD dramatically easier.", ok: false }
    ],
    projects: ["A 3D-printable phone stand", "A simple mechanical bracket", "A labeled keychain"],
    roadmap: {
      beginner: [
        {
          id: "cad-b1", title: "What is CAD and 3D modelling", time: "2 days",
          explain: "Understand what CAD software does and where it's used.",
          skills: ["CAD vocabulary", "2D sketch vs. 3D model"],
          resources: ["tinkercad-learn"],
          assignment: "List 5 everyday objects that were likely designed using CAD."
        },
        {
          id: "cad-b2", title: "Basic shapes in Tinkercad", time: "1 week",
          explain: "Learn to build objects from primitive shapes.",
          skills: ["Shapes", "Move/rotate/scale", "Grouping"],
          resources: ["tinkercad"],
          assignment: "Build a simple pen holder from combined shapes."
        },
        {
          id: "cad-b3", title: "Dimensions and precision", time: "1 week",
          explain: "Learn to work with accurate measurements, not just eyeballing.",
          skills: ["Units", "Snapping", "Exact sizing"],
          resources: ["tinkercad", "tinkercad-learn"],
          assignment: "Model a box with exact internal dimensions to fit a real object you own."
        }
      ],
      intermediate: [
        {
          id: "cad-i1", title: "Sketches and constraints (Onshape)", time: "1.5 weeks",
          explain: "Learn proper 2D sketching before extruding into 3D — the standard professional CAD workflow.",
          skills: ["Sketch tools", "Constraints", "Extrude/revolve"],
          resources: ["onshape-learn", "onshape"],
          assignment: "Sketch and extrude a simple bracket shape in Onshape."
        },
        {
          id: "cad-i2", title: "Assemblies (basic)", time: "1 week",
          explain: "Learn to combine multiple parts so they fit together correctly.",
          skills: ["Mates/joints (basic)", "Fit and tolerance (intro)"],
          resources: ["onshape-learn"],
          assignment: "Design two parts that snap or slot together."
        },
        {
          id: "cad-i3", title: "STL export and print-readiness", time: "3 days",
          explain: "Learn how a model becomes a file ready for a 3D printer.",
          skills: ["STL format", "Print orientation basics", "Wall thickness"],
          resources: ["tinkercad-learn"],
          assignment: "Export one of your models as an STL file."
        }
      ],
      projects: [
        {
          id: "cad-p1", title: "Design a phone stand", time: "1 week",
          explain: "Practice functional design with real-world dimensions.",
          skills: ["Functional design", "Angle and stability"],
          resources: ["tinkercad"],
          assignment: "Design a phone stand sized for your own phone."
        },
        {
          id: "cad-p2", title: "Design a mechanical bracket", time: "1 week",
          explain: "Practice sketch-based, precise part design.",
          skills: ["Sketch-driven design", "Hole placement"],
          resources: ["onshape"],
          assignment: "Design a simple L-bracket with two mounting holes."
        },
        {
          id: "cad-p3", title: "Design a labeled keychain", time: "3 days",
          explain: "Practice text, small details, and export together.",
          skills: ["Text tools", "Fine detail", "STL export"],
          resources: ["tinkercad"],
          assignment: "Design and export a keychain with your name on it."
        }
      ]
    },
    resources: [
      { id: "tinkercad", name: "Tinkercad", url: "https://www.tinkercad.com/", desc: "A free, browser-based, beginner-friendly 3D design tool.", learn: "Block-based 3D modelling using simple shapes.", price: "free", android: true, type: "website" },
      { id: "tinkercad-learn", name: "Tinkercad Learn", url: "https://www.tinkercad.com/learn", desc: "Tinkercad's own free lesson library.", learn: "Guided lessons on shapes, dimensions, and exporting.", price: "free", android: true, type: "website" },
      { id: "onshape", name: "Onshape", url: "https://www.onshape.com/", desc: "Professional, browser-based, full-featured CAD software.", learn: "Sketch-based part design and assemblies.", price: "freemium", android: false, type: "website (desktop-oriented)" },
      { id: "onshape-learn", name: "Onshape Learning Center", url: "https://learn.onshape.com/", desc: "Onshape's official free learning courses.", learn: "Structured, professional-grade CAD training.", price: "free", android: false, type: "website" }
    ],
    checklist: [
      "Understand what CAD is used for.",
      "Build a shape from primitives in Tinkercad.",
      "Practise precise dimensioning.",
      "Learn sketch-based modelling in Onshape.",
      "Design two parts that fit together.",
      "Export a model as STL.",
      "Design a phone stand.",
      "Complete a mechanical bracket project."
    ]
  },
  {
    id: "freelancing",
    name: "Freelancing and Online Work",
    icon: "💼",
    tagline: "Learn how to find clients, offer services, manage projects, set prices, and work professionally from home.",
    include: "Client communication, portfolio building, pricing, proposals, project management, spreadsheets, and payment safety.",
    estTime: "4–6 weeks",
    android: "friendly",
    laptop: "recommended for proposals & spreadsheets",
    whatYouLearn: [
      "How to present your skills through a simple portfolio.",
      "How to write a proposal that a client will actually read.",
      "How to price your work fairly and avoid common scams.",
      "How to track projects, deadlines, and payments."
    ],
    canLearnOnPhone: [
      { text: "Client messaging and portfolio building work fine on a phone.", ok: true },
      { text: "LinkedIn and marketplace browsing work well on Android.", ok: true },
      { text: "Writing longer proposals is easier with a keyboard on a laptop.", ok: false },
      { text: "Spreadsheets for tracking income are more comfortable on a laptop.", ok: false }
    ],
    projects: ["A freelance portfolio", "A sample client proposal", "A simple income tracker"],
    roadmap: {
      beginner: [
        {
          id: "fl-b1", title: "How freelancing platforms work", time: "3 days",
          explain: "Understand how marketplaces like Fiverr and Upwork connect clients and freelancers.",
          skills: ["Gigs vs. proposals", "Platform fees (basic)", "Reviews and ratings"],
          resources: ["fiverr-help"],
          assignment: "Write a short summary comparing how Fiverr and Upwork work."
        },
        {
          id: "fl-b2", title: "Building a portfolio", time: "1 week",
          explain: "Learn to showcase your best work clearly, even with few projects.",
          skills: ["Selecting work samples", "Simple case studies"],
          resources: ["linkedin"],
          assignment: "Put together 3 sample pieces of work with one line explaining each."
        },
        {
          id: "fl-b3", title: "Client communication basics", time: "4 days",
          explain: "Learn to communicate clearly, professionally, and on time.",
          skills: ["Tone", "Setting expectations", "Handling feedback"],
          resources: ["linkedin"],
          assignment: "Draft a polite message introducing yourself to a potential client."
        }
      ],
      intermediate: [
        {
          id: "fl-i1", title: "Pricing your work", time: "4 days",
          explain: "Learn to set fair prices without underselling yourself.",
          skills: ["Hourly vs. fixed pricing", "Researching market rates"],
          resources: ["fiverr-help", "upwork"],
          assignment: "Research 3 similar gigs and set a starting price for your own service."
        },
        {
          id: "fl-i2", title: "Writing proposals", time: "1 week",
          explain: "Learn to write a proposal that stands out and gets replies.",
          skills: ["Structure of a good proposal", "Addressing the client's need"],
          resources: ["upwork"],
          assignment: "Write a full sample proposal for a job posting you find online."
        },
        {
          id: "fl-i3", title: "Project tracking and spreadsheets", time: "3 days",
          explain: "Learn to track deadlines, deliverables, and payments in one place.",
          skills: ["Google Sheets basics", "Simple project trackers"],
          resources: ["google-sheets", "google-docs"],
          assignment: "Build a spreadsheet to track 3 fictional projects and their status."
        }
      ],
      projects: [
        {
          id: "fl-p1", title: "Build a one-page portfolio", time: "3 days",
          explain: "Bring your work samples together into one shareable page or doc.",
          skills: ["Presentation", "Clarity"],
          resources: ["google-docs"],
          assignment: "Create a one-page portfolio document you could actually send to a client."
        },
        {
          id: "fl-p2", title: "Write a full client proposal", time: "3 days",
          explain: "Practice the proposal-writing skill on a real job listing.",
          skills: ["Persuasive but honest writing"],
          resources: ["upwork"],
          assignment: "Submit (or draft, if not ready to apply) one real proposal."
        },
        {
          id: "fl-p3", title: "Build an income & project tracker", time: "3 days",
          explain: "Set up a simple system to stay organized as work comes in.",
          skills: ["Spreadsheet formulas (basic)", "Status tracking"],
          resources: ["google-sheets"],
          assignment: "Finish a spreadsheet with columns for client, task, deadline, and payment status."
        }
      ]
    },
    resources: [
      { id: "fiverr", name: "Fiverr", url: "https://www.fiverr.com/", desc: "A marketplace where you list fixed-price services (\"gigs\").", learn: "How gig-based freelancing and client reviews work.", price: "free to join", android: true, type: "app & website" },
      { id: "fiverr-help", name: "Fiverr Help Center", url: "https://help.fiverr.com/", desc: "Fiverr's official help and policy documentation.", learn: "Platform rules, fees, safety, and account requirements.", price: "free", android: true, type: "website" },
      { id: "upwork", name: "Upwork", url: "https://www.upwork.com/", desc: "A marketplace built around proposals and client job posts.", learn: "How to find jobs and write winning proposals.", price: "free to join", android: true, type: "app & website" },
      { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/", desc: "A professional networking platform.", learn: "How to build a professional profile and network for work.", price: "freemium", android: true, type: "app & website" },
      { id: "google-docs", name: "Google Docs", url: "https://docs.google.com/", desc: "Free online word processor.", learn: "Writing proposals and portfolio documents.", price: "free", android: true, type: "app & website" },
      { id: "google-sheets", name: "Google Sheets", url: "https://sheets.google.com/", desc: "Free online spreadsheet tool.", learn: "Tracking projects, deadlines, and payments.", price: "free", android: true, type: "app & website" }
    ],
    checklist: [
      "Understand how freelancing platforms work.",
      "Build a small work-sample portfolio.",
      "Practise a client introduction message.",
      "Research pricing and set a starting rate.",
      "Write a full sample proposal.",
      "Build a project-tracking spreadsheet.",
      "Finish a one-page portfolio document.",
      "Submit or draft a real client proposal."
    ]
  }
];

// Age / safety notes shown on the freelancing page and in settings.
const SAFETY_NOTE =
  "Most freelancing platforms require users to be 18 or older to create a paying account. " +
  "If you're younger, focus on building skills and a portfolio now, and review each platform's " +
  "own age and safety rules before creating any account.";

if (typeof module !== "undefined") module.exports = { SKILLS, SAFETY_NOTE };
