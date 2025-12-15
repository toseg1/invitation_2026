# Scalable Card Template System - Implementation Plan

## Executive Summary

Transform the current hardcoded 3-layer tearable invitation into a **flexible, template-based system** where users can:
- Create custom card designs for any number of layers (1-10+)
- Select pre-built templates or design from scratch
- Customize content, styling, and theming per layer
- Save/load invitation configurations
- Manage templates via admin interface

---

## Current Architecture Analysis

### 1. **Current Layer Structure**

**Hardcoded Layers in App.tsx:**
```typescript
Layer 2 (Bottom): EventDetails - Final reveal with RSVP form
Layer 1 (Middle): Stonks/Crypto themed - Tearable
Layer 0 (Top): Code/Triathlon themed - Tearable
```

**Key Components:**
- `TearablePoster`: Wrapper for tearable layers with animation
- Layer content: Hardcoded JSX in App.tsx
- State management: Simple array of removed layer indices
- Z-index based stacking: z-10 (base), z-20 (middle), z-30 (top)

### 2. **Current Limitations**

❌ **Hard to scale:** Each layer is hardcoded JSX
❌ **No reusability:** Can't swap themes easily
❌ **Fixed count:** Always 3 layers
❌ **No templates:** Must edit code to change designs
❌ **No persistence:** Can't save custom configurations

---

## Proposed Solution: Template-Based Architecture

### 🎯 Core Concept

**Template System = Configurable Layer Definition + Dynamic Rendering Engine**

```typescript
Template {
  id: string
  name: string
  layers: LayerConfig[]
  metadata: TemplateMetadata
}

LayerConfig {
  id: string
  type: string  // 'code', 'crypto', 'event', 'custom'
  theme: ThemeConfig
  content: ContentConfig
  styling: StylingConfig
}
```

---

## Detailed Implementation Plan

### **Phase 1: Data Model & Type System** (Week 1)

#### 1.1 Create Type Definitions

**File:** `src/types/template.types.ts`

```typescript
// Template metadata
export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  tags: string[];
  isPublic: boolean;
}

// Layer configuration
export interface LayerConfig {
  id: string;
  order: number;  // 0 = bottom, 1 = middle, 2 = top, etc.
  type: LayerType;
  theme: ThemeConfig;
  content: ContentConfig;
  styling: StylingConfig;
  animation: AnimationConfig;
  isTearable: boolean;
}

export type LayerType =
  | 'code'
  | 'crypto'
  | 'event'
  | 'custom'
  | 'image'
  | 'video';

// Theme configuration
export interface ThemeConfig {
  colorScheme: ColorScheme;
  background: BackgroundConfig;
  border: BorderConfig;
  font: FontConfig;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'image' | 'pattern';
  value: string | string[];  // color, gradient stops, or image URL
  opacity?: number;
  texture?: string;  // URL to texture overlay
  textureOpacity?: number;
}

export interface BorderConfig {
  width: number;
  color: string;
  style: 'solid' | 'dashed' | 'dotted' | 'double';
  radius?: number;
}

export interface FontConfig {
  family: string;
  size: {
    base: string;
    heading: string;
    subheading: string;
  };
  weight: {
    normal: number;
    bold: number;
  };
}

// Content configuration (varies by layer type)
export interface ContentConfig {
  type: LayerType;
  data: CodeLayerContent | CryptoLayerContent | EventLayerContent | CustomLayerContent;
}

export interface CodeLayerContent {
  title: string;
  codeSnippet: string;
  language: string;
  filename: string;
  watermarkText?: string;
  stickyNotes?: StickyNote[];
}

export interface StickyNote {
  text: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  rotation: number;
  color: string;
}

export interface CryptoLayerContent {
  mainHeading: string;
  chartType: 'bar' | 'line' | 'candlestick';
  memeImages?: MemeImage[];
  statsDisplay?: StatDisplay[];
  ctaButton?: CTAButton;
}

export interface MemeImage {
  url: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  rotation: number;
  scale: number;
}

export interface StatDisplay {
  label: string;
  value: string;
  trend?: 'up' | 'down';
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

export interface CTAButton {
  text: string;
  color: string;
  icon?: string;
}

export interface EventLayerContent {
  showRSVP: boolean;
  eventInfo: EventInfo;
  terminalStyle?: TerminalStyle;
}

export interface EventInfo {
  title: string;
  subtitle: string;
  timestamp: string;
  location: string;
  details: EventDetail[];
}

export interface EventDetail {
  icon: string;
  label: string;
  value: string;
  description?: string;
}

export interface TerminalStyle {
  topBarColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export interface CustomLayerContent {
  html?: string;
  markdown?: string;
  components?: CustomComponent[];
}

export interface CustomComponent {
  type: string;
  props: Record<string, any>;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

// Styling configuration
export interface StylingConfig {
  transform: {
    rotate: string;
    scale?: number;
  };
  spacing: {
    padding: string;
    margin?: string;
  };
  effects: {
    shadow?: string;
    blur?: number;
    brightness?: number;
  };
}

// Animation configuration
export interface AnimationConfig {
  tearDirection: 'left-right' | 'top-bottom' | 'center-out';
  tearSpeed: number;  // milliseconds
  tearEasing: string;  // CSS easing function
}

// Complete template
export interface InvitationTemplate {
  metadata: TemplateMetadata;
  layers: LayerConfig[];
  globalSettings: GlobalSettings;
}

export interface GlobalSettings {
  containerSize: {
    width: string;
    height: string;
    aspectRatio: string;
  };
  backgroundEffects: {
    grid: boolean;
    particles: boolean;
    particleColor: string;
  };
  instructions: {
    show: boolean;
    text: string;
    style: 'minimal' | 'prominent' | 'animated';
  };
}
```

#### 1.2 Database Schema Extensions

**Update:** `api.py` - Add new tables

```sql
CREATE TABLE templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    config JSON NOT NULL,  -- Entire template as JSON
    thumbnail TEXT,
    is_public BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE template_tags (
    template_id TEXT,
    tag TEXT,
    FOREIGN KEY (template_id) REFERENCES templates(id)
);

CREATE INDEX idx_template_public ON templates(is_public);
CREATE INDEX idx_template_tags ON template_tags(tag);
```

---

### **Phase 2: Template Engine** (Week 2)

#### 2.1 Create Layer Renderer System

**File:** `src/components/templates/LayerRenderer.tsx`

```typescript
import React from 'react';
import { LayerConfig } from '@/types/template.types';
import { CodeLayer } from './layers/CodeLayer';
import { CryptoLayer } from './layers/CryptoLayer';
import { EventLayer } from './layers/EventLayer';
import { CustomLayer } from './layers/CustomLayer';

interface LayerRendererProps {
  config: LayerConfig;
}

export const LayerRenderer: React.FC<LayerRendererProps> = ({ config }) => {
  const { type, theme, content, styling } = config;

  // Apply common styling wrapper
  const wrapperStyle = {
    transform: `rotate(${styling.transform.rotate}) scale(${styling.transform.scale || 1})`,
    padding: styling.spacing.padding,
    boxShadow: styling.effects.shadow,
    filter: `blur(${styling.effects.blur || 0}px) brightness(${styling.effects.brightness || 1})`,
  };

  // Render appropriate layer component based on type
  const renderLayer = () => {
    switch (type) {
      case 'code':
        return <CodeLayer config={config} />;
      case 'crypto':
        return <CryptoLayer config={config} />;
      case 'event':
        return <EventLayer config={config} />;
      case 'custom':
        return <CustomLayer config={config} />;
      default:
        return <div>Unknown layer type: {type}</div>;
    }
  };

  return (
    <div style={wrapperStyle} className="w-full h-full">
      {renderLayer()}
    </div>
  );
};
```

#### 2.2 Create Individual Layer Components

**File Structure:**
```
src/components/templates/layers/
├── CodeLayer.tsx
├── CryptoLayer.tsx
├── EventLayer.tsx
├── CustomLayer.tsx
├── ImageLayer.tsx
└── VideoLayer.tsx
```

**Example:** `src/components/templates/layers/CodeLayer.tsx`

```typescript
import React from 'react';
import { LayerConfig, CodeLayerContent } from '@/types/template.types';

interface CodeLayerProps {
  config: LayerConfig;
}

export const CodeLayer: React.FC<CodeLayerProps> = ({ config }) => {
  const content = config.content.data as CodeLayerContent;
  const { theme } = config;

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: theme.background.value as string,
        borderColor: theme.border.color,
        borderWidth: theme.border.width,
        borderStyle: theme.border.style,
      }}
    >
      {/* Background texture */}
      {theme.background.texture && (
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url(${theme.background.texture})`,
            opacity: theme.background.textureOpacity || 0.3,
            backgroundSize: 'cover',
          }}
        />
      )}

      <div className="flex flex-col h-full p-6 relative z-10">
        {/* Terminal header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2"
          style={{ borderColor: theme.colorScheme.secondary }}>
          <div style={{ color: theme.colorScheme.primary, fontSize: theme.font.size.base }}>
            {content.filename}
          </div>
          <div style={{ color: theme.colorScheme.text, fontSize: theme.font.size.base }}>
            -- INSERT --
          </div>
        </div>

        {/* Code content */}
        <div
          className="font-mono space-y-2"
          style={{
            color: theme.colorScheme.text,
            fontSize: theme.font.size.base,
          }}
        >
          <pre>{content.codeSnippet}</pre>
        </div>

        {/* Sticky notes */}
        {content.stickyNotes?.map((note, idx) => (
          <div
            key={idx}
            className="absolute p-4 shadow-lg"
            style={{
              ...note.position,
              transform: `rotate(${note.rotation}deg)`,
              backgroundColor: note.color,
            }}
          >
            {note.text}
          </div>
        ))}

        {/* Watermark */}
        {content.watermarkText && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
            style={{ color: theme.colorScheme.accent }}
          >
            <h2 className="text-7xl font-black transform -rotate-12">
              {content.watermarkText}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
```

#### 2.3 Update Main App Component

**File:** `src/App.tsx` (Refactored)

```typescript
import React, { useState, useCallback, useEffect } from 'react';
import { TearablePoster } from './components/TearablePoster';
import { LayerRenderer } from './components/templates/LayerRenderer';
import { InvitationTemplate } from './types/template.types';
import { useTemplate } from './hooks/useTemplate';

function App() {
  const [removedLayers, setRemovedLayers] = useState<number[]>([]);

  // Load template (from API, localStorage, or default)
  const { template, loading, error } = useTemplate();

  const handleTear = useCallback((layerIndex: number) => {
    setRemovedLayers(prev => {
      if (prev.includes(layerIndex)) return prev;
      return [...prev, layerIndex];
    });
  }, []);

  if (loading) return <div>Loading template...</div>;
  if (error) return <div>Error loading template: {error}</div>;
  if (!template) return <div>No template found</div>;

  // Sort layers by order (highest = top)
  const sortedLayers = [...template.layers].sort((a, b) => b.order - a.order);

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative bg-[#050505]">
      {/* Background effects from global settings */}
      {template.globalSettings.backgroundEffects.grid && (
        <div className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${template.globalSettings.backgroundEffects.particleColor} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      )}

      {/* Main container */}
      <div
        className="relative z-10 m-4"
        style={{
          width: template.globalSettings.containerSize.width,
          height: template.globalSettings.containerSize.height,
          aspectRatio: template.globalSettings.containerSize.aspectRatio,
        }}
      >
        {sortedLayers.map((layer, idx) => {
          const isRemoved = removedLayers.includes(layer.order);
          const zIndex = 10 + (layer.order * 10);  // Bottom=10, next=20, top=30, etc.

          if (layer.isTearable && !isRemoved) {
            return (
              <div
                key={layer.id}
                className={`absolute inset-0 z-${zIndex}`}
                style={{ zIndex }}
              >
                <TearablePoster
                  onTear={() => handleTear(layer.order)}
                  animation={layer.animation}
                >
                  <LayerRenderer config={layer} />
                </TearablePoster>
              </div>
            );
          }

          // Non-tearable layer (base layer)
          if (!layer.isTearable && !isRemoved) {
            return (
              <div
                key={layer.id}
                className="absolute inset-0"
                style={{ zIndex }}
              >
                <LayerRenderer config={layer} />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Instructions */}
      {template.globalSettings.instructions.show && removedLayers.length < sortedLayers.length && (
        <div className="absolute bottom-8 left-0 right-0 text-center z-50 pointer-events-none">
          <div className="inline-flex items-center gap-2 bg-black text-[#00ff00] px-6 py-3 border-2 border-[#00ff00]">
            <span>{template.globalSettings.instructions.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### **Phase 3: Template Builder UI** (Week 3-4)

#### 3.1 Template Builder Page

**File:** `src/pages/TemplateBuilder.tsx`

**Features:**
- **Layer Manager:** Add/remove/reorder layers
- **Layer Editor:** Configure each layer's content, theme, styling
- **Live Preview:** Real-time preview of the invitation
- **Template Selector:** Choose from pre-built templates
- **Save/Export:** Save to database or export as JSON

**UI Layout:**
```
┌─────────────────────────────────────────────────┐
│  Template Builder                     [Save][Export]│
├──────────┬──────────────────────┬────────────────┤
│          │                      │                │
│  Layer   │   Configuration      │   Live Preview │
│  List    │   Panel              │                │
│          │                      │                │
│  □ Top   │  Type: [Code      ▼] │   ┌──────────┐│
│  □ Mid   │  Theme:             │   │          ││
│  ☑ Bot   │   Primary: [#00ff00] │   │ Preview  ││
│          │   ...                │   │  Here    ││
│  + Add   │                      │   │          ││
│  Layer   │  Content:            │   └──────────┘│
│          │   [Editor...]        │                │
│          │                      │                │
└──────────┴──────────────────────┴────────────────┘
```

#### 3.2 Component Structure

```
src/pages/TemplateBuilder/
├── index.tsx                 # Main builder page
├── components/
│   ├── LayerList.tsx         # Sidebar layer manager
│   ├── ConfigPanel.tsx       # Main configuration area
│   ├── LivePreview.tsx       # Preview pane
│   ├── ThemeEditor.tsx       # Color/font/background editor
│   ├── ContentEditor.tsx     # Content-specific editors
│   │   ├── CodeEditor.tsx
│   │   ├── CryptoEditor.tsx
│   │   ├── EventEditor.tsx
│   │   └── CustomEditor.tsx
│   ├── StylingEditor.tsx     # Transform/spacing/effects
│   └── TemplateSelector.tsx  # Pre-built template gallery
└── hooks/
    ├── useTemplateBuilder.ts # Builder state management
    └── usePreview.ts         # Live preview logic
```

---

### **Phase 4: Pre-built Templates** (Week 5)

#### 4.1 Default Template Library

Create 10+ ready-to-use templates:

1. **Tech Stack** (Current design - Code/Crypto/Event)
2. **Wedding Invitation** (Elegant/Romantic)
3. **Birthday Party** (Fun/Colorful)
4. **Corporate Event** (Professional/Minimal)
5. **Product Launch** (Modern/Bold)
6. **Graduation** (Academic/Celebratory)
7. **Holiday Party** (Festive/Seasonal)
8. **Networking Event** (Business/Clean)
9. **Concert/Festival** (Vibrant/Energetic)
10. **Charity Gala** (Sophisticated/Impactful)

**File:** `src/templates/prebuilt/`

```typescript
// Example: tech-stack.template.ts
export const techStackTemplate: InvitationTemplate = {
  metadata: {
    id: 'tech-stack-v1',
    name: 'Tech Stack',
    description: 'Perfect for tech meetups, hackathons, and developer events',
    author: 'BASH Team',
    tags: ['tech', 'modern', 'developer'],
    isPublic: true,
    // ... timestamps
  },
  layers: [
    {
      id: 'layer-0',
      order: 2,  // Top
      type: 'code',
      isTearable: true,
      theme: { /* ... */ },
      content: { /* ... */ },
      styling: { /* ... */ },
      animation: { /* ... */ },
    },
    // ... more layers
  ],
  globalSettings: { /* ... */ },
};
```

---

### **Phase 5: Backend API Extensions** (Week 6)

#### 5.1 New API Endpoints

**File:** `api.py` - Add template management

```python
@app.route('/api/templates', methods=['GET'])
def get_templates():
    """Get all public templates or user's templates"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM templates WHERE is_public = 1 ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()

    templates = [dict(row) for row in rows]
    return jsonify(templates)

@app.route('/api/templates/<template_id>', methods=['GET'])
def get_template(template_id):
    """Get a specific template by ID"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM templates WHERE id = ?', (template_id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return jsonify(dict(row))
    return jsonify({'error': 'Template not found'}), 404

@app.route('/api/templates', methods=['POST'])
def create_template():
    """Create a new template"""
    data = request.json
    template_id = str(uuid.uuid4())

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO templates (id, name, description, author, config, is_public)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        template_id,
        data['name'],
        data.get('description', ''),
        data.get('author', 'Anonymous'),
        json.dumps(data['config']),
        data.get('isPublic', False)
    ))

    # Add tags
    if 'tags' in data:
        for tag in data['tags']:
            cursor.execute('INSERT INTO template_tags (template_id, tag) VALUES (?, ?)',
                         (template_id, tag))

    conn.commit()
    conn.close()

    return jsonify({'success': True, 'id': template_id})

@app.route('/api/templates/<template_id>', methods=['PUT'])
def update_template(template_id):
    """Update an existing template"""
    data = request.json

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE templates
        SET name = ?, description = ?, config = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    ''', (
        data['name'],
        data.get('description', ''),
        json.dumps(data['config']),
        template_id
    ))
    conn.commit()
    conn.close()

    return jsonify({'success': True})

@app.route('/api/templates/<template_id>', methods=['DELETE'])
def delete_template(template_id):
    """Delete a template"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM templates WHERE id = ?', (template_id,))
    cursor.execute('DELETE FROM template_tags WHERE template_id = ?', (template_id,))
    conn.commit()
    conn.close()

    return jsonify({'success': True})
```

---

### **Phase 6: Admin Dashboard Extensions** (Week 7)

#### 6.1 Template Management UI

**File:** `public/admin-templates.html`

Add new admin page for managing templates:

**Features:**
- View all templates (public + private)
- Edit template metadata
- Duplicate templates
- Delete templates
- View template usage statistics
- Moderate public submissions

---

## Migration Strategy

### Step 1: Backward Compatibility

Keep current hardcoded implementation while building new system:

```typescript
// src/App.tsx - hybrid approach
function App() {
  const [useLegacy, setUseLegacy] = useState(true);

  if (useLegacy) {
    return <LegacyApp />;  // Current implementation
  }

  return <TemplateBasedApp />;  // New system
}
```

### Step 2: Create Migration Tool

Convert current design to template format:

```typescript
// src/utils/migration/convertLegacyToTemplate.ts
export function convertLegacyToTemplate(): InvitationTemplate {
  return {
    metadata: {
      id: 'legacy-default',
      name: 'Original Design',
      // ...
    },
    layers: [
      // Extract Layer 0 config from current JSX
      // Extract Layer 1 config from current JSX
      // Extract Layer 2 config from current JSX
    ],
    globalSettings: { /* ... */ },
  };
}
```

### Step 3: Gradual Rollout

1. Week 1-2: Build data models + template engine
2. Week 3-4: Build template builder UI (beta)
3. Week 5: Create 10 pre-built templates
4. Week 6: Backend API ready
5. Week 7: Admin dashboard ready
6. Week 8: Testing + migration
7. Week 9: Launch new system, deprecate legacy

---

## Technical Considerations

### Performance

- **Lazy load layer components:** Only render visible layers
- **Memoization:** Cache rendered layers to prevent re-renders
- **Image optimization:** Compress background textures
- **JSON size:** Limit template config to < 100KB

### Security

- **Sanitize custom HTML:** Use DOMPurify for custom layer content
- **Validate templates:** Schema validation on save
- **Rate limiting:** Prevent spam template creation
- **Access control:** Only allow template edit by creator

### Scalability

- **Template versioning:** Support template v1, v2, etc.
- **Asset management:** Store images in CDN, not in config JSON
- **Template marketplace:** Future: Allow users to sell templates
- **Multi-tenancy:** Future: Per-organization template libraries

---

## Development Phases Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| 1 | 1 week | Type system + Database schema |
| 2 | 1 week | Template engine + Layer renderers |
| 3 | 2 weeks | Template builder UI |
| 4 | 1 week | 10 pre-built templates |
| 5 | 1 week | Backend API endpoints |
| 6 | 1 week | Admin dashboard extensions |
| 7 | 1 week | Testing + migration |
| **Total** | **8 weeks** | **Fully scalable template system** |

---

## Success Metrics

✅ **User can create custom invitation in < 10 minutes**
✅ **Template saves to database successfully**
✅ **Live preview updates in real-time**
✅ **Pre-built templates render correctly**
✅ **Migration from legacy works without data loss**
✅ **Admin can manage all templates**
✅ **Performance: < 2s page load, < 100ms layer render**

---

## Next Steps

1. **Review and approve this plan**
2. **Set up development environment**
3. **Create project board with Phase 1 tasks**
4. **Begin Phase 1: Type definitions**
5. **Weekly progress reviews**

---

## Questions to Address

1. **Layer limit:** What's the maximum number of layers? (Recommend: 10)
2. **Custom code execution:** Allow JavaScript in custom layers? (Security risk)
3. **Asset storage:** Where to store images? (S3, Cloudinary, local?)
4. **Template sharing:** Public marketplace or private only?
5. **Pricing model:** Free tier vs. premium templates?

---

**End of Implementation Plan**
