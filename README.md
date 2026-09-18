# Black Rose Performance

A sophisticated, editorial-inspired coaching website using a burgundy, cream, and black visual system.

## Included
- Responsive landing page
- Brand-forward typography and styling
- Coaching pricing cards
- Monthly and prepaid multi-month pricing
- Discount calculations
- Blank PayPal hosted-link fields
- Client onboarding form scaffold
- GitHub Pages-compatible static files

## Run locally
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Configure before launch
Edit `assets/site-config.js`:
1. Replace the blank `paypalUrl` values with PayPal payment links.
2. Confirm final pricing.
3. Add your email, social links, and onboarding destination.
4. Replace the abstract brand panels with approved photography when ready.

The onboarding form is intentionally front-end only. Connect it to Formspree, Netlify Forms, a CRM, or your preferred backend before launch.
