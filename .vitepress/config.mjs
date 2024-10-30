import {defineConfig} from 'vitepress'

export default defineConfig({
    base: "/Dots/",
    head: [["link", {rel: "icon", href: "/Dots/logo.svg"}]],
    title: "Vs34f的文档网站",
    description: "A VitePress Site",
    themeConfig: {
        outlineTitle: "目录",
        head: [["link", {rel: "icon", href: "/文档.svg"}]],
        outline: "deep",
        logo: "/文档.svg",
        nav: [
            {text: '首页', link: '/'},
            {text: 'Unity Dots', link: '/markdown/Unity_Dots_Learning/Unity Core package.md'},
        ],
        sidebar: [
            {
                text: "Unity Dots教程",
                items: [{
                    text: "Unity Dots核心包", link: "/markdown/Unity_Dots_Learning/Unity Core package.md",
                }]
            },
            {
                text: "Unity Ecs问题",
                items: [
                    {text: "Unity Ecs物品无法显示更新", link: "/markdown/Unity_Dots_Problems/Unity Ecs物品不显示.md"},
                    {text: "Unity Ecs和IJob句柄冲突", link: "/markdown/Unity_Dots_Problems/Unity Ecs 和 IJob的Execute句柄问题.md"},
                ]
            },


        ],
        text: 'Markdown Ecs', link: '/markdown/Unity_Dots_Learning/Unity Core package.md',

        socialLinks: [
            {icon: 'github', link: 'https://github.com/1ViolinSonata1'}],
        footer: {
            copyright: "Copyright@ 2024 揉玉栏玉切",
        },
        // 设置搜索框的样式
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                        },
                    },
                },
            },
        },
    },


})
