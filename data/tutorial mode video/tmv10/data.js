// data/tutorialmodevideo/tmv10/data.js

const data = [
{
    judul: 'Tutorial Talking Head Rebahan Di Sofa',
    cover: '',
    video: 'https://youtu.be/6gce3CBLwcY',
    videos: [
      {
        judul: '',
        url: '',
      }
    ],
    tools: 'https://kumpulantools.vercel.app/',
    prompt: '',
    prompts: [
      {
        judul: 'PROMPT CHARACTER SHEET',
        isi: `CHARACTER SHEET — FULL BODY | 5 PANELS

Create ONE single image: a character reference sheet [FOTO 1] with exactly 5 panels
of THE SAME character, arranged in one horizontal row, equal size, evenly spaced.

PANEL ORDER (left to right):
1. Full body, FRONT view (0°, facing camera) (blurred face)
2. Full body, BACK view (180°, back of head and body visible)
3. Full body, LEFT side profile (90°, facing the LEFT edge of frame) (blurred face)
4. Full body, RIGHT side profile (90°, facing the RIGHT edge of frame) (blurred face)
5. CLOSE-UP portrait, front view, neutral expression, head and shoulders only,
   sharp focus on facial detail

=== FACE DNA — READ FROM THE ATTACHED REFERENCE PHOTO ===
The face in the attached reference image is the ONLY source of truth for this
character's identity. Study it carefully and replicate every feature below exactly.

FACE SHAPE: replicate the exact overall face shape, length-to-width ratio, temple width, and natural asymmetry. Do not correct asymmetry.
FOREHEAD: replicate exact height, width, flatness or roundness, brow ridge, and hairline shape.
EYEBROWS: replicate exact thickness, arch shape, density, color, spacing between brows, and tail direction.
EYES: replicate exact eye shape, size relative to face, spacing between eyes, eyelid crease type (monolid / partial / full double / hooded), iris color and pattern, iris size, eye tilt, lash length, and under-eye area including any hollow or shadow.
NOSE: replicate exact bridge height, bridge width, bridge profile, nose length, tip shape, tip projection, nostril shape, nostril visibility from front, and nose wing width relative to the inner eye corners.
CHEEKS: replicate exact cheekbone height, cheekbone prominence, cheek fullness, and any mid-cheek hollow.
MOUTH & LIPS: replicate exact mouth width relative to nose width, upper lip thickness, lower lip thickness, upper-to-lower lip ratio, cupid's bow shape, lip corner direction at rest, philtrum length and depth, and natural lip color.
JAW & CHIN: replicate exact jawline definition, jaw width, jaw corner angle, chin shape, chin projection, and any dimple or cleft.
EARS: replicate exact size, protrusion, and lobe type.
SKIN: replicate exact skin tone, undertone, visible texture and pores, finish, and any fine lines. Do not smooth.
DISTINCTIVE MARKS: replicate EVERY mole, scar, freckle, and dimple at the exact same position and the same anatomical side as in the reference.
FACIAL HAIR: replicate exactly as shown in the reference — length, density, shape, color, and coverage area.
HAIR: replicate exact color, length, texture, style, part line, and hairline. The back view must show a back-of-hair shape consistent with this style.

=== FACIAL LOCK RULES — HIGHEST PRIORITY ===
- Every facial feature above is FIXED and must be identical in all 5 panels.
- Do NOT beautify, slim, smooth, or idealize the face.
- Do NOT correct asymmetry. Do NOT enlarge the eyes. Do NOT narrow the nose.
  Do NOT sharpen the jaw. Do NOT plump the lips.
- Do NOT remove moles, scars, freckles, pores, or fine lines.
- Do NOT add makeup that is not in the reference. Do NOT change apparent age.
- Skin tone must be identical in every panel — no lighting-induced color shift.
- Distinctive marks stay on the same anatomical side in every panel.
  A mole on the character's LEFT cheek mirrors correctly in profile views
  but never switches sides.
- For the side profile panels, reconstruct the face from the underlying bone
  structure implied by the reference. Keep nose projection, chin projection,
  and jaw angle anatomically consistent. Do not substitute a generic face.

IGNORE FROM THE FACE REFERENCE:
Background, lighting, camera angle, expression, pose, clothing, filters,
and color grading. Extract the FACE and HAIR only.

BODY:
- Body must be anatomically consistent with the face's apparent age and build.

OUTFIT — identical in all 5 panels: [DESKRIPSIKAN OUTFIT ATAU UPLOAD FOTO REFERENSI OUTFIT] 

Photorealistic, Sharp Detail, Aspect ratio 16:9.
`,
      },
      {
        judul: 'Prompt Text to Image',
        isi: `,Use the uploaded character reference as the exact identity source. Use the uploaded product image as the exact product reference.

Preserve the subject’s facial structure, skin tone, hairstyle, age, body proportions, and all distinctive features. Preserve the product’s exact shape, proportions, packaging, colors, materials, logo, label, typography, and design. Do not redesign, simplify, or replace the product.

Create an ultra-realistic vertical smartphone selfie of the same subject relaxing on a fabric sofa inside a contemporary Indonesian living room.


POSE AND FRAMING:
- The subject lies face-down along the sofa with the upper body supported naturally by the elbows.
- One arm extends forward toward the viewer to hold the smartphone and capture the selfie. The smartphone itself remains outside the frame.
- Use a close front-facing selfie perspective with subtle wide-angle distortion.
- Position the face slightly left of center, with part of the camera-holding arm visible from the lower-right edge.
- The subject looks directly into the camera with a relaxed and natural expression.
- The other hand holds the uploaded product beside the lower part of the face, clearly presenting it toward the camera without covering important facial features.
- The product’s front label faces the camera and remains clearly visible.
- The fingers wrap around the product naturally without covering its logo or essential packaging details.
- Both lower legs are bent upward behind the body in a relaxed, playful position.
- The feet may wear [SOCKS / FOOTWEAR / REMAIN BAREFOOT].
- Preserve realistic anatomy, correct hands and feet, and believable body weight against the sofa.

ENVIRONMENT:
An ordinary contemporary Indonesian living room with practical middle-class furnishings: a comfortable fabric sofa, light-colored ceramic tile flooring, simple curtains, a compact television cabinet, a standing fan or air conditioner, small everyday household objects, and soft tropical daylight entering through the windows. The room feels naturally lived-in, slightly imperfect, and authentically photographed—not luxurious or staged.

Do not use batik patterns, traditional costumes, ethnic ornaments, temple decorations, or exaggerated cultural symbols. Communicate the Indonesian setting naturally through the architecture, practical furniture, tropical daylight, and everyday domestic atmosphere.

CAMERA AND STYLE:
Casual front-facing iPhone 16 selfie, close wide-angle perspective, natural lens distortion, realistic skin texture, visible pores, slight hair flyaways, subtle digital noise, mild smartphone sharpening, imperfect framing, neutral color temperature, soft daylight, and authentic social-media UGC realism.

PRODUCT ACCURACY:
Sunscreen KICAU MANIA must remain fully recognizable and identical to the reference. Keep the packaging geometry stable and the label correctly oriented, sharp, readable, and free from distorted or invented text. Use realistic scale, finger contact, shadows, reflections, and ambient light interaction.

Avoid professional studio lighting, cinematic depth of field, excessive background blur, beauty filters, plastic skin, perfect symmetry, distorted hands, extra fingers, duplicated limbs, warped packaging, incorrect text, floating products, or an overly polished AI-generated appearance.

Aspect ratio: 3:4 vertical.
`,
      },
    ],
    panduan: [
      {
        judul: '',
      },
    ],
    materi: '',
  },
];

export default data;  
