/** @type {import('next').NextConfig} */
const nextConfig = {
  
  
}

module.exports = {
  reactStrictMode: true,
  experimental:{ appDir: false},
  webpack(config){
    config.experiments = {...config.experiments, topLevelAwait: true}
    return config
  },
}