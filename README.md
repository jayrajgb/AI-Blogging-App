#### ✍️ **Blogger - AI Integrated Blogging App** ( Vite • React • CSS • Node • Express • MongoDB • Gemini API • ImageKit )

---

##### A full-stack **MERN blogging platform** integrated with **Google Gemini API** for AI-powered content generation like **blog descriptions** & **thumbnails**, combined with image optimization via **ImageKit**.

---

#### 🖼️ **Snapshot**

![Snapshot](/client/public/project12.png)

---

#### ✨ **Features**

- 🤖 **AI-Powered** – Auto-generate blog descriptions & thumbnails with Gemini API
- 🖼️ **Optimized Images** – ImageKit integration for fast delivery
- 💬 **Comments System** – Users can comment, admins can approve/unapprove
- 🧩 **Context API** – Global state management on frontend
- 🔑 **JWT Authentication** – Secure login for users & admin
- 📂 **Admin Dashboard** – Manage CRUD for blogs, publish/unpublish blogs, approve comments
- 🛠️ **MVC Architecture** – Structured backend with Mongoose & Express
- 📸 **Multer** – Handle image uploads seamlessly

---

#### 🛠️ **Tech Stack**

- ⚛️ Frontend: React • TailwindCSS • Context API
- 🖥️ Backend: Node.js • Express.js • Mongoose (MVC) • Multer • JWT
- 🗄️ Database: MongoDB (blogs, comments)
- 🤖 AI: Gemini API (blog description & thumbnail generation)
- 🖼️ Image Handling: ImageKit

---

#### 📂 **Database Schema**

**📝 Blog Model**
| Field | Type | Required | Description |
|-------------|----------|----------|---------------------------|
| title | String | ✅ | Title of the blog post |
| subtitle | String | ❌ | Optional blog subtitle |
| description | String | ✅ | Main content description |
| category | String | ✅ | Blog category/tag |
| image | String | ✅ | URL of blog cover image |
| isPublished | Boolean | ✅ | Publish state (true/false)|
| timestamps | Date | Auto | CreatedAt & UpdatedAt |

**💬 Comment Model**
| Field | Type | Required | Description |
|------------|----------|----------|-----------------------------------|
| blog | ObjectId | ✅ | Reference to Blog (foreign key) |
| name | String | ✅ | Name of commenter |
| content | String | ✅ | Comment text |
| isApproved | Boolean | ❌ (default: false) | Approval status of comment |
| timestamps | Date | Auto | CreatedAt & UpdatedAt |

---

#### ⚡ **Quick Setup**

1. **Clone repo**

   ```bash
   git clone https://github.com/jayrajgb/React-Projects.git
   cd AI-Blogging-App
   ```

2. **Setup frontend**

   ```bash
   cd client
   npm i
   npm run dev
   ```

3. **Setup backend**

   ```bash
   cd server
   npm i
   npm run server
   ```

4. **Setup environment variables for backend**

   ```bash
       cd server
       ni .env
       code .env
       # paste & setup following variables
        # MONGODB_URI=
        # ADMIN_EMAIL=
        # ADMIN_PASSWORD=
        # JWT_SECRET=
        # IMAGEKIT_PUBLIC_KEY=
        # IMAGEKIT_PRIVATE_KEY=
        # IMAGEKIT_URL_ENDPOINT=
        # GEMINI_API_KEY=
   ```
