import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O projeto vive dentro de `C:\Users\marce\Projetos\...`. Sem fixar a
  // raiz, o Turbopack sobe até `C:\Users\marce` e tenta incluir a pasta
  // pessoal inteira no bundle.
  turbopack: {
    root: __dirname,
  },

  images: {
    qualities: [75, 85, 95],
  },
};

export default nextConfig;