// 我们正在开发一个nextjs react的ssr应用
// 你只需要关心以下两个目录
// components 平铺的放置所有组件
// app 放置所有页面或者api
// 你给我代码的时候最好标注一下放置路径，我们配置了alias @/*，也就是说你可以使用@/components/xxx来引入
// react相关依赖的版本是
// "react": "^18",
// "react-dom": "^18",
// 我们使用typescript（也就是.tsx）来编写页面和组件，我们支持es2021以上
// typescript相关依赖的版本是
// "tsx": "^4.19.0",
// "typescript": "^5.6.2"
// nextjs相关依赖的版本是，你需要情况灵活而准确的判断是使用服务端组件还是客户端组件
// 如果使用客户端组件，你需要在文件头加上'use client'，并且请尽量只写在一个文件里，而不是多个文件相互引用
// 同时要注意，我们需要发布到公网，不能有不利于SEO的情况
// "next": "14.2.10",
// 基本的样式我们只使用tailwindcss来做，请不要写内联的css，不要加入<style>标签，不要引入其他文件内的css，我们只使用tailwindcss，tailwindcss版本是
// "tailwindcss": "^3.4.14",
// html模板上的attrs用双引号，其他优先使用单引号
// 对于动画相关的设计，你可以使用以下依赖
// "@gsap/react": "^2.1.1",
// "@react-three/fiber": "^8.2.2",
// "framer-motion": "^11.11.10",
// "framer-motion-3d": "^11.2.0",
// "gsap": "^3.12.5",
// "three": "^0.137.0",
// 对于Web3相关的依赖，你可以使用
// "@rainbow-me/rainbowkit": "^2.2.0",
// "wagmi": "^2.12.25"
// "viem": "^2.21.37",
// "@tanstack/react-query": "^5.59.16",
// 其他相关的三方依赖。你可以使用
// "dayjs": "^1.11.13",
// "nanoid": "^5.0.8",
// 我的tailwindcss主色调配置如下，请在需要的场合尽可能使用primary颜色
// colors: {
//   primary: {
//     50: '#FFFDF7',
//     100: '#FFF9E6',
//     200: '#FFF2CC',
//     300: '#FFE7A3',
//     400: '#FFDF71',
//     500: '#FFD93D',
//     600: '#FFCD1F',
//     700: '#FFC000',
//     800: '#DBA000',
//     900: '#B68600',
//     950: '#8C6700',
//   },
// },
// 我们没有第三方的图标库可供使用，但是我们希望所有图标尽可能使用合适的emoji表情来实现
// 你给我的代码，正确性需要是第一位的，所以请你仔细检查，其次需要可读性高，易于理解，最后代码要尽可能精简

export default
function AI() {
  return <div></div>;
}

// 请基于以上信息和代码，帮我实现一个新潮有趣的Web3项目的官网的布局，要求有一个感知滚动而智能显隐的吊顶，一个内容区域，一个footer
