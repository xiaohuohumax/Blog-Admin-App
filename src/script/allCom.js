export default {
    Home: () => import('../views/Home'),
    Login: () => import('../views/Login'),
    Error404: () => import('../views/Error404'),
    Error403: () => import('../views/Error403'),
    Error500: () => import('../views/Error500'),

    ArticleManager: () => import('../components/articleManager/ArticleManager'),
    ArticleItem: () => import('../components/articleManager/ArticleItem'),
    ArticleMore: () => import('../components/articleManager/ArticleMore'),
    FireArticleManager: () => import('../components/articleManager/FireArticleManager'),

    CommentManager: () => import('../components/commentManager/CommentManager'),
    CommentItem: () => import('../components/commentManager/CommentItem'),

    WebUserManager: () => import('../components/webUserManager/WebUserManager'),
    WebUserItem: () => import('../components/webUserManager/WebUserItem'),
    WebUserMore: () => import('../components/webUserManager/WebUserMore'),

    AdminUserManager: () => import('../components/adminUserManager/AdminUserManager'),
    AdminUserItem: () => import('../components/adminUserManager/AdminUserItem'),
    FireAdminUserManager: () => import('../components/adminUserManager/FireAdminUserManager'),


    MessageManager: () => import('../components/messageManager/MessageManager'),
    MessageItem: () => import('../components/messageManager/MessageItem'),


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
    ToolBodyCard: () => import('../components/toolManager/ToolBodyCard'),

    VirtualFileManager: () => import('../components/virtualFileManager/VirtualFileManager'),
    VirtualFileItem: () => import('../components/virtualFileManager/VirtualFileItem'),
    VirtualFileLoading: () => import('../components/virtualFileManager/VirtualFileLoading'),
    VirtualFileAddDir: () => import('../components/virtualFileManager/VirtualFileAddDir'),
    VirtualFileSelectOver: () => import('../components/virtualFileManager/VirtualFileSelectOver'),
    // VirtualFileNewPath: () => import('../components/virtualFileManager/VirtualFileNewPath'),

    WebStatManager: () => import('../components/statManager/WebStatManager'),
    WebUserLevelStat: () => import('../components/statManager/stats/WebUserLevelStat'),
    WebUserGenderStat: () => import('../components/statManager/stats/WebUserGenderStat'),
    WebUserLogonStat: () => import('../components/statManager/stats/WebUserLogonStat'),
    AdminUserGenderStat: () => import('../components/statManager/stats/AdminUserGenderStat'),
    AdminUserLevelStat: () => import('../components/statManager/stats/AdminUserLevelStat'),


    AdminStatManager: () => import('../components/statManager/AdminStatManager'),
    // UserAgeStat: () => import('../components/statManager/stats/UserAgeStat'),

    BasicSetManager: () => import('../components/setManager/BasicSetManager'),
    StyleSetManager: () => import('../components/setManager/StyleSetManager'),
    OtherSetManager: () => import('../components/setManager/OtherSetManager'),

    Welcome: () => import('../components/Welcome'),

    toolItemModel: () => import('../components/toolItem/toolItemModel'),
    toolUploadList: () => import('../components/toolItem/toolUploadList'),
    toolUploadFileMini: () => import('../components/toolItem/toolUploadFileMini'),

    RoleManager: () => import('../components/roleManager/RoleManager'),
    RoleItem: () => import('../components/roleManager/RoleItem'),
    FireRoleItem: () => import('../components/roleManager/FireRoleItem'),
    FireRoleManager: () => import('../components/roleManager/FireRoleManager'),

    ResourceManager: () => import('../components/resourceManager/ResourceManager'),
    ResourceItem: () => import('../components/resourceManager/ResourceItem'),
    FireResourceManager: () => import('../components/resourceManager/FireResourceManager'),


    // 模块
    Editor: () => import('../components/mode/Editor'),
    EnterImage: () => import('../components/mode/EnterImage'),
    EnterTags: () => import('../components/mode/EnterTags'),
    EnterVideo: () => import('../components/mode/EnterVideo'),
    EnterColor: () => import('../components/mode/EnterColor'),
    EnterStyle: () => import('../components/mode/EnterStyle'),
    EnterTool: () => import('../components/mode/EnterTool'),
    EnterKind: () => import('../components/mode/EnterKind'),
    StatCard: () => import('../components/mode/StatCard'),
    Null: () => import('../components/mode/Null'),
    AuthorityBlock: () => import('../components/mode/AuthorityBlock'),
    AuthorityButton: () => import('../components/mode/AuthorityButton'),
    FormItemBlock: () => import('../components/mode/FormItemBlock'),

    // 布局
    LeftNav: () => import('../components/layout/LeftNav'),
    History: () => import('../components/layout/History'),
    Content: () => import('../components/layout/Content'),
    Header: () => import('../components/layout/Header'),
    Tools: () => import('../components/layout/Tools'),

}