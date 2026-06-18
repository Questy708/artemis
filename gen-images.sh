#!/bin/bash
# Generate shared Artemis images with VALID 32-multiple sizes.
set -e
cd /home/z/my-project/public/resources/img

gen() {
  local name="$1" prompt="$2" size="$3"
  if [ -f "$name" ]; then echo "exists: $name"; return; fi
  echo "gen $name ($size)..."
  timeout 120 z-ai image -p "$prompt" -o "$name" -s "$size" 2>&1 | tail -1
}

gen "abstract-crimson.png" "Abstract deep crimson and dark charcoal geometric texture, subtle architectural line patterns, minimalist, elegant, moody dramatic lighting, premium editorial design background" "1344x768"
gen "world-night.png" "Earth at night viewed from space, glowing city lights forming a global network across continents, deep black space background, crimson red accent glow on horizon, cinematic, high detail" "1344x768"
gen "campus-architecture.png" "Modern repurposed university campus building, converted historic warehouse with large arched windows, warm interior lighting, sandstone and brick facade, golden hour, architectural photography, dignified institutional" "1344x768"
gen "students-global.png" "Diverse group of international university students collaborating around a table with laptops and books, bright modern tutorial room, natural light, candid documentary photography, warm tones" "1344x768"
gen "research-lab.png" "Advanced research laboratory interior, scientists working with data visualizations on large screens, clean modern facility, blue and warm lighting, scientific instruments, professional photography" "1344x768"
gen "venice-node.png" "Venice Italy canal architecture at dawn, historic Renaissance palazzo reflected in calm water, soft golden light, muted warm tones, fine art architectural photography, serene and timeless" "1344x768"
gen "graduation.png" "University graduation ceremony, diverse graduates in academic robes throwing caps, golden sunset light, joyful celebratory moment, wide angle, documentary photography" "1344x768"
gen "governance-building.png" "Classical neoclassical institution building facade with grand columns, symmetrical, dignified, soft overcast light, stone and marble, architectural photography, sense of permanence and governance" "1344x768"

echo "=== ALL DONE ==="
ls -la *.png
