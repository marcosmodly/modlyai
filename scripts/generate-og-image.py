from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
FONTS = "C:/Windows/Fonts"

GRAY_900 = (17, 24, 39)  # Tailwind gray-900, matches Navbar's "Modly"
BRAND_BLUE = (59, 130, 246)  # #3B82F6, matches Navbar's "AI"

photo = Image.open("public/images/living-room-hero.png").convert("RGB")
pw, ph = photo.size
target_ratio = W / H
src_ratio = pw / ph
if src_ratio > target_ratio:
    new_w = int(ph * target_ratio)
    x0 = (pw - new_w) // 2
    photo = photo.crop((x0, 0, x0 + new_w, ph))
else:
    new_h = int(pw / target_ratio)
    y0 = (ph - new_h) // 2
    photo = photo.crop((0, y0, pw, y0 + new_h))
photo = photo.resize((W, H), Image.LANCZOS)

canvas = Image.new("RGB", (W, H))
canvas.paste(photo, (0, 0))

# Bottom + top scrim so white text stays legible over the photo.
scrim = Image.new("L", (1, H), 0)
for y in range(H):
    t = y / H
    if t < 0.45:
        a = int(50 * (1 - t / 0.45))
    else:
        tt = (t - 0.45) / 0.55
        a = int(20 + (215 * tt))
    scrim.putpixel((0, y), a)
scrim = scrim.resize((W, H))
dark = Image.new("RGB", (W, H), (23, 20, 17))
canvas = Image.composite(dark, canvas, scrim)
canvas = canvas.convert("RGBA")

draw = ImageDraw.Draw(canvas)

# Badge: real logo mark + "ModlyAI" wordmark (Navbar's colors), on a white
# pill so the near-black "Modly" stays legible over the photo.
logo = Image.open("public/logo-mark.png").convert("RGBA")
logo_h = 40
logo_w = int(logo.width * (logo_h / logo.height))
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)

word_font = ImageFont.truetype(f"{FONTS}/arialbd.ttf", 28)
modly_box = draw.textbbox((0, 0), "Modly", font=word_font)
ai_box = draw.textbbox((0, 0), "AI", font=word_font)
modly_w = modly_box[2] - modly_box[0]
ai_w = ai_box[2] - ai_box[0]
text_h = max(modly_box[3] - modly_box[1], ai_box[3] - ai_box[1])

pad_x, pad_y, gap = 18, 14, 14
badge_x, badge_y = 56, 44
badge_w = pad_x * 2 + logo_w + gap + modly_w + ai_w
badge_h = pad_y * 2 + max(logo_h, text_h)

draw.rounded_rectangle(
    [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
    radius=badge_h // 2,
    fill=(255, 255, 255, 245),
)

logo_y = badge_y + (badge_h - logo_h) // 2
canvas.paste(logo, (badge_x + pad_x, logo_y), logo)

text_y = badge_y + badge_h // 2 - text_h // 2 - modly_box[1]
text_x = badge_x + pad_x + logo_w + gap
draw.text((text_x, text_y), "Modly", font=word_font, fill=GRAY_900)
draw.text((text_x + modly_w, text_y), "AI", font=word_font, fill=BRAND_BLUE)

# Pill: "AI room matching", top-right.
pill_font = ImageFont.truetype(f"{FONTS}/arialbd.ttf", 16)
pill_text = "AI ROOM MATCHING"
pbox = draw.textbbox((0, 0), pill_text, font=pill_font)
pw_, ph_ = pbox[2] - pbox[0], pbox[3] - pbox[1]
ppad_x, ppad_y = 20, 12
pill_w, pill_h = pw_ + ppad_x * 2, ph_ + ppad_y * 2
pill_x1, pill_y1 = W - 56 - pill_w, 48
draw.rounded_rectangle([pill_x1, pill_y1, pill_x1 + pill_w, pill_y1 + pill_h], radius=pill_h // 2,
                        outline=(255, 255, 255), width=2)
draw.text((pill_x1 + ppad_x, pill_y1 + ppad_y - pbox[1]), pill_text, font=pill_font, fill=(255, 255, 255))

# Headline + subhead, bottom-left.
headline_font = ImageFont.truetype(f"{FONTS}/georgiab.ttf", 50)
sub_font = ImageFont.truetype(f"{FONTS}/arial.ttf", 21)

headline = "See your furniture in their room"
sub_lines = [
    "Shoppers upload a room photo, place your products in it, and request a quote.",
    "All without leaving your product page.",
]

margin = 56
sub_h = len(sub_lines) * 30
bottom_y = H - 46 - sub_h - 18
hbox = draw.textbbox((0, 0), headline, font=headline_font)
draw.text((margin, bottom_y - (hbox[3] - hbox[1]) - hbox[1]), headline, font=headline_font, fill=(255, 255, 255))

sy = bottom_y + 14
for line in sub_lines:
    draw.text((margin, sy), line, font=sub_font, fill=(235, 233, 230))
    sy += 30

canvas.convert("RGB").save("public/og-default.png")
print("saved", canvas.size)
