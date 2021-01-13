export default {
    Home: () => import('../views/Home'),
    Login: () => import('../views/Login'),
    Error404: () => import('../views/Error404'),
    
    ArticleManager: () => import('../components/articleManager/ArticleManager'),
    ArticleItem: () => import('../components/articleManager/ArticleItem'),
    FireArticleManager: () => import('../components/articleManager/FireArticleManager'),

    CommentManager: () => import('../components/commentManager/CommentManager'),
    CommentItem: () => import('../components/commentManager/CommentItem'),

    WebUserManager: () => import('../components/webUserManager/WebUserManager'),
    WebUserItem: () => import('../components/webUserManager/WebUserItem'),
    
    AdminUserManager: () => import('../components/adminUserManager/AdminUserManager'),
    AdminUserItem: () => import('../components/adminUserManager/AdminUserItem'),


    MusicVideoManager: () => import('../components/musicVideoManager/MusicVideoManager'),
    MusicVideoWrite: () => import('../components/musicVideoManager/MusicVideoWrite'),
    MusicVideoUpdate: () => import('../components/musicVideoManager/MusicVideoUpdate'),
    MusicVideoUpdateItem: () => import('../components/musicVideoManager/MusicVideoUpdateItem'),

    ImagesManager: () => import('../components/imagesManager/ImagesManager'),
    ImageWrite: () => import('../components/imagesManager/ImageWrite'),
    ImageUpdate: () => import('../components/imagesManager/ImageUpdate'),
    ImageUpdateItem: () => import('../components/imagesManager/ImageUpdateItem'),

    ToolsManager: () => import('../components/toolsManager/ToolsManager'),
    ToolsUpdate: () => import('../components/toolsManager/ToolsUpdate'),
    ToolsUpdateItem: () => import('../components/toolsManager/ToolsUpdateItem'),

    VirtualFileManager: () => import('../components/virtualFileManager/VirtualFileManager'),
   
    AdminStatManager: () => import('../components/statManager/AdminStatManager'),
    WebStatManager: () => import('../components/statManager/WebStatManager'),
    UserAgeStat: () => import('../components/statManager/stats/UserAgeStat'),

    BasicSetManager: () => import('../components/setManager/BasicSetManager'),
    StyleSetManager: () => import('../components/setManager/StyleSetManager'),
    OtherSetManager: () => import('../components/setManager/OtherSetManager'),

    Welcome: () => import('../components/Welcome'),

    // 模块
    TagsList: () => import('../components/mode/TagsList'),
    Editor: () => import('../components/mode/Editor'),
    EnterImage: () => import('../components/mode/EnterImage'),

    // 布局
    LeftNav: () => import('../components/layout/LeftNav'),
    History: () => import('../components/layout/History'),
    Content: () => import('../components/layout/Content'),
    Header: () => import('../components/layout/Header'),
    Tools: () => import('../components/layout/Tools'),
}