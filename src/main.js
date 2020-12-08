const $siteList = $('.siteList')
const $lastli = $siteList.find('li.last')
const siteData = localStorage.getItem('siteData')
const siteObject=JSON.parse(siteData)
const hashMap =siteObject|| [
    { logo: 'M',url: 'https://developer.mozilla.org' },
    { logo: 'C',url: 'https://caniuse.com' },
    { logo: 'J',url: 'https://juejin.cn' },   
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/,'')
}

const siteSave = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('siteData',string)
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </div>
    </li>`).insertBefore($lastli)
        $li.on('click', () => {
        window.open(node.url)
    })
        $li.on('click', '.close', (e) => {
        e.stopPropagation()
        hashMap.splice(index, 1)
        siteSave()
        render()    
    })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入要添加的网址')
        if (url.indexOf('http')!==0) {
            url='https://'+url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        });
        siteSave()
        render()
    })

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++){
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

const $input=$('input')
$input.on('keypress', (e) => {
    e.stopPropagation()
})