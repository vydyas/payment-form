# Modern Payment Form

A modern, responsive payment form built with Next.js, TypeScript, and Tailwind CSS. Features a beautiful credit card visualization with 3D flip animation and a clean, user-friendly interface.

## Live Demo

🚀 [View the live demo](https://payment-form-ggetyvd07-vydyas-projects.vercel.app/)

## Features

- 💳 Interactive credit card visualization with 3D flip animation
- 📱 Fully responsive design (mobile-first approach)
- 🎨 Modern UI with gradient text and smooth animations
- 🔒 Form validation for card details
- ♿ Accessible form elements with ARIA attributes
- 🌙 Dark mode support
- ⚡ Built with Next.js 14 and TypeScript

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Radix UI primitives
- **Form Handling:** React Hook Form
- **Validation:** Custom validation logic
- **Animations:** CSS transforms and transitions

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/payment-form.git
   cd payment-form
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
payment-form/
├── app/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── credit-card.tsx
│   └── payment-form.tsx
├── styles/
│   └── payment-form.css
├── public/
│   └── assets/
└── package.json
```

## Assumptions

1. **Browser Support:**
   - Modern browsers with CSS Grid and Flexbox support
   - JavaScript enabled
   - CSS transforms and transitions support

2. **Device Support:**
   - Mobile devices (320px and up)
   - Tablets (768px and up)
   - Desktop screens (1024px and up)

3. **User Input:**
   - Users will enter valid credit card numbers (16 digits)
   - CVV will be 3-4 digits
   - Expiration date will be in MM/YYYY format
   - All inputs will be numeric

4. **Accessibility:**
   - Screen reader compatibility
   - Keyboard navigation support
   - ARIA attributes for form validation

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code linting
- Prettier for code formatting

## Deployment

This project can be deployed on any platform that supports Next.js applications. Recommended platforms:

- Vercel (recommended)
- Netlify
- AWS Amplify

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with default settings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern payment forms
- Icons from [Lucide Icons](https://lucide.dev/)
- Font: Manrope from Google Fonts

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

