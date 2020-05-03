exports.modules = [
        {
                _name: "module1",
                icon: "navicon-round",
                label: "用户管理",
                activeMenuName: "1",
                menus: [
                        {
                                path: "/log",
                                icon: "ios-search",
                                name: "1",
                                label: "111",
                                moduleName: "module1",
                                menus: [{
                                        path: "/log",
                                        icon: "ios-search",
                                        name: "1-1",
                                        label: "111",
                                        moduleName: "module1",
                                        children: [{
                                                path: "/login",
                                                icon: "",
                                                name: "1-2-1",
                                                label: "登录",
                                                moduleName: "module1",
                                        }]
                                },
                                {
                                        path: "/log",
                                        icon: "",
                                        name: "1-2",
                                        label: "aaa",
                                        moduleName: "module1",
                                }
                                ]
                        },
                        {
                                path: "/login",
                                icon: "",
                                name: "2",
                                label: "bb",
                                moduleName: "module1",
                        }
                ]

        },
        {
                _name: "module2",
                icon: "",
                label: "商品管理",
                activeMenuName: "1",
                menus: [
                        {
                                path: "/log",
                                icon: "",
                                name: "1",
                                label: "日志",
                                moduleName: "module2",
                        }
                ]

        },
        {
                _name: "module3",
                icon: "",
                label: "权限管理",
                activeMenuName: "test",
                menus: [
                        {
                                path: "/log",
                                icon: "",
                                name: "bbb",
                                label: "111-",
                                moduleName: "module3",
                        }
                ]

        },

]


