# Clue Images Directory

This directory contains the clue images for each room in the Mystery.exe system.

## File Naming Convention

Clue images should be named using the passcode format:

**Level 1 Rooms:**
- `1EC210.jpg` - Quantum Computing Lab
- `1EC211.jpg` - Neural Network Hub
- `1EC205.jpg` - Cybersecurity Operations
- `1EC204.jpg` - Data Analytics Center

**Level 2 Rooms:**
- `2EC212.jpg` - Quantum Entanglement Lab
- `2EC213.jpg` - AI Consciousness Research
- `2EC203.jpg` - Temporal Computing Lab
- `2EC202.jpg` - Holographic Data Storage

**Level 3 Theme Rooms (Final Destinations):**
- `3FINAL01.jpg` - The Quantum Nexus
- `3FINAL02.jpg` - The Singularity Chamber
- `3FINAL03.jpg` - The Time Vault
- `3FINAL04.jpg` - The Memory Palace

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Resolution**: Minimum 800x600px, recommended 1200x800px
- **Aspect Ratio**: 16:10 or similar wide format for best display
- **File Size**: Keep under 2MB for optimal loading
- **Optimization**: Images are automatically optimized by Next.js Image component

## Dynamic Loading Features

The room page includes:

- **Automatic Path Construction**: Images are loaded dynamically based on passcode
- **Loading Animation**: Spinner animation while image loads
- **Error Handling**: Fallback UI for missing images
- **Performance Optimization**: Next.js Image component with responsive sizing
- **Status Indicators**: Real-time loading and error status display

## Adding New Clues

1. Place the image file in this directory
2. Name it according to the passcode (e.g., `1EC210.jpg`)
3. The system will automatically display it when users access that room
4. Images are optimized automatically for web delivery

## Example Structure

```
public/clues/
├── 1EC210.jpg    # Quantum Computing Lab
├── 1EC211.jpg    # Neural Network Hub
├── 1EC205.jpg    # Cybersecurity Operations
├── 1EC204.jpg    # Data Analytics Center
├── 2EC212.jpg    # Quantum Entanglement Lab
├── 2EC213.jpg    # AI Consciousness Research
├── 2EC203.jpg    # Temporal Computing Lab
├── 2EC202.jpg    # Holographic Data Storage
├── 3FINAL01.jpg  # The Quantum Nexus
├── 3FINAL02.jpg  # The Singularity Chamber
├── 3FINAL03.jpg  # The Time Vault
└── 3FINAL04.jpg  # The Memory Palace
```

## Technical Implementation

- **Component**: Next.js Image component with fill layout
- **Loading**: Custom loading state with spinner
- **Error**: Graceful fallback with error message
- **Optimization**: Automatic WebP conversion and responsive sizing
- **Priority**: High priority loading for above-the-fold images

## Testing the Image System

To test the image loading functionality:

1. **Add test images**: Place any image file in this directory and name it according to a valid passcode (e.g., `1EC210.jpg`)
2. **Access room**: Navigate to `/room?passcode=1EC210` in your browser
3. **Observe loading**: Watch the loading animation and status indicators
4. **Test error handling**: Try accessing a room without a corresponding image file

## Development Notes

- Images are loaded from `/clues/{passcode}.jpg`
- The system expects JPG format but will work with PNG/WebP if configured
- Missing images show a fallback UI instead of broken image icons
- All images are automatically optimized by Next.js for web delivery
