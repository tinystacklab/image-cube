# Image Cube - Free Online Image Processing Tool

[简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md) | **English**

A free, privacy-focused online image processing tool with compression, format conversion, and cropping capabilities. All processing is done locally in your browser - your images never leave your device.

## ✨ Features

### 🗜️ Smart Compression
- Advanced compression algorithms maintain visual quality while reducing file size
- Adjustable quality settings (10-100%)
- Max size limits (no limit, 1920px, 1280px, 800px)
- Batch processing support

### 🔄 Format Conversion
- Convert between JPG, PNG, WebP, GIF, and BMP formats
- One-click conversion to optimal format
- Adjustable output quality

### ✂️ Precise Cropping
- Free cropping or preset aspect ratios (1:1, 4:3, 16:9, etc.)
- Common size presets (1920×1080, 1080×1080, passport photos)
- Multiple output formats

### 🌐 Multi-language Support
- English
- Simplified Chinese (简体中文)
- Traditional Chinese (繁體中文)
- Auto-detection based on browser language
- Manual language switching

## 🔒 Privacy & Security

- **100% Client-side Processing**: All image processing is done in your browser
- **No Server Uploads**: Images never leave your device
- **No Data Collection**: We don't track or store any information
- **No Registration Required**: Use all features without signing up

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/image-cube.git
cd image-cube
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 📦 Deployment

### Deploy to Cloudflare Pages

1. Push your code to a GitHub repository

2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)

3. Go to **Pages** → **Create a project** → **Connect to Git**

4. Select your repository and configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

5. Click **Save and Deploy**

Your site will be live at `https://your-project.pages.dev`

## 🛠️ Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Image Compression**: [browser-image-compression](https://github.com/nichhk/browser-image-compression)
- **Image Cropping**: [Cropper.js](https://fengyuanchen.github.io/cropperjs/)
- **Styling**: Vanilla CSS with CSS Variables
- **Fonts**: [Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) & [Inter](https://fonts.google.com/specimen/Inter)

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

If you have any questions or suggestions, please open an issue on GitHub.

---

Made with ❤️ for privacy-conscious image processing
