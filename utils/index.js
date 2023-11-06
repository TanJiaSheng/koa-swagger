const { readdirSync, createReadStream, createWriteStream } = require('fs')
const fs = require('fs')
const path = require('path')

function getNameListFromFolder(dir, type) {
    const fileList = []
    const folderPath = path.join(__dirname, dir)
	const files = readdirSync(folderPath)
	files.forEach((item) => {
        const itemPath = path.join(folderPath, item)
        const stats = fs.statSync(itemPath)
        if(stats.isDirectory()) {
            const list = getNameListFromFolder(path.join(dir, item), type)
            list.length && fileList.push(...list)
        } else if(stats.isFile() && item.includes(type)) {
            fileList.push(`${dir}/${item}`)
        }
    })
	return fileList
}

function readAndWriteFile(fileList, writhPath) {
    const ws = createWriteStream(path.join(__dirname, writhPath))
    return new Promise((resolve, reject) => {
        fileList.forEach(item => {
            const readStream = createReadStream(path.join(__dirname, '/', item))
            // 当有数据流出时，写入数据
            readStream.on('data', function(chunk){
                // 对chunk进行数据处理，变为newChunk
                // 如果没有写完，暂停读取数据流
                if(ws.write(chunk) === false) {
                    readStream.pause()
                }
            })
            // 写完后，继续读取
            ws.on('drain', function() {
                readStream.resume()
            })
    
            //没有数据时，关闭数据流
            readStream.on('end', function() {
                ws.end()
            })
            // function write() {
            //     return new Promise((resolve, reject) => {
                    
            //     })
            // }

        })
        ws.on('finish',function() {
            console.log('finish write yaml')
            resolve('complate')
        })
        ws.on('error', function() {
            reject()
        })
    })
}

module.exports = {
    getNameListFromFolder,
    readAndWriteFile
}