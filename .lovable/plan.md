## Downloads & Admin Upload System

A CMS-style download section where you (as admin) can upload PDFs/files through the website, and visitors can browse and download them — from a dedicated Downloads page and from the existing Products page.

This requires a backend, so we'll enable **Lovable Cloud** (database + file storage + admin login) before building.

---

### 1. Backend setup (Lovable Cloud)

- Enable Lovable Cloud.
- Create a `resources` table:
  - `id`, `title`, `description`, `category` (catalog / generator / solar / rectifier / other), `file_url`, `file_size`, `file_type`, `created_at`.
- Create a private **storage bucket** `resources` for uploaded files.
- Create a `user_roles` table (separate from profiles) with `admin` role.
- RLS policies:
  - Public can `SELECT` from `resources`.
  - Only admin can `INSERT` / `UPDATE` / `DELETE` resources and upload to storage.
- Add yourself as admin (we'll do this after you create your account).

### 2. Admin authentication

- Add email + password sign-in (Lovable Cloud auth).
- `/auth` route — sign-in form (no public sign-up; admin-only).
- `/admin` route — protected, requires admin role.

### 3. Admin upload panel (`/admin`)

- Form to upload a new resource:
  - Title, description, category dropdown, file picker.
- Table listing all uploaded resources with delete button.
- Live upload progress.

### 4. Public Downloads page (`/downloads`)

- Header section matching the existing site style (navy hero band).
- Filter tabs: All / Product Catalog / Generators / Solar / Rectifiers.
- Grid of resource cards showing: title, description, file type icon, file size, download button.
- "No resources yet" empty state.
- Linked in the main navigation.

### 5. Products page integration

- On each product section (Generators, Solar, Rectifiers), add a "Downloads" subsection listing resources tagged with that category.
- Each item: title + download icon button.
- Link at the bottom: "View all downloads →" to `/downloads`.

### 6. Navigation updates

- Add "Downloads" link between Products and About in the navbar (desktop + mobile menu).
- Add Downloads link in the footer Products column.

---

### Technical notes

- File storage: Lovable Cloud Storage bucket, accessed via signed URLs for download.
- Auth: Supabase email/password via Lovable Cloud (no Google needed for an internal admin tool — confirm if you'd prefer Google too).
- Data fetching: `createServerFn` + TanStack Query (Lovable's modern stack pattern).
- File size limit: 50 MB per file (typical for PDFs/manuals).
- Supported file types: PDF, DOCX, XLSX, ZIP, images.

### What you'll do after I build it

1. Create your admin account at `/auth` (I'll then promote you to admin in the database).
2. Go to `/admin` and upload your catalog and datasheets.
3. They appear instantly on `/downloads` and on the Products page.

---

**Open question:** Do you want **public sign-up disabled** (only you can log in, no signup form), or should anyone be able to register (but only admins can upload)? I'll default to **admin-only, no public signup** unless you say otherwise.
