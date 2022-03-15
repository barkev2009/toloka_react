import axios from 'axios'
import { performance } from 'perf_hooks';
import fs from 'fs'


const tolokaToken = 'AgAAAAA7bQhFAACtpUs2RzuyK092hHU20esRLcg'

const getRecursive = async (token, url, limit=undefined) => {
    let items = [];
    let response = await axios({
        method: 'GET',
        url,
        headers: {
            Authorization: `OAuth ${token}`
        }
    })
    items = [...items, ...response.data.items]
    if (response.data.has_more) {
        let hasMore = true;
        while (hasMore) {
            if (limit !== undefined && items.length >= limit) {
                break
            }
            let lastId = response.data.items[response.data.items.length - 1].id;
            response = await axios({
                method: 'GET',
                url: `${url}&id_gt=${lastId}`,
                headers: {
                    Authorization: `OAuth ${token}`
                }
            })
            items = [...items, ...response.data.items];
            hasMore = response.data.has_more;
        }
    }
    return items
}

const downloadImage = async (imageId, imageName) => {
    const url = `https://toloka.yandex.com/api/v1/attachments/${imageId}/download`;
    const response = await axios({
        method: 'GET',
        url,
        headers: {
            Authorization: `OAuth ${tolokaToken}`
        },
        responseType: 'stream'
    })
    if (response !== undefined) {
        response.data.pipe(fs.createWriteStream(`test_files/test_images/${imageName}`))
    }


    // axios({
    //     method: 'GET',
    //     url,
    //     headers: {
    //         Authorization: `OAuth ${tolokaToken}`
    //     },
    //     responseType: 'stream'
    // }).then(
    //     response => {
    //         if (response !== undefined) {
    //             response.data.pipe(fs.createWriteStream(`test_files/test_images/${imageName}`))
    //         }
    //     }
    // ).catch(
    //     error => {
    //         setTimeout(
    //         () => downloadImage(imageId, imageName), (Math.random() * (3_000 - 1_000) + 1_000).toFixed(0)
    //         )
    //     }
    // )
}

const getChunks = (data, numInChunk) => {
    let chunks = [];
    let chunk = [];
    for (let i = 0; i < data.length; i++) {
        if ((i !== 0) && (i % numInChunk === 0)) {
            chunks.push(chunk);
            chunk = [];
        }            
        chunk.push(data[i])
    }
    if (chunk) {
        chunks.push(chunk)
    }
    return chunks
}

const getUrls = async (urls) => {
    try {
        let responses = await axios.all(urls.map(url => axios({
            method: 'GET',
            url,
            headers: {
                Authorization: `OAuth ${tolokaToken}`
            },
            responseType: 'stream'
        })))
        if (responses === undefined) {
            responses = await getUrls(urls)
        }
        return responses
    } catch (error) {
        setTimeout(
            () => getUrls(urls), (Math.random() * (5_000 - 1_000) + 1_000).toFixed(0)
        ) 
    }
}

const processImages = async (chunk, responses) => {
    if (responses !== undefined) {
        for (let i = 0; i < chunk.length; i++) {
            const response = responses[i];
            const fileName = chunk[i].id + '.jpg'
            if (response !== undefined) {
                response.data.pipe(fs.createWriteStream(`test_files/test_images/${fileName}`))
                // const imgStream = new stream.PassThrough()
                // imgStream.end(Buffer.from(response.data, 'binary'))
                // const wStream = fs.createWriteStream(`test_files/test_images/${fileName}`)
                // imgStream.pipe(wStream)
            }
        }
    } else {
        console.log('Undefined batch')
    }
}

const downloadChunk = async (chunk) => {
    let urls = []
    chunk.forEach(item => {
        urls.push(`https://toloka.yandex.com/api/v1/attachments/${item.id}/download`)
    })
    const responses = await getUrls(urls)
    await processImages(chunk, responses)
    // for (let i = 0; i < chunk.length; i++) {
    //     const fileName = chunk[i].id + '.jpg'
    //     await downloadImage(chunk[i].id, fileName) 
    // }
}

const downloadByChunks = async (items) => {
    const itemChunks = getChunks(items, 16);
    for (let chunk_i = 0; chunk_i < itemChunks.length; chunk_i++) {
        await downloadChunk(itemChunks[chunk_i])
    }
}

const t0 = performance.now()
let testItems = await getRecursive(tolokaToken, 'https://toloka.yandex.com/api/v1/attachments?pool_id=31531273&sort=id&limit=100', 1000);
// testItems = testItems.slice(0, 1);
const t1 = performance.now()
console.log(`Time taken for collecting (JavaScript): ${((t1 - t0) / 1000).toFixed(2)} seconds`)
console.log(testItems.length)


await downloadByChunks(testItems)


// for (let i = 0; i < testItems.length; i++) {
//     const item = testItems[i];
//     const fileName = item.id + '.jpg';
//     await downloadImage(item.id, fileName) 
// }



console.log(`Time taken for downloading (JavaScript): ${((performance.now() - t1) / 1000).toFixed(2)} seconds`)
