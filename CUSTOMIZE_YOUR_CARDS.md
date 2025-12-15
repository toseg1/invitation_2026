# How to Customize Your New Cards

## 🎨 Two New Cards Created!

### 1. **About Me Card** - Personal Photo Gallery
### 2. **Samoa Island Card** - Farewell to France, Hello Paradise

---

## 📸 About Me Card - Add Your Photos!

This card showcases you with a 4-photo grid, your name, bio, and highlights.

### How to Customize

**File to edit:** `src/components/cards/AboutMeCard.tsx`

#### Change Your Photos

Find this section in the component (around line 19):

```typescript
photos = [
  'https://images.unsplash.com/photo-1517849845537-4d257902454a',  // Photo 1
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',  // Photo 2
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',  // Photo 3
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21',  // Photo 4
]
```

**Replace with your own photo URLs:**

```typescript
photos = [
  'https://your-photo-hosting.com/photo1.jpg',
  'https://your-photo-hosting.com/photo2.jpg',
  'https://your-photo-hosting.com/photo3.jpg',
  'https://your-photo-hosting.com/photo4.jpg',
]
```

#### Where to Host Photos?

**Option 1: Use Imgur** (Free, Easy)
1. Go to https://imgur.com/upload
2. Upload your photos
3. Right-click on image → "Copy image address"
4. Paste into the array above

**Option 2: Use Your Own Server**
- Upload to your web server
- Use the full URL (must start with `https://`)

**Option 3: Use Public URLs**
- Google Photos, Dropbox, etc. (make sure they're public)

#### Change Name, Bio, and Highlights

```typescript
name = "Your Name Here",
bio = "Your bio or tagline here!",
highlights = [
  'Software Engineer',    // ← Change these
  'Triathlete',
  'Coffee Enthusiast',
  'World Traveler',
]
```

**Example:**
```typescript
name = "Jean Dupont",
bio = "From code to the ocean - living my best life",
highlights = [
  'Full-Stack Developer',
  'Marathon Runner',
  'Surfer',
  'Soon in Samoa! 🏝️',
]
```

---

## 🏝️ Samoa Island Card - Your Farewell Message

This card explains why you're leaving France for Samoa.

### How to Customize

**File to edit:** `src/components/cards/SamoaIslandCard.tsx`

#### Change the Details

Find this section (around line 26):

```typescript
departureDate = "June 2025",
reason = "New Adventure Awaits",
message = "Join me for one last celebration before I embark on my Pacific journey!",
backgroundImage = "https://images.unsplash.com/photo-1559827260-dc66d52bef19...",
```

**Customize it:**

```typescript
departureDate = "July 15, 2025",  // Your actual departure date
reason = "Starting My New Life in Paradise",  // Your reason
message = "I'm moving to Samoa to work remotely and live near the beach! Let's celebrate one last time in France before I go!",
backgroundImage = "https://your-samoa-photo.jpg",  // Optional: Use your own Samoa photo
```

#### Want to Use Your Own Samoa Photo?

1. Find a beautiful Samoa beach photo
2. Upload to Imgur or your server
3. Replace the `backgroundImage` URL

**Recommended Samoa photo sites:**
- Unsplash: https://unsplash.com/s/photos/samoa
- Pexels: https://www.pexels.com/search/samoa/

---

## 🔧 Using the New Cards in Your Invitation

### Option 1: Simple Example (5 layers)

**File to edit:** `src/config/invitation.config.ts`

```typescript
layers: [
  'event-details',    // Bottom: Final RSVP
  'samoa-island',     // Explain why you're leaving
  'about-me',         // Show who you are
  'crypto-stonks',    // Fun layer
  'code-triathlon',   // Top layer (tear first)
]
```

### Option 2: Story-Focused (3 layers)

```typescript
layers: [
  'event-details',    // Bottom: Final RSVP
  'samoa-island',     // Middle: The big announcement
  'about-me',         // Top: Start with you
]
```

### Option 3: Full Experience (6+ layers)

```typescript
layers: [
  'event-details',    // Bottom
  'samoa-island',     // Samoa announcement
  'about-me',         // Who you are
  'crypto-stonks',    // Fun interlude
  'code-triathlon',   // Another fun layer
  'about-me',         // Can use same card multiple times!
]
```

---

## 🎨 Advanced Customization

### Change Card Colors

#### About Me Card - Change Color Scheme

Edit `AboutMeCard.tsx`, find line 42:

```typescript
<div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 ...">
```

**Change to different colors:**
```typescript
// Blue theme
from-blue-900 via-cyan-900 to-teal-900

// Green theme
from-green-900 via-emerald-900 to-lime-900

// Orange theme
from-orange-900 via-red-900 to-pink-900
```

#### Samoa Island Card - Change Overlay

Edit `SamoaIslandCard.tsx`, find line 48:

```typescript
<div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-cyan-900/60 to-teal-900/70" />
```

**Make it darker or lighter:**
```typescript
// Darker (more visible text)
from-blue-900/90 via-cyan-900/80 to-teal-900/90

// Lighter (more photo visible)
from-blue-900/50 via-cyan-900/40 to-teal-900/50
```

---

## 📝 Quick Checklist

Before your party, make sure you've customized:

### About Me Card
- [ ] Add your 4 photos
- [ ] Change your name
- [ ] Update your bio
- [ ] Edit your highlights

### Samoa Island Card
- [ ] Set your departure date
- [ ] Write your reason for leaving
- [ ] Add a personal message
- [ ] (Optional) Use your own Samoa photo

### Invitation Config
- [ ] Add cards to your `layers` array
- [ ] Choose the right order (what story do you want to tell?)
- [ ] Test the tearing effect works

---

## 🔥 Pro Tips

### 1. Tell a Story
Arrange layers to create a narrative:
1. Start with who you are (About Me)
2. Reveal the big news (Samoa Island)
3. End with the invitation (Event Details)

### 2. Use High-Quality Photos
- Use photos at least 1000px wide
- Compress them if they're too large (use tinypng.com)
- Make sure they're publicly accessible URLs

### 3. Test Your Photos
After adding URLs:
1. Save the file
2. Check your browser
3. Open browser console (F12) to see any image loading errors

### 4. Backup Your Originals
Before editing, copy the original files:
```bash
cp src/components/cards/AboutMeCard.tsx src/components/cards/AboutMeCard.tsx.backup
cp src/components/cards/SamoaIslandCard.tsx src/components/cards/SamoaIslandCard.tsx.backup
```

---

## 🆘 Troubleshooting

**Photos not showing?**
- Check URL is correct (copy-paste into browser)
- Make sure URL starts with `https://`
- Check browser console for errors

**Card not appearing?**
- Make sure card ID matches in config: `'about-me'` or `'samoa-island'`
- Check you saved all files
- Refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)

**Wrong colors?**
- Remember: Tailwind classes like `bg-blue-900` need exact syntax
- Don't add spaces in class names
- Use hyphen, not underscore: `bg-blue-900` not `bg_blue_900`

---

## 📖 Example: Complete Customization

Here's a full example for your Samoa farewell party:

### 1. Edit About Me Card

```typescript
export const AboutMeCard: React.FC<AboutMeCardProps> = ({
  name = "Jean Dupont",
  bio = "Software engineer leaving Paris for Pacific paradise",
  photos = [
    'https://i.imgur.com/your-photo-1.jpg',  // You in Paris
    'https://i.imgur.com/your-photo-2.jpg',  // You coding
    'https://i.imgur.com/your-photo-3.jpg',  // You at beach
    'https://i.imgur.com/your-photo-4.jpg',  // You with friends
  ],
  highlights = [
    'React Developer',
    'Digital Nomad',
    'Surf Enthusiast',
    'Off to Samoa! 🌊',
  ],
}) => {
```

### 2. Edit Samoa Island Card

```typescript
export const SamoaIslandCard: React.FC<SamoaIslandCardProps> = ({
  departureDate = "August 1, 2025",
  reason = "Remote Work + Island Life",
  message = "After 5 years in Paris, I'm trading the Eiffel Tower for palm trees! Let's party one last time before my Pacific adventure begins!",
  backgroundImage = "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
}) => {
```

### 3. Set Layer Order

```typescript
// invitation.config.ts
layers: [
  'event-details',    // RSVP at the end
  'samoa-island',     // Big announcement
  'about-me',         // Who I am
  'code-triathlon',   // Fun coding layer
]
```

**Perfect! 🎉**

---

Need more help? Check the main [CARD_SYSTEM_GUIDE.md](CARD_SYSTEM_GUIDE.md) for general card creation tips!
