# Mystery.exe - Quant Logic : IT Theme

A mysterious hacker-themed terminal interface built with Next.js, TypeScript, and Tailwind CSS. Enter the quantum realm of code with a cyberpunk aesthetic featuring matrix animations and glitch effects. Optimized for performance and deployed on Vercel.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Performance Optimized** with modern web standards
- **Responsive Design** for all devices
- **Hacker Terminal Theme** with matrix animations
- **Glitch Effects** and cyberpunk aesthetics
- **Advanced Passcode Authentication** system with room-based access
- **Vercel Ready** for seamless deployment

## 🔐 Passcode System

The application features an advanced room-based access control system:

### Passcode Format
```
<LevelNumber><Department><RoomNumber>
```
- **LevelNumber**: 1 or 2
- **Department**: 2-letter code (e.g., EC)
- **RoomNumber**: 3-digit number

### Valid Rooms
**Level 1:**
- 1EC210: Quantum Computing Lab
- 1EC211: Neural Network Hub
- 1EC205: Cybersecurity Operations
- 1EC204: Data Analytics Center

**Level 2:**
- 2EC212: Quantum Entanglement Lab
- 2EC213: AI Consciousness Research
- 2EC203: Temporal Computing Lab
- 2EC202: Holographic Data Storage

### Example Passcodes
- `1EC210` → Quantum Computing Lab
- `2EC213` → AI Consciousness Research

## 🛠 Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Performance**: Optimized images, compression, SWC minification

## 🏗️ Room Pages

Each valid passcode leads to a unique room page featuring:

- **Prominent room display** (e.g., "ROOM: EC 210") with glitch effects
- **Level indicator** (e.g., "LEVEL: 1") clearly shown
- **Large centered image area** with dynamic clue image loading
- **Terminal-style header** with clearance level and room description
- **Next Passcode Display**: Highlighted box showing required passcode for next room
- **Copy-to-Clipboard**: Click the passcode to copy with visual feedback
- **Interactive controls** for analyzing clues and saving images (disabled during loading)
- **Navigation breadcrumbs** showing mainframe > level > room hierarchy
- **Status monitoring** with animated terminal output
- **Footer navigation** with mainframe return and next room options
- **Corner indicators** displaying room details and security status

## 📱 Responsive Design

The website is fully responsive and optimized for all screen sizes:

### **Mobile (320px+)**
- **Touch-friendly buttons** with minimum 44px height
- **Stacked layouts** for better vertical space usage
- **Larger text sizes** for readability
- **Optimized input fields** with appropriate padding
- **Hidden decorative elements** to reduce clutter

### **Tablet (768px+)**
- **Side-by-side layouts** for headers and navigation
- **Balanced spacing** between elements
- **Medium-sized typography** for comfortable reading
- **Flexible image containers** with responsive aspect ratios

### **Desktop (1024px+)**
- **Full-width layouts** with maximum content width constraints
- **Large typography** for impactful presentation
- **Hover effects** and advanced interactions
- **Multi-column layouts** where appropriate
- **Decorative corner indicators** visible

### **Responsive Features**
- **Progressive Enhancement**: Content-first approach with enhanced features on larger screens
- **Flexible Grid System**: CSS Grid and Flexbox for adaptive layouts
- **Responsive Images**: Next.js Image component with responsive sizing
- **Touch Optimization**: Adequate touch targets and gesture support
- **Performance**: Optimized loading across all devices

## 🖼️ Image Loading System

The room pages include advanced image loading with:

- **Dynamic Path Construction**: Images loaded based on passcode (e.g., `1EC210.jpg`)
- **Next.js Image Optimization**: Automatic WebP conversion and responsive sizing
- **Loading Animation**: Spinner animation with "LOADING CLUE IMAGE..." text
- **Error Handling**: Graceful fallback UI for missing images with error indicators
- **Status Indicators**: Real-time loading status ("STATUS: LOADING...", "STATUS: IMAGE LOADED ✓")
- **Performance Priority**: High-priority loading for above-the-fold images
- **Scan Line Effects**: Terminal aesthetic overlay on loaded images

## ✨ Advanced Visual Effects

The website features sophisticated visual effects for an immersive terminal experience:

### **Glitch Effects**
- **Enhanced Title Glitch**: Intensified RGB color shifting on hover with position jitter
- **Terminal Aesthetics**: Matrix-style animations and cyberpunk styling
- **Interactive Feedback**: Visual responses to user interactions

### **Neon Glow System**
- **Interactive Elements**: Buttons and inputs with neon border glow effects
- **Hover Enhancements**: Enhanced shadows and color transitions
- **Terminal Styling**: Green neon accents throughout the interface

### **Animation System**
- **Fade-in Effects**: Smooth page load animations with staggered delays
- **Scanning Text**: Horizontal light sweep effects on status text
- **Typing Effects**: Character-by-character text reveal animations
- **Pulse Effects**: Breathing glow animations on accent elements

### **Enhanced Interactions**
- **Hover Transformations**: Lift and scale effects on interactive elements
- **Glow Transitions**: Dynamic shadow and border color changes
- **Smooth Transitions**: 300ms ease transitions for all state changes
- **Performance Optimized**: CSS-only animations for optimal performance

## 🗺️ Clue Mapping System

The mystery includes a sophisticated clue progression system with centralized configuration:

### **Room Configuration**
All room data is managed in `src/constants/roomConfig.ts`:
- **Complete room database** with all 8 standard rooms + 4 final theme rooms
- **Centralized mappings** for room progression (Level 1→2→3)
- **Easy extensibility** for adding new rooms or changing mappings
- **Type-safe interfaces** for room data structure

### **Room Progression**
- **Level 1** → **Level 2** → **Level 3** (Final Theme Rooms)
- Each room contains a clue leading to the next destination
- Players follow a predetermined path through the facility

### **Clue Mappings**
**Level 1 to Level 2:**
- EC210 (Quantum Computing Lab) → EC212 (Quantum Entanglement Lab)
- EC211 (Neural Network Hub) → EC213 (AI Consciousness Research)
- EC205 (Cybersecurity Operations) → EC203 (Temporal Computing Lab)
- EC204 (Data Analytics Center) → EC202 (Holographic Data Storage)

**Level 2 to Level 3:**
- EC212 → FINAL01 (The Quantum Nexus)
- EC213 → FINAL02 (The Singularity Chamber)
- EC203 → FINAL03 (The Time Vault)
- EC202 → FINAL04 (The Memory Palace)

### **Level 3 Theme Rooms**
- **FINAL01**: The Quantum Nexus - Convergence of all quantum possibilities
- **FINAL02**: The Singularity Chamber - AI consciousness enlightenment
- **FINAL03**: The Time Vault - Temporal anomalies repository
- **FINAL04**: The Memory Palace - Infinite knowledge storage

### **Passcode Display Feature**
- **Prominent Display**: Next required passcode shown in highlighted yellow box
- **Click to Copy**: Interactive passcode that copies to clipboard on click
- **Visual Feedback**: "✓ COPIED TO CLIPBOARD" confirmation message
- **Browser Fallback**: Alternative copy method for older browsers
- **Clear Instructions**: "Click to copy • Use at main terminal" guidance

### **Navigation Features**
- **Next Passcode Display**: Prominently shows required passcode for next room
- **Copy Functionality**: Click-to-copy passcode with visual feedback
- **Clue Analysis Display**: Shows where current clue leads
- **Navigation Hints**: Cryptic messages guiding progression
- **Follow the Clue Button**: Direct navigation to next room
- **Final Destination Recognition**: Special display for endgame rooms

## ⚙️ Configuration System

### **Centralized Room Configuration**
- **File**: `src/constants/roomConfig.ts`
- **Purpose**: Single source of truth for all room data and mappings
- **Benefits**: Easy maintenance, type safety, extensibility

### **Configuration Structure**
```typescript
// Room interface with comprehensive data
interface Room {
  code: string;        // e.g., "1EC210"
  level: number;       // 1, 2, or 3
  department: string;  // e.g., "EC", "FINAL"
  roomNumber: string;  // e.g., "210", "01"
  name: string;        // Display name
  description: string; // Room description
  clearance: string;   // Security clearance level
  theme?: string;      // Thematic category
  clueImage: string;   // Image path
  status: string;      // Terminal status message
  isFinal?: boolean;   // Whether it's an end room
}

// Room progression mappings
interface RoomMapping {
  from: string;        // Source room code
  to: string;          // Destination room code
  description: string; // Mapping description
  hint: string;        // Clue hint text
}
```

### **Helper Functions**
- `getRoomByCode(code)` - Get room data by passcode
- `getRoomsByLevel(level)` - Get all rooms for a level
- `getNextRoom(currentCode)` - Get next room in progression
- `getRoomMapping(currentCode)` - Get mapping details
- `isValidRoomCode(code)` - Validate room code exists
- `isFinalRoom(code)` - Check if room is final destination

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── styles/
    └── globals.css     # Global styles & Tailwind imports

public/                 # Static assets
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
The theme uses a custom color palette defined in `tailwind.config.js`:
- Primary: Blue tones for interactive elements
- Secondary: Dark grays for backgrounds
- Accent: Red tones for highlights

### Fonts
- **Inter**: Primary sans-serif font
- **JetBrains Mono**: Monospace font for code elements

## 🚀 Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Vercel Configuration
- Optimized build settings
- Security headers
- Image optimization
- Compression enabled

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ and lots of ☕ by Mystery.exe
