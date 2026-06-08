---
name: feedback-fya-photo-fidelity
description: Regula stricta - fundalurile AI trebuie sa fie copie fidela dupa pozele reale ale salonului, nu regenerate
metadata:
  type: feedback
---

Cand generam videoclipuri sau imagini pentru Salon Fya, fundalul trebuie sa fie o COPIE FIDELA dupa pozele reale. NU o regenerare AI.

- Fotografiile reale = background plates fixe
- AI modifica DOAR prim-planul (personaj, rochie)
- Dimensiuni, proportii, materiale, lumina = EXACT la fel
- Interiordul salonului nu se "reimagineaza" niciodata

**Why:** Pantis a cerut explicit acest lucru - "nu o regenerare, dupa poza". Scopul e ca miresele sa vada exact salonul real in reclame, nu o versiune AI care poate diferi.
**How to apply:** La fiecare generare Higgsfield pentru FYA, se folosesc imaginile reale ca `medias` input (environment/background plates), nu prompt text pentru fundal.
