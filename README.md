# 💌 Interactive Gallery

A 3D interactive photo gallery I built as a birthday present for my girlfriend. It's a short journey through three scenes, built with React Three Fiber and custom GLSL shaders.

## ✨ The Experience

The gallery unfolds in three parts:

1. **The Room**: A 3D recreation of her room, filled with sentimental objects and a board of love notes pinned to the wall.
2. **The Web**: A maze-like web of our photos together, where you drift through memories connected to one another.
3. **The Tunnel**: A tunnel lined with pictures of her, the ones I love most.

## 🛠️ Built With

- [React](https://react.dev/): UI and app structure
- [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber): 3D scenes in React
- **GLSL**: custom vertex and fragment shaders for the visual effects
- **Vanilla JavaScript**: for the parts that didn't need React, like [describe, e.g. camera movement, scene transitions, input handling]

*(Add any other libraries you used, such as `@react-three/drei`, `gsap`, `vite`, and so on.)*

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v[XX] or newer)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-username]/[repo-name].git
cd [repo-name]

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:[PORT]` in your browser.

### Build for production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── scenes/        # Room, Web, and Tunnel scenes
├── shaders/       # Custom GLSL vertex and fragment shaders
├── components/    # Reusable React components
├── utils/         # Vanilla JS helpers
└── assets/        # Models, textures, and images
```

*(Adjust to match your actual folders.)*

## 🎨 Making It Your Own

Want to build something similar for someone you love?

1. Replace the images in `[path/to/images]` with your own photos.
2. Edit the love notes in `[path/to/notes-file]`.
3. Swap out the 3D objects in the room scene with things that mean something to you.

## 🔒 A Note on Privacy

The photos and messages in this project are personal, so they are **not included** in this repository. The project uses placeholder images instead. *(Edit or remove this section depending on what you've done.)*

## 🎮 Controls

| Action | Input |
| --- | --- |
| Look around | [Mouse drag / touch] |
| Move | [Scroll / arrow keys / click] |
| Interact | [Click on objects] |

*(Fill in the real controls.)*

## 📄 License

[MIT](LICENSE) *(or whichever license you choose)*

## 💖 Dedication

Made with love for [her name or "my girlfriend"], on her birthday.
