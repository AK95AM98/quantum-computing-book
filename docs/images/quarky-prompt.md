# Quarky — Image Generation Prompt

Use this prompt with DALL-E 3, Midjourney, or Adobe Firefly to generate a static PNG of Quarky.

---

## Recommended Prompt

```
A cute, friendly cartoon mascot character named "Quarky" who is a quantum qubit.
Quarky is a small glowing spherical creature with large expressive eyes and a cheerful smile.
The body glows with a soft purple-to-blue gradient, representing quantum superposition.
Tiny orbiting electrons circle around the body.
The character floats slightly above the ground with a soft quantum glow underneath.
Background: transparent (PNG).
Style: flat vector illustration, clean lines, suitable for a university textbook.
No text, no labels, no white background, no black background, no checkered background.
PNG with fully transparent background. All body pixels fully opaque.
```

---

## Variant Prompts

### |0⟩ State (Blue)
```
Quarky in the |0⟩ state: same spherical qubit character but glowing solid sky blue (#50B4FF),
calm expression, transparent PNG background.
```

### |1⟩ State (Pink)
```
Quarky in the |1⟩ state: same spherical qubit character glowing hot pink (#FF50B4),
excited expression with open mouth, transparent PNG background.
```

### Entangled Pair
```
Two Quarky characters side by side, both glowing gold (#FFC850), connected by a
shimmering golden quantum thread between them. "Spooky action at a distance."
Transparent PNG background.
```

---

## Post-Processing (Python)

After generating, run this to fix transparency and ensure pure white body pixels:

```python
from PIL import Image
import numpy as np

img = Image.open("quarky-raw.png").convert("RGBA")
data = np.array(img)

r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Remove near-white background pixels
near_white_bg = (r > 230) & (g > 230) & (b > 230) & (a > 128)
data[near_white_bg, 3] = 0

result = Image.fromarray(data)
result.save("quarky.png")
print("Saved quarky.png with transparent background")
```

---

## Placement in MkDocs

Place the final PNG at `docs/images/quarky.png` and use in chapters:

```markdown
<img src="../../images/quarky.png" width="80" style="float:left; margin-right:12px; margin-bottom:4px;">
```

Or as the site logo in `mkdocs.yml`:

```yaml
theme:
  logo: images/quarky.png
```
