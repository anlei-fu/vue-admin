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
                                label: "log",
                                moduleName: "module1",
                                menus: [{
                                        path: "/log/1",
                                        icon: "ios-search",
                                        label: "search",
                                        moduleName: "module1",
                                        
                                },
                                {
                                        path: "/log/2",
                                        icon: "",
                                        label: "aaa",
                                        moduleName: "module1",
                                }
                                ]
                        },
                        {
                                path: "/login/2",
                                icon: "",
                                label: "test",
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
                                path: "/log/4",
                                icon: "",
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
                                path: "/log/5",
                                icon: "",
                                label: "111-",
                                moduleName: "module3",
                        }
                ]

        },

]


