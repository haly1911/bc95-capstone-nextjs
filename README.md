# Skillora

A modern freelance marketplace web application (Fiverr clone) built as a Capstone project, providing a complete ecosystem for buying and selling professional services.

🔗 **Live demo:** https://skillora-bc95-capstone-nextjs.vercel.app/

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form & Validation:** React Hook Form, Zod
- **HTTP Client:** Axios
- **UI Utilities:** React Toastify, React Icons, Swiper

## Key Features

- **Gig Management:** Full CRUD operations for professional services with category/subcategory selection and image upload support.
- **Order & Review System:** Streamlined order placement workflow alongside an interactive review and rating system featuring sorting and pagination.
- **Role-Based Access Control:** Secure permission levels tailored for standard Users, Sellers, and Administrators.
- **Smart Authentication:** Protected route guards utilizing custom `callbackUrl` parameters to seamlessly return users to their previous destination after signing in.

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/haly1911/bc95-capstone-nextjs.git
cd bc95-capstone-nextjs
npm install
```

Create a `.env.local` file in the project root:

```dotenv
NEXT_PUBLIC_API_URL=https://fiverrnew.cybersoft.edu.vn/api/
NEXT_PUBLIC_TOKEN_CYBERSOFT=your_cybersoft_token
```

> The project uses the Fiverr API provided by Cybersoft. Replace `your_cybersoft_token` with the token issued for your class.

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view it in your browser.