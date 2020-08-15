import ApiClientFactory from "./lib/ApiClientFactory"

const apiConfig = {
        dictionary: {
                add: {
                        method: "post",
                        url: "/dictionary"
                },
                getList: {
                        method: "get",
                        url: "/dictionary/page"
                },
                updateById: {
                        method: "put",
                        url: "/dictionary/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/dictionary/update/batch"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/dictionary/delete/batch"
                },
                deleteById: {
                        method: "delete",
                        url: "/dictionary/{id}"
                },
                getAll: {
                        method: "get",
                        url: "/dictionary/all"
                }
        },
        crawler: {
                add: {
                        method: "post",
                        url: "/crawler"
                },
                updateById: {
                        method: "put",
                        url: "/crawler/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/crawler/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/crawler/page"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/crawler/delete/batch"
                },
                deleteById: {
                        method: "delete",
                        url: "/crawler/{id}"
                }
        },
     
        downSystem: {
                add: {
                        method: "post",
                        url: "/downSystem"
                }, updateById: {
                        method: "put",
                        url: "/downSystem/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/downSystem/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/downSystem/page"
                }, deleteById: {
                        method: "delete",
                        url: "/downSystem/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/downSystem/delete/batch"
                }
        },
        downSystemSite: {
                add: {
                        method: "post",
                        url: "/downSystemSite"
                },
                updateById: {
                        method: "put",
                        url: "/downSystemSite/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/downSystemSite/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/downSystemSite/page"
                }, deleteById: {
                        method: "delete",
                        url: "/downSystemSite/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/downSystemSite/delete/batch"
                }
        },
        siteAccount: {
                add: {
                        method: "post",
                        url: "/siteAccount"
                }, updateById: {
                        method: "put",
                        url: "/siteAccount/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/siteAccount/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/siteAccount/page"
                }, 
                getBySite: {
                        method: "get",
                        url: "/siteAccount/getBySite"
                },
                deleteById: {
                        method: "delete",
                        url: "/siteAccount/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/siteAccount/delete/batch"
                }
        },
        proxy: {
                add: {
                        method: "post",
                        url: "/proxy"
                },
                updateById: {
                        method: "put",
                        url: "/proxy/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/proxy/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/proxy/page"
                }, deleteById: {
                        method: "delete",
                        url: "/proxy/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/proxy/delete/batch"
                }
        },
        cookie: {
                add: {
                        method: "post",
                        url: "/cookie"
                },
                updateById: {
                        method: "put",
                        url: "/cookie/{id}"
                },
                getList: {
                        method: "get",
                        url: "/cookie/page"
                }, deleteById: {
                        method: "delete",
                        url: "/cookie/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/cookie/delete/batch"
                }
        },
        site: {
                add: {
                        method: "post",
                        url: "/site"
                },
                updateById: {
                        method: "put",
                        url: "/site/{id}"
                },
                updateBatch: {
                        method: "put",
                        url: "/site/update/batch"
                },
                getList: {
                        method: "get",
                        url: "/site/page"
                }, deleteById: {
                        method: "delete",
                        url: "/site/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/site/delete/batch"
                }
        },
        siteIpDelayMap: {
                getList: {
                        method: "get",
                        url: "/siteIpDelayMap/page"
                }, deleteById: {
                        method: "delete",
                        url: "/siteIpDelayMap/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/siteIpDelayMap/delete/batch"
                }
        },
        siteIpBlockMap: {
                getList: {
                        method: "get",
                        url: "/siteIpBlockMap/page"
                }, deleteById: {
                        method: "delete",
                        url: "/siteIpBlockMap/{id}"
                },
                deleteBatch: {
                        method: "delete",
                        url: "/siteIpBlockMap/delete/batch"
                }
        },
        crawlTask: {
                getList: {
                        method: "get",
                        url: "/crawlTask/page"
                }
        },
        enum: {
                getAll: {
                        method: "get",
                        url: "/enum/all"
                }
        },
        dispatchRecord:{
                getByTaskId:{
                        method:"get",
                        url:"/dispatchRecord/getByTaskId/{taskId}"
                }
        },
        bindRecord:{
                getByTaskId:{
                        method:"get",
                        url:"/bindRecord/getByTaskId/{taskId}"
                }
        }

}

export default ApiClientFactory.create(apiConfig);