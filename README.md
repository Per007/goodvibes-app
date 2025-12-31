# 🌳 GoodVibes App

Een app om je persoonlijke groei bij te houden door goede daden te doen. Kijk toe hoe je boom groeit van zaadje tot kosmische boom!

## ✨ Features

- **16 Boom Levels** - Van zaadje tot kosmische boom
- **5 Categorieën** - Sociaal, Milieu, Gezondheid, Creativiteit, Vriendelijkheid
- **Weer Systeem** - Dynamisch weer dat je boom beïnvloedt
- **Streak Tracking** - Houd je dagelijkse streak bij
- **Wekelijks/Maandelijks Overzicht** - Bekijk je voortgang
- **Tweetalig** - Nederlands en Engels
- **Responsive** - Werkt perfect op mobiel en desktop
- **Offline Storage** - Je data wordt lokaal opgeslagen

## 🚀 Deployment via GitHub Pages

### Stap 1: Maak een GitHub Repository

1. Ga naar [github.com](https://github.com) en log in
2. Klik op **"+"** → **"New repository"**
3. Naam: `goodvibes-app`
4. Laat het **Public** staan
5. Klik **"Create repository"**

### Stap 2: Upload de Code

**Optie A: Via GitHub Web Interface**
1. In je nieuwe repo, klik **"uploading an existing file"**
2. Sleep alle bestanden uit deze map naar het upload venster
3. Klik **"Commit changes"**

**Optie B: Via Terminal (als je Git hebt)**
```bash
cd goodvibes-app
git init
git add .
git commit -m "Initial commit - GoodVibes app"
git branch -M main
git remote add origin https://github.com/JOUW-USERNAME/goodvibes-app.git
git push -u origin main
```

### Stap 3: Activeer GitHub Pages

1. Ga naar je repo op GitHub
2. Klik op **"Settings"** (tandwiel icoon)
3. Scroll naar **"Pages"** in de linkerzijbalk
4. Onder **"Build and deployment"**:
   - Source: **"GitHub Actions"**
5. De deployment start automatisch!

### Stap 4: Bekijk je App

Na een paar minuten is je app live op:
```
https://JOUW-USERNAME.github.io/goodvibes-app/
```

## 🛠️ Lokaal Ontwikkelen

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
npm run build

# Preview productie build
npm run preview
```

## 📁 Project Structuur

```
goodvibes-app/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── public/
│   └── favicon.svg         # App icoon
├── src/
│   ├── App.jsx             # Hoofdcomponent
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind CSS
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuratie
├── tailwind.config.js      # Tailwind configuratie
└── postcss.config.js       # PostCSS configuratie
```

## 🎨 Technologieën

- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **LocalStorage** - Data persistence

## 📱 PWA Ready

De app is klaar om als PWA te worden geïnstalleerd op je telefoon!

---

Made with 💚 by GoodVibes Team
