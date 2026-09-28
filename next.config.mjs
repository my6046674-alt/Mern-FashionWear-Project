/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"http",
        hostname:"res.cloudinary.com",
        port:"",
        pathname:"/djfop5zyp/image/**",
      },
      {
        protocol:"https",
        hostname:"res.cloudinary.com",
        port:"",
        pathname:"/djfop5zyp/image/**",
      }
    ]
  }
};

export default nextConfig;

      "http://res.cloudinary.com/djfop5zyp/image/upload/v1766500255/mern-20251103/b3f2fbj5eyzjlv3djgeb.jpg"
