export default {
    Home: () => import('../views/Home'),
    Login: () => import('../views/Login'),
    Error404: () => import('../views/Error404'),
    
    FireArticleManager: () => import('../components/fireArticleManager/FireArticleManager'),

    ArticleManager: () => import('../components/articleManager/ArticleManager'),
    ArticleItem: () => import('../components/articleManager/ArticleItem'),

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

    GamesManager: () => import('../components/gamesManager/GamesManager'),
    GameUpload: () => import('../components/gamesManager/GameUpload'),
    GameUpdate: () => import('../components/gamesManager/GameUpdate'),
    GameUpdateItem: () => import('../components/gamesManager/GameUpdateItem'),

    ToolsManager: () => import('../components/toolsManager/ToolsManager'),
    ToolsUpdate: () => import('../components/toolsManager/ToolsUpdate'),
    ToolsUpdateItem: () => import('../components/toolsManager/ToolsUpdateItem'),



    VirtualFileManager: () => import('../components/virtualFileManager/VirtualFileManager'),
    StyleSetManager: () => import('../components/styleSetManager/StyleSetManager'),
    BasicSetManager: () => import('../components/basicSetManager/BasicSetManager'),
    UserStatManager: () => import('../components/userStatManager/UserStatManager'),

    WebStatManager: () => import('../components/webStatManager/WebStatManager'),
    UserAgeStat: () => import('../components/webStatManager/UserAgeStat'),

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