let compressing = window.require('compressing')
export default {
    // 压缩 tar
    compress(compress, destination) {
        return compressing.tar.compressDir(compress, destination,(inf)=>{
            console.log(inf);
        })
    },
    // 解压 tar
    uncompress(compress, destination) {
        return compressing.tar.uncompress(compress, destination)
    }
}