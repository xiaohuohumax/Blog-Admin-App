export default {
    Home: () => import('../views/Home'),
    Login: () => import('../views/Login'),
    Error404: () => import('../views/Error404'),
    
    ArticleManager: () => import('../components/articleManager/ArticleManager'),
    ArticleItem: () => import('../components/articleManager/ArticleItem'),
    ArticleMore: () => import('../components/articleManager/ArticleMore'),
    FireArticleManager: () => import('../components/articleManager/FireArticleManager'),

    CommentManager: () => import('../components/commentManager/CommentManager'),
    CommentItem: () => import('../components/commentManager/CommentItem'),
    CommentMore: () => import('../components/commentManager/CommentMore'),

    WebUserManager: () => import('../components/webUserManager/WebUserManager'),
    WebUserItem: () => import('../components/webUserManager/WebUserItem'),
    WebUserMore: () => import('../components/webUserManager/WebUserMore'),
    
    AdminUserManager: () => import('../components/adminUserManager/AdminUserManager'),
    AdminUserItem: () => import('../components/adminUserManager/AdminUserItem'),
    AdminUserMore: () => import('../components/adminUserManager/AdminUserMore'),


    MessageManager: () => import('../components/messageManager/MessageManager'),
    NoticeManager: () => import('../components/noticeManager/NoticeManager'),
    NoticeItem: () => import('../components/noticeManager/NoticeItem'),
    FireNoticeManager: () => import('../components/noticeManager/FireNoticeManager'),


    FireMusicVideoManager: () => import('../components/musicVideoManager/FireMusicVideoManager'),
    MusicVideoManager: () => import('../components/musicVideoManager/MusicVideoManager'),
    MusicVideoItem: () => import('../components/musicVideoManager/MusicVideoItem'),
    MusicVideoMore: () => import('../components/musicVideoManager/MusicVideoMore'),

    FireImageManager: () => import('../components/imagesManager/FireImageManager'),
    ImageItem: () => import('../components/imagesManager/ImageItem'),
    ImageManager: () => import('../components/imagesManager/ImageManager'),
    ImageMore: () => import('../components/imagesManager/ImageMore'),

    FireToolManager: () => import('../components/toolManager/FireToolManager'),
    ToolItem: () => import('../components/toolManager/ToolItem'),
    ToolManager: () => import('../components/toolManager/ToolManager'),
    ToolMore: () => import('../components/toolManager/ToolMore'),

    VirtualFileManager: () => import('../components/virtualFileManager/VirtualFileManager'),
   
    WebStatManager: () => import('../components/statManager/WebStatManager'),
    WebUserLevelStat: () => import('../components/statManager/stats/WebUserLevelStat'),
    WebUserGenderStat: () => import('../components/statManager/stats/WebUserGenderStat'),
    WebUserLogonStat: () => import('../components/statManager/stats/WebUserLogonStat'),
    AdminUserGenderStat: () => import('../components/statManager/stats/AdminUserGenderStat'),
    AdminUserLevelStat: () => import('../components/statManager/stats/AdminUserLevelStat'),


    AdminStatManager: () => import('../components/statManager/AdminStatManager'),
    UserAgeStat: () => import('../components/statManager/stats/UserAgeStat'),

    BasicSetManager: () => import('../components/setManager/BasicSetManager'),
    StyleSetManager: () => import('../components/setManager/StyleSetManager'),
    OtherSetManager: () => import('../components/setManager/OtherSetManager'),

    Welcome: () => import('../components/Welcome'),

    // 模块
    Editor: () => import('../components/mode/Editor'),
    EnterImage: () => import('../components/mode/EnterImage'),
    EnterTags: () => import('../components/mode/EnterTags'),
    EnterVideo: () => import('../components/mode/EnterVideo'),
    StatCard: () => import('../components/mode/StatCard'),
    Null: () => import('../components/mode/Null'),

    // 布局
    LeftNav: () => import('../components/layout/LeftNav'),
    History: () => import('../components/layout/History'),
    Content: () => import('../components/layout/Content'),
    Header: () => import('../components/layout/Header'),
    Tools: () => import('../components/layout/Tools'),
}