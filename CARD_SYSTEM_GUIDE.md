# Card Template System - Quick Start Guide

## Overview

Your invitation system has been refactored into a flexible, config-based template system. No complex UI needed - just edit simple configuration files!

## How It Works

### 3 Simple Files Control Everything:

1. **`src/config/invitation.config.ts`** - Define your invitation structure
2. **`src/config/cards.registry.tsx`** - Register available cards
3. **`src/components/cards/`** - Individual card components

---

## Quick Start: Reorder Existing Cards

### Want to change the layer order? Just edit one array!

**File:** `src/config/invitation.config.ts`

```typescript
export const invitationConfig: InvitationConfig = {
  layers: [
    'event-details',    // Bottom (revealed last)
    'crypto-stonks',    // Middle
    'code-triathlon',   // Top (tear first)
  ],
  // ... global settings
};
```

### Examples:

**Swap order:**
```typescript
layers: [
  'event-details',
  'code-triathlon',   // Now middle
  'crypto-stonks',    // Now top
]
```

**Use only 2 layers:**
```typescript
layers: [
  'event-details',
  'code-triathlon',   // Only one tearable layer
]
```

**Add more layers** (after creating new cards):
```typescript
layers: [
  'event-details',
  'wedding-card',
  'crypto-stonks',
  'code-triathlon',
  'birthday-card',
]
```

---

## Creating a New Card

### Step 1: Create the Card Component

**File:** `src/components/cards/MyCustomCard.tsx`

```typescript
import React from 'react';

export const MyCustomCard: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 p-6 border-4 border-pink-500">
      <h1 className="text-6xl font-bold text-white text-center mt-20">
        MY CUSTOM CARD
      </h1>
      <p className="text-center text-pink-200 mt-4">
        Design whatever you want here!
      </p>

      {/* Add any content, images, animations, etc. */}
    </div>
  );
};
```

### Step 2: Register the Card

**File:** `src/config/cards.registry.tsx`

```typescript
import { MyCustomCard } from '../components/cards/MyCustomCard';

export const CARD_REGISTRY: Record<string, CardDefinition> = {
  // ... existing cards

  'my-custom-card': {
    id: 'my-custom-card',
    name: 'My Custom Card',
    description: 'My awesome custom design',
    component: MyCustomCard,
    isTearable: true,  // Can this layer be torn?
    defaultStyling: {
      rotation: 'rotate-2',  // Optional: rotate the layer
    },
  },
};
```

### Step 3: Add to Your Invitation

**File:** `src/config/invitation.config.ts`

```typescript
layers: [
  'event-details',
  'my-custom-card',   // ← Your new card!
  'crypto-stonks',
  'code-triathlon',
]
```

**Done!** 🎉 Your new card is now part of the invitation.

---

## Customizing Global Settings

**File:** `src/config/invitation.config.ts`

```typescript
globalSettings: {
  backgroundColor: '#050505',           // Overall background color
  showGrid: true,                       // Show matrix-style grid
  gridColor: '#00ff00',                 // Grid color
  showParticles: true,                  // Show floating text particles
  particleTexts: ['0xDEADBEEF', 'HODL'], // Particle content
  showInstructions: true,               // Show "TEAR THE SYSTEM" message
  instructionText: 'TEAR THE SYSTEM',   // Instruction text
}
```

**Examples:**

**Change to blue theme:**
```typescript
backgroundColor: '#001122',
gridColor: '#00aaff',
particleTexts: ['BLOCKCHAIN', 'WEB3', 'DEFI'],
```

**Disable background effects:**
```typescript
showGrid: false,
showParticles: false,
```

**Custom instruction:**
```typescript
instructionText: 'CLICK TO REVEAL',
```

---

## Available Cards (Current)

### 1. **Code & Triathlon Card** (`code-triathlon`)
- Tech-themed code editor
- Triathlon/fitness references
- Sticky notes, watermarks
- Blue color scheme

### 2. **Crypto & Stonks Card** (`crypto-stonks`)
- Stock market theme
- Meme elements (Pepe, HODL)
- Green color scheme
- "To the moon" vibe

### 3. **Event Details Card** (`event-details`)
- RSVP form
- Event information
- Terminal-style design
- Final reveal layer

---

## Card Component Structure

Every card component has full creative freedom. Here's a template:

```typescript
import React from 'react';

export const MyCard: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900" />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        <h1 className="text-4xl font-bold">My Card Title</h1>
        <p>My card content...</p>

        {/* Add anything: images, animations, forms, etc. */}
      </div>
    </div>
  );
};
```

**Tips:**
- Use `className="w-full h-full"` on root div
- Tailwind CSS is available
- Lucide React icons are available
- Can use external images/GIFs
- Can add custom CSS animations
- Can fetch data from APIs

---

## Advanced: Card Props (Optional)

Want to pass data to cards? Extend the system:

```typescript
// In cards.registry.tsx
export interface CardDefinition {
  // ... existing fields
  props?: Record<string, any>;  // Add this
}

// In your card
export const MyCard: React.FC<{name?: string}> = ({name}) => {
  return <div>Hello {name}!</div>;
};

// In registry
'my-card': {
  id: 'my-card',
  component: MyCard,
  props: { name: 'John' },  // Pass props
}
```

---

## File Structure

```
src/
├── App.tsx                       # Main app (uses config)
├── config/
│   ├── invitation.config.ts      # EDIT THIS: Layer order & settings
│   └── cards.registry.tsx        # EDIT THIS: Register new cards
├── components/
│   ├── cards/
│   │   ├── CodeTriathlonCard.tsx
│   │   ├── CryptoStonksCard.tsx
│   │   └── MyCustomCard.tsx      # ADD NEW CARDS HERE
│   ├── TearablePoster.tsx        # Tearing animation wrapper
│   └── EventDetails.tsx          # RSVP form component
```

---

## Common Tasks

### Change Layer Order
✅ Edit `invitation.config.ts` → `layers` array

### Add New Card
✅ Create component in `components/cards/`
✅ Register in `cards.registry.tsx`
✅ Add to `invitation.config.ts` → `layers`

### Customize Colors
✅ Edit `invitation.config.ts` → `globalSettings`

### Remove a Layer
✅ Remove from `invitation.config.ts` → `layers` array

### Make Layer Non-Tearable
✅ In `cards.registry.tsx`, set `isTearable: false`

### Change Card Rotation
✅ In `cards.registry.tsx`, set `defaultStyling.rotation`

---

## Troubleshooting

**Card not showing?**
- Check console for errors
- Verify card ID matches in registry and config
- Ensure component is exported correctly

**Wrong order?**
- Remember: Array is bottom-to-top
- First item = bottom layer (revealed last)
- Last item = top layer (tears first)

**Tearing not working?**
- Check `isTearable: true` in registry
- Ensure layer is not the bottom layer (bottom can't be torn)

---

## Next Steps

1. **Try it:** Change the layer order in `invitation.config.ts`
2. **Create a card:** Follow the "Creating a New Card" guide
3. **Customize:** Experiment with global settings
4. **Share:** Your invitation is now fully customizable!

**Need help?** Check the existing card components for examples.

---

**Happy coding! 🚀**
